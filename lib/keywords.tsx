import { SearchResults } from "@/typings";

export async function getMovieByKeywords(keywordId: string, type: string) {
  const url = new URL(`https://api.themoviedb.org/3/keyword/${keywordId}/${type}`);
  url.searchParams.set('page', "1");
  url.searchParams.set("language", "en-US");
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    }
  };
  try {
    const response = await fetch(url, options);
    
    const data = (await response.json()) as SearchResults;
    return data;
  } catch (err) {
    console.log(err);
  }
}