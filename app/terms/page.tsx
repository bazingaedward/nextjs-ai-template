"use client";

import Link from "next/link";

export default function TermsOfServicePage() {
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
				<h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
				<p className="text-bolt-elements-textSecondary mb-8">
					Last updated: January 18, 2026
				</p>

				<div className="prose prose-invert max-w-none space-y-8">
					<section>
						<h2 className="text-2xl font-semibold text-white mb-4">
							1. Acceptance of Terms
						</h2>
						<p className="text-bolt-elements-textSecondary leading-relaxed">
							By installing, accessing, or using the Sharkbook AI Form Filler
							Chrome extension and related services ("Service"), you agree to be
							bound by these Terms of Service ("Terms"). If you do not agree to
							these Terms, please do not use our Service.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold text-white mb-4">
							2. Description of Service
						</h2>
						<p className="text-bolt-elements-textSecondary leading-relaxed">
							Sharkbook AI Form Filler is a Chrome browser extension that uses
							artificial intelligence to automatically analyze documents and
							fill web forms. The Service includes the browser extension, web
							dashboard, and any associated APIs or features.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold text-white mb-4">
							3. User Accounts
						</h2>
						<ul className="list-disc list-inside text-bolt-elements-textSecondary space-y-2">
							<li>You must create an account to use certain features</li>
							<li>
								You are responsible for maintaining the security of your account
							</li>
							<li>You must provide accurate and complete information</li>
							<li>You may not share your account credentials with others</li>
							<li>You are responsible for all activities under your account</li>
						</ul>
					</section>

					<section>
						<h2 className="text-2xl font-semibold text-white mb-4">
							4. Subscription and Payment
						</h2>
						<h3 className="text-xl font-medium text-white mb-3">4.1 Plans</h3>
						<p className="text-bolt-elements-textSecondary leading-relaxed mb-4">
							We offer both free and paid subscription plans. Free plans have
							limited features and usage quotas. Paid plans provide additional
							features and higher usage limits.
						</p>

						<h3 className="text-xl font-medium text-white mb-3">4.2 Billing</h3>
						<ul className="list-disc list-inside text-bolt-elements-textSecondary space-y-2">
							<li>
								Paid subscriptions are billed in advance on a monthly or annual
								basis
							</li>
							<li>All payments are processed securely through Stripe</li>
							<li>Prices are subject to change with 30 days notice</li>
							<li>You are responsible for any applicable taxes</li>
						</ul>

						<h3 className="text-xl font-medium text-white mb-3 mt-4">
							4.3 Refunds
						</h3>
						<p className="text-bolt-elements-textSecondary leading-relaxed">
							We offer a 7-day money-back guarantee for new subscriptions. After
							7 days, refunds are provided at our discretion. Contact support
							for refund requests.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold text-white mb-4">
							5. Acceptable Use
						</h2>
						<p className="text-bolt-elements-textSecondary leading-relaxed mb-4">
							You agree not to:
						</p>
						<ul className="list-disc list-inside text-bolt-elements-textSecondary space-y-2">
							<li>Use the Service for any illegal purpose</li>
							<li>Attempt to reverse engineer or decompile the extension</li>
							<li>Interfere with or disrupt the Service</li>
							<li>Circumvent usage limits or access controls</li>
							<li>
								Use the Service to process sensitive data without proper
								authorization
							</li>
							<li>Resell or redistribute the Service without permission</li>
							<li>Upload malicious content or malware</li>
						</ul>
					</section>

					<section>
						<h2 className="text-2xl font-semibold text-white mb-4">
							6. Intellectual Property
						</h2>
						<p className="text-bolt-elements-textSecondary leading-relaxed">
							The Service, including all content, features, and functionality,
							is owned by Sharkbook and is protected by international copyright,
							trademark, and other intellectual property laws. You retain
							ownership of any documents you upload, but grant us a limited
							license to process them for providing the Service.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold text-white mb-4">
							7. AI-Generated Content
						</h2>
						<p className="text-bolt-elements-textSecondary leading-relaxed">
							Our AI-powered form filling is provided "as-is." While we strive
							for accuracy, AI-generated content may contain errors. You are
							responsible for reviewing and verifying all auto-filled
							information before submission. We are not liable for any errors in
							AI-generated content.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold text-white mb-4">
							8. Limitation of Liability
						</h2>
						<p className="text-bolt-elements-textSecondary leading-relaxed">
							TO THE MAXIMUM EXTENT PERMITTED BY LAW, SHARKBOOK SHALL NOT BE
							LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
							PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR OTHER
							INTANGIBLE LOSSES, RESULTING FROM YOUR USE OF THE SERVICE.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold text-white mb-4">
							9. Disclaimer of Warranties
						</h2>
						<p className="text-bolt-elements-textSecondary leading-relaxed">
							THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT
							WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT
							NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR
							A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold text-white mb-4">
							10. Termination
						</h2>
						<p className="text-bolt-elements-textSecondary leading-relaxed">
							We may terminate or suspend your account and access to the Service
							immediately, without prior notice, for any reason, including
							breach of these Terms. Upon termination, your right to use the
							Service will cease immediately. You may cancel your subscription
							at any time through your account settings.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold text-white mb-4">
							11. Changes to Terms
						</h2>
						<p className="text-bolt-elements-textSecondary leading-relaxed">
							We reserve the right to modify these Terms at any time. We will
							notify users of material changes via email or in-app notification.
							Continued use of the Service after changes constitutes acceptance
							of the new Terms.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold text-white mb-4">
							12. Governing Law
						</h2>
						<p className="text-bolt-elements-textSecondary leading-relaxed">
							These Terms shall be governed by and construed in accordance with
							the laws of the jurisdiction in which Sharkbook operates, without
							regard to conflict of law principles.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold text-white mb-4">
							13. Contact Information
						</h2>
						<p className="text-bolt-elements-textSecondary leading-relaxed">
							For questions about these Terms, please contact us at:
						</p>
						<p className="text-bolt-elements-textSecondary mt-4">
							<strong className="text-white">Email:</strong> legal@sharkbook.ai
							<br />
							<strong className="text-white">Website:</strong>{" "}
							<Link href="/" className="text-blue-400 hover:underline">
								https://sharkbook.ai
							</Link>
						</p>
					</section>
				</div>

				{/* Footer Links */}
				<div className="mt-16 pt-8 border-t border-bolt-elements-borderColor">
					<div className="flex gap-6 text-sm text-bolt-elements-textSecondary">
						<Link
							href="/privacy"
							className="hover:text-white transition-colors"
						>
							Privacy Policy
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
