import {
	streamText as _streamText,
	convertToModelMessages,
	type UIMessage,
} from "ai";
import { getOpenAIModel } from "~/lib/.server/llm/model";
import { MAX_TOKENS } from "./constants";
import { getSystemPrompt } from "./prompts";

export type Messages = UIMessage[];

export type StreamingOptions = Omit<
	Parameters<typeof _streamText>[0],
	"model" | "messages" | "system" | "prompt"
>;

export function streamText(
	messages: Messages,
	env: Env,
	options?: StreamingOptions,
) {
	const msgs = convertToModelMessages(messages);
	return _streamText({
		model: getOpenAIModel(env),
		// system: getSystemPrompt(),
		maxOutputTokens: MAX_TOKENS,
		messages: msgs,
		...options,
	});
}
