import React from "react";
import styled from "styled-components";
import { useMovies } from "../MoviesContext";
import List from "./List";
import Loader from "./Loader";

const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 80px);
  padding: 2rem;
  font-family: "Roboto", sans-serif;
`;

const WelcomeText = styled.h1`
  font-size: 2.5rem;
  color: #333;
  text-align: center;
`;

const NoResultsText = styled.h2`
  font-size: 1.5rem;
  color: #666;
  text-align: center;
`;

const Home: React.FC = () => {
  const { movies, loading, hasSearched } = useMovies();

  if (loading) {
    return <Loader />;
  }

  if (!hasSearched) {
    return (
      <HomeContainer>
        <WelcomeText>Welcome to Movie Details Online!</WelcomeText>
      </HomeContainer>
    );
  }

  if (movies.length === 0) {
    return (
      <HomeContainer>
        <NoResultsText>No movies found</NoResultsText>
      </HomeContainer>
    );
  }

  return (
    <HomeContainer>
      <List movies={movies} />
    </HomeContainer>
  );
};

export default Home;
