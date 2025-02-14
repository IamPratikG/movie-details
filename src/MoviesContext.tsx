import React, { createContext, useContext, useState, useMemo, useCallback } from "react";
import { Movie, fetchMovies } from "./services/getMovieList";

type MoviesContextType = {
  movies: Movie[];
  movieMap: Record<number, Movie>;
  loading: boolean;
  error: string | null;
  searchMovies: (searchString: string) => Promise<void>;
  clearMovies: () => void;
  getMovieById: (id: number) => Movie | undefined;
};

const MoviesContext = createContext<MoviesContextType>({
  movies: [],
  movieMap: {},
  loading: false,
  error: null,
  searchMovies: async () => {},
  clearMovies: () => {},
  getMovieById: () => undefined,
});

export const MoviesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const movieMap = useMemo(() => {
    const map: Record<number, Movie> = {};
    movies.forEach((movie: Movie) => {
      map[movie.id] = movie;
    });
    return map;
  }, [movies]);

  const searchMovies = useCallback(async (searchString: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchMovies(searchString);
      setMovies(response.data);
    } catch (err) {
      setError("Failed to fetch movies");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearMovies = useCallback(() => {
    setMovies([]);
    setError(null);
  }, []);

  const getMovieById = useCallback((id: number) => {
    return movieMap[id];
  }, [movieMap]);

  const contextValue = useMemo(() => ({
    movies,
    movieMap,
    loading,
    error,
    searchMovies,
    clearMovies,
    getMovieById,
  }), [movies, movieMap, loading, error, searchMovies, clearMovies, getMovieById]);

  return (
    <MoviesContext.Provider value={contextValue}>
      {children}
    </MoviesContext.Provider>
  );
};

export const useMovies = () => useContext(MoviesContext);

export type { Movie };
