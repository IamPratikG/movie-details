export interface Movie {
  id: number;
  title: string;
  poster_image_search: string;
  poster_image_details: string;
  release_date: string;
  description: string;
  cast: string[];
  director: string;
  release_year: number;
  genres: string[];
  rating: number;
  runtime: number;
  revenue: number;
  metascore: number;
}
