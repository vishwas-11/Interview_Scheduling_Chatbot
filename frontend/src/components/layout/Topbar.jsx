// import { useAuth } from '../../context/AuthContext'

// const FLOW_AGENTS = ['conversation', 'availability', 'scheduling']

// export default function Topbar({ activeAgent }) {
//   const { logout } = useAuth()

//   return (
//     <header className="flex items-center gap-4 px-6 py-3 border-b border-navy-800 flex-shrink-0 z-10">
//       {/* Logo */}
//       <div className="flex items-center gap-2.5">
//         <div className="w-7 h-7 rounded-lg bg-electric-500/15 border border-electric-500/20 flex items-center justify-center text-sm">
//           🤖
//         </div>
//         <span className="font-display font-bold text-sm text-white tracking-tight">
//           InterviewAI
//         </span>
//       </div>

//       {/* Agent flow indicator */}
//       <div className="hidden md:flex items-center gap-2 ml-4">
//         {FLOW_AGENTS.map((agent, i) => (
//           <div key={agent} className="flex items-center gap-2">
//             <div className="flex items-center gap-1.5">
//               <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
//                 activeAgent === agent
//                   ? 'bg-electric-400 shadow-sm shadow-electric-500/60'
//                   : 'bg-navy-700'
//               }`} />
//               <span className={`text-[10px] font-mono transition-colors duration-300 ${
//                 activeAgent === agent ? 'text-electric-400' : 'text-slate-700'
//               }`}>
//                 {agent}
//               </span>
//             </div>
//             {i < FLOW_AGENTS.length - 1 && (
//               <span className="text-navy-700 text-[10px]">→</span>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Right side */}
//       <div className="ml-auto flex items-center gap-3">
//         <div className="flex items-center gap-1.5">
//           <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow" />
//           <span className="text-[10px] font-mono text-slate-600">connected</span>
//         </div>
//         <button
//           onClick={logout}
//           className="text-[10px] font-mono text-slate-600 hover:text-slate-300 transition-colors px-2.5 py-1 rounded-lg border border-navy-700 hover:border-navy-600"
//         >
//           logout
//         </button>
//       </div>
//     </header>
//   )
// }










import { useAuth } from '../../context/AuthContext'

const FLOW_AGENTS = ['conversation', 'availability', 'scheduling']

export default function Topbar({ activeAgent }) {
  const { logout } = useAuth()

  return (
    <header className="flex items-center gap-4 px-6 py-3 border-b border-white/5 bg-black/40 backdrop-blur-md flex-shrink-0 z-50">
      {/* Logo Section */}
      <div className="flex items-center gap-2.5 group cursor-pointer" onClick={() => window.location.href = '/'}>
        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:rotate-6 transition-transform">
           <div className="w-3.5 h-3.5 bg-white rounded-sm" />
        </div>
        <span className="font-bold text-sm text-white tracking-tighter uppercase">
          Synchron<span className="text-indigo-400">AI</span>
        </span>
      </div>

      {/* Agent Flow Indicator (The Pipeline) */}
      <div className="hidden md:flex items-center gap-4 ml-8 px-4 py-1.5 bg-white/[0.03] border border-white/5 rounded-full">
        {FLOW_AGENTS.map((agent, i) => (
          <div key={agent} className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                activeAgent === agent
                  ? 'bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)]'
                  : 'bg-white/10'
              }`} />
              <span className={`text-[10px] font-bold uppercase tracking-[0.15em] transition-colors duration-300 ${
                activeAgent === agent ? 'text-indigo-300' : 'text-slate-600'
              }`}>
                {agent}
              </span>
            </div>
            {i < FLOW_AGENTS.length - 1 && (
              <div className="w-4 h-[1px] bg-white/5" />
            )}
          </div>
        ))}
      </div>

      {/* Right side System Status & Actions */}
      <div className="ml-auto flex items-center gap-6">
        <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/5 border border-emerald-500/10">
          <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[9px] font-mono font-bold text-emerald-500/80 uppercase tracking-widest">System Live</span>
        </div>
        
        <button
          onClick={logout}
          className="text-[10px] font-bold text-slate-400 hover:text-white uppercase tracking-widest transition-all px-3 py-1.5 rounded-full border border-white/5 hover:bg-white/5 hover:border-white/10"
        >
          End Session
        </button>
      </div>
    </header>
  )
}