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

export const bodyPartPrompts: Record<string, string> = {
  hands: "on the hands of a woman",
  feet: "on the FEET of a woman — the tops of both feet, ankles and toes, feet resting together, no hands anywhere in the frame",
  arms: "on the FOREARMS of a woman — from wrist up along the forearm towards the elbow, arms as the main subject",
  wrist: "on the WRIST only, as a bracelet-style band wrapped around the wrist",
  full_leg: "on the LEGS of a woman from ankle up to the knee, full leg mehendi, no hands in the frame",
};

// Body-part-neutral versions of each design type, used when the selected
// body part is not hands (so the design type never forces hands into the image).
export const designTypeCorePrompts: Record<string, string> = {
  bridal:
    "elaborate bridal wedding mehendi henna work with intricate patterns, peacocks, elephants, paisleys and traditional Indian wedding symbols",
  arabic:
    "elegant Arabic mehendi henna work with bold floral patterns, vine motifs and flowing curved lines with open spaces",
  mandala:
    "circular mandala mehendi henna work with geometric symmetrical patterns and zentangle-inspired detail",
  simple:
    "minimalist simple mehendi henna work with clean lines and elegant basic floral patterns",
  finger:
    "delicate fine-line mehendi henna work with thin lines and small floral patterns",
  back_hand:
    "mehendi henna work with a bold central motif and patterns extending outwards",
};

export const bodyPartNegatives: Record<string, string> = {
  feet:
    "Do NOT show hands, fingers, palms or arms — only feet and toes. Do NOT produce deformed, fused, extra, missing or unnaturally long toes, doll-like or plastic feet, wrong foot orientation, or two left feet — feet must be a correctly mirrored left and right pair with realistic proportions.",
  arms: "Do NOT make hands or palms the focus — the forearm is the main subject.",
  wrist: "Do NOT cover the whole hand or fingers — only the wrist band area is decorated.",
  full_leg: "Do NOT show hands, fingers or arms — only legs and feet.",
};

export const occasionPrompts: Record<string, string> = {
  wedding: "perfect for an Indian bride's wedding day",
  engagement: "delicate engagement ceremony mehendi",
  sangeet: "sangeet night mehendi with musical elements and celebratory patterns",
  karva_chauth: "elegant Karva Chauth mehendi with moon, stars and sieve motifs",
  eid: "festive Eid mehendi with crescent moon and floral patterns",
  rakhi: "Raksha Bandhan mehendi with rakhi, beads and traditional motifs",
  teej: "Teej festival mehendi with swings, peacocks and monsoon florals",
  festival: "general festive Indian celebration mehendi",
  everyday: "simple everyday wearable mehendi design",
};

export const regionStylePrompts: Record<string, string> = {
  indian: "authentic Indian mehendi style",
  rajasthani: "Rajasthani/Marwari style with dense filling and traditional motifs",
  arabic: "Arabic style with bold florals, flowing vines and open spaces",
  pakistani: "Pakistani style with intricate details and delicate florals",
  indo_arabic: "Indo-Arabic fusion with bold outlines and Indian filling",
  moroccan: "Moroccan henna with geometric tribal patterns",
  indo_western: "Indo-Western fusion mehendi",
};

export const motifPrompts: Record<string, string> = {
  peacock: "peacock motifs",
  elephant: "elephant motifs",
  lotus: "lotus flower motifs",
  bride_groom: "bride and groom figures",
  paisley: "paisley/kairi motifs",
  mandala: "mandala motifs",
  kalash: "kalash/pot motifs",
  mango: "mango leaf/keri motifs",
  heart: "heart motifs",
  name: "hidden name/initials woven into design",
};

export type LookMode = "illustration" | "realistic";

export const lookPrompts: Record<LookMode, string> = {
  illustration:
    "Clean high-quality hand-drawn illustration style, brown/henna colored design on a light cream background, flat artistic line art.",
  realistic:
    "Ultra photorealistic close-up photograph of real human female skin with natural Indian skin tone, visible realistic skin texture, fine pores and natural creases. The henna is a real dried stain on the skin in authentic deep reddish-brown, maroon and burnt-orange henna tones only — no coloured ink, no blue, no purple, no paint. Soft warm natural window light, gentle shadows, resting on soft fabric or a plain warm beige surface, shallow depth of field with a softly blurred background, professional DSLR photograph, 85mm lens, top-down close-up crop.",
};

// Photographic scene details per body part, used only in realistic mode so that
// feet / arms / legs get the same photo-real treatment as hands.
export const realisticScenePrompts: Record<string, string> = {
  hands:
    "Real female hands photographed from above, relaxed natural finger posture, correct human anatomy with five fingers, natural nails with a neutral or light manicure, thin gold bangles and a ring, hands resting on a soft red or beige fabric.",
  feet:
    "Real bare female FEET photographed from a natural high angle looking down at the tops of both feet placed flat and side by side on the ground (wooden floor, marble, or a soft fabric), toes pointing towards the lower edge of the frame. Anatomically perfect human feet: exactly five well-formed toes on each foot with correct decreasing size, natural toenails with clean French or nude polish, realistic toe knuckle creases, visible tendons and bone structure on the top of the foot, natural arch, ankle bone and heel shape, slight natural skin tone variation and soft veins. Delicate gold anklet (payal) with small ghungroo bells around each ankle and a silver/gold toe ring. Henna covers the top of the foot, spreads over the toes in banded tips and ends in a decorated band around the ankle, exactly like a real Indian bridal foot mehendi photo. Soft natural daylight, shallow depth of field, background softly blurred.",
  arms:
    "Real female FOREARM photographed close-up, natural arm contour from wrist to elbow, soft downy skin texture, subtle muscle and vein definition, gold bangles near the wrist, arm resting on a soft fabric.",
  wrist:
    "Real female WRIST photographed close-up, natural wrist crease lines and bone contour, slim gold bangles beside the henna band, soft fabric background.",
  full_leg:
    "Real female LEGS photographed from ankle to knee, both legs resting together on a soft fabric, natural calf and shin contour, realistic ankle and foot with five natural toes, gold anklet, smooth realistic skin texture.",
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
  bodyPart: string;
  occasion: string;
  region: string;
  motifs?: string[];
  styles?: string[];
  customPrompt?: string;
  look?: LookMode;
}

export function buildMehendiPrompt({
  designType,
  handType,
  bodyPart,
  occasion,
  region,
  motifs = [],
  styles = [],
  customPrompt = "",
  look = "illustration",
}: BuildPromptInput): string {
  const isHands = bodyPart === "hands";
  const designPrompt = isHands
    ? designTypePrompts[designType] || designTypePrompts.bridal
    : designTypeCorePrompts[designType] || designTypeCorePrompts.bridal;
  const handPrompt = handTypePrompts[handType] || handTypePrompts.back;
  const bodyPrompt = bodyPartPrompts[bodyPart] || bodyPartPrompts.hands;
  const occasionPrompt = occasionPrompts[occasion] || "";
  const regionPrompt = regionStylePrompts[region] || regionStylePrompts.indian;
  const motifPromptsText = motifs
    .map((m) => motifPrompts[m])
    .filter(Boolean)
    .join(", ");
  const stylePrompts = styles
    .map((s) => styleModifierPrompts[s])
    .filter(Boolean)
    .join(", ");

  const locationClause = isHands ? handPrompt : bodyPrompt;
  const bodyNegative = isHands ? "" : bodyPartNegatives[bodyPart] || "";

  const baseDetails = [
    locationClause,
    designPrompt,
    regionPrompt,
    occasionPrompt,
    motifPromptsText,
    stylePrompts,
    customPrompt.trim(),
  ]
    .filter(Boolean)
    .join(". ");

  if (look === "realistic") {
    const scene =
      realisticScenePrompts[bodyPart] || realisticScenePrompts.hands;
    return `${lookPrompts.realistic} ${scene} The mehendi is ${baseDetails}. 

Requirements:
- Looks like a real photograph taken by a mehendi artist for Instagram, NOT a drawing, painting, 3D render or illustration
- Real living human body part with anatomically correct proportions, natural joints, nails and skin folds
- Henna stain follows the natural curves of the skin, wrapping realistically over creases and contours
- Authentic Indian mehendi artwork: paisleys, mandalas, florals, jaali net fill, fine dotted and checkered bands
- The mehendi is applied ${locationClause}
- Realistic henna colour: rich reddish-brown to maroon stain, slightly darker in the center, softer near the edges
- Natural skin imperfections: pores, fine lines, subtle tan variation, soft highlights and realistic shadows
- Ultra high resolution, tack-sharp detail on the henna patterns and skin
${bodyNegative} ${NEGATIVE_HINTS} Avoid cartoon, anime, 3D render, CGI, painted or illustrated look, plastic, wax or mannequin skin, doll-like limbs, deformed toes or extra toes, flat sticker-like henna, unnatural colours.`.trim();
  }

  return `Create a beautiful traditional Indian mehendi (henna) tattoo design illustration. ${baseDetails}.

Style requirements:
- Clean, high-quality illustration showing mehendi/henna art
- Brown/henna colored design on a light cream/skin-toned background
- Traditional mehendi art style with authentic Indian patterns
- Detailed and professional-looking
- Include paisleys, flowers, leaves and decorative elements typical of mehendi art
- Ultra high resolution, detailed illustration
${bodyNegative} ${NEGATIVE_HINTS}`.trim();
}
