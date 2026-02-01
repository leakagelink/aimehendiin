import { useState } from "react";
import DesignCard from "./DesignCard";
import { Button } from "@/components/ui/button";

const categories = [
  { value: "all", label: "All", labelHi: "सभी" },
  { value: "bridal", label: "Bridal", labelHi: "दुल्हन" },
  { value: "arabic", label: "Arabic", labelHi: "अरेबिक" },
  { value: "mandala", label: "Mandala", labelHi: "मंडला" },
  { value: "simple", label: "Simple", labelHi: "सिंपल" },
  { value: "finger", label: "Finger", labelHi: "फिंगर" },
  { value: "festival", label: "Festival", labelHi: "त्योहार" },
];

// Sample gallery data - In production, this would come from the database
const sampleDesigns = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1595486650748-8f08e7839c90?w=400&h=600&fit=crop",
    title: "Bridal Full Hand Design",
    category: "bridal",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1560707854-fb9a10ced6e2?w=400&h=600&fit=crop",
    title: "Arabic Pattern Mehendi",
    category: "arabic",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1591213954196-2d0ccb3f8d4c?w=400&h=600&fit=crop",
    title: "Mandala Circle Design",
    category: "mandala",
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=600&fit=crop",
    title: "Simple Elegant Mehendi",
    category: "simple",
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=600&fit=crop",
    title: "Finger Mehendi Pattern",
    category: "finger",
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?w=400&h=600&fit=crop",
    title: "Diwali Special Design",
    category: "festival",
  },
];

interface GalleryGridProps {
  limit?: number;
  showFilters?: boolean;
}

const GalleryGrid = ({ limit, showFilters = true }: GalleryGridProps) => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredDesigns = activeCategory === "all"
    ? sampleDesigns
    : sampleDesigns.filter((design) => design.category === activeCategory);

  const displayedDesigns = limit ? filteredDesigns.slice(0, limit) : filteredDesigns;

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

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {displayedDesigns.map((design) => (
          <DesignCard
            key={design.id}
            image={design.image}
            title={design.title}
            category={categories.find((c) => c.value === design.category)?.label || design.category}
            likes={Math.floor(Math.random() * 500)}
            onView={() => console.log("View design:", design.id)}
          />
        ))}
      </div>

      {/* Empty State */}
      {displayedDesigns.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            इस श्रेणी में अभी कोई डिज़ाइन नहीं है।
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            No designs in this category yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default GalleryGrid;
