import { type NextRequest } from "next/server";
import { createClient } from "~/lib/supabase.server";
import {
	streamText,
	type Messages,
	type StreamingOptions,
} from "~/lib/.server/llm/stream-text";
import { insertTokenUsage } from "~/lib/token-usage.server";
import { MODEL_NAME } from "~/lib/.server/llm/model";

// export const runtime = "edge";

export async function POST(req: NextRequest) {
	const { messages } = (await req.json()) as {
		messages: Messages;
	};

    // In Next.js on Cloudflare, we might need to access bindings via process.env or a specific context helper
    // For now, assuming process.env has the necessary keys or we are running in an environment where env is available.
    // If streamText expects the Cloudflare Env object specifically (with bindings), we might need to retrieve it.
    // But for now, let's cast process.env as any to satisfy the type if it's just looking for keys.
    const env = process.env as any;

	try {
		const options: StreamingOptions = {
			toolChoice: "none",
		};

		const result = await streamText(messages, env, options);

		// 获取当前用户的认证信息
		const response = new Response();
		const supabase = createClient(
			req,
			response,
			env.SUPABASE_URL,
			env.SUPABASE_ANON_KEY,
		);
		const {
			data: { session },
		} = await supabase.auth.getSession();

		// 计算token的使用情况
		result.usage.then(({ inputTokens, outputTokens }) => {
			if (!inputTokens || !outputTokens) return;
			const price = (inputTokens * 0.005 + outputTokens * 0.015) / 1000;

			// 只有在用户已登录的情况下才记录 token 使用情况
			if (session?.user?.id) {
				insertTokenUsage(
					{
						userId: session.user.id,
						modelName: MODEL_NAME,
						inputTokens,
						outputTokens,
						price,
					},
					env.SUPABASE_URL,
                    env.SUPABASE_ANON_KEY,
                    req
				);
			}
		});

		return (result as any).toDataStreamResponse();
	} catch (error) {
		console.error(error);
		return new Response("Internal Server Error", { status: 500 });
	}
}
