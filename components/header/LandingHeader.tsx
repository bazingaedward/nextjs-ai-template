"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import * as Avatar from "@radix-ui/react-avatar";
import { Button } from "~/components/ui/button";

type UserInfo = {
	id: string;
	name: string;
	email: string;
	avatar_url?: string;
};

type SessionResponse = {
	authenticated: boolean;
	user?: {
		id: string;
		email: string;
		name: string | null;
		avatar_url: string | null;
		email_verified: boolean;
	};
};

export function LandingHeader() {
	const router = useRouter();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
	const [loading, setLoading] = useState(true);

	// 获取用户会话信息
	useEffect(() => {
		async function fetchSession() {
			try {
				const response = await fetch("/api/auth/session", {
					credentials: "include",
				});
				const data: SessionResponse = await response.json();

				if (data.authenticated && data.user) {
					setUserInfo({
						id: data.user.id,
						name: data.user.name || data.user.email.split("@")[0],
						email: data.user.email,
						avatar_url: data.user.avatar_url || undefined,
					});
				} else {
					setUserInfo(null);
				}
			} catch (error) {
				console.error("Failed to fetch session:", error);
				setUserInfo(null);
			} finally {
				setLoading(false);
			}
		}

		fetchSession();
	}, []);

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
						{loading ? (
							<div className="w-8 h-8 rounded-full bg-gray-700 animate-pulse" />
						) : userInfo ? (
							<div className="flex items-center gap-3">
								<Avatar.Root className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-600 text-white text-sm font-medium overflow-hidden">
									<Avatar.Image
										className="w-full h-full object-cover"
										src={userInfo.avatar_url}
										alt={userInfo.name}
									/>
									<Avatar.Fallback className="w-full h-full flex items-center justify-center bg-gray-600 text-white text-sm font-medium">
										{userInfo.name.charAt(0).toUpperCase()}
									</Avatar.Fallback>
								</Avatar.Root>
								<span className="text-white text-sm font-medium">
									{userInfo.name}
								</span>
								<Button
									variant="outline"
									size="sm"
									onClick={() => router.push("/logout")}
								>
									Logout
								</Button>
							</div>
						) : (
							<Button variant="ghost" asChild>
								<Link href="/login">Sign In</Link>
							</Button>
						)}
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
								{loading ? (
									<div className="w-8 h-8 rounded-full bg-gray-700 animate-pulse mx-auto" />
								) : userInfo ? (
									<div className="flex items-center gap-3 py-2">
										<Avatar.Root className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-600 text-white text-sm font-medium overflow-hidden">
											<Avatar.Image
												className="w-full h-full object-cover"
												src={userInfo.avatar_url}
												alt={userInfo.name}
											/>
											<Avatar.Fallback className="w-full h-full flex items-center justify-center bg-gray-600 text-white text-sm font-medium">
												{userInfo.name.charAt(0).toUpperCase()}
											</Avatar.Fallback>
										</Avatar.Root>
										<span className="text-white text-sm font-medium">
											{userInfo.name}
										</span>
									</div>
								) : null}
								{userInfo ? (
									<Button
										variant="outline"
										className="w-full"
										onClick={() => router.push("/logout")}
									>
										Logout
									</Button>
								) : (
									<Button variant="outline" className="w-full" asChild>
										<Link href="/login">Sign In</Link>
									</Button>
								)}
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
