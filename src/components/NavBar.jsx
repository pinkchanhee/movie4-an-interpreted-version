import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar">
      <h1>PINK World</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/signup">Sing Up</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default NavBar;