import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { MoviesProvider } from "./MoviesContext";
import MovieDetail from "./components/MovieDetail";
import Header from "./components/Header";
import Home from "./components/Home";
import GlobalStyles from "./styles/GlobalStyles";
import ErrorFallback from "./components/ErrorFallback";

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset the state of your app here
        window.location.href = '/home';
      }}
    >
      <MoviesProvider>
        <GlobalStyles />
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/favorites" element={"Favorites Page"} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </MoviesProvider>
    </ErrorBoundary>
  );
}

export default App;
