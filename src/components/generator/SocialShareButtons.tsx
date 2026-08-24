import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface SocialShareButtonsProps {
  imageUrl: string;
  title: string;
  /** Absolute page URL to share. Defaults to the generator page. */
  pageUrl?: string;
}

const SocialShareButtons = ({ imageUrl, title, pageUrl }: SocialShareButtonsProps) => {
  const { toast } = useToast();
  const shareUrl = pageUrl || "https://aimehendi.in/generate";

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(shareUrl);

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedTitle}%0A%0A${encodedUrl}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleInstagramShare = async () => {
    // Instagram doesn't have a direct share URL, so we copy the image and show instructions
    try {
      // Try to copy image to clipboard
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      
      if (navigator.clipboard && 'write' in navigator.clipboard) {
        await navigator.clipboard.write([
          new ClipboardItem({
            [blob.type]: blob,
          }),
        ]);
        toast({
          title: "Image Copied! 📋",
          description: "अब Instagram खोलें और paste करें। Image clipboard में copy हो गई!",
        });
      } else {
        // Fallback: download the image
        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = `mehendi-design-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast({
          title: "Image Downloaded! 📥",
          description: "Image download हो गई। अब Instagram पर manually upload करें।",
        });
      }
    } catch (error) {
      console.error("Error copying image:", error);
      toast({
        title: "Download instead",
        description: "Image download करें और Instagram पर manually upload करें।",
      });
    }
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`;
    window.open(facebookUrl, "_blank", "width=600,height=400");
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
    window.open(twitterUrl, "_blank", "width=600,height=400");
  };

  const handlePinterestShare = () => {
    const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodeURIComponent(imageUrl)}&description=${encodedTitle}`;
    window.open(pinterestUrl, "_blank", "width=600,height=400");
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${title}\n\n${shareUrl}`);
      toast({
        title: "Link Copied! 🔗",
        description: "Link clipboard में copy हो गया!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Link copy करने में समस्या हुई।",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleWhatsAppShare}
        className="bg-[#25D366]/10 hover:bg-[#25D366]/20 border-[#25D366]/30 text-[#25D366]"
      >
        <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        WhatsApp
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleInstagramShare}
        className="bg-gradient-to-r from-[#833AB4]/10 via-[#FD1D1D]/10 to-[#F77737]/10 hover:from-[#833AB4]/20 hover:via-[#FD1D1D]/20 hover:to-[#F77737]/20 border-[#E1306C]/30 text-[#E1306C]"
      >
        <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
        Instagram
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleFacebookShare}
        className="bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border-[#1877F2]/30 text-[#1877F2]"
      >
        <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
        Facebook
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleTwitterShare}
        className="bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 border-[#1DA1F2]/30 text-[#1DA1F2]"
      >
        <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
        X
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handlePinterestShare}
        className="bg-[#E60023]/10 hover:bg-[#E60023]/20 border-[#E60023]/30 text-[#E60023]"
      >
        <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
        </svg>
        Pinterest
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopyLink}
        className="bg-muted hover:bg-muted/80"
      >
        <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
        Copy Link
      </Button>
    </div>
  );
};

export default SocialShareButtons;
