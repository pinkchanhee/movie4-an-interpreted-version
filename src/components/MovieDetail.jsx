import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('영화 정보를 불러오는 데 오류가 발생했습니다.');
        }
        return response.json();
      })
      .then((data) => {
        setMovie(data);
      })
      .catch((error) => setError("영화 정보 로드 실패: " + error.message));
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!movie) {
    return <p>Loading movie details...</p>;
  }

  return (
    <div className="movie-detail">
      <div className="blur-background"></div>
      <h1>{movie.title}</h1>
      <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} />
      <p>평점: {movie.vote_average}</p>
      <p>장르: {movie.genres.map(genre => genre.name).join(', ')}</p>
      <p>줄거리: {movie.overview}</p>
    </div>
  );
};

export default MovieDetail;