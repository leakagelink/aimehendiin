import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Sparkles, Hand, Images, BookOpen, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { GALLERY_CATEGORIES } from "@/data/galleryCategories";

const quickActions = [
  { to: "/generate", label: "AI डिज़ाइन", icon: Sparkles },
  { to: "/try-on", label: "Try-On", icon: Hand },
  { to: "/gallery", label: "गैलरी", icon: Images },
  { to: "/blog", label: "टिप्स", icon: BookOpen },
];

/** App-style home screen shown only on small screens (md:hidden). */
const MobileHome = () => {
  const { data: designs = [], isLoading } = useQuery({
    queryKey: ["mobile-home-designs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("id, image_url, title, title_hindi, category")
        .order("created_at", { ascending: false })
        .limit(10);
      if (error) throw error;
      return data ?? [];
    },
  });

  return (
    <section className="md:hidden px-4 pt-4 pb-6 space-y-6" aria-label="AIMehendi app home">
      {/* Compact hero card */}
      <div className="relative overflow-hidden rounded-3xl gradient-hero p-5 shadow-card">
        <div className="absolute inset-0 mehendi-pattern opacity-30" aria-hidden="true" />
        <div className="relative">
          <p className="text-xs font-medium text-primary-foreground/80 mb-1">नमस्ते 👋</p>
          <h1 className="font-serif text-2xl font-bold text-primary-foreground leading-tight mb-2">
            AI से बनाएं खूबसूरत मेहंदी डिज़ाइन
          </h1>
          <p className="text-sm text-primary-foreground/85 mb-4">
            Bridal, Arabic, Mandala और Simple डिज़ाइन्स — सेकंडों में।
          </p>
          <Link
            to="/generate"
            className="inline-flex items-center justify-center gap-2 w-full h-12 rounded-2xl bg-background text-foreground font-semibold active:scale-[0.98] transition-transform"
          >
            <Sparkles className="h-5 w-5 text-secondary" aria-hidden="true" />
            फ्री में डिज़ाइन बनाएं
          </Link>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-4 gap-3">
        {quickActions.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
          >
            <span className="h-14 w-14 rounded-2xl bg-card border border-border flex items-center justify-center shadow-soft">
              <Icon className="h-6 w-6 text-secondary" aria-hidden="true" />
            </span>
            <span className="text-xs font-medium text-foreground">{label}</span>
          </Link>
        ))}
      </div>

      {/* Category chips */}
      <div className="-mx-4 px-4 flex gap-2 overflow-x-auto snap-x no-scrollbar">
        {GALLERY_CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            to={`/gallery/${c.slug}`}
            className="snap-start shrink-0 px-4 h-9 inline-flex items-center rounded-full bg-muted text-sm text-foreground"
          >
            {c.labelHi}
          </Link>
        ))}
      </div>

      {/* Horizontal design cards */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-serif text-lg font-bold text-foreground">नए डिज़ाइन्स</h2>
          <Link to="/gallery" className="text-sm text-secondary inline-flex items-center" aria-label="View all designs">
            सभी <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="-mx-4 px-4 flex gap-3 overflow-x-auto snap-x snap-mandatory no-scrollbar">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="shrink-0 w-40 h-52 rounded-2xl" />
              ))
            : designs.map((d) => (
                <Link
                  key={d.id}
                  to={`/gallery/${d.category}`}
                  className="snap-start shrink-0 w-40 rounded-2xl overflow-hidden bg-card border border-border active:scale-[0.98] transition-transform"
                >
                  <img
                    src={d.image_url}
                    alt={d.title}
                    loading="lazy"
                    width={160}
                    height={176}
                    className="w-40 h-44 object-cover"
                  />
                  <p className="px-2.5 py-2 text-xs font-medium text-foreground truncate">
                    {d.title_hindi || d.title}
                  </p>
                </Link>
              ))}
        </div>
      </div>
    </section>
  );
};

export default MobileHome;
