import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";

const SeoReport = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchReport = async () => {
    setLoading(true);
    setError(null);
    try {
      const today = new Date().toISOString().slice(0, 10);
      const { data, error } = await supabase.functions.invoke(
        `ahrefs-domain-rating?target=aimehendi.in/&date=${today}`,
        { method: "GET" }
      );
      if (error) throw error;
      setData(data);
    } catch (e: any) {
      setError(e.message ?? "Failed to fetch report");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReport(); }, []);

  const dr = data?.data?.domain_rating?.domain_rating ?? data?.data?.domain_rating ?? null;
  const ascendingDr = data?.data?.domain_rating?.ascending_sum_url_rating ?? null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
            SEO Report — <span className="text-secondary">aimehendi.in</span>
          </h1>
          <p className="text-muted-foreground mb-6">
            Ahrefs Domain Rating + AI search visibility report
          </p>

          <Card className="p-6 mb-6 bg-card border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-xl text-foreground">Ahrefs Domain Rating</h2>
              <Button onClick={fetchReport} disabled={loading} size="sm" variant="outline">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                <span className="ml-2">Refresh</span>
              </Button>
            </div>

            {loading && <p className="text-muted-foreground">Loading...</p>}
            {error && (
              <div className="p-4 rounded bg-destructive/10 text-destructive text-sm">
                {error}
              </div>
            )}
            {!loading && !error && data && (
              <div className="space-y-3">
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-bold text-secondary">
                    {dr ?? "—"}
                  </span>
                  <span className="text-muted-foreground">Domain Rating</span>
                </div>
                {ascendingDr !== null && (
                  <p className="text-sm text-muted-foreground">
                    Ascending sum URL rating: <strong>{ascendingDr}</strong>
                  </p>
                )}
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                    Raw API response
                  </summary>
                  <pre className="mt-2 p-3 bg-muted rounded text-xs overflow-auto max-h-96">
                    {JSON.stringify(data, null, 2)}
                  </pre>
                </details>
              </div>
            )}
          </Card>

          <Card className="p-6 bg-card border-border">
            <h2 className="font-serif text-xl text-foreground mb-3">SEO Checklist</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✅ Title &lt; 60 chars with Hinglish keywords</li>
              <li>✅ Meta description &lt; 160 chars</li>
              <li>✅ Canonical, OG, Twitter cards configured</li>
              <li>✅ JSON-LD: Organization, WebSite, SoftwareApplication</li>
              <li>✅ sitemap.xml + robots.txt + hreflang</li>
              <li>✅ Favicon + apple-touch-icon + manifest</li>
              <li>✅ Per-route SEO via react-helmet-async</li>
            </ul>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SeoReport;
