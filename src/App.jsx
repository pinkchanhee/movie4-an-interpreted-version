// React와 필요한 훅을 가져옵니다.
import React, { useState, useEffect } from "react"; 
// 라우팅을 위해 필요한 컴포넌트를 가져옵니다.
import { Routes, Route, useNavigate } from 'react-router-dom'; 
// 각 컴포넌트를 가져옵니다.
import MovieCard from "./components/MovieCard"; 
import MovieDetail from './components/MovieDetail'; 
import NavBar from './components/NavBar'; 
import SignUp from './components/SignUp'; 
import Login from './components/Login'; 
import MyPage from './components/MyPage'; 
import { fetchMovies } from './api'; // 영화 검색 API 함수를 가져옵니다.
import useDebounce from './useDebounce'; // 디바운스 훅을 가져옵니다.
import { createClient } from '@supabase/supabase-js'; // Supabase 클라이언트를 가져옵니다.

// Supabase URL과 키를 환경 변수에서 가져옵니다.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; 
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY; 
// Supabase 클라이언트를 초기화합니다.
const supabase = createClient(supabaseUrl, supabaseKey); 

// App 컴포넌트를 정의합니다.
const App = () => {
  // 상태 변수를 정의합니다.
  const [movies, setMovies] = useState([]); // 영화 목록을 저장할 상태
  const [error, setError] = useState(''); // 오류 메시지를 저장할 상태
  const [searchTerm, setSearchTerm] = useState(''); // 검색어를 저장할 상태
  const [user, setUser] = useState(null); // 사용자 정보를 저장할 상태
  const debouncedSearchTerm = useDebounce(searchTerm, 200); // 디바운스된 검색어
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수

  // 컴포넌트가 마운트될 때 사용자 정보를 가져오는 useEffect
  useEffect(() => {
    const fetchUser = async () => {
      // Supabase에서 사용자 정보를 가져옵니다.
      const { data } = await supabase.auth.getUser(); 
      // 사용자가 존재하면
      if (data.user) {
        setUser(data.user); // 사용자 정보를 상태에 저장
        navigate('/'); // 홈 페이지로 이동
      }
    };
    fetchUser(); // 사용자 정보를 가져오는 함수 호출
  }, []); // 의존성 배열이 비어 있으므로 컴포넌트가 처음 렌더링될 때만 실행

  // 컴포넌트가 마운트될 때 인기 영화를 가져오는 useEffect
  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        // TMDB API에서 인기 영화를 요청합니다.
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}`);
        // 응답이 실패하면 오류를 발생시킵니다.
        if (!response.ok) throw new Error(`네트워크 응답이 올바르지 않습니다: ${response.statusText}`); 
        const data = await response.json(); // 응답을 JSON으로 변환
        setMovies(data.results); // 영화 목록 상태 업데이트
      } catch (error) {
        // 오류 발생 시 오류 메시지를 상태에 저장
        setError("데이터 로드 실패: " + error.message); 
      }
    };

    fetchPopularMovies(); // 인기 영화 가져오기 함수 호출
  }, []); // 의존성 배열이 비어 있으므로 컴포넌트가 처음 렌더링될 때만 실행

  // 디바운스된 검색어에 따라 영화를 검색하는 useEffect
  useEffect(() => {
    const searchMovies = async () => {
      // 디바운스된 검색어가 존재하면
      if (debouncedSearchTerm) {
        const results = await fetchMovies(debouncedSearchTerm); // 영화 검색
        setMovies(results); // 검색 결과를 상태에 저장
      }
    };

    searchMovies(); // 영화 검색 함수 호출
  }, [debouncedSearchTerm]); // 디바운스된 검색어가 변경될 때마다 실행

  // 로그아웃 처리 함수
  const handleLogout = async () => {
    await supabase.auth.signOut(); // Supabase에서 로그아웃 처리
    setUser(null); // 사용자 상태를 null로 설정
    navigate('/login'); // 로그인 페이지로 이동
  };

  // 로그인 처리 함수
  const handleLogin = async (email, password) => {
    // Supabase에서 이메일과 비밀번호로 로그인 시도
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // 로그인 실패 시
    if (error) {
      console.error("로그인 실패:", error.message); // 오류 로그
      return { error }; // 오류 반환
    } else {
      setUser(data.user); // 로그인 성공 시 사용자 상태 업데이트
      return {}; // 오류가 없을 경우 빈 객체 반환
    }
  };

  // 구글 로그인을 처리하는 함수
  const handleGoogleLogin = async () => {
    // Supabase에서 구글 OAuth 로그인 시도
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline', // 오프라인 접근 권한 요청
          prompt: 'consent', // 사용자에게 동의 요청
        }
      }
    });

    // 구글 로그인 실패 시
    if (error) {
      console.error("구글 로그인 실패:", error.message); // 오류 로그
    }
  };

  return (
    <>
      {/* 네비게이션 바를 렌더링합니다. 사용자 정보와 로그아웃 함수, 검색어 설정 함수를 전달합니다. */}
      <NavBar user={user} handleLogout={handleLogout} onSearch={setSearchTerm} /> 
      <Routes>
        {/* 메인 영화 목록 페이지 */}
        <Route path="/" element={
          <div className="movie-list">
            {error ? (
              // 오류가 있을 경우 오류 메시지 표시
              <div>{error}</div> 
            ) : movies.length === 0 ? (
              // 영화 목록이 비어있을 경우 로딩 메시지 표시
              <div>영화 목록을 불러오는 중입니다...</div> 
            ) : (
              // 영화 카드 컴포넌트를 반복하여 렌더링
              movies.map((movie) => (
                <MovieCard
                  key={movie.id} // 각 영화 카드에 고유한 키 부여
                  id={movie.id} // 영화 ID
                  title={movie.title} // 영화 제목
                  posterPath={`${movie.poster_path}`} // 영화 포스터 경로
                  voteAverage={movie.vote_average} // 영화 평점
                />
              ))
            )}
          </div>
        } />
        {/* 영화 상세 페이지 */}
        <Route path="/details/:id" element={<MovieDetail />} /> 
        {/* 회원가입 페이지 */}
        <Route path="/signup" element={<SignUp />} /> 
        {/* 로그인 페이지 */}
        <Route path="/login" element={<Login handleLogin={handleLogin} handleGoogleLogin={handleGoogleLogin} />} /> 
        {/* 사용자 페이지 */}
        <Route path="/mypage" element={<MyPage />} /> 
      </Routes>
    </>
  );
};

export default App; // App 컴포넌트를 내보냅니다.