import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import { useMovies } from "../MoviesContext";
import MovieCard from "./MovieCard";
import PaginationControls from "./PaginationControls";
import { Movie } from "../types/Movie";

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

interface ListProps {
  movies: Movie[];
}

const List: React.FC<ListProps> = React.memo(function List({
  movies,
}: ListProps) {
  const { currentPage, itemsPerPage, setCurrentPage } = useMovies();

  // Reset to page 1 when filteredMovies changes
  useEffect(() => {
    setCurrentPage(1);
  }, [movies, setCurrentPage]);

  const paginatedMovies = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return movies.slice(startIndex, startIndex + itemsPerPage);
  }, [movies, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(movies.length / itemsPerPage);

  const memoizedMovieCards = useMemo(() => {
    return paginatedMovies.map((movie) => (
      <MovieCard key={movie.id} movie={movie} />
    ));
  }, [paginatedMovies]);

  return (
    <>
      <ListContainer>{memoizedMovieCards}</ListContainer>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
});

export default List;
