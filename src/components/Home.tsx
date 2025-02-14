import React from 'react';
import styled from 'styled-components';
import { useMovies } from '../MoviesContext';
import List from './List';

const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 80px); // Adjust based on your header height
  padding: 2rem;
  font-family: 'Roboto', sans-serif;
`;

const WelcomeText = styled.h1`
  font-size: 2.5rem;
  color: #333;
  text-align: center;
  padding: 2rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const NoResultsText = styled.h2`
  font-size: 1.5rem;
  color: #666;
  text-align: center;
`;

const Home: React.FC = () => {
  const { movies, loading } = useMovies();

  if (loading) {
    return <HomeContainer>Loading...</HomeContainer>;
  }

  if (movies.length === 0) {
    return (
      <HomeContainer>
        <WelcomeText>Welcome to Movie Details Online!</WelcomeText>
      </HomeContainer>
    );
  }

  return (
    <HomeContainer>
      {movies.length > 0 ? (
        <List movies={movies} />
      ) : (
        <NoResultsText>Sorry, no movies found</NoResultsText>
      )}
    </HomeContainer>
  );
};

export default Home;
