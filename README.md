# Wellness Sessions Frontend

This is the frontend application for the Wellness Sessions platform. It allows users to register, log in, view public sessions, and manage their own wellness session drafts and publications.

## 🚀 Features

- 🔐 User authentication (Login/Register)
- 📋 View public wellness sessions
- 📝 Draft and publish custom sessions
- 💾 Auto-save drafts with debounce
- ✅ Responsive UI
- 🍞 Toast feedback messages
- 🧭 JWT-protected routes
- 🎨 Clean and consistent design
- 🌐 Live demo (optional)

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Nidhi-Sharma-1612/wellness_session_frontend.git
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Environment Variables

Create a `.env` file in the root of the `frontend` folder:

```
VITE_BACKEND_URL=https://wellness-session-backend-m43m.onrender.com
```

### 4. Start the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` by default.

## 🌐 Folder Structure

```
frontend/
├── components/         # Reusable UI components (SessionList, SessionEditor, Navbar)
├── pages/              # Auth page, Dashboard
├── utils/              # Axios instance for API calls
├── App.jsx             # Main app entry with routing and token logic
├── main.jsx            # React DOM render entry point
└── index.css           # Tailwind and global styles
```

## 🔐 Token Handling

- JWT is stored in `localStorage`
- Routes are protected using a custom token check
- Token updates trigger `auth-changed` event

## 📄 API Integration

The frontend interacts with the following backend routes:

| Method | Endpoint                    | Description                     |
| ------ | --------------------------- | ------------------------------- |
| POST   | /api/register               | Register a new user             |
| POST   | /api/login                  | Login and receive JWT token     |
| GET    | /api/sessions               | Public sessions                 |
| GET    | /api/my-sessions            | User’s sessions (auth required) |
| GET    | /api/my-sessions/:id        | Get a single session            |
| POST   | /api/my-sessions/save-draft | Save or update draft            |
| POST   | /api/my-sessions/publish    | Publish a session               |

## 🔗 Live Demo

[Demo Link](https://your-frontend-deployment.vercel.app)

## 🧪 Bonus Features

- Debounced auto-save
- Lucide icons used throughout the app
- Mobile responsive layout with Tailwind CSS

## 📦 Build

```bash
npm run build
```
