import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";

const App = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("/movieListData.json")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        if (data && Array.isArray(data.results)) {
          setMovies(data.results);
        } else {
          console.error("데이터 형식이 올바르지 않습니다.");
        }
      })
      .catch((error) => console.error("데이터 로드 실패:", error));
  }, []);

  return (
    <div className="movie-list">
      {movies.length === 0 ? (
        <div>영화 목록을 불러오는 중입니다...</div>
      ) : (
        movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            posterPath={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            voteAverage={movie.vote_average}
          />
        ))
      )}
    </div>
  );
};

export default App;