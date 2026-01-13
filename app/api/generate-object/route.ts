import type { NextRequest } from "next/server";
import { jsonSchema } from "ai";
import { generateObject } from "~/lib/.server/llm/generate-object";

export const runtime = "edge";

interface GenerateObjectRequest {
	prompt?: string;
	system?: string;
	messages?: Array<{
		role: "user" | "assistant" | "system";
		content: string;
	}>;
	schema: Record<string, unknown>;
	schemaName?: string;
	schemaDescription?: string;
}

export async function POST(req: NextRequest) {
	const body = (await req.json()) as GenerateObjectRequest;
	const { prompt, system, messages, schema, schemaName, schemaDescription } =
		body;

	const env: Env = {
		SUPABASE_URL: process.env.SUPABASE_URL ?? "",
		SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY ?? "",
		OPENAI_API_KEY: process.env.OPENAI_API_KEY ?? "",
	};

	try {
		const result = await generateObject(env, {
			schema: jsonSchema(schema),
			schemaName,
			schemaDescription,
			...(prompt && { prompt }),
			...(system && { system }),
			...(messages && { messages }),
		});

		return Response.json({
			object: result.object,
			finishReason: result.finishReason,
		});
	} catch (error) {
		console.error(error);
		return new Response("Internal Server Error", { status: 500 });
	}
}
