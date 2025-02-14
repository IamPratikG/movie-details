import React from "react";
import styled from "styled-components";

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8d7da;
  color: #721c24;
  padding: 2rem;
`;

const ErrorTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.pre`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

const RetryButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c82333;
  }
`;

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <ErrorContainer role="alert">
      <ErrorTitle>Something went wrong:</ErrorTitle>
      <ErrorMessage>{error.message}</ErrorMessage>
      <RetryButton onClick={resetErrorBoundary}>Try again</RetryButton>
    </ErrorContainer>
  );
};

export default ErrorFallback;
