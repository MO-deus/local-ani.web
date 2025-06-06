import { AnimeFetchSource } from "@/app/types/animeFetchSource";


export type AnimeSourceType = "Top" | "Upcoming" | "Seasonal" | "Popular" | "Search" | "Upcoming" | string;

export const animeSources: Record<string, AnimeFetchSource> = {
    top: {
    url: "https://api.jikan.moe/v4/top/anime",
    status: "Top",
  },
  popular: {
    url: "https://api.jikan.moe/v4/anime?order_by=popularity",
    status: "Popular",
  },
  seasonal: {
    url: "https://api.jikan.moe/v4/seasons/now",
    status: "Seasonal",
  },
  upcoming : {
    url : "https://api.jikan.moe/v4/seasons/upcoming",
    status: "Upcoming"
  },
}