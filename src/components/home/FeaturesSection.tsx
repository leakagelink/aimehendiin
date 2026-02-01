import { Sparkles, Palette, Download, Zap, Heart, Globe } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Design",
    titleHi: "AI डिज़ाइन",
    description: "Advanced AI generates unique, beautiful mehendi patterns instantly.",
    descriptionHi: "हमारी AI तुरंत खूबसूरत मेहंदी पैटर्न बनाती है।",
  },
  {
    icon: Palette,
    title: "Multiple Styles",
    titleHi: "कई स्टाइल",
    description: "Choose from Bridal, Arabic, Mandala, Simple, and more design styles.",
    descriptionHi: "Bridal, Arabic, Mandala जैसे कई स्टाइल उपलब्ध।",
  },
  {
    icon: Download,
    title: "Free Downloads",
    titleHi: "फ्री डाउनलोड",
    description: "Download your generated designs in high quality for free.",
    descriptionHi: "अपने डिज़ाइन हाई क्वालिटी में फ्री डाउनलोड करें।",
  },
  {
    icon: Zap,
    title: "Instant Generation",
    titleHi: "तुरंत बनाएं",
    description: "Get your custom mehendi design in just seconds, not hours.",
    descriptionHi: "कुछ सेकंड में अपना कस्टम डिज़ाइन पाएं।",
  },
  {
    icon: Heart,
    title: "Save Favorites",
    titleHi: "पसंदीदा सेव करें",
    description: "Save your favorite designs to access them anytime.",
    descriptionHi: "अपने पसंदीदा डिज़ाइन सेव करें।",
  },
  {
    icon: Globe,
    title: "Hinglish Support",
    titleHi: "हिंदी सपोर्ट",
    description: "Full support for Hindi and English mixed content.",
    descriptionHi: "हिंदी और English दोनों में उपलब्ध।",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-10 md:py-24 bg-muted/50 mehendi-pattern">
      <div className="container px-4">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-serif text-2xl md:text-4xl font-bold text-foreground mb-2 md:mb-4">
            Why Choose <span className="text-secondary">AIMehendi</span>?
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto px-2">
            हमारे AI Generator की खास बातें | Unique features of our AI Mehendi Generator
          </p>
        </div>

        {/* Features Grid - 2 columns on mobile, 3 on larger */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group bg-card rounded-xl md:rounded-2xl p-3 md:p-6 shadow-soft hover:shadow-card transition-all duration-300 border border-border hover:border-secondary/30 card-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon - smaller on mobile */}
              <div className="h-10 w-10 md:h-14 md:w-14 rounded-lg md:rounded-xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 flex items-center justify-center mb-2 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-5 w-5 md:h-7 md:w-7 text-secondary" aria-hidden="true" />
              </div>

              {/* Content - compact on mobile */}
              <h3 className="font-serif text-sm md:text-xl font-semibold text-foreground mb-1 md:mb-2 leading-tight">
                {feature.title}
              </h3>
              <p className="text-[10px] md:text-xs text-secondary font-medium mb-1 md:mb-2">
                {feature.titleHi}
              </p>
              {/* Hide English description on mobile, show Hindi only for space */}
              <p className="hidden md:block text-muted-foreground text-sm">
                {feature.description}
              </p>
              <p className="text-muted-foreground text-xs md:text-xs leading-snug">
                {feature.descriptionHi}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
