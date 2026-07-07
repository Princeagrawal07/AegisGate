import React from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

const ToastIcon = ({ type }) => {
  switch (type) {
    case 'success':
      return <CheckCircle size={20} />;
    case 'error':
      return <AlertCircle size={20} />;
    case 'warning':
      return <AlertTriangle size={20} />;
    case 'info':
    default:
      return <Info size={20} />;
  }
};

export const ToastContainer = () => {
  const { toasts, removeToast } = useAuth();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast ${toast.type}`}>
          <ToastIcon type={toast.type} />
          <div className="toast-message">{toast.message}</div>
          <button className="toast-close-btn" onClick={() => removeToast(toast.id)}>
            <X size={16} />
          </button>
          <div className="toast-progress" />
        </div>
      ))}
    </div>
  );
};
