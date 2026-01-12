import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

// 开发环境下启用 Cloudflare 平台模拟
if (process.env.NODE_ENV === "development") {
	await setupDevPlatform();
}

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	typescript: {
		ignoreBuildErrors: true,
	},
	// Add any other Next.js config here
};

export default nextConfig;
