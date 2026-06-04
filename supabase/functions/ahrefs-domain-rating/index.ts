import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { createClient } from 'npm:@supabase/supabase-js@2'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // 1. Read key from app_settings (admin-managed), fallback to env secret
    let apiKey: string | null = null

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )

    const { data: setting } = await supabase
      .from('app_settings')
      .select('value')
      .eq('key', 'AHREFS_API_KEY')
      .maybeSingle()

    apiKey = setting?.value ?? Deno.env.get('AHREFS_API_KEY') ?? null

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'AHREFS_API_KEY not configured. Set it in /admin or as a secret.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }

    const url = new URL(req.url)
    const target = url.searchParams.get('target') ?? 'aimehendi.in/'
    const date = url.searchParams.get('date') ?? new Date().toISOString().slice(0, 10)

    const apiUrl = `https://api.ahrefs.com/v3/site-explorer/domain-rating?date=${date}&target=${encodeURIComponent(target)}`

    const res = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    })

    const body = await res.text()
    let data: unknown
    try { data = JSON.parse(body) } catch { data = body }

    if (!res.ok) {
      return new Response(
        JSON.stringify({ error: 'Ahrefs API error', status: res.status, details: data }),
        { status: res.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }

    return new Response(JSON.stringify({ target, date, source: setting?.value ? 'app_settings' : 'env', data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (e) {
    return new Response(
      JSON.stringify({ error: (e as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }
})
