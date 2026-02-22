import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { getSessionCookie, clearSessionCookie } from '~/lib/auth/session';
import { deleteSession } from '~/lib/auth/d1';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const { env } = getRequestContext();
    const db = env.DB;

    // Get current session
    const sessionId = await getSessionCookie();

    // Delete session from D1 if exists
    if (sessionId && db) {
      await deleteSession(db, sessionId).catch(console.error);
    }

    // Clear session cookie
    await clearSessionCookie();

    // Redirect to home or specified URL
    const formData = await request.formData().catch(() => null);
    const redirectTo = (formData?.get('redirect') as string) || '/';
    const origin = new URL(request.url).origin;

    return NextResponse.redirect(new URL(redirectTo, origin), { status: 302 });
  } catch (error) {
    console.error('Logout error:', error);
    // Still clear cookie even on error
    await clearSessionCookie();
    return NextResponse.redirect(new URL('/', request.url), { status: 302 });
  }
}

export async function GET(request: NextRequest) {
  // Also support GET for direct navigation
  return POST(request);
}
