import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    const { designType, handType, styles, customPrompt } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Build the prompt
    const designPrompt = designTypePrompts[designType] || designTypePrompts.bridal;
    const handPrompt = handTypePrompts[handType] || handTypePrompts.back;
    const stylePrompts = (styles || [])
      .map((s: string) => styleModifierPrompts[s])
      .filter(Boolean)
      .join(", ");

    const basePrompt = `Create a beautiful traditional Indian mehendi (henna) tattoo design illustration. ${designPrompt} ${handPrompt}. ${stylePrompts}. ${customPrompt || ""}
    
Style requirements:
- The design should be a clean, high-quality illustration showing mehendi/henna art
- Brown/henna colored design on a light cream/skin-toned background
- Traditional mehendi art style with authentic Indian patterns
- The design should be detailed and professional-looking
- Include paisleys, flowers, leaves, and decorative elements typical of mehendi art
- Ultra high resolution, detailed illustration`;

    console.log("Generating mehendi design with prompt:", basePrompt);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image",
        messages: [
          {
            role: "user",
            content: basePrompt,
          },
        ],
        modalities: ["image", "text"],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a few moments." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log("AI response received successfully");

    // Extract the image URL from the response
    const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    
    if (!imageUrl) {
      console.error("No image URL in response:", JSON.stringify(data));
      throw new Error("No image generated");
    }

    return new Response(
      JSON.stringify({ 
        imageUrl,
        message: "Design generated successfully"
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error generating mehendi design:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Failed to generate design" 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
