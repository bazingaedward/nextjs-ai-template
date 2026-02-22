// Google OAuth + D1 Authentication Types

export interface User {
  id: string;
  google_id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  email_verified: number;
  created_at: string;
  updated_at: string;
}

export interface Session {
  id: string;
  user_id: string;
  expires_at: string;
  created_at: string;
  ip_address: string | null;
  user_agent: string | null;
}

export interface OAuthState {
  state: string;
  code_verifier: string;
  redirect_uri: string | null;
  expires_at: string;
}

export interface GoogleTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token?: string;
  id_token?: string;
}

export interface GoogleUserInfo {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  locale?: string;
}

export interface AuthResult {
  user: User;
  session: Session;
}

export interface SessionValidation {
  valid: boolean;
  user?: User;
  session?: Session;
}
