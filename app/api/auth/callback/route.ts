import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';
import {
  exchangeCodeForTokens,
  fetchGoogleUserInfo,
} from '~/lib/auth/oauth';
import {
  getAndDeleteOAuthState,
  createOrUpdateUser,
  createSession,
} from '~/lib/auth/d1';
import { setSessionCookie } from '~/lib/auth/session';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { env } = getRequestContext();
    const db = env.DB;

    if (!db) {
      return redirectWithError(request, 'Database not configured');
    }

    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const error = url.searchParams.get('error');

    // Handle OAuth error
    if (error) {
      console.error('OAuth error:', error);
      return redirectWithError(request, error);
    }

    // Validate required parameters
    if (!code || !state) {
      return redirectWithError(request, 'Missing code or state');
    }

    // Verify state and get code verifier
    const oauthState = await getAndDeleteOAuthState(db, state);
    if (!oauthState) {
      return redirectWithError(request, 'Invalid or expired state');
    }

    // Get credentials
    const clientId = env.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID;
    const clientSecret = env.GOOGLE_CLIENT_SECRET || process.env.GOOGLE_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return redirectWithError(request, 'OAuth not configured');
    }

    // Build callback URI (must match the one used in login)
    const origin = new URL(request.url).origin;
    const callbackUri = `${origin}/api/auth/callback`;

    // Exchange code for tokens
    const tokens = await exchangeCodeForTokens(
      code,
      clientId,
      clientSecret,
      callbackUri,
      oauthState.code_verifier
    );

    // Fetch Google user info
    const googleUser = await fetchGoogleUserInfo(tokens.access_token);

    // Create or update user in D1
    const user = await createOrUpdateUser(db, googleUser);

    // Create session
    const ipAddress =
      request.headers.get('cf-connecting-ip') ||
      request.headers.get('x-forwarded-for') ||
      null;
    const userAgent = request.headers.get('user-agent') || null;

    const session = await createSession(db, user.id, ipAddress, userAgent);

    // Set session cookie
    await setSessionCookie(session.id);

    // Redirect to original destination or home
    const redirectTo = oauthState.redirect_uri || '/';
    return NextResponse.redirect(new URL(redirectTo, origin), { status: 302 });
  } catch (error) {
    console.error('Callback error:', error);
    return redirectWithError(
      request,
      error instanceof Error ? error.message : 'Authentication failed'
    );
  }
}

function redirectWithError(request: NextRequest, error: string): NextResponse {
  const origin = new URL(request.url).origin;
  const loginUrl = new URL('/login', origin);
  loginUrl.searchParams.set('error', error);
  return NextResponse.redirect(loginUrl, { status: 302 });
}
