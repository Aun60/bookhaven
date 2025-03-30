import React, { createContext, useState, useEffect, useContext } from 'react';
import { login, logout, checkAuthStatus } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const userData = await checkAuthStatus();
        if (userData) {
          setUser(userData);
        }
      } catch (err) {
        console.error("Authentication check failed:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const handleLogin = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await login(email, password);
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
      localStorage.removeItem('token');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    login: handleLogin,
    logout: handleLogout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};