import React from 'react';
import { Link } from 'react-router-dom';
import { useBooks } from '../context/BookContext';
import { useAuth } from '../context/AuthContext';
import './BookCard.css';

const BookCard = ({ book }) => {
  const { toggleFavorite, isFavorite } = useBooks();
  const { isAuthenticated } = useAuth();
  
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(book.id);
  };

  return (
    <div className="book-card">
      <Link to={`/book/${book.id}`} className="book-link">
        <div className="book-media">
          <img 
            src={book.cover || '/images/default-book.png'} 
            alt={`Cover of ${book.title}`} 
            loading="lazy"
            className="book-image"
          />
        </div>
        <div className="book-details">
          <h3 className="book-heading">{book.title}</h3>
          <p className="book-creator">By {book.author}</p>
          <div className="book-meta">
            <span className="book-year">{book.yearPublished}</span>
            <span className="book-genre">{book.category}</span>
          </div>
          <p className="book-cost">${book.price?.toFixed(2)}</p>
        </div>
      </Link>
      
      {isAuthenticated && (
        <button 
          className={`bookmark-btn ${isFavorite(book.id) ? 'saved' : ''}`}
          onClick={handleFavoriteClick}
          aria-label={isFavorite(book.id) ? "Remove from collection" : "Add to collection"}
        >
          {isFavorite(book.id) ? '✓' : '+'}
        </button>
      )}
    </div>
  );
};

export default BookCard;