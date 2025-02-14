import React from "react";
import styled from "styled-components";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  padding: 15px 0;
  background-color: #f9f9f9;
  border-top: 1px solid #ddd;
`;

const PageButton = styled.button<{ isActive?: boolean }>`
  margin: 0 5px;
  padding: 10px 15px;
  border: ${(props) =>
    props.isActive ? "2px solid #0070f3" : "1px solid #ccc"};
  background-color: ${(props) => (props.isActive ? "#0070f3" : "white")};
  color: ${(props) => (props.isActive ? "white" : "black")};
  cursor: pointer;
  font-size: 14px;
  border-radius: 4px;

  &:hover {
    background-color: ${(props) => (props.isActive ? "#005bb5" : "#f0f0f0")};
    border-color: ${(props) => (props.isActive ? "#005bb5" : "#bbb")};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    background-color: white;
    border-color: #ccc;
    color: #999;
  }
`;

const ArrowButton = styled(PageButton)`
  font-weight: bold;
`;

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = [];

  for (
    let i = Math.max(1, currentPage - 2);
    i <= Math.min(totalPages, currentPage + 2);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <PaginationContainer>
      <ArrowButton
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        &laquo; Prev
      </ArrowButton>
      {pageNumbers.map((number) => (
        <PageButton
          key={number}
          isActive={number === currentPage}
          onClick={() => onPageChange(number)}
        >
          {number}
        </PageButton>
      ))}
      <ArrowButton
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        Next &raquo;
      </ArrowButton>
    </PaginationContainer>
  );
};

export default PaginationControls;
