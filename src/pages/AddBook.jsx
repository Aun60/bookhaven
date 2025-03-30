import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookForm from '../components/BookForm';
// import BookForm from '../components/Bookform';
import { useBooks } from '../context/BookContext';
import './AddBook.css';

const AddBook = () => {
  const { addBook } = useBooks();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (bookData) => {
    setLoading(true);
    setError(null);

    try {
      const newBook = await addBook(bookData);
      setSuccess(true);
      
      // Redirect to the new book after a brief delay to show success message
      setTimeout(() => {
        navigate(`/book/${newBook.id}`);
      }, 1500);
    } catch (err) {
      setError(err.message || 'Failed to add book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-book-page">
      <h1>Add New Book</h1>
      
      {success ? (
        <div className="success-message">
          Book added successfully! Redirecting to book details...
        </div>
      ) : (
        <>
          {error && <div className="error-message">{error}</div>}
          
          <p className="page-description">
            Fill out the form below to add a new book to our collection.
            Fields marked with * are required.
          </p>
          
          <BookForm onSubmit={handleSubmit} loading={loading} />
        </>
      )}
    </div>
  );
};

export default AddBook;