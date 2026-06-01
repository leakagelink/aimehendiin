// Shared WaveSpeed AI client with multi-key rotation + polling fallback.

const API_BASE = "https://api.wavespeed.ai/api/v3";

export function getWaveSpeedKeys(): string[] {
  const keys = [
    Deno.env.get("WAVESPEED_API_KEY_1"),
    Deno.env.get("WAVESPEED_API_KEY_2"),
    Deno.env.get("WAVESPEED_API_KEY_3"),
  ].filter((k): k is string => !!k && k.length > 0);
  if (keys.length === 0) {
    throw new Error("No WAVESPEED_API_KEY_* secrets configured");
  }
  return keys;
}

export interface WaveSpeedOptions {
  prompt: string;
  images?: string[]; // URLs or data URLs for edit mode
  aspectRatio?: string;
  outputFormat?: "png" | "jpeg";
}

async function pollResult(taskId: string, apiKey: string): Promise<string> {
  const url = `${API_BASE}/predictions/${taskId}/result`;
  const start = Date.now();
  const timeoutMs = 90000;
  let delay = 500;
  while (Date.now() - start < timeoutMs) {
    const r = await fetch(url, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    if (!r.ok) {
      const txt = await r.text();
      throw new Error(`Polling failed ${r.status}: ${txt}`);
    }
    const json = await r.json();
    const status = json?.data?.status;
    if (status === "completed") {
      const outputs = json?.data?.outputs || [];
      if (!outputs[0]) throw new Error("No output in completed response");
      return outputs[0]; // URL or base64
    }
    if (status === "failed") {
      throw new Error(`Generation failed: ${json?.data?.error || "unknown"}`);
    }
    await new Promise((r) => setTimeout(r, delay));
    delay = Math.min(delay + 250, 1500);
  }
  throw new Error("Polling timed out");
}

/**
 * Generates an image via WaveSpeed. Returns a data URL (base64 PNG/JPEG).
 * Rotates through the available API keys on rate-limit / auth errors.
 */
export async function generateImage(opts: WaveSpeedOptions): Promise<string> {
  const keys = getWaveSpeedKeys();
  const isEdit = opts.images && opts.images.length > 0;
  const endpoint = isEdit
    ? `${API_BASE}/google/gemini-2.5-flash-image/edit`
    : `${API_BASE}/google/gemini-2.5-flash-image-preview/text-to-image`;

  const body: Record<string, unknown> = {
    prompt: opts.prompt,
    output_format: opts.outputFormat || "png",
    enable_base64_output: true,
  };
  if (opts.aspectRatio) body.aspect_ratio = opts.aspectRatio;
  if (isEdit) body.images = opts.images;

  let lastError: Error | null = null;
  for (let i = 0; i < keys.length; i++) {
    const apiKey = keys[i];
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(body),
      });

      if (res.status === 429 || res.status === 401 || res.status === 402) {
        const txt = await res.text();
        console.warn(`WaveSpeed key ${i + 1} failed ${res.status}: ${txt}`);
        lastError = new Error(`Key ${i + 1} failed: ${res.status} ${txt}`);
        continue; // try next key
      }
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`WaveSpeed ${res.status}: ${txt}`);
      }

      const json = await res.json();
      const data = json?.data;
      const status = data?.status;
      const outputs: string[] = data?.outputs || [];

      let output: string | undefined = outputs[0];
      if (!output && status !== "completed" && data?.id) {
        // Sync mode didn't fully resolve – poll for it
        output = await pollResult(data.id, apiKey);
      }
      if (!output) throw new Error("No output returned from WaveSpeed");

      // output is either base64 (since enable_base64_output=true) or a URL
      if (output.startsWith("http")) {
        // Fetch and convert to data URL for consistency with previous Gemini behavior
        const imgRes = await fetch(output);
        const buf = new Uint8Array(await imgRes.arrayBuffer());
        const mime = imgRes.headers.get("content-type") || "image/png";
        const b64 = btoa(String.fromCharCode(...buf));
        return `data:${mime};base64,${b64}`;
      }
      // Already base64 (possibly with or without data: prefix)
      if (output.startsWith("data:")) return output;
      const mime = opts.outputFormat === "jpeg" ? "image/jpeg" : "image/png";
      return `data:${mime};base64,${output}`;
    } catch (e) {
      lastError = e instanceof Error ? e : new Error(String(e));
      console.error(`WaveSpeed attempt ${i + 1} error:`, lastError.message);
    }
  }
  throw lastError || new Error("All WaveSpeed keys failed");
}
