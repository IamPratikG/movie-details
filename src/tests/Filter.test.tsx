import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Filter from "../components/common/Filter";

describe("Filter Component", () => {
  const mockFilters = {
    Genre: ["Action", "Drama", "Comedy"],
    "Release Year": [2020, 2019, 2018],
    Rating: ["5+", "6+", "7+", "8+"],
  };

  const mockSelectedValues = {
    Genre: [],
    "Release Year": [],
    Rating: [],
  };

  const mockOnChange = jest.fn();
  const mockOnApplyFilters = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the Filters button", () => {
    render(
      <Filter
        filters={mockFilters}
        selectedValues={mockSelectedValues}
        onChange={mockOnChange}
        onApplyFilters={mockOnApplyFilters}
      />
    );

    expect(screen.getByText("Filters")).toBeInTheDocument();
  });

  it("opens the dropdown when Filters button is clicked", () => {
    render(
      <Filter
        filters={mockFilters}
        selectedValues={mockSelectedValues}
        onChange={mockOnChange}
        onApplyFilters={mockOnApplyFilters}
      />
    );

    const filtersButton = screen.getByText("Filters");
    fireEvent.click(filtersButton);

    expect(screen.getByText("Genre")).toBeInTheDocument();
    expect(screen.getByText("Release Year")).toBeInTheDocument();
    expect(screen.getByText("Rating")).toBeInTheDocument();
  });

  it("calls onChange when a checkbox is clicked", () => {
    render(
      <Filter
        filters={mockFilters}
        selectedValues={mockSelectedValues}
        onChange={mockOnChange}
        onApplyFilters={mockOnApplyFilters}
      />
    );

    const filtersButton = screen.getByText("Filters");
    fireEvent.click(filtersButton);

    const actionCheckbox = screen.getByLabelText("Action");
    fireEvent.click(actionCheckbox);

    expect(mockOnChange).toHaveBeenCalledWith("Genre", ["Action"]);
  });

  it("calls onApplyFilters when Apply Filters button is clicked", () => {
    render(
      <Filter
        filters={mockFilters}
        selectedValues={mockSelectedValues}
        onChange={mockOnChange}
        onApplyFilters={mockOnApplyFilters}
      />
    );

    const filtersButton = screen.getByText("Filters");
    fireEvent.click(filtersButton);

    const applyButton = screen.getByText("Apply Filters");
    fireEvent.click(applyButton);

    expect(mockOnApplyFilters).toHaveBeenCalled();
  });

  it("calls onChange and clears all filters when Clear Filters button is clicked", () => {
    render(
      <Filter
        filters={mockFilters}
        selectedValues={{
          Genre: ["Action"],
          "Release Year": [2020],
          Rating: ["7+"],
        }}
        onChange={mockOnChange}
        onApplyFilters={mockOnApplyFilters}
      />
    );

    const filtersButton = screen.getByText("Filters");
    fireEvent.click(filtersButton);

    const clearButton = screen.getByText("Clear Filters");
    fireEvent.click(clearButton);

    expect(mockOnChange).toHaveBeenCalledWith("Genre", []);
    expect(mockOnChange).toHaveBeenCalledWith("Release Year", []);
    expect(mockOnChange).toHaveBeenCalledWith("Rating", []);
  });

  it("collapses the dropdown when clicking outside the component", () => {
    render(
      <div>
        <div data-testid="outside">Outside</div>
        <Filter
          filters={mockFilters}
          selectedValues={mockSelectedValues}
          onChange={mockOnChange}
          onApplyFilters={mockOnApplyFilters}
        />
      </div>
    );

    const filtersButton = screen.getByText("Filters");
    fireEvent.click(filtersButton);

    expect(screen.getByText("Genre")).toBeInTheDocument();

    const outsideElement = screen.getByTestId("outside");
    fireEvent.mouseDown(outsideElement);

    expect(screen.queryByText("Genre")).not.toBeInTheDocument();
  });
});
