import { type NextRequest } from "next/server";
import { streamText } from "~/lib/.server/llm/stream-text";
import { stripIndents } from "~/utils/stripIndent";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

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

		const transformStream = new TransformStream({
			transform(chunk, controller) {
				// 在 AI SDK v5 中，直接处理文本块
				const text = decoder.decode(chunk);
				controller.enqueue(encoder.encode(text));
			},
		});

		const transformedStream = (result as any).toAIStream().pipeThrough(transformStream);

		return new Response(transformedStream, {
			status: 200,
			headers: {
				"Content-Type": "text/plain; charset=utf-8",
				"Cache-Control": "no-cache",
			},
		});
	} catch (error) {
		console.error(error);
		return new Response("Internal Server Error", { status: 500 });
	}
}
