import { ExternalMovieInfo, ImagesResponse, MovieDetail, MovieKeywords, PeopleByMovies, SearchResults, Videos } from "@/typings";

async function fetchFromTMDB(url: URL, cacheTime?: number) {
  url.searchParams.set("include_adult", "false");
  url.searchParams.set("include_video", "false");
  url.searchParams.set("sort_by", "popularity.desc");
  url.searchParams.set("language", "en-US");
  url.searchParams.set("page", "1");

  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    },
    next: {
      revalidate: cacheTime || 60 * 60 * 24,
    }
  }

  const response = await fetch(url, options);
  const data = (await response.json()) as SearchResults;
  return data;
}

export async function getUpcomingMovies() {
  const url = new URL("https://api.themoviedb.org/3/movie/upcoming");
  const data = await fetchFromTMDB(url);
  return data.results;
}

export async function getTopRatingMovies() {
  const url = new URL("https://api.themoviedb.org/3/movie/top_rated");
  const data = await fetchFromTMDB(url);
  return data.results;
}

export async function getPopularMovies() {
  const url = new URL("https://api.themoviedb.org/3/movie/popular");
  const data = await fetchFromTMDB(url);
  return data.results;
}
export async function getNowPlaying() {
  const url = new URL("https://api.themoviedb.org/3/movie/now_playing");
  const data = await fetchFromTMDB(url);
  return data.results;
}

export async function getDiscoverMovies(id?: string, keywords?: string) {
  const url = new URL("https://api.themoviedb.org/3/discover/movie");

  keywords && url.searchParams.set("with_keywords", keywords);
  id && url.searchParams.set("with_genres", id);
  const data = await fetchFromTMDB(url);

  return data.results;
}

export async function getSearchMovies(term: string) {
  const url = new URL("https://api.themoviedb.org/3/search/movie");
  url.searchParams.set("query", term);
  const data = await fetchFromTMDB(url);
  return data.results;
}

export async function getMovieDetail(id: string) {
  const url = new URL("https://api.themoviedb.org/3/movie/" + id);
  url.searchParams.set("language", "en-US");
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    },
  };

  const response = await fetch(url, options);
  const data = (await response.json()) as MovieDetail;

  return data;
}

export async function getMovieVideos(id: string) {
  const url = new URL("https://api.themoviedb.org/3/movie/" + id + "/videos");
  url.searchParams.set("language", "en-US");
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    },
  };
  const response = await fetch(url, options);
  const data = (await response.json()) as Videos;
  return data.results;
}

export async function getPeopleByMovie(movieId: string) {
  const url = new URL("https://api.themoviedb.org/3/movie/" + movieId + "/credits");
  url.searchParams.set("language", "en-US");
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    },
  };
  const response = await fetch(url, options);
  const data = (await response.json()) as PeopleByMovies;
  return data;
}

export async function getImageByMovie(movieId: string) {
  const url = new URL("https://api.themoviedb.org/3/movie/" + movieId + "/images");
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

export async function getRecommends(movieId: string) {
  const url = new URL(`https://api.themoviedb.org/3/movie/${movieId}/recommendations`)
  const data = await fetchFromTMDB(url);
  return (await data).results;
}

export async function getExternalIDByMovieId(movieId:string) {
  const url = new URL(`https://api.themoviedb.org/3/movie/${movieId}/external_ids`)
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

export async function getMovieKeywords(movieId: string) {
  const url = new URL(`https://api.themoviedb.org/3/movie/${movieId}/keywords`)
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    },
  };
  const response = await fetch(url, options);
  const data = (await response.json()) as MovieKeywords
  return data.keywords;
}



export async function getMoviesByType(typeName: string, page?: string, cacheTime?: number) {
  const url = new URL(`https://api.themoviedb.org/3/movie/${typeName}`);
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
  
  const data = (await response.json()) as SearchResults;
  
  return data;
}

export async function getTrendingMovieByTime(timeWindow: string) {
  const url = new URL(`https://api.themoviedb.org/3/trending/movie/${timeWindow}`);
  url.searchParams.set("language", "en-US");
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    }
  };

  const response = await fetch(url, options);
  const data = (await response.json()) as SearchResults;
  return data.results;
}