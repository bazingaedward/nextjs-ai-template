import { type NextRequest } from "next/server";
import { streamText } from "~/lib/.server/llm/stream-text";
import { stripIndents } from "~/utils/stripIndent";

export const runtime = "edge";

export async function POST(req: NextRequest) {
	const { message } = (await req.json()) as { message: string };

	try {
		const result = await streamText(
			[
				{
					role: "user",
					content: stripIndents`
          I want you to improve the user prompt that is wrapped in \`<original_prompt>\` tags.

          IMPORTANT: Only respond with the improved prompt and nothing else!

          <original_prompt>
            ${message}
          </original_prompt>
        `,
				},
			],
			process.env as any,
		);

		// AI SDK v6 使用 toTextStreamResponse
		return result.toTextStreamResponse({
			headers: {
				"Cache-Control": "no-cache",
			},
		});
	} catch (error) {
		console.error(error);
		return new Response("Internal Server Error", { status: 500 });
	}
}
