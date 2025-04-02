import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const NavigationBar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const signOut = async () => {
    await logout();
    navigate('/');
  };

  const renderUserLinks = () => (
    <>
      <li>
        <Link to="/add-book">Add New Book</Link>
      </li>
      <li>
        <Link to="/favorites">My Saved Books</Link>
      </li>
    </>
  );

  const renderAuthControls = () => (
    isAuthenticated ? (
      <div className="user-profile">
        <span>Hello, {user.name}</span>
        <button onClick={signOut} className="sign-out-button">Sign Out</button>
      </div>
    ) : (
      <Link to="/login" className="sign-in-button">Sign In</Link>
    )
  );

  return (
    <div className="top-navigation-bar">
      <div className="brand-logo">
        <Link to="/">
          <h1>BookHaven</h1>
        </Link>
      </div>
      
      <div className="navigation-menu">
        <ul>
          <li>
            <Link to="/">Browse Books</Link>
          </li>
          {isAuthenticated && renderUserLinks()}
        </ul>
      </div>
      
      <div className="user-authentication">
        {renderAuthControls()}
      </div>
    </div>
  );
};

export default NavigationBar;