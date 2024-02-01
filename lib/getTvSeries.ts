import { TVShowDetail, TvSearchResult } from "@/types/TVType";
import { ExternalMovieInfo, ImagesResponse, MovieKeywords, PeopleByMovies, Videos } from "@/typings";
import { pages } from "next/dist/build/templates/app-page";

export async function getTrendingTVSeries(type: string, page?: string) {
  const url = new URL(`https://api.themoviedb.org/3/tv/${type}`);
  url.searchParams.set("language", "en-US");
  url.searchParams.set("page", page !== undefined ? page : "1");
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    }
  };
  const response = await fetch(url, options);
  const data = (await response.json()) as TvSearchResult;
  return data;
}

export async function getTVShowDetail(series_id: string) {
  const url = new URL(`https://api.themoviedb.org/3/tv/${series_id}`);
  url.searchParams.set("language", "en-US");
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    }
  };
  const response = await fetch(url, options);
  const data = (await response.json()) as TVShowDetail;
  return data;
}

export async function getTvideos(series_id: string) {
  const url = new URL(`https://api.themoviedb.org/3/tv/${series_id}/videos`);
  url.searchParams.set("language", "en-US");
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    }
  };
  const response = await fetch(url, options);
  const data = (await response.json()) as Videos;
  return data.results;
}

export async function getAggregateCredits(series_id: string) {
  const url = new URL(`https://api.themoviedb.org/3/tv/${series_id}/aggregate_credits`);
  url.searchParams.set("language", "en-US");
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    }
  };
  const response = await fetch(url, options);
  const data = (await response.json()) as PeopleByMovies;
  return data;
}

export async function getTvSeriaImage(serieId: string) {
  const url = new URL(`https://api.themoviedb.org/3/tv/${serieId}/images`);
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    }
  };
  const response = await fetch(url, options);
  const data = (await response.json()) as ImagesResponse;
  
  return data;
}

export async function getRecommendationVideos(serieId: string) {
  const url = new URL(`https://api.themoviedb.org/3/tv/${serieId}/recommendations`);
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    }
  };
  const response = await fetch(url, options);
  const data = (await response.json()) as TvSearchResult;
  return data;
}

export async function getExternalTvSeria(serieId: string) {
  const url = new URL(`https://api.themoviedb.org/3/tv/${serieId}/external_ids`)
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    },
  };
  const response = await fetch(url, options);
  const data = (await response.json()) as ExternalMovieInfo
  return data;
}

export async function getTvSerieKeywords(serieId:string) {
  const url = new URL(`https://api.themoviedb.org/3/tv/${serieId}/keywords`)
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    },
  };
  const response = await fetch(url, options);
  const data = (await response.json()) as MovieKeywords
  return data.results;
}