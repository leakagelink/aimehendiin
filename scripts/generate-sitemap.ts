/**
 * Generates public/sitemap.xml and public/image-sitemap.xml.
 *
 * Runs at build time (prebuild/predev) in Node — never in the browser.
 * Data source: the public Cloud (Supabase) REST API using the same
 * publishable/anon key the frontend already ships (`.env`). No service-role
 * key or private credential is used or emitted.
 *
 * lastmod policy: only real, row-level timestamps from the database are
 * emitted. Static routes have no reliable modification source, so their
 * <lastmod> is omitted rather than invented.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const BASE_URL = "https://aimehendi.in";
const MAX_IMAGE_URLS = 5000;

/** Public, indexable static routes (must mirror src/App.tsx). */
const STATIC_ROUTES: { path: string; changefreq?: string; priority?: string }[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/generate", changefreq: "weekly", priority: "0.9" },
  { path: "/gallery", changefreq: "daily", priority: "0.9" },
  { path: "/blog", changefreq: "daily", priority: "0.8" },
  { path: "/bridal-mehendi-design-2026", changefreq: "monthly", priority: "0.8" },
  { path: "/karwa-chauth-mehndi-design", changefreq: "monthly", priority: "0.8" },
  { path: "/about", changefreq: "monthly", priority: "0.5" },
  { path: "/contact", changefreq: "monthly", priority: "0.5" },
  { path: "/privacy-policy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms-of-service", changefreq: "yearly", priority: "0.3" },
];

/** Gallery category slugs (mirrors src/data/galleryCategories.ts). */
const CATEGORY_SLUGS = ["bridal", "arabic", "mandala", "simple", "finger", "festival"];

/** Never indexed: /admin, /auth, /seo-report, 404 route. */

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
}

interface ImageEntry {
  path: string;
  images: { loc: string; title?: string; caption?: string }[];
}

function readEnv(): Record<string, string> {
  const env: Record<string, string> = { ...process.env } as Record<string, string>;
  const envPath = resolve(".env");
  if (existsSync(envPath)) {
    for (const line of readFileSync(envPath, "utf8").split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const idx = trimmed.indexOf("=");
      if (idx === -1) continue;
      const key = trimmed.slice(0, idx).trim();
      const value = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
      if (!env[key]) env[key] = value;
    }
  }
  return env;
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function isoDate(value?: string | null) {
  if (!value) return undefined;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString().slice(0, 10);
}

async function fetchRows<T>(env: Record<string, string>, query: string): Promise<T[]> {
  const url = env.VITE_SUPABASE_URL;
  const key = env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error("Missing VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY");
  const res = await fetch(`${url}/rest/v1/${query}`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  });
  if (!res.ok) throw new Error(`Cloud REST ${res.status} for ${query}`);
  return (await res.json()) as T[];
}

function renderSitemap(entries: SitemapEntry[]) {
  const urls = entries.map((e) =>
    [
      "  <url>",
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      "  </url>",
    ]
      .filter(Boolean)
      .join("\n"),
  );
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    "</urlset>",
    "",
  ].join("\n");
}

function renderImageSitemap(entries: ImageEntry[]) {
  const urls = entries.map((e) =>
    [
      "  <url>",
      `    <loc>${BASE_URL}${e.path}</loc>`,
      ...e.images.map((img) =>
        [
          "    <image:image>",
          `      <image:loc>${escapeXml(img.loc)}</image:loc>`,
          img.title ? `      <image:title>${escapeXml(img.title)}</image:title>` : null,
          img.caption ? `      <image:caption>${escapeXml(img.caption)}</image:caption>` : null,
          "    </image:image>",
        ]
          .filter(Boolean)
          .join("\n"),
      ),
      "  </url>",
    ].join("\n"),
  );
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    ...urls,
    "</urlset>",
    "",
  ].join("\n");
}

/** Only https URLs on the site domain or the public Cloud storage bucket. */
function isPublicImageUrl(url: string, storageOrigin: string) {
  if (!url.startsWith("https://")) return false;
  if (url.includes("lovable.app") || url.includes("localhost")) return false;
  if (url.includes("?")) return false; // signed / expiring URLs
  if (url.startsWith(`${storageOrigin}/storage/v1/object/public/gallery-images/`)) return true;
  return url.startsWith(`${BASE_URL}/`);
}

async function main() {
  const env = readEnv();
  const storageOrigin = (env.VITE_SUPABASE_URL || "").replace(/\/$/, "");

  const posts = await fetchRows<{
    slug: string;
    updated_at: string | null;
    published_at: string | null;
    featured_image: string | null;
    title: string | null;
    excerpt: string | null;
  }>(
    env,
    "blog_posts?select=slug,updated_at,published_at,featured_image,title,excerpt&is_published=eq.true&order=published_at.desc",
  );

  const images = await fetchRows<{
    image_url: string;
    title: string | null;
    description: string | null;
    category: string | null;
  }>(env, "gallery_images?select=image_url,title,description,category&order=created_at.desc");

  // ---- sitemap.xml -------------------------------------------------------
  const entries: SitemapEntry[] = [
    ...STATIC_ROUTES,
    ...CATEGORY_SLUGS.map((slug) => ({
      path: `/gallery/${slug}`,
      changefreq: "weekly",
      priority: "0.8",
    })),
    ...posts
      .filter((p) => !!p.slug)
      .map((p) => ({
        path: `/blog/${p.slug}`,
        lastmod: isoDate(p.updated_at) ?? isoDate(p.published_at),
        changefreq: "monthly",
        priority: "0.7",
      })),
  ];

  const seen = new Set<string>();
  const deduped = entries.filter((e) => (seen.has(e.path) ? false : (seen.add(e.path), true)));
  writeFileSync(resolve("public/sitemap.xml"), renderSitemap(deduped));

  // ---- image-sitemap.xml -------------------------------------------------
  const seenImages = new Set<string>();
  const byPage = new Map<string, ImageEntry["images"]>();

  const push = (path: string, img: ImageEntry["images"][number]) => {
    if (seenImages.size >= MAX_IMAGE_URLS) return;
    if (!isPublicImageUrl(img.loc, storageOrigin)) return;
    const key = `${path}|${img.loc}`;
    if (seenImages.has(key)) return;
    seenImages.add(key);
    const list = byPage.get(path) ?? [];
    list.push(img);
    byPage.set(path, list);
  };

  push("/", {
    loc: `${BASE_URL}/og-image.jpg`,
    title: "AI Mehendi Design Generator - Free मेहंदी Patterns",
    caption:
      "Create beautiful mehendi designs with AI. Free generator for bridal, Arabic, mandala patterns.",
  });
  push("/", {
    loc: `${BASE_URL}/logo.png`,
    title: "AIMehendi.in Logo - AI Mehendi Design Generator",
    caption: "Official logo of AIMehendi.in - AI powered mehendi design platform.",
  });

  for (const img of images) {
    const category = (img.category || "").toLowerCase();
    const entry = {
      loc: img.image_url,
      title: img.title || `${category} mehendi design`,
      caption: img.description || `${img.title || "Mehendi design"} - AI generated mehendi pattern`,
    };
    push("/gallery", entry);
    if (CATEGORY_SLUGS.includes(category)) push(`/gallery/${category}`, entry);
  }

  for (const post of posts) {
    if (!post.featured_image) continue;
    push(`/blog/${post.slug}`, {
      loc: post.featured_image,
      title: post.title || undefined,
      caption: post.excerpt || undefined,
    });
  }

  const imageEntries: ImageEntry[] = [...byPage.entries()].map(([path, imgs]) => ({ path, images: imgs }));
  writeFileSync(resolve("public/image-sitemap.xml"), renderImageSitemap(imageEntries));

  console.log(
    `sitemap.xml written (${deduped.length} urls, ${posts.length} blog posts) | image-sitemap.xml written (${seenImages.size} images across ${imageEntries.length} pages)`,
  );
}

main().catch((err) => {
  // Never break the production build: keep the previously committed sitemaps.
  console.warn(`[generate-sitemap] skipped: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(0);
});
