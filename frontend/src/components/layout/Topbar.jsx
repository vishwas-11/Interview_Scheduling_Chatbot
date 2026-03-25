import { useAuth } from '../../context/AuthContext'

const FLOW_AGENTS = ['conversation', 'availability', 'scheduling']

export default function Topbar({ activeAgent }) {
  const { logout } = useAuth()

  return (
    <header className="flex items-center gap-4 px-6 py-3 border-b border-navy-800 flex-shrink-0 z-10">
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-electric-500/15 border border-electric-500/20 flex items-center justify-center text-sm">
          🤖
        </div>
        <span className="font-display font-bold text-sm text-white tracking-tight">
          InterviewAI
        </span>
      </div>

      {/* Agent flow indicator */}
      <div className="hidden md:flex items-center gap-2 ml-4">
        {FLOW_AGENTS.map((agent, i) => (
          <div key={agent} className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                activeAgent === agent
                  ? 'bg-electric-400 shadow-sm shadow-electric-500/60'
                  : 'bg-navy-700'
              }`} />
              <span className={`text-[10px] font-mono transition-colors duration-300 ${
                activeAgent === agent ? 'text-electric-400' : 'text-slate-700'
              }`}>
                {agent}
              </span>
            </div>
            {i < FLOW_AGENTS.length - 1 && (
              <span className="text-navy-700 text-[10px]">→</span>
            )}
          </div>
        ))}
      </div>

      {/* Right side */}
      <div className="ml-auto flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow" />
          <span className="text-[10px] font-mono text-slate-600">connected</span>
        </div>
        <button
          onClick={logout}
          className="text-[10px] font-mono text-slate-600 hover:text-slate-300 transition-colors px-2.5 py-1 rounded-lg border border-navy-700 hover:border-navy-600"
        >
          logout
        </button>
      </div>
    </header>
  )
}