import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const GATEWAY = "https://ai.gateway.lovable.dev/v1/chat/completions";
const MODEL = "google/gemini-2.5-flash-image";
const TIMEOUT_MS = 90_000;
const MAX_IMAGE_BYTES = 8 * 1024 * 1024; // ~8MB base64 payload cap

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

const coverageText: Record<string, string> = {
  palm: "cover only the palm / front of the hand area",
  back_hand: "cover the back of the hand up to the knuckles",
  full_hand: "cover the full hand from fingertips down to the wrist",
  hand_arm: "cover the full hand and continue up the forearm",
};

const shadeText: Record<string, string> = {
  fresh: "a fresh bright orange-henna stain colour",
  medium: "a natural reddish-brown henna stain colour",
  deep: "a deep dark maroon-brown mature henna stain colour",
};

const densityText: Record<string, string> = {
  light: "light, airy coverage with plenty of bare skin visible between motifs",
  medium: "balanced coverage with medium detail density",
  heavy: "very dense, heavily filled intricate coverage",
};

const styleText: Record<string, string> = {
  bridal:
    "elaborate Indian bridal mehendi with peacocks, paisleys, florals and fine shading",
  arabic:
    "flowing Arabic mehendi with bold floral vines, curved strokes and open spaces",
  mandala: "symmetrical mandala mehendi with geometric zentangle detailing",
  simple: "minimal fine-line mehendi with small delicate florals",
  rajasthani:
    "traditional Rajasthani/Marwari mehendi with figurative motifs, dense fine lines and checkered fillers",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!apiKey) return json({ error: "Try-on service is not configured." }, 500);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const image = body?.image;
  if (typeof image !== "string" || !image.startsWith("data:image/")) {
    return json({ error: "A valid photo (`image` data URL) is required." }, 400);
  }
  if (image.length > MAX_IMAGE_BYTES) {
    return json({ error: "Photo बहुत बड़ी है। कृपया छोटी image upload करें।" }, 413);
  }

  const style = styleText[String(body?.style ?? "arabic")] ?? styleText.arabic;
  const coverage =
    coverageText[String(body?.coverage ?? "full_hand")] ?? coverageText.full_hand;
  const shade = shadeText[String(body?.shade ?? "medium")] ?? shadeText.medium;
  const density = densityText[String(body?.density ?? "medium")] ?? densityText.medium;
  const notes = typeof body?.notes === "string" ? body.notes.slice(0, 300) : "";

  const prompt = [
    "Apply realistic mehendi (henna) body art onto the skin in this photograph.",
    `Style: ${style}.`,
    `Placement: ${coverage}.`,
    `Stain colour: ${shade}.`,
    `Detail level: ${density}.`,
    notes ? `Extra request: ${notes}.` : "",
    "Keep the person's real photo unchanged: same hand/limb shape, same pose, same skin tone, same lighting, same background, same nails and jewellery.",
    "The henna must follow the natural contours of the skin, wrap realistically around fingers and curves, and look like it was actually applied — not like a flat sticker or overlay.",
    "Do NOT redraw the hand, do NOT change anatomy, do NOT add extra fingers, do NOT turn the photo into an illustration or cartoon, do NOT add text or watermarks.",
    "Output a photorealistic edited version of the same photo.",
  ]
    .filter(Boolean)
    .join(" ");

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(GATEWAY, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: MODEL,
        modalities: ["image", "text"],
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: prompt },
              { type: "image_url", image_url: { url: image } },
            ],
          },
        ],
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("Gateway error", res.status, detail.slice(0, 300));
      if (res.status === 429) {
        return json({ error: "बहुत ज़्यादा requests। कृपया थोड़ी देर बाद try करें।" }, 429);
      }
      if (res.status === 402) {
        return json({ error: "AI credits ख़त्म हो गए हैं। कृपया बाद में try करें।" }, 402);
      }
      return json({ error: "Try-on generate नहीं हो पाया। कृपया दोबारा try करें।" }, 502);
    }

    const data = await res.json();
    const imageUrl: string | undefined =
      data?.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!imageUrl) {
      console.error("No image in gateway response");
      return json({ error: "AI ने image return नहीं की। कृपया दूसरी photo try करें।" }, 502);
    }

    return json({ imageUrl });
  } catch (err) {
    const aborted = err instanceof DOMException && err.name === "AbortError";
    console.error("mehndi-tryon failed:", err);
    return json(
      {
        error: aborted
          ? "Try-on timed out. कृपया दोबारा try करें।"
          : "कुछ गलत हो गया। कृपया दोबारा try करें।",
      },
      aborted ? 504 : 500,
    );
  } finally {
    clearTimeout(timer);
  }
});
