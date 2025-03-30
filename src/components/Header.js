import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <h1>BookHaven</h1>
        </Link>
      </div>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {isAuthenticated && (
            <>
              <li>
                <Link to="/add-book">Add Book</Link>
              </li>
              <li>
                <Link to="/favorites">Favorites</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <div className="auth-section">
        {isAuthenticated ? (
          <div className="user-info">
            <span>Welcome, {user.name}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        ) : (
          <Link to="/login" className="login-btn">Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header;