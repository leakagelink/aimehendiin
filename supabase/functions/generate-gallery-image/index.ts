import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.93.0";

declare const EdgeRuntime: {
  waitUntil(promise: Promise<unknown>): void;
};

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

async function generateSingleImage(
  category: string,
  index: number,
  supabase: SupabaseClient,
  LOVABLE_API_KEY: string
): Promise<Record<string, unknown> | null> {
  const categoryInfo = categoryPrompts[category] || categoryPrompts.bridal;
  
  const uniquePrompt = `Create a beautiful traditional Indian mehendi (henna) tattoo design illustration. ${categoryInfo.prompt}.
      
Style requirements:
- The design should be a clean, high-quality illustration showing mehendi/henna art
- Brown/henna colored design on a light cream/skin-toned background
- Traditional mehendi art style with authentic Indian patterns
- The design should be detailed and professional-looking
- Include paisleys, flowers, leaves, and decorative elements typical of mehendi art
- Unique variation number ${index + 1} with different pattern arrangement
- Ultra high resolution, detailed illustration`;

  console.log(`Generating image ${index + 1} for category: ${category}`);

  try {
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
        console.error("Rate limit hit");
        return null;
      }
      const errorText = await response.text();
      console.error(`AI gateway error: ${response.status}`, errorText);
      return null;
    }

    const data = await response.json();
    const imageData = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (imageData) {
      // Upload to Supabase Storage
      const base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");
      const imageBuffer = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
      const fileName = `mehendi-${category}-${Date.now()}-${index}.png`;

      const { error: uploadError } = await supabase.storage
        .from("gallery-images")
        .upload(fileName, imageBuffer, {
          contentType: "image/png",
          upsert: false,
        });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        return null;
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
        } as Record<string, unknown>)
        .select()
        .single();

      if (insertError) {
        console.error("Insert error:", insertError);
        return null;
      }

      console.log(`Successfully generated and saved image ${index + 1} for ${category}`);
      return insertData as Record<string, unknown>;
    }
  } catch (error) {
    console.error(`Error generating image ${index + 1} for ${category}:`, error);
  }
  
  return null;
}

async function generateImagesInBackground(
  categories: string[],
  countPerCategory: number,
  supabase: SupabaseClient,
  LOVABLE_API_KEY: string
) {
  console.log(`Starting background generation: ${categories.length} categories, ${countPerCategory} images each`);
  
  for (const category of categories) {
    console.log(`Generating ${countPerCategory} images for category: ${category}`);
    
    for (let i = 0; i < countPerCategory; i++) {
      try {
        await generateSingleImage(category, i, supabase, LOVABLE_API_KEY);
        // Small delay between images to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error(`Failed to generate image ${i + 1} for ${category}:`, error);
      }
    }
    
    console.log(`Completed generating images for category: ${category}`);
  }
  
  console.log("Background generation completed for all categories");
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { category, count = 1, bulk = false, categories: bulkCategories, countPerCategory = 4 } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Bulk generation mode - runs in background
    if (bulk && bulkCategories && Array.isArray(bulkCategories)) {
      // Start background task
      EdgeRuntime.waitUntil(
        generateImagesInBackground(bulkCategories, countPerCategory, supabase, LOVABLE_API_KEY)
      );
      
      return new Response(
        JSON.stringify({ 
          success: true,
          message: `Started generating ${countPerCategory} images for ${bulkCategories.length} categories in background`,
          categories: bulkCategories,
          countPerCategory,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Single category mode - synchronous
    const generatedImages: Record<string, unknown>[] = [];
    const maxCount = Math.min(count, 4);

    for (let i = 0; i < maxCount; i++) {
      const image = await generateSingleImage(category, i, supabase, LOVABLE_API_KEY);
      if (image) {
        generatedImages.push(image);
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
