import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.93.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const categoryPrompts: Record<string, { prompt: string; titleHindi: string }> = {
  bridal: {
    prompt: "elaborate bridal wedding mehendi henna design with intricate patterns, peacocks, elephants, bride and groom motifs, paisleys, and traditional Indian wedding symbols on a woman's hand",
    titleHindi: "ब्राइडल मेहंदी डिज़ाइन",
  },
  arabic: {
    prompt: "elegant Arabic mehendi henna design with bold floral patterns, vine motifs, and flowing curved lines, less filled in, more open spaces on a woman's hand",
    titleHindi: "अरेबिक मेहंदी डिज़ाइन",
  },
  mandala: {
    prompt: "circular mandala mehendi henna design with geometric patterns, symmetrical elements, and detailed zentangle-inspired artwork on a woman's hand",
    titleHindi: "मंडला मेहंदी डिज़ाइन",
  },
  simple: {
    prompt: "minimalist simple mehendi henna design with clean lines, basic floral patterns, and elegant simplicity on a woman's hand",
    titleHindi: "सिंपल मेहंदी डिज़ाइन",
  },
  finger: {
    prompt: "delicate finger mehendi henna design with fine details on fingers, thin lines, and small floral patterns",
    titleHindi: "फिंगर मेहंदी डिज़ाइन",
  },
  festival: {
    prompt: "festive celebration mehendi henna design with diyas, flowers, rangoli patterns, perfect for Diwali, Eid, Karwa Chauth on a woman's hand",
    titleHindi: "त्योहार मेहंदी डिज़ाइन",
  },
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { category, count = 1 } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const categoryInfo = categoryPrompts[category] || categoryPrompts.bridal;
    const generatedImages: any[] = [];

    for (let i = 0; i < Math.min(count, 4); i++) {
      const uniquePrompt = `Create a beautiful traditional Indian mehendi (henna) tattoo design illustration. ${categoryInfo.prompt}.
      
Style requirements:
- The design should be a clean, high-quality illustration showing mehendi/henna art
- Brown/henna colored design on a light cream/skin-toned background
- Traditional mehendi art style with authentic Indian patterns
- The design should be detailed and professional-looking
- Include paisleys, flowers, leaves, and decorative elements typical of mehendi art
- Unique variation number ${i + 1} with different pattern arrangement
- Ultra high resolution, detailed illustration`;

      console.log(`Generating image ${i + 1} for category: ${category}`);

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
              content: uniquePrompt,
            },
          ],
          modalities: ["image", "text"],
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          console.error("Rate limit hit, stopping generation");
          break;
        }
        const errorText = await response.text();
        console.error(`AI gateway error: ${response.status}`, errorText);
        continue;
      }

      const data = await response.json();
      const imageData = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;

      if (imageData) {
        // Upload to Supabase Storage
        const base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");
        const imageBuffer = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
        const fileName = `mehendi-${category}-${Date.now()}-${i}.png`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("gallery-images")
          .upload(fileName, imageBuffer, {
            contentType: "image/png",
            upsert: false,
          });

        if (uploadError) {
          console.error("Upload error:", uploadError);
          continue;
        }

        // Get public URL
        const { data: publicUrlData } = supabase.storage
          .from("gallery-images")
          .getPublicUrl(fileName);

        const imageUrl = publicUrlData.publicUrl;

        // Insert into gallery_images table
        const { data: insertData, error: insertError } = await supabase
          .from("gallery_images")
          .insert({
            title: `${category.charAt(0).toUpperCase() + category.slice(1)} Mehendi Design ${Date.now()}`,
            title_hindi: categoryInfo.titleHindi,
            image_url: imageUrl,
            category: category,
            description: `Beautiful AI-generated ${category} mehendi design pattern`,
            tags: [category, "mehendi", "henna", "ai-generated"],
            is_featured: false,
          })
          .select()
          .single();

        if (insertError) {
          console.error("Insert error:", insertError);
          continue;
        }

        generatedImages.push(insertData);
        console.log(`Successfully generated and saved image ${i + 1}`);
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        generatedCount: generatedImages.length,
        images: generatedImages,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error generating gallery images:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Failed to generate images";
    
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
