import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageSEO from "@/components/seo/PageSEO";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import MehndiTryOn from "@/components/tryon/MehndiTryOn";
import CategoryLinks from "@/components/gallery/CategoryLinks";
import { Hand } from "lucide-react";
import { Link } from "react-router-dom";

const TryOn = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="AI Virtual Mehndi Try-On — Apne Haath Par Dekhe"
        description="Apni hand photo upload karke AI se dekhe mehendi design aapke haath par kaisa lagega. Free virtual mehndi try-on with before/after preview."
        path="/try-on"
      />
      <BreadcrumbSchema items={[{ name: "Virtual Try-On", item: "/try-on" }]} />
      <Header />

      <main className="py-8 md:py-16">
        <div className="container">
          <div className="mb-10 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-4 py-2">
              <Hand className="h-4 w-4 text-secondary" aria-hidden="true" />
              <span className="text-sm font-medium text-secondary">New — Virtual Try-On</span>
            </div>

            <h1 className="mb-4 font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              AI Virtual <span className="text-secondary">मेहंदी</span> Try-On
            </h1>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              अपने हाथ की photo upload करें और देखें कि bridal, Arabic या mandala mehendi आपके haath
              par असल में कैसी लगेगी — before/after और zoom के साथ, बिलकुल free.
            </p>
          </div>

          <MehndiTryOn />

          <section className="mt-14 rounded-2xl border border-border bg-card/50 p-6 md:p-8">
            <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">
              Try-On कैसे काम करता है?
            </h2>
            <ol className="grid gap-4 text-sm text-muted-foreground md:grid-cols-3">
              <li>
                <strong className="text-foreground">1. Photo लें</strong> — साफ़ रोशनी में खुली हथेली या
                back hand की सीधी photo सबसे अच्छा result देती है।
              </li>
              <li>
                <strong className="text-foreground">2. Style चुनें</strong> — design style, coverage,
                henna shade और density अपने हिसाब से set करें।
              </li>
              <li>
                <strong className="text-foreground">3. Result देखें</strong> — before/after slider से
                compare करें, zoom करें और design download करें।
              </li>
            </ol>
            <p className="mt-6 text-sm text-muted-foreground">
              नया design scratch से बनाना है? हमारा{" "}
              <Link to="/generate" className="text-secondary underline underline-offset-4">
                AI Mehendi Generator
              </Link>{" "}
              use करें, या{" "}
              <Link to="/gallery" className="text-secondary underline underline-offset-4">
                gallery
              </Link>{" "}
              से inspiration लें।
            </p>
          </section>

          <div className="mt-12">
            <CategoryLinks />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TryOn;
