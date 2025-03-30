import React from 'react';
import { Link } from 'react-router-dom';
import { useBooks } from '../context/BookContext';
import { useAuth } from '../context/AuthContext';
import './BookCard.css';

const BookCard = ({ book }) => {
  const { toggleFavorite, isFavorite } = useBooks();
  const { isAuthenticated } = useAuth();
  
  const { id, title, author, cover, price, yearPublished, category } = book;
  
  const handleFavoriteToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(id);
  };

  return (
    <div className="book-card">
      <Link to={`/book/${id}`} className="book-link">
        <div className="book-cover">
          <img 
            src={cover || 'https://via.placeholder.com/150x200?text=No+Cover'} 
            alt={`${title} cover`} 
            className="cover-image"
          />
        </div>
        <div className="book-info">
          <h3 className="book-title">{title}</h3>
          <p className="book-author">by {author}</p>
          <p className="book-metadata">
            <span className="book-year">{yearPublished}</span>
            <span className="book-category">{category}</span>
          </p>
          <p className="book-price">${price.toFixed(2)}</p>
        </div>
      </Link>
      
      {isAuthenticated && (
        <button 
          className={`favorite-button ${isFavorite(id) ? 'favorited' : ''}`}
          onClick={handleFavoriteToggle}
          aria-label={isFavorite(id) ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite(id) ? '★' : '☆'}
        </button>
      )}
    </div>
  );
};

export default BookCard;