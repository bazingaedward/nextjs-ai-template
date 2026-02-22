import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { getOptionalSession } from '~/lib/auth/session';

export const runtime = 'edge';

export async function GET(_request: NextRequest) {
  try {
    const { env } = getRequestContext();
    const db = env.DB;

    if (!db) {
      return NextResponse.json(
        { authenticated: false, error: 'Database not configured' },
        { status: 500 }
      );
    }

    const sessionData = await getOptionalSession(db);

    if (!sessionData) {
      return NextResponse.json({ authenticated: false });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: sessionData.user.id,
        email: sessionData.user.email,
        name: sessionData.user.name,
        avatar_url: sessionData.user.avatar_url,
        email_verified: sessionData.user.email_verified === 1,
      },
    });
  } catch (error) {
    console.error('Session check error:', error);
    return NextResponse.json(
      { authenticated: false, error: 'Session check failed' },
      { status: 500 }
    );
  }
}
