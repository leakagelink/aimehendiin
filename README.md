# AI Mehendi Magic (58)

# 🎨 AIMehendi.in - Complete Website Development Prompt

---

## 📋 PROJECT OVERVIEW

**Website Name:** AIMehendi.in - AI Mehendi Design Generator
**Tagline:** "AI से बनाएं खूबसूरत मेहंदी डिज़ाइन | Free AI Mehendi Design Generator"
**Primary Language:** Hinglish (Hindi + English mix)
**Target Audience:** Indian women (18-45), brides, mehendi artists
**Monetization:** Google AdSense, Amazon Affiliates, Freemium AI credits

---
-- Generated designs table
CREATE TABLE public.designs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id),
  session_id TEXT,
  prompt TEXT NOT NULL,
  design_type TEXT NOT NULL, -- bridal, arabic, mandala, simple, finger, back_hand
  hand_type TEXT DEFAULT 'back', -- front, back, full
  style_modifiers TEXT[], -- intricate, minimal, floral, geometric
  image_url TEXT,
  image_base64 TEXT,
  is_public BOOLEAN DEFAULT false,
  likes_count INTEGER DEFAULT 0,
  downloads_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Gallery images (curated designs)
CREATE TABLE public.gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  title_hindi TEXT,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL, -- bridal, arabic, mandala, simple, finger, back_hand, festival
  occasion TEXT, -- wedding, diwali, eid, karwa_chauth, rakhi
  tags TEXT[],
  is_featured BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

### 2. sitemap (Dynamic XML Sitemap)
```typescript
// Generate sitemap with all blog posts and gallery categories
// Include lastmod dates and priority scores
```

### 3. track-analytics (Page View Tracking)
```typescript
// Track page views for analytics dashboard
```

---

## 📱 PAGES & COMPONENTS

### Pages:
1. **Homepage (/)** - Hero + AI Generator + Featured Gallery + Blog Preview
2. **AI Generator (/generate)** - Full AI Design Generator Tool
3. **Gallery (/gallery)** - Masonry grid of all designs by category
4. **Gallery Category (/gallery/:category)** - Filtered designs
5. **Design Detail (/design/:id)** - Single design with download
6. **Blog List (/blog)** - All blog posts with pagination
7. **Blog Post (/blog/:slug)** - Full article with SEO
8. **About (/about)** - About AIMehendi + Team
9. **Contact (/contact)** - Contact form
10. **Privacy Policy (/privacy)**
11. **Terms of Service (/terms)**
12. **Disclaimer (/disclaimer)**

### Key Components:
1. **Header** - Logo, Navigation, Theme Toggle
2. **Footer** - Links, Social, Copyright
3. **MehendiGenerator** - Main AI tool with:
   - Hand type selector (Front/Back/Full)
   - Design type dropdown (Bridal, Arabic, Mandala, Simple, Finger)
   - Style modifiers checkboxes (Intricate, Minimal, Floral, Geometric)
   - Custom prompt input (optional)
   - Generate button with loading state
   - Result display with download option
4. **GalleryGrid** - Masonry layout for designs
5. **DesignCard** - Individual design preview
6. **BlogCard** - Blog post preview
7. **CategoryFilter** - Filter tabs for gallery
8. **DownloadButton** - Download design with watermark option
9. **ShareButtons** - Social sharing
10. **AdPlacement** - Google AdSense slots
11. **NewsletterSignup** - Email capture widget

---

## 🔍 SEO REQUIREMENTS

### Meta Tags (Every Page):
- Unique title (max 60 chars) with primary keyword
- Meta description (max 160 chars) with CTA
- Canonical URL
- Open Graph tags (title, description, image, type)
- Twitter Card tags

### JSON-LD Schemas:
1. **WebSite** - Homepage with SearchAction
2. **Organization** - AIMehendi brand info
3. **WebApplication** - AI Generator tool
4. **ImageGallery** - Gallery pages
5. **Article** - Blog posts with author
6. **BreadcrumbList** - All pages
7. **FAQPage** - FAQ section
8. **HowTo** - Tutorial posts

### Technical SEO:
- Sitemap.xml (dynamic from database)
- Robots.txt with proper directives
- Breadcrumbs on all pages
- Internal linking between related content
- Image alt texts in Hindi/Hinglish
- Lazy loading for images
- Core Web Vitals optimization

---

## 📝 INITIAL CONTENT

### Homepage Hero:
```
Title: "AI मेहंदी डिज़ाइन जनरेटर | Free Mehendi Design Maker"
Subtitle: "अपनी पसंद का मेहंदी डिज़ाइन AI से बनाएं - Bridal, Arabic, Mandala और Simple डिज़ाइन्स"
CTA: "✨ फ्री में डिज़ाइन बनाएं"
```

### Gallery Categories:
1. Bridal Mehendi (दुल्हन मेहंदी)
2. Arabic Mehendi (अरेबिक मेहंदी)
3. Mandala Design (मंडला डिज़ाइन)
4. Simple Mehendi (सिंपल मेहंदी)
5. Finger Mehendi (फिंगर मेहंदी)
6. Back Hand Design (बैक हैंड डिज़ाइन)
7. Front Hand Design (फ्रंट हैंड डिज़ाइन)
8. Festival Special (त्योहार स्पेशल)

### Initial Blog Posts (Seed 5):
1. "2026 की Best Bridal Mehendi Designs - AI से बनाएं"
2. "Arabic Mehendi Design कैसे बनाएं - Complete Guide"
3. "Simple Mehendi Design Ideas for Beginners"
4. "Karwa Chauth Special Mehendi Designs 2026"
5. "Finger Mehendi Designs - Latest Trends"

---

## 💰 MONETIZATION SETUP

### Google AdSense Placements:
1. Header banner (728x90)
2. Sidebar rectangle (300x250)
3. In-content ads (between blog paragraphs)
4. Footer banner (728x90)
5. Mobile anchor ad

### Affiliate Integration:
- Amazon India mehendi products
- Mehendi cones and accessories
- Bridal mehendi kits

### Freemium Model:
- 5 free AI generations per day (session-based)
- Premium: Unlimited generations (future feature)

---

## 🔒 SECURITY & PERFORMANCE

### Security:
- Input sanitization for all forms
- Rate limiting on AI generation (5/day free)
- CORS headers on all edge functions
- Content Security Policy headers

### Performance:
- Image optimization with WebP
- Lazy loading for below-fold content
- Code splitting for routes
- Service worker for offline gallery access
- Preconnect to Google Fonts

---

## 📱 RESPONSIVE DESIGN

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly buttons (min 44x44px)
- Swipe gestures for gallery
- Mobile-optimized AI generator interface

---

## 🚀 LAUNCH CHECKLIST

1. ✅ All pages created with proper routing
2. ✅ AI Generator working with Lovable AI
3. ✅ Gallery with category filtering
4. ✅ Blog system with SEO optimization
5. ✅ AdSense integration ready
6. ✅ Analytics tracking setup
7. ✅ Sitemap.xml generating
8. ✅ Robots.txt configured
9. ✅ Social sharing working
10. ✅ Mobile responsive verified
11. ✅ Dark mode support
12. ✅ Performance optimized (Lighthouse 90+)

---

**Domain:** aimehendi.in
**Target KD:** 14-18 (Ultra Low Competition)
**Expected Ranking:** 30-60 days for primary keywords

---

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://aimehendiin.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0252473b-15f1-4af3-b05e-734cfcc4d86e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
