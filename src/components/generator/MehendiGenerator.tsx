import { useState, useRef } from "react";
import { Sparkles, Download, RefreshCw, Hand, Loader2, Upload, X, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import SocialShareButtons from "./SocialShareButtons";

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
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

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
    setIsGenerating(true);
    setGeneratedImage(null);
    setShowShareMenu(false);

    try {
      const { data, error } = await supabase.functions.invoke("generate-mehendi", {
        body: {
          designType,
          handType,
          styles: selectedStyles,
          customPrompt,
          referenceImage,
        },
      });

      if (error) {
        console.error("Error generating design:", error);
        toast({
          title: "Error",
          description: error.message || "डिज़ाइन बनाने में समस्या हुई। कृपया पुनः प्रयास करें।",
          variant: "destructive",
        });
        return;
      }

      if (data?.imageUrl) {
        setGeneratedImage(data.imageUrl);
        toast({
          title: "Success! 🎉",
          description: referenceImage 
            ? "आपका custom मेहंदी डिज़ाइन तैयार है!"
            : "आपका मेहंदी डिज़ाइन तैयार है!",
        });
      }
    } catch (err) {
      console.error("Error:", err);
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
                <span className="ml-2">Generating...</span>
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
            <h3 className="font-serif text-base md:text-lg font-semibold text-foreground">Preview</h3>
            {generatedImage && (
              <div className="flex gap-1.5 md:gap-2">
                <Button variant="outline" size="sm" onClick={generateDesign} disabled={isGenerating} aria-label="Regenerate" className="h-8 w-8 p-0 md:h-9 md:w-auto md:px-3">
                  <RefreshCw className={`h-3.5 w-3.5 md:h-4 md:w-4 ${isGenerating ? "animate-spin" : ""}`} aria-hidden="true" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setShowShareMenu(!showShareMenu)} aria-label="Share" className="h-8 w-8 p-0 md:h-9 md:w-auto md:px-3">
                  <Share2 className="h-3.5 w-3.5 md:h-4 md:w-4" aria-hidden="true" />
                </Button>
                <Button variant="gold" size="sm" onClick={downloadImage} className="h-8 px-2 md:h-9 md:px-3">
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
              <div className="text-center p-4 md:p-8">
                <div className="relative">
                  <div className="h-14 w-14 md:h-20 md:w-20 rounded-full bg-gradient-to-br from-primary via-secondary to-accent animate-pulse mx-auto mb-3 md:mb-4" />
                  <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-secondary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin-slow" aria-hidden="true" />
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">
                  AI आपका डिज़ाइन बना रही है...
                </p>
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
        </div>
      </div>
    </div>
  );
};

export default MehendiGenerator;
