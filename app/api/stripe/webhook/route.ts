import { type NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { constructWebhookEvent } from "~/lib/stripe.server";

export const runtime = "edge";

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
		return NextResponse.json(
			{ error: "Webhook secret not configured" },
			{ status: 500 },
		);
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
				// TODO: Handle checkout session completed
				console.log("checkout.session.completed", event.data.object);
				break;
			case "payment_intent.succeeded":
				// TODO: Handle payment intent succeeded
				console.log("payment_intent.succeeded", event.data.object);
				break;
			case "invoice.payment_succeeded":
				// TODO: Handle invoice payment succeeded
				console.log("invoice.payment_succeeded", event.data.object);
				break;
			case "customer.subscription.created":
				// TODO: Handle subscription created
				console.log("customer.subscription.created", event.data.object);
				break;
			case "customer.subscription.updated":
				// TODO: Handle subscription updated
				console.log("customer.subscription.updated", event.data.object);
				break;
			case "customer.subscription.deleted":
				// TODO: Handle subscription deleted
				console.log("customer.subscription.deleted", event.data.object);
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
