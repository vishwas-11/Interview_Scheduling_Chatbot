import { AGENT_COLOR, AGENT_ICON, AGENT_LABEL } from '../../utils/agentMeta'

function TimelineEntry({ entry, isLatest }) {
  const time = entry.time?.toLocaleTimeString([], {
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  })

  return (
    <div className={`flex items-start gap-3 pl-1 transition-opacity duration-300 ${isLatest ? 'opacity-100' : 'opacity-40'}`}>
      {/* Dot */}
      <div className={`relative z-10 w-5 h-5 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5 border ${
        isLatest
          ? 'bg-electric-500/20 border-electric-500/50'
          : 'bg-navy-800 border-navy-700'
      }`}>
        {AGENT_ICON[entry.agent]}
      </div>

      <div className="flex flex-col gap-0.5 min-w-0">
        <span className={`text-xs font-display font-medium ${isLatest ? 'text-slate-200' : 'text-slate-500'}`}>
          {AGENT_LABEL[entry.agent]}
        </span>
        {entry.intent && (
          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded w-fit border ${AGENT_COLOR[entry.agent]}`}>
            intent: {entry.intent}
          </span>
        )}
        <span className="text-[9px] text-slate-700 font-mono">{time}</span>
      </div>
    </div>
  )
}

export default function Timeline({ agentTimeline }) {
  return (
    <div className="px-4 py-3">
      <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest block mb-4">
        Agent Timeline
      </span>

      {agentTimeline.length === 0 ? (
        <p className="text-xs text-slate-700 font-mono text-center py-6">No transitions yet</p>
      ) : (
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-3.5 top-0 bottom-0 w-px bg-navy-700" />
          <div className="space-y-4">
            {agentTimeline.map((entry, idx) => (
              <TimelineEntry
                key={idx}
                entry={entry}
                isLatest={idx === agentTimeline.length - 1}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}