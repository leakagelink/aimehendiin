import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Helmet } from "react-helmet-async";
import { AlertTriangle } from "lucide-react";

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Disclaimer | AIMehendi.in - अस्वीकरण</title>
        <meta name="description" content="AIMehendi.in disclaimer: AI-generated mehendi designs, advertising, affiliate links और external links से जुड़ी जानकारी।" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://aimehendi.in/disclaimer" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aimehendi.in/disclaimer" />
        <meta property="og:title" content="Disclaimer | AIMehendi.in" />
        <meta property="og:description" content="AIMehendi.in disclaimer और content usage policy।" />
        <meta property="og:image" content="https://aimehendi.in/og-image.jpg" />
      </Helmet>

      <Header />

      <main className="py-8 md:py-16">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
              <AlertTriangle className="h-4 w-4 text-secondary" aria-hidden="true" />
              <span className="text-sm font-medium text-secondary">Legal</span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Disclaimer | अस्वीकरण
            </h1>
            <p className="text-muted-foreground">Last Updated: August 24, 2026</p>
          </div>

          <div className="space-y-10">
            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">1. General Information | सामान्य जानकारी</h2>
              <p className="text-muted-foreground">
                AIMehendi.in par di gayi saari information sirf general information aur inspiration ke liye hai.
                Hum content ko accurate aur updated rakhne ki koshish karte hain, lekin kisi bhi jaankari ki
                completeness ya accuracy ki koi warranty nahi dete. Content par bharosa karke liya gaya koi bhi
                decision aapki apni zimmedari hai.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">2. AI-Generated Content | AI कंटेंट</h2>
              <p className="text-muted-foreground">
                Hamara generator artificial intelligence se mehendi design images banata hai. Ye images
                machine-generated hain, real photographs nahi, aur inme design ya anatomy sambandhi errors ho
                sakte hain. Designs sirf creative reference ke liye hain — inhe professional mehendi artist ki
                salah ka replacement na samjhein.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">3. Health & Safety | स्वास्थ्य और सुरक्षा</h2>
              <p className="text-muted-foreground">
                Henna/mehendi lagane se pehle patch test karein. "Black henna" (PPD-based cones) se skin
                reaction ho sakta hai. AIMehendi.in medical advice provide nahi karta; kisi bhi skin reaction ki
                sthiti me qualified doctor se sampark karein.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">4. Advertising | विज्ञापन</h2>
              <p className="text-muted-foreground">
                Is website par Google AdSense aur doosre advertising partners ke ads dikh sakte hain. Ads ka
                content advertisers dwara control kiya jaata hai; hum unke products, services ya claims ka
                endorsement nahi karte aur unke liye responsible nahi hain.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">5. Affiliate Links | एफिलिएट लिंक</h2>
              <p className="text-muted-foreground">
                Kuch pages par affiliate links (jaise Amazon Associates) ho sakte hain. In links se kharidari
                karne par humein bina kisi extra cost ke aapko chhota commission mil sakta hai. Isse hamare
                editorial recommendations prabhavit nahi hote.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">6. External Links | बाहरी लिंक</h2>
              <p className="text-muted-foreground">
                Hamari site par third-party websites ke links ho sakte hain. Un websites ke content, privacy
                practices ya policies par hamara koi control nahi hai aur unke liye hum zimmedar nahi hain.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">7. Contact</h2>
              <p className="text-muted-foreground">
                Is disclaimer se sambandhit kisi bhi sawaal ke liye hamare{" "}
                <a href="/contact" className="text-primary underline underline-offset-4">Contact page</a> ka
                upyog karein.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Disclaimer;
