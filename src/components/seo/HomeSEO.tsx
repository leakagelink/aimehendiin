import { Helmet } from "react-helmet-async";

const HomeSEO = () => {
  const siteUrl = "https://aimehendi.in";

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AIMehendi.in",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: "AI से बनाएं खूबसूरत मेहंदी डिज़ाइन। Free AI Mehendi Design Generator.",
    sameAs: [
      "https://www.instagram.com/aimehendi.in",
      "https://www.youtube.com/@aimehendi",
      "https://www.facebook.com/aimehendi.in"
    ]
  };

  // WebSite Schema with SearchAction
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AIMehendi.in",
    url: siteUrl,
    description: "AI से बनाएं खूबसूरत मेहंदी डिज़ाइन। Free AI Mehendi Design Generator for bridal, Arabic, mandala designs.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/gallery?search={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  // SoftwareApplication Schema for AI Generator
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "AI Mehendi Design Generator",
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR"
    },
    description: "Free AI-powered mehendi design generator. Create bridal, Arabic, mandala, and simple mehendi patterns instantly.",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1250"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(appSchema)}
      </script>
    </Helmet>
  );
};

export default HomeSEO;
