import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DoorAnimation from '../components/DoorAnimation';
import { Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const { register, addToast } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDoorOpen, setIsDoorOpen] = useState(false);

  // Trigger door animation on load
  useEffect(() => {
    const timer = setTimeout(() => setIsDoorOpen(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const { name, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      addToast('Please enter your name', 'warning');
      return;
    }
    if (!email.trim()) {
      addToast('Please enter your email', 'warning');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      addToast('Please enter a valid email address', 'warning');
      return;
    }
    if (password.length < 6) {
      addToast('Password must be at least 6 characters long', 'warning');
      return;
    }

    setIsSubmitting(true);
    const result = await register(name, email, password);
    setIsSubmitting(false);

    if (result.success) {
      navigate('/dashboard');
    }
  };

  const getPasswordStrength = (pass) => {
    if (!pass) return null;
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    const labels = ['Too Short', 'Weak', 'Fair', 'Strong'];
    const colors = ['#ef4444', '#f59e0b', '#06b6d4', '#10b981'];
    return {
      label: labels[score - 1] || 'Too Short',
      color: colors[score - 1] || '#ef4444'
    };
  };

  const strength = getPasswordStrength(password);

  return (
    <div className="split-auth-container">
      {/* Left Panel: Teal & Animated Waving Door */}
      <div className="split-left-panel">
        <div className="split-left-content">
          <DoorAnimation isOpen={isDoorOpen} />
        </div>
      </div>

      {/* Right Panel: Yellow-Gold & Register Form */}
      <div className="split-right-panel">
        <div className="cartoon-auth-card">
          <div className="cartoon-card-header">
            <span className="cartoon-card-title">CREATE ACCOUNT</span>
            <a href="#" className="cartoon-help-link" onClick={(e) => { e.preventDefault(); addToast('Help links are disabled in mock mode.', 'info'); }}>
              Need help?
            </a>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Name Input */}
            <div className="cartoon-form-group">
              <div className="cartoon-input-wrapper">
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="cartoon-form-input"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                />
              </div>
            </div>

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
                  placeholder="Choose password (6+ chars)"
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

              {/* Password strength badge */}
              {password && strength && (
                <div style={{ marginTop: '0.4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem' }}>
                  <span style={{ color: '#718096' }}>Strength:</span>
                  <span style={{ color: strength.color, fontWeight: '700' }}>{strength.label}</span>
                </div>
              )}
            </div>

            {/* Action Button */}
            <button type="submit" className="cartoon-btn-primary" disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="spinner" style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: '#fff' }}></div>
              ) : (
                'SIGN UP'
              )}
            </button>
          </form>

          <div className="cartoon-card-footer">
            Already have an account?
            <Link to="/login" className="cartoon-footer-link">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
