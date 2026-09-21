import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { generateImageBase64 } from "../_shared/cvc-image.ts";

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  let prompt: unknown;
  let size: unknown;
  try {
    const body = await req.json();
    prompt = body?.prompt;
    size = body?.size;
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  if (typeof prompt !== "string" || prompt.trim().length < 3 || prompt.length > 8000) {
    return json({ error: "A valid `prompt` (3-8000 chars) is required." }, 400);
  }

  const MAX_PROMPT = 3900;
  let finalPrompt = prompt.trim();
  if (finalPrompt.length > MAX_PROMPT) {
    const cut = finalPrompt.slice(0, MAX_PROMPT);
    const lastBreak = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf(", "), cut.lastIndexOf(" "));
    finalPrompt = (lastBreak > 2000 ? cut.slice(0, lastBreak) : cut).trim();
  }

  const allowedSizes = ["1024x1024", "1024x1536", "1536x1024"];
  const imageSize = typeof size === "string" && allowedSizes.includes(size) ? size : "1024x1024";

  try {
    const { base64, mimeType } = await generateImageBase64({
      prompt: finalPrompt,
      size: imageSize,
    });

    return json({
      imageUrl: `data:${mimeType};base64,${base64}`,
      contentType: mimeType,
      bytes: Math.floor((base64.length * 3) / 4),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const aborted = err instanceof DOMException && err.name === "AbortError";
    console.error("generate-mehndi-image failed:", message);

    if (aborted) {
      return json({ error: "Generation timed out. कृपया दोबारा try करें।" }, 504);
    }
    if (message.includes("401") || message.includes("403") || message.includes("not configured")) {
      return json({ error: "Image service authentication failed." }, 401);
    }
    if (message.includes("429")) {
      return json({ error: "Rate limit exceeded. कृपया थोड़ी देर बाद try करें।" }, 429);
    }
    if (message.includes("402") || message.toLowerCase().includes("credit")) {
      return json({ error: "Insufficient credits. कृपया बाद में try करें।" }, 402);
    }
    return json({ error: "डिज़ाइन generate नहीं हो पाया। कृपया दोबारा try करें।" }, 502);
  }
});
