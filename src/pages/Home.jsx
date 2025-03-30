import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';
// import BookCard from '../components/Bookcard';
import SearchBar from '../components/SearchBar';
// import SearchBar from '../components/Searchbar';
import { useBooks } from '../context/BookContext';
import { searchBooks } from '../services/bookService';
import './Home.css';

const Home = () => {
  const { books, loading, error } = useBooks();
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Initialize with all books
    setFilteredBooks(books);
  }, [books]);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setFilteredBooks(books);
      setSearchQuery('');
      return;
    }

    setIsSearching(true);
    setSearchQuery(query);

    try {
      const results = await searchBooks(query);
      setFilteredBooks(results);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading books...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Welcome to BookHaven</h1>
        <p>Discover your next favorite book in our collection</p>
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="books-section">
        <h2>
          {searchQuery
            ? `Search Results for "${searchQuery}"`
            : 'Browse Our Collection'}
        </h2>

        {isSearching ? (
          <div className="loading">Searching...</div>
        ) : filteredBooks.length === 0 ? (
          <div className="no-results">
            {searchQuery
              ? `No books found matching "${searchQuery}"`
              : 'No books available'}
          </div>
        ) : (
          <div className="books-grid">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;