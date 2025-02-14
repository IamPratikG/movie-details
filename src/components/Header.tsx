import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";
import { useMovies } from "../MoviesContext";

const StyledHeader = styled.header`
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
  const { clearMovies } = useMovies();

  return (
    <StyledHeader>
      <HeaderContent>
        <Logo to="/" onClick={clearMovies}>Movie Gallery</Logo>
        <SearchBox />
        <Nav>
          <NavLink to="/" onClick={clearMovies}>Home</NavLink>
        </Nav>
      </HeaderContent>
    </StyledHeader>
  );
};

export default React.memo(Header);
