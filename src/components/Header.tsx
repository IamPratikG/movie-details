import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import SearchBox from "./SearchBox";
import { useMovies } from "../MoviesContext";
import Filter from "./common/Filter";

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Header: React.FC = () => {
  const { movies, setFilteredMovies, clearMovies } = useMovies();

  const location = useLocation();

  // Local state for filters
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, (string | number)[]>
  >({
    Genre: [],
    "Release Year": [],
    Rating: [],
  });

  // Extract unique filter options
  const genres = Array.from(new Set(movies.flatMap((movie) => movie.genres)));
  const releaseYears = Array.from(
    new Set(movies.map((movie) => movie.release_year))
  ).sort((a, b) => b - a);

  const ratingOptions = [...Array(10).keys()].map((rating) => `${rating + 1}+`);

  const filters = {
    Genre: genres,
    "Release Year": releaseYears,
    Rating: ratingOptions,
  };

  const handleFilterChange = (header: string, values: (string | number)[]) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [header]: values,
    }));
  };

  const applyFilters = () => {
    let filteredMovies = movies;

    // Filter by Genre
    if (selectedFilters.Genre.length > 0) {
      filteredMovies = filteredMovies.filter((movie) =>
        movie.genres.some((genre) => selectedFilters.Genre.includes(genre))
      );
    }

    // Filter by Release Year
    if (selectedFilters["Release Year"].length > 0) {
      filteredMovies = filteredMovies.filter((movie) =>
        selectedFilters["Release Year"].includes(movie.release_year)
      );
    }

    // Filter by Rating
    if (selectedFilters.Rating.length > 0) {
      filteredMovies = filteredMovies.filter((movie) =>
        selectedFilters.Rating.some(
          (rating) => movie.rating >= parseInt(rating as string)
        )
      );
    }

    setFilteredMovies(filteredMovies);
  };

  useEffect(() => {
    // If no filters are applied, show all movies
    if (
      selectedFilters.Genre.length === 0 &&
      selectedFilters["Release Year"].length === 0 &&
      selectedFilters.Rating.length === 0
    ) {
      setFilteredMovies(movies);
    }
  }, [selectedFilters, movies, setFilteredMovies]);

  useEffect(() => {
    setSelectedFilters({
      Genre: [],
      "Release Year": [],
      Rating: [],
    });
  }, [movies]);

  return (
    <StyledHeader>
      <HeaderContent>
        <Logo to="/" onClick={clearMovies}>
          Movie Gallery
        </Logo>
        <SearchBox />
        <Nav>
          <NavLink to="/" onClick={clearMovies}>
            Home
          </NavLink>
          <NavLink to="/favorites">Favorites</NavLink>
        </Nav>

        {/* Show Filters only on Home page */}
        {location.pathname === "/home" && (
          <Filter
            filters={filters}
            selectedValues={selectedFilters}
            onChange={handleFilterChange}
            onApplyFilters={applyFilters}
          />
        )}
      </HeaderContent>
    </StyledHeader>
  );
};

export default Header;
