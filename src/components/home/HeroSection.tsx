import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBanner from "@/assets/hero-banner.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 mehendi-pattern opacity-50" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-secondary/20 blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-accent/20 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-primary/10 blur-2xl animate-float" style={{ animationDelay: "4s" }} />

      <div className="container relative z-10 py-16 md:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6 animate-fade-in">
            <Sparkles className="h-4 w-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">
              #1 AI Mehendi Design Generator
            </span>
            <Star className="h-4 w-4 text-secondary fill-secondary" />
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6 animate-fade-in-up">
            AI से बनाएं{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              खूबसूरत मेहंदी
            </span>{" "}
            डिज़ाइन
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            अपनी पसंद का मेहंदी डिज़ाइन AI से बनाएं - Bridal, Arabic, Mandala और Simple डिज़ाइन्स
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <Button variant="hero" size="xl" asChild className="group">
              <Link to="/generate">
                <Sparkles className="h-5 w-5" />
                फ्री में डिज़ाइन बनाएं
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="outline-gold" size="xl" asChild>
              <Link to="/gallery">
                गैलरी देखें
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-4 max-w-lg mx-auto animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            <div className="text-center">
              <div className="font-serif text-2xl md:text-3xl font-bold text-foreground">10K+</div>
              <div className="text-xs md:text-sm text-muted-foreground">Designs Created</div>
            </div>
            <div className="text-center border-x border-border">
              <div className="font-serif text-2xl md:text-3xl font-bold text-foreground">50+</div>
              <div className="text-xs md:text-sm text-muted-foreground">Design Styles</div>
            </div>
            <div className="text-center">
              <div className="font-serif text-2xl md:text-3xl font-bold text-foreground">Free</div>
              <div className="text-xs md:text-sm text-muted-foreground">AI Generator</div>
            </div>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="mt-16 relative max-w-5xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border">
            <img 
              src={heroBanner} 
              alt="AI Mehendi Design Generator - Beautiful Henna Patterns" 
              className="w-full aspect-[16/9] object-cover"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </div>
          
          {/* Decorative glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-3xl -z-10 rounded-3xl" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
