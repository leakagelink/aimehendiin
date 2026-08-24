import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const OVH_ENDPOINT =
  "https://e9fff799-399f-4334-a28b-7414047b3dc5.app.gra.ai.cloud.ovh.net/generate";

const TIMEOUT_MS = 90_000;

function toBase64(bytes: Uint8Array): string {
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

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

  const token = Deno.env.get("OVH_AI_TOKEN");
  if (!token) {
    return json({ error: "Image service is not configured." }, 500);
  }

  let prompt: unknown;
  try {
    const body = await req.json();
    prompt = body?.prompt;
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  if (typeof prompt !== "string" || prompt.trim().length < 3 || prompt.length > 8000) {
    return json({ error: "A valid `prompt` (3-8000 chars) is required." }, 400);
  }

  // OVH rejects prompts longer than 2000 characters (422 string_too_long)
  const MAX_PROMPT = 1990;
  let finalPrompt = prompt.trim();
  if (finalPrompt.length > MAX_PROMPT) {
    const cut = finalPrompt.slice(0, MAX_PROMPT);
    const lastBreak = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf(", "), cut.lastIndexOf(" "));
    finalPrompt = (lastBreak > 1200 ? cut.slice(0, lastBreak) : cut).trim();
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(OVH_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ prompt: finalPrompt }),
      signal: controller.signal,
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("OVH error", res.status, detail.slice(0, 300));
      if (res.status === 401 || res.status === 403) {
        return json({ error: "Image service authentication failed." }, 401);
      }
      if (res.status === 429) {
        return json({ error: "Rate limit exceeded. कृपया थोड़ी देर बाद try करें।" }, 429);
      }
      return json({ error: "डिज़ाइन generate नहीं हो पाया। कृपया दोबारा try करें।" }, 502);
    }

    const contentType = res.headers.get("content-type") || "image/png";
    const bytes = new Uint8Array(await res.arrayBuffer());

    if (!contentType.startsWith("image/") || bytes.length === 0) {
      console.error("Unexpected OVH response", contentType, bytes.length);
      return json({ error: "Image service returned an unexpected response." }, 502);
    }

    return json({
      imageUrl: `data:${contentType};base64,${toBase64(bytes)}`,
      contentType,
      bytes: bytes.length,
    });
  } catch (err) {
    const aborted = err instanceof DOMException && err.name === "AbortError";
    console.error("generate-mehndi-image failed:", err);
    return json(
      {
        error: aborted
          ? "Generation timed out. कृपया दोबारा try करें।"
          : "कुछ गलत हो गया। कृपया दोबारा try करें।",
      },
      aborted ? 504 : 500,
    );
  } finally {
    clearTimeout(timer);
  }
});
