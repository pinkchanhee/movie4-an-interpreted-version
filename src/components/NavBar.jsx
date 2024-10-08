import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ onSearch, user, handleLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <nav className="navbar">
      <h1>PINK World</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/mypage">My Page</Link>
        {user ? (
          <div 
            className="user-thumbnail" 
            onMouseEnter={() => setMenuOpen(true)} 
            onMouseLeave={() => setMenuOpen(false)}
          >
            <span role="img" aria-label="user">❤️</span>
            {menuOpen && (
              <div className="dropdown-menu">
                <Link to="/mypage">관심 목록</Link>
                <button onClick={handleLogout}>로그아웃</button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
      <input
        type="text"
        className="search-input"
        placeholder="영화 이름 검색"
        value={searchTerm}
        onChange={handleInputChange}
      />
    </nav>
  );
};

export default NavBar;