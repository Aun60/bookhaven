import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookById } from '../services/bookService';
import ReviewForm from '../components/ReviewForm';
import { useBooks } from '../context/BookContext';
import { useAuth } from '../context/AuthContext';
import './BookDetail.css';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addBookReview, toggleFavorite, isFavorite } = useBooks();
  const { isAuthenticated } = useAuth();
  
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewLoading, setReviewLoading] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getBookById(id);
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleReviewSubmit = async (reviewData) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/book/${id}` } });
      return;
    }

    setReviewLoading(true);
    try {
      const updatedBook = await addBookReview(id, reviewData);
      setBook(updatedBook);
    } catch (err) {
      setError('Failed to submit review. Please try again.');
    } finally {
      setReviewLoading(false);
    }
  };

  const handleFavoriteToggle = () => {
    toggleFavorite(parseInt(id));
  };

  if (loading) {
    return <div className="loading">Loading book details...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!book) {
    return <div className="not-found">Book not found</div>;
  }

  return (
    <div className="book-detail-page">
      <div className="menu-bar">Menu</div>
      <div className="book-detail">
        <div className="book-cover-section">
          <img 
            src={book.cover || 'https://via.placeholder.com/300x450?text=No+Cover'} 
            alt={`${book.title} cover`} 
            className="book-cover"
          />
          
          {isAuthenticated && (
            <button 
              className={`favorite-button ${isFavorite(book.id) ? 'favorited' : ''}`}
              onClick={handleFavoriteToggle}
            >
              {isFavorite(book.id) ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          )}
        </div>
        
        <div className="book-info-section">
          <h1 className="book-title">{book.title}</h1>
          <h2 className="book-author">by {book.author}</h2>
          <div className="book-metadata">
            <span>Published: {book.yearPublished}</span>
            <span>Category: {book.category}</span>
            <span>Price: ${book.price.toFixed(2)}</span>
          </div>
          <div className="book-description">
            <h3>Description</h3>
            <p>{book.description}</p>
          </div>
        </div>
      </div>
      <div className="reviews-section">
        <h2>Reviews</h2>
        {book.reviews.length === 0 ? (
          <p>No reviews yet. Be the first to review this book!</p>
        ) : (
          <div className="reviews-list">
            {book.reviews.map((review) => (
              <div key={review.id} className="review">
                <div className="review-header">
                  <span className="reviewer-name">{review.userName}</span>
                  <span className="review-date">{review.date}</span>
                  <div className="review-rating">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < review.rating ? 'star filled' : 'star'}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="review-comment">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
        {isAuthenticated ? (
          <ReviewForm onSubmit={handleReviewSubmit} loading={reviewLoading} />
        ) : (
          <div className="login-prompt">
            <p>Please <a href="/login" onClick={(e) => {
              e.preventDefault();
              navigate('/login', { state: { from: `/book/${id}` } });
            }}>login</a> to leave a review</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetail;