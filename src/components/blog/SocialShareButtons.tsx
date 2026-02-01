import { Facebook, Twitter, Share2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SocialShareButtonsProps {
  title: string;
  url: string;
  excerpt?: string;
}

const SocialShareButtons = ({ title, url, excerpt }: SocialShareButtonsProps) => {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(excerpt || title);

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], "_blank", "noopener,noreferrer,width=600,height=400");
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: excerpt || title,
          url,
        });
      } catch {
        // User cancelled
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-semibold text-foreground flex items-center gap-2">
        <Share2 className="h-4 w-4 text-secondary" aria-hidden="true" />
        Share this article
      </h4>
      <div className="flex flex-wrap gap-3">
        {/* WhatsApp */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare("whatsapp")}
          className="flex items-center gap-2 bg-[#25D366]/10 border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366] hover:text-white hover:border-[#25D366]"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          WhatsApp
        </Button>

        {/* Facebook */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare("facebook")}
          className="flex items-center gap-2 bg-[#1877F2]/10 border-[#1877F2]/30 text-[#1877F2] hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]"
        >
          <Facebook className="h-4 w-4" aria-hidden="true" />
          Facebook
        </Button>

        {/* Twitter/X */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare("twitter")}
          className="flex items-center gap-2 bg-foreground/5 border-foreground/20 text-foreground hover:bg-foreground hover:text-background hover:border-foreground"
        >
          <Twitter className="h-4 w-4" aria-hidden="true" />
          Twitter
        </Button>

        {/* Native Share (Mobile) */}
        {typeof navigator !== "undefined" && navigator.share && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleNativeShare}
            className="flex items-center gap-2"
          >
            <Share2 className="h-4 w-4" aria-hidden="true" />
            More
          </Button>
        )}
      </div>
    </div>
  );
};

export default SocialShareButtons;
