import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Movie, useMovies } from "../MoviesContext";

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

const FavoriteButton = styled.button`
  padding: 8px 12px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  margin-top: 10px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #0060df;
  }
`;

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovies();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <MovieCardContainer onClick={handleClick}>
      <MovieImage src={movie.poster_image_search} alt={movie.title} />
      <MovieInfo>
        <MovieTitle>{movie.title}</MovieTitle>
        <MovieDetail>Year: {movie.release_year}</MovieDetail>
        <MovieDetail>Director: {movie.director}</MovieDetail>
        <MovieDetail>Rating: {movie.rating}/10</MovieDetail>
        <FavoriteButton onClick={handleFavoriteClick}>
          {isFavorite(movie.id) ? "Remove from Favorites" : "Add to Favorites"}
        </FavoriteButton>
      </MovieInfo>
    </MovieCardContainer>
  );
};

export default MovieCard;
