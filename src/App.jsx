import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import MovieCard from "./components/MovieCard";
import MovieDetail from './components/MovieDetail';
import NavBar from './components/NavBar';
import SignUp from './components/SignUp';
import Login from './components/Login';
import MyPage from './components/MyPage';
import { fetchMovies } from './api';
import useDebounce from './useDebounce';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const App = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 200);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}`);
        if (!response.ok) throw new Error('네트워크 응답이 올바르지 않습니다.');
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        setError("데이터 로드 실패: " + error.message);
      }
    };

    fetchPopularMovies();
  }, []);

  useEffect(() => {
    const searchMovies = async () => {
      if (debouncedSearchTerm) {
        const results = await fetchMovies(debouncedSearchTerm);
        setMovies(results);
      }
    };

    searchMovies();
  }, [debouncedSearchTerm]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const handleLogin = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("로그인 실패:", error.message);
      return { error };
    } else {
      setUser(data.user);
      return {};
    }
  };

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} onSearch={setSearchTerm} />
      <Routes>
        <Route path="/" element={
          <div className="movie-list">
            {error ? (
              <div>{error}</div>
            ) : movies.length === 0 ? (
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
        } />
        <Route path="/details/:id" element={<MovieDetail />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </>
  );
};

export default App;