import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';
import {
  generateState,
  generateCodeVerifier,
  generateCodeChallenge,
  buildGoogleAuthUrl,
} from '~/lib/auth/oauth';
import { createOAuthState, cleanupExpiredStates } from '~/lib/auth/d1';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const { env } = getRequestContext();
    const db = env.DB;

    if (!db) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    const clientId = env.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID;
    if (!clientId) {
      return NextResponse.json(
        { error: 'Google OAuth not configured' },
        { status: 500 }
      );
    }

    // Get redirect URI from request or use default
    const formData = await request.formData().catch(() => null);
    const redirectAfterLogin = formData?.get('redirect') as string | null;

    // Build callback URL
    const origin = request.headers.get('origin') || new URL(request.url).origin;
    const callbackUri = `${origin}/api/auth/callback`;

    // Generate PKCE values
    const state = generateState();
    const codeVerifier = await generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    // Store OAuth state in D1
    await createOAuthState(db, state, codeVerifier, redirectAfterLogin);

    // Cleanup expired states (non-blocking)
    cleanupExpiredStates(db).catch(console.error);

    // Build Google authorization URL
    const authUrl = await buildGoogleAuthUrl(
      clientId,
      callbackUri,
      state,
      codeChallenge
    );

    // Redirect to Google
    return NextResponse.redirect(authUrl, { status: 302 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate login' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Also support GET for direct navigation
  return POST(request);
}
