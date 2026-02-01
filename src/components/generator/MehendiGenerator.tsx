import { useState } from "react";
import { Sparkles, Download, RefreshCw, Hand, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  const toggleStyle = (style: string) => {
    setSelectedStyles((prev) =>
      prev.includes(style)
        ? prev.filter((s) => s !== style)
        : [...prev, style]
    );
  };

  const generateDesign = async () => {
    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      const { data, error } = await supabase.functions.invoke("generate-mehendi", {
        body: {
          designType,
          handType,
          styles: selectedStyles,
          customPrompt,
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
          description: "आपका मेहंदी डिज़ाइन तैयार है!",
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
      <div className="grid md:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6 bg-card rounded-2xl p-6 shadow-card border border-border">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
              <Hand className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-foreground">Design Options</h3>
              <p className="text-xs text-muted-foreground">अपनी पसंद चुनें</p>
            </div>
          </div>

          {/* Design Type */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Design Type (डिज़ाइन प्रकार)</Label>
            <Select value={designType} onValueChange={setDesignType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select design type" />
              </SelectTrigger>
              <SelectContent>
                {designTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Hand Type */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Hand Type (हाथ का प्रकार)</Label>
            <Select value={handType} onValueChange={setHandType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select hand type" />
              </SelectTrigger>
              <SelectContent>
                {handTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Style Modifiers */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Style (स्टाइल चुनें)</Label>
            <div className="grid grid-cols-2 gap-2">
              {styleModifiers.map((style) => (
                <div
                  key={style.value}
                  className="flex items-center space-x-2"
                >
                  <Checkbox
                    id={style.value}
                    checked={selectedStyles.includes(style.value)}
                    onCheckedChange={() => toggleStyle(style.value)}
                  />
                  <label
                    htmlFor={style.value}
                    className="text-sm text-foreground cursor-pointer"
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

          {/* Generate Button */}
          <Button
            variant="hero"
            size="xl"
            className="w-full"
            onClick={generateDesign}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Generating... बन रहा है
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                Generate Design | डिज़ाइन बनाएं
              </>
            )}
          </Button>
        </div>

        {/* Preview */}
        <div className="bg-card rounded-2xl p-6 shadow-card border border-border flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-lg font-semibold text-foreground">Preview</h3>
            {generatedImage && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={generateDesign} disabled={isGenerating}>
                  <RefreshCw className={`h-4 w-4 ${isGenerating ? "animate-spin" : ""}`} />
                </Button>
                <Button variant="gold" size="sm" onClick={downloadImage}>
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            )}
          </div>

          <div className="flex-1 min-h-[300px] rounded-xl bg-gradient-to-br from-muted to-muted/50 border-2 border-dashed border-border flex items-center justify-center overflow-hidden">
            {isGenerating ? (
              <div className="text-center p-8">
                <div className="relative">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary via-secondary to-accent animate-pulse mx-auto mb-4" />
                  <Sparkles className="h-8 w-8 text-secondary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin-slow" />
                </div>
                <p className="text-sm text-muted-foreground">
                  AI आपका डिज़ाइन बना रही है...
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Creating your beautiful design
                </p>
              </div>
            ) : generatedImage ? (
              <img
                src={generatedImage}
                alt="Generated Mehendi Design"
                className="w-full h-full object-contain rounded-lg"
              />
            ) : (
              <div className="text-center p-8">
                <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Hand className="h-10 w-10 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  अपनी पसंद चुनें और "Generate" दबाएं
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Select your preferences and click Generate
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
