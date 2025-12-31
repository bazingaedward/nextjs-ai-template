import { BaseChat } from "~/components/chat/BaseChat";
import { Header } from "~/components/header/Header";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // TODO: Implement auth check

  return (
    <div className="flex flex-col h-full w-full">
      <Header />
      <BaseChat />
    </div>
  );
}
