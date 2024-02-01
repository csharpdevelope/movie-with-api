import { Movie } from "@/typings";

export interface MovieCollection {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  parts: Movie[];
}

export interface RecommendType {
  id: number;
  title: string;
  backdrop_path: string;
  vote_average: number;
  media_type: string;
}