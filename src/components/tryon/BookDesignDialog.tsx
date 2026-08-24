import { useState } from "react";
import { CalendarHeart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface BookDesignDialogProps {
  /** Style slug of the design the user is booking. */
  style?: string;
  /** Optional link to the design image (only stored if it is a hosted URL). */
  designImageUrl?: string | null;
  source?: string;
}

const BookDesignDialog = ({ style, designImageUrl, source = "try-on" }: BookDesignDialogProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    occasion: "",
    event_date: "",
    message: "",
  });

  const set = (key: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length < 2 || form.phone.trim().length < 6) {
      toast({ title: "नाम और phone number सही से भरें", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from("design_bookings").insert({
        name: form.name.trim(),
        phone: form.phone.trim(),
        city: form.city.trim() || null,
        occasion: form.occasion.trim() || null,
        event_date: form.event_date || null,
        style: style ?? null,
        message: form.message.trim() || null,
        design_image_url:
          designImageUrl && designImageUrl.startsWith("http") ? designImageUrl : null,
        source,
      });
      if (error) throw error;

      toast({
        title: "Booking request भेज दी गई!",
        description: "हमारी team जल्द ही आपसे संपर्क करेगी।",
      });
      setOpen(false);
      setForm({ name: "", phone: "", city: "", occasion: "", event_date: "", message: "" });
    } catch {
      toast({
        title: "Request भेजी नहीं जा सकी",
        description: "कृपया थोड़ी देर बाद दोबारा try करें।",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="hero">
          <CalendarHeart className="h-4 w-4" aria-hidden="true" />
          इस design को book करें
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Mehendi artist booking request</DialogTitle>
          <DialogDescription>
            अपनी details भरें — हम आपके शहर के artist से आपको जोड़ने के लिए संपर्क करेंगे।
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="booking-name">नाम *</Label>
              <Input
                id="booking-name"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                maxLength={80}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="booking-phone">Phone / WhatsApp *</Label>
              <Input
                id="booking-phone"
                type="tel"
                inputMode="tel"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                maxLength={20}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="booking-city">शहर</Label>
              <Input
                id="booking-city"
                value={form.city}
                onChange={(e) => set("city", e.target.value)}
                maxLength={80}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="booking-occasion">Occasion</Label>
              <Input
                id="booking-occasion"
                placeholder="Shaadi, Karwa Chauth..."
                value={form.occasion}
                onChange={(e) => set("occasion", e.target.value)}
                maxLength={60}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="booking-date">Event date</Label>
            <Input
              id="booking-date"
              type="date"
              value={form.event_date}
              onChange={(e) => set("event_date", e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="booking-message">कुछ और बताना चाहें?</Label>
            <Textarea
              id="booking-message"
              rows={3}
              value={form.message}
              onChange={(e) => set("message", e.target.value)}
              maxLength={1000}
            />
          </div>

          <Button type="submit" variant="hero" className="w-full" disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                भेजा जा रहा है...
              </>
            ) : (
              "Booking request भेजें"
            )}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            आपकी details सिर्फ़ booking के लिए इस्तेमाल होती हैं।
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookDesignDialog;
