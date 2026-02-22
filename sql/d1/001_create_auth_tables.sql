-- Google OAuth + D1 Authentication Tables
-- Run with: wrangler d1 execute nextjs-auth-db --file=./sql/d1/001_create_auth_tables.sql

-- 用户表
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    google_id TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    avatar_url TEXT,
    email_verified INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);

-- 会话表
CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expires_at TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    ip_address TEXT,
    user_agent TEXT
);

-- OAuth状态表（CSRF保护）
CREATE TABLE IF NOT EXISTS oauth_states (
    state TEXT PRIMARY KEY,
    code_verifier TEXT NOT NULL,
    redirect_uri TEXT,
    expires_at TEXT NOT NULL
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);
