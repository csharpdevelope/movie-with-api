export interface MoviePerson {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_name?: string;
  original_title?: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string; // You may need to adjust this based on the actual type of release_date in your data
  title?: string;
  video: boolean;
  vote_average: number;
  episode_count?: number;
  first_air_date: string;
  vote_count: number;
  credit_id: string;
  media_type: string;
}

export interface MovieCast extends MoviePerson {
  character: string;
  order: number;
}

export interface MovieCrew extends MoviePerson {
  department: string;
  job: string;
}

export interface MovieDetails {
  cast: MovieCast[];
  crew: MovieCrew[];
  id: number;
}

export interface TVShowPerson {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
  character: string;
  credit_id: string;
  episode_count: number;
}

export interface TVShowDetails {
  cast: TVShowPerson[];
  crew: TVShowPerson[];
  id: number;
}