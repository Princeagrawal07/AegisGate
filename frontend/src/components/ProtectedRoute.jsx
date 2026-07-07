import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60vh',
        gap: '1rem'
      }}>
        <div className="spinner" style={{ width: '3rem', height: '3rem', borderWidth: '3px' }}></div>
        <p style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Securing connection...</p>
      </div>
    );
  }

  // If there is no token in localStorage, redirect to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
