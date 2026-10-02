import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Helmet } from "react-helmet-async";
import { Shield } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Privacy Policy | AIMehendi.in - गोपनीयता नीति</title>
        <meta name="title" content="Privacy Policy | AIMehendi.in" />
        <meta name="description" content="AIMehendi.in की Privacy Policy पढ़ें। जानें हम आपकी जानकारी कैसे collect, use और protect करते हैं। Your privacy is important to us." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://aimehendi.in/privacy-policy" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aimehendi.in/privacy-policy" />
        <meta property="og:title" content="Privacy Policy | AIMehendi.in" />
        <meta property="og:description" content="AIMehendi.in की Privacy Policy। Your privacy is important to us." />
        <meta property="og:image" content="https://aimehendi.in/og-image.jpg" />
      </Helmet>

      <Header />

      <main className="py-8 md:py-16">
        <div className="container max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
              <Shield className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">Legal</span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Privacy Policy | गोपनीयता नीति
            </h1>
            <p className="text-muted-foreground">
              Last Updated: August 31, 2026
            </p>
          </div>

          {/* Content */}
          <div className="bg-card rounded-2xl p-6 md:p-10 border border-border shadow-soft prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">1. Introduction | परिचय</h2>
              <p className="text-muted-foreground mb-4">
                Welcome to AIMehendi.in ("we," "our," or "us"). We are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
              </p>
              <p className="text-muted-foreground">
                AIMehendi.in में आपका स्वागत है। हम आपकी गोपनीयता और व्यक्तिगत जानकारी की सुरक्षा के लिए प्रतिबद्ध हैं। यह नीति बताती है कि जब आप हमारी वेबसाइट पर आते हैं तो हम आपकी जानकारी कैसे collect, use और protect करते हैं।
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">2. Information We Collect | हम कौन सी जानकारी collect करते हैं</h2>
              
              <h3 className="font-semibold text-foreground mb-2">Automatically Collected Information:</h3>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>IP address (anonymized)</li>
                <li>Pages visited and time spent</li>
                <li>Referring website</li>
                <li>Device information</li>
              </ul>

              <h3 className="font-semibold text-foreground mb-2">Information You Provide:</h3>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>Contact form submissions (name, email, message)</li>
                <li>AI generator prompts and preferences</li>
                <li>Any feedback or comments you submit</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">3. How We Use Your Information | हम आपकी जानकारी कैसे use करते हैं</h2>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>To provide and maintain our AI Mehendi Design Generator service</li>
                <li>To improve user experience and website functionality</li>
                <li>To respond to your inquiries and support requests</li>
                <li>To send occasional updates (only if you opt-in)</li>
                <li>To analyze website traffic and usage patterns</li>
                <li>To display relevant advertisements through Google AdSense</li>
                <li>To prevent fraud and ensure website security</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">4. Cookies and Tracking | कुकीज़ और ट्रैकिंग</h2>
              <p className="text-muted-foreground mb-4">
                We use cookies and similar tracking technologies to enhance your browsing experience:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li><strong>Essential Cookies:</strong> Required for website functionality</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site (Google Analytics)</li>
                <li><strong>Advertising Cookies:</strong> Used by Google AdSense to display relevant ads</li>
              </ul>
              <p className="text-muted-foreground">
                You can control cookies through your browser settings. Note that disabling cookies may affect website functionality.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">5. Third-Party Services | तृतीय-पक्ष सेवाएं</h2>
              <p className="text-muted-foreground mb-4">We use the following third-party services:</p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li><strong>Google AdSense:</strong> For displaying advertisements on the website</li>
                <li><strong>Google AdMob:</strong> For displaying advertisements in our Android app. AdMob may collect your device's advertising ID, IP address and app interaction data to show and measure ads. You can reset or delete your advertising ID in your phone's Settings &gt; Google &gt; Ads. EEA/UK users are asked for consent before personalised ads are shown.</li>
                <li><strong>Google Analytics:</strong> For website analytics</li>
                <li><strong>AI image services:</strong> For generating mehendi designs and virtual try-on results</li>
                <li><strong>Hosting &amp; database provider:</strong> For serving the website and storing site data</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                These services have their own privacy policies. We encourage you to review them.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                6. Advertising &amp; Google AdSense | विज्ञापन
              </h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>
                  Third-party vendors, including Google, use cookies to serve ads based on your prior visits
                  to this website or other websites.
                </li>
                <li>
                  Google's use of advertising cookies (including the DoubleClick DART cookie) enables it and
                  its partners to serve ads to you based on your visit to this and/or other sites on the
                  Internet.
                </li>
                <li>
                  You may opt out of personalised advertising by visiting{" "}
                  <a
                    href="https://www.google.com/settings/ads"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary underline underline-offset-4"
                  >
                    Google Ads Settings
                  </a>
                  , or opt out of some third-party vendors' cookies at{" "}
                  <a
                    href="https://optout.aboutads.info/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary underline underline-offset-4"
                  >
                    aboutads.info
                  </a>
                  .
                </li>
                <li>
                  For users in the EEA, UK and Switzerland, personalised ads are only served after consent is
                  given through our cookie banner. See our{" "}
                  <a href="/cookie-policy" className="text-primary underline underline-offset-4">
                    Cookie Policy
                  </a>
                  .
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                7. AI Generator &amp; Virtual Try-On Data | AI टूल्स का डेटा
              </h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>
                  Text prompts you enter are sent to our AI image provider solely to generate your design.
                </li>
                <li>
                  Photos uploaded to the Virtual Try-On tool are processed only to create your try-on result
                  and are <strong>not stored</strong> on our servers after processing.
                </li>
                <li>
                  Designs you generate are saved only in your own browser storage so you can view them again;
                  clearing your browser data removes them.
                </li>
                <li>
                  If you submit a booking or contact request, we keep your name, phone number and message only
                  to respond to that request, and delete it on request.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                8. Your Rights under GDPR &amp; CCPA
              </h2>
              <p className="text-muted-foreground mb-4">
                If you are located in the European Economic Area, the UK, or California, you have the right to
                access, correct, delete, or restrict processing of your personal data, to object to processing,
                to data portability, and to withdraw consent at any time. California residents may also opt out
                of the "sale" or "sharing" of personal information; we do not sell personal information.
              </p>
              <p className="text-muted-foreground">
                To exercise any of these rights, email{" "}
                <a href="mailto:contact@aimehendi.in" className="text-primary underline underline-offset-4">
                  contact@aimehendi.in
                </a>
                . We respond within 30 days.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">9. Data Security | डेटा सुरक्षा</h2>
              <p className="text-muted-foreground">
                We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security but strive to use commercially acceptable means to protect your data.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">10. Your Rights | आपके अधिकार</h2>
              <p className="text-muted-foreground mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>Access your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">11. Children's Privacy | बच्चों की गोपनीयता</h2>
              <p className="text-muted-foreground">
                Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">12. Changes to This Policy | इस नीति में परिवर्तन</h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">13. Contact Us | संपर्क करें</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <p className="text-foreground font-medium">AIMehendi.in</p>
                <p className="text-muted-foreground">Email: contact@aimehendi.in</p>
                <p className="text-muted-foreground">Website: https://aimehendi.in/contact</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
