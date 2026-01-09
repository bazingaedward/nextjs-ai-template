"use client";

import type { UIMessage } from "ai";

// AI Elements 组件
import {
	Conversation as AIConversation,
	ConversationContent,
	ConversationScrollButton,
} from "~/components/ai-elements/conversation";
import {
	Message,
	MessageContent,
	MessageResponse,
} from "~/components/ai-elements/message";
import { Loader } from "~/components/ai-elements/loader";

interface ConversationProps {
	messages: UIMessage[];
	isLoading: boolean;
}

export function Conversation({ messages, isLoading }: ConversationProps) {
	// 从 UIMessage 提取文本内容的辅助函数
	const getMessageText = (msg: UIMessage) => {
		return msg.parts
			.filter((part) => part.type === "text")
			.map((part) => (part as { text: string }).text)
			.join("");
	};

	return (
		<AIConversation className="flex-1">
			<ConversationContent className="max-w-4xl mx-auto w-full">
				{messages.map((message: UIMessage) => (
					<Message key={message.id} from={message.role}>
						<MessageContent>
							{message.role === "user" ? (
								<div className="whitespace-pre-wrap">
									{getMessageText(message)}
								</div>
							) : (
								<MessageResponse>{getMessageText(message)}</MessageResponse>
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
			<ConversationScrollButton />
		</AIConversation>
	);
}
