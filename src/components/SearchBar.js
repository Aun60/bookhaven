import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="search-container">
      <div className="search-hero">
        
        <div className="search-bar" role="search">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <input
              type="search"
              aria-label="Search books"
              placeholder="Title, author, or ISBN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              autoComplete="off"
            />
            <button 
              type="submit" 
              className="search-button"
              disabled={!searchQuery.trim()}
            >
              <span className="search-icon">🔍</span>
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;