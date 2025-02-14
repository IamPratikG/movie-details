import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { fetchMovieById } from "./services/getMovieById";
import { fetchMovies } from "./services/getMovieList";
import { Movie } from "./types/Movie";

type MoviesContextType = {
  movies: Movie[];
  movieMap: Record<number, Movie>;
  favorites: Movie[];
  loading: boolean;
  hasSearched: boolean;
  currentPage: number;
  itemsPerPage: number;
  searchMovies: (searchString: string) => Promise<void>;
  clearMovies: () => void;
  getMovieById: (id: number) => Promise<Movie | undefined>;
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
  setCurrentPage: (page: number) => void;
};

const MoviesContext = createContext<MoviesContextType>({
  movies: [],
  movieMap: {},
  favorites: [],
  loading: false,
  hasSearched: false,
  currentPage: 1,
  itemsPerPage: 8,
  searchMovies: async () => {},
  clearMovies: () => {},
  getMovieById: async () => undefined,
  addToFavorites: () => {},
  removeFromFavorites: () => {},
  isFavorite: () => false,
  setCurrentPage: () => {},
});

export const MoviesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const movieMap = useMemo(() => {
    const map: Record<number, Movie> = {};
    movies.forEach((movie) => {
      map[movie.id] = movie;
    });
    return map;
  }, [movies]);

  const searchMovies = useCallback(async (searchString: string) => {
    setLoading(true);
    try {
      const response = await fetchMovies(searchString);
      setMovies(response.data);
      setHasSearched(true);
      setCurrentPage(1);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearMovies = useCallback(() => {
    setMovies([]);
    setHasSearched(false);
    setCurrentPage(1);
  }, []);

  const getMovieById = useCallback(
    async (id: number): Promise<Movie | undefined> => {
      if (movieMap[id]) return movieMap[id];

      try {
        const fetchedMovie = await fetchMovieById(id);
        setMovies((prev) => [...prev, fetchedMovie as Movie]);
        return fetchedMovie;
      } catch (error) {
        console.error(`Error fetching movie with ID ${id}:`, error);
        return undefined;
      }
    },
    [movieMap]
  );

  const addToFavorites = useCallback((movie: Movie) => {
    setFavorites((prev) => {
      const newFavorites = [...prev, movie];
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  const removeFromFavorites = useCallback((movieId: number) => {
    setFavorites((prev) => {
      const newFavorites = prev.filter((m) => m.id !== movieId);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  const isFavorite = useCallback(
    (movieId: number) => favorites.some((m) => m.id === movieId),
    [favorites]
  );

  const value = useMemo(
    () => ({
      movies,
      movieMap,
      favorites,
      loading,
      hasSearched,
      currentPage,
      itemsPerPage,
      searchMovies,
      clearMovies,
      getMovieById,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      setCurrentPage,
    }),
    [
      movies,
      movieMap,
      favorites,
      loading,
      hasSearched,
      currentPage,
      searchMovies,
      clearMovies,
      getMovieById,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
    ]
  );

  return (
    <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>
  );
};

export const useMovies = () => useContext(MoviesContext);
