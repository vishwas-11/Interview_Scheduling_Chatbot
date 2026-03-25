
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react"
import { useNavigate } from "react-router-dom"
import { login as apiLogin, signup as apiSignup } from "../api/auth"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"))
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Clear error on login/logout
  useEffect(() => {
    if (token) setError(null)
  }, [token])

  const handleAuth = useCallback(
    async (apiFn, email, password) => {
      setLoading(true)
      setError(null)

      try {
        const res = await apiFn(email, password)

        const tok =
          res.data?.token ||
          res.data?.access_token ||
          res.token

        if (!tok) {
          throw new Error("No token received from server")
        }

        localStorage.setItem("token", tok)
        setToken(tok)

        navigate("/chat")
      } catch (err) {
        console.error("Auth Error:", err)

        let message = "Authentication failed"

        // ✅ Handle FastAPI validation errors (422)
        if (err.response?.data?.detail) {
          if (Array.isArray(err.response.data.detail)) {
            message = err.response.data.detail[0]?.msg || message
          } else {
            message = err.response.data.detail
          }
        } else if (err.message) {
          message = err.message
        }

        setError(message)
      } finally {
        setLoading(false)
      }
    },
    [navigate]
  )

  const login = useCallback(
    (email, password) => handleAuth(apiLogin, email, password),
    [handleAuth]
  )

  const signup = useCallback(
    (email, password) => handleAuth(apiSignup, email, password),
    [handleAuth]
  )

  const logout = useCallback(() => {
    localStorage.removeItem("token")
    setToken(null)
    navigate("/login")
  }, [navigate])

  return (
    <AuthContext.Provider
      value={{
        token,
        loading,
        error,
        setError,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider")
  }
  return ctx
}