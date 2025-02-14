import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../MoviesContext';

const MovieCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }
`;

const MovieImage = styled.img`
  width: 100%;
  height: 375px;
  object-fit: cover;
`;

const MovieInfo = styled.div`
  padding: 1rem;
`;

const MovieTitle = styled.h2`
  font-size: 1.2rem;
  margin: 0 0 0.5rem 0;
`;

const MovieDetail = styled.p`
  font-size: 0.9rem;
  margin: 0.2rem 0;
  color: #666;
`;

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <MovieCardContainer onClick={handleClick}>
      <MovieImage src={movie.poster_image_search} alt={movie.title} />
      <MovieInfo>
        <MovieTitle>{movie.title}</MovieTitle>
        <MovieDetail>Year: {movie.release_year}</MovieDetail>
        <MovieDetail>Director: {movie.director}</MovieDetail>
        <MovieDetail>Rating: {movie.rating}/10</MovieDetail>
      </MovieInfo>
    </MovieCardContainer>
  );
};

export default MovieCard;
