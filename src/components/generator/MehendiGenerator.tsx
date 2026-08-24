import { useState, useRef, useEffect } from "react";
import { Sparkles, Download, RefreshCw, Hand, Loader2, Upload, X, Share2, CheckCircle2, Circle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import SocialShareButtons from "./SocialShareButtons";
import { buildMehendiPrompt } from "@/lib/mehendiPrompt";


const designTypes = [
  { value: "bridal", label: "Bridal (दुल्हन)", labelHi: "दुल्हन मेहंदी" },
  { value: "arabic", label: "Arabic (अरेबिक)", labelHi: "अरेबिक मेहंदी" },
  { value: "mandala", label: "Mandala (मंडला)", labelHi: "मंडला डिज़ाइन" },
  { value: "simple", label: "Simple (सिंपल)", labelHi: "सिंपल मेहंदी" },
  { value: "finger", label: "Finger (फिंगर)", labelHi: "फिंगर मेहंदी" },
  { value: "back_hand", label: "Back Hand", labelHi: "बैक हैंड" },
];

const handTypes = [
  { value: "back", label: "Back Hand (हाथ का पीछे)" },
  { value: "front", label: "Palm (हथेली)" },
  { value: "full", label: "Full Hand (पूरा हाथ)" },
];

const styleModifiers = [
  { value: "intricate", label: "Intricate (जटिल)" },
  { value: "minimal", label: "Minimal (सादा)" },
  { value: "floral", label: "Floral (फूल वाला)" },
  { value: "geometric", label: "Geometric (ज्यामितीय)" },
  { value: "traditional", label: "Traditional (पारंपरिक)" },
  { value: "modern", label: "Modern (आधुनिक)" },
];

interface MehendiGeneratorProps {
  compact?: boolean;
}

const MehendiGenerator = ({ compact = false }: MehendiGeneratorProps) => {
  const [designType, setDesignType] = useState("bridal");
  const [handType, setHandType] = useState("back");
  const [selectedStyles, setSelectedStyles] = useState<string[]>(["intricate", "floral"]);
  const [customPrompt, setCustomPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);

  const [progressStage, setProgressStage] = useState<0 | 1 | 2 | 3>(0);
  const [elapsed, setElapsed] = useState(0);
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [sessionGallery, setSessionGallery] = useState<Array<{ id: string; image: string; label: string; ts: number; liked?: boolean }>>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem("mehendi_session_gallery");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Persist gallery (liked items survive across sessions)
  useEffect(() => {
    try {
      localStorage.setItem("mehendi_session_gallery", JSON.stringify(sessionGallery));
    } catch {
      try {
        // On quota error, keep only liked + most recent
        const trimmed = [
          ...sessionGallery.filter((g) => g.liked),
          ...sessionGallery.filter((g) => !g.liked).slice(0, 4),
        ];
        localStorage.setItem("mehendi_session_gallery", JSON.stringify(trimmed));
      } catch {
        /* ignore */
      }
    }
  }, [sessionGallery]);

  const toggleLike = (id: string) => {
    setSessionGallery((prev) => prev.map((g) => (g.id === id ? { ...g, liked: !g.liked } : g)));
  };

  const downloadFromGallery = (image: string, label: string) => {
    const link = document.createElement("a");
    link.href = image;
    link.download = `mehendi-${label.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({ title: "Downloaded! 📥", description: "डिज़ाइन डाउनलोड हो गया!" });
  };

  // Drive progress stages + elapsed timer while generating
  useEffect(() => {
    if (!isGenerating) return;
    const startedAt = Date.now();
    setElapsed(0);
    setProgressStage(0);
    const tick = setInterval(() => {
      const s = Math.floor((Date.now() - startedAt) / 1000);
      setElapsed(s);
      if (s >= 25) setProgressStage(3);
      else if (s >= 10) setProgressStage(2);
      else if (s >= 3) setProgressStage(1);
    }, 500);
    return () => clearInterval(tick);
  }, [isGenerating]);

  const toggleStyle = (style: string) => {
    setSelectedStyles((prev) =>
      prev.includes(style)
        ? prev.filter((s) => s !== style)
        : [...prev, style]
    );
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "कृपया 5MB से छोटी image upload करें।",
        variant: "destructive",
      });
      return;
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file",
        description: "कृपया एक valid image file upload करें।",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setReferenceImage(e.target?.result as string);
      toast({
        title: "Image uploaded! 📷",
        description: "Reference image add हो गई। अब Generate करें!",
      });
    };
    reader.readAsDataURL(file);
  };

  const removeReferenceImage = () => {
    setReferenceImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const generateDesign = async () => {
    if (isGenerating) return; // prevent duplicate/simultaneous requests
    setIsGenerating(true);
    setGeneratedImage(null);
    setGenerationError(null);
    setShowShareMenu(false);

    try {
      const prompt = buildMehendiPrompt({
        designType,
        handType,
        styles: selectedStyles,
        customPrompt,
      });

      const { data, error } = await supabase.functions.invoke("generate-mehndi-image", {
        body: { prompt },
      });

      if (error) {
        console.error("Error generating design:", error);
        let description = error.message || "डिज़ाइन बनाने में समस्या हुई। कृपया पुनः प्रयास करें।";
        try {
          const ctx = (error as { context?: Response }).context;
          if (ctx && typeof ctx.text === "function") {
            const bodyText = await ctx.text();
            const parsed = JSON.parse(bodyText);
            if (parsed?.error) description = parsed.error;
          }
        } catch {
          /* ignore parse errors */
        }
        setGenerationError(description);
        toast({
          title: "Error",
          description,
          variant: "destructive",
        });
        return;
      }

      if (data?.imageUrl) {
        setGeneratedImage(data.imageUrl);
        const label = `${designType}${selectedStyles.length ? " · " + selectedStyles.slice(0, 2).join(", ") : ""}`;
        setSessionGallery((prev) => {
          const next = [
            { id: crypto.randomUUID(), image: data.imageUrl, label, ts: Date.now(), liked: false },
            ...prev,
          ];
          // Keep all liked + most recent 12 unliked
          const liked = next.filter((g) => g.liked);
          const unliked = next.filter((g) => !g.liked).slice(0, 12);
          return [...liked, ...unliked];
        });
        toast({
          title: "Success! 🎉",
          description: "आपका मेहंदी डिज़ाइन तैयार है!",
        });
      } else {
        setGenerationError("कोई image नहीं मिली। कृपया दोबारा try करें।");
      }
    } catch (err) {
      console.error("Error:", err);
      setGenerationError("कुछ गलत हो गया। कृपया पुनः प्रयास करें।");
      toast({
        title: "Error",
        description: "कुछ गलत हो गया। कृपया पुनः प्रयास करें।",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };


  const downloadImage = () => {
    if (generatedImage) {
      const link = document.createElement("a");
      link.href = generatedImage;
      link.download = `mehendi-design-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({
        title: "Downloaded! 📥",
        description: "डिज़ाइन डाउनलोड हो गया!",
      });
    }
  };

  return (
    <div className={`w-full ${compact ? "" : "max-w-4xl mx-auto"}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
        {/* Controls */}
        <div className="space-y-3 md:space-y-6 bg-card rounded-xl md:rounded-2xl p-3 md:p-6 shadow-card border border-border">
          {/* Header - More compact on mobile */}
          <div className="flex items-center gap-2 pb-2 border-b border-border md:border-0 md:pb-0 mb-2 md:mb-4">
            <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center flex-shrink-0">
              <Hand className="h-4 w-4 md:h-5 md:w-5 text-primary-foreground" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <h2 className="font-serif text-base md:text-lg font-semibold text-foreground leading-tight">Design Options</h2>
              <p className="text-[10px] md:text-xs text-muted-foreground">अपनी पसंद चुनें</p>
            </div>
          </div>

          {/* Reference Image Upload */}
          {!compact && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Reference Image (वैकल्पिक)</Label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={fileInputRef}
                className="hidden"
                id="reference-image-upload"
              />
              
              {referenceImage ? (
                <div className="relative rounded-lg border border-border overflow-hidden">
                  <img 
                    src={referenceImage} 
                    alt="User uploaded reference design" 
                    className="w-full h-24 object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 h-7 w-7 p-0"
                    onClick={removeReferenceImage}
                    aria-label="Remove reference image"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm px-2 py-1">
                    <p className="text-xs text-muted-foreground truncate">Reference image added ✓</p>
                  </div>
                </div>
              ) : (
                <label
                  htmlFor="reference-image-upload"
                  className="flex items-center justify-center gap-2 w-full h-20 rounded-lg border-2 border-dashed border-border hover:border-secondary/50 hover:bg-secondary/5 transition-colors cursor-pointer"
                >
                  <Upload className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Upload reference photo
                  </span>
                </label>
              )}
              <p className="text-xs text-muted-foreground">
                अपनी photo upload करें, AI उस पर mehendi design बनाएगी
              </p>
            </div>
          )}

          {/* Design Type & Hand Type - Side by side on mobile */}
          <div className="grid grid-cols-2 gap-2 md:grid-cols-1 md:gap-4">
            <div className="space-y-1 md:space-y-2">
              <Label className="text-xs md:text-sm font-medium">Design Type</Label>
              <Select value={designType} onValueChange={setDesignType}>
                <SelectTrigger className="w-full h-9 md:h-10 text-xs md:text-sm">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {designTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value} className="text-xs md:text-sm">
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1 md:space-y-2">
              <Label className="text-xs md:text-sm font-medium">Hand Type</Label>
              <Select value={handType} onValueChange={setHandType}>
                <SelectTrigger className="w-full h-9 md:h-10 text-xs md:text-sm">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {handTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value} className="text-xs md:text-sm">
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Style Modifiers - Compact grid */}
          <div className="space-y-2">
            <Label className="text-xs md:text-sm font-medium">Style (स्टाइल)</Label>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 md:gap-2">
              {styleModifiers.map((style) => (
                <div
                  key={style.value}
                  className="flex items-center space-x-1.5 md:space-x-2"
                >
                  <Checkbox
                    id={style.value}
                    checked={selectedStyles.includes(style.value)}
                    onCheckedChange={() => toggleStyle(style.value)}
                    className="h-4 w-4"
                  />
                  <label
                    htmlFor={style.value}
                    className="text-xs md:text-sm text-foreground cursor-pointer leading-tight"
                  >
                    {style.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Prompt */}
          {!compact && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Custom Details (वैकल्पिक)</Label>
              <Textarea
                placeholder="Add any special details you want... जैसे peacock, lotus, dulha-dulhan etc."
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                className="min-h-[80px] resize-none"
              />
            </div>
          )}

          {/* Generate Button - Prominent but compact */}
          <Button
            variant="hero"
            size="lg"
            className="w-full h-10 md:h-12 text-sm md:text-base"
            onClick={generateDesign}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 md:h-5 md:w-5 animate-spin" aria-hidden="true" />
                <span className="ml-2">
                  {["Queued...", "Generating...", "Processing...", "Finalizing..."][progressStage]}
                </span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
                <span className="ml-2">{referenceImage ? "Generate" : "Generate Design"}</span>
              </>
            )}
          </Button>
        </div>

        {/* Preview */}
        <div className="bg-card rounded-xl md:rounded-2xl p-3 md:p-6 shadow-card border border-border flex flex-col">
          <div className="flex items-center justify-between gap-2 mb-3 md:mb-4">
            <h2 className="font-serif text-base md:text-lg font-semibold text-foreground">Preview</h2>
            {generatedImage && (
              <div className="flex gap-1.5 md:gap-2">
                <Button variant="outline" size="sm" onClick={generateDesign} disabled={isGenerating} aria-label="Regenerate" className="h-8 w-8 p-0 md:h-9 md:w-auto md:px-3">
                  <RefreshCw className={`h-3.5 w-3.5 md:h-4 md:w-4 ${isGenerating ? "animate-spin" : ""}`} aria-hidden="true" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setShowShareMenu(!showShareMenu)} aria-label="Share" className="h-8 w-8 p-0 md:h-9 md:w-auto md:px-3">
                  <Share2 className="h-3.5 w-3.5 md:h-4 md:w-4" aria-hidden="true" />
                </Button>
                <Button variant="gold" size="sm" onClick={downloadImage} aria-label="Download design" className="h-8 px-2 md:h-9 md:px-3">
                  <Download className="h-3.5 w-3.5 md:h-4 md:w-4" aria-hidden="true" />
                  <span className="hidden md:inline ml-1.5">Download</span>
                </Button>
              </div>
            )}
          </div>

          {/* Share Menu */}
          {showShareMenu && generatedImage && (
            <div className="mb-4 p-4 rounded-lg bg-muted/50 border border-border">
              <p className="text-sm font-medium text-foreground mb-3">Share on Social Media</p>
              <SocialShareButtons 
                imageUrl={generatedImage} 
                title="Check out this beautiful Mehendi design I created with AI!"
              />
            </div>
          )}

          <div className="flex-1 min-h-[200px] md:min-h-[300px] rounded-lg md:rounded-xl bg-gradient-to-br from-muted to-muted/50 border-2 border-dashed border-border flex items-center justify-center overflow-hidden">
            {isGenerating ? (
              <div className="w-full text-center p-4 md:p-8">
                <div className="relative w-fit mx-auto">
                  <div className="h-14 w-14 md:h-20 md:w-20 rounded-full bg-gradient-to-br from-primary via-secondary to-accent animate-pulse mx-auto mb-3 md:mb-4" />
                  <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-secondary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin-slow" aria-hidden="true" />
                </div>
                <p className="text-xs md:text-sm font-medium text-foreground mb-3">
                  {progressStage === 0 && "Queued — request bheji ja rahi hai..."}
                  {progressStage === 1 && "Generating — AI mehendi design bana rahi hai..."}
                  {progressStage === 2 && "Processing — design refine ho raha hai..."}
                  {progressStage === 3 && "Finalizing — almost done, bas kuch second..."}
                </p>

                {/* Progress bar */}
                <div className="max-w-xs mx-auto mb-4">
                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-500"
                      style={{ width: `${[15, 45, 75, 92][progressStage]}%` }}
                    />
                  </div>
                  <p className="text-[10px] md:text-xs text-muted-foreground mt-1.5">
                    {elapsed}s elapsed · usually 15–30 seconds
                  </p>
                </div>

                {/* Stage checklist */}
                <ul className="text-left max-w-xs mx-auto space-y-1.5">
                  {[
                    { label: "Request queued", hi: "Request queue mein" },
                    { label: "Generating design", hi: "Design generate ho raha hai" },
                    { label: "Processing image", hi: "Image process ho rahi hai" },
                    { label: "Finalizing output", hi: "Output finalize ho raha hai" },
                  ].map((step, idx) => {
                    const done = idx < progressStage;
                    const active = idx === progressStage;
                    return (
                      <li key={step.label} className="flex items-center gap-2 text-xs">
                        {done ? (
                          <CheckCircle2 className="h-3.5 w-3.5 text-secondary flex-shrink-0" aria-hidden="true" />
                        ) : active ? (
                          <Loader2 className="h-3.5 w-3.5 text-primary animate-spin flex-shrink-0" aria-hidden="true" />
                        ) : (
                          <Circle className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" aria-hidden="true" />
                        )}
                        <span className={done || active ? "text-foreground" : "text-muted-foreground"}>
                          {step.hi}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : generatedImage ? (
              <img
                src={generatedImage}
                alt="Generated Mehendi Design"
                className="w-full h-full object-contain rounded-lg"
              />
            ) : (
              <div className="text-center p-4 md:p-8">
                <div className="h-14 w-14 md:h-20 md:w-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Hand className="h-7 w-7 md:h-10 md:w-10 text-muted-foreground" aria-hidden="true" />
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">
                  अपनी पसंद चुनें और Generate दबाएं
                </p>
              </div>
            )}
          </div>

          {/* Session Gallery - recent generations + liked favourites */}
          {sessionGallery.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs md:text-sm font-medium text-foreground">
                  Recent & Favourites ({sessionGallery.length})
                  <span className="text-muted-foreground font-normal ml-1">· आपके designs</span>
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSessionGallery((prev) => prev.filter((g) => g.liked));
                    toast({ title: "Cleared", description: "Sirf liked designs rakhe गए" });
                  }}
                  className="text-[10px] md:text-xs text-muted-foreground hover:text-destructive transition-colors"
                >
                  Clear unliked
                </button>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                {sessionGallery.map((item) => {
                  const isActive = generatedImage === item.image;
                  return (
                    <div
                      key={item.id}
                      className={`group relative aspect-square rounded-md overflow-hidden border-2 transition-all ${
                        isActive ? "border-secondary ring-2 ring-secondary/40" : "border-border hover:border-secondary/60"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setGeneratedImage(item.image);
                          setShowShareMenu(false);
                        }}
                        title={item.label}
                        aria-label={`View ${item.label}`}
                        className="absolute inset-0 w-full h-full"
                      >
                        <img
                          src={item.image}
                          alt={item.label}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                      </button>

                      {/* Always-visible like badge (top-left) */}
                      {item.liked && (
                        <div className="absolute top-1 left-1 h-5 w-5 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center pointer-events-none">
                          <Heart className="h-3 w-3 fill-destructive text-destructive" aria-hidden="true" />
                        </div>
                      )}

                      {/* Action overlay */}
                      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-1 p-1 bg-gradient-to-t from-background/90 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(item.id);
                          }}
                          aria-label={item.liked ? "Unlike design" : "Like design"}
                          className="h-7 w-7 rounded-full bg-background/90 hover:bg-background flex items-center justify-center transition-colors"
                        >
                          <Heart
                            className={`h-3.5 w-3.5 ${item.liked ? "fill-destructive text-destructive" : "text-foreground"}`}
                            aria-hidden="true"
                          />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            downloadFromGallery(item.image, item.label);
                          }}
                          aria-label="Download design"
                          className="h-7 w-7 rounded-full bg-background/90 hover:bg-background flex items-center justify-center transition-colors"
                        >
                          <Download className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-[10px] md:text-xs text-muted-foreground mt-2">
                ❤️ liked designs save रहेंगे · unliked auto-clear हो सकते हैं
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MehendiGenerator;
