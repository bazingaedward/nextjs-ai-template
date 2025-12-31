import { redirect } from "next/navigation";
import { createClient } from "~/lib/supabase.server";

export async function getSupabaseClient(request: Request) {
	const response = new Response();

	// 从环境变量获取 Supabase 配置
    // In Next.js, use process.env
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
/**
 * chat id usage
 * @param args
 * @returns
 */
export async function requireAuth(request: Request) {
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

export async function getOptionalAuth(request: Request) {
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
