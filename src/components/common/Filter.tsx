import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Button from "./styledButton";

const FilterContainer = styled.div`
  position: relative;
`;

const DropdownContainer = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  min-width: 120px;
  max-height: 600px;
  overflow-y: auto;
  background-color: #f9f9f9;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  border-radius: 8px;
  padding: ${(props) => (props.isVisible ? "16px" : "0")};
  display: ${(props) => (props.isVisible ? "block" : "none")};
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const CheckboxLabel = styled.label`
  margin-bottom: 8px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 16px;
`;

interface FilterProps {
  filters: Record<string, (string | number)[]>;
  selectedValues: Record<string, (string | number)[]>;
  onChange: (header: string, values: (string | number)[]) => void;
  onApplyFilters: () => void;
}

const Filter: React.FC<FilterProps> = ({
  filters,
  selectedValues,
  onChange,
  onApplyFilters,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleCheckboxChange = (header: string, value: string | number) => {
    const currentValues = selectedValues[header] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    onChange(header, newValues);
  };

  const handleApplyFilters = () => {
    setIsVisible(false);
    onApplyFilters();
  };

  const handleClearFilters = () => {
    Object.keys(filters).forEach((header) => onChange(header, []));
    setIsVisible(false);
    onApplyFilters();
  };

  // Collapse dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <FilterContainer ref={dropdownRef}>
      <Button onClick={() => setIsVisible(!isVisible)}>Filters</Button>
      <DropdownContainer isVisible={isVisible}>
        {Object.entries(filters).map(([header, options]) => (
          <div key={header}>
            <h4>{header}</h4>
            <CheckboxGroup>
              {options.map((option) => (
                <CheckboxLabel key={option}>
                  <input
                    type="checkbox"
                    checked={selectedValues[header]?.includes(option) || false}
                    onChange={() => handleCheckboxChange(header, option)}
                  />
                  {option}
                </CheckboxLabel>
              ))}
            </CheckboxGroup>
          </div>
        ))}
        <ButtonGroup>
          <Button onClick={handleApplyFilters}>Apply Filters</Button>
          <Button onClick={handleClearFilters}>Clear Filters</Button>
        </ButtonGroup>
      </DropdownContainer>
    </FilterContainer>
  );
};

export default Filter;
