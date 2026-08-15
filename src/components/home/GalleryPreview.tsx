import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import CategoryLinks from "@/components/gallery/CategoryLinks";

const GalleryPreview = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
              मेहंदी <span className="text-secondary">गैलरी</span>
            </h2>
            <p className="text-muted-foreground">
              Explore beautiful mehendi designs | खूबसूरत डिज़ाइन देखें
            </p>
          </div>
          <Button variant="outline-gold" asChild className="group">
            <Link to="/gallery">
              View All Designs
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        {/* Gallery Grid */}
        <GalleryGrid limit={4} showFilters={false} showGenerateButton={false} />

        {/* Contextual collection links */}
        <div className="mt-10">
          <CategoryLinks intro="Style ke hisaab se designs browse karen:" />
          <p className="text-muted-foreground text-sm mt-5">
            Shaadi ki taiyari kar rahe hain?{" "}
            <Link
              to="/bridal-mehendi-design-2026"
              className="text-secondary underline underline-offset-4"
            >
              Bridal Mehendi Design 2026
            </Link>{" "}
            trends dekhen, ya vrat ke liye{" "}
            <Link
              to="/karwa-chauth-mehndi-design"
              className="text-secondary underline underline-offset-4"
            >
              Karwa Chauth Mehndi Designs
            </Link>{" "}
            se inspiration lein.
          </p>
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;
