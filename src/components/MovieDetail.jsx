import React, { useEffect, useState } from "react"; // React와 훅을 가져옵니다.
import { useParams } from "react-router-dom"; // URL 파라미터를 가져오기 위해 useParams를 가져옵니다.

const MovieDetail = () => {
  // 이 컴포넌트는 특정 영화의 상세 정보를 표시합니다.
  
  const { id } = useParams(); // URL에서 영화 ID를 가져옵니다.
  const [movie, setMovie] = useState(null); // 영화 정보를 저장할 상태
  const [error, setError] = useState(''); // 오류 메시지를 저장할 상태

  useEffect(() => {
    // 컴포넌트가 마운트될 때 영화 정보를 API에서 가져옵니다.
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`) 
      .then((response) => {
        if (!response.ok) {
          throw new Error('영화 정보를 불러오는 데 오류가 발생했습니다.'); // 오류 처리
        }
        return response.json(); // JSON 데이터 반환
      })
      .then((data) => {
        setMovie(data); // 영화 정보 상태 업데이트
      })
      .catch((error) => setError("영화 정보 로드 실패: " + error.message)); // 오류 상태 업데이트
  }, [id]); // ID가 변경될 때마다 효과 실행

  if (error) {
    return <p>{error}</p>; // 오류 메시지 표시
  }

  if (!movie) {
    return <p>Loading movie details...</p>; // 영화 정보 로드 중 메시지
  }

  return (
    <div className="movie-detail"> {/* 영화 상세 정보 컨테이너 */}
      <div className="blur-background"></div> {/* 배경 블러 효과 */}
      <h1>{movie.title}</h1> {/* 영화 제목 */}
      <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} /> {/* 배경 이미지 */}
      <p>평점: {movie.vote_average}</p> {/* 영화 평점 */}
      <p>장르: {movie.genres.map(genre => genre.name).join(', ')}</p> {/* 영화 장르 */}
      <p>줄거리: {movie.overview}</p> {/* 영화 줄거리 */}
    </div>
  );
};

export default MovieDetail; // MovieDetail 컴포넌트를 내보냅니다.