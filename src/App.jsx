import React, { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";
import { Routes, Route } from 'react-router-dom';
import MovieDetail from './components/MovieDetail';
import NavBar from './components/NavBar';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { fetchMovies } from './api';
import useDebounce from './useDebounce';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 200);

    useEffect(() => {
        const searchMovies = async () => {
            if (debouncedSearchTerm) {
                const results = await fetchMovies(debouncedSearchTerm);
                setMovies(results);
            } else {
                fetchPopularMovies();
            }
        };

        searchMovies();
    }, [debouncedSearchTerm]);

    const fetchPopularMovies = () => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('네트워크 응답이 올바르지 않습니다.');
                }
                return response.json();
            })
            .then((data) => {
                if (data && Array.isArray(data.results)) {
                    setMovies(data.results);
                } else {
                    setError("데이터 형식이 올바르지 않습니다.");
                }
            })
            .catch((error) => {
                setError("데이터 로드 실패: " + error.message);
            });
    };

    useEffect(() => {
        fetchPopularMovies();
    }, []);

    return (
        <>
            <NavBar onSearch={setSearchTerm} />
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
                <Route path="/login" element={<Login />} />
            </Routes>
        </>
    );
};

export default App;