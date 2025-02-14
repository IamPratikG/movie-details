import React from "react";
import { render, screen } from "@testing-library/react";
import Favorites from "../components/Favorites";
import { mockMovies } from "./mockData";

jest.mock("../MoviesContext", () => ({
  useMovies: jest.fn(() => ({
    favorites: [mockMovies],
  })),
}));

describe("Favorites", () => {
  it("renders favorites page with no favorites", () => {
    jest.spyOn(React, "useContext").mockImplementation(() => ({
      favorites: [],
      addToFavorites: jest.fn(),
      removeFromFavorites: jest.fn(),
      isFavorite: jest.fn(),
    }));

    render(<Favorites />);

    expect(screen.getByText("Your Favorite Movies")).toBeInTheDocument();
    expect(
      screen.getByText("You haven't added any favorites yet.")
    ).toBeInTheDocument();
  });

  it("renders favorite movies when available", () => {
    render(<Favorites />);

    expect(screen.getByText("Casablanca")).toBeInTheDocument();
  });
});
