# AegisGate - Secure Authentication Portal

AegisGate is a secure, full-stack user authentication system built with the MERN stack (MongoDB, Express, React, Node.js). The portal combines robust security protocols (JWT, password hashing) with highly interactive user experiences, featuring a custom split-screen cartoon entryway animation and a 3D glassmorphic rose gold administration dashboard.

## Features

### Backend (Express + Node.js + MongoDB)
- **In-Memory Fallback Database**: Automatically initializes an in-memory MongoDB instance (`mongodb-memory-server`) if no `MONGO_URI` is supplied in the `.env` file, allowing instant, configuration-free execution.
- **Credential Security**: Hashes user passwords using `bcryptjs` before insertion into the database.
- **JWT Authorization**: Protects private API endpoints using JSON Web Token Bearer validation middleware.
- **API Endpoints**:
  - `POST /api/auth/register`: User registration with input validation.
  - `POST /api/auth/login`: User login, password verification, and token signing.
  - `GET /api/auth/profile`: Retrieves verified user profile details (protected).

### Frontend (React + Vite + Vanilla CSS)
- **Split-Screen Entrance Portal**: Interactive layout separating the visual doorway animation panel from the credentials form.
- **Swinging 3D Door & Cartoon Animation**: Houses a 3D-hinged panel that swings open on mount, exposing a custom waving cartoon character.
- **Reactive Warning Feedback**: Shakes the credentials card, slams the door shut, and pulses red alert lights when authentication fails.
- **3D Glassmorphic Dashboard**: A verified session screen showing user credentials, time-of-day greetings, active logins audit logs, and floating stats cards.
- **Notification Toasts**: Custom floating notification alerts for status warnings, errors, and success updates.

## Setup and Installation

### Prerequisites
- Node.js installed on the host machine.
- (Optional) A local or cloud MongoDB server. (If absent, the application defaults to an in-memory database).

### Setup Instructions

1. Open a terminal at the project root directory:
   `C:\Users\91829\.gemini\antigravity\scratch\mern-auth`
2. Install all dependencies for the root, backend, and frontend components:
   ```bash
   npm run install-all
   ```
3. Start the development servers concurrently (backend runs on port `5000` and frontend runs on port `5173`):
   ```bash
   npm run dev
   ```
4. Access the web interface at:
   `http://localhost:5173`
