import { Facebook, Twitter, MessageCircle, Link2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface FloatingShareBarProps {
  title: string;
  url: string;
  excerpt?: string;
}

const FloatingShareBar = ({ title, url, excerpt }: FloatingShareBarProps) => {
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(excerpt || title);

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
  };

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], "_blank", "noopener,noreferrer,width=600,height=400");
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className={cn(
        "fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3 transition-all duration-300",
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"
      )}
    >
      {/* Share Label */}
      <div className="text-xs font-medium text-muted-foreground text-center mb-1 writing-mode-vertical">
        Share
      </div>

      {/* WhatsApp */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleShare("whatsapp")}
        className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm border-border shadow-lg hover:bg-[#25D366] hover:text-white hover:border-[#25D366] hover:scale-110 transition-all duration-200"
        title="Share on WhatsApp"
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
      </Button>

      {/* Facebook */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleShare("facebook")}
        className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm border-border shadow-lg hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] hover:scale-110 transition-all duration-200"
        title="Share on Facebook"
      >
        <Facebook className="h-4 w-4" aria-hidden="true" />
      </Button>

      {/* Twitter/X */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleShare("twitter")}
        className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm border-border shadow-lg hover:bg-foreground hover:text-background hover:border-foreground hover:scale-110 transition-all duration-200"
        title="Share on Twitter"
      >
        <Twitter className="h-4 w-4" aria-hidden="true" />
      </Button>

      {/* Copy Link */}
      <Button
        variant="outline"
        size="icon"
        onClick={handleCopyLink}
        className={cn(
          "h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm border-border shadow-lg hover:scale-110 transition-all duration-200",
          copied 
            ? "bg-green-500 text-white border-green-500" 
            : "hover:bg-secondary hover:text-secondary-foreground hover:border-secondary"
        )}
        title={copied ? "Link copied!" : "Copy link"}
      >
        {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Link2 className="h-4 w-4" aria-hidden="true" />}
      </Button>
    </div>
  );
};

export default FloatingShareBar;
