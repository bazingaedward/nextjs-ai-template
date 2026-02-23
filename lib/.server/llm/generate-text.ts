import {
	generateText as _generateText,
	convertToModelMessages,
	type UIMessage,
} from "ai";
import { getGeminiModel } from "~/lib/.server/llm/model";
import { MAX_TOKENS } from "./constants";

export type Messages = UIMessage[];

export type GenerateTextOptions = Omit<
	Parameters<typeof _generateText>[0],
	"model" | "messages" | "system" | "prompt"
>;

export function generateText(
	messages: Messages,
	env: Env,
	options?: GenerateTextOptions,
) {
	const msgs = convertToModelMessages(messages);
	return _generateText({
		model: getGeminiModel(env),
		maxTokens: MAX_TOKENS,
		messages: msgs,
		...options,
	});
}
