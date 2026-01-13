import {
	generateObject as _generateObject,
	type CoreMessage,
	type Schema,
} from "ai";
import { getOpenAIModel } from "~/lib/.server/llm/model";

export type GenerateObjectOptions<T> = Omit<
	Parameters<typeof _generateObject<T>>[0],
	"model" | "messages" | "system" | "prompt"
> & {
	schema: Schema<T>;
	messages?: CoreMessage[];
	prompt?: string;
	system?: string;
};

export function generateObject<T>(env: Env, options: GenerateObjectOptions<T>) {
	return _generateObject<T>({
		model: getOpenAIModel(env),
		...options,
	});
}
