"use client";

import Link from "next/link";

const footerLinks = {
	product: [
		{ name: "Features", href: "/#features" },
		{
			name: "Chrome Extension",
			href: "https://chromewebstore.google.com/detail/sharkbook-ai-form-filler/ijloipkdgnehaocdpeaflldddlokhpof",
		},
	],
	support: [
		{ name: "FAQ", href: "/#faq" },
		{ name: "Contact Us", href: "mailto:support@sharkbook.org" },
	],
	legal: [
		{ name: "Privacy Policy", href: "/privacy" },
		{ name: "Terms of Service", href: "/terms" },
	],
};

export function Footer() {
	return (
		<footer className="bg-bolt-elements-background-depth-1 border-t border-bolt-elements-borderColor">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
					{/* Brand column */}
					<div className="col-span-2 md:col-span-1">
						<Link href="/" className="text-2xl font-bold text-white">
							Sharkbook
						</Link>
						<p className="mt-4 text-sm text-bolt-elements-textSecondary">
							AI-powered smart form auto-fill assistant. Save time, reduce
							errors, fill forms in seconds.
						</p>
					</div>

					{/* Product links */}
					<div>
						<h3 className="text-sm font-semibold text-white uppercase tracking-wider">
							Product
						</h3>
						<ul className="mt-4 space-y-3">
							{footerLinks.product.map((item) => (
								<li key={item.name}>
									<Link
										href={item.href}
										className="text-bolt-elements-textSecondary hover:text-white transition-colors text-sm"
									>
										{item.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Support links */}
					<div>
						<h3 className="text-sm font-semibold text-white uppercase tracking-wider">
							Support
						</h3>
						<ul className="mt-4 space-y-3">
							{footerLinks.support.map((item) => (
								<li key={item.name}>
									<Link
										href={item.href}
										className="text-bolt-elements-textSecondary hover:text-white transition-colors text-sm"
									>
										{item.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Legal links */}
					<div>
						<h3 className="text-sm font-semibold text-white uppercase tracking-wider">
							Legal
						</h3>
						<ul className="mt-4 space-y-3">
							{footerLinks.legal.map((item) => (
								<li key={item.name}>
									<Link
										href={item.href}
										className="text-bolt-elements-textSecondary hover:text-white transition-colors text-sm"
									>
										{item.name}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Bottom bar */}
				<div className="mt-12 pt-8 border-t border-bolt-elements-borderColor">
					<p className="text-center text-sm text-bolt-elements-textSecondary">
						© {new Date().getFullYear()} Sharkbook. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
