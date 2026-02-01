import { X, Download, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface ImageViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  title: string;
  category: string;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

const ImageViewerModal = ({
  isOpen,
  onClose,
  image,
  title,
  category,
  onPrev,
  onNext,
  hasPrev = false,
  hasNext = false,
}: ImageViewerModalProps) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = image;
    link.download = `${title.replace(/\s+/g, "-").toLowerCase()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl w-[95vw] p-0 bg-background/95 backdrop-blur-xl border-border/50 overflow-hidden">
        <VisuallyHidden>
          <DialogTitle>{title}</DialogTitle>
        </VisuallyHidden>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <div>
            <h3 className="font-serif font-semibold text-foreground text-lg">{title}</h3>
            <span className="text-sm text-muted-foreground">{category}</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Image Container */}
        <div className="relative flex items-center justify-center bg-muted/20 min-h-[50vh] max-h-[70vh]">
          {/* Navigation Arrows */}
          {hasPrev && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onPrev}
              className="absolute left-2 z-10 rounded-full bg-background/80 hover:bg-background shadow-md"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          )}
          
          <img
            src={image}
            alt={`${title} - ${category} Mehendi Design`}
            title={title}
            className="max-w-full max-h-[70vh] object-contain"
            loading="eager"
            decoding="async"
          />
          
          {hasNext && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onNext}
              className="absolute right-2 z-10 rounded-full bg-background/80 hover:bg-background shadow-md"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-center gap-4 p-4 border-t border-border/50">
          <Button
            variant="outline"
            onClick={handleDownload}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageViewerModal;
