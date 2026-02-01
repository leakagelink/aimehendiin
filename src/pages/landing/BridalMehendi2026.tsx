import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { Sparkles, Heart, Star, ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const BridalMehendi2026 = () => {
  const siteUrl = "https://aimehendi.in";
  const pageUrl = `${siteUrl}/bridal-mehendi-design-2026`;

  // Fetch bridal gallery images
  const { data: bridalDesigns = [] } = useQuery({
    queryKey: ["bridal-designs-landing"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("id, image_url, title, title_hindi, description")
        .eq("category", "Bridal")
        .order("created_at", { ascending: false })
        .limit(12);
      
      if (error) throw error;
      return data || [];
    },
  });

  // JSON-LD Schema
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Bridal Mehendi Design 2026 - दुल्हन मेहंदी डिज़ाइन",
    description: "Latest bridal mehendi design 2026 collection. Dulhan mehendi design latest trends, traditional and modern bridal henna patterns.",
    url: pageUrl,
    author: {
      "@type": "Person",
      name: "Dheeraj Tagde",
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: bridalDesigns.map((design, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "ImageObject",
          name: design.title,
          contentUrl: design.image_url,
        },
      })),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "2026 में bridal mehendi design के latest trends क्या हैं?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "2026 में bridal mehendi trends में minimalist florals, intricate mandala patterns, personalized motifs जैसे couple portraits, और traditional peacock designs शामिल हैं। Back hand पर elaborate designs और front palm पर detailed work trending है।"
        }
      },
      {
        "@type": "Question",
        name: "Dulhan mehendi कितने समय पहले लगवानी चाहिए?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Wedding से 1-2 दिन पहले mehendi लगवाएं। इससे color develop होने का proper time मिलता है और dark stain आता है। Night में लगवाकर 6-8 hours छोड़ें।"
        }
      },
      {
        "@type": "Question",
        name: "Bridal mehendi का dark color कैसे लाएं?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Dark color के लिए: 1) Natural henna use करें, 2) Mehendi सूखने के बाद lemon-sugar syrup लगाएं, 3) कम से कम 6-8 hours रखें, 4) Clove smoke से सेकें, 5) पानी से बचाएं पहले 24 hours।"
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Bridal Mehendi Design 2026 | दुल्हन मेहंदी Latest Trends - AIMehendi.in</title>
        <meta name="title" content="Bridal Mehendi Design 2026 | दुल्हन मेहंदी Latest Trends" />
        <meta name="description" content="Bridal mehendi design 2026 की latest collection देखें। Dulhan mehendi design latest trends, traditional और modern bridal henna patterns। Free download करें!" />
        <meta name="keywords" content="bridal mehendi design 2026, dulhan mehendi design latest, bridal mehndi 2026, wedding mehendi design, दुल्हन मेहंदी डिज़ाइन, शादी की मेहंदी" />
        <meta name="author" content="Dheeraj Tagde" />
        <link rel="canonical" href={pageUrl} />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content="Bridal Mehendi Design 2026 | दुल्हन मेहंदी Latest" />
        <meta property="og:description" content="Latest bridal mehendi design 2026 collection। Dulhan mehendi trends और free download!" />
        <meta property="og:image" content={`${siteUrl}/og-image.jpg`} />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bridal Mehendi Design 2026" />
        <meta name="twitter:description" content="Dulhan mehendi design latest 2026 collection" />
        
        <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-secondary/10 via-primary/5 to-accent/10 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5" />
          <div className="container relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 border border-secondary/30 mb-6">
                <Heart className="h-4 w-4 text-secondary" aria-hidden="true" />
                <span className="text-sm font-medium text-secondary">Wedding Collection 2026</span>
              </div>
              
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Bridal Mehendi Design <span className="text-secondary">2026</span>
                <span className="block text-2xl md:text-3xl mt-2 text-muted-foreground font-normal">
                  दुल्हन मेहंदी डिज़ाइन Latest Collection
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                अपनी शादी के लिए सबसे खूबसूरत bridal mehendi design 2026 collection देखें। 
                Traditional से modern तक, हर style में dulhan mehendi design latest trends।
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-gold">
                  <Link to="/generate">
                    <Sparkles className="h-5 w-5 mr-2" aria-hidden="true" />
                    AI से Design बनाएं
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/gallery/bridal">
                    <Star className="h-5 w-5 mr-2" aria-hidden="true" />
                    पूरी Gallery देखें
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-card border-y border-border">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-secondary mb-1">500+</div>
                <div className="text-sm text-muted-foreground">Bridal Designs</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary mb-1">2026</div>
                <div className="text-sm text-muted-foreground">Latest Trends</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary mb-1">Free</div>
                <div className="text-sm text-muted-foreground">Download HD</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary mb-1">AI</div>
                <div className="text-sm text-muted-foreground">Custom Generator</div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Latest Bridal Mehendi <span className="text-secondary">Designs</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                2026 की सबसे popular dulhan mehendi design collection। Traditional और modern दोनों styles में।
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {bridalDesigns.map((design) => (
                <div
                  key={design.id}
                  className="group relative aspect-square rounded-xl overflow-hidden bg-muted border border-border shadow-soft hover:shadow-card transition-all duration-300"
                >
                  <img
                    src={design.image_url}
                    alt={`${design.title} - Bridal Mehendi Design 2026`}
                    title={design.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-medium text-foreground text-sm line-clamp-2 mb-2">
                        {design.title_hindi || design.title}
                      </h3>
                      <Button size="sm" variant="secondary" className="w-full">
                        <Download className="h-4 w-4 mr-1" aria-hidden="true" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Button asChild size="lg" variant="outline">
                <Link to="/gallery/bridal">
                  सभी Bridal Designs देखें
                  <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Content Section for SEO */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto prose prose-lg">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6">
                Bridal Mehendi Design 2026: Complete Guide
              </h2>
              
              <div className="space-y-6 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Bridal mehendi design 2026</strong> में कई नए trends देखने को मिल रहे हैं। 
                  इस साल <strong>dulhan mehendi design latest</strong> collection में minimalist patterns, 
                  personalized motifs, और fusion styles काफी popular हैं।
                </p>
                
                <h3 className="font-serif text-xl font-bold text-foreground">2026 Bridal Mehendi Trends</h3>
                <ul className="space-y-2">
                  <li><strong>Minimalist Florals:</strong> Simple yet elegant flower patterns जो modern brides prefer करती हैं</li>
                  <li><strong>Couple Portraits:</strong> Dulha-dulhan की personalized portraits mehendi में</li>
                  <li><strong>Mandala Centerpieces:</strong> Palm center में intricate mandala designs</li>
                  <li><strong>Negative Space Art:</strong> Skin को design का part बनाना</li>
                  <li><strong>Extended Arm Coverage:</strong> Wrist से shoulder तक elaborate patterns</li>
                </ul>

                <h3 className="font-serif text-xl font-bold text-foreground">Dulhan Mehendi के लिए Tips</h3>
                <p>
                  Perfect <strong>bridal mehendi design 2026</strong> के लिए कुछ important tips:
                </p>
                <ol className="space-y-2">
                  <li>Wedding से 2 दिन पहले mehendi लगवाएं</li>
                  <li>Natural, chemical-free henna use करें</li>
                  <li>कम से कम 6-8 hours mehendi रखें</li>
                  <li>Lemon-sugar mixture से seal करें</li>
                  <li>पानी से 24 hours बचाएं</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
                Bridal Mehendi FAQs | अक्सर पूछे जाने वाले सवाल
              </h2>
              
              <div className="space-y-6">
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="font-semibold text-foreground mb-2">
                    2026 में bridal mehendi design के latest trends क्या हैं?
                  </h3>
                  <p className="text-muted-foreground">
                    2026 में bridal mehendi trends में minimalist florals, intricate mandala patterns, 
                    personalized motifs जैसे couple portraits, और traditional peacock designs शामिल हैं।
                  </p>
                </div>
                
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="font-semibold text-foreground mb-2">
                    Dulhan mehendi कितने समय पहले लगवानी चाहिए?
                  </h3>
                  <p className="text-muted-foreground">
                    Wedding से 1-2 दिन पहले mehendi लगवाएं। इससे color develop होने का proper time मिलता है।
                  </p>
                </div>
                
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="font-semibold text-foreground mb-2">
                    Bridal mehendi का dark color कैसे लाएं?
                  </h3>
                  <p className="text-muted-foreground">
                    Dark color के लिए natural henna use करें, lemon-sugar syrup लगाएं, 
                    6-8 hours रखें, और पानी से बचाएं।
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-secondary/10 via-primary/5 to-accent/10">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                AI से अपना Custom Bridal Design बनाएं!
              </h2>
              <p className="text-muted-foreground mb-8">
                हमारे AI Mehendi Generator से seconds में unique bridal mehendi design 2026 create करें।
              </p>
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-gold">
                <Link to="/generate">
                  <Sparkles className="h-5 w-5 mr-2" aria-hidden="true" />
                  Free में Design Generate करें
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BridalMehendi2026;
