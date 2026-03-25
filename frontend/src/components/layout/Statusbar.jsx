import { AGENT_COLOR, AGENT_ICON, AGENT_LABEL, AGENT_DESCRIPTION } from '../../utils/agentMeta'

export default function StatusBar({ activeAgent, loading }) {
  const color = AGENT_COLOR[activeAgent] || 'bg-slate-500/20 text-slate-300 border-slate-500/30'

  return (
    <div className="px-4 py-3 border-b border-navy-800">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">Active Agent</span>
        {loading && <span className="text-[10px] font-mono text-electric-400 animate-pulse">processing…</span>}
      </div>

      <div className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border transition-all duration-300 ${color}`}>
        <span className="text-base">{AGENT_ICON[activeAgent]}</span>
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-display font-semibold truncate">{AGENT_LABEL[activeAgent]}</span>
          <span className="text-[10px] opacity-70 mt-0.5 truncate">{AGENT_DESCRIPTION[activeAgent]}</span>
        </div>
        {loading && (
          <div className="ml-auto flex gap-1 flex-shrink-0">
            <span className="typing-dot w-1 h-1 rounded-full bg-current block" />
            <span className="typing-dot w-1 h-1 rounded-full bg-current block" />
            <span className="typing-dot w-1 h-1 rounded-full bg-current block" />
          </div>
        )}
      </div>
    </div>
  )
}