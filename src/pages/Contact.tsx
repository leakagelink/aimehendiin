import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Helmet } from "react-helmet-async";
import { Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

// Validation schema
const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  subject: z.string().trim().min(5, "Subject must be at least 5 characters").max(200, "Subject must be less than 200 characters"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000, "Message must be less than 2000 characters"),
});

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form data
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission (in production, this would send to a backend)
    try {
      // Create mailto link as fallback
      const mailtoLink = `mailto:contact@aimehendi.in?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
      
      // Open mail client
      window.location.href = mailtoLink;
      
      setIsSubmitted(true);
      toast({
        title: "Message Ready! ✉️",
        description: "Your email client should open. If not, please email us directly at contact@aimehendi.in",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again or email us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitted(false);
    setErrors({});
  };

  // Contact page schema
  const contactSchema_LD = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact AIMehendi.in",
    description: "Contact us for questions about AI Mehendi Design Generator",
    url: "https://aimehendi.in/contact",
    mainEntity: {
      "@type": "Organization",
      name: "AIMehendi.in",
      email: "contact@aimehendi.in",
      url: "https://aimehendi.in"
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Contact Us | AIMehendi.in - संपर्क करें</title>
        <meta name="title" content="Contact Us | AIMehendi.in - संपर्क करें" />
        <meta name="description" content="AIMehendi.in से संपर्क करें। Questions, feedback, या collaboration के लिए हमें message करें। We'd love to hear from you!" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://aimehendi.in/contact" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aimehendi.in/contact" />
        <meta property="og:title" content="Contact Us | AIMehendi.in" />
        <meta property="og:description" content="Get in touch with AIMehendi.in team. We'd love to hear from you!" />
        <meta property="og:image" content="https://aimehendi.in/og-image.jpg" />

        <script type="application/ld+json">
          {JSON.stringify(contactSchema_LD)}
        </script>
      </Helmet>

      <Header />

      <main className="py-8 md:py-16">
        <div className="container max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
              <Mail className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">Get in Touch</span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Contact Us | संपर्क करें
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have questions, feedback, or want to collaborate? We'd love to hear from you! 
              हमसे संपर्क करें - हम आपकी मदद के लिए यहाँ हैं।
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-card rounded-2xl p-6 border border-border shadow-soft">
                <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-serif text-lg font-bold text-foreground mb-2">Email Us</h3>
                <p className="text-muted-foreground text-sm mb-3">
                  For general inquiries and support
                </p>
                <a 
                  href="mailto:contact@aimehendi.in" 
                  className="text-secondary hover:underline font-medium"
                >
                  contact@aimehendi.in
                </a>
              </div>

              <div className="bg-card rounded-2xl p-6 border border-border shadow-soft">
                <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-serif text-lg font-bold text-foreground mb-2">Location</h3>
                <p className="text-muted-foreground text-sm">
                  India 🇮🇳<br />
                  Serving users worldwide
                </p>
              </div>

              <div className="bg-card rounded-2xl p-6 border border-border shadow-soft">
                <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-serif text-lg font-bold text-foreground mb-2">Response Time</h3>
                <p className="text-muted-foreground text-sm">
                  We typically respond within 24-48 hours. 
                  आमतौर पर 24-48 घंटों में जवाब मिलता है।
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-soft">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="h-16 w-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-foreground mb-3">
                      Thank You! 🙏
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Your email client should have opened with your message. 
                      If not, please email us directly at contact@aimehendi.in
                    </p>
                    <Button onClick={resetForm} variant="outline">
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="font-serif text-xl font-bold text-foreground mb-6">
                      Send us a Message | हमें संदेश भेजें
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name / नाम *</Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Your name"
                            value={formData.name}
                            onChange={handleChange}
                            className={errors.name ? "border-destructive" : ""}
                          />
                          {errors.name && (
                            <p className="text-destructive text-sm">{errors.name}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email / ईमेल *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? "border-destructive" : ""}
                          />
                          {errors.email && (
                            <p className="text-destructive text-sm">{errors.email}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject / विषय *</Label>
                        <Input
                          id="subject"
                          name="subject"
                          placeholder="What is this about?"
                          value={formData.subject}
                          onChange={handleChange}
                          className={errors.subject ? "border-destructive" : ""}
                        />
                        {errors.subject && (
                          <p className="text-destructive text-sm">{errors.subject}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message / संदेश *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Tell us how we can help you..."
                          rows={6}
                          value={formData.message}
                          onChange={handleChange}
                          className={errors.message ? "border-destructive" : ""}
                        />
                        {errors.message && (
                          <p className="text-destructive text-sm">{errors.message}</p>
                        )}
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full sm:w-auto"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          "Opening email app..."
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" aria-hidden="true" />
                            Send via Email App
                          </>
                        )}

                      </Button>
                      <p className="text-xs text-muted-foreground">
                        Ye form aapka email app khol dega with your message pre-filled — send karne
                        ke liye wahan se bhejein, ya seedhe contact@aimehendi.in par mail karein.
                      </p>
                    </form>

                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
