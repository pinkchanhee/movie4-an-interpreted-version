import React, { useState } from 'react'; // React와 useState 훅을 가져옵니다.
import { Link } from 'react-router-dom'; // 라우팅을 위해 Link 컴포넌트를 가져옵니다.

const NavBar = ({ onSearch, user, handleLogout }) => {
  // 네비게이션 바 컴포넌트 정의
  // 이 컴포넌트는 애플리케이션의 상단에 위치하며, 사용자 탐색 및 검색 기능을 제공합니다.
  
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태를 관리합니다.
  const [menuOpen, setMenuOpen] = useState(false); // 메뉴 열림 상태를 관리합니다.

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value); // 입력 값 변경 시 상태 업데이트
    onSearch(e.target.value); // 상위 컴포넌트의 검색 함수 호출
  };

  return (
    <nav className="navbar"> {/* 네비게이션 바 컨테이너 */}
      <h1>PINK World</h1> {/* 네비게이션 바 제목 */}
      <div className="nav-links"> {/* 네비게이션 링크 컨테이너 */}
        <Link to="/">Home</Link> {/* 홈 링크 */}
        {user && <Link to="/mypage">My Page</Link>} {/* 사용자 로그인 시 마이페이지 링크 */}
        {user ? ( // 사용자가 로그인한 경우
          <div 
            className="user-thumbnail" 
            onMouseEnter={() => setMenuOpen(true)} // 마우스 오버 시 메뉴 열기
            onMouseLeave={() => setMenuOpen(false)} // 마우스 아웃 시 메뉴 닫기
          >
            <span role="img" aria-label="user">❤️</span> {/* 사용자 아이콘 */}
            {menuOpen && ( // 메뉴가 열려 있을 경우
              <div className="dropdown-menu">
                <Link to="/mypage">북마크 목록</Link> {/* 북마크 목록 링크 */}
                <button onClick={handleLogout}>로그아웃</button> {/* 로그아웃 버튼 */}
              </div>
            )}
          </div>
        ) : ( // 사용자가 로그인하지 않은 경우
          <>
            <Link to="/signup">Sign Up</Link> {/* 회원가입 링크 */}
            <Link to="/login">Login</Link> {/* 로그인 링크 */}
          </>
        )}
      </div>
      <input
        type="text"
        className="search-input" // 검색 입력 필드 스타일
        placeholder="영화 이름 검색" // 검색 입력 필드 플레이스홀더
        value={searchTerm} // 검색어 상태
        onChange={handleInputChange} // 입력 값 변경 시 상태 업데이트
      />
    </nav>
  );
};

export default NavBar; // NavBar 컴포넌트를 내보냅니다.