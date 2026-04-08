export type Movies = Movie[];
export type CastByMovie = Movie['casts'];

export interface Movie {
  id: string;
  movie_id: number;
  adult: number;
  backdrop_path: string;
  casts: Casts[];
  created_at: number | null;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  updated_at: number | null;
  vote_average: number;
  vote_count: number;
}

export interface Casts {
  character:string;
  created_at: number;
  id:string;
  movie_id: number;
  name:string;
  original_name:string;
  popularity:string;
  profile_path:string;
  updated_at: number;
}









