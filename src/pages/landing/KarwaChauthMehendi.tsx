import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet-async";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { Sparkles, Moon, Star, ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const KarwaChauthMehendi = () => {
  const siteUrl = "https://aimehendi.in";
  const pageUrl = `${siteUrl}/karwa-chauth-mehndi-design`;

  // Fetch festival/relevant gallery images
  const { data: festivalDesigns = [] } = useQuery({
    queryKey: ["karwachauth-designs-landing"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("id, image_url, title, title_hindi, description")
        .or("category.eq.Festival,category.eq.Simple,category.eq.Arabic")
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
    name: "Karwa Chauth Mehndi Design - करवा चौथ मेहंदी",
    description: "Beautiful karwa chauth mehndi design collection 2026. Simple and elegant henna patterns for married women on Karwa Chauth festival.",
    url: pageUrl,
    author: {
      "@type": "Person",
      name: "Dheeraj Tagde",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Karwa Chauth के लिए कौन सी mehendi design best है?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Karwa Chauth के लिए moon और stars वाली designs, couple motifs, kalash patterns, और traditional paisley designs best हैं। Simple yet elegant designs prefer करें जो जल्दी dry हो जाएं।"
        }
      },
      {
        "@type": "Question",
        name: "Karwa Chauth की mehendi कब लगानी चाहिए?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Karwa Chauth से 1 दिन पहले या सुबह जल्दी mehendi लगवाएं। इससे color अच्छा develop होता है और शाम तक dry भी हो जाती है।"
        }
      },
      {
        "@type": "Question",
        name: "Simple karwa chauth mehendi कितने time में हो जाती है?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Simple karwa chauth mehendi design 30-45 minutes में complete हो जाती है। Finger और back hand पर simple patterns जल्दी बन जाते हैं।"
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Karwa Chauth Mehndi Design 2026 | करवा चौथ मेहंदी - AIMehendi.in</title>
        <meta name="title" content="Karwa Chauth Mehndi Design 2026 | करवा चौथ मेहंदी" />
        <meta name="description" content="Karwa Chauth mehndi design की beautiful collection। Simple करवा चौथ मेहंदी patterns, moon designs, और couple motifs। Free download करें!" />
        <meta name="keywords" content="karwa chauth mehndi design, karwa chauth mehendi, करवा चौथ मेहंदी, karva chauth mehndi, simple karwa chauth mehndi, karwa chauth 2026 mehendi" />
        <meta name="author" content="Dheeraj Tagde" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={pageUrl} />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content="Karwa Chauth Mehndi Design 2026 | करवा चौथ मेहंदी" />
        <meta property="og:description" content="Beautiful karwa chauth mehndi design collection। Simple और elegant patterns!" />
        <meta property="og:image" content={`${siteUrl}/og-image.jpg`} />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Karwa Chauth Mehndi Design 2026" />
        <meta name="twitter:description" content="करवा चौथ मेहंदी design collection" />
        
        <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <BreadcrumbSchema items={[{ name: "Karwa Chauth Mehndi Design", item: "/karwa-chauth-mehndi-design" }]} />

      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5" />
          <div className="container relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-6">
                <Moon className="h-4 w-4 text-primary" aria-hidden="true" />
                <span className="text-sm font-medium text-primary">Festival Special 2026</span>
              </div>
              
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Karwa Chauth <span className="text-secondary">Mehndi Design</span>
                <span className="block text-2xl md:text-3xl mt-2 text-muted-foreground font-normal">
                  करवा चौथ मेहंदी Collection 2026
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                करवा चौथ के शुभ अवसर पर अपने हाथों को सजाएं beautiful mehndi designs से। 
                Moon, couple motifs, और traditional patterns की exclusive collection।
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-gold">
                  <Link to="/generate">
                    <Sparkles className="h-5 w-5 mr-2" aria-hidden="true" />
                    AI से Design बनाएं
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/gallery/festival">
                    <Star className="h-5 w-5 mr-2" aria-hidden="true" />
                    Festival Gallery
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
                <div className="text-3xl font-bold text-secondary mb-1">🌙</div>
                <div className="text-sm text-muted-foreground">Moon Designs</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary mb-1">💑</div>
                <div className="text-sm text-muted-foreground">Couple Motifs</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary mb-1">Simple</div>
                <div className="text-sm text-muted-foreground">Easy Patterns</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary mb-1">Free</div>
                <div className="text-sm text-muted-foreground">Download HD</div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Karwa Chauth <span className="text-secondary">Mehndi Designs</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                करवा चौथ के लिए special mehndi patterns। Simple से elaborate तक सभी styles।
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {festivalDesigns.map((design) => (
                <div
                  key={design.id}
                  className="group relative aspect-square rounded-xl overflow-hidden bg-muted border border-border shadow-soft hover:shadow-card transition-all duration-300"
                >
                  <img
                    src={design.image_url}
                    alt={`${design.title} - Karwa Chauth Mehndi Design`}
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
                <Link to="/gallery/festival">
                  सभी Festival Designs देखें
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
                Karwa Chauth Mehndi Design: Complete Guide
              </h2>
              
              <div className="space-y-6 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Karwa Chauth mehndi design</strong> में moon, stars, 
                  और couple motifs का special significance है। यह festival married women के लिए है और 
                  mehendi इस दिन का important part है।
                </p>
                
                <h3 className="font-serif text-xl font-bold text-foreground">Popular Karwa Chauth Mehndi Motifs</h3>
                <ul className="space-y-2">
                  <li><strong>Chand-Sitare:</strong> Moon और stars करवा चौथ की पहचान हैं</li>
                  <li><strong>Couple Designs:</strong> Pati-patni के portraits या silhouettes</li>
                  <li><strong>Kalash Pattern:</strong> Traditional kalash design for prosperity</li>
                  <li><strong>Chalni Motif:</strong> छलनी का design करवा चौथ special</li>
                  <li><strong>Diya और Thali:</strong> Pooja thali elements in mehendi</li>
                </ul>

                <h3 className="font-serif text-xl font-bold text-foreground">करवा चौथ Mehendi Tips</h3>
                <p>
                  Perfect <strong>karwa chauth mehndi design</strong> के लिए:
                </p>
                <ol className="space-y-2">
                  <li>एक दिन पहले या सुबह जल्दी लगवाएं</li>
                  <li>Simple designs चुनें जो जल्दी dry हों</li>
                  <li>Moon और couple elements जरूर include करें</li>
                  <li>Back hand पर main design रखें</li>
                  <li>Fingers पर simple patterns बनाएं</li>
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
                Karwa Chauth Mehendi FAQs | सवाल-जवाब
              </h2>
              
              <div className="space-y-6">
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="font-semibold text-foreground mb-2">
                    Karwa Chauth के लिए कौन सी mehendi design best है?
                  </h3>
                  <p className="text-muted-foreground">
                    Moon और stars वाली designs, couple motifs, kalash patterns, 
                    और traditional paisley designs best हैं।
                  </p>
                </div>
                
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="font-semibold text-foreground mb-2">
                    Karwa Chauth की mehendi कब लगानी चाहिए?
                  </h3>
                  <p className="text-muted-foreground">
                    Karwa Chauth से 1 दिन पहले या सुबह जल्दी mehendi लगवाएं।
                  </p>
                </div>
                
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="font-semibold text-foreground mb-2">
                    Simple karwa chauth mehendi कितने time में हो जाती है?
                  </h3>
                  <p className="text-muted-foreground">
                    Simple karwa chauth mehendi design 30-45 minutes में complete हो जाती है।
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                AI से अपना Custom Karwa Chauth Design बनाएं!
              </h2>
              <p className="text-muted-foreground mb-8">
                हमारे AI Mehendi Generator से seconds में unique karwa chauth mehndi design create करें।
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

export default KarwaChauthMehendi;
