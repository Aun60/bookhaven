import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';
import { useBooks } from '../context/BookContext';
import { searchBooks } from '../services/bookService';
import './Home.css';

const Home = () => {
  const { books, loading, error } = useBooks();
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
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
    return <div className="loading">Fetching books...</div>;
  }

  if (error) {
    return <div className="error-message">Error loading data: {error}</div>;
  }

  return (
    <div className="home-page">
      <header className="hero-section">
        <SearchBar onSearch={handleSearch} />
      </header>

      <main className="books-section">
        <h2>{searchQuery ? `Results for "${searchQuery}"` : 'Explore Our Library'}</h2>

        {isSearching ? (
          <div className="loading">Searching...</div>
        ) : filteredBooks.length === 0 ? (
          <div className="no-results">
            {searchQuery ? `No books found for "${searchQuery}"` : 'No books available'}
          </div>
        ) : (
          <div className="books-grid">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
