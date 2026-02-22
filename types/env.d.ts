declare global {
	namespace NodeJS {
		interface ProcessEnv {
			// Stripe
			STRIPE_SECRET_KEY: string;
			STRIPE_WEBHOOK_SECRET: string;
			STRIPE_CLI_WEBHOOK_SECRET: string;

			// Google OAuth
			GOOGLE_CLIENT_ID: string;
			GOOGLE_CLIENT_SECRET: string;

			// Session
			SESSION_SECRET: string;

			[key: string]: string | undefined;
		}
	}
}

export {};
