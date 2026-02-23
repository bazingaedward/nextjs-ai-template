export function getAPIKey(cloudflareEnv: Env) {
	/**
	 * The `cloudflareEnv` is only used when deployed or when previewing locally.
	 * In development the environment variables are available through `env`.
	 */
	return process.env.GOOGLE_GENERATIVE_AI_API_KEY || cloudflareEnv.GOOGLE_GENERATIVE_AI_API_KEY;
}
