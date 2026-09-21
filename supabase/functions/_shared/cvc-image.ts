// Shared image-generation client for the CVC (starimg) OpenAI-compatible API.

const API_URL = "https://ai.starimg.ru/v1/images/generations";
export const DEFAULT_IMAGE_MODEL = "gpt-image-1-mini";

export interface CvcImageOptions {
  prompt: string;
  model?: string;
  quality?: string;
  size?: string;
  timeoutMs?: number;
}

export interface CvcImageResult {
  base64: string;
  mimeType: string;
}

/** Generates one image and returns raw base64 + mime type. */
export async function generateImageBase64(
  opts: CvcImageOptions,
): Promise<CvcImageResult> {
  const apiKey = Deno.env.get("CVC_API_KEY");
  if (!apiKey) throw new Error("Image API is not configured");

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), opts.timeoutMs ?? 170_000);

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: opts.model ?? DEFAULT_IMAGE_MODEL,
        prompt: opts.prompt,
        n: 1,
        size: opts.size ?? "1024x1024",
        quality: opts.quality ?? "low",
      }),
      signal: controller.signal,
    });

    const text = await res.text();
    if (!res.ok) {
      throw new Error(`Image provider ${res.status}: ${text.slice(0, 300)}`);
    }

    let payload: { data?: { b64_json?: string; url?: string }[] };
    try {
      payload = JSON.parse(text);
    } catch {
      throw new Error("Image provider returned an unexpected response");
    }

    const b64 = payload.data?.[0]?.b64_json;
    if (b64) {
      const mimeType = b64.startsWith("/9j/") ? "image/jpeg" : "image/png";
      return { base64: b64, mimeType };
    }

    const url = payload.data?.[0]?.url;
    if (url) {
      const imgRes = await fetch(url);
      if (!imgRes.ok) throw new Error("Could not download generated image");
      const bytes = new Uint8Array(await imgRes.arrayBuffer());
      return {
        base64: toBase64(bytes),
        mimeType: imgRes.headers.get("content-type") || "image/png",
      };
    }

    throw new Error("Image provider returned no image");
  } finally {
    clearTimeout(timer);
  }
}

export function toBase64(bytes: Uint8Array): string {
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

/** Convenience wrapper returning a data URL. */
export async function generateImage(opts: CvcImageOptions): Promise<string> {
  const { base64, mimeType } = await generateImageBase64(opts);
  return `data:${mimeType};base64,${base64}`;
}
