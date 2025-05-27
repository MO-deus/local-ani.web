"use client";

import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

import { ISODateFormatToReadableFormat } from "@/lib/formateDate";

interface AnimeDetails {
	mal_id: number;
	title: string;
	synopsis: string;
	images: {
		jpg: {
			image_url: string;
			large_image_url: string;
		};
	};
	score: number;
	episodes: number;
	status: string;
	aired: {
		from: string;
		to: string;
	};
}

export default function AnimePage({
	params,
}: { params: Promise<{ id: string }> }) {
	const { id } = use(params);
	const [animeDetails, setAnimeDetails] = useState<AnimeDetails | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchAnimeDetails = async () => {
			try {
				const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
				const data = await response.json();
				setAnimeDetails(data.data || null);
			} catch (error) {
				console.error("Failed to fetch anime details:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchAnimeDetails();
	}, [id]);

	if (loading) {
		return <div className="text-black text-center">Loading...</div>;
	}

	if (!animeDetails) {
		return <div className="text-black text-center">Anime not found</div>;
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 px-4 py-10 text-white font-mono">
			<div className="container mx-auto">
				<div className="flex flex-col md:flex-row gap-10 bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-pink-300">
					{/* Anime Poster + Buttons */}
					<div className="w-full md:w-1/3 flex flex-col items-center">
						<img
							src={animeDetails.images.jpg.large_image_url}
							alt={animeDetails.title}
							className="w-full h-full object-cover rounded-xl border-4 border-pink-300 shadow-lg"
						/>

						<div className="mt-4 flex flex-row items-center gap-3 w-full">
							<Button
								variant="default"
								className="w-full bg-pink-500 hover:bg-pink-600 text-white shadow-md"
							>
								Add to Watchlist
							</Button>
							<Heart className="text-pink-400 hover:fill-pink-500 transition-all w-6 h-6 cursor-pointer" />
						</div>
					</div>

					{/* Anime Details */}
					<div className="flex-1 text-white">
						<h1 className="text-6xl font-extrabold tracking-wide text-pink-800 drop-shadow-md">
							{animeDetails.title}
						</h1>

						<p className="mt-4 text-purple-100">
							<span className="font-bold text-pink-800">Score:</span>{" "}
							{animeDetails.score}
						</p>
						<p className="text-purple-100">
							<span className="font-bold text-pink-800">Episodes:</span>{" "}
							{animeDetails.episodes}
						</p>
						<p className="text-purple-100">
							<span className="font-bold text-pink-800">Status:</span>{" "}
							{animeDetails.status}
						</p>
						<p className="text-purple-100">
							<span className="font-bold text-pink-800">Aired:</span>{" "}
							{ISODateFormatToReadableFormat(animeDetails.aired.from)} –{" "}
							{ISODateFormatToReadableFormat(animeDetails.aired.to) ||
								"Ongoing"}
						</p>

						<h2 className="text-2xl font-bold mt-6 text-pink-800">Synopsis</h2>
						<p className="mt-2 text-purple-100 leading-relaxed">
							{animeDetails.synopsis}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
