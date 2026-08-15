import { Link } from "react-router-dom";
import { GALLERY_CATEGORIES } from "@/data/galleryCategories";

interface CategoryLinksProps {
  /** Category slug to omit (e.g. the page you're already on) */
  exclude?: string;
  heading?: string;
  intro?: string;
  className?: string;
}

/**
 * Contextual, crawlable links to the six gallery category pages.
 * Used on the homepage gallery section, /gallery, category pages and /generate.
 */
const CategoryLinks = ({ exclude, heading, intro, className = "" }: CategoryLinksProps) => {
  const categories = GALLERY_CATEGORIES.filter((c) => c.slug !== exclude);

  return (
    <nav aria-label="Mehendi design collections" className={className}>
      {heading && (
        <h2 className="font-serif text-2xl font-bold text-foreground mb-2">{heading}</h2>
      )}
      {intro && <p className="text-muted-foreground mb-5">{intro}</p>}
      <ul className="flex flex-wrap gap-3">
        {categories.map((c) => (
          <li key={c.slug}>
            <Link
              to={`/gallery/${c.slug}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card text-sm text-foreground hover:border-secondary hover:text-secondary transition-colors"
            >
              <span>{c.label} Mehndi Designs</span>
              <span className="text-muted-foreground">{c.labelHi}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoryLinks;
