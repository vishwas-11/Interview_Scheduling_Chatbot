// import { useState } from 'react'
// import { useAuth } from '../context/AuthContext'
// import Spinner from '../components/ui/Spinner'

// export default function LoginPage() {
//   const { login, signup, loading, error, setError } = useAuth()
//   const [mode, setMode] = useState('login') 
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')

//   const handleSubmit = (e) => {
//     if (e) e.preventDefault()
//     if (!email.trim() || !password.trim() || loading) return
//     mode === 'login' ? login(email, password) : signup(email, password)
//   }

//   const handleModeSwitch = (m) => {
//     setMode(m)
//     setError(null)
//   }

//   return (
//     <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4 transition-colors duration-500">
//       {/* Background glow - Increased opacity for better depth */}
//       <div className="fixed inset-0 pointer-events-none overflow-hidden">
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-electric-500/10 rounded-full blur-[120px]" />
//       </div>

//       <div className="relative w-full max-w-sm animate-fade-up">
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-navy-900 border border-electric-500/30 mb-4 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
//             <span className="text-3xl">🤖</span>
//           </div>
//           <h1 className="font-display font-bold text-3xl text-white tracking-tight">
//             Interview Scheduler
//           </h1>
//           <p className="text-slate-400 text-sm mt-2">
//             AI-powered scheduling assistant
//           </p>
//         </div>

//         {/* Card with subtle glassmorphism */}
//         <div className="bg-navy-900/80 backdrop-blur-xl border border-navy-700/50 rounded-3xl p-8 shadow-2xl">
          
//           <div className="flex bg-navy-950/50 border border-navy-800 rounded-2xl p-1 mb-8">
//             {['login', 'signup'].map((m) => (
//               <button
//                 key={m}
//                 onClick={() => handleModeSwitch(m)}
//                 className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 capitalize ${
//                   mode === m
//                     ? 'bg-electric-500 text-white shadow-lg shadow-electric-500/20'
//                     : 'text-slate-500 hover:text-slate-300'
//                 }`}
//               >
//                 {m}
//               </button>
//             ))}
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div>
//               <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-2 ml-1">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 value={email}
//                 required
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="name@company.com"
//                 className="w-full bg-navy-950 border border-navy-700 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-700 outline-none focus:border-electric-500 focus:ring-1 focus:ring-electric-500/20 transition-all"
//               />
//             </div>

//             <div>
//               <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-2 ml-1">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 value={password}
//                 required
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="••••••••"
//                 className="w-full bg-navy-950 border border-navy-700 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-700 outline-none focus:border-electric-500 focus:ring-1 focus:ring-electric-500/20 transition-all"
//               />
//             </div>

//             {error && (
//               <div className="text-xs text-rose-400 font-medium bg-rose-500/5 border border-rose-500/20 rounded-xl px-4 py-3 animate-shake">
//                 <span className="mr-2">⚠️</span> {error}
//               </div>
//             )}

//             <button
//               type="submit"
//               disabled={loading || !email.trim() || !password.trim()}
//               className="w-full bg-electric-500 hover:bg-electric-400 disabled:opacity-50 disabled:grayscale text-white font-bold py-4 rounded-xl transition-all duration-300 text-sm flex items-center justify-center gap-3 shadow-xl shadow-electric-500/10 active:scale-[0.98]"
//             >
//               {loading ? (
//                 <>
//                   <Spinner className="w-4 h-4" /> 
//                   <span>{mode === 'login' ? 'Authenticating...' : 'Creating...'}</span>
//                 </>
//               ) : (
//                 <span>{mode === 'login' ? 'Sign In' : 'Get Started'}</span>
//               )}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }







import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Spinner from '../components/ui/Spinner'

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
    /* Using [#020617] for deep navy background */
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-4 transition-colors duration-500">
      
      {/* Background glow - pointer-events-none is crucial here */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00f2ff]/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0a0a23] border border-[#00f2ff]/30 mb-4 shadow-[0_0_20px_rgba(0,242,255,0.15)]">
            <span className="text-3xl">🤖</span>
          </div>
          <h1 className="font-bold text-3xl text-white tracking-tight">
            Interview Scheduler
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            AI-powered scheduling assistant
          </p>
        </div>

        {/* Card with Glassmorphism using arbitrary hex values */}
        <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl">
          
          <div className="flex bg-[#020617]/50 border border-slate-800 rounded-2xl p-1 mb-8">
            {['login', 'signup'].map((m) => (
              <button
                key={m}
                onClick={() => handleModeSwitch(m)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 capitalize ${
                  mode === m
                    ? 'bg-[#00f2ff] text-[#020617] shadow-lg shadow-[#00f2ff]/20'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-2 ml-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-[#020617] border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-700 outline-none focus:border-[#00f2ff] focus:ring-1 focus:ring-[#00f2ff]/20 transition-all"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-2 ml-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#020617] border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-700 outline-none focus:border-[#00f2ff] focus:ring-1 focus:ring-[#00f2ff]/20 transition-all"
              />
            </div>

            {error && (
              <div className="text-xs text-rose-400 font-medium bg-rose-500/5 border border-rose-500/20 rounded-xl px-4 py-3">
                <span className="mr-2">⚠️</span> {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !email.trim() || !password.trim()}
              className="w-full bg-[#00f2ff] hover:bg-[#00d8e4] disabled:opacity-50 disabled:grayscale text-[#020617] font-bold py-4 rounded-xl transition-all duration-300 text-sm flex items-center justify-center gap-3 shadow-xl shadow-[#00f2ff]/10 active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <Spinner className="w-4 h-4" /> 
                  <span>{mode === 'login' ? 'Authenticating...' : 'Creating...'}</span>
                </>
              ) : (
                <span>{mode === 'login' ? 'Sign In' : 'Get Started'}</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}