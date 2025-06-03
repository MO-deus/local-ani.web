"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimeFetchSource } from "@/constants/animeSources";

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

interface ScrollableGridProps {
  source: AnimeFetchSource;
}

export default function ScrollableGrid({source} : ScrollableGridProps) {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchTopAnime = async () => {
      try {
        const response = await fetch(source.url);
        const data = await response.json();
        setAnimeList(data.data || []);
      } catch (error) {
        console.error("Failed to fetch anime data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopAnime();
  }, [source]);

  // deduplication of data before rendering
  // setAnimeList(removeDuplicates(data.data, (a) => a.mal_id));

//   function removeDuplicates<T>(items: T[], getKey: (item: T) => any): T[] {
//   const seen = new Set();
//   return items.filter((item) => {
//     const key = getKey(item);
//     if (seen.has(key)) return false;
//     seen.add(key);
//     return true;
//   });
// }

  const handleCardClicker = (mal_id: number) => {
    router.push(`/anime/${mal_id}`);
  };

return (
  <div className="flex items-center justify-center bg-gray-900">
    <div className="w-10/12 py-4">
      <h2 className="text-2xl font-bold text-white mb-4">{source.status} Anime</h2>

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
              className="relative bg-gray-800 rounded-lg shadow-md w-48 flex-shrink-0 cursor-pointer hover:shadow-lg transition duration-200"
            >
              {/* Score Badge */}
              {/* <div className="absolute top-2 left-2 bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded z-10">
                {anime.score}
              </div> */}

              {/* Anime Image */}
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                className="w-full h-64 object-cover rounded-t-lg"
              />

              {/* Title */}
              <div className="p-2">
                <h3 className="text-sm font-medium text-white text-center truncate">
                  {anime.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);


}
