import type { Metadata } from "next";
import "react-toastify/dist/ReactToastify.css";
import "@xterm/xterm/css/xterm.css";
import "~/styles/index.css";

export const metadata: Metadata = {
	title: "AI Web - Your AI Assistant",
	description: "AI-powered web development assistant",
	authors: [{ name: "AI Web" }],
	robots: "index,follow",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" type="image/x-icon" />
				<link rel="icon" href="/favicon.png" type="image/png" />
				<link rel="apple-touch-icon" href="/favicon.png" sizes="180x180" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
				/>
			</head>
			<body>
				<script
					dangerouslySetInnerHTML={{
						__html: `
  try {
    const localTheme = localStorage.getItem("bolt_theme");
    const supportDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (localTheme === "dark" || (!localTheme && supportDarkMode)) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  } catch (e) {}
`,
					}}
				/>
				{children}
			</body>
		</html>
	);
}
