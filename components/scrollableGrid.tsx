"use client";

import React from "react";
import { useEffect, useState } from "react";

interface Anime {
	mal_id: number;
	title: string;
	images: {
		jpg: {
			image_url: string;
		};
	};
	score: number;
}

export default function ScrollableGrid() {
	const [animeList, setAnimeList] = useState<Anime[]>([]);
	const [loading, setLoading] = useState(true);
	const scrollContainerRef = React.useRef<HTMLDivElement>(null);

	useEffect(() => {
		const fetchTopAnime = async () => {
			try {
				const response = await fetch("https://api.jikan.moe/v4/top/anime");
				const data = await response.json();
				setAnimeList(data.data || []);
			} catch (error) {
				console.error("Failed to fetch anime data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchTopAnime();
	}, []);

	useEffect(() => {
		if (!scrollContainerRef.current) return;
		const container = scrollContainerRef.current;

		const cardWidth = container.firstElementChild?.clientWidth;
		if (cardWidth === undefined) return;

		// scrolling to left
		const scrollInterval = setInterval(() => {
			container.scrollBy({
				left: cardWidth + 16,
				behavior: "smooth",
			});

			// scroll back to the start
			if (
				container.scrollLeft + container.offsetWidth >=
				container.scrollWidth
			) {
				setTimeout(() => {
					container.scrollTo({
						left: 0,
						behavior: "smooth",
					});
				}, 1000);
			}
		}, 3000);

		return () => clearInterval(scrollInterval);
	}, [animeList]);

	return (
		<div className="w-full py-8">
			<h2 className="text-2xl font-bold text-white mb-4">Top Anime</h2>
			{loading ? (
				<div className="flex gap-4 overflow-x-auto">
					{Array.from({ length: 4 }).map((_, index) => (
						<div
							key={index}
							className="w-48 h-64 bg-gray-700 rounded-md animate-pulse"
						/>
					))}
				</div>
			) : (
				<div
					ref={scrollContainerRef}
					className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 scroll-snap-x scroll-snap-mandatory"
				>
					{animeList.map((anime) => (
						<div
							key={anime.mal_id}
							className="bg-gray-800 rounded-md shadow-md w-48 flex-shrink-0 scroll-snap-start"
						>
							<img
								src={anime.images.jpg.image_url}
								alt={anime.title}
								className="w-full h-48 object-cover rounded-t-md"
							/>
							<div className="p-2">
								<h3 className="text-sm font-medium text-white truncate">
									{anime.title}
								</h3>
								<p className="text-gray-400 text-xs mt-1">
									Score: {anime.score}
								</p>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
