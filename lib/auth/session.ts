// Session Management - Cookie handling and validation

import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME, SESSION_DURATION_DAYS, COOKIE_OPTIONS } from './constants';
import { findSessionById, findUserById, deleteSession } from './d1';
import type { User, Session, SessionValidation } from '~/types/auth';

export async function setSessionCookie(sessionId: string): Promise<void> {
  const cookieStore = await cookies();
  const maxAge = SESSION_DURATION_DAYS * 24 * 60 * 60;

  cookieStore.set(SESSION_COOKIE_NAME, sessionId, {
    ...COOKIE_OPTIONS,
    maxAge,
  });
}

export async function getSessionCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE_NAME)?.value || null;
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function validateSession(
  db: D1Database
): Promise<SessionValidation> {
  const sessionId = await getSessionCookie();

  if (!sessionId) {
    return { valid: false };
  }

  const session = await findSessionById(db, sessionId);

  if (!session) {
    await clearSessionCookie();
    return { valid: false };
  }

  const user = await findUserById(db, session.user_id);

  if (!user) {
    await deleteSession(db, sessionId);
    await clearSessionCookie();
    return { valid: false };
  }

  return {
    valid: true,
    user,
    session,
  };
}

export async function requireSession(
  db: D1Database
): Promise<{ user: User; session: Session }> {
  const validation = await validateSession(db);

  if (!validation.valid || !validation.user || !validation.session) {
    throw new Error('Unauthorized');
  }

  return {
    user: validation.user,
    session: validation.session,
  };
}

export async function getOptionalSession(
  db: D1Database
): Promise<{ user: User; session: Session } | null> {
  const validation = await validateSession(db);

  if (!validation.valid || !validation.user || !validation.session) {
    return null;
  }

  return {
    user: validation.user,
    session: validation.session,
  };
}
