import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useMovies } from "../MoviesContext";

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 250px;
`;

const SearchButton = styled.button`
  padding: 8px 12px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  margin-left: 8px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0060df;
  }
`;

const SearchBox: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { searchMovies } = useMovies();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = useCallback(async () => {
    if (searchTerm.trim()) {
      try {
        await searchMovies(searchTerm.trim());
        if (location.pathname !== "/home") {
          navigate("/home");
        }
      } catch (error) {
        console.error("Search failed:", error);
      }
    }
  }, [searchTerm, searchMovies, navigate, location.pathname]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    },
    [handleSearch]
  );

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyUp={handleKeyPress}
      />
      <SearchButton onClick={handleSearch}>Search</SearchButton>
    </SearchContainer>
  );
};

export default React.memo(SearchBox);
