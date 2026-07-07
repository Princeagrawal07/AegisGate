# AegisGate

AegisGate is a secure, full-stack user authentication gateway constructed using the MERN stack (MongoDB, Express, React, Node.js). The platform integrates robust cryptographic protocols with interactive split-screen authorization portals and 3D glassmorphic administration panels.

---

## Technical Overview

AegisGate employs a decoupled client-server architecture:
- **Client (React + Vite)**: Renders a split-screen gatekeeper portal featuring 3D door swing animations, interactive vector graphic states, and a rose-gold glassmorphic stats console.
- **Server (Express + Node.js)**: Exposes secure REST endpoints protected by JSON Web Token (JWT) authentication middleware.
- **Data Layer (Mongoose + MongoDB)**: Features pre-save password-hashing hooks and a dual-mode database adapter supporting production-grade MongoDB URI connections or an automated in-memory fallback server (`mongodb-memory-server`) for sandbox testing.

---

## API Reference

### Authentication Services
All API payloads are sent and received as JSON. Protected endpoints require a valid Bearer token in the `Authorization` header.

| Endpoint | Method | Security | Description |
| :--- | :--- | :--- | :--- |
| `/api/auth/register` | `POST` | Public | Validates registration data, hashes the password via `bcryptjs`, and returns the user payload with a signed JWT. |
| `/api/auth/login` | `POST` | Public | Verifies email and password credentials, records the login event, and issues a 7-day signed JWT. |
| `/api/auth/profile` | `GET` | Bearer Token | Extracts and returns the authenticated user's profile metadata from the database. |

---

## Workspace Scripts

The project includes root-level scripts to coordinate the multi-package workspace:

- **Staged Installation**:
  ```bash
  npm run install-all
  ```
  Installs node modules across the workspace root, server directory, and client directory.

- **Concurrent Execution**:
  ```bash
  npm run dev
  ```
  Launches both the Express server (port `5000`) and the Vite client (port `5173`) concurrently.

- **Client Production Compilation**:
  ```bash
  npm run build --prefix frontend
  ```
  Compiles the React application into optimized static assets in the client dist folder.
