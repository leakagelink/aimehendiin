import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "होम", nameEn: "Home", path: "/" },
    { name: "AI जनरेटर", nameEn: "Generator", path: "/generate" },
    { name: "Try-On", nameEn: "Virtual Try-On", path: "/try-on" },
    { name: "गैलरी", nameEn: "Gallery", path: "/gallery" },
    { name: "ब्लॉग", nameEn: "Blog", path: "/blog" },
    { name: "About", nameEn: "About", path: "/about" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group" aria-label="AIMehendi.in - Home">
          <div className="relative">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-gold group-hover:shadow-glow transition-all duration-300 overflow-hidden">
              <img
                src="/favicon.png"
                alt="AIMehendi.in logo"
                width={40}
                height={40}
                className="h-9 w-9 object-contain"
              />
            </div>
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary via-secondary to-accent opacity-20 blur-sm group-hover:opacity-40 transition-opacity" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl font-bold text-foreground">
              AI<span className="text-secondary">Mehendi</span>
            </span>
            <span className="text-[10px] text-muted-foreground -mt-1">
              .in
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                isActive(link.path)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="hero" size="lg" asChild>
            <Link to="/generate">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              फ्री डिज़ाइन बनाएं
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-foreground" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/50 bg-background animate-fade-in">
          <nav className="container py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Button variant="hero" size="lg" className="mt-4" asChild>
              <Link to="/generate" onClick={() => setIsMenuOpen(false)}>
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                फ्री डिज़ाइन बनाएं
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
