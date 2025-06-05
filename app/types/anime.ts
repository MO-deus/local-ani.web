// types/anime.ts

export interface Genre {
  name: string;
  [x: string]: any;
}

export interface Anime {
  type: string;
  mal_id: number;
  title: string;
  episodes: number;
  genres: Genre[];
  images: {
    jpg: {
      image_url: string;
    };
  };
  score: number;
}
