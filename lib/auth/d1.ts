// D1 Database Operations for Authentication

import type { User, Session, OAuthState, GoogleUserInfo } from '~/types/auth';
import { generateUserId, generateSessionId } from './oauth';
import { SESSION_DURATION_DAYS, STATE_EXPIRY_MINUTES } from './constants';

// OAuth State Operations

export async function createOAuthState(
  db: D1Database,
  state: string,
  codeVerifier: string,
  redirectUri: string | null
): Promise<void> {
  const expiresAt = new Date(
    Date.now() + STATE_EXPIRY_MINUTES * 60 * 1000
  ).toISOString();

  await db
    .prepare(
      `INSERT INTO oauth_states (state, code_verifier, redirect_uri, expires_at)
       VALUES (?, ?, ?, ?)`
    )
    .bind(state, codeVerifier, redirectUri, expiresAt)
    .run();
}

export async function getAndDeleteOAuthState(
  db: D1Database,
  state: string
): Promise<OAuthState | null> {
  const oauthState = await db
    .prepare(
      `SELECT state, code_verifier, redirect_uri, expires_at
       FROM oauth_states WHERE state = ?`
    )
    .bind(state)
    .first<OAuthState>();

  if (!oauthState) {
    return null;
  }

  // Delete the state after retrieval (single use)
  await db.prepare(`DELETE FROM oauth_states WHERE state = ?`).bind(state).run();

  // Check expiry
  if (new Date(oauthState.expires_at) < new Date()) {
    return null;
  }

  return oauthState;
}

export async function cleanupExpiredStates(db: D1Database): Promise<void> {
  const now = new Date().toISOString();
  await db
    .prepare(`DELETE FROM oauth_states WHERE expires_at < ?`)
    .bind(now)
    .run();
}

// User Operations

export async function findUserByGoogleId(
  db: D1Database,
  googleId: string
): Promise<User | null> {
  return db
    .prepare(
      `SELECT id, google_id, email, name, avatar_url, email_verified, created_at, updated_at
       FROM users WHERE google_id = ?`
    )
    .bind(googleId)
    .first<User>();
}

export async function findUserById(
  db: D1Database,
  userId: string
): Promise<User | null> {
  return db
    .prepare(
      `SELECT id, google_id, email, name, avatar_url, email_verified, created_at, updated_at
       FROM users WHERE id = ?`
    )
    .bind(userId)
    .first<User>();
}

export async function createOrUpdateUser(
  db: D1Database,
  googleUser: GoogleUserInfo
): Promise<User> {
  const existingUser = await findUserByGoogleId(db, googleUser.id);

  if (existingUser) {
    // Update existing user
    const now = new Date().toISOString();
    await db
      .prepare(
        `UPDATE users
         SET email = ?, name = ?, avatar_url = ?, email_verified = ?, updated_at = ?
         WHERE google_id = ?`
      )
      .bind(
        googleUser.email,
        googleUser.name,
        googleUser.picture || null,
        googleUser.verified_email ? 1 : 0,
        now,
        googleUser.id
      )
      .run();

    return {
      ...existingUser,
      email: googleUser.email,
      name: googleUser.name,
      avatar_url: googleUser.picture || null,
      email_verified: googleUser.verified_email ? 1 : 0,
      updated_at: now,
    };
  }

  // Create new user
  const userId = generateUserId();
  const now = new Date().toISOString();

  await db
    .prepare(
      `INSERT INTO users (id, google_id, email, name, avatar_url, email_verified, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      userId,
      googleUser.id,
      googleUser.email,
      googleUser.name,
      googleUser.picture || null,
      googleUser.verified_email ? 1 : 0,
      now,
      now
    )
    .run();

  return {
    id: userId,
    google_id: googleUser.id,
    email: googleUser.email,
    name: googleUser.name,
    avatar_url: googleUser.picture || null,
    email_verified: googleUser.verified_email ? 1 : 0,
    created_at: now,
    updated_at: now,
  };
}

// Session Operations

export async function createSession(
  db: D1Database,
  userId: string,
  ipAddress: string | null,
  userAgent: string | null
): Promise<Session> {
  const sessionId = generateSessionId();
  const now = new Date().toISOString();
  const expiresAt = new Date(
    Date.now() + SESSION_DURATION_DAYS * 24 * 60 * 60 * 1000
  ).toISOString();

  await db
    .prepare(
      `INSERT INTO sessions (id, user_id, expires_at, created_at, ip_address, user_agent)
       VALUES (?, ?, ?, ?, ?, ?)`
    )
    .bind(sessionId, userId, expiresAt, now, ipAddress, userAgent)
    .run();

  return {
    id: sessionId,
    user_id: userId,
    expires_at: expiresAt,
    created_at: now,
    ip_address: ipAddress,
    user_agent: userAgent,
  };
}

export async function findSessionById(
  db: D1Database,
  sessionId: string
): Promise<Session | null> {
  const session = await db
    .prepare(
      `SELECT id, user_id, expires_at, created_at, ip_address, user_agent
       FROM sessions WHERE id = ?`
    )
    .bind(sessionId)
    .first<Session>();

  if (!session) {
    return null;
  }

  // Check if session is expired
  if (new Date(session.expires_at) < new Date()) {
    await deleteSession(db, sessionId);
    return null;
  }

  return session;
}

export async function deleteSession(
  db: D1Database,
  sessionId: string
): Promise<void> {
  await db.prepare(`DELETE FROM sessions WHERE id = ?`).bind(sessionId).run();
}

export async function deleteUserSessions(
  db: D1Database,
  userId: string
): Promise<void> {
  await db.prepare(`DELETE FROM sessions WHERE user_id = ?`).bind(userId).run();
}

export async function cleanupExpiredSessions(db: D1Database): Promise<void> {
  const now = new Date().toISOString();
  await db.prepare(`DELETE FROM sessions WHERE expires_at < ?`).bind(now).run();
}
