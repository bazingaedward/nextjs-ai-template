import { WebContainer } from "@webcontainer/api";
import { WORK_DIR_NAME } from "~/utils/constants";

interface WebContainerContext {
	loaded: boolean;
}

export const webcontainerContext: WebContainerContext = (globalThis as any)
	.webcontainerContext ?? {
	loaded: false,
};

if (typeof window !== "undefined") {
	(globalThis as any).webcontainerContext = webcontainerContext;
}

export let webcontainer: Promise<WebContainer> = new Promise(() => {
	// noop for ssr
});

if (typeof window !== "undefined") {
	webcontainer =
		(globalThis as any).webcontainer ??
		Promise.resolve()
			.then(() => {
				return WebContainer.boot({ workdirName: WORK_DIR_NAME });
			})
			.then((webcontainer) => {
				webcontainerContext.loaded = true;
				return webcontainer;
			});

	(globalThis as any).webcontainer = webcontainer;
}
