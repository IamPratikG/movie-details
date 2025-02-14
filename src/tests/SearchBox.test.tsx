import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MoviesProvider } from "../MoviesContext";
import SearchBox from "../components/SearchBox";

describe("SearchBox", () => {
  it("renders search input", () => {
    render(
      <MoviesProvider>
        <SearchBox />
      </MoviesProvider>
    );
    const inputElement = screen.getByPlaceholderText("Search movies...");
    expect(inputElement).toBeInTheDocument();
  });

  it("updates input value on typing", () => {
    render(
      <MoviesProvider>
        <SearchBox />
      </MoviesProvider>
    );
    const inputElement = screen.getByPlaceholderText("Search movies...");
    fireEvent.change(inputElement, { target: { value: "Casino Royale" } });
    expect(inputElement).toHaveValue("Casino Royale");
  });
});
