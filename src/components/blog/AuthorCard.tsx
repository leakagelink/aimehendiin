import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Linkedin, Twitter, Globe } from "lucide-react";

const AuthorCard = () => {
  return (
    <div className="bg-gradient-to-br from-card to-muted/50 border border-border rounded-2xl p-6 md:p-8">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
        {/* Author Avatar */}
        <Avatar className="h-20 w-20 ring-4 ring-secondary/20 shadow-lg">
          <AvatarImage
            src="https://ui-avatars.com/api/?name=Dheeraj+Tagde&background=c4956a&color=fff&size=200&font-size=0.35"
            alt="Dheeraj Tagde"
          />
          <AvatarFallback className="bg-secondary text-secondary-foreground text-xl font-semibold">
            DT
          </AvatarFallback>
        </Avatar>

        {/* Author Info */}
        <div className="flex-1 text-center sm:text-left">
          <p className="text-xs font-medium text-secondary uppercase tracking-wider mb-1">
            Written by
          </p>
          <h4 className="font-serif text-xl font-bold text-foreground mb-2">
            Dheeraj Tagde
          </h4>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            Mehendi enthusiast & AI technology expert। AIMehendi.in के founder जो traditional Indian art को modern AI technology से combine करते हैं। 5+ years का experience in digital content creation।
          </p>

          {/* Social Links */}
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <a
              href="https://aimehendi.in"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-muted hover:bg-secondary/20 transition-colors"
              aria-label="Website"
            >
              <Globe className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-muted hover:bg-secondary/20 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-muted hover:bg-secondary/20 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;
