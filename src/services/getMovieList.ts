import mockMovieData from "./mockMovieResponse.json";

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
      if (Math.random() < 0.1) {
        console.log("Error scenario");
        reject({ status: 500, message: "Internal Server Error" });
      } else {
        const movies = searchString
          ? searchMovies(searchString)
          : (mockMovieData as Movie[]);
        console.log("Success ===> ");
        console.log(movies);
        resolve({
          data: movies,
          status: 200,
          message: "Success",
        });
      }
    }, getRandomDelay());
  });
};
