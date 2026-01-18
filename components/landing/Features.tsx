"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";

const features = [
	{
		icon: (
			<svg
				className="w-8 h-8"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				aria-hidden="true"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
				/>
			</svg>
		),
		title: "AI Document Analysis",
		description:
			"Upload PDFs, images, or documents. Our AI extracts names, addresses, dates, and all relevant information automatically.",
		gradient: "from-blue-500 to-cyan-500",
	},
	{
		icon: (
			<svg
				className="w-8 h-8"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				aria-hidden="true"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M13 10V3L4 14h7v7l9-11h-7z"
				/>
			</svg>
		),
		title: "One-Click Auto-Fill",
		description:
			"Click to instantly fill any web form. Works on job applications, registrations, checkout pages, and more.",
		gradient: "from-purple-500 to-pink-500",
	},
	{
		icon: (
			<svg
				className="w-8 h-8"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				aria-hidden="true"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
				/>
			</svg>
		),
		title: "Smart Form Templates",
		description:
			"Save and reuse form configurations. Create templates for different form types and apply them instantly.",
		gradient: "from-orange-500 to-red-500",
	},
	{
		icon: (
			<svg
				className="w-8 h-8"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				aria-hidden="true"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
				/>
			</svg>
		),
		title: "Privacy First",
		description:
			"Your data stays secure. Documents are processed locally when possible, with encrypted cloud processing.",
		gradient: "from-green-500 to-emerald-500",
	},
	{
		icon: (
			<svg
				className="w-8 h-8"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				aria-hidden="true"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
				/>
			</svg>
		),
		title: "Analytics Dashboard",
		description:
			"Track your form-filling activity. See time saved, forms completed, and usage statistics in one place.",
		gradient: "from-indigo-500 to-blue-500",
	},
	{
		icon: (
			<svg
				className="w-8 h-8"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				aria-hidden="true"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
				/>
			</svg>
		),
		title: "Custom Field Mapping",
		description:
			"Define how extracted data maps to form fields. Full control over what goes where.",
		gradient: "from-teal-500 to-cyan-500",
	},
];

export function Features() {
	return (
		<section className="py-20 sm:py-32 bg-bolt-elements-background-depth-2">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section header */}
				<div className="text-center mb-16">
					<h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
						Everything You Need to Fill Forms Faster
					</h2>
					<p className="text-lg text-bolt-elements-textSecondary max-w-2xl mx-auto">
						Powerful AI features designed to save you time and eliminate tedious
						manual data entry.
					</p>
				</div>

				{/* Features grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{features.map((feature) => (
						<Card
							key={feature.title}
							className="bg-bolt-elements-background-depth-3 border-bolt-elements-borderColor hover:border-blue-500/50 transition-colors group"
						>
							<CardHeader>
								<div
									className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}
								>
									{feature.icon}
								</div>
								<CardTitle className="text-xl text-white">
									{feature.title}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription className="text-bolt-elements-textSecondary text-base">
									{feature.description}
								</CardDescription>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
