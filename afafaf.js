import React from 'react';
import movieDetailData from './data/movieDetailData.json';

const MovieDetail = () => {
  const movie = movieDetailData.results ? movieDetailData.results[0] : null;

  return (
    <div className="movie-detail">
      {movie ? (
        <>
          <h1>{movie.title}</h1>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt={movie.title}
          />
          <p>평점: {movie.vote_average}</p>
          <p>
            장르: {movie.genres && Array.isArray(movie.genres) ? movie.genres.map(genre => genre.name).join(', ') : '정보 없음'}
          </p>
          <p>줄거리: {movie.overview}</p>
        </>
      ) : (
        <p>영화 정보를 불러오는 중입니다...</p>
      )}
    </div>
  );
};

export default MovieDetail;