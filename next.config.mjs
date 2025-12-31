import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	// Add any other Next.js config here
};

export default nextConfig;
