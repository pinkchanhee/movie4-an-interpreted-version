import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <nav className="navbar">
            <h1>PINK World</h1>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/signup">Sign Up</Link>
                <Link to="/login">Login</Link>
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