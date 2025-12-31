import dynamic from "next/dynamic";
import { BaseChat } from "~/components/chat/BaseChat";
import { Header } from "~/components/header/Header";

const Chat = dynamic(
	() => import("~/components/chat/Chat.client").then((mod) => mod.Chat),
	{
		ssr: false,
		loading: () => <BaseChat />,
	},
);

export default async function Page() {
	// TODO: Implement auth and subscription fetching using Next.js patterns
	// const { session, supabase } = await getOptionalAuth(args);
	// let subscriptionInfo = null;
	// if (session?.user) {
	//   subscriptionInfo = await getUserSubscriptionById(supabase, session.user.id);
	// }

	return (
		<div className="flex flex-col h-full w-full">
			<Header />
			<Chat />
		</div>
	);
}
