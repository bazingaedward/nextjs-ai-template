import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { getAPIKey } from "./api-key";

export const MODEL_NAME = "gemini-3-flash-preview";

export function getGeminiModel(env: Env) {
	const google = createGoogleGenerativeAI({
		apiKey: getAPIKey(env),
	});

	return google(MODEL_NAME);
}
