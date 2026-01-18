"use client";

import {
	Hero,
	Features,
	HowItWorks,
	Pricing,
	Footer,
} from "~/components/landing";
import { LandingHeader } from "~/components/header/LandingHeader";

export default function Page() {
	return (
		<div className="flex flex-col min-h-screen w-full bg-bolt-elements-background-depth-1">
			<LandingHeader />
			<main className="flex-1">
				<Hero />
				<Features />
				<HowItWorks />
				<Pricing />
			</main>
			<Footer />
		</div>
	);
}
