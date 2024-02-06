import { SearchResults } from "@/typings";
import axiosConfig from "./axiosConfig";

export async function getUpcomingMovies() {
  const url = new URL("movie/upcoming");
  
  url.searchParams.set("include_adult", "false");
  url.searchParams.set("include_video", "false");
  url.searchParams.set("sort_by", "popularity.desc");
  url.searchParams.set("language", "en-US");
  url.searchParams.set("page", "1");
  
  const response = await axiosConfig.get(url.toString());
  const data = (await response.data) as SearchResults;
  
  return data.results;
}
