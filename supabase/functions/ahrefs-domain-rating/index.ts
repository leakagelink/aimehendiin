import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const apiKey = Deno.env.get('AHREFS_API_KEY')
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'AHREFS_API_KEY not configured' }),
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

    return new Response(JSON.stringify({ target, date, data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (e) {
    return new Response(
      JSON.stringify({ error: (e as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }
})
