import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { generateImage } from "../_shared/cvc-image.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const designTypePrompts: Record<string, string> = {
  bridal: "elaborate bridal wedding mehendi henna design with intricate patterns, peacocks, elephants, bride and groom motifs, paisleys, and traditional Indian wedding symbols",
  arabic: "elegant Arabic mehendi henna design with bold floral patterns, vine motifs, and flowing curved lines, less filled in, more open spaces",
  mandala: "circular mandala mehendi henna design with geometric patterns, symmetrical elements, and detailed zentangle-inspired artwork",
  simple: "minimalist simple mehendi henna design with clean lines, basic floral patterns, and elegant simplicity",
  finger: "delicate finger mehendi henna design with fine details on fingers, thin lines, and small floral patterns",
  back_hand: "beautiful back of hand mehendi henna design with central motif and extending patterns",
};

const handTypePrompts: Record<string, string> = {
  back: "on the back of a woman's hand",
  front: "on the palm of a woman's hand",
  full: "covering the full hand from wrist to fingertips, both palm and back visible",
};

const styleModifierPrompts: Record<string, string> = {
  intricate: "with highly intricate and detailed fine line work",
  minimal: "with minimal elegant design and open spaces",
  floral: "featuring prominent floral motifs, roses, lotuses, and leaves",
  geometric: "incorporating geometric shapes, triangles, and symmetric patterns",
  traditional: "with traditional Indian and Rajasthani design elements",
  modern: "with contemporary modern fusion style",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { designType, handType, styles, customPrompt, referenceImage } = await req.json();

    const designPrompt = designTypePrompts[designType] || designTypePrompts.bridal;
    const handPrompt = handTypePrompts[handType] || handTypePrompts.back;
    const stylePrompts = (styles || [])
      .map((s: string) => styleModifierPrompts[s])
      .filter(Boolean)
      .join(", ");

    let prompt: string;

    if (referenceImage) {
      prompt = `Based on the reference image, create a beautiful traditional Indian mehendi (henna) tattoo design. ${designPrompt} ${handPrompt}. ${stylePrompts}. ${customPrompt || ""}

Apply mehendi/henna design inspired by this image:
- Incorporate elements from the reference into the mehendi pattern
- Brown/henna colored design on light cream/skin-toned background
- Traditional mehendi art style with authentic Indian patterns
- Include paisleys, flowers, leaves, and decorative elements
- Ultra high resolution, detailed illustration`;
    } else {
      prompt = `Create a beautiful traditional Indian mehendi (henna) tattoo design illustration. ${designPrompt} ${handPrompt}. ${stylePrompts}. ${customPrompt || ""}

Style requirements:
- The design should be a clean, high-quality illustration showing mehendi/henna art
- Brown/henna colored design on a light cream/skin-toned background
- Traditional mehendi art style with authentic Indian patterns
- The design should be detailed and professional-looking
- Include paisleys, flowers, leaves, and decorative elements typical of mehendi art
- Ultra high resolution, detailed illustration`;
    }

    if (!prompt || !prompt.trim()) {
      return new Response(
        JSON.stringify({ error: "Prompt is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Generating via Cloudflare Workers AI:", { hasReference: !!referenceImage });

    const imageUrl = await generateImage({ prompt });

    return new Response(
      JSON.stringify({
        imageUrl,
        message: referenceImage ? "Design generated from reference" : "Design generated successfully",
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error generating mehendi design:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to generate design";
    const lower = errorMessage.toLowerCase();

    if (errorMessage.includes("400")) {
      return new Response(
        JSON.stringify({ error: "Invalid request. कृपया options बदल कर दोबारा try करें।" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (errorMessage.includes("429") || lower.includes("rate")) {
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Please try again in a few moments." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (errorMessage.includes("401") || errorMessage.includes("403") || lower.includes("not configured")) {
      return new Response(
        JSON.stringify({ error: "Image service authentication failed. कृपया बाद में try करें।" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    return new Response(
      JSON.stringify({ error: "डिज़ाइन generate नहीं हो पाया। कृपया दोबारा try करें।" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
