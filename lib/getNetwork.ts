import { NetworkInfo } from "@/types/networkType";
import { ImageInfo } from "@/typings";

export async function getNetworksById(id: string) {
  const url = new URL(`https://api.themoviedb.org/3/network/${id}`);
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    },
  };

  const response = await fetch(url, options);
  const data = (await response.json()) as NetworkInfo
  return data;
}

type NetworkImage ={
  id: number;
  logos: ImageInfo[]
}

export async function getNetworkMovies(id: string) {
  const url = new URL(`https://api.themoviedb.org/3/network/${id}/images`);
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    },
  };
  const response = await fetch(url, options);
  const data = (await response.json()) as NetworkImage;
  return data.logos;
}