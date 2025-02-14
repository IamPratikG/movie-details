import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useMovies } from "../MoviesContext";
import { Movie } from "../types/Movie";
import Button from "./common/styledButton";
import Loader from "./Loader";

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
`;

const InfoItem = styled.p`
  font-size: 1.1rem;
`;

const Description = styled.p`
  font-size: 1.1rem;
`;

const ErrorText = styled.div`
  font-size: 1.5rem;
`;

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getMovieById, addToFavorites, removeFromFavorites, isFavorite } =
    useMovies();

  const [movie, setMovie] = useState<Movie | null | undefined>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (id) {
        try {
          const fetchedMovie = await getMovieById(Number(id));
          if (!fetchedMovie) {
            console.error(`Movie with ID ${id} not found.`);
          }
          setMovie(fetchedMovie || null);
        } catch (error) {
          console.error("Error fetching movie details:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchMovieDetails();

    return () => setLoading(false);
  }, [id, getMovieById]);

  if (loading) return <Loader />;

  if (!movie) return <ErrorText>Movie not found!</ErrorText>;

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
        {/* Updated Genre List */}
        <InfoItem>
          <strong>Genre:</strong> {movie.genres.join(", ")}
        </InfoItem>
        <Description>
          <strong>Plot:</strong>
          {` ${movie.description}`}
        </Description>
        <Button onClick={handleFavoriteClick}>
          {isFavorite(movie.id) ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
      </MovieInfo>
    </MovieDetailContainer>
  );
};

export default MovieDetail;
