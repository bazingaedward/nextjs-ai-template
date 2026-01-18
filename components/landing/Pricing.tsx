"use client";

import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";

const plans = [
	{
		name: "Free",
		price: "$0",
		period: "forever",
		description: "Perfect for trying out the extension",
		features: [
			"10 form fills per month",
			"1 document upload",
			"Basic form detection",
			"Standard support",
		],
		cta: "Get Started",
		variant: "outline" as const,
		popular: false,
	},
	{
		name: "Pro",
		price: "$9",
		period: "per month",
		description: "For power users who fill forms daily",
		features: [
			"Unlimited form fills",
			"Unlimited documents",
			"Advanced AI extraction",
			"Custom field mapping",
			"Form templates",
			"Priority support",
			"Analytics dashboard",
		],
		cta: "Start Free Trial",
		variant: "default" as const,
		popular: true,
	},
	{
		name: "Team",
		price: "$29",
		period: "per month",
		description: "For teams and organizations",
		features: [
			"Everything in Pro",
			"5 team members",
			"Shared templates",
			"Team analytics",
			"Admin controls",
			"API access",
			"Dedicated support",
		],
		cta: "Contact Sales",
		variant: "outline" as const,
		popular: false,
	},
];

export function Pricing() {
	return (
		<section
			id="pricing"
			className="py-20 sm:py-32 bg-bolt-elements-background-depth-2"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section header */}
				<div className="text-center mb-16">
					<h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
						Simple, Transparent Pricing
					</h2>
					<p className="text-lg text-bolt-elements-textSecondary max-w-2xl mx-auto">
						Start for free, upgrade when you need more. No hidden fees.
					</p>
				</div>

				{/* Pricing cards */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
					{plans.map((plan) => (
						<Card
							key={plan.name}
							className={`relative bg-bolt-elements-background-depth-3 border-bolt-elements-borderColor ${
								plan.popular
									? "border-blue-500 ring-2 ring-blue-500/20"
									: "hover:border-bolt-elements-borderColor/80"
							} transition-all`}
						>
							{plan.popular && (
								<div className="absolute -top-4 left-1/2 -translate-x-1/2">
									<span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-medium px-4 py-1 rounded-full">
										Most Popular
									</span>
								</div>
							)}

							<CardHeader className="text-center pt-8">
								<CardTitle className="text-2xl text-white">
									{plan.name}
								</CardTitle>
								<div className="mt-4">
									<span className="text-4xl font-bold text-white">
										{plan.price}
									</span>
									<span className="text-bolt-elements-textSecondary ml-2">
										/{plan.period}
									</span>
								</div>
								<CardDescription className="mt-2">
									{plan.description}
								</CardDescription>
							</CardHeader>

							<CardContent className="pt-4">
								<ul className="space-y-4">
									{plan.features.map((feature) => (
										<li
											key={feature}
											className="flex items-start gap-3 text-bolt-elements-textSecondary"
										>
											<svg
												className="w-5 h-5 text-green-500 shrink-0 mt-0.5"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												aria-hidden="true"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M5 13l4 4L19 7"
												/>
											</svg>
											<span>{feature}</span>
										</li>
									))}
								</ul>
							</CardContent>

							<CardFooter className="pt-4 pb-8">
								<Button
									variant={plan.variant}
									className={`w-full py-6 ${
										plan.popular
											? "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0"
											: "border-bolt-elements-borderColor hover:bg-bolt-elements-background-depth-2"
									}`}
								>
									{plan.cta}
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>

				{/* Money back guarantee */}
				<div className="mt-12 text-center">
					<p className="text-bolt-elements-textSecondary flex items-center justify-center gap-2">
						<svg
							className="w-5 h-5 text-green-500"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
							/>
						</svg>
						7-day money-back guarantee • Cancel anytime
					</p>
				</div>
			</div>
		</section>
	);
}
