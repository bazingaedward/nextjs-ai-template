"use client";

import { useStore } from "@nanostores/react";
import { $chatStore } from "~/lib/stores/chat";
import { classNames } from "~/utils/classNames";
import { useRouter } from "next/navigation";
import * as Avatar from "@radix-ui/react-avatar";
import { useState, useEffect } from "react";
import { PricingModal } from "~/components/ui/PricingModal";
import { redirectToCheckout } from "~/lib/stripe.client";

export type UserInfo = {
	id: string;
	name: string;
	email: string;
	avatar_url?: string;
};

type SubscriptionInfo = {
	status: string;
	plan: string;
} | null;

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

export function Header() {
	const chat = useStore($chatStore);
	const router = useRouter();
	const [isPricingOpen, setIsPricingOpen] = useState(false);
	const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
	const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionInfo>(null);
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

	const handleSubscribe = async (priceId?: string) => {
		if (!priceId) return;

		try {
			await redirectToCheckout({ priceId });
		} catch (error) {
			console.error("Subscription error:", error);
		}
	};

	return (
		<header
			className={classNames(
				"flex items-center bg-bolt-elements-background-depth-1 p-5 border-b h-[var(--header-height)]",
				{
					"border-transparent": !chat.started,
					"border-bolt-elements-borderColor": chat.started,
				},
			)}
		>
			<div className="flex items-center gap-2 z-logo cursor-pointer justify-between w-full">
				<div className="inline-flex items-center gap-2">
					<div className="i-ph:sidebar-simple-duotone text-xl" />

					<a
						href="/"
						className="text-2xl  text-white font-semibold text-accent flex items-center"
					>
						Sharkbook
					</a>

					<div className="mr-3">
						<div
							onClick={() => setIsPricingOpen(true)}
							className="px-4 py-2  text-white text-sm font-medium cursor-pointer"
						>
							Pricing
						</div>
					</div>
				</div>

				{/* User Info / Login Button */}
				<div className="flex items-center gap-4">
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
							{/* 订阅计划标签 */}
							{subscriptionInfo && (
								<div className="flex items-center">
									<span
										className={`px-2 py-1 text-xs font-medium rounded-full ${
											subscriptionInfo.plan === "pro"
												? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
												: subscriptionInfo.plan === "premium"
													? "bg-gradient-to-r from-amber-400 to-orange-500 text-white"
													: "bg-blue-500 text-white"
										}`}
									>
										{subscriptionInfo.plan === "pro"
											? "PRO"
											: subscriptionInfo.plan === "premium"
												? "PREMIUM"
												: subscriptionInfo.plan.toUpperCase()}
									</span>
								</div>
							)}
							<button
								type="button"
								onClick={() => router.push("/logout")}
								className="px-3 py-1.5 text-xs bg-gray-800 text-white rounded-md hover:bg-gray-700 border border-gray-600 transition-colors font-medium"
								title="Logout"
							>
								Logout
							</button>
						</div>
					) : (
						<button
							type="button"
							onClick={() => router.push("/login")}
							className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 border border-gray-600 transition-colors font-medium"
						>
							Login
						</button>
					)}
				</div>
			</div>

			{chat.started && <div className="mr-1"></div>}

			{/* Pricing Modal */}
			<PricingModal
				isOpen={isPricingOpen}
				onClose={() => setIsPricingOpen(false)}
				onSubscribe={handleSubscribe}
			/>
		</header>
	);
}
