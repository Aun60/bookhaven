import React, { useState } from 'react';
import './BookForm.css';

const BookForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    cover: '',
    description: '',
    price: '',
    category: '',
    yearPublished: ''
  });
  
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }
    
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.yearPublished) {
      newErrors.yearPublished = 'Year published is required';
    } else if (
      isNaN(formData.yearPublished) || 
      parseInt(formData.yearPublished) < 1000 || 
      parseInt(formData.yearPublished) > new Date().getFullYear()
    ) {
      newErrors.yearPublished = 'Please enter a valid year';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Convert price and yearPublished to numbers
      const processedData = {
        ...formData,
        price: parseFloat(formData.price),
        yearPublished: parseInt(formData.yearPublished)
      };
      
      onSubmit(processedData);
    }
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={errors.title ? 'error' : ''}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="author">Author *</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          className={errors.author ? 'error' : ''}
        />
        {errors.author && <span className="error-message">{errors.author}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="cover">Cover Image URL</label>
        <input
          type="text"
          id="cover"
          name="cover"
          value={formData.cover}
          onChange={handleChange}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={errors.description ? 'error' : ''}
          rows="4"
        />
        {errors.description && <span className="error-message">{errors.description}</span>}
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="price">Price ($) *</label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={errors.price ? 'error' : ''}
          />
          {errors.price && <span className="error-message">{errors.price}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="yearPublished">Year Published *</label>
          <input
            type="text"
            id="yearPublished"
            name="yearPublished"
            value={formData.yearPublished}
            onChange={handleChange}
            className={errors.yearPublished ? 'error' : ''}
          />
          {errors.yearPublished && <span className="error-message">{errors.yearPublished}</span>}
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="category">Category *</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={errors.category ? 'error' : ''}
        >
          <option value="">Select a category</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="Mystery">Mystery</option>
          <option value="Romance">Romance</option>
          <option value="Thriller">Thriller</option>
          <option value="Biography">Biography</option>
          <option value="History">History</option>
          <option value="Self-Help">Self-Help</option>
          <option value="Business">Business</option>
        </select>
        {errors.category && <span className="error-message">{errors.category}</span>}
      </div>
      
      <button type="submit" className="submit-button" disabled={loading}>
        {loading ? 'Adding Book...' : 'Add Book'}
      </button>
    </form>
  );
};

export default BookForm;