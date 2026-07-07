import React from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from './components/Toast';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { Shield, LogOut, User as UserIcon } from 'lucide-react';

const Header = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <Link to="/" className="logo-container">
          <Shield className="logo-icon" />
          <span className="logo-text">AuthFlow</span>
        </Link>

        <nav className="nav-links">
          {token && user ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                <UserIcon size={16} />
                <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{user.name}</span>
              </div>
              <button onClick={handleLogout} className="nav-btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <LogOut size={14} />
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Sign In</Link>
              <Link to="/register" className="nav-btn">Sign Up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

const AppContent = () => {
  const { token } = useAuth();

  return (
    <div className="app-container">
      <Header />
      
      <main className="main-content">
        <Routes>
          {/* Default Route */}
          <Route
            path="/"
            element={
              token ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Secure Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Fallback Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <ToastContainer />
    </div>
  );
};

function App() {
  return <AppContent />;
}

export default App;
