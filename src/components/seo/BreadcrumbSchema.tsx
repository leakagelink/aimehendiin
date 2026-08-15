import { Helmet } from "react-helmet-async";

export interface Crumb {
  name: string;
  /** Absolute URL or site-relative path, e.g. "/gallery" */
  item: string;
}

const SITE_URL = "https://aimehendi.in";

const toAbsolute = (item: string) =>
  item.startsWith("http") ? item : `${SITE_URL}${item}`;

/**
 * Emits BreadcrumbList JSON-LD. Always prefixes a "Home" crumb.
 */
const BreadcrumbSchema = ({ items }: { items: Crumb[] }) => {
  const all: Crumb[] = [{ name: "Home", item: `${SITE_URL}/` }, ...items];

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: toAbsolute(crumb.item),
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default BreadcrumbSchema;
