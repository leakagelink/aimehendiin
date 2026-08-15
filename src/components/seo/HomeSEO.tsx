import { Helmet } from "react-helmet-async";

const HomeSEO = () => {
  const siteUrl = "https://aimehendi.in";

  // Organization Schema (canonical entity, referenced by @id everywhere else)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
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

  // WebSite Schema (no SearchAction — the site has no site-search endpoint)
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: "AIMehendi.in",
    url: siteUrl,
    inLanguage: ["hi-IN", "en-IN"],
    description: "AI से बनाएं खूबसूरत मेहंदी डिज़ाइन। Free AI Mehendi Design Generator for bridal, Arabic, mandala designs.",
    publisher: { "@id": `${siteUrl}/#organization` }
  };

  // SoftwareApplication Schema for AI Generator (no unverified aggregateRating)
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${siteUrl}/#webapp`,
    name: "AI Mehendi Design Generator",
    url: `${siteUrl}/generate`,
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
    isPartOf: { "@id": `${siteUrl}/#website` },
    publisher: { "@id": `${siteUrl}/#organization` },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR"
    },
    description: "Free AI Mehendi Design Generator - Create bridal mehendi design 2026, dulhan mehendi design latest, simple arabic mehndi back hand, finger mehndi design easy, mandala mehndi design for beginners। Mehndi design AI se kaise banaye सीखें।",
    keywords: "ai mehendi design generator, bridal mehendi design 2026, simple arabic mehndi back hand, finger mehndi design easy, dulhan mehendi design latest, karwa chauth mehndi design, raksha bandhan mehndi simple, mandala mehndi design for beginners, mehndi design ai se kaise banaye, free mehndi download hd"
  };

  // OnlineBusiness Schema (same entity as Organization — linked, not duplicated)
  const onlineBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "OnlineBusiness",
    "@id": `${siteUrl}/#organization`,
    name: "AIMehendi.in",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    image: `${siteUrl}/og-image.jpg`,
    description: "India's #1 AI Mehendi Design Generator - Create beautiful bridal, Arabic, mandala mehndi designs instantly with artificial intelligence.",
    priceRange: "Free",
    areaServed: {
      "@type": "Country",
      name: "India"
    },
    serviceType: "AI Design Generation",
    availableLanguage: ["Hindi", "English"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: `${siteUrl}/contact`,
      availableLanguage: ["Hindi", "English"]
    }
  };

  return (
    <Helmet>
      {/* Homepage canonical + hreflang (moved out of index.html so it is not
          injected globally on every route) */}
      {/* Identical to index.html values — homepage meta is unchanged, but they
          must be Helmet-managed so other routes can replace them cleanly. */}
      <title>AI Mehendi Design Generator | Free मेहंदी | AIMehendi.in</title>
      <meta name="title" content="AI Mehendi Design Generator | Free मेहंदी | AIMehendi.in" />
      <meta name="description" content="AI से बनाएं खूबसूरत मेहंदी डिज़ाइन। Free AI Generator for bridal, Arabic, mandala & simple mehendi designs। 1000+ designs gallery।" />
      <meta name="robots" content="index, follow" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${siteUrl}/`} />
      <meta property="og:title" content="AI Mehendi Design Generator | Free मेहंदी Patterns" />
      <meta property="og:description" content="AI से बनाएं खूबसूरत मेहंदी डिज़ाइन। Free AI Generator for bridal, Arabic, mandala designs." />
      <meta property="og:image" content={`${siteUrl}/og-image.jpg`} />
      <meta property="og:site_name" content="AIMehendi.in" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={`${siteUrl}/`} />
      <meta name="twitter:title" content="AI Mehendi Design Generator | Free मेहंदी Patterns" />
      <meta name="twitter:description" content="AI से बनाएं खूबसूरत मेहंदी डिज़ाइन। Free AI Generator for bridal, Arabic, mandala designs." />
      <meta name="twitter:image" content={`${siteUrl}/og-image.jpg`} />

      <link rel="canonical" href={`${siteUrl}/`} />
      <link rel="alternate" hrefLang="hi" href={`${siteUrl}/`} />
      <link rel="alternate" hrefLang="en" href={`${siteUrl}/`} />
      <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/`} />

      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(appSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(onlineBusinessSchema)}
      </script>
    </Helmet>
  );
};

export default HomeSEO;
