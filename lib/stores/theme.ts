import { atom } from "nanostores";

export type Theme = "dark" | "light";

export const kTheme = "bolt_theme";

export function themeIsDark() {
	return themeStore.get() === "dark";
}

export const DEFAULT_THEME = "dark";

export const themeStore = atom<Theme>("dark");

if (typeof window !== "undefined") {
	const localTheme = localStorage.getItem(kTheme) as Theme;
	if (localTheme) {
		themeStore.set(localTheme);
	} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
		themeStore.set("dark");
	} else {
		themeStore.set("light");
	}
}

export function toggleTheme() {
	const currentTheme = themeStore.get();
	const newTheme = currentTheme === "dark" ? "light" : "dark";

	themeStore.set(newTheme);

	localStorage.setItem(kTheme, newTheme);

	document.documentElement.setAttribute("data-theme", newTheme);
}
