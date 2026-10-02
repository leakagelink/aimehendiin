import { Link, useLocation } from "react-router-dom";
import { Home, Sparkles, Hand, Images, BookOpen } from "lucide-react";

const tabs = [
  { path: "/", label: "होम", icon: Home, aria: "Home" },
  { path: "/gallery", label: "गैलरी", icon: Images, aria: "Gallery" },
  { path: "/generate", label: "बनाएं", icon: Sparkles, aria: "AI Generator", primary: true },
  { path: "/try-on", label: "Try-On", icon: Hand, aria: "Virtual Try-On" },
  { path: "/blog", label: "ब्लॉग", icon: BookOpen, aria: "Blog" },
];

const HIDDEN_ON = ["/admin", "/auth", "/seo-report"];

const MobileBottomNav = () => {
  const { pathname } = useLocation();
  if (HIDDEN_ON.some((p) => pathname.startsWith(p))) return null;

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <nav
      aria-label="App navigation"
      className="md:hidden fixed bottom-0 inset-x-0 z-50 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85 pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="grid grid-cols-5 h-16">
        {tabs.map(({ path, label, icon: Icon, aria, primary }) => {
          const active = isActive(path);
          return (
            <li key={path} className="flex">
              <Link
                to={path}
                aria-label={aria}
                aria-current={active ? "page" : undefined}
                className="flex-1 flex flex-col items-center justify-center gap-0.5 select-none active:scale-95 transition-transform"
              >
                {primary ? (
                  <span className="-mt-6 h-12 w-12 rounded-full gradient-hero flex items-center justify-center shadow-gold border-4 border-background">
                    <Icon className="h-5 w-5 text-primary-foreground" aria-hidden="true" />
                  </span>
                ) : (
                  <Icon
                    className={`h-5 w-5 ${active ? "text-secondary" : "text-muted-foreground"}`}
                    aria-hidden="true"
                  />
                )}
                <span
                  className={`text-[11px] font-medium ${active ? "text-secondary" : "text-muted-foreground"}`}
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MobileBottomNav;
