// OAuth and Session Constants

export const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
export const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
export const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';

export const OAUTH_SCOPES = ['openid', 'email', 'profile'];

export const SESSION_COOKIE_NAME = 'auth_session';
export const SESSION_DURATION_DAYS = 30;
export const STATE_EXPIRY_MINUTES = 10;

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
};
