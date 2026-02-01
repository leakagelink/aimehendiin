import { Helmet } from "react-helmet-async";

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
}

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
}: BlogPostSEOProps) => {
  const siteUrl = "https://aimehendi.in";
  const articleUrl = `${siteUrl}/blog/${slug}`;
  const authorName = "Dheeraj Tagde";

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

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{metaTitle}</title>
      <meta name="title" content={metaTitle} />
      <meta name="description" content={metaDescription} />
      <meta name="author" content={authorName} />
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
    </Helmet>
  );
};

export default BlogPostSEO;
