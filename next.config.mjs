import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();

/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	reactStrictMode: true,
	typescript: {
		ignoreBuildErrors: true,
	},
	// Add any other Next.js config here
};

export default nextConfig;
