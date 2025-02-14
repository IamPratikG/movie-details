import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MovieCard from "../components/MovieCard";
import { mockMovies } from "./mockData";

jest.mock("../MoviesContext", () => ({
  useMovies: jest.fn(() => ({
    addToFavorites: jest.fn(),
    removeFromFavorites: jest.fn(),
    isFavorite: jest.fn(() => false),
  })),
}));

describe("MovieCard", () => {
  it("renders movie card with details", () => {
    render(<MovieCard movie={mockMovies[0]} />);

    expect(screen.getByText("The Prestige")).toBeInTheDocument();
    expect(screen.getByText("Year: 2006")).toBeInTheDocument();
  });

  it("calls favorite toggle function on button click", () => {
    const addToFavorites = jest.fn();

    jest.spyOn(React, "useContext").mockImplementation(() => ({
      addToFavorites,
      removeFromFavorites: jest.fn(),
      isFavorite: jest.fn(() => false),
    }));

    render(<MovieCard movie={mockMovies[0]} />);

    const button = screen.getByText("Add to Favorites");
    fireEvent.click(button);

    expect(addToFavorites).toHaveBeenCalledWith(mockMovies[0]);
  });
});
