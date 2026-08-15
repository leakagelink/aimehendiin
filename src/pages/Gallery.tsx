import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { getGalleryCategory } from "@/data/galleryCategories";

const Gallery = () => {
  const siteUrl = "https://aimehendi.in";
  const { category: categoryParam } = useParams();
  const navigate = useNavigate();
  const category = getGalleryCategory(categoryParam);

  // Unknown /gallery/:category slug → treat as the main gallery listing
  const activeCategory = category?.slug ?? "all";
  const path = category ? `/gallery/${category.slug}` : "/gallery";
  const pageUrl = `${siteUrl}${path}`;

  const title = category
    ? `${category.title} | AIMehendi.in`
    : "Mehendi Design Gallery — Free HD Downloads | AIMehendi.in";
  const description = category
    ? category.description
    : "1000+ free HD mehendi designs — bridal, Arabic, mandala, finger & simple patterns। Browse, download aur inspiration pao ek hi jagah.";
  const h1 = category?.h1;

  // Fetch gallery images for schema (scoped to the active category)
  const { data: galleryImages = [] } = useQuery({
    queryKey: ["gallery-images-schema", activeCategory],
    queryFn: async () => {
      let query = supabase
        .from("gallery_images")
        .select("id, image_url, title, description, category")
        .order("created_at", { ascending: false })
        .limit(20);

      if (activeCategory !== "all") {
        query = query.eq("category", activeCategory);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    },
  });

  // ImageGallery Schema - dynamic from database
  const imageGallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: category
      ? `${category.h1} Gallery`
      : "Mehendi Design Gallery - 1000+ Free Patterns",
    description,
    url: pageUrl,
    isPartOf: { "@id": `${siteUrl}/#website` },
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
      license: `${siteUrl}/terms-of-service`,
      acquireLicensePage: pageUrl,
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
    name: category ? category.h1 : "Mehendi Design Collection",
    description,
    url: pageUrl,
    isPartOf: { "@id": `${siteUrl}/#website` },
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

  const handleCategoryChange = (value: string) => {
    navigate(value === "all" ? "/gallery" : `/gallery/${value}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta name="author" content="Dheeraj Tagde" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${siteUrl}/og-image.jpg`} />
        <meta property="og:site_name" content="AIMehendi.in" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={pageUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${siteUrl}/og-image.jpg`} />

        {/* JSON-LD Schemas */}
        <script type="application/ld+json">
          {JSON.stringify(imageGallerySchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(collectionSchema)}
        </script>
      </Helmet>

      <BreadcrumbSchema
        items={
          category
            ? [
                { name: "Gallery", item: "/gallery" },
                { name: category.h1, item: path },
              ]
            : [{ name: "Gallery", item: "/gallery" }]
        }
      />

      <Header />

      <main className="py-8 md:py-16">
        <div className="container">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
              <Sparkles className="h-4 w-4 text-secondary" aria-hidden="true" />
              <span className="text-sm font-medium text-secondary">
                {category ? `${category.label} Collection` : "Curated Collection"}
              </span>
            </div>

            {category ? (
              <>
                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  {category.h1}
                </h1>
                <div className="max-w-2xl mx-auto space-y-3 text-left md:text-center">
                  {category.intro.map((para) => (
                    <p key={para} className="text-muted-foreground">
                      {para}
                    </p>
                  ))}
                  <p className="text-muted-foreground">
                    <Link
                      to="/generate"
                      className="text-secondary underline underline-offset-4"
                    >
                      AI Mehendi Generator
                    </Link>{" "}
                    se apna custom {category.label.toLowerCase()} design free
                    banaye.
                  </p>
                </div>
              </>
            ) : (
              <>
                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  मेहंदी <span className="text-secondary">गैलरी</span>
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Browse our collection of beautiful mehendi designs. Filter by
                  category to find your perfect design.
                  <br />
                  <span className="text-sm">
                    हमारे खूबसूरत मेहंदी डिज़ाइन कलेक्शन में से अपनी पसंद चुनें।
                  </span>
                </p>
              </>
            )}
          </div>

          {/* Gallery */}
          <GalleryGrid
            showFilters={true}
            showGenerateButton={false}
            category={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;
