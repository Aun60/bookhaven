import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import BookDetail from './pages/BookDetail';
import AddBook from './pages/AddBook';
import Login from './pages/Login';
import Favorites from './pages/Favorites';
import { AuthProvider } from './context/AuthContext';
import { BookProvider } from './context/BookContext';
import './App.css';

const App = () => {
  // Protected route component
  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <AuthProvider>
      <BookProvider>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/book/:id" element={<BookDetail />} />
              <Route 
                path="/add-book" 
                element={
                  <ProtectedRoute>
                    <AddBook />
                  </ProtectedRoute>
                } 
              />
              <Route path="/login" element={<Login />} />
              <Route 
                path="/favorites" 
                element={
                  <ProtectedRoute>
                    <Favorites />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <footer className="footer">
            <p>© 2025 BookHaven - Your Online Bookstore</p>
          </footer>
        </div>
      </BookProvider>
    </AuthProvider>
  );
};

export default App;