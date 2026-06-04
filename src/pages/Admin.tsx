import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Loader2, LogOut, Save, Eye, EyeOff } from "lucide-react";

const SETTING_KEY = "AHREFS_API_KEY";

const Admin = () => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState("");
  const [maskedExisting, setMaskedExisting] = useState<string | null>(null);
  const [show, setShow] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/auth", { replace: true }); return; }
      setUserEmail(session.user.email ?? null);

      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id);
      const admin = !!roles?.some((r: any) => r.role === "admin");
      setIsAdmin(admin);

      if (admin) {
        const { data } = await supabase
          .from("app_settings")
          .select("value")
          .eq("key", SETTING_KEY)
          .maybeSingle();
        if (data?.value) {
          const v = data.value;
          setMaskedExisting(`${v.slice(0, 4)}••••${v.slice(-4)}`);
        }
      }
      setChecking(false);
    };
    init();
  }, [navigate]);

  const handleSave = async () => {
    if (!apiKey.trim()) return;
    setSaving(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const { error } = await supabase
        .from("app_settings")
        .upsert({ key: SETTING_KEY, value: apiKey.trim(), updated_by: session?.user.id });
      if (error) throw error;
      toast({ title: "Saved", description: "Ahrefs API key updated." });
      setMaskedExisting(`${apiKey.slice(0, 4)}••••${apiKey.slice(-4)}`);
      setApiKey("");
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth", { replace: true });
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-secondary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-16">
          <Card className="max-w-md mx-auto p-8 bg-card border-border text-center">
            <h1 className="font-serif text-2xl font-bold text-foreground mb-2">Access denied</h1>
            <p className="text-muted-foreground mb-4">
              Aapke account ko admin role assign nahi hai.
            </p>
            <p className="text-xs text-muted-foreground mb-6 break-all">
              Logged in as: <strong>{userEmail}</strong>
            </p>
            <p className="text-xs text-muted-foreground mb-6">
              Admin banane ke liye Cloud → SQL Editor me ye run karein (apna user_id daalein):<br/>
              <code className="text-xs bg-muted px-2 py-1 rounded mt-2 inline-block">
                INSERT INTO user_roles (user_id, role) VALUES ('{`{your-user-id}`}', 'admin');
              </code>
            </p>
            <Button onClick={handleSignOut} variant="outline">
              <LogOut className="h-4 w-4 mr-2" />Sign out
            </Button>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-serif text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground text-sm">{userEmail}</p>
            </div>
            <Button onClick={handleSignOut} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />Sign out
            </Button>
          </div>

          <Card className="p-6 bg-card border-border">
            <h2 className="font-serif text-xl text-foreground mb-1">Ahrefs API Key</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Securely stored. Backend edge function isse service role ke through padhega.
            </p>

            {maskedExisting && (
              <div className="mb-4 p-3 bg-muted rounded text-sm">
                Current: <code>{maskedExisting}</code>
              </div>
            )}

            <Label htmlFor="key">{maskedExisting ? "Replace with new key" : "Enter API key"}</Label>
            <div className="relative mt-1">
              <Input
                id="key"
                type={show ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="ahrefs_xxxxxxxxxxxxxxxx"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                aria-label="Toggle visibility"
              >
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <Button onClick={handleSave} disabled={saving || !apiKey.trim()} className="mt-4">
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
              Save key
            </Button>

            <div className="mt-6 pt-6 border-t border-border">
              <Button onClick={() => navigate("/seo-report")} variant="secondary" className="w-full">
                View SEO Report →
              </Button>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
