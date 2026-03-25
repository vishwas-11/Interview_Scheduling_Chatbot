import { AGENT_COLOR, AGENT_ICON, AGENT_LABEL } from '../../utils/agentMeta'

export default function Badge({ agent, className = '' }) {
  const color = AGENT_COLOR[agent] || 'bg-slate-500/20 text-slate-300 border-slate-500/30'
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full border animate-slide-in ${color} ${className}`}>
      <span>{AGENT_ICON[agent]}</span>
      {AGENT_LABEL[agent]}
    </span>
  )
}