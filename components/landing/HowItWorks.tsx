"use client";

const steps = [
	{
		number: "01",
		title: "Install Extension",
		description:
			"Add Sharkbook AI Form Filler to Chrome from the Web Store. It takes just one click.",
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
					d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
				/>
			</svg>
		),
	},
	{
		number: "02",
		title: "Upload Document",
		description:
			"Upload your resume, ID, or any document containing the information you need to fill forms with.",
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
					d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
				/>
			</svg>
		),
	},
	{
		number: "03",
		title: "AI Extracts Data",
		description:
			"Our AI automatically analyzes the document and extracts all relevant information like names, addresses, dates.",
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
					d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
				/>
			</svg>
		),
	},
	{
		number: "04",
		title: "Auto-Fill Forms",
		description:
			"Navigate to any form and click to auto-fill. Review and submit - you're done in seconds!",
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
					d="M5 13l4 4L19 7"
				/>
			</svg>
		),
	},
];

export function HowItWorks() {
	return (
		<section className="py-20 sm:py-32 bg-bolt-elements-background-depth-1">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section header */}
				<div className="text-center mb-16">
					<h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
						How It Works
					</h2>
					<p className="text-lg text-bolt-elements-textSecondary max-w-2xl mx-auto">
						Get started in minutes. Fill forms in seconds.
					</p>
				</div>

				{/* Steps */}
				<div className="relative">
					{/* Connection line */}
					<div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
						{steps.map((step) => (
							<div key={step.number} className="relative group">
								{/* Step card */}
								<div className="bg-bolt-elements-background-depth-2 border border-bolt-elements-borderColor rounded-xl p-6 h-full hover:border-blue-500/50 transition-all hover:-translate-y-1">
									{/* Number badge */}
									<div className="flex items-center justify-between mb-6">
										<span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
											{step.number}
										</span>
										<div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 transition-colors">
											{step.icon}
										</div>
									</div>

									{/* Content */}
									<h3 className="text-xl font-semibold text-white mb-3">
										{step.title}
									</h3>
									<p className="text-bolt-elements-textSecondary">
										{step.description}
									</p>
								</div>

								{/* Arrow for larger screens */}
								{step.number !== "04" && (
									<div className="hidden lg:block absolute top-24 -right-4 z-10">
										<svg
											className="w-8 h-8 text-blue-500/50"
											fill="currentColor"
											viewBox="0 0 24 24"
											aria-hidden="true"
										>
											<path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
										</svg>
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
