export function getAPIKey(cloudflareEnv: Env) {
	/**
	 * The `cloudflareEnv` is only used when deployed or when previewing locally.
	 * In development the environment variables are available through `env`.
	 */
	return process.env.OPENAI_API_KEY || cloudflareEnv.OPENAI_API_KEY;
}
