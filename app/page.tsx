import ScrollableGrid from "@/components/scrollableGrid";
import { AnimeFetchSource, animeSources } from "@/constants/animeSources";

export default function Home() {
	return (
		// maybe make seperate components for each section ??
		<div className="min-h-screen bg-gray-900 text-white">
			{/* Hero Section */}
			<header className="relative bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-700">
				<div className="container mx-auto px-6 py-16 text-center">
					<h1 className="text-4xl md:text-6xl font-bold">
						Stream Your Favorite Anime
					</h1>
					<p className="mt-4 text-lg md:text-xl">
						Watch thousands of anime series and movies in HD quality, ad-free.
					</p>
				</div>
			</header>

			{/* Featured Section */}
			<section className="bg-gray-900 pt-6 pb-6 text-white">
				<div className="container mx-auto px-4">
					<ScrollableGrid source={animeSources.top} />
					<ScrollableGrid source={animeSources.seasonal} />
					<ScrollableGrid source={animeSources.upcoming} />
				</div>
			</section>

			{/* Footer */}
			{/* crate a PR for footer */}
			<footer className="bg-gray-800 py-6">
				<div className="container mx-auto text-center">
					<p className="text-sm">
						© {new Date().getFullYear()} LocalANi. All rights reserved.
					</p>
					<div className="flex justify-center space-x-4 mt-4">
						<a href="#" className="hover:underline">
							Privacy Policy
						</a>
						<a href="#" className="hover:underline">
							Terms of Service
						</a>
						<a href="#" className="hover:underline">
							Contact Us
						</a>
					</div>
				</div>
			</footer>
		</div>
	);
}
