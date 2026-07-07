import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DoorAnimation from '../components/DoorAnimation';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const { login, addToast } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDoorOpen, setIsDoorOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [shake, setShake] = useState(false);

  // Trigger door animation on load
  useEffect(() => {
    const timer = setTimeout(() => setIsDoorOpen(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (isError) {
      setIsError(false); // Reset error state on typing so door opens back up!
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      addToast('Please enter your email', 'warning');
      setIsError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      addToast('Please enter a valid email address', 'warning');
      setIsError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    if (!password) {
      addToast('Please enter your password', 'warning');
      setIsError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setIsSubmitting(true);
    const result = await login(email, password);
    setIsSubmitting(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setIsError(true);
      setShake(true);
      // Vibrate/Shake card
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="split-auth-container">
      {/* Left Panel: Teal & Animated Waving Door (with Error/Alarm prop) */}
      <div className="split-left-panel">
        <div className="split-left-content">
          <DoorAnimation isOpen={isDoorOpen} isError={isError} />
        </div>
      </div>

      {/* Right Panel: Yellow-Gold & Login Form */}
      <div className="split-right-panel">
        <div className={`cartoon-auth-card ${shake ? 'shake' : ''}`}>
          <div className="cartoon-card-header">
            <span className="cartoon-card-title">ALREADY MEMBERS</span>
            <a href="#" className="cartoon-help-link" onClick={(e) => { e.preventDefault(); addToast('Password reset link is disabled in mock mode.', 'info'); }}>
              Need help?
            </a>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Email Input */}
            <div className="cartoon-form-group">
              <div className="cartoon-input-wrapper">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="cartoon-form-input"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="cartoon-form-group">
              <div className="cartoon-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  className="cartoon-form-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                />
                <button
                  type="button"
                  className="cartoon-input-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Action Button */}
            <button type="submit" className="cartoon-btn-primary" disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="spinner" style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: '#fff' }}></div>
              ) : (
                'SIGN IN'
              )}
            </button>
          </form>

          <div className="cartoon-card-footer">
            Don't have an account yet ?
            <Link to="/register" className="cartoon-footer-link">Create an account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
