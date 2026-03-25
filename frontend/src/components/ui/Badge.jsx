// import { AGENT_COLOR, AGENT_ICON, AGENT_LABEL } from '../../utils/agentMeta'

// export default function Badge({ agent, className = '' }) {
//   const color = AGENT_COLOR[agent] || 'bg-slate-500/20 text-slate-300 border-slate-500/30'
//   return (
//     <span className={`inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full border animate-slide-in ${color} ${className}`}>
//       <span>{AGENT_ICON[agent]}</span>
//       {AGENT_LABEL[agent]}
//     </span>
//   )
// }



import { AGENT_COLOR, AGENT_ICON, AGENT_LABEL } from '../../utils/agentMeta'

export default function Badge({ agent, className = '' }) {
  const color = AGENT_COLOR[agent] || 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20'
  
  return (
    <span 
      className={`inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full border backdrop-blur-md ${color} ${className}`}
      style={{ animation: 'badgeIn 0.3s ease-out' }}
    >
      <style>{`
        @keyframes badgeIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
      `}</style>
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-current opacity-40 animate-ping"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
      </span>
      <span className="opacity-70">{AGENT_ICON[agent]}</span>
      {AGENT_LABEL[agent]}
    </span>
  )
}