import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import GalleryPreview from "@/components/home/GalleryPreview";
import CTASection from "@/components/home/CTASection";
import MehendiGenerator from "@/components/generator/MehendiGenerator";
import HomeSEO from "@/components/seo/HomeSEO";
import MobileHome from "@/components/home/MobileHome";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <HomeSEO />
      <Header />
      
      <main>
        {/* App-style home on mobile, full hero on desktop */}
        <MobileHome />
        <div className="hidden md:block">
          <HeroSection />
        </div>

        {/* Features Section */}
        <FeaturesSection />

        {/* AI Generator Preview */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Try Our <span className="text-secondary">AI Generator</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                अभी अपना पसंदीदा मेहंदी डिज़ाइन बनाएं | Create your favorite design now
              </p>
            </div>
            <MehendiGenerator compact />
          </div>
        </section>

        {/* Gallery Preview */}
        <GalleryPreview />

        {/* CTA Section */}
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
