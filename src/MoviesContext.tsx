import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { Movie, fetchMovies } from "./services/getMovieList";

type MoviesContextType = {
  movies: Movie[];
  movieMap: Record<number, Movie>;
  favorites: Movie[];
  loading: boolean;
  hasSearched: boolean;
  searchMovies: (searchString: string) => Promise<void>;
  clearMovies: () => void;
  getMovieById: (id: number) => Movie | undefined;
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
};

const MoviesContext = createContext<MoviesContextType>({
  movies: [],
  movieMap: {},
  favorites: [],
  loading: false,
  hasSearched: false,
  searchMovies: async () => {},
  clearMovies: () => {},
  getMovieById: () => undefined,
  addToFavorites: () => {},
  removeFromFavorites: () => {},
  isFavorite: () => false,
});

export const MoviesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const movieMap = useMemo(() => {
    const map: Record<number, Movie> = {};
    movies.forEach((movie: Movie) => {
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
  }, []);

  const getMovieById = useCallback(
    (id: number) => {
      return movieMap[id];
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
    (movieId: number) => {
      return favorites.some((m) => m.id === movieId);
    },
    [favorites]
  );

  const value = useMemo(
    () => ({
      movies,
      movieMap,
      favorites,
      loading,
      hasSearched,
      searchMovies,
      clearMovies,
      getMovieById,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
    }),
    [
      movies,
      movieMap,
      favorites,
      loading,
      hasSearched,
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

export type { Movie };
