import { Helmet } from "react-helmet-async";

interface PageSEOProps {
  title: string;
  description: string;
  /** Site-relative path, e.g. "/generate". Used for the single canonical of this route. */
  path: string;
  image?: string;
  type?: string;
  keywords?: string;
  /** Internal/private routes: emit robots noindex, nofollow */
  noindex?: boolean;
  /** Append " | AIMehendi.in" to the title (default true) */
  appendSiteName?: boolean;
}

const PageSEO = ({
  title,
  description,
  path,
  image,
  type = "website",
  keywords,
  noindex = false,
  appendSiteName = true,
}: PageSEOProps) => {
  const siteUrl = "https://aimehendi.in";
  const pageUrl = `${siteUrl}${path}`;
  const ogImage = image || `${siteUrl}/og-image.jpg`;
  const fullTitle = appendSiteName ? `${title} | AIMehendi.in` : title;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta
        name="robots"
        content={noindex ? "noindex, nofollow" : "index, follow"}
      />
      {!noindex && <link rel="canonical" href={pageUrl} />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="AIMehendi.in" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={pageUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default PageSEO;
