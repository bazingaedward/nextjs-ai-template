import type { NextRequest } from "next/server";
import {
	generateText,
	type Messages,
	type GenerateTextOptions,
} from "~/lib/.server/llm/generate-text";

export const runtime = "edge";

export async function POST(req: NextRequest) {
	const { messages } = (await req.json()) as {
		messages: Messages;
	};

	const env: Env = {
		SUPABASE_URL: process.env.SUPABASE_URL ?? "",
		SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY ?? "",
		OPENAI_API_KEY: process.env.OPENAI_API_KEY ?? "",
	};

	try {
		const options: GenerateTextOptions = {
			toolChoice: "none",
		};

		const result = await generateText(messages, env, options);

		return Response.json({
			text: result.text,
			finishReason: result.finishReason,
		});
	} catch (error) {
		console.error(error);
		return new Response("Internal Server Error", { status: 500 });
	}
}
