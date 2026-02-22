"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";

export function Hero() {
	return (
		<section className="relative overflow-hidden py-20 sm:py-32">
			{/* Background gradient */}
			<div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-transparent" />

			<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center">
					{/* Badge */}
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8">
						<span className="relative flex h-2 w-2">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
							<span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
						</span>
						AI-Powered Chrome Extension
					</div>

					{/* Headline */}
					<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
						Smart Form Auto-Fill
						<br />
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
							Powered by AI
						</span>
					</h1>

					{/* Subheadline */}
					<p className="mt-6 text-lg sm:text-xl text-bolt-elements-textSecondary max-w-2xl mx-auto">
						Upload your documents, let AI analyze and extract information, then
						automatically fill any web form in seconds. Save hours of manual
						data entry.
					</p>

					{/* CTA Buttons */}
					<div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
						<Button
							size="lg"
							className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-8 py-6 text-lg"
							asChild
						>
							<a
								href="https://chromewebstore.google.com/detail/sharkbook-ai-form-filler/ijloipkdgnehaocdpeaflldddlokhpof"
								target="_blank"
								rel="noopener noreferrer"
							>
								<svg
									className="w-6 h-6 mr-2"
									viewBox="0 0 24 24"
									fill="currentColor"
									aria-hidden="true"
								>
									<path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-3.952 6.848a12.014 12.014 0 0 0 9.459-4.652A11.943 11.943 0 0 0 24 12c0-.204-.011-.405-.022-.607z" />
								</svg>
								Add to Chrome - It's Free
							</a>
						</Button>
						<Button
							variant="outline"
							size="lg"
							className="w-full sm:w-auto border-bolt-elements-borderColor hover:bg-bolt-elements-background-depth-2 px-8 py-6 text-lg"
							asChild
						>
							<Link href="/login">Sign In to Dashboard</Link>
						</Button>
					</div>

					{/* Trust indicators */}
					<div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-bolt-elements-textSecondary">
						<div className="flex items-center gap-2">
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
									d="M5 13l4 4L19 7"
								/>
							</svg>
							<span>No credit card required</span>
						</div>
						<div className="flex items-center gap-2">
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
									d="M5 13l4 4L19 7"
								/>
							</svg>
							<span>5,000+ active users</span>
						</div>
						<div className="flex items-center gap-2">
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
									d="M5 13l4 4L19 7"
								/>
							</svg>
							<span>Privacy focused</span>
						</div>
					</div>
				</div>

				{/* TODO: Demo/Screenshot - uncomment when video is ready */}
				{/* <div className="mt-20 relative">
					<div className="relative mx-auto max-w-5xl">
						<div className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 p-2 shadow-2xl">
							<div className="rounded-lg bg-bolt-elements-background-depth-3 aspect-video flex items-center justify-center">
								<div className="text-center p-8">
									<div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
										<svg
											className="w-12 h-12 text-white"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											aria-hidden="true"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
											/>
										</svg>
									</div>
									<p className="text-bolt-elements-textSecondary text-lg">
										Extension Demo Preview
									</p>
									<p className="text-bolt-elements-textTertiary text-sm mt-2">
										Upload a document → AI analyzes → Form auto-fills
									</p>
								</div>
							</div>
						</div>
						<div className="absolute -inset-x-20 -bottom-20 h-40 bg-gradient-to-t from-blue-500/20 to-transparent blur-3xl" />
					</div>
				</div> */}
			</div>
		</section>
	);
}
