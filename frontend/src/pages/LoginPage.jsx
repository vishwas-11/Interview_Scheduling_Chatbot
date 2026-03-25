import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Spinner from '../components/ui/Spinner'
import LineWaves from '../components/layout/LineWaves' // Import the shader

export default function LoginPage() {
  const { login, signup, loading, error, setError } = useAuth()
  const [mode, setMode] = useState('login') 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    if (e) e.preventDefault()
    if (!email.trim() || !password.trim() || loading) return
    mode === 'login' ? login(email, password) : signup(email, password)
  }

  const handleModeSwitch = (m) => {
    setMode(m)      
    setError(null)
  }

  return (
    <div className="relative min-h-screen bg-[#050505] flex items-center justify-center px-4 overflow-hidden">
      
      {/* 1. THE SHADER BACKGROUND */}
      <div className="absolute inset-0 z-0 opacity-40">
        <LineWaves 
          speed={0.2}
          innerLineCount={40}
          outerLineCount={45}
          warpIntensity={1.5}
          rotation={30} // Different angle for the login page
          color1="#6366f1" // Indigo
          color2="#a855f7" // Purple
          color3="#ec4899" // Pink
          brightness={0.15}
          enableMouseInteraction={true}
          mouseInfluence={3.0} // Stronger reaction in small space
        />
      </div>

      {/* 2. BACKGROUND BLUR/GLOW OVERLAYS */}
      <div className="absolute inset-0 z-10 bg-black/40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* 3. LOGIN CARD */}
      <div className="relative z-20 w-full max-w-sm">
        <div className="text-center mb-8">
          {/* Logo Icon matching Landing Page style */}
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-4 shadow-lg shadow-indigo-500/20">
            <div className="w-6 h-6 bg-white rounded-sm" />
          </div>
          <h1 className="font-bold text-3xl text-white tracking-tight">
            Welcome Back
          </h1>
          <p className="text-slate-400 text-sm mt-2 font-medium">
            Access your AI scheduling assistant
          </p>
        </div>

        {/* Glassmorphism Card */}
        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          
          {/* Mode Switcher */}
          <div className="flex bg-black/40 border border-white/5 rounded-2xl p-1 mb-8">
            {['login', 'signup'].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => handleModeSwitch(m)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 capitalize tracking-wider ${
                  mode === m
                    ? 'bg-white text-black shadow-lg shadow-white/10'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {m === 'login' ? 'Sign In' : 'Register'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] block mb-2 ml-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] block mb-2 ml-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all"
              />
            </div>

            {error && (
              <div className="text-xs text-rose-400 font-medium bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3 flex items-center gap-2">
                <span>⚠️</span> {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !email.trim() || !password.trim()}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-all duration-300 text-sm flex items-center justify-center gap-3 shadow-lg shadow-indigo-600/20 active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <Spinner className="w-4 h-4" /> 
                  <span>{mode === 'login' ? 'Authenticating...' : 'Creating Account...'}</span>
                </>
              ) : (
                <span>{mode === 'login' ? 'Continue' : 'Create Account'}</span>
              )}
            </button>
          </form>
        </div>

        {/* Back to landing link */}
        <div className="text-center mt-8">
          <button 
            onClick={() => window.location.href = '/'}
            className="text-xs text-slate-500 hover:text-indigo-400 transition-colors font-medium tracking-wide uppercase"
          >
            ← Back to home
          </button>
        </div>
      </div>
    </div>
  )
}