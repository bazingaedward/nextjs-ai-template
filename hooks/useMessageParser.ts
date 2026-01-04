import type { UIMessage as Message } from "ai";
import { useCallback, useState } from "react";
import { StreamingMessageParser } from "~/lib/runtime/message-parser";
import { createScopedLogger } from "~/utils/logger";

const logger = createScopedLogger("useMessageParser");

const messageParser = new StreamingMessageParser({
	callbacks: {
		onArtifactOpen: (data) => {
			logger.trace("onArtifactOpen", data);
		},
		onArtifactClose: (data) => {
			logger.trace("onArtifactClose");
		},
		onActionOpen: (data) => {
			logger.trace("onActionOpen", data.action);
		},
		onActionClose: (data) => {
			logger.trace("onActionClose", data.action);
		},
	},
});

export function useMessageParser() {
	const [parsedMessages, setParsedMessages] = useState<{
		[key: number]: string;
	}>({});

	const parseMessages = useCallback(
		(messages: Message[], isLoading: boolean) => {
			let reset = false;

			if (process.env.NODE_ENV === "development" && !isLoading) {
				reset = true;
				messageParser.reset();
			}

			for (const [index, message] of messages.entries()) {
				if (message.role === "assistant") {
					const newParsedContent = messageParser.parse(
						message.id,
						message.content,
					);

					setParsedMessages((prevParsed) => ({
						...prevParsed,
						[index]: !reset
							? (prevParsed[index] || "") + newParsedContent
							: newParsedContent,
					}));
				}
			}
		},
		[],
	);

	return { parsedMessages, parseMessages };
}
