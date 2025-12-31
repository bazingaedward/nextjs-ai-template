"use client";
import type { CoreMessage } from "ai";
import React, { type RefCallback } from "react";
import dynamic from "next/dynamic";
import { classNames } from "~/utils/classNames";

const Menu = dynamic(
	() => import("~/components/sidebar/Menu").then((mod) => mod.Menu),
	{ ssr: false },
);
const Workbench = dynamic(
	() =>
		import("~/components/workbench/Workbench").then(
			(mod) => mod.Workbench,
		),
	{ ssr: false },
);
const Messages = dynamic(
	() => import("./Messages").then((mod) => mod.Messages),
	{ ssr: false },
);
const SendButton = dynamic(
	() => import("./SendButton").then((mod) => mod.SendButton),
	{ ssr: false },
);
const ChatTextarea = dynamic(
	() => import("./ChatTextarea").then((mod) => mod.ChatTextarea),
	{ ssr: false },
);

import { $chatStore, updateChatStore } from "~/lib/stores/chat";
import { useStore } from "@nanostores/react";
import { debounce } from "~/utils/debounce";
import { workbenchStore } from "~/lib/stores/workbench";

interface BaseChatProps {
	textareaRef?: React.RefObject<HTMLTextAreaElement> | undefined;
	messageRef?: RefCallback<HTMLDivElement> | undefined;
	scrollRef?: RefCallback<HTMLDivElement> | undefined;
	showChat?: boolean;
	isStreaming?: boolean;
	messages?: CoreMessage[];
	enhancingPrompt?: boolean;
	promptEnhanced?: boolean;
	handleStop?: () => void;
	sendMessage?: (message: { text: string }) => void;
	enhancePrompt?: () => void;
}

const TEXTAREA_MIN_HEIGHT = 76;

export const BaseChat = React.forwardRef<HTMLDivElement, BaseChatProps>(
	(
		{
			textareaRef,
			messageRef,
			scrollRef,
			showChat = true,
			isStreaming = false,
			messages,
			sendMessage,
			handleStop,
		},
		ref,
	) => {
		const chat = useStore($chatStore);
		const chatStarted = chat.started;
		const input = chat.input;
		const TEXTAREA_MAX_HEIGHT = chatStarted ? 400 : 200;

		if (chatStarted) {
			workbenchStore.setShowWorkbench(true);
		}

		const send = debounce(() => {
			sendMessage?.({ text: input });
		});

		const handleInputChange = (
			event: React.ChangeEvent<HTMLTextAreaElement>,
		) => {
			updateChatStore({
				input: event.target.value,
			});
		};

		return (
			<div
				ref={ref}
				className={classNames(
					"relative flex h-full w-full overflow-hidden bg-bolt-elements-background-depth-1 group data-[chat-visible=false]:[--workbench-inner-width:100%] data-[chat-visible=false]:[--workbench-left:0]",
				)}
				data-chat-visible={showChat}
			>
				<Menu />
				<div ref={scrollRef} className="flex overflow-y-auto w-full h-full">
					<div
						className={classNames(
							"flex flex-col flex-grow min-w-[var(--chat-min-width)] h-full opacity-100 transition-all duration-300 ease-in-out group-data-[chat-visible=false]:translate-x-[-50%] group-data-[chat-visible=false]:opacity-0",
						)}
					>
						{!chatStarted && (
							<div id="intro" className="mt-[26vh] max-w-chat mx-auto">
								<h1 className="text-5xl text-center font-bold text-bolt-elements-textPrimary mb-2">
									Where ideas begin
								</h1>
								<p className="mb-4 text-center text-bolt-elements-textSecondary">
									Bring ideas to life in seconds or get help on existing
									projects.
								</p>
							</div>
						)}
						<div
							className={classNames("pt-6 px-6", {
								"h-full flex flex-col": chatStarted,
							})}
						>
							{/* Messages */}
							{chatStarted ? (
								<Messages
									ref={messageRef}
									className="flex flex-col w-full flex-1 max-w-chat px-4 pb-6 mx-auto z-1"
									messages={messages}
									isStreaming={isStreaming}
								/>
							) : null}

							{/* Textarea */}
							<div
								className={classNames(
									"relative w-full max-w-chat mx-auto z-prompt",
									{
										"sticky bottom-0": chatStarted,
									},
								)}
							>
								<div
									className={classNames(
										"shadow-sm border border-bolt-elements-borderColor bg-bolt-elements-prompt-background backdrop-filter backdrop-blur-[8px] rounded-lg overflow-hidden",
									)}
								>
									<ChatTextarea
										textareaRef={textareaRef}
										input={input}
										onInputChange={handleInputChange}
										onSend={send}
										minHeight={TEXTAREA_MIN_HEIGHT}
										maxHeight={TEXTAREA_MAX_HEIGHT}
									/>

									<SendButton
										show={input.length > 0 || isStreaming}
										isStreaming={isStreaming}
										onClick={() => {
											if (isStreaming) {
												handleStop?.();
												return;
											}
											send();
										}}
									/>
									<div className="flex justify-between text-sm p-4 pt-2">
										{input.length > 3 ? (
											<div className="text-xs text-bolt-elements-textTertiary">
												Use <kbd className="kdb">Shift</kbd> +{" "}
												<kbd className="kdb">Return</kbd> for a new line
											</div>
										) : null}
									</div>
								</div>
								<div className="bg-bolt-elements-background-depth-1 pb-6">
									{/* Ghost Element */}
								</div>
							</div>
						</div>
					</div>

					{/* 工作台 */}
					<Workbench chatStarted={chatStarted} isStreaming={isStreaming} />
				</div>
			</div>
		);
	},
);
