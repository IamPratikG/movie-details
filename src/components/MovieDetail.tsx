import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useMovies } from "../MoviesContext";

const MovieDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 992px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const PosterContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin-bottom: 2rem;

  @media (min-width: 992px) {
    margin-right: 2rem;
    margin-bottom: 0;
  }
`;

const Poster = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const MovieInfo = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

const InfoItem = styled.p`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #555;
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #444;
  margin-top: 1rem;
`;

const GenreList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const GenreItem = styled.li`
  background-color: #e0e0e0;
  padding: 0.3rem 0.8rem;
  border-radius: 16px;
  font-size: 0.9rem;
  color: #333;
`;

const FavoriteButton = styled.button`
  padding: 8px 12px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  margin-top: 10px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0060df;
  }
`;

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getMovieById, addToFavorites, removeFromFavorites, isFavorite } =
    useMovies();
  const movie = getMovieById(Number(id));

  if (!movie) {
    return <div>Movie not found</div>;
  }

  const handleFavoriteClick = () => {
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <MovieDetailContainer>
      <PosterContainer>
        <Poster
          src={movie.poster_image_details}
          alt={`${movie.title} poster`}
        />
      </PosterContainer>
      <MovieInfo>
        <Title>{movie.title}</Title>
        <InfoItem>
          <strong>Director:</strong> {movie.director}
        </InfoItem>
        <InfoItem>
          <strong>Release Date:</strong> {movie.release_date}
        </InfoItem>
        <InfoItem>
          <strong>Runtime:</strong> {movie.runtime} minutes
        </InfoItem>
        <InfoItem>
          <strong>Rating:</strong> {movie.rating}/10
        </InfoItem>
        <InfoItem>
          <strong>Revenue:</strong> ${movie.revenue} million
        </InfoItem>
        <InfoItem>
          <strong>Cast:</strong> {movie.cast.join(", ")}
        </InfoItem>
        <GenreList>
          {movie.genres.map((genre, index) => (
            <GenreItem key={index}>{genre}</GenreItem>
          ))}
        </GenreList>
        <Description>{movie.description}</Description>
        <FavoriteButton onClick={handleFavoriteClick}>
          {isFavorite(movie.id) ? "Remove from Favorites" : "Add to Favorites"}
        </FavoriteButton>
      </MovieInfo>
    </MovieDetailContainer>
  );
};

export default MovieDetail;
