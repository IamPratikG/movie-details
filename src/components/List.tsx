import React from 'react';
import styled from 'styled-components';
import { Movie } from '../MoviesContext';
import MovieCard from './MovieCard';

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

const List: React.FC<ListProps> = ({ movies }) => {
  return (
    <ListContainer>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </ListContainer>
  );
};

export default List;
