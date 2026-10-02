import { isNativeApp, showRewarded } from "@/lib/admob";
import { useRef, useState } from "react";
import { Upload, Sparkles, Download, RotateCcw, ShieldCheck, Loader2, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ZoomableImage from "@/components/generator/ZoomableImage";
import SocialShareButtons from "@/components/generator/SocialShareButtons";
import BeforeAfterSlider from "./BeforeAfterSlider";
import CameraCapture from "./CameraCapture";
import BookDesignDialog from "./BookDesignDialog";


const DAILY_LIMIT = 3;
const QUOTA_KEY = "aimehendi_tryon_quota";
const MAX_DIMENSION = 1024;

const styles = [
  { value: "bridal", label: "Bridal" },
  { value: "arabic", label: "Arabic" },
  { value: "mandala", label: "Mandala" },
  { value: "simple", label: "Simple" },
  { value: "rajasthani", label: "Rajasthani" },
];

const coverages = [
  { value: "palm", label: "सिर्फ़ Palm" },
  { value: "back_hand", label: "Back Hand" },
  { value: "full_hand", label: "Full Hand" },
  { value: "hand_arm", label: "Hand + Arm" },
];

const shades = [
  { value: "fresh", label: "Fresh Orange" },
  { value: "medium", label: "Reddish Brown" },
  { value: "deep", label: "Deep Maroon" },
];

const densities = [
  { value: "light", label: "Light" },
  { value: "medium", label: "Medium" },
  { value: "heavy", label: "Heavy" },
];

const todayKey = () => new Date().toISOString().slice(0, 10);

function readQuota(): number {
  try {
    const raw = localStorage.getItem(QUOTA_KEY);
    if (!raw) return 0;
    const parsed = JSON.parse(raw) as { date: string; count: number };
    return parsed.date === todayKey() ? parsed.count : 0;
  } catch {
    return 0;
  }
}

function bumpQuota() {
  try {
    localStorage.setItem(
      QUOTA_KEY,
      JSON.stringify({ date: todayKey(), count: readQuota() + 1 }),
    );
  } catch {
    /* ignore */
  }
}

/** Downscale + compress the user's photo entirely in the browser. */
function prepareImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Photo पढ़ी नहीं जा सकी"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Photo खोली नहीं जा सकी"));
      img.onload = () => {
        const scale = Math.min(1, MAX_DIMENSION / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Canvas unavailable"));
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.9));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

const OptionRow = ({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="space-y-2">
    <Label className="text-sm font-medium">{label}</Label>
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          aria-pressed={value === o.value}
          className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
            value === o.value
              ? "border-secondary bg-secondary/15 text-secondary"
              : "border-border text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  </div>
);

const MehndiTryOn = () => {
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);

  const [photo, setPhoto] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [used, setUsed] = useState(() => readQuota());
  const [cameraOpen, setCameraOpen] = useState(false);


  const [style, setStyle] = useState("arabic");
  const [coverage, setCoverage] = useState("full_hand");
  const [shade, setShade] = useState("medium");
  const [density, setDensity] = useState("medium");

  const remaining = Math.max(0, DAILY_LIMIT - used);

  const watchAdForTryOn = async () => {
    const earned = await showRewarded();
    if (!earned) {
      toast({ title: "Ad पूरा नहीं हुआ", description: "Extra try-on के लिए पूरा ad देखें।" });
      return;
    }
    try {
      localStorage.setItem(
        QUOTA_KEY,
        JSON.stringify({ date: todayKey(), count: Math.max(0, readQuota() - 1) }),
      );
    } catch {
      /* ignore */
    }
    setUsed(readQuota());
    toast({ title: "🎉 1 extra Try-On मिल गया!" });
  };

  const handleFile = async (file?: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast({ title: "सिर्फ़ image file upload करें", variant: "destructive" });
      return;
    }
    try {
      const dataUrl = await prepareImage(file);
      setPhoto(dataUrl);
      setResult(null);
    } catch {
      toast({ title: "Photo process नहीं हो पाई", variant: "destructive" });
    }
  };

  const handleTryOn = async () => {
    if (!photo) {
      toast({ title: "पहले अपनी hand photo upload करें" });
      return;
    }
    if (remaining <= 0) {
      toast({
        title: "आज की free limit ख़त्म",
        description: `रोज़ ${DAILY_LIMIT} free try-on मिलते हैं। कल दोबारा try करें।`,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("mehndi-tryon", {
        body: { image: photo, style, coverage, shade, density },
      });

      const message =
        (data as { error?: string } | null)?.error ??
        (error ? "Try-on generate नहीं हो पाया। कृपया दोबारा try करें।" : null);

      const imageUrl = (data as { imageUrl?: string } | null)?.imageUrl;
      if (!imageUrl) {
        toast({
          title: "Try-on fail हुआ",
          description: message ?? "कृपया दूसरी photo के साथ try करें।",
          variant: "destructive",
        });
        return;
      }

      setResult(imageUrl);
      bumpQuota();
      setUsed(readQuota());
      toast({ title: "आपका mehendi try-on तैयार है!" });
    } catch {
      toast({
        title: "कुछ गलत हो गया",
        description: "कृपया दोबारा try करें।",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result;
    a.download = `aimehendi-tryon-${Date.now()}.png`;
    a.click();
  };

  const reset = () => {
    setPhoto(null);
    setResult(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Left: input + controls */}
      <Card className="p-5 md:p-6 space-y-6">
        <div className="space-y-2">
          <Label className="text-sm font-medium">1. अपनी hand photo upload करें</Label>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="sr-only"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          {photo ? (
            <div className="relative overflow-hidden rounded-xl border border-border">
              <img src={photo} alt="आपकी upload की हुई hand photo" className="w-full" />
              <div className="absolute right-3 top-3 flex gap-2">
                <Button variant="secondary" size="sm" onClick={() => setCameraOpen(true)}>
                  <Camera className="h-4 w-4" aria-hidden="true" />
                  Camera
                </Button>
                <Button variant="secondary" size="sm" onClick={() => fileRef.current?.click()}>
                  बदलें
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="flex w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border py-12 text-muted-foreground transition-colors hover:border-secondary hover:text-foreground"
              >
                <Upload className="h-7 w-7" aria-hidden="true" />
                <span className="text-sm font-medium">Gallery से photo choose करें</span>
                <span className="text-xs">साफ़ रोशनी में खुली हथेली की photo best result देती है</span>
              </button>
              <Button variant="outline" className="w-full" onClick={() => setCameraOpen(true)}>
                <Camera className="h-4 w-4" aria-hidden="true" />
                Live camera से photo लें
              </Button>
            </div>
          )}
        </div>

        <CameraCapture
          open={cameraOpen}
          onOpenChange={setCameraOpen}
          onCapture={(dataUrl) => {
            setPhoto(dataUrl);
            setResult(null);
          }}
        />



        <div className="space-y-5">
          <OptionRow label="2. Design style" options={styles} value={style} onChange={setStyle} />
          <OptionRow label="3. Coverage" options={coverages} value={coverage} onChange={setCoverage} />
          <OptionRow label="4. Henna shade" options={shades} value={shade} onChange={setShade} />
          <OptionRow label="5. Density" options={densities} value={density} onChange={setDensity} />
        </div>

        <div className="space-y-3">
          <Button
            variant="hero"
            size="lg"
            className="w-full"
            onClick={handleTryOn}
            disabled={loading || !photo}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Mehendi apply हो रही है...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Virtual Try-On करें
              </>
            )}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            आज {remaining} / {DAILY_LIMIT} free try-on बाकी हैं
          </p>
          {remaining <= 0 && isNativeApp() && (
            <Button variant="outline" className="w-full" onClick={watchAdForTryOn}>
              🎁 Ad देखें और 1 extra Try-On पाएं
            </Button>
          )}
        </div>

        <p className="flex items-start gap-2 rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          आपकी photo सिर्फ़ इसी try-on के लिए process होती है, हमारे server पर save नहीं की जाती और page
          बंद करते ही हट जाती है।
        </p>
      </Card>

      {/* Right: result */}
      <Card className="p-5 md:p-6 space-y-4">
        <Label className="text-sm font-medium">Result</Label>

        {result && photo ? (
          <div className="space-y-4">
            <BeforeAfterSlider before={photo} after={result} />
            <div className="overflow-hidden rounded-xl border border-border">
              <ZoomableImage src={result} alt="AI virtual mehendi try-on result — zoom करके देखें" />
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary" onClick={handleDownload}>
                <Download className="h-4 w-4" aria-hidden="true" />
                Download
              </Button>
              <BookDesignDialog style={style} designImageUrl={result} source="try-on" />
              <Button variant="outline" onClick={reset}>
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                नई photo
              </Button>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Share करें</Label>
              <SocialShareButtons
                imageUrl={result}
                title="देखिए मेरा AI Virtual Mehndi Try-On — AIMehendi.in par free try karein!"
                pageUrl="https://aimehendi.in/try-on"
              />
            </div>

          </div>
        ) : (
          <div className="flex min-h-[320px] flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border text-center text-muted-foreground">
            {loading ? (
              <>
                <Loader2 className="h-8 w-8 animate-spin text-secondary" aria-hidden="true" />
                <p className="text-sm">AI आपके हाथ पर mehendi बना रहा है — 20-40 seconds लग सकते हैं</p>
              </>
            ) : (
              <>
                <Sparkles className="h-8 w-8" aria-hidden="true" />
                <p className="max-w-xs text-sm">
                  Photo upload करके style चुनें — यहाँ आपका before/after try-on दिखेगा।
                </p>
              </>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default MehndiTryOn;
