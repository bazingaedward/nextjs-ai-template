import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { atom } from "nanostores";
import type { UIMessage as Message } from "ai";
import { toast } from "react-toastify";
import {
	getMessages,
	getNextId,
	getUrlId,
	openDatabase,
	setMessages,
} from "./db";

export interface ChatHistoryItem {
	id: string;
	urlId?: string;
	description?: string;
	messages: Message[];
	timestamp: string;
}

const persistenceEnabled = !process.env.NEXT_PUBLIC_DISABLE_PERSISTENCE;

export const db = persistenceEnabled ? await openDatabase() : undefined;

export const chatId = atom<string | undefined>(undefined);
export const description = atom<string | undefined>(undefined);

export function useChatHistory() {
	const router = useRouter();
	const { id: mixedId } = useParams();

	const [initialMessages, setInitialMessages] = useState<Message[]>([]);
	const [ready, setReady] = useState<boolean>(false);
	const [urlId, setUrlId] = useState<string | undefined>();

	useEffect(() => {
		if (!db) {
			setReady(true);

			if (persistenceEnabled) {
				toast.error(`Chat persistence is unavailable`);
			}

			return;
		}

		if (mixedId) {
			getMessages(db, mixedId as string)
				.then((storedMessages) => {
					if (storedMessages && storedMessages.messages.length > 0) {
						setInitialMessages(storedMessages.messages);
						setUrlId(storedMessages.urlId);
						description.set(storedMessages.description);
						chatId.set(storedMessages.id);
					} else {
						router.replace(`/`);
					}

					setReady(true);
				})
				.catch((error) => {
					toast.error(error.message);
				});
		}
	}, []);

	return {
		ready: !mixedId || ready,
		initialMessages,
		storeMessageHistory: async (messages: Message[]) => {
			if (!db || messages.length === 0) {
				return;
			}

			if (initialMessages.length === 0 && !chatId.get()) {
				const nextId = await getNextId(db);

				chatId.set(nextId);

				if (!urlId) {
					navigateChat(nextId);
				}
			}

			await setMessages(
				db,
				chatId.get() as string,
				messages,
				urlId,
				description.get(),
			);
		},
	};
}

function navigateChat(nextId: string) {
	/**
	 * FIXME: Using the intended navigate function causes a rerender for <Chat /> that breaks the app.
	 *
	 * `navigate(`/chat/${nextId}`, { replace: true });`
	 */
	const url = new URL(window.location.href);
	url.pathname = `/chat/${nextId}`;

	window.history.replaceState({}, "", url);
}
