import { useState } from 'react'
import { TOOL_COLOR } from '../../utils/agentMeta'

function ToolEntry({ log, isLatest }) {
  const [expanded, setExpanded] = useState(isLatest)
  // Fallback to Indigo theme if color not found
  const color = TOOL_COLOR[log.tool] || 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10'
  const time = log.time?.toLocaleTimeString([], {
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  })

  return (
    <div className={`rounded-xl border transition-all duration-300 overflow-hidden ${
      isLatest ? 'border-indigo-500/50 bg-indigo-500/5 shadow-lg shadow-indigo-500/5' : 'border-white/5 bg-black/20'
    }`}>
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center gap-2.5 px-3 py-3 hover:bg-white/[0.02] transition-colors text-left"
      >
        <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border flex-shrink-0 ${color}`}>
          {log.tool}
        </span>
        <span className="text-[9px] text-slate-600 font-mono ml-auto flex-shrink-0 uppercase">{time}</span>
        <span className={`text-slate-500 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 9l-7 7-7-7"/></svg>
        </span>
      </button>

      {expanded && (
        <div className="px-3 pb-3 space-y-3 border-t border-white/5 bg-black/40">
          <div className="pt-3">
            <span className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em] block mb-2 ml-1">Input Params</span>
            <pre className="text-[10px] font-mono text-indigo-300/80 bg-black/60 rounded-lg p-3 overflow-x-auto whitespace-pre-wrap break-all leading-relaxed border border-white/5">
              {JSON.stringify(log.input, null, 2)}
            </pre>
          </div>
          <div>
            <span className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em] block mb-2 ml-1">Output Result</span>
            <pre className="text-[10px] font-mono text-emerald-400/80 bg-black/60 rounded-lg p-3 overflow-x-auto whitespace-pre-wrap break-all leading-relaxed border border-white/5">
              {JSON.stringify(log.output, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}

export default function ToolInspector({ toolLog }) {
  return (
    <div className="px-4 py-4">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-1 h-3 bg-indigo-500 rounded-full" />
        <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Tool Inspector</span>
      </div>

      {toolLog.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3 border border-dashed border-white/5 rounded-2xl">
          <span className="text-2xl opacity-20 grayscale">🛠️</span>
          <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Idle - Awaiting Calls</span>
        </div>
      ) : (
        <div className="space-y-3">
          {[...toolLog].reverse().map((log, idx) => (
            <ToolEntry key={log.id} log={log} isLatest={idx === 0} />
          ))}
        </div>
      )}
    </div>
  )
}