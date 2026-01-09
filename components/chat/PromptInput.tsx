"use client";

import { Paperclip } from "lucide-react";
import {
	PromptInput as AIPromptInput,
	PromptInputTextarea,
	PromptInputFooter,
	PromptInputTools,
	PromptInputButton,
	PromptInputSubmit,
	type PromptInputMessage,
} from "~/components/ai-elements/prompt-input";
import { cn } from "~/lib/utils";

interface PromptInputProps {
	input: string;
	setInput: (value: string) => void;
	onSubmit: (message: PromptInputMessage) => void;
	isLoading: boolean;
	stop: () => void;
	status: "streaming" | "submitted" | "ready" | "error";
	className?: string;
}

export function PromptInput({
	input,
	setInput,
	onSubmit,
	isLoading,
	stop,
	status,
	className,
}: PromptInputProps) {
	return (
		<div className={cn("bg-background p-4", className)}>
			<div className="max-w-4xl mx-auto">
				<AIPromptInput
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
				</AIPromptInput>
				<div className="mt-2 text-xs text-muted-foreground text-center">
					Press{" "}
					<kbd className="px-1 py-0.5 bg-muted rounded text-xs">Shift</kbd> +{" "}
					<kbd className="px-1 py-0.5 bg-muted rounded text-xs">Enter</kbd> for
					a new line
				</div>
			</div>
		</div>
	);
}
