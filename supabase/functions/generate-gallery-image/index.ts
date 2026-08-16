import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.93.0";
import { generateImage } from "../_shared/cloudflare-image.ts";

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
  supabase: SupabaseClient
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
    const dataUrl = await generateImage({ prompt: uniquePrompt });
    const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
    if (!match) {
      console.error("Invalid data URL from image provider");
      return null;
    }
    const mimeType = match[1];
    const base64Data = match[2];
    const imageBuffer = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));
    const ext = mimeType.includes("jpeg") ? "jpg" : "png";
    const fileName = `mehendi-${category}-${Date.now()}-${index}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("gallery-images")
      .upload(fileName, imageBuffer, { contentType: mimeType, upsert: false });
    if (uploadError) {
      console.error("Upload error:", uploadError);
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from("gallery-images")
      .getPublicUrl(fileName);
    const imageUrl = publicUrlData.publicUrl;

    const { data: insertData, error: insertError } = await supabase
      .from("gallery_images")
      .insert({
        title: `${category.charAt(0).toUpperCase() + category.slice(1)} Mehendi Design ${Date.now()}`,
        title_hindi: categoryInfo.titleHindi,
        image_url: imageUrl,
        category,
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
    console.log(`Successfully saved image ${index + 1} for ${category}`);
    return insertData as Record<string, unknown>;
  } catch (error) {
    console.error(`Error generating image ${index + 1} for ${category}:`, error);
    return null;
  }
}

async function generateImagesInBackground(
  categories: string[],
  countPerCategory: number,
  supabase: SupabaseClient
) {
  console.log(`Starting background generation: ${categories.length} categories, ${countPerCategory} images each`);
  for (const category of categories) {
    for (let i = 0; i < countPerCategory; i++) {
      try {
        await generateSingleImage(category, i, supabase);
        await new Promise((r) => setTimeout(r, 2000));
      } catch (error) {
        console.error(`Failed to generate image ${i + 1} for ${category}:`, error);
      }
    }
  }
  console.log("Background generation completed");
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { category, count = 1, bulk = false, categories: bulkCategories, countPerCategory = 4 } = await req.json();

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    if (bulk && bulkCategories && Array.isArray(bulkCategories)) {
      EdgeRuntime.waitUntil(generateImagesInBackground(bulkCategories, countPerCategory, supabase));
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

    const generatedImages: Record<string, unknown>[] = [];
    const maxCount = Math.min(count, 4);
    for (let i = 0; i < maxCount; i++) {
      const image = await generateSingleImage(category, i, supabase);
      if (image) generatedImages.push(image);
    }

    return new Response(
      JSON.stringify({ success: true, generatedCount: generatedImages.length, images: generatedImages }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error generating gallery images:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to generate images";
    if (errorMessage.includes("429") || errorMessage.toLowerCase().includes("rate")) {
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Please try again in a few moments." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
