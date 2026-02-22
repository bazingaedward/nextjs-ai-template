"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "~/components/ui/button";

export function LandingHeader() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const navLinks = [
		{ name: "Features", href: "/#features" },
		{ name: "Pricing", href: "/#pricing" },
	];

	return (
		<header className="sticky top-0 z-50 bg-bolt-elements-background-depth-1/80 backdrop-blur-lg border-b border-bolt-elements-borderColor">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					{/* Logo */}
					<Link
						href="/"
						className="text-2xl font-bold text-white flex items-center gap-2"
					>
						<img
							src="/favicon.png"
							alt="Sharkbook"
							className="w-8 h-8 rounded-lg"
						/>
						Sharkbook
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center gap-8">
						{navLinks.map((link) => (
							<Link
								key={link.name}
								href={link.href}
								className="text-bolt-elements-textSecondary hover:text-white transition-colors text-sm font-medium"
							>
								{link.name}
							</Link>
						))}
					</nav>

					{/* Desktop CTA */}
					<div className="hidden md:flex items-center gap-4">
						<Button variant="ghost" asChild>
							<Link href="/login">Sign In</Link>
						</Button>
						<Button
							className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
							asChild
						>
							<a
								href="https://chromewebstore.google.com/detail/sharkbook-ai-form-filler/ijloipkdgnehaocdpeaflldddlokhpof"
								target="_blank"
								rel="noopener noreferrer"
							>
								Get Extension
							</a>
						</Button>
					</div>

					{/* Mobile menu button */}
					<button
						type="button"
						className="md:hidden p-2 text-bolt-elements-textSecondary hover:text-white"
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					>
						{isMobileMenuOpen ? (
							<svg
								className="w-6 h-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						) : (
							<svg
								className="w-6 h-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						)}
					</button>
				</div>

				{/* Mobile menu */}
				{isMobileMenuOpen && (
					<div className="md:hidden py-4 border-t border-bolt-elements-borderColor">
						<nav className="flex flex-col gap-4">
							{navLinks.map((link) => (
								<Link
									key={link.name}
									href={link.href}
									className="text-bolt-elements-textSecondary hover:text-white transition-colors text-sm font-medium py-2"
									onClick={() => setIsMobileMenuOpen(false)}
								>
									{link.name}
								</Link>
							))}
							<div className="flex flex-col gap-3 pt-4 border-t border-bolt-elements-borderColor">
								<Button variant="outline" className="w-full" asChild>
									<Link href="/login">Sign In</Link>
								</Button>
								<Button
									className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
									asChild
								>
									<a
										href="https://chromewebstore.google.com/detail/sharkbook-ai-form-filler/ijloipkdgnehaocdpeaflldddlokhpof"
										target="_blank"
										rel="noopener noreferrer"
									>
										Get Extension
									</a>
								</Button>
							</div>
						</nav>
					</div>
				)}
			</div>
		</header>
	);
}
