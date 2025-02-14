import React from "react";
import { render, screen } from "@testing-library/react";
import { MoviesProvider } from "../MoviesContext";
import MovieDetail from "../components/MovieDetail";
import { mockMovies } from "./mockData";

jest.mock("../MoviesContext", () => ({
  useMovies: jest.fn(() => ({
    getMovieById: jest.fn(() => mockMovies[0]),
    addToFavorites: jest.fn(),
    removeFromFavorites: jest.fn(),
    isFavorite: jest.fn(() => false),
  })),
}));

describe("MovieDetail", () => {
  it("renders movie details with mock data", () => {
    render(
      <MoviesProvider>
        <MovieDetail />
      </MoviesProvider>
    );

    expect(screen.getByText("The Prestige")).toBeInTheDocument();
    expect(screen.getByText(/Director:/)).toHaveTextContent(
      "Director: Christopher Nolan"
    );
  });
});
