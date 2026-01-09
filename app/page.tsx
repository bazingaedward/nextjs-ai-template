"use client";

// import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { BaseChat } from "~/components/chat";
import { Header } from "~/components/header/Header";

export default function Page() {
	const { theme, resolvedTheme } = useTheme();

	useEffect(() => {
		console.log("Current theme:", theme);
		console.log("Resolved theme:", resolvedTheme);
	}, [theme, resolvedTheme]);

	// TODO: Implement auth and subscription fetching using Next.js patterns
	// const { session, supabase } = await getOptionalAuth(args);
	// let subscriptionInfo = null;
	// if (session?.user) {
	//   subscriptionInfo = await getUserSubscriptionById(supabase, session.user.id);
	// }

	return (
		<div className="flex flex-col h-full w-full">
			<Header />
			<BaseChat />
		</div>
	);
}
