// Prompt-building logic for the AI mehendi generator.
// The frontend builds the prompt and sends only the prompt string
// to the `generate-mehndi-image` edge function (token stays server-side).

export const designTypePrompts: Record<string, string> = {
  bridal:
    "elaborate bridal wedding mehendi henna design with intricate patterns, peacocks, elephants, bride and groom motifs, paisleys, and traditional Indian wedding symbols",
  arabic:
    "elegant Arabic mehendi henna design with bold floral patterns, vine motifs, and flowing curved lines, less filled in, more open spaces",
  mandala:
    "circular mandala mehendi henna design with geometric patterns, symmetrical elements, and detailed zentangle-inspired artwork",
  simple:
    "minimalist simple mehendi henna design with clean lines, basic floral patterns, and elegant simplicity",
  finger:
    "delicate finger mehendi henna design with fine details on fingers, thin lines, and small floral patterns",
  back_hand:
    "beautiful back of hand mehendi henna design with central motif and extending patterns",
};

export const handTypePrompts: Record<string, string> = {
  back: "on the back of a woman's hand",
  front: "on the palm of a woman's hand",
  full: "covering the full hand from wrist to fingertips, both palm and back visible",
  both: "applied symmetrically on both hands of a woman, two hands placed side by side, matching patterns on left and right hand",
};

export type LookMode = "illustration" | "realistic";

export const lookPrompts: Record<LookMode, string> = {
  illustration:
    "Clean high-quality hand-drawn illustration style, brown/henna colored design on a light cream background, flat artistic line art.",
  realistic:
    "Ultra photorealistic photograph of real human hands with natural Indian skin tone, realistic skin texture, fine pores and natural nails, freshly applied dark reddish-brown henna paste with authentic glossy relief and subtle stain, soft natural daylight, shallow depth of field, professional DSLR photo, 85mm lens, anatomically correct hands with exactly five fingers each.",
};


export const styleModifierPrompts: Record<string, string> = {
  intricate: "with highly intricate and detailed fine line work",
  minimal: "with minimal elegant design and open spaces",
  floral: "featuring prominent floral motifs, roses, lotuses, and leaves",
  geometric: "incorporating geometric shapes, triangles, and symmetric patterns",
  traditional: "with traditional Indian and Rajasthani design elements",
  modern: "with contemporary modern fusion style",
};

export const NEGATIVE_HINTS =
  "Avoid blurry or low quality output, distorted or deformed hands, extra or missing fingers, text, watermarks and logos.";

export interface BuildPromptInput {
  designType: string;
  handType: string;
  styles?: string[];
  customPrompt?: string;
}

export function buildMehendiPrompt({
  designType,
  handType,
  styles = [],
  customPrompt = "",
}: BuildPromptInput): string {
  const designPrompt = designTypePrompts[designType] || designTypePrompts.bridal;
  const handPrompt = handTypePrompts[handType] || handTypePrompts.back;
  const stylePrompts = styles
    .map((s) => styleModifierPrompts[s])
    .filter(Boolean)
    .join(", ");

  return `Create a beautiful traditional Indian mehendi (henna) tattoo design illustration. ${designPrompt} ${handPrompt}. ${stylePrompts}. ${customPrompt.trim()}

Style requirements:
- Clean, high-quality illustration showing mehendi/henna art
- Brown/henna colored design on a light cream/skin-toned background
- Traditional mehendi art style with authentic Indian patterns
- Detailed and professional-looking
- Include paisleys, flowers, leaves and decorative elements typical of mehendi art
- Ultra high resolution, detailed illustration
${NEGATIVE_HINTS}`.trim();
}
