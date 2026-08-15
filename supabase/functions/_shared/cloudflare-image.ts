// Shared Cloudflare Workers AI image-generation client.
// The worker returns the generated image directly as image/jpeg.

const WORKER_URL = "https://aimehendi-image-api.herogatha.workers.dev/";

export const DEFAULT_NEGATIVE_PROMPT =
  "blurry, low quality, distorted, deformed hands, extra fingers, missing fingers, malformed fingers, text, watermark, logo";

export interface CloudflareImageOptions {
  prompt: string;
  negativePrompt?: string;
  width?: number;
  height?: number;
  numSteps?: number;
  guidance?: number;
}

/** Raw JPEG bytes from the Cloudflare worker. */
export async function generateImageBytes(
  opts: CloudflareImageOptions,
): Promise<{ bytes: Uint8Array; mimeType: string }> {
  const apiKey = Deno.env.get("API_KEY");
  if (!apiKey) throw new Error("Image API is not configured");

  const res = await fetch(WORKER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: opts.prompt,
      negative_prompt: opts.negativePrompt ?? DEFAULT_NEGATIVE_PROMPT,
      width: opts.width ?? 1024,
      height: opts.height ?? 1024,
      num_steps: opts.numSteps ?? 20,
      guidance: opts.guidance ?? 7.5,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    // Never leak credentials/headers – only status + upstream message text.
    throw new Error(`Image provider ${res.status}: ${detail.slice(0, 300)}`);
  }

  const mimeType = res.headers.get("content-type") || "image/jpeg";
  if (!mimeType.startsWith("image/")) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Unexpected response from image provider: ${detail.slice(0, 300)}`);
  }

  const bytes = new Uint8Array(await res.arrayBuffer());
  if (bytes.length === 0) throw new Error("Image provider returned an empty image");
  return { bytes, mimeType };
}

function toBase64(bytes: Uint8Array): string {
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

/** Convenience wrapper returning a data URL (used by existing callers). */
export async function generateImage(opts: CloudflareImageOptions): Promise<string> {
  const { bytes, mimeType } = await generateImageBytes(opts);
  return `data:${mimeType};base64,${toBase64(bytes)}`;
}
