import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState([]);

  // Toast management
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, [removeToast]);

  // Configure axios defaults when token changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, [token]);

  // Load user profile on startup if token is available
  useEffect(() => {
    const loadProfile = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('/api/auth/profile');
        setUser(response.data);
      } catch (error) {
        console.error('Failed to load user profile:', error);
        // Clear invalid token
        setToken(null);
        setUser(null);
        addToast('Session expired. Please log in again.', 'warning');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [token, addToast]);

  // Register action
  const register = async (name, email, password) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/auth/register', { name, email, password });
      
      const { token: userToken, ...userData } = response.data;
      setUser(userData);
      setToken(userToken);
      
      addToast(`Welcome to AuthFlow, ${userData.name}!`, 'success');
      return { success: true };
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Registration failed';
      addToast(errorMsg, 'error');
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Login action
  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/auth/login', { email, password });
      
      const { token: userToken, ...userData } = response.data;
      setUser(userData);
      setToken(userToken);
      
      // Track login session timestamp in memory for dashboard audit log
      const logins = JSON.parse(localStorage.getItem('loginLogs') || '[]');
      logins.unshift({
        event: 'Logged in successfully',
        timestamp: new Date().toISOString(),
        id: Date.now()
      });
      localStorage.setItem('loginLogs', JSON.stringify(logins.slice(0, 5)));

      addToast(`Welcome back, ${userData.name}!`, 'success');
      return { success: true };
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Invalid email or password';
      addToast(errorMsg, 'error');
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Logout action
  const logout = () => {
    // Audit logout action
    const logins = JSON.parse(localStorage.getItem('loginLogs') || '[]');
    logins.unshift({
      event: 'Logged out',
      timestamp: new Date().toISOString(),
      id: Date.now()
    });
    localStorage.setItem('loginLogs', JSON.stringify(logins.slice(0, 5)));

    setToken(null);
    setUser(null);
    addToast('You have been logged out successfully.', 'info');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        toasts,
        addToast,
        removeToast,
        register,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
