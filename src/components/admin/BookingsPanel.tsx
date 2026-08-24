import { useEffect, useState } from "react";
import { Loader2, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Booking {
  id: string;
  name: string;
  phone: string;
  city: string | null;
  occasion: string | null;
  event_date: string | null;
  style: string | null;
  message: string | null;
  status: string;
  source: string;
  created_at: string;
}

const STATUSES = ["new", "contacted", "closed"];

const BookingsPanel = () => {
  const { toast } = useToast();
  const [rows, setRows] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("design_bookings")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) {
      toast({ title: "Bookings load नहीं हो पाईं", variant: "destructive" });
    } else {
      setRows((data ?? []) as Booking[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("design_bookings").update({ status }).eq("id", id);
    if (error) {
      toast({ title: "Status update नहीं हुआ", variant: "destructive" });
      return;
    }
    setRows((r) => r.map((b) => (b.id === id ? { ...b, status } : b)));
  };

  return (
    <Card className="mt-6 p-6 bg-card border-border">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="font-serif text-xl text-foreground">Booking Requests</h2>
          <p className="text-sm text-muted-foreground">Try-On aur gallery se aayi leads.</p>
        </div>
        <Button variant="outline" size="sm" onClick={load} disabled={loading}>
          <RefreshCw className="h-4 w-4 mr-2" aria-hidden="true" />
          Refresh
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Loading...
        </div>
      ) : rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">अभी कोई booking request नहीं आई।</p>
      ) : (
        <ul className="space-y-3">
          {rows.map((b) => (
            <li key={b.id} className="rounded-lg border border-border p-4 text-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-medium text-foreground">
                  {b.name} — {b.phone}
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date(b.created_at).toLocaleString("en-IN")}
                </span>
              </div>
              <p className="mt-1 text-muted-foreground">
                {[b.city, b.occasion, b.style, b.event_date].filter(Boolean).join(" · ") || "—"}
              </p>
              {b.message && <p className="mt-2 text-muted-foreground">{b.message}</p>}
              <div className="mt-3 flex flex-wrap gap-2">
                {STATUSES.map((s) => (
                  <Button
                    key={s}
                    size="sm"
                    variant={b.status === s ? "secondary" : "outline"}
                    onClick={() => updateStatus(b.id, s)}
                  >
                    {s}
                  </Button>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
};

export default BookingsPanel;
