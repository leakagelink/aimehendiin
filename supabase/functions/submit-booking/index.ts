import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

const clean = (v: unknown, max: number): string | null => {
  const s = str(v);
  if (!s) return null;
  return s.slice(0, max);
};

async function hashIp(ip: string) {
  const data = new TextEncoder().encode(`booking:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  try {
    const body = await req.json().catch(() => ({}));

    // Honeypot: bots fill hidden fields.
    if (str(body.company)) return json({ ok: true });

    const name = str(body.name);
    const phone = str(body.phone);

    if (name.length < 2 || name.length > 80) {
      return json({ error: "नाम सही से भरें (2-80 characters)।" }, 400);
    }
    if (!/^[+\d][\d\s\-()]{5,19}$/.test(phone)) {
      return json({ error: "Phone number सही से भरें।" }, 400);
    }

    const eventDate = str(body.event_date);
    if (eventDate && !/^\d{4}-\d{2}-\d{2}$/.test(eventDate)) {
      return json({ error: "Event date invalid है।" }, 400);
    }

    const designImageUrl = str(body.design_image_url);
    const safeImageUrl =
      designImageUrl.startsWith("https://") && designImageUrl.length <= 2048
        ? designImageUrl
        : null;

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false } },
    );

    // Rate limit: max 3 submissions per IP per hour.
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("cf-connecting-ip") ||
      "unknown";
    const ipHash = await hashIp(ip);
    const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();

    const { count } = await supabase
      .from("booking_submission_log")
      .select("id", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("created_at", since);

    if ((count ?? 0) >= 3) {
      return json(
        { error: "बहुत सारी requests भेजी गई हैं। कृपया थोड़ी देर बाद try करें।" },
        429,
      );
    }

    const { error } = await supabase.from("design_bookings").insert({
      name: name.slice(0, 80),
      phone: phone.slice(0, 20),
      city: clean(body.city, 80),
      occasion: clean(body.occasion, 60),
      event_date: eventDate || null,
      style: clean(body.style, 40),
      message: clean(body.message, 1000),
      design_image_url: safeImageUrl,
      source: clean(body.source, 40) ?? "try-on",
      status: "new",
    });

    if (error) {
      console.error("booking insert failed", error.message);
      return json({ error: "Request भेजी नहीं जा सकी।" }, 500);
    }

    await supabase.from("booking_submission_log").insert({ ip_hash: ipHash });

    return json({ ok: true });
  } catch (e) {
    console.error("submit-booking error", e instanceof Error ? e.message : e);
    return json({ error: "Request भेजी नहीं जा सकी।" }, 500);
  }
});
