import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const revalidate = 3600; // Cache for 1 hour

// Lightweight validation
function validateContactForm(data: any): { valid: boolean; error?: string } {
  if (!data.name || typeof data.name !== 'string' || data.name.length < 2 || data.name.length > 200) {
    return { valid: false, error: 'Name must be between 2-200 characters' };
  }
  if (!data.email || typeof data.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { valid: false, error: 'Invalid email address' };
  }
  if (!data.message || typeof data.message !== 'string' || data.message.length < 5 || data.message.length > 5000) {
    return { valid: false, error: 'Message must be between 5-5000 characters' };
  }
  return { valid: true };
}

// Calls Supabase Edge Function securely from server-side
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = validateContactForm(body);
    
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    const { name, email, message } = body;

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !anonKey) {
      return NextResponse.json(
        { error: 'Server not configured: missing Supabase env vars' },
        { status: 500 }
      );
    }

    const edgeFnUrl = `${url}/functions/v1/contact_api`;

    const resp = await fetch(edgeFnUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${anonKey}`,
      },
      body: JSON.stringify({ name, email, message }),
      // Edge runtime prefers short timeouts; relying on platform defaults
    });

    if (!resp.ok) {
      const text = await resp.text();
      return NextResponse.json(
        { error: 'Something went wrong.', details: text },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Unexpected error', details: err?.message ?? 'unknown' },
      { status: 500 }
    );
  }
}
