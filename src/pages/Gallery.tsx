import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { Helmet } from "react-helmet-async";
import { Sparkles } from "lucide-react";

// Gallery images data for schema
const galleryImages = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1595486650748-8f08e7839c90?w=800",
    title: "Bridal Full Hand Mehendi Design",
    description: "Beautiful intricate bridal mehendi pattern covering full hand with traditional motifs",
    category: "Bridal Mehendi",
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1560707854-fb9a10ced6e2?w=800",
    title: "Arabic Mehendi Pattern",
    description: "Elegant Arabic style mehendi design with flowing floral patterns",
    category: "Arabic Mehendi",
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1591213954196-2d0ccb3f8d4c?w=800",
    title: "Mandala Circle Mehendi Design",
    description: "Symmetrical mandala mehendi pattern with intricate geometric details",
    category: "Mandala Mehendi",
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800",
    title: "Simple Elegant Mehendi",
    description: "Minimalist simple mehendi design perfect for casual occasions",
    category: "Simple Mehendi",
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800",
    title: "Finger Mehendi Pattern",
    description: "Delicate finger mehendi design with detailed fingertip patterns",
    category: "Finger Mehendi",
  },
  {
    id: "6",
    url: "https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?w=800",
    title: "Diwali Festival Mehendi",
    description: "Festive mehendi design perfect for Diwali and other celebrations",
    category: "Festival Mehendi",
  },
];

const Gallery = () => {
  const siteUrl = "https://aimehendi.in";

  // ImageGallery Schema
  const imageGallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Mehendi Design Gallery - 1000+ Free Patterns",
    description: "Browse 1000+ beautiful mehendi designs including bridal, Arabic, mandala, simple patterns. Free download available.",
    url: `${siteUrl}/gallery`,
    author: {
      "@type": "Organization",
      name: "AIMehendi.in",
    },
    image: galleryImages.map((img) => ({
      "@type": "ImageObject",
      contentUrl: img.url,
      name: img.title,
      description: img.description,
      caption: img.title,
      representativeOfPage: false,
      license: `${siteUrl}/terms`,
      acquireLicensePage: `${siteUrl}/gallery`,
      creditText: "AIMehendi.in",
      creator: {
        "@type": "Organization",
        name: "AIMehendi.in",
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
          contentUrl: img.url,
          description: img.description,
        },
      })),
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Mehendi Design Gallery - 1000+ Free डिज़ाइन | AIMehendi.in</title>
        <meta name="description" content="Browse 1000+ beautiful mehendi designs. Bridal, Arabic, Mandala, Simple mehendi patterns. Free download करें!" />
        <link rel="canonical" href={`${siteUrl}/gallery`} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/gallery`} />
        <meta property="og:title" content="Mehendi Design Gallery - 1000+ Free Patterns" />
        <meta property="og:description" content="Browse beautiful mehendi designs. Bridal, Arabic, Mandala patterns. Free download!" />
        <meta property="og:image" content={`${siteUrl}/og-image.jpg`} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mehendi Design Gallery | AIMehendi.in" />
        <meta name="twitter:description" content="1000+ beautiful mehendi designs. Free download!" />
        
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
