import { redirect } from "next/navigation";
import { getRequestContext } from "@cloudflare/next-on-pages";
import {
	validateSession,
	getOptionalSession as getOptionalD1Session,
} from "~/lib/auth/session";
import type { User, Session } from "~/types/auth";

// Legacy Supabase imports for backward compatibility
import { createClient } from "~/lib/supabase.server";

/**
 * Get D1 database from Cloudflare context
 */
function getD1Database(): D1Database | null {
	try {
		const { env } = getRequestContext();
		return env.DB || null;
	} catch {
		return null;
	}
}

/**
 * Require authentication using D1 session
 * Redirects to /login if not authenticated
 */
export async function requireAuth(): Promise<{
	user: User;
	session: Session;
}> {
	const db = getD1Database();

	if (!db) {
		// Fallback error - D1 not configured
		console.error("D1 database not configured");
		redirect("/login");
	}

	const validation = await validateSession(db);

	if (!validation.valid || !validation.user || !validation.session) {
		redirect("/login");
	}

	return {
		user: validation.user,
		session: validation.session,
	};
}

/**
 * Get optional authentication using D1 session
 * Returns null if not authenticated (does not redirect)
 */
export async function getOptionalAuth(): Promise<{
	user: User;
	session: Session;
} | null> {
	const db = getD1Database();

	if (!db) {
		return null;
	}

	return getOptionalD1Session(db);
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
	const auth = await getOptionalAuth();
	return auth !== null;
}

// ============================================
// Legacy Supabase functions (for backward compatibility)
// ============================================

export async function getSupabaseClient(request: Request) {
	const response = new Response();

	const supabaseUrl = process.env.SUPABASE_URL;
	const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

	if (!supabaseUrl || !supabaseAnonKey) {
		throw new Error("Supabase credentials not configured");
	}

	const supabase = createClient(
		request,
		response,
		supabaseUrl,
		supabaseAnonKey,
	);
	return { supabase, response };
}

export async function requireAuthSupabase(request: Request) {
	const { supabase, response } = await getSupabaseClient(request);

	const {
		data: { session },
		error,
	} = await supabase.auth.getSession();

	if (error || !session) {
		redirect("/login");
	}

	return { session, supabase, response };
}

export async function getOptionalAuthSupabase(request: Request) {
	const response = new Response();

	const supabaseUrl = process.env.SUPABASE_URL;
	const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

	if (!supabaseUrl || !supabaseAnonKey) {
		return { session: null, supabase: null, response };
	}

	const supabase = createClient(
		request,
		response,
		supabaseUrl,
		supabaseAnonKey,
	);
	try {
		const {
			data: { session },
		} = await supabase.auth.getSession();
		return { session, supabase, response };
	} catch (error) {
		console.error("Error fetching session:", error);
		return { session: null, supabase, response };
	}
}
