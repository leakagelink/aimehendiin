import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import DesignCard from "./DesignCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles, Loader2, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const categories = [
  { value: "all", label: "All", labelHi: "सभी" },
  { value: "bridal", label: "Bridal", labelHi: "दुल्हन" },
  { value: "arabic", label: "Arabic", labelHi: "अरेबिक" },
  { value: "mandala", label: "Mandala", labelHi: "मंडला" },
  { value: "simple", label: "Simple", labelHi: "सिंपल" },
  { value: "finger", label: "Finger", labelHi: "फिंगर" },
  { value: "festival", label: "Festival", labelHi: "त्योहार" },
];

interface GalleryImage {
  id: string;
  image_url: string;
  title: string;
  title_hindi: string | null;
  category: string;
  likes_count: number | null;
  downloads_count: number | null;
  is_featured: boolean | null;
}

interface GalleryGridProps {
  limit?: number;
  showFilters?: boolean;
  showGenerateButton?: boolean;
}

const GalleryGrid = ({ limit, showFilters = true, showGenerateButton = true }: GalleryGridProps) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const queryClient = useQueryClient();

  // Fetch gallery images from Supabase
  const { data: galleryImages = [], isLoading, error } = useQuery({
    queryKey: ["gallery-images", activeCategory],
    queryFn: async () => {
      let query = supabase
        .from("gallery_images")
        .select("*")
        .order("created_at", { ascending: false });

      if (activeCategory !== "all") {
        query = query.eq("category", activeCategory);
      }

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error("Error fetching gallery images:", error);
        throw error;
      }
      
      return data as GalleryImage[];
    },
  });

  // Generate new images mutation
  const generateMutation = useMutation({
    mutationFn: async (category: string) => {
      const response = await supabase.functions.invoke("generate-gallery-image", {
        body: { category: category === "all" ? "bridal" : category, count: 2 },
      });

      if (response.error) {
        throw new Error(response.error.message || "Failed to generate images");
      }

      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["gallery-images"] });
      toast.success(`${data.generatedCount} नई मेहंदी डिज़ाइन जनरेट हो गई!`, {
        description: "New designs have been added to the gallery",
      });
    },
    onError: (error: Error) => {
      console.error("Generation error:", error);
      if (error.message.includes("Rate limit") || error.message.includes("429")) {
        toast.error("Rate limit exceeded. कृपया थोड़ी देर बाद कोशिश करें।");
      } else {
        toast.error("डिज़ाइन जनरेट करने में समस्या हुई", {
          description: error.message,
        });
      }
    },
  });

  const handleGenerate = () => {
    generateMutation.mutate(activeCategory);
  };

  // Loading skeletons
  if (isLoading) {
    return (
      <div className="w-full">
        {showFilters && (
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map((cat) => (
              <Skeleton key={cat.value} className="h-9 w-20 rounded-full" />
            ))}
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden">
              <Skeleton className="aspect-[3/4] w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Category Filters */}
      {showFilters && (
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((cat) => (
            <Button
              key={cat.value}
              variant={activeCategory === cat.value ? "gold" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(cat.value)}
              className="rounded-full"
            >
              {cat.label}
              <span className="hidden sm:inline ml-1 text-xs opacity-70">
                ({cat.labelHi})
              </span>
            </Button>
          ))}
        </div>
      )}

      {/* Generate Button */}
      {showGenerateButton && (
        <div className="flex justify-center mb-8">
          <Button
            onClick={handleGenerate}
            disabled={generateMutation.isPending}
            className="gap-2"
            variant="gold"
          >
            {generateMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                AI से डिज़ाइन बना रहे हैं...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                AI से नई डिज़ाइन बनाएं
              </>
            )}
          </Button>
        </div>
      )}

      {/* Grid */}
      {galleryImages.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {galleryImages.map((design) => (
            <DesignCard
              key={design.id}
              image={design.image_url}
              title={design.title}
              category={categories.find((c) => c.value === design.category)?.label || design.category}
              likes={design.likes_count || 0}
              onView={() => console.log("View design:", design.id)}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-12 bg-card/50 rounded-2xl border border-border/50">
          <Sparkles className="h-12 w-12 text-secondary/50 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            अभी कोई डिज़ाइन नहीं है
          </h3>
          <p className="text-muted-foreground mb-6">
            No designs in this category yet. Generate some beautiful mehendi designs!
          </p>
          <Button
            onClick={handleGenerate}
            disabled={generateMutation.isPending}
            className="gap-2"
            variant="gold"
          >
            {generateMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                AI से पहली डिज़ाइन बनाएं
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default GalleryGrid;
