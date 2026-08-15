export interface GalleryCategoryConfig {
  /** URL slug and DB `category` value */
  slug: string;
  label: string;
  labelHi: string;
  title: string;
  description: string;
  h1: string;
  intro: string[];
}

export const GALLERY_CATEGORIES: GalleryCategoryConfig[] = [
  {
    slug: "bridal",
    label: "Bridal",
    labelHi: "दुल्हन",
    title: "Bridal Mehndi Designs — AI Bridal Mehendi Ideas",
    description:
      "Full-hand dulhan mehndi designs with intricate motifs, portraits aur jaal work. Shaadi ke liye AI bridal mehendi ideas dekhen aur free download karen.",
    h1: "Bridal Mehndi Designs",
    intro: [
      "Bridal mehndi wo detailed henna art hai jo dulhan ke haathon aur pairon par kohni tak lagayi jaati hai. Ismein dense jaal, kalash, doli-baraat motifs aur bride-groom portraits shamil hote hain.",
      "Ye category un brides ke liye hai jinki shaadi, engagement ya reception hai aur jo full-coverage, statement design chahti hain. Rajasthani, Marwari aur Indo-Arabic bridal styles yahan sabse popular hain.",
      "Apne outfit aur haath ki length ke hisaab se design customise karne ke liye AI generator ka istemal karen.",
    ],
  },
  {
    slug: "arabic",
    label: "Arabic",
    labelHi: "अरेबिक",
    title: "Arabic Mehndi Designs — AI Arabic Mehendi Ideas",
    description:
      "Flowing Arabic mehndi designs — bold floral vines, leafy shading aur back-hand patterns jo jaldi lagte hain. Free HD Arabic mehendi ideas dekhen.",
    h1: "Arabic Mehndi Designs",
    intro: [
      "Arabic mehndi apni bold outlines, flowing floral vines aur khaali space ke balance ke liye jaani jaati hai. Ye designs bharee hue nahi hote, isliye jaldi sukhte hain aur colour bhi acha aata hai.",
      "Ye style un logon ke liye best hai jo kam time mein attractive design chahte hain — sangeet, mehndi function, Eid ya office party ke liye ideal.",
      "Back hand vine, single-strip aur half-hand Arabic patterns yahan sabse zyada try kiye jaate hain.",
    ],
  },
  {
    slug: "mandala",
    label: "Mandala",
    labelHi: "मंडला",
    title: "Mandala Mehndi Designs — AI Mandala Mehendi Ideas",
    description:
      "Symmetrical mandala mehndi designs — circular motifs, dotted layers aur geometric patterns beginners aur pros dono ke liye. Free ideas dekhen.",
    h1: "Mandala Mehndi Designs",
    intro: [
      "Mandala mehndi ek circular, symmetrical pattern hai jismein center se layer-by-layer petals, dots aur geometric lines banti hain.",
      "Beginners ke liye ye category perfect hai, kyunki mandala ka structure repeat hota hai aur practice se hi neat ban jata hai. Palm center, back hand aur wrist par ye design bahut jamta hai.",
      "Simple 3-layer mandala se lekar detailed multi-ring mandala tak, yahan har level ke patterns milenge.",
    ],
  },
  {
    slug: "simple",
    label: "Simple",
    labelHi: "सिंपल",
    title: "Simple Mehndi Designs — Easy AI Mehendi Ideas",
    description:
      "Easy aur minimal mehndi designs jo 10–15 minute mein lag jaayen. Daily wear, college aur small functions ke liye simple mehendi ideas.",
    h1: "Simple Mehndi Designs",
    intro: [
      "Simple mehndi designs minimal lines, chhote floral motifs aur light coverage par based hote hain — na zyada time lagta hai, na practice.",
      "Ye category un logon ke liye hai jo khud apne haath par mehndi lagate hain, ya jinhe office, college ya ghar ke chhote function ke liye halka design chahiye.",
      "Single-finger strips, wrist bands aur minimal palm motifs yahan sabse common hain.",
    ],
  },
  {
    slug: "finger",
    label: "Finger",
    labelHi: "फिंगर",
    title: "Finger Mehndi Designs — AI Finger Mehendi Ideas",
    description:
      "Trendy finger mehndi designs — ring style, fingertip shading aur minimal strips. Modern aur quick finger mehendi ideas free mein dekhen.",
    h1: "Finger Mehndi Designs",
    intro: [
      "Finger mehndi sirf ungliyon par lagti hai — ring-style motifs, fingertip shading aur thin strips ke saath.",
      "Ye modern minimal look chahne walon ke liye hai, khaaskar tab jab poore haath par mehndi na lagani ho. Western outfits aur casual events ke saath ye style bahut acchi lagti hai.",
      "Fingertip dip, chequered tips aur single-line finger vines yahan popular options hain.",
    ],
  },
  {
    slug: "festival",
    label: "Festival",
    labelHi: "त्योहार",
    title: "Festival Mehndi Designs — AI Festival Mehendi Ideas",
    description:
      "Karwa Chauth, Teej, Diwali, Eid aur Raksha Bandhan ke liye festival mehndi designs. Occasion-wise mehendi ideas free mein browse karen.",
    h1: "Festival Mehndi Designs",
    intro: [
      "Festival mehndi designs tyohaar ke theme par based hote hain — Karwa Chauth ke chalni aur moon motifs, Teej ke jhula patterns, Diwali ke diya aur rangoli motifs.",
      "Ye category un logon ke liye hai jinhe kisi khaas occasion ke liye meaningful design chahiye, na ki generic pattern.",
      "Coverage medium rehti hai — na bridal jitni heavy, na simple jitni halki — isliye ye har umar ke liye suitable hai.",
    ],
  },
];

export const getGalleryCategory = (slug?: string) =>
  GALLERY_CATEGORIES.find((c) => c.slug === slug?.toLowerCase());
