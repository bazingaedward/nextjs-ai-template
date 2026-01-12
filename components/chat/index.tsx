"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Session } from "@supabase/supabase-js";
import type { PromptInputMessage } from "~/components/ai-elements/prompt-input";
import { useSupabase } from "~/hooks/useSupabase";

import { Conversation } from "./Conversation";
import { PromptInput } from "./PromptInput";

export function BaseChat() {
	const [input, setInput] = useState("");
	const [session, setSession] = useState<Session | null>(null);
	const router = useRouter();

	const { messages, sendMessage, status, stop } = useChat();

	const isLoading = status === "streaming" || status === "submitted";

	const onSubmit = (message: PromptInputMessage) => {
		if (!message.text.trim()) return;

		sendMessage({
			role: "user",
			parts: [{ type: "text", text: message.text }],
		});

		setInput("");
	};

	return (
		<div className="flex h-full w-full overflow-hidden bg-background">
			<div
				className={`flex flex-col flex-1 overflow-hidden ${
					messages.length === 0 ? "justify-center" : ""
				}`}
			>
				{/* 对话区域 */}
				{messages.length > 0 && (
					<Conversation messages={messages} isLoading={isLoading} />
				)}

				{/* 输入区域 */}
				<PromptInput
					input={input}
					setInput={setInput}
					onSubmit={onSubmit}
					isLoading={isLoading}
					stop={stop}
					status={status}
					className={messages.length === 0 ? "" : "border-t border-border"}
				/>
			</div>
		</div>
	);
}
