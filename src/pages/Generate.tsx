import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MehendiGenerator from "@/components/generator/MehendiGenerator";
import PageSEO from "@/components/seo/PageSEO";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import CategoryLinks from "@/components/gallery/CategoryLinks";

const Generate = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="AI Mehendi Generator — Free Design Banaye"
        description="Free AI Mehendi Generator — seconds में bridal, Arabic, mandala aur finger mehndi designs banaye. No skills needed!"

        path="/generate"
      />
      <BreadcrumbSchema items={[{ name: "AI Generator", item: "/generate" }]} />
      <Header />
      
      <main className="py-8 md:py-16">
        <div className="container">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
              <Sparkles className="h-4 w-4 text-secondary" aria-hidden="true" />
              <span className="text-sm font-medium text-secondary">
                Free AI Generator
              </span>
            </div>
            
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              AI <span className="text-secondary">मेहंदी</span> Design Generator
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              अपनी पसंद के अनुसार कस्टम मेहंदी डिज़ाइन बनाएं। Choose your style, hand type, and let AI create beautiful mehendi patterns for you.
            </p>
          </div>

          {/* Generator */}
          <MehendiGenerator />

          {/* Tips Section */}
          <div className="mt-16 max-w-4xl mx-auto">
            <h2 className="font-serif text-2xl font-bold text-foreground text-center mb-8">
              Tips for Best Results | बेहतर परिणाम के लिए टिप्स
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                  <span className="font-serif font-bold text-secondary">1</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Choose Design Type</h3>
                <p className="text-sm text-muted-foreground">
                  Bridal designs are detailed, while Simple designs are quick to apply.
                </p>
              </div>
              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                  <span className="font-serif font-bold text-secondary">2</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Select Hand Type</h3>
                <p className="text-sm text-muted-foreground">
                  Back hand designs differ from palm designs. Choose accordingly.
                </p>
              </div>
              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                  <span className="font-serif font-bold text-secondary">3</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Add Custom Details</h3>
                <p className="text-sm text-muted-foreground">
                  Mention specific elements like peacock, lotus, or initials for personalization.
                </p>
              </div>
            </div>
          </div>

          {/* Contextual links to design collections */}
          <div className="mt-16 max-w-4xl mx-auto space-y-4">
            <CategoryLinks
              heading="Inspiration chahiye?"
              intro="Generate karne se pehle in ready collections se ideas lein:"
            />
            <p className="text-sm text-muted-foreground">
              Shaadi ke liye{" "}
              <Link
                to="/bridal-mehendi-design-2026"
                className="text-secondary underline underline-offset-4"
              >
                Bridal Mehendi Design Ideas
              </Link>{" "}
              aur festival ke liye{" "}
              <Link
                to="/karwa-chauth-mehndi-design"
                className="text-secondary underline underline-offset-4"
              >
                Karwa Chauth mehndi patterns
              </Link>{" "}
              bhi available hain.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Generate;
