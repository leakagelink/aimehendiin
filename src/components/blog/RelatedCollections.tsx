import { Link } from "react-router-dom";
import { Images } from "lucide-react";

interface RelatedCollectionsProps {
  /** Blog post category (DB value) */
  category?: string | null;
  tags?: string[] | null;
  title?: string | null;
}

interface CollectionLink {
  to: string;
  anchor: string;
  blurb: string;
  /** keywords that make this collection relevant to a post */
  match: string[];
}

const COLLECTIONS: CollectionLink[] = [
  {
    to: "/gallery/bridal",
    anchor: "Bridal Mehndi Designs gallery",
    blurb: "Full-hand dulhan patterns, jaal work aur portrait motifs.",
    match: ["bridal", "dulhan", "shaadi", "wedding", "back hand"],
  },
  {
    to: "/gallery/arabic",
    anchor: "Arabic Mehndi Designs collection",
    blurb: "Bold floral vines aur flowing back-hand patterns.",
    match: ["arabic", "left hand", "vine"],
  },
  {
    to: "/gallery/simple",
    anchor: "Simple Mehndi Designs",
    blurb: "Easy, minimal patterns jo 10–15 minute mein ban jaate hain.",
    match: ["simple", "easy", "beginner", "beginners", "minimal", "palm", "hatheli"],
  },
  {
    to: "/gallery/finger",
    anchor: "Finger Mehndi Designs",
    blurb: "Ring-style motifs, fingertip shading aur thin strips.",
    match: ["finger", "ungli", "fingertip"],
  },
  {
    to: "/gallery/mandala",
    anchor: "Mandala Mehndi Designs",
    blurb: "Circular, symmetrical motifs — beginners ke liye perfect practice.",
    match: ["mandala", "gol tikki", "circle", "round", "tikki"],
  },
  {
    to: "/gallery/festival",
    anchor: "Festival Mehndi Designs",
    blurb: "Karwa Chauth, Teej, Diwali aur Eid ke occasion-wise designs.",
    match: ["festival", "karwa", "diwali", "teej", "eid", "raksha", "rakhi", "diya"],
  },
  {
    to: "/bridal-mehendi-design-2026",
    anchor: "Bridal Mehendi Design 2026 trends",
    blurb: "Is saal ke latest dulhan mehendi trends ek jagah.",
    match: ["bridal", "dulhan", "shaadi", "wedding"],
  },
  {
    to: "/karwa-chauth-mehndi-design",
    anchor: "Karwa Chauth Mehndi Designs",
    blurb: "Chalni, moon aur couple motifs Karwa Chauth ke liye.",
    match: ["karwa", "chauth"],
  },
];

const RelatedCollections = ({ category, tags, title }: RelatedCollectionsProps) => {
  const haystack = [category ?? "", title ?? "", ...(tags ?? [])].join(" ").toLowerCase();

  const relevant = COLLECTIONS.filter((c) => c.match.some((m) => haystack.includes(m))).slice(0, 3);

  if (relevant.length === 0) return null;

  return (
    <section className="mt-10 bg-card border border-border rounded-2xl p-6 md:p-8">
      <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
        <Images className="h-5 w-5 text-secondary" aria-hidden="true" />
        Isi topic ke designs dekhen
      </h2>
      <p className="text-sm text-muted-foreground mb-5">
        Is article se related free HD designs browse karen ya{" "}
        <Link to="/generate" className="text-secondary underline underline-offset-4">
          AI se apna custom design banaye
        </Link>
        .
      </p>
      <ul className="grid sm:grid-cols-2 gap-4">
        {relevant.map((c) => (
          <li key={c.to} className="rounded-xl border border-border p-4">
            <Link
              to={c.to}
              className="font-medium text-secondary underline underline-offset-4"
            >
              {c.anchor}
            </Link>
            <p className="text-sm text-muted-foreground mt-1">{c.blurb}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RelatedCollections;
