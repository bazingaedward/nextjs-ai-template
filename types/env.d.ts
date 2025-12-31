declare global {
	namespace NodeJS {
		interface ProcessEnv {
			STRIPE_SECRET_KEY: string;
			STRIPE_WEBHOOK_SECRET: string;
			STRIPE_CLI_WEBHOOK_SECRET: string;
			SUPABASE_URL: string;
			SUPABASE_ANON_KEY: string;
			SUPABASE_SERVICE_ROLE_KEY: string;
            [key: string]: string | undefined;
		}
	}
}

export {};
