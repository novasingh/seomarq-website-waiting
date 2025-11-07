import { NextResponse } from 'next/server';

export const runtime = 'edge';

// Lightweight email validation
function validateEmail(email: any): boolean {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Calls Supabase Edge Function securely from server-side
export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!validateEmail(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const { email } = body;

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !anonKey) {
      return NextResponse.json(
        { error: 'Server not configured: missing Supabase env vars' },
        { status: 500 }
      );
    }

    const edgeFnUrl = `${url}/functions/v1/save_subscription`;

    const resp = await fetch(edgeFnUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${anonKey}`,
      },
      body: JSON.stringify({ email }),
    });

    if (!resp.ok) {
      // Try to forward structured error when possible
      let details: any = undefined;
      try { details = await resp.json(); } catch { details = await resp.text(); }
      return NextResponse.json(
        { error: 'Something went wrong.', details },
        { status: 502 }
      );
    }

    // Forward success response if edge function returns JSON
    let data: any = undefined;
    try { data = await resp.json(); } catch { data = { ok: true }; }

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Unexpected error', details: err?.message ?? 'unknown' },
      { status: 500 }
    );
  }
}
