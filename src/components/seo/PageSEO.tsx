import { Helmet } from "react-helmet-async";

interface PageSEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: string;
}

const PageSEO = ({ title, description, path, image, type = "website" }: PageSEOProps) => {
  const siteUrl = "https://aimehendi.in";
  const pageUrl = `${siteUrl}${path}`;
  const ogImage = image || `${siteUrl}/og-image.jpg`;

  return (
    <Helmet>
      <title>{title} | AIMehendi.in</title>
      <meta name="title" content={`${title} | AIMehendi.in`} />
      <meta name="description" content={description} />
      <link rel="canonical" href={pageUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="AIMehendi.in" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={pageUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default PageSEO;
