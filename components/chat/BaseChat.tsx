"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import dynamic from "next/dynamic";
import type { UIMessage } from "ai";

// AI Elements 组件
import {
	Conversation,
	ConversationContent,
	ConversationEmptyState,
	ConversationScrollButton,
} from "~/components/ai-elements/conversation";
import {
	Message,
	MessageContent,
	MessageResponse,
} from "~/components/ai-elements/message";
import {
	PromptInput,
	PromptInputTextarea,
	PromptInputFooter,
	PromptInputTools,
	PromptInputButton,
	PromptInputSubmit,
	type PromptInputMessage,
} from "~/components/ai-elements/prompt-input";
import { Loader } from "~/components/ai-elements/loader";
import { Sparkles, Paperclip } from "lucide-react";

export function BaseChat() {
	const [input, setInput] = useState("");

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

	// 从 UIMessage 提取文本内容的辅助函数
	const getMessageText = (msg: UIMessage) => {
		return msg.parts
			.filter((part) => part.type === "text")
			.map((part) => (part as { text: string }).text)
			.join("");
	};

	return (
		<div className="flex h-full w-full overflow-hidden bg-background">
			<div className="flex flex-col flex-1 overflow-hidden">
				{/* 对话区域 */}
				<Conversation className="flex-1">
					{messages.length === 0 ? (
						<ConversationEmptyState
							title="Where ideas begin"
							description="Bring ideas to life in seconds or get help on existing projects."
							icon={<Sparkles className="size-8" />}
						/>
					) : (
						<ConversationContent className="max-w-4xl mx-auto w-full">
							{messages.map((message: UIMessage) => (
								<Message key={message.id} from={message.role}>
									<MessageContent>
										{message.role === "user" ? (
											<div className="whitespace-pre-wrap">
												{getMessageText(message)}
											</div>
										) : (
											<MessageResponse>
												{getMessageText(message)}
											</MessageResponse>
										)}
									</MessageContent>
								</Message>
							))}
							{isLoading && messages[messages.length - 1]?.role === "user" && (
								<Message from="assistant">
									<MessageContent>
										<Loader size={20} />
									</MessageContent>
								</Message>
							)}
						</ConversationContent>
					)}
					<ConversationScrollButton />
				</Conversation>

				{/* 输入区域 */}
				<div className="border-t border-border bg-background p-4">
					<div className="max-w-4xl mx-auto">
						<PromptInput
							onSubmit={onSubmit}
							className="rounded-xl border border-border bg-muted/50"
						>
							<PromptInputTextarea
								value={input}
								onChange={(e) => setInput(e.target.value)}
								placeholder="Type your message here..."
								disabled={isLoading}
							/>
							<PromptInputFooter>
								<PromptInputTools>
									<PromptInputButton aria-label="Attach file">
										<Paperclip className="size-4" />
									</PromptInputButton>
								</PromptInputTools>
								{isLoading ? (
									<PromptInputButton
										onClick={stop}
										variant="destructive"
										aria-label="Stop generating"
									>
										Stop
									</PromptInputButton>
								) : (
									<PromptInputSubmit status={status} disabled={!input.trim()} />
								)}
							</PromptInputFooter>
						</PromptInput>
						<div className="mt-2 text-xs text-muted-foreground text-center">
							Press{" "}
							<kbd className="px-1 py-0.5 bg-muted rounded text-xs">Shift</kbd>{" "}
							+{" "}
							<kbd className="px-1 py-0.5 bg-muted rounded text-xs">Enter</kbd>{" "}
							for a new line
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
