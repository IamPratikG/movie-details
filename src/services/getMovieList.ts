import mockMovieData from "./mockMovieResponse.json";
import { Movie } from "../types/Movie";

interface ApiResponse {
  data: Movie[];
  status: number;
  message: string;
}

const getRandomDelay = () => Math.random() * 1500 + 500;

const searchMovies = (searchString: string): Movie[] => {
  const lowerCaseSearch = searchString.toLowerCase();
  return (mockMovieData as Movie[]).filter((movie) =>
    movie.title.toLowerCase().includes(lowerCaseSearch)
  );
};

export const fetchMovies = (
  searchString: string = ""
): Promise<ApiResponse> => {
  console.log(`/fetchMovies called with ===> ${searchString}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.01) {
        console.log("Error scenario");
        reject({ status: 500, message: "Internal Server Error" });
      } else {
        const movies = searchString
          ? searchMovies(searchString)
          : (mockMovieData as Movie[]);
        console.log("Successfully Fetched");
        resolve({
          data: movies,
          status: 200,
          message: "Success",
        });
      }
    }, getRandomDelay());
  });
};
