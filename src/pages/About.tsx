import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Sparkles, Users, Heart, Target } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
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

          {/* Stats */}
          <div className="bg-gradient-to-r from-primary via-primary/90 to-mehendi-dark rounded-2xl p-8 md:p-12 text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary-foreground mb-8">
              Our Impact | हमारा प्रभाव
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="font-serif text-3xl md:text-4xl font-bold text-secondary mb-2">10K+</div>
                <div className="text-sm text-primary-foreground/80">Designs Created</div>
              </div>
              <div>
                <div className="font-serif text-3xl md:text-4xl font-bold text-secondary mb-2">50+</div>
                <div className="text-sm text-primary-foreground/80">Design Styles</div>
              </div>
              <div>
                <div className="font-serif text-3xl md:text-4xl font-bold text-secondary mb-2">1000+</div>
                <div className="text-sm text-primary-foreground/80">Happy Users</div>
              </div>
              <div>
                <div className="font-serif text-3xl md:text-4xl font-bold text-secondary mb-2">Free</div>
                <div className="text-sm text-primary-foreground/80">Forever</div>
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
