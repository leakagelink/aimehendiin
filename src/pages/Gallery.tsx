import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { Sparkles } from "lucide-react";

const Gallery = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8 md:py-16">
        <div className="container">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
              <Sparkles className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">
                Curated Collection
              </span>
            </div>
            
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              मेहंदी <span className="text-secondary">गैलरी</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse our collection of beautiful mehendi designs. Filter by category to find your perfect design.
              <br />
              <span className="text-sm">
                हमारे खूबसूरत मेहंदी डिज़ाइन कलेक्शन में से अपनी पसंद चुनें।
              </span>
            </p>
          </div>

          {/* Gallery */}
          <GalleryGrid showFilters={true} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;
