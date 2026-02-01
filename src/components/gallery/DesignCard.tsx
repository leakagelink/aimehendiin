import { useState } from "react";
import { Heart, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DesignCardProps {
  image: string;
  title: string;
  category: string;
  likes?: number;
  onView?: () => void;
}

const DesignCard = ({ image, title, category, likes = 0, onView }: DesignCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [isHovered, setIsHovered] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement("a");
    link.href = image;
    link.download = `${title.replace(/\s+/g, "-").toLowerCase()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="group relative bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 cursor-pointer card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onView}
    >
      {/* Image */}
      <div className="aspect-[3/4] relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full bg-background/90 backdrop-blur-sm text-xs font-medium text-foreground shadow-sm">
            {category}
          </span>
        </div>

        {/* Actions Overlay */}
        <div
          className={`absolute inset-0 flex items-end justify-between p-4 transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex-1">
            <h3 className="font-serif font-semibold text-primary-foreground text-lg line-clamp-2">
              {title}
            </h3>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background"
              onClick={handleLike}
            >
              <Heart
                className={`h-5 w-5 transition-colors ${
                  isLiked ? "fill-accent text-accent" : "text-foreground"
                }`}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background"
              onClick={handleDownload}
            >
              <Download className="h-5 w-5 text-foreground" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background"
              onClick={(e) => {
                e.stopPropagation();
                onView?.();
              }}
            >
              <Eye className="h-5 w-5 text-foreground" />
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Info (Mobile) */}
      <div className="p-4 md:hidden">
        <h3 className="font-serif font-semibold text-foreground line-clamp-1">{title}</h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-muted-foreground">{category}</span>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Heart className={`h-3 w-3 ${isLiked ? "fill-accent text-accent" : ""}`} />
            {likeCount}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignCard;
