import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <div className="app-bg-container">
          <div className="app-bg-blob app-bg-blob-1"></div>
          <div className="app-bg-blob app-bg-blob-2"></div>
          <div className="app-bg-blob app-bg-blob-3"></div>
        </div>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
