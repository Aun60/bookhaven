import React, { useState } from 'react';
import './ReviewForm.css';

const ReviewForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    rating: 5,
    comment: ''
  });
  
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'rating' ? parseInt(value) : value
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.comment.trim()) {
      setError('Please enter a review comment');
      return;
    }
    
    onSubmit(formData);
    
    // Reset form after successful submission
    setFormData({
      rating: 5,
      comment: ''
    });
  };

  return (
    <div className="review-form-container">
      <h3>Write a Review</h3>
      <form className="review-form" onSubmit={handleSubmit}>
        <div className="rating-group">
          <label>Rating:</label>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <label key={star} className="star-label">
                <input
                  type="radio"
                  name="rating"
                  value={star}
                  checked={formData.rating === star}
                  onChange={handleChange}
                />
                <span className={`star ${formData.rating >= star ? 'selected' : ''}`}>
                  ★
                </span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="comment">Your Review:</label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder="Share your thoughts about this book..."
            rows="4"
            className={error ? 'error' : ''}
          />
          {error && <span className="error-message">{error}</span>}
        </div>
        
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;