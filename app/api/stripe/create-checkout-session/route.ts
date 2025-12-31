import { type NextRequest, NextResponse } from "next/server";
import { getOptionalAuth } from "~/lib/auth.server";
import {
	createCheckoutSession,
	createCustomer,
	getCustomerByEmail,
} from "~/lib/stripe.server";

export async function POST(req: NextRequest) {
	try {
		const { session } = await getOptionalAuth(req);

		if (!session?.user) {
			return NextResponse.json({ error: "Authentication required" }, { status: 401 });
		}

		const body = (await req.json()) as { priceId: string };
		const { priceId } = body;

		if (!priceId) {
			return NextResponse.json({ error: "Price ID is required" }, { status: 400 });
		}

		const userEmail = session.user.email;
		const userName =
			session.user.user_metadata?.name || session.user.user_metadata?.full_name;

		if (!userEmail) {
			return NextResponse.json({ error: "User email is required" }, { status: 400 });
		}

		// Check if customer already exists
		let customer = await getCustomerByEmail(userEmail);

		// Create customer if doesn't exist
		if (!customer) {
			customer = await createCustomer(userEmail, userName);
		}

		// Create checkout session
		const checkoutSession = await createCheckoutSession(
			{
				customerId: customer.id,
				customerEmail: userEmail,
				priceId,
				successUrl: `${new URL(req.url).origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
				cancelUrl: `${new URL(req.url).origin}/payment/canceled`,
				userId: session.user.id,
			},
			process.env as any,
		);

		return NextResponse.json({ sessionId: checkoutSession.id, url: checkoutSession.url });
	} catch (error) {
		console.error("Error creating checkout session:", error);
		return NextResponse.json(
			{ error: "Failed to create checkout session" },
			{ status: 500 },
		);
	}
}
