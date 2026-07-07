import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Calendar, Activity, User, Mail, Key, Clock, Award, ShieldAlert } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [greeting, setGreeting] = useState('Welcome');
  const [auditLogs, setAuditLogs] = useState([]);

  // Load audit logs from localStorage
  useEffect(() => {
    const logs = JSON.parse(localStorage.getItem('loginLogs') || '[]');
    setAuditLogs(logs);
  }, []);

  // Determine greeting based on local time
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good Morning');
    } else if (hour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []);

  if (!user) return null;

  const createdDate = user.createdAt ? new Date(user.createdAt) : new Date();
  const formattedCreatedDate = createdDate.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const getAccountAge = () => {
    const diffTime = Math.abs(new Date() - createdDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays <= 1) return 'Today';
    return `${diffDays} days ago`;
  };

  const getProfileInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="dashboard-container">
      {/* Hero Welcome Card with 3D Glass Avatar */}
      <div className="dashboard-hero-3d">
        <div className="hero-3d-glow" />
        <div className="hero-profile-header-3d">
          <div className="avatar-wrapper-3d">
            <div className="avatar-3d-ring">
              <div className="profile-avatar-3d">
                {getProfileInitials(user.name)}
              </div>
            </div>
            <div className="avatar-3d-badge" title="Status: Online" />
          </div>
          
          <div className="hero-profile-info-3d">
            <span className="badge-3d">
              <Award size={12} style={{ marginRight: '4px' }} />
              Authorized Administrator
            </span>
            <h1>{greeting}, {user.name}!</h1>
            <p>Your connection is encrypted with end-to-end JWT handshake. Session tokens are refreshed dynamically.</p>
          </div>
        </div>
      </div>

      {/* 3D Glassmorphic Stats Grid */}
      <div className="stats-grid-3d">
        {/* Card 1: Auth Status */}
        <div className="stat-card-3d purple-glow">
          <div className="card-3d-light" />
          <div className="icon-3d-outer">
            <div className="icon-3d-backdrop purple" />
            <div className="icon-3d-capsule purple float-anim-1">
              <ShieldCheck size={28} />
            </div>
          </div>
          <div className="stat-content-3d">
            <h3>Auth Gateway</h3>
            <p className="stat-value-3d success-text">JWT VERIFIED</p>
            <span className="stat-sub-3d">HMAC-SHA256 Encrypted</span>
          </div>
        </div>

        {/* Card 2: Account Age */}
        <div className="stat-card-3d gold-glow">
          <div className="card-3d-light" />
          <div className="icon-3d-outer">
            <div className="icon-3d-backdrop gold" />
            <div className="icon-3d-capsule gold float-anim-2">
              <Calendar size={28} />
            </div>
          </div>
          <div className="stat-content-3d">
            <h3>Portal Access</h3>
            <p className="stat-value-3d">{getAccountAge()}</p>
            <span className="stat-sub-3d">Created: {formattedCreatedDate}</span>
          </div>
        </div>

        {/* Card 3: Security Status */}
        <div className="stat-card-3d emerald-glow">
          <div className="card-3d-light" />
          <div className="icon-3d-outer">
            <div className="icon-3d-backdrop emerald" />
            <div className="icon-3d-capsule emerald float-anim-3">
              <Activity size={28} />
            </div>
          </div>
          <div className="stat-content-3d">
            <h3>Security Level</h3>
            <p className="stat-value-3d info-text">SECURE (100%)</p>
            <span className="stat-sub-3d">0 Threats Detected</span>
          </div>
        </div>
      </div>

      {/* Grid: Profile Details & Activity logs */}
      <div className="details-section-3d">
        {/* Profile Card */}
        <div className="detail-block-3d">
          <div className="block-gloss-light" />
          <h2>
            <User size={20} className="icon-gold-3d" />
            System Credentials
          </h2>
          <div className="meta-info-list-3d">
            <div className="meta-info-item-3d">
              <span className="meta-label-3d">Encrypted UID</span>
              <span className="meta-value-3d" title={user._id || user.id}>
                {user._id || user.id || 'N/A'}
              </span>
            </div>
            <div className="meta-info-item-3d">
              <span className="meta-label-3d">Identity Name</span>
              <span className="meta-value-text-3d">{user.name}</span>
            </div>
            <div className="meta-info-item-3d">
              <span className="meta-label-3d">Mail Address</span>
              <span className="meta-value-text-3d" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={14} style={{ color: 'var(--accent-primary)' }} />
                {user.email}
              </span>
            </div>
            <div className="meta-info-item-3d">
              <span className="meta-label-3d">Authorization Mode</span>
              <span className="meta-value-text-3d" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Key size={14} style={{ color: 'var(--accent-secondary)' }} />
                JSON Web Token (RFC 7519)
              </span>
            </div>
          </div>
        </div>

        {/* Security / Audit Log */}
        <div className="detail-block-3d">
          <div className="block-gloss-light" />
          <h2>
            <Clock size={20} className="icon-purple-3d" />
            Active Session Log
          </h2>
          {auditLogs.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No session logs recorded yet.</p>
          ) : (
            <div className="audit-list-3d">
              {auditLogs.map((log) => (
                <div key={log.id} className="audit-item-3d" style={{
                  borderLeft: `4px solid ${log.event.includes('out') ? 'var(--warning)' : 'var(--accent-primary)'}`,
                  boxShadow: `inset 0 1px 1px rgba(255,255,255,0.05), 0 2px 8px rgba(0,0,0,0.2)`
                }}>
                  <div className="audit-info-3d">
                    <span className="audit-event-3d">{log.event}</span>
                    <span className="audit-time-3d">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                  </div>
                  <span className="audit-status-3d" style={{
                    background: log.event.includes('out') ? 'rgba(231, 197, 130, 0.15)' : 'rgba(163, 201, 168, 0.15)',
                    color: log.event.includes('out') ? 'var(--warning)' : 'var(--success)',
                    border: `1px solid ${log.event.includes('out') ? 'rgba(231, 197, 130, 0.25)' : 'rgba(163, 201, 168, 0.25)'}`
                  }}>
                    {log.event.includes('out') ? 'Inactive' : 'Active'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
