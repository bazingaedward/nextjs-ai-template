import {
	atom,
	map,
	type MapStore,
	type ReadableAtom,
	type WritableAtom,
} from "nanostores";
import { ActionRunner } from "~/lib/runtime/action-runner";
import type {
	ActionCallbackData,
	ArtifactCallbackData,
} from "~/lib/runtime/message-parser";
import { webcontainer } from "~/lib/webcontainer";
import type { ITerminal } from "~/types/terminal";
import { unreachable } from "~/utils/unreachable";
import { FilesStore, type FileMap } from "./files";
import { PreviewsStore } from "./previews";
import { TerminalStore } from "./terminal";

export interface ArtifactState {
	id: string;
	title: string;
	closed: boolean;
	runner: ActionRunner;
}

export type ArtifactUpdateState = Pick<ArtifactState, "title" | "closed">;

type Artifacts = MapStore<Record<string, ArtifactState>>;

export type WorkbenchViewType = "code" | "preview";

export class WorkbenchStore {
	#previewsStore = new PreviewsStore(webcontainer);
	#filesStore = new FilesStore(webcontainer);
	#terminalStore = new TerminalStore(webcontainer);

	artifacts: Artifacts = (globalThis as any).artifacts ?? map({});

	showWorkbench: WritableAtom<boolean> =
		(globalThis as any).showWorkbench ?? atom(false);
	currentView: WritableAtom<WorkbenchViewType> =
		(globalThis as any).currentView ?? atom("code");
	unsavedFiles: WritableAtom<Set<string>> =
		(globalThis as any).unsavedFiles ?? atom(new Set<string>());
	modifiedFiles = new Set<string>();
	artifactIdList: string[] = [];
	selectedFile: WritableAtom<string | undefined> =
		(globalThis as any).selectedFile ?? atom(undefined);

	constructor() {
		if (process.env.NODE_ENV === "development") {
			(globalThis as any).artifacts = this.artifacts;
			(globalThis as any).unsavedFiles = this.unsavedFiles;
			(globalThis as any).showWorkbench = this.showWorkbench;
			(globalThis as any).currentView = this.currentView;
			(globalThis as any).selectedFile = this.selectedFile;
		}
	}

	get previews() {
		return this.#previewsStore.previews;
	}

	get files() {
		return this.#filesStore.files;
	}

	get firstArtifact(): ArtifactState | undefined {
		return this.#getArtifact(this.artifactIdList[0]);
	}

	get filesCount(): number {
		return this.#filesStore.filesCount;
	}

	get showTerminal() {
		return this.#terminalStore.showTerminal;
	}

	toggleTerminal(value?: boolean) {
		this.#terminalStore.toggleTerminal(value);
	}

	attachTerminal(terminal: ITerminal) {
		this.#terminalStore.attachTerminal(terminal);
	}

	onTerminalResize(cols: number, rows: number) {
		this.#terminalStore.onTerminalResize(cols, rows);
	}

	setDocuments(files: FileMap) {
		if (this.#filesStore.filesCount > 0 && this.selectedFile.get() === undefined) {
			// we find the first file and select it
			for (const [filePath, dirent] of Object.entries(files)) {
				if (dirent?.type === "file") {
					this.setSelectedFile(filePath);
					break;
				}
			}
		}
	}

	setShowWorkbench(show: boolean) {
		this.showWorkbench.set(show);
	}

	setSelectedFile(filePath: string | undefined) {
		this.selectedFile.set(filePath);
	}

	async saveFile(filePath: string) {
		// Implementation removed as EditorStore is gone
	}

	async saveCurrentDocument() {
		// Implementation removed as EditorStore is gone
	}

	resetCurrentDocument() {
		// Implementation removed as EditorStore is gone
	}

	async saveAllFiles() {
		// Implementation removed as EditorStore is gone
	}

	getFileModifcations() {
		return this.#filesStore.getFileModifications();
	}

	resetAllFileModifications() {
		this.#filesStore.resetFileModifications();
	}

	abortAllActions() {
		// TODO: what do we wanna do and how do we wanna recover from this?
	}

	addArtifact({ messageId, title, id }: ArtifactCallbackData) {
		const artifact = this.#getArtifact(messageId);

		if (artifact) {
			return;
		}

		if (!this.artifactIdList.includes(messageId)) {
			this.artifactIdList.push(messageId);
		}

		this.artifacts.setKey(messageId, {
			id,
			title,
			closed: false,
			runner: new ActionRunner(webcontainer),
		});
	}

	updateArtifact(
		{ messageId }: ArtifactCallbackData,
		state: Partial<ArtifactUpdateState>,
	) {
		const artifact = this.#getArtifact(messageId);

		if (!artifact) {
			return;
		}

		this.artifacts.setKey(messageId, { ...artifact, ...state });
	}

	async addAction(data: ActionCallbackData) {
		const { messageId } = data;

		const artifact = this.#getArtifact(messageId);

		if (!artifact) {
			unreachable("Artifact not found");
		}

		artifact.runner.addAction(data);
	}

	async runAction(data: ActionCallbackData) {
		const { messageId } = data;

		const artifact = this.#getArtifact(messageId);

		if (!artifact) {
			unreachable("Artifact not found");
		}

		artifact.runner.runAction(data);
	}

	#getArtifact(id: string) {
		const artifacts = this.artifacts.get();
		return artifacts[id];
	}
}

export const workbenchStore = new WorkbenchStore();
