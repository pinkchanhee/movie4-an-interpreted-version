// TMDB API 키를 환경 변수에서 가져옵니다.
// 환경 변수는 코드에 직접적으로 중요한 정보를 숨길 수 있게 해줍니다.
const API_KEY = import.meta.env.VITE_TMDB_API_KEY; 

// 영화 검색을 위한 비동기 함수 정의
export const fetchMovies = async (searchTerm) => {
    // 검색어가 없으면 빈 배열을 반환합니다. 
    // 이렇게 하면 불필요한 API 호출을 막을 수 있습니다.
    if (!searchTerm) return []; 
    
    // TMDB API에 영화 검색 요청을 보냅니다.
    // encodeURIComponent는 검색어에 특수 문자가 포함되어 있을 때 안전하게 인코딩합니다.
    const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchTerm)}`
    );
    
    // 응답을 JSON 형식으로 변환하여 JavaScript 객체로 만듭니다.
    const data = await response.json(); 
    // 영화 목록을 반환합니다.
    return data.results; 
};