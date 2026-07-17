import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { Helmet } from "react-helmet-async";
import { Sparkles } from "lucide-react";

const Gallery = () => {
  const siteUrl = "https://aimehendi.in";

  // Fetch gallery images for schema
  const { data: galleryImages = [] } = useQuery({
    queryKey: ["gallery-images-schema"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("id, image_url, title, description, category")
        .order("created_at", { ascending: false })
        .limit(20);
      
      if (error) throw error;
      return data || [];
    },
  });

  // ImageGallery Schema - dynamic from database
  const imageGallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Mehendi Design Gallery - 1000+ Free Patterns",
    description: "Browse 1000+ beautiful mehendi designs including bridal, Arabic, mandala, simple patterns. Free download available.",
    url: `${siteUrl}/gallery`,
    author: {
      "@type": "Person",
      name: "Dheeraj Tagde",
    },
    image: galleryImages.map((img) => ({
      "@type": "ImageObject",
      contentUrl: img.image_url,
      name: img.title,
      description: img.description || `${img.title} - Beautiful mehendi design`,
      caption: img.title,
      representativeOfPage: false,
      license: `${siteUrl}/terms`,
      acquireLicensePage: `${siteUrl}/gallery`,
      creditText: "AIMehendi.in - Dheeraj Tagde",
      creator: {
        "@type": "Person",
        name: "Dheeraj Tagde",
      },
    })),
  };

  // CollectionPage Schema
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Mehendi Design Collection",
    description: "Curated collection of beautiful mehendi designs for all occasions",
    url: `${siteUrl}/gallery`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: galleryImages.map((img, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "ImageObject",
          name: img.title,
          contentUrl: img.image_url,
          description: img.description || `${img.title} - Mehendi design`,
        },
      })),
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Mehendi Design Gallery — Free HD Downloads | AIMehendi.in</title>
        <meta name="description" content="1000+ free HD mehendi designs — bridal, Arabic, mandala, finger & simple patterns। Browse, download aur inspiration pao ek hi jagah." />

        <meta name="keywords" content="free mehndi download hd, bridal mehendi design 2026, dulhan mehendi design latest, simple arabic mehndi back hand, mandala mehndi design for beginners, finger mehndi design easy, karwa chauth mehndi design, raksha bandhan mehndi simple" />
        <meta name="author" content="Dheeraj Tagde" />
        <link rel="canonical" href={`${siteUrl}/gallery`} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/gallery`} />
        <meta property="og:title" content="Free Mehndi Download HD | 1000+ Mehendi Design Gallery" />
        <meta property="og:description" content="Browse bridal mehendi design 2026, dulhan mehendi design latest, simple arabic mehndi patterns. Free HD download!" />
        <meta property="og:image" content={`${siteUrl}/og-image.jpg`} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Mehndi Download HD | Mehendi Design Gallery" />
        <meta name="twitter:description" content="1000+ beautiful mehendi designs - bridal, arabic, mandala. Free HD download!" />
        
        {/* JSON-LD Schemas */}
        <script type="application/ld+json">
          {JSON.stringify(imageGallerySchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(collectionSchema)}
        </script>
      </Helmet>
      
      <Header />
      
      <main className="py-8 md:py-16">
        <div className="container">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
              <Sparkles className="h-4 w-4 text-secondary" aria-hidden="true" />
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
          <GalleryGrid showFilters={true} showGenerateButton={false} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;
