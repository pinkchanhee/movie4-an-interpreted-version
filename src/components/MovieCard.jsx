import React from 'react'; // React를 가져옵니다.
import { Link } from 'react-router-dom'; // 라우팅을 위해 Link 컴포넌트를 가져옵니다.
import { createClient } from '@supabase/supabase-js'; // Supabase 클라이언트를 가져옵니다.

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; // Supabase URL 환경 변수
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY; // Supabase 키 환경 변수
const supabase = createClient(supabaseUrl, supabaseKey); // Supabase 클라이언트 초기화

const handleBookmark = async (movieId) => { // 북마크 추가 함수 정의
  // 사용자가 특정 영화를 북마크할 수 있도록 하는 함수입니다.
  
  const { data: { user } } = await supabase.auth.getUser(); // 현재 사용자 정보 가져오기
  if (!user) {
    alert('You can bookmark after logging in'); // 로그인하지 않은 경우 경고
    return; // 함수 종료
  }

  // 사용자의 ID와 영화 ID를 사용하여 북마크를 추가합니다.
  const { error } = await supabase.from('bookmarks').insert([{ user_id: user.id, movie_id: movieId }]); 

  if (error) {
    alert('Failed to bookmark the movie!'); // 오류 발생 시 경고
  } else {
    alert('Movie bookmarked successfully!'); // 성공 시 알림
  }
};

const MovieCard = ({ id, title, posterPath, voteAverage }) => { // 영화 카드 컴포넌트 정의
  // 이 컴포넌트는 각 영화의 정보를 카드 형식으로 표시합니다.
  
  const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`; // 포스터 이미지 URL 생성
  return (
    <div className="movie-card"> {/* 영화 카드 컨테이너 */}
      <Link to={`/details/${id}`}> {/* 영화 상세 페이지로 링크 */}
        <img src={posterUrl} alt={title} /> {/* 포스터 이미지 */}
        <h3>{title}</h3> {/* 영화 제목 */}
        <p>평점: {voteAverage}</p> {/* 영화 평점 */}
        <button className="bookmark-button" onClick={() => handleBookmark(id)}>북마크</button> {/* 북마크 버튼 */}
      </Link>
    </div>
  );
};

export default MovieCard; // MovieCard 컴포넌트를 내보냅니다.