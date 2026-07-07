# Secure MERN JWT Authentication System

This project is a secure Login and Signup System built with the MERN stack (MongoDB, Express, React, Node.js) featuring JSON Web Token (JWT) authentication, password strength meter, and a beautiful modern dark glassmorphic dashboard interface.

## Features

### Backend (Express + MongoDB)
- **Automatic Fallback DB**: Automatically runs with an in-memory MongoDB server (`mongodb-memory-server`) if no `MONGO_URI` is supplied in `.env`.
- **Password Security**: Automatic hashing of passwords using `bcryptjs` before insertion.
- **JWT Authorization**: Authenticates requests to private APIs via Bearer token validation middleware.
- **Robust Endpoints**:
  - `POST /api/auth/register` (hashing + registry + sign)
  - `POST /api/auth/login` (validation + password verification + sign)
  - `GET /api/auth/profile` (retrieves verified user credentials)

### Frontend (React + Vite + CSS)
- **State Management**: Context-based auth flow (`AuthContext.jsx`) managing logins, logouts, toast banners, and session checks.
- **Password Strength Analyzer**: Analyzes password inputs in real-time (capital letters, numbers, length, special characters).
- **Interactive Session Logs**: Monitors successful log-ins and log-outs and saves them in local storage.
- **Modern Glassmorphic styling**: Uses pure Vanilla CSS custom properties, backdrop filters, responsive grid elements, and soft ambient lights.
- **Toast Alerts**: Customizable floating feedback notifications for alerts, warnings, and success flags.

## Setup and Run

### Prerequisites
- Node.js installed on your machine.
- (Optional) A local or cloud MongoDB server. (If not present, the app will fall back to an in-memory database).

### Quick Start

1. Open your terminal at the project directory (`C:\Users\91829\.gemini\antigravity\scratch\mern-auth`).
2. Install all dependencies for the root, backend, and frontend:
   ```bash
   npm run install-all
   ```
3. Run the development server (runs both backend on port `5000` and frontend on port `5173` concurrently):
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```
