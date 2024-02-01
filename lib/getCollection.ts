import { MovieCollection } from "@/types/collectionType";
import { Genres, ImagesResponse } from "@/typings";

export async function getCollectoinById(collectionId: string) {
  const url = new URL(`https://api.themoviedb.org/3/collection/${collectionId}`)
  url.searchParams.set("language", "en-US");
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    },
  };
  const response = await fetch(url, options);
  const data = (await response.json()) as MovieCollection;

  return data;
}

export async function getGenreByType(type: string) {
  var url = type === 'movie' ? "https://api.themoviedb.org/3/genre/movie/list?language=en" : "https://api.themoviedb.org/3/genre/tv/list";
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json;",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    },
    next: {
      revalidate: 60 * 60 * 24, // 24 hours
    }
  }
  const response = await fetch(url, options);
  const data = (await response.json()) as Genres;
  return data;
}

export async function getImageByCollection(movieId: string) {
  const url = new URL("https://api.themoviedb.org/3/collection/" + movieId + "/images");
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    },
  };
  const response = await fetch(url, options);
  const data = (await response.json()) as ImagesResponse
  return data;
}