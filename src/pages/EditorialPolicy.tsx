import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { BookOpenCheck } from "lucide-react";

const EditorialPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Editorial & AI Content Policy | AIMehendi.in</title>
        <meta
          name="description"
          content="AIMehendi.in ki editorial policy: content kaise likha jaata hai, AI-generated images ka disclosure, fact-checking, corrections aur advertising independence."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://aimehendi.in/editorial-policy" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aimehendi.in/editorial-policy" />
        <meta property="og:title" content="Editorial & AI Content Policy | AIMehendi.in" />
        <meta
          property="og:description"
          content="Content standards, AI disclosure aur advertising independence ki jaankari."
        />
      </Helmet>

      <Header />

      <main className="py-8 md:py-16">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
              <BookOpenCheck className="h-4 w-4 text-secondary" aria-hidden="true" />
              <span className="text-sm font-medium text-secondary">Transparency</span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Editorial & AI Content Policy
            </h1>
            <p className="text-muted-foreground">Last Updated: August 31, 2026</p>
          </div>

          <div className="space-y-10">
            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Who publishes this site</h2>
              <p className="text-muted-foreground">
                AIMehendi.in ek independent Indian publication hai jise <strong>Dheeraj Tagde</strong> chalate
                hain. Site ka focus mehendi (henna) design tutorials, step-by-step guides, occasion-based
                inspiration aur AI-assisted design tools par hai. Har blog article ka author credit article page
                par diya jaata hai.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">How our content is created</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>
                  Tutorials aur guides hamari team dwara likhe jaate hain — practical mehendi application
                  experience, commonly used techniques aur reader questions ke aadhar par.
                </li>
                <li>
                  Har article publish hone se pehle clarity, step accuracy aur duplicate content ke liye
                  review kiya jaata hai. Hum doosri websites se content copy nahi karte.
                </li>
                <li>
                  Hum sirf tab publish karte hain jab article reader ke liye original value add karta ho —
                  keyword bharne ke liye pages nahi banate.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">AI disclosure</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>
                  Site par dikhne wali bahut si <strong>design images artificial intelligence se generate</strong>{" "}
                  ki gayi hain. Ye real photographs nahi hain aur inme design ya anatomy ki minor errors ho
                  sakti hain.
                </li>
                <li>
                  AI Generator aur Virtual Try-On tools user ke input par images banate hain. Ye designs
                  creative reference ke liye hain, professional mehendi artist ki salah ka replacement nahi.
                </li>
                <li>
                  AI ka upyog draft support ke liye ho sakta hai, lekin har article ko human review aur editing
                  ke baad hi publish kiya jaata hai. Automatically generated, unreviewed text hum publish nahi
                  karte.
                </li>
                <li>
                  Virtual Try-On me upload ki gayi photos design banane ke baad store nahi ki jaati —
                  details{" "}
                  <Link to="/privacy-policy" className="text-primary underline underline-offset-4">
                    Privacy Policy
                  </Link>{" "}
                  me hain.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Advertising independence</h2>
              <p className="text-muted-foreground">
                Site Google AdSense ads aur kuch affiliate links se chalti hai. Advertisers hamare editorial
                content ko influence nahi karte, aur ads clearly site content se alag dikhte hain. Sponsored ya
                affiliate content hone par hum uska disclosure page par karte hain. Details{" "}
                <Link to="/disclaimer" className="text-primary underline underline-offset-4">
                  Disclaimer
                </Link>{" "}
                me hain.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Corrections & feedback</h2>
              <p className="text-muted-foreground">
                Agar aapko kisi page par galat jaankari, copyright issue ya inappropriate content mile, to
                hume contact@aimehendi.in par likhein ya{" "}
                <Link to="/contact" className="text-primary underline underline-offset-4">
                  Contact page
                </Link>{" "}
                use karein. Valid reports par hum 48 ghante ke andar content correct ya remove karte hain.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Content standards</h2>
              <p className="text-muted-foreground">
                AIMehendi.in family-friendly site hai. Hum adult content, hateful ya violent content, illegal
                content, misleading health claims, ya copyrighted material bina permission publish nahi karte.
                Henna se related safety information (jaise patch test aur "black henna" warning) hamari
                guides me shaamil ki jaati hai.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EditorialPolicy;
