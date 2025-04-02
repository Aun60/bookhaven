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

  const validateInput = () => {
    const validationErrors = {};
    const currentYear = new Date().getFullYear();
    
    if (!formData.title.trim()) validationErrors.title = 'Title is required';
    if (!formData.author.trim()) validationErrors.author = 'Author name is required';
    if (!formData.description.trim()) validationErrors.description = 'Description cannot be empty';
    
    if (!formData.price) {
      validationErrors.price = 'Price is mandatory';
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      validationErrors.price = 'Enter a valid positive price';
    }
    
    if (!formData.category.trim()) validationErrors.category = 'Please select a category';
    
    if (!formData.yearPublished) {
      validationErrors.yearPublished = 'Year of publication is required';
    } else if (
      isNaN(formData.yearPublished) ||
      parseInt(formData.yearPublished) < 1000 ||
      parseInt(formData.yearPublished) > currentYear
    ) {
      validationErrors.yearPublished = 'Enter a valid publication year';
    }
    
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateInput()) {
      onSubmit({
        ...formData,
        price: parseFloat(formData.price),
        yearPublished: parseInt(formData.yearPublished)
      });
    }
  };

  return (
    <form className="book-form" onSubmit={handleFormSubmit}>
      {['title', 'author', 'cover', 'description'].map((field) => (
        <div className="form-group" key={field}>
          <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)} {field !== 'cover' && '*'}</label>
          <input
            type="text"
            id={field}
            name={field}
            value={formData[field]}
            onChange={handleInputChange}
            className={errors[field] ? 'error' : ''}
          />
          {errors[field] && <span className="error-message">{errors[field]}</span>}
        </div>
      ))}

      <div className="form-row">
        {['price', 'yearPublished'].map((field) => (
          <div className="form-group" key={field}>
            <label htmlFor={field}>{field === 'price' ? 'Price ($)' : 'Year Published'} *</label>
            <input
              type="text"
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleInputChange}
              className={errors[field] ? 'error' : ''}
            />
            {errors[field] && <span className="error-message">{errors[field]}</span>}
          </div>
        ))}
      </div>

      <div className="form-group">
  <label htmlFor="category">Category *</label>
  <input
    type="text"
    id="category"
    name="category"
    value={formData.category}
    onChange={handleInputChange}
    className={errors.category ? 'error' : ''}
  />
  {errors.category && <span className="error-message">{errors.category}</span>}
</div>


      <button type="submit" className="submit-button" disabled={loading}>
        {loading ? 'Adding Book...' : 'Add Book'}
      </button>
    </form>
  );
};

export default BookForm;
