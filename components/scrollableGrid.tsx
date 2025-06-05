"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { removeDuplicates } from "@/utils/helpers";
import { Anime } from "@/app/types/anime";
import { AnimeFetchSource } from "@/app/types/animeFetchSource";

interface ScrollableGridProps {
  source: AnimeFetchSource;
}

export default function ScrollableGrid({ source }: ScrollableGridProps) {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchTopAnime = async () => {
      try {
        const response = await fetch(source.url);
        const data = await response.json();
        // the key here for the duplication removal is "mal.id"
        setAnimeList(removeDuplicates(data.data, (a) => a.mal_id));
      } catch (error) {
        console.error("Failed to fetch anime data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopAnime();
  }, [source]);

  const handleCardClicker = (mal_id: number) => {
    router.push(`/anime/${mal_id}`);
  };

  return (
    <div className="flex items-center justify-center bg-gray-900">
      <div className="w-10/12 py-4">
        <h2 className="text-2xl font-bold text-white mb-4">
          {source.status} Anime
        </h2>

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
            className="flex gap-4 overflow-x-auto no-scrollbar pb-2"
          >
            {animeList.map((anime, index) => (
              <div
                key={`${anime.mal_id}-${index}`}
                onClick={() => handleCardClicker(anime.mal_id)}
                className="relative bg-gray-800 rounded-lg shadow-md w-48 flex-shrink-0 cursor-pointer hover:shadow-xl transition duration-300 group"
              >
                {/* Anime Image */}
                <img
                  src={anime.images.jpg.image_url}
                  alt={anime.title}
                  className="w-full h-64 object-cover rounded-t-lg"
                />

                {/* Title */}
                <div className="p-2">
                  <h3 className="text-sm font-semibold text-white text-center truncate">
                    {anime.title}
                  </h3>
                </div>

                {/* Hover Overlay */}
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg text-white p-3 flex flex-col justify-center text-sm">
                  <p className="mb-1">
                    <span className="font-semibold">Score:</span>{" "}
                    {anime.score ?? "N/A"}
                  </p>
                  <p className="mb-1">
                    <span className="font-semibold">Episodes:</span>{" "}
                    {anime.episodes ?? "Unknown"}
                  </p>
                  <p className="mb-2">
                    <span className="font-semibold">Type:</span>{" "}
                    {anime.type ?? "N/A"}
                  </p>

                  {/* Genre Tags */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {/* fix genre type error */}
                    {(anime.genres || []).slice(0, 3).map((genre, i) => (
                      <span
                        key={i}
                        className="bg-pink-600 text-white text-xs font-semibold px-2 py-1 rounded-full"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
