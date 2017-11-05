export class Movie {
  id: number;
  name: string;
  adult: false;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: [{
    id: number;
    name: string;
  }];
  homepage: string;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: [{
    name: string;
    id: number;
  }];
  production_countries: [{
    iso_3166_1: string;
    name: string;
  }];
  release_date: Date;
  revenue: number;
  runtime: number;
  spoken_languages: [{
    iso_639_1: string;
    name: string;
  }];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
