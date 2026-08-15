import { Helmet } from "react-helmet-async";

interface FAQItem {
  question: string;
  answer: string;
}

interface BlogPostSEOProps {
  title: string;
  metaTitle: string;
  metaDescription: string;
  slug: string;
  featuredImage?: string | null;
  publishedAt?: string | null;
  category: string;
  tags?: string[] | null;
  excerpt: string;
  content?: string;
}

// Extract FAQ items from HTML content
const extractFAQs = (content: string): FAQItem[] => {
  const faqs: FAQItem[] = [];
  
  // Match FAQ section patterns in HTML
  const faqSectionRegex = /<h[23][^>]*>.*?(?:FAQ|सवाल|Questions).*?<\/h[23]>([\s\S]*?)(?=<h[23]|$)/gi;
  const matches = content.match(faqSectionRegex);
  
  if (matches) {
    matches.forEach(section => {
      // Extract Q&A pairs - look for strong/bold questions followed by answers
      const qaRegex = /<(?:strong|b)[^>]*>\s*(?:Q\d*[.:])?\s*([^<]+)<\/(?:strong|b)>\s*(?:<br\s*\/?>)?\s*([^<]+)/gi;
      let match;
      while ((match = qaRegex.exec(section)) !== null) {
        if (match[1] && match[2]) {
          faqs.push({
            question: match[1].trim().replace(/\?$/, '') + '?',
            answer: match[2].trim()
          });
        }
      }
    });
  }
  
  return faqs.slice(0, 10); // Limit to 10 FAQs
};

const BlogPostSEO = ({
  title,
  metaTitle,
  metaDescription,
  slug,
  featuredImage,
  publishedAt,
  category,
  tags,
  excerpt,
  content = "",
}: BlogPostSEOProps) => {
  const siteUrl = "https://aimehendi.in";
  const articleUrl = `${siteUrl}/blog/${slug}`;
  const authorName = "Dheeraj Tagde";

  // Extract FAQs from content
  const faqs = extractFAQs(content);

  // JSON-LD Structured Data for Article
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: excerpt,
    image: featuredImage || `${siteUrl}/og-image.jpg`,
    author: {
      "@type": "Person",
      name: authorName,
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "AIMehendi.in",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
    },
    datePublished: publishedAt,
    dateModified: publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    articleSection: category,
    keywords: tags?.join(", ") || "",
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: articleUrl,
      },
    ],
  };

  // FAQPage Schema (only if FAQs exist)
  const faqSchema = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  } : null;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{metaTitle}</title>
      <meta name="title" content={metaTitle} />
      <meta name="description" content={metaDescription} />
      <meta name="author" content={authorName} />
      <meta name="robots" content="index, follow" />
        <link rel="canonical" href={articleUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="article" />
      <meta property="og:url" content={articleUrl} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      {featuredImage && <meta property="og:image" content={featuredImage} />}
      <meta property="og:site_name" content="AIMehendi.in" />
      <meta property="article:author" content={authorName} />
      <meta property="article:section" content={category} />
      {publishedAt && (
        <meta property="article:published_time" content={publishedAt} />
      )}
      {tags?.map((tag) => (
        <meta property="article:tag" content={tag} key={tag} />
      ))}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={articleUrl} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      {featuredImage && <meta name="twitter:image" content={featuredImage} />}

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default BlogPostSEO;
