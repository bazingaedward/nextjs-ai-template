import { type NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { constructWebhookEvent } from "~/lib/stripe.server";
import {
	handleCheckoutSessionCompleted,
	handleInvoicePaymentSucceeded,
	handlePaymentIntentSucceeded,
	handleSubscriptionCreated,
	handleSubscriptionDeleted,
	handleSubscriptionUpdated,
} from "~/lib/.server/stripe/event-handlers";

export async function POST(req: NextRequest) {
	const signature = req.headers.get("stripe-signature");

	if (!signature) {
		return NextResponse.json({ error: "No stripe signature" }, { status: 400 });
	}

	const payload = await req.text();

	// stripe cli test webhook： stripe listen --forward-to localhost:3001/api/stripe/webhook
	const endpointSecret = (process.env.STRIPE_WEBHOOK_SECRET ||
		process.env.STRIPE_CLI_WEBHOOK_SECRET) as string;

	if (!endpointSecret) {
		return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
	}
	let event: Stripe.Event;
	try {
        // Assuming constructWebhookEvent can handle process.env or we pass it
		event = await constructWebhookEvent(
			payload,
			signature,
			endpointSecret,
			process.env as any,
		);
	} catch (err) {
		return NextResponse.json(
			{
				error: `Webhook signature verification failed: ${endpointSecret}`,
			},
			{ status: 400 },
		);
	}

	try {
		switch (event.type) {
			case "checkout.session.completed":
				await handleCheckoutSessionCompleted(event, null);
				break;
			case "payment_intent.succeeded":
				await handlePaymentIntentSucceeded(event, null);
				break;
			case "invoice.payment_succeeded":
				await handleInvoicePaymentSucceeded(event, null);
				break;
			case "customer.subscription.created":
				await handleSubscriptionCreated(event, null);
				break;
			case "customer.subscription.updated":
				await handleSubscriptionUpdated(event, null);
				break;
			case "customer.subscription.deleted":
				await handleSubscriptionDeleted(event, null);
				break;
			default:
				console.log(`Unhandled event type ${event.type}`);
		}

		return NextResponse.json({ received: true });
	} catch (error) {
		console.error("Error processing webhook:", error);
		return NextResponse.json(
			{ error: "Webhook handler failed" },
			{ status: 500 },
		);
	}
}
