import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Helmet } from "react-helmet-async";
import { FileText } from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Terms of Service | AIMehendi.in - सेवा की शर्तें</title>
        <meta name="title" content="Terms of Service | AIMehendi.in" />
        <meta name="description" content="AIMehendi.in की Terms of Service पढ़ें। हमारी website और AI Mehendi Generator का use करने से पहले ये terms जरूर पढ़ें।" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://aimehendi.in/terms-of-service" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aimehendi.in/terms-of-service" />
        <meta property="og:title" content="Terms of Service | AIMehendi.in" />
        <meta property="og:description" content="AIMehendi.in की Terms of Service। Please read before using our services." />
        <meta property="og:image" content="https://aimehendi.in/og-image.jpg" />
      </Helmet>

      <Header />

      <main className="py-8 md:py-16">
        <div className="container max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
              <FileText className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">Legal</span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Terms of Service | सेवा की शर्तें
            </h1>
            <p className="text-muted-foreground">
              Last Updated: February 1, 2026
            </p>
          </div>

          {/* Content */}
          <div className="bg-card rounded-2xl p-6 md:p-10 border border-border shadow-soft prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms | शर्तों की स्वीकृति</h2>
              <p className="text-muted-foreground mb-4">
                By accessing and using AIMehendi.in, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this website.
              </p>
              <p className="text-muted-foreground">
                AIMehendi.in का उपयोग करके, आप इन सेवा की शर्तों से बंधे होने के लिए सहमत हैं। यदि आप किसी भी शर्त से सहमत नहीं हैं, तो कृपया इस वेबसाइट का उपयोग न करें।
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">2. Description of Service | सेवा का विवरण</h2>
              <p className="text-muted-foreground mb-4">
                AIMehendi.in provides:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>Free AI-powered Mehendi Design Generator</li>
                <li>Gallery of mehendi designs for inspiration</li>
                <li>Educational blog content about mehendi art</li>
                <li>Design download capabilities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">3. User Rights and License | उपयोगकर्ता अधिकार और लाइसेंस</h2>
              
              <h3 className="font-semibold text-foreground mb-2">Generated Designs:</h3>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>You may use AI-generated mehendi designs for personal and commercial purposes</li>
                <li>Designs can be used as reference for actual mehendi application</li>
                <li>You may share designs on social media with proper attribution</li>
                <li>Redistribution or resale of bulk designs is prohibited</li>
              </ul>

              <h3 className="font-semibold text-foreground mb-2">Gallery Images:</h3>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>Gallery images are for personal inspiration and reference</li>
                <li>Commercial use requires explicit permission</li>
                <li>Proper attribution to AIMehendi.in is appreciated</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">4. Prohibited Uses | प्रतिबंधित उपयोग</h2>
              <p className="text-muted-foreground mb-4">You agree NOT to:</p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>Use the service for any unlawful purpose</li>
                <li>Generate inappropriate, offensive, or harmful content</li>
                <li>Attempt to hack, disrupt, or damage the website</li>
                <li>Scrape or bulk download content without permission</li>
                <li>Misrepresent your identity or affiliation</li>
                <li>Use automated systems to access the service excessively</li>
                <li>Violate any intellectual property rights</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">5. Intellectual Property | बौद्धिक संपदा</h2>
              <p className="text-muted-foreground mb-4">
                The website content, including but not limited to text, graphics, logos, icons, images, audio clips, and software, is the property of AIMehendi.in and is protected by Indian and international copyright laws.
              </p>
              <p className="text-muted-foreground">
                AI-generated designs are created using our proprietary technology. While you have usage rights as described above, the underlying technology and algorithms remain our property.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">6. Disclaimer of Warranties | वारंटियों का अस्वीकरण</h2>
              <p className="text-muted-foreground mb-4">
                AIMehendi.in is provided "as is" and "as available" without any warranties of any kind, either express or implied.
              </p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>We do not guarantee uninterrupted or error-free service</li>
                <li>AI-generated designs may vary in quality and accuracy</li>
                <li>We are not responsible for any allergic reactions from actual mehendi application</li>
                <li>Results from using our designs may vary</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">7. Limitation of Liability | दायित्व की सीमा</h2>
              <p className="text-muted-foreground">
                In no event shall AIMehendi.in, its owners, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or other intangible losses, resulting from your use or inability to use the service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">8. Advertisements | विज्ञापन</h2>
              <p className="text-muted-foreground">
                AIMehendi.in displays advertisements through Google AdSense and potentially other advertising networks. We are not responsible for the content of third-party advertisements. Clicking on ads is at your own discretion and risk.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">9. User Content | उपयोगकर्ता सामग्री</h2>
              <p className="text-muted-foreground">
                By submitting content (including prompts, feedback, or comments), you grant AIMehendi.in a non-exclusive, royalty-free license to use, modify, and display such content for service improvement purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">10. Modifications | संशोधन</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify or discontinue the service at any time without notice. We may also revise these Terms of Service at any time. Continued use of the website after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">11. Governing Law | शासी कानून</h2>
              <p className="text-muted-foreground">
                These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in India.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">12. Contact Information | संपर्क जानकारी</h2>
              <p className="text-muted-foreground">
                For questions about these Terms of Service, please contact us:
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

export default TermsOfService;
