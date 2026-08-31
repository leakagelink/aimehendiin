import { Link } from "react-router-dom";
import { Sparkles, Heart, Instagram, Youtube, Facebook } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    explore: [
      { name: "AI Generator", path: "/generate" },
      { name: "Virtual Try-On", path: "/try-on" },
      { name: "Gallery", path: "/gallery" },

      { name: "Bridal Mehendi", path: "/gallery/bridal" },
      { name: "Arabic Designs", path: "/gallery/arabic" },
    ],
    categories: [
      { name: "Mandala Design", path: "/gallery/mandala" },
      { name: "Simple Mehendi", path: "/gallery/simple" },
      { name: "Finger Mehendi", path: "/gallery/finger" },
      { name: "Festival Special", path: "/gallery/festival" },
    ],
    company: [
      { name: "About Us", path: "/about" },
      { name: "Contact", path: "/contact" },
      { name: "Blog", path: "/blog" },
    ],
    legal: [
      { name: "Privacy Policy", path: "/privacy-policy" },
      { name: "Cookie Policy", path: "/cookie-policy" },
      { name: "Terms of Service", path: "/terms-of-service" },
      { name: "Disclaimer", path: "/disclaimer" },
      { name: "Editorial Policy", path: "/editorial-policy" },
    ],
  };

  return (
    <footer className="border-t border-border bg-card mehendi-pattern">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4" aria-label="AIMehendi.in - Home">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-gold overflow-hidden">
                <img
                  src="/favicon.png"
                  alt="AIMehendi.in logo"
                  width={40}
                  height={40}
                  className="h-9 w-9 object-contain"
                />
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
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              AI से बनाएं खूबसूरत मेहंदी डिज़ाइन। Free AI Mehendi Design Generator for all occasions.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/aimehendi.in"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="https://www.youtube.com/@aimehendi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Subscribe on YouTube"
                className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Youtube className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="https://www.facebook.com/aimehendi.in"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Facebook className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-serif font-semibold text-foreground mb-4">Explore</h4>
            <ul className="space-y-2">
              {footerLinks.explore.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-serif font-semibold text-foreground mb-4">Categories</h4>
            <ul className="space-y-2">
              {footerLinks.categories.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-serif font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-serif font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclosure */}
        <p className="border-t border-border mt-12 pt-8 text-xs text-muted-foreground text-center md:text-left">
          Disclosure: Is website par dikhne wali kai mehendi design images artificial intelligence se
          generate ki gayi hain aur creative reference ke liye hain. Site Google AdSense ads aur affiliate
          links se supported hai. Zyada jaankari ke liye{" "}
          <Link to="/editorial-policy" className="text-primary underline underline-offset-4">
            Editorial Policy
          </Link>{" "}
          aur{" "}
          <Link to="/disclaimer" className="text-primary underline underline-offset-4">
            Disclaimer
          </Link>{" "}
          padhein.
        </p>

        {/* Bottom Bar */}
        <div className="mt-8 pt-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {currentYear} AIMehendi.in. Published by Dheeraj Tagde. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-accent fill-accent" aria-hidden="true" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
