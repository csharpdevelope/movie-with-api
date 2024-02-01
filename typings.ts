export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type SearchResults = {
  page: number,
  results: Movie[],
  total_pages: number,
  total_results: number
}

export type Genre = {
  id: number,
  name: string
}

export type Genres = {
  genres: Genre[]
}

export interface MovieDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: any | null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface BelongCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string; 
  name: string
}

export interface SpokenLanguage { 
  english_name: string;
  iso_639_1: string; 
  name: string;
}

export interface Video {
  name: string;
  key: string;
  site: string;
  size: number;
  id: string;
  type: string;
  official: boolean;
  published_at: string
}

export interface Videos {
  id: number;
  results: Video[]
}

export interface Actor {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface CrewMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
}

export interface PeopleByMovies {
  id: number;
  cast: Actor[],
  crew: CrewMember[]
}

export interface ImageInfo {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
  file_type: string;
};

export interface ImagesResponse {
  backdrops: ImageInfo[];
  id: number;
  logos: ImageInfo[];
  posters: ImageInfo[]
}

export type ExternalMovieInfo = {
  id: number;
  imdb_id: string;
  wikidata_id: string;
  facebook_id: string;
  instagram_id: string;
  twitter_id: string;
};

export interface Keyword {
  id: number;
  name: string;
}

export interface MovieKeywords {
  id: number;
  keywords?: Keyword[],
  results?: Keyword[]
}