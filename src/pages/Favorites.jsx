import React from 'react';
import { Link } from 'react-router-dom';
import BookCard from '../components/BookCard';
// import BookCard from '../components/Bookcard';
import { useBooks } from '../context/BookContext';
import './Favorites.css';

const Favorites = () => {
  const { loading, error, getFavoriteBooks } = useBooks();
  
  const favoriteBooks = getFavoriteBooks();

  if (loading) {
    return <div className="loading">Loading favorite books...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="favorites-page">
      <h1>Your Favorite Books</h1>
      
      {favoriteBooks.length === 0 ? (
        <div className="no-favorites">
          <p>You haven't added any books to your favorites yet.</p>
          <p>
            Go to the <Link to="/">home page</Link> to browse books and add them to your favorites.
          </p>
        </div>
      ) : (
        <>
          <p className="favorites-count">
            You have {favoriteBooks.length} book{favoriteBooks.length !== 1 ? 's' : ''} in your favorites
          </p>
          
          <div className="books-grid">
            {favoriteBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Favorites;