import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-mehendi-dark" />
      <div className="absolute inset-0 mehendi-pattern opacity-10" />
      
      {/* Decorative Elements - contained within section */}
      <div className="absolute top-10 left-4 md:left-10 w-20 md:w-32 h-20 md:h-32 rounded-full bg-secondary/20 blur-3xl" />
      <div className="absolute bottom-10 right-4 md:right-10 w-24 md:w-40 h-24 md:h-40 rounded-full bg-accent/20 blur-3xl" />

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-secondary/20 backdrop-blur-sm mb-6">
            <Sparkles className="h-8 w-8 text-secondary" aria-hidden="true" />
          </div>

          {/* Title */}
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4 px-2">
            अभी बनाएं अपना{" "}
            <span className="text-secondary">Perfect</span>{" "}
            मेहंदी डिज़ाइन
          </h2>

          {/* Description */}
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Free AI Mehendi Generator - No signup required! 
            बिना signup के फ्री में डिज़ाइन बनाएं।
          </p>

          {/* CTA Button */}
          <Button variant="gold" size="xl" asChild className="group">
            <Link to="/generate">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
              Start Creating | शुरू करें
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Button>

          {/* Trust Indicators */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-primary-foreground/70">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-secondary" />
              100% Free
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-secondary" />
              No Signup Required
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-secondary" />
              Unlimited Downloads
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
