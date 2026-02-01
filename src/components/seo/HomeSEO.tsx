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
      "https://www.facebook.com/aimehendi.in",
      "https://twitter.com/aimehendi",
      "https://www.linkedin.com/company/aimehendi"
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
    description: "Free AI Mehendi Design Generator - Create bridal mehendi design 2026, dulhan mehendi design latest, simple arabic mehndi back hand, finger mehndi design easy, mandala mehndi design for beginners। Mehndi design AI se kaise banaye सीखें।",
    keywords: "ai mehendi design generator, bridal mehendi design 2026, simple arabic mehndi back hand, finger mehndi design easy, dulhan mehendi design latest, karwa chauth mehndi design, raksha bandhan mehndi simple, mandala mehndi design for beginners, mehndi design ai se kaise banaye, free mehndi download hd",
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
