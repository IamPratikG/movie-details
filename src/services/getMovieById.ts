import mockMovieData from "./mockMovieResponse.json";
import { Movie } from "../types/Movie";

export const fetchMovieById = async (movieId: number): Promise<Movie> => {
  console.log(`/fetchMovieById called with ID: ${movieId}`);

  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        const movie = (mockMovieData as Movie[]).find((m) => m.id === movieId);

        if (movie) {
          resolve(movie);
        } else {
          reject(new Error(`Movie with ID ${movieId} not found.`));
        }
      },
      Math.random() * 350 + 150
    );
  });
};
