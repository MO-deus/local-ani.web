"use client";

import { useEffect, useState } from "react";

interface AnimeDetails {
  mal_id: number;
  title: string;
  synopsis: string;
  images: {
    jpg: {
      image_url: string;
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

export default function AnimePage({ params }: { params: { id: string } }) {
  const [animeDetails, setAnimeDetails] = useState<AnimeDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/anime/${params.id}`
        );
        const data = await response.json();
        setAnimeDetails(data.data || null);
      } catch (error) {
        console.error("Failed to fetch anime details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeDetails();
  }, [params.id]);

  if (loading) {
    return <div className="text-black text-center">Loading...</div>;
  }

  if (!animeDetails) {
    return <div className="text-black text-center">Anime not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 text-black">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Anime Poster */}
        <img
          src={animeDetails.images.jpg.image_url}
          alt={animeDetails.title}
          className="w-full md:w-1/3 rounded-lg"
        />

        {/* Anime Details */}
        <div>
          <h1 className="text-3xl font-bold">{animeDetails.title}</h1>
          <p className="text-black-400 mt-2">
            Score: <span className="text-black">{animeDetails.score}</span>
          </p>
          <p className="text-black-400 mt-2">
            Episodes: <span className="text-black">{animeDetails.episodes}</span>
          </p>
          <p className="text-black-400 mt-2">
            Status: <span className="text-black">{animeDetails.status}</span>
          </p>
          <p className="text-black-400 mt-2">
            Aired:{" "}
            <span className="text-black">
              {animeDetails.aired.from} - {animeDetails.aired.to || "Ongoing"}
            </span>
          </p>
          <h2 className="text-xl font-bold mt-4">Synopsis</h2>
          <p className="mt-2">{animeDetails.synopsis}</p>
        </div>
      </div>
    </div>
  );
}