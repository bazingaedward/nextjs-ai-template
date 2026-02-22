"use client";

import Link from "next/link";

export default function PrivacyPolicyPage() {
	return (
		<div className="min-h-screen bg-bolt-elements-background-depth-1">
			{/* Header */}
			<header className="border-b border-bolt-elements-borderColor">
				<div className="max-w-4xl mx-auto px-4 py-6">
					<Link
						href="/"
						className="text-2xl font-semibold text-white hover:text-blue-400 transition-colors"
					>
						← Sharkbook
					</Link>
				</div>
			</header>

			{/* Content */}
			<main className="max-w-4xl mx-auto px-4 py-12">
				<h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
				<p className="text-bolt-elements-textSecondary mb-8">
					Last updated: January 18, 2026
				</p>

				<div className="prose prose-invert max-w-none space-y-8">
					<section>
						<h2 className="text-2xl font-semibold text-white mb-4">
							1. Introduction
						</h2>
						<p className="text-bolt-elements-textSecondary leading-relaxed">
							Welcome to Sharkbook AI Form Filler ("we," "our," or "us"). We are
							committed to protecting your privacy and ensuring the security of
							your personal information. This Privacy Policy explains how we
							collect, use, disclose, and safeguard your information when you
							use our Chrome extension and related services.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold text-white mb-4">
							2. Information We Collect
						</h2>
						<h3 className="text-xl font-medium text-white mb-3">
							2.1 Information You Provide
						</h3>
						<ul className="list-disc list-inside text-bolt-elements-textSecondary space-y-2">
							<li>Account registration information (email, name)</li>
							<li>Form configurations and templates you create</li>
							<li>Documents you upload for form auto-filling</li>
							<li>Payment information (processed securely via Stripe)</li>
						</ul>

						<h3 className="text-xl font-medium text-white mb-3 mt-6">
							2.2 Automatically Collected Information
						</h3>
						<ul className="list-disc list-inside text-bolt-elements-textSecondary space-y-2">
							<li>Usage data and analytics</li>
							<li>Browser type and version</li>
							<li>Device information</li>
							<li>IP address (anonymized)</li>
						</ul>
					</section>

					<section>
						<h2 className="text-2xl font-semibold text-white mb-4">
							3. How We Use Your Information
						</h2>
						<p className="text-bolt-elements-textSecondary leading-relaxed mb-4">
							We use the collected information for the following purposes:
						</p>
						<ul className="list-disc list-inside text-bolt-elements-textSecondary space-y-2">
							<li>
								To provide and maintain the AI form auto-filling functionality
							</li>
							<li>To process your form configurations and templates</li>
							<li>To improve our AI models and service quality</li>
							<li>To communicate with you about updates and support</li>
							<li>To process payments and manage subscriptions</li>
							<li>To comply with legal obligations</li>
						</ul>
					</section>

					<section>
						<h2 className="text-2xl font-semibold text-white mb-4">
							4. Data Storage and Security
						</h2>
						<p className="text-bolt-elements-textSecondary leading-relaxed">
							We implement industry-standard security measures to protect your
							data. Your information is stored on secure servers with
							encryption. We use Supabase for authentication and data storage,
							which provides enterprise-grade security. Uploaded documents are
							processed temporarily and are not stored permanently unless you
							explicitly save them.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold text-white mb-4">
							5. AI Processing
						</h2>
						<p className="text-bolt-elements-textSecondary leading-relaxed">
							Our extension uses AI technology to analyze documents and
							auto-fill forms. Document content is processed through our AI
							systems to extract relevant information. We do not use your
							personal documents to train our AI models without explicit
							consent. AI processing is performed securely with data encryption
							in transit.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold text-white mb-4">
							6. Third-Party Services
						</h2>
						<p className="text-bolt-elements-textSecondary leading-relaxed mb-4">
							We work with trusted third-party services:
						</p>
						<ul className="list-disc list-inside text-bolt-elements-textSecondary space-y-2">
							<li>
								<strong>OpenAI</strong> - For AI-powered form analysis
							</li>
							<li>
								<strong>Stripe</strong> - For secure payment processing
							</li>
							<li>
								<strong>Supabase</strong> - For authentication and data storage
							</li>
							<li>
								<strong>Google Analytics</strong> - For usage analytics
								(anonymized)
							</li>
						</ul>
					</section>

					<section>
						<h2 className="text-2xl font-semibold text-white mb-4">
							7. Your Rights
						</h2>
						<p className="text-bolt-elements-textSecondary leading-relaxed mb-4">
							You have the following rights regarding your data:
						</p>
						<ul className="list-disc list-inside text-bolt-elements-textSecondary space-y-2">
							<li>Access your personal data</li>
							<li>Request correction of inaccurate data</li>
							<li>Request deletion of your data</li>
							<li>Export your data in a portable format</li>
							<li>Opt-out of marketing communications</li>
							<li>Withdraw consent at any time</li>
						</ul>
					</section>

					<section>
						<h2 className="text-2xl font-semibold text-white mb-4">
							8. Cookies and Tracking
						</h2>
						<p className="text-bolt-elements-textSecondary leading-relaxed">
							We use essential cookies to maintain your session and preferences.
							Analytics cookies help us understand how you use our service. You
							can manage cookie preferences through your browser settings.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold text-white mb-4">
							9. Children's Privacy
						</h2>
						<p className="text-bolt-elements-textSecondary leading-relaxed">
							Our service is not intended for children under 13 years of age. We
							do not knowingly collect personal information from children under
							13.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold text-white mb-4">
							10. Changes to This Policy
						</h2>
						<p className="text-bolt-elements-textSecondary leading-relaxed">
							We may update this Privacy Policy from time to time. We will
							notify you of any changes by posting the new Privacy Policy on
							this page and updating the "Last updated" date.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold text-white mb-4">
							11. Contact Us
						</h2>
						<p className="text-bolt-elements-textSecondary leading-relaxed">
							If you have any questions about this Privacy Policy, please
							contact us at:
						</p>
						<p className="text-bolt-elements-textSecondary mt-4">
							<strong className="text-white">Email:</strong>{" "}
							privacy@sharkbook.org
							<br />
							<strong className="text-white">Website:</strong>{" "}
							<Link href="/" className="text-blue-400 hover:underline">
								https://sharkbook.org
							</Link>
						</p>
					</section>
				</div>

				{/* Footer Links */}
				<div className="mt-16 pt-8 border-t border-bolt-elements-borderColor">
					<div className="flex gap-6 text-sm text-bolt-elements-textSecondary">
						<Link href="/terms" className="hover:text-white transition-colors">
							Terms of Service
						</Link>
						<Link href="/" className="hover:text-white transition-colors">
							Back to Home
						</Link>
					</div>
				</div>
			</main>
		</div>
	);
}
