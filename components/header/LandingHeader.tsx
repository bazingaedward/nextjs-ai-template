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

					{/* GitHub Star */}
					<a
						href="https://github.com/bazingaedward/nextjs-ai-template"
						target="_blank"
						rel="noopener noreferrer"
						className="hidden md:inline-flex items-center gap-2 text-bolt-elements-textSecondary hover:text-white transition-colors text-sm font-medium"
					>
						<svg
							className="w-5 h-5"
							fill="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<path
								fillRule="evenodd"
								d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
								clipRule="evenodd"
							/>
						</svg>
						<span>Star on GitHub</span>
						<svg
							className="w-4 h-4 text-yellow-400"
							fill="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
						</svg>
					</a>

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
							<a
								href="https://github.com/bazingaedward/nextjs-ai-template"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-2 text-bolt-elements-textSecondary hover:text-white transition-colors text-sm font-medium py-2"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								<svg
									className="w-5 h-5"
									fill="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path
										fillRule="evenodd"
										d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
										clipRule="evenodd"
									/>
								</svg>
								Star on GitHub ⭐
							</a>
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
