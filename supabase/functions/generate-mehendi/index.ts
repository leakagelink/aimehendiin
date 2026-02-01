import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@0.21.0";

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
    
    const GOOGLE_API_KEY = Deno.env.get("GOOGLE_GEMINI_API_KEY");
    if (!GOOGLE_API_KEY) {
      throw new Error("GOOGLE_GEMINI_API_KEY is not configured");
    }

    // Build the prompt
    const designPrompt = designTypePrompts[designType] || designTypePrompts.bridal;
    const handPrompt = handTypePrompts[handType] || handTypePrompts.back;
    const stylePrompts = (styles || [])
      .map((s: string) => styleModifierPrompts[s])
      .filter(Boolean)
      .join(", ");

    // Initialize Google Generative AI
    const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash-image",
      generationConfig: {
        responseModalities: ["image", "text"],
      } as any,
    });

    let response;

    // Check if we have a reference image to edit
    if (referenceImage) {
      // Extract base64 data and mime type from the data URL
      const matches = referenceImage.match(/^data:([^;]+);base64,(.+)$/);
      if (!matches) {
        throw new Error("Invalid reference image format");
      }
      const mimeType = matches[1];
      const base64Data = matches[2];

      const editPrompt = `Based on this reference image, create a beautiful traditional Indian mehendi (henna) tattoo design. ${designPrompt} ${handPrompt}. ${stylePrompts}. ${customPrompt || ""}
      
Apply mehendi/henna design inspired by this image:
- Incorporate elements from the reference into the mehendi pattern
- Brown/henna colored design on light cream/skin-toned background
- Traditional mehendi art style with authentic Indian patterns
- Include paisleys, flowers, leaves, and decorative elements
- Ultra high resolution, detailed illustration`;

      console.log("Editing with reference image, prompt:", editPrompt);

      response = await model.generateContent([
        { text: editPrompt },
        {
          inlineData: {
            mimeType: mimeType,
            data: base64Data,
          },
        },
      ]);
    } else {
      // Standard generation without reference image
      const basePrompt = `Create a beautiful traditional Indian mehendi (henna) tattoo design illustration. ${designPrompt} ${handPrompt}. ${stylePrompts}. ${customPrompt || ""}
    
Style requirements:
- The design should be a clean, high-quality illustration showing mehendi/henna art
- Brown/henna colored design on a light cream/skin-toned background
- Traditional mehendi art style with authentic Indian patterns
- The design should be detailed and professional-looking
- Include paisleys, flowers, leaves, and decorative elements typical of mehendi art
- Ultra high resolution, detailed illustration`;

      console.log("Generating mehendi design with prompt:", basePrompt);
      response = await model.generateContent(basePrompt);
    }

    const result = response.response;
    console.log("AI response received successfully");

    // Extract image from the response
    let imageUrl: string | null = null;
    
    if (result.candidates && result.candidates[0]?.content?.parts) {
      for (const part of result.candidates[0].content.parts) {
        if (part.inlineData?.mimeType?.startsWith("image/")) {
          const base64Data = part.inlineData.data;
          const mimeType = part.inlineData.mimeType;
          imageUrl = `data:${mimeType};base64,${base64Data}`;
          break;
        }
      }
    }
    
    if (!imageUrl) {
      console.error("No image in response:", JSON.stringify(result));
      throw new Error("No image generated. Please try again.");
    }

    return new Response(
      JSON.stringify({ 
        imageUrl,
        message: referenceImage ? "Design generated from reference" : "Design generated successfully"
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error generating mehendi design:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Failed to generate design";
    
    // Handle specific error cases
    if (errorMessage.includes("429") || errorMessage.includes("quota") || errorMessage.includes("rate")) {
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Please try again in a few moments." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    if (errorMessage.includes("API key") || errorMessage.includes("authentication") || errorMessage.includes("401")) {
      return new Response(
        JSON.stringify({ error: "API key issue. Please check your Google API key." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
