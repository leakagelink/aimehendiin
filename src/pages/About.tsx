import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Helmet } from "react-helmet-async";
import { Sparkles, Users, Heart, Target, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "AIMehendi.in क्या है?",
    answer: "AIMehendi.in एक free AI-powered mehendi design generator है जो seconds में beautiful bridal, Arabic, mandala और simple mehendi designs बनाता है।"
  },
  {
    question: "क्या AI Mehendi Generator free है?",
    answer: "हाँ, हमारा AI Mehendi Generator पूरी तरह से free है। आप unlimited designs generate कर सकते हैं बिना किसी payment के।"
  },
  {
    question: "कौन-कौन से mehendi design styles available हैं?",
    answer: "हमारे पास Bridal, Arabic, Mandala, Simple, Finger और Back Hand designs available हैं। आप Intricate, Minimal, Floral, Geometric, Traditional और Modern styles भी choose कर सकते हैं।"
  },
  {
    question: "Generated designs को download कैसे करें?",
    answer: "Design generate होने के बाद Download button पर click करें। Image automatically आपके device में save हो जाएगी।"
  },
  {
    question: "क्या मैं commercial use के लिए designs use कर सकता/सकती हूं?",
    answer: "हाँ, आप generated designs को personal और commercial दोनों purposes के लिए use कर सकते हैं। Mehendi artists इन्हें reference के तौर पर भी use कर सकते हैं।"
  },
  {
    question: "Mobile पर काम करता है?",
    answer: "हाँ, AIMehendi.in पूरी तरह से mobile-friendly है। आप किसी भी device - mobile, tablet या desktop पर designs generate कर सकते हैं।"
  }
];

const About = () => {
  // FAQ Schema for Google Rich Results
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>About AIMehendi.in - हमारी कहानी | AI Mehendi Generator</title>
        <meta name="title" content="About AIMehendi.in - हमारी कहानी | AI Mehendi Generator" />
        <meta name="description" content="AIMehendi.in - AI-powered mehendi design generator. भारतीय परंपरा और आधुनिक तकनीक का मिश्रण। FAQs और हमारी कहानी जानें।" />
        <meta name="author" content="Dheeraj Tagde" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://aimehendi.in/about" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aimehendi.in/about" />
        <meta property="og:title" content="About AIMehendi.in - हमारी कहानी" />
        <meta property="og:description" content="AIMehendi.in - AI-powered mehendi design generator. भारतीय परंपरा और आधुनिक तकनीक का मिश्रण।" />
        <meta property="og:image" content="https://aimehendi.in/og-image.jpg" />
        <meta property="og:site_name" content="AIMehendi.in" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About AIMehendi.in - हमारी कहानी" />
        <meta name="twitter:description" content="AIMehendi.in - AI-powered mehendi design generator. भारतीय परंपरा और आधुनिक तकनीक का मिश्रण।" />
        <meta name="twitter:image" content="https://aimehendi.in/og-image.jpg" />
        
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      
      <Header />
      
      <main className="py-8 md:py-16">
        <div className="container">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
              <Sparkles className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">
                About Us
              </span>
            </div>
            
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              About <span className="text-secondary">AIMehendi</span>.in
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Bringing the ancient art of mehendi to the digital age with AI-powered design generation.
            </p>
          </div>

          {/* Story Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-card rounded-2xl p-8 md:p-12 border border-border shadow-soft">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                Our Story | हमारी कहानी
              </h2>
              <div className="prose prose-lg text-muted-foreground">
                <p className="mb-4">
                  AIMehendi.in was born from a simple idea: make beautiful mehendi designs accessible to everyone. 
                  Whether you're a bride looking for the perfect bridal mehendi, a mehendi artist seeking inspiration, 
                  or someone who just loves the art form, our AI-powered generator is here to help.
                </p>
                <p className="mb-4">
                  हम भारतीय परंपरा और आधुनिक तकनीक का मिश्रण करके आपके लिए खूबसूरत मेहंदी डिज़ाइन बनाते हैं। 
                  हमारा AI Generator विभिन्न शैलियों जैसे Bridal, Arabic, Mandala और Simple डिज़ाइन बना सकता है।
                </p>
                <p>
                  Our mission is to preserve and promote the beautiful art of mehendi while making it accessible 
                  to everyone, regardless of their artistic skills or budget.
                </p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-card rounded-2xl p-8 border border-border shadow-soft text-center">
              <div className="h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                For Everyone
              </h3>
              <p className="text-muted-foreground">
                सबके लिए मेहंदी डिज़ाइन। Free access to beautiful designs for brides, artists, and enthusiasts.
              </p>
            </div>
            
            <div className="bg-card rounded-2xl p-8 border border-border shadow-soft text-center">
              <div className="h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                Made with Love
              </h3>
              <p className="text-muted-foreground">
                प्यार से बनाया गया। Every design is crafted with attention to detail and cultural authenticity.
              </p>
            </div>
            
            <div className="bg-card rounded-2xl p-8 border border-border shadow-soft text-center">
              <div className="h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                Innovation First
              </h3>
              <p className="text-muted-foreground">
                नवाचार पहले। Combining traditional art with cutting-edge AI technology.
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-4">
                <HelpCircle className="h-4 w-4 text-secondary" />
                <span className="text-sm font-medium text-secondary">FAQs</span>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                अक्सर पूछे जाने वाले सवाल
              </h2>
              <p className="text-muted-foreground mt-2">Frequently Asked Questions</p>
            </div>
            
            <div className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-border">
                    <AccordionTrigger className="px-6 py-4 text-left font-medium text-foreground hover:text-secondary hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          {/* Publisher / Author */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-card rounded-2xl p-8 md:p-12 border border-border shadow-soft">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                Who runs AIMehendi.in | साइट कौन चलाता है
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>
                  AIMehendi.in ek independent website hai jise <strong className="text-foreground">Dheeraj Tagde</strong>{" "}
                  India se chalate hain. Site par publish hone wale tutorials, step-by-step guides aur
                  occasion-based mehendi ideas hamari team likhti hai aur publish se pehle review karti hai.
                </p>
                <p>
                  Hum readers ko free me practical mehendi guidance dena chahte hain — beginners ke liye
                  simple patterns se lekar bridal designs tak — aur AI tools se unhe apni pasand ka design
                  jaldi visualise karne me madad karte hain.
                </p>
                <p>
                  Transparency hamare liye zaroori hai: site par kai design images AI se generate hoti hain,
                  aur site advertising se supported hai. Hamari{" "}
                  <a href="/editorial-policy" className="text-primary underline underline-offset-4">
                    Editorial & AI Content Policy
                  </a>{" "}
                  me poori jaankari di gayi hai.
                </p>
                <p>
                  Sawaal, feedback ya correction ke liye:{" "}
                  <a href="mailto:contact@aimehendi.in" className="text-primary underline underline-offset-4">
                    contact@aimehendi.in
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* What we offer */}
          <div className="bg-gradient-to-r from-primary via-primary/90 to-mehendi-dark rounded-2xl p-8 md:p-12 text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary-foreground mb-8">
              What You Get | आपको क्या मिलता है
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-primary-foreground/80 text-sm">
              <div>
                <div className="font-serif text-xl md:text-2xl font-bold text-secondary mb-2">AI Generator</div>
                <div>Apne prompt se design banayein</div>
              </div>
              <div>
                <div className="font-serif text-xl md:text-2xl font-bold text-secondary mb-2">Virtual Try-On</div>
                <div>Apni hand photo par design dekhein</div>
              </div>
              <div>
                <div className="font-serif text-xl md:text-2xl font-bold text-secondary mb-2">Design Gallery</div>
                <div>Bridal, Arabic, mandala aur simple styles</div>
              </div>
              <div>
                <div className="font-serif text-xl md:text-2xl font-bold text-secondary mb-2">Free Guides</div>
                <div>Step-by-step Hindi tutorials</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
