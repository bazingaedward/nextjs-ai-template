import Link from "next/link";

export default function NotFound() {
	return (
		<div className="min-h-screen bg-bolt-elements-background-depth-1 flex items-center justify-center">
			<div className="text-center">
				<h1 className="text-4xl font-bold text-bolt-elements-textPrimary mb-4">
					404
				</h1>
				<p className="text-bolt-elements-textSecondary mb-6">Page not found</p>
				<Link
					href="/"
					className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-md font-medium transition-colors"
				>
					Go Home
				</Link>
			</div>
		</div>
	);
}
