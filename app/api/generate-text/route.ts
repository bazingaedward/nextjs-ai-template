import type { NextRequest } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
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

	const { env } = getRequestContext();

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
