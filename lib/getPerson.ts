import { MovieDetails, TVShowDetails } from "@/types/person";
import { ExternalMovieInfo } from "@/typings";

export interface KnownFor {
  adult: boolean;
  backdrop_path: string;
  id: number;
  name?: string; // Optional, as it could be a TV show or a movie
  title?: string; // Optional, as it could be a TV show or a movie
  original_language: string;
  original_name?: string; // Optional, as it could be a TV show or a movie
  original_title?: string; // Optional, as it could be a TV show or a movie
  overview: string;
  poster_path: string;
  media_type: 'tv' | 'movie' | 'person';
  genre_ids: number[];
  popularity: number;
  first_air_date?: string; // Only for TV shows
  release_date?: string; // Only for movies
  video?: boolean; // Only for movies
  vote_average: number;
  vote_count: number;
  origin_country?: string[]; // Only for TV shows
}

export interface Actor {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  known_for: KnownFor[];
  also_known_as: string[];
  biography: string;
  birthday?: string;
  deathday?: string;
  place_of_birth?: string;
}

export interface PSearchResult {
  page: number;
  results: Actor[];
  total_pages: number;
  total_results: number;
}

export async function getPopularPeople() {
  const url = new URL("https://api.themoviedb.org/3/person/popular");
  url.searchParams.set("language", "en-US");
  url.searchParams.set("page", "1");
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    },
  };
  const response = await fetch(url, options);
  const data = (await response.json()) as PSearchResult;
  return data;
}

export async function getTrendingPeopleByType(type: string) {
  const url = new URL(`https://api.themoviedb.org/3/person/${type}`);
  url.searchParams.set("language", "en-US");
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    },
  };
  const response = await fetch(url, options);
  const data = (await response.json()) as PSearchResult;
  return data.results;
}

export async function getPersonById(id: string) {
  const url = new URL(`https://api.themoviedb.org/3/person/${id}`);
  url.searchParams.set("language", "en-US");
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    },
  };
  const response = await fetch(url, options);
  const data = (await response.json()) as Actor;
  return data;
}

export async function getExternalIds(id: string) {
  const url = new URL(`https://api.themoviedb.org/3/person/${id}/external_ids`);
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    },
  };
  const response = await fetch(url, options);
  const data = (await response.json()) as ExternalMovieInfo;
  return data;
}

export async function getAllCombinedCredits(id: string) {
  const url = new URL(`https://api.themoviedb.org/3/person/${id}/combined_credits`);
  url.searchParams.set("language", "en-US");
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    },
  };
  const response = await fetch(url, options);
  const data = (await response.json()) as MovieDetails;
  return data;
}

export async function getTvByPerson(id: string) {
  const url = new URL(`https://api.themoviedb.org/3/person/${id}/tv_credits`);
  url.searchParams.set("language", "en-US");
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    },
  };
  const response = await fetch(url, options);
  const data = (await response.json()) as TVShowDetails;
  return data;
}

export async function getMovieByPerson(id: string) {
  const url = new URL(`https://api.themoviedb.org/3/person/${id}/movie_credits`);
  url.searchParams.set("language", "en-US");
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    },
  };
  const response = await fetch(url, options);
  const data = (await response.json()) as MovieDetails;
  return data;
}