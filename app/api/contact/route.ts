import { NextResponse } from 'next/server';
import { z } from 'zod';

export const runtime = 'edge';

const ContactSchema = z.object({
  name: z.string().min(2).max(200),
  email: z.string().email(),
  message: z.string().min(5).max(5000),
});

// Calls Supabase Edge Function securely from server-side
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = ContactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, message } = parsed.data;

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
