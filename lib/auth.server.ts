import { redirect } from "next/navigation";
import { getRequestContext } from "@cloudflare/next-on-pages";
import {
	validateSession,
	getOptionalSession as getOptionalD1Session,
} from "~/lib/auth/session";
import type { User, Session } from "~/types/auth";

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
