// OAuth Utilities - PKCE, URL building, token exchange

import {
  GOOGLE_AUTH_URL,
  GOOGLE_TOKEN_URL,
  GOOGLE_USERINFO_URL,
  OAUTH_SCOPES,
} from './constants';
import type { GoogleTokenResponse, GoogleUserInfo } from '~/types/auth';

function base64UrlEncode(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export async function generateCodeVerifier(): Promise<string> {
  const buffer = new Uint8Array(32);
  crypto.getRandomValues(buffer);
  return base64UrlEncode(buffer.buffer);
}

export async function generateCodeChallenge(verifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return base64UrlEncode(hash);
}

export function generateState(): string {
  const buffer = new Uint8Array(32);
  crypto.getRandomValues(buffer);
  return base64UrlEncode(buffer.buffer);
}

export function generateSessionId(): string {
  const buffer = new Uint8Array(32);
  crypto.getRandomValues(buffer);
  return base64UrlEncode(buffer.buffer);
}

export function generateUserId(): string {
  const buffer = new Uint8Array(16);
  crypto.getRandomValues(buffer);
  return base64UrlEncode(buffer.buffer);
}

export async function buildGoogleAuthUrl(
  clientId: string,
  redirectUri: string,
  state: string,
  codeChallenge: string
): Promise<string> {
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: OAUTH_SCOPES.join(' '),
    state: state,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
    access_type: 'offline',
    prompt: 'consent',
  });

  return `${GOOGLE_AUTH_URL}?${params.toString()}`;
}

export async function exchangeCodeForTokens(
  code: string,
  clientId: string,
  clientSecret: string,
  redirectUri: string,
  codeVerifier: string
): Promise<GoogleTokenResponse> {
  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
      code_verifier: codeVerifier,
    }).toString(),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Token exchange failed: ${error}`);
  }

  return response.json();
}

export async function fetchGoogleUserInfo(
  accessToken: string
): Promise<GoogleUserInfo> {
  const response = await fetch(GOOGLE_USERINFO_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to fetch user info: ${error}`);
  }

  return response.json();
}
