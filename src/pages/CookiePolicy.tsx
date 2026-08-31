import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Cookie } from "lucide-react";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Cookie Policy | AIMehendi.in - कुकी नीति</title>
        <meta
          name="description"
          content="AIMehendi.in Cookie Policy: hum kaunsi cookies use karte hain, Google AdSense advertising cookies, aur unhe kaise control/opt-out karein."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://aimehendi.in/cookie-policy" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aimehendi.in/cookie-policy" />
        <meta property="og:title" content="Cookie Policy | AIMehendi.in" />
        <meta property="og:description" content="Cookies, advertising cookies aur opt-out options ki poori jaankari." />
      </Helmet>

      <Header />

      <main className="py-8 md:py-16">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
              <Cookie className="h-4 w-4 text-secondary" aria-hidden="true" />
              <span className="text-sm font-medium text-secondary">Legal</span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Cookie Policy | कुकी नीति
            </h1>
            <p className="text-muted-foreground">Last Updated: August 31, 2026</p>
          </div>

          <div className="space-y-10">
            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">1. Cookies kya hain?</h2>
              <p className="text-muted-foreground">
                Cookies chhoti text files hain jo aapke browser me store hoti hain jab aap koi website
                visit karte hain. Ye site ko yaad rakhne me madad karti hain ki aapne kya preferences
                choose kiye, aur site owners ko samajhne me madad karti hain ki site kaise use ho rahi hai.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">2. Hum kaunsi cookies use karte hain</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-3 text-foreground font-semibold">Type</th>
                      <th className="text-left p-3 text-foreground font-semibold">Purpose</th>
                      <th className="text-left p-3 text-foreground font-semibold">Set by</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-t border-border">
                      <td className="p-3">Essential / Functional</td>
                      <td className="p-3">
                        Cookie consent choice, aapke recent generated designs (browser ke localStorage me),
                        daily usage limits.
                      </td>
                      <td className="p-3">AIMehendi.in</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-3">Analytics</td>
                      <td className="p-3">Aggregate traffic aur page performance samajhne ke liye.</td>
                      <td className="p-3">Google Analytics</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-3">Advertising</td>
                      <td className="p-3">
                        Ads dikhane aur unki performance measure karne ke liye; personalised ads ke liye bhi.
                      </td>
                      <td className="p-3">Google AdSense aur uske third-party vendors</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">3. Google AdSense aur third-party vendors</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>
                  Third-party vendor, including Google, is website par ads serve karne ke liye cookies ka
                  upyog karte hain.
                </li>
                <li>
                  Google ka DoubleClick DART cookie Google ko aapki is site aur internet par doosri sites par
                  visit ke aadhar par ads serve karne ki suvidha deta hai.
                </li>
                <li>
                  Aap personalised advertising ko{" "}
                  <a
                    href="https://www.google.com/settings/ads"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary underline underline-offset-4"
                  >
                    Google Ads Settings
                  </a>{" "}
                  se opt-out kar sakte hain.
                </li>
                <li>
                  Third-party vendors ke cookies opt-out ke liye{" "}
                  <a
                    href="https://optout.aboutads.info/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary underline underline-offset-4"
                  >
                    aboutads.info
                  </a>{" "}
                  visit karein.
                </li>
                <li>
                  Google kis tarah data use karta hai, ye{" "}
                  <a
                    href="https://policies.google.com/technologies/partner-sites"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary underline underline-offset-4"
                  >
                    Google Partner Sites policy
                  </a>{" "}
                  me padha ja sakta hai.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">4. Consent aur control</h2>
              <p className="text-muted-foreground">
                Pehli visit par hum cookie consent banner dikhate hain. EEA, UK aur Switzerland ke users ke
                liye personalised ads consent ke bina serve nahi kiye jaate. Aap kabhi bhi apne browser ki
                settings se cookies delete ya block kar sakte hain, ya banner me diye gaye Reject option ka
                upyog kar sakte hain. Consent dobara set karne ke liye apne browser ka site data clear karein.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">5. Aur jaankari</h2>
              <p className="text-muted-foreground">
                Data collection ki poori jaankari ke liye hamari{" "}
                <Link to="/privacy-policy" className="text-primary underline underline-offset-4">
                  Privacy Policy
                </Link>{" "}
                padhein, ya{" "}
                <Link to="/contact" className="text-primary underline underline-offset-4">
                  Contact page
                </Link>{" "}
                se hume likhein (contact@aimehendi.in).
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CookiePolicy;
