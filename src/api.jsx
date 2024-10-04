const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const fetchMovies = async (searchTerm) => {
    if (!searchTerm) return [];
    
    const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchTerm)}`
    );
    
    const data = await response.json();
    return data.results;
};