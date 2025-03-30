import React, { createContext, useState, useEffect, useContext } from 'react';
import { getBooks, addBook,  addReview } from '../services/bookService';

const BookContext = createContext();

export const useBooks = () => useContext(BookContext);

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const loadFavorites = () => {
      const savedFavorites = localStorage.getItem('favorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    };

    fetchBooks();
    loadFavorites();
  }, []);

  const addNewBook = async (bookData) => {
    setLoading(true);
    try {
      const newBook = await addBook(bookData);
      setBooks([...books, newBook]);
      return newBook;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addBookReview = async (bookId, reviewData) => {
    try {
      const updatedBook = await addReview(bookId, reviewData);
      setBooks(books.map(book => book.id === bookId ? updatedBook : book));
      return updatedBook;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const toggleFavorite = (bookId) => {
    let newFavorites;
    if (favorites.includes(bookId)) {
      newFavorites = favorites.filter(id => id !== bookId);
    } else {
      newFavorites = [...favorites, bookId];
    }
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const isFavorite = (bookId) => {
    return favorites.includes(bookId);
  };

  const getFavoriteBooks = () => {
    return books.filter(book => favorites.includes(book.id));
  };

  const value = {
    books,
    loading,
    error,
    addBook: addNewBook,
    addBookReview,
    toggleFavorite,
    isFavorite,
    getFavoriteBooks,
    favorites
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};