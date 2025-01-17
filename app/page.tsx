import ScrollableGrid from "@/components/scrollableGrid";
import { Button } from "@/components/ui/button"; // Assuming ShadCN's button is installed

export default function Home() {
	return (
		// maybe make seperate components for each section ??
		<div className="min-h-screen bg-gray-900 text-white">
			{/* Hero Section */}
			<header className="relative bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
				<div className="container mx-auto px-6 py-16 text-center">
					<h1 className="text-4xl md:text-6xl font-bold">
						Stream Your Favorite Anime
					</h1>
					<p className="mt-4 text-lg md:text-xl">
						Watch thousands of anime series and movies in HD quality, ad-free.
					</p>
					<Button className="mt-6 bg-white text-black hover:bg-gray-100">
						Start Watching Now
					</Button>
				</div>
			</header>

			{/* Featured Section */}
			<section className="bg-gray-900 min-h-screen text-white">
				<div className="container mx-auto px-4">
					<ScrollableGrid />
				</div>
			</section>

			{/* Footer */}
			{/* crate a PR for footer */}
			<footer className="bg-gray-800 py-6">
				<div className="container mx-auto text-center">
					<p className="text-sm">
						© {new Date().getFullYear()} AnimeStream. All rights reserved.
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
