import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useMovies } from "../MoviesContext";
import debounce from "lodash/debounce";

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

const SearchBox: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { searchMovies } = useMovies();
  const navigate = useNavigate();
  const location = useLocation();

  const debouncedSearch = useMemo(
    () =>
      debounce(async (term: string) => {
        if (term.trim()) {
          try {
            await searchMovies(term.trim());
            if (location.pathname !== "/home") {
              navigate("/home");
            }
          } catch (error) {
            console.error("Search failed:", error);
          }
        }
      }, 300),
    [searchMovies, navigate, location.pathname]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, debouncedSearch]);

  useEffect(() => {
    if (
      location.pathname.startsWith("/movie/") ||
      location.pathname === "/favorites"
    ) {
      setSearchTerm("");
      debouncedSearch.cancel();
    }
  }, [location.pathname, debouncedSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={handleInputChange}
      />
    </SearchContainer>
  );
};

export default React.memo(SearchBox);
