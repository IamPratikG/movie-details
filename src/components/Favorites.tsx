import React from "react";
import styled from "styled-components";
import { useMovies } from "../MoviesContext";
import List from "./List";

const FavoritesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 2rem;
`;

const NoFavoritesText = styled.p`
  font-size: 1.2rem;
  color: #666;
`;

const Favorites: React.FC = () => {
  const { favorites } = useMovies();

  return (
    <FavoritesContainer>
      <Title>Your Favorite Movies</Title>
      {favorites.length > 0 ? (
        <List movies={favorites} />
      ) : (
        <NoFavoritesText>
          You haven&apos;t added any favorites yet.
        </NoFavoritesText>
      )}
    </FavoritesContainer>
  );
};

export default Favorites;
