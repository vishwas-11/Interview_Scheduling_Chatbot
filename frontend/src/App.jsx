import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import ChatPage from './pages/ChatPage' // Ensure you have this

export default function App() {
  const { token } = useAuth()

  return (
    <div className="bg-navy-950 min-h-screen">
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth Route: Redirect to chat if token exists */}
        <Route
          path="/login"
          element={!token ? <LoginPage /> : <Navigate to="/chat" replace />}
        />

        {/* Protected Route: Redirect to login if no token */}
        <Route
          path="/chat"
          element={
            token
              ? <ChatPage />
              : <Navigate to="/login" replace />
          }
        />

        {/* Catch-all: Redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}