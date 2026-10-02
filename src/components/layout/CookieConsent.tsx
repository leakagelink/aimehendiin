import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";

const STORAGE_KEY = "aimehendi_cookie_consent";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      /* storage blocked — skip banner */
    }
  }, []);

  const decide = (value: "accepted" | "rejected") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="hidden md:block fixed inset-x-0 bottom-[calc(4rem+env(safe-area-inset-bottom))] md:bottom-0 z-[60] border-t border-border bg-card/95 backdrop-blur px-4 py-4 shadow-lg"
    >
      <div className="container flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="flex items-start gap-2 text-sm text-muted-foreground">
          <Cookie className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
          <span>
            Hum cookies ka upyog site functionality, analytics aur personalised ads (Google AdSense) ke liye
            karte hain. "Reject" chunne par personalised advertising cookies set nahi ki jaayengi. Details ke liye{" "}
            <Link to="/cookie-policy" className="text-primary underline underline-offset-4">
              Cookie Policy
            </Link>{" "}
            aur{" "}
            <Link to="/privacy-policy" className="text-primary underline underline-offset-4">
              Privacy Policy
            </Link>{" "}
            padhein.
          </span>
        </p>
        <div className="flex shrink-0 gap-2">
          <Button variant="outline" size="sm" onClick={() => decide("rejected")}>
            Reject
          </Button>
          <Button size="sm" onClick={() => decide("accepted")}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
