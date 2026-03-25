import { useState } from 'react'
import { TOOL_COLOR } from '../../utils/agentMeta'

function ToolEntry({ log, isLatest }) {
  const [expanded, setExpanded] = useState(isLatest)
  const color = TOOL_COLOR[log.tool] || 'text-slate-400 border-slate-500/30 bg-slate-500/10'
  const time  = log.time?.toLocaleTimeString([], {
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  })

  return (
    <div className={`rounded-xl border overflow-hidden transition-colors ${
      isLatest ? 'border-navy-600' : 'border-navy-800'
    }`}>
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-navy-800/50 transition-colors text-left"
      >
        <span className={`text-[10px] font-mono px-2 py-0.5 rounded border flex-shrink-0 ${color}`}>
          {log.tool}
        </span>
        <span className="text-[9px] text-slate-700 font-mono ml-auto flex-shrink-0">{time}</span>
        <span className="text-slate-600 text-[10px] flex-shrink-0">{expanded ? '▾' : '▸'}</span>
      </button>

      {expanded && (
        <div className="px-3 pb-3 space-y-2 border-t border-navy-800">
          <div className="pt-2">
            <span className="text-[9px] font-mono text-slate-600 uppercase tracking-wider block mb-1">
              Input
            </span>
            <pre className="text-[10px] font-mono text-slate-400 bg-navy-950 rounded-lg p-2.5 overflow-x-auto whitespace-pre-wrap break-all leading-relaxed">
              {JSON.stringify(log.input, null, 2)}
            </pre>
          </div>
          <div>
            <span className="text-[9px] font-mono text-slate-600 uppercase tracking-wider block mb-1">
              Output
            </span>
            <pre className="text-[10px] font-mono text-slate-400 bg-navy-950 rounded-lg p-2.5 overflow-x-auto whitespace-pre-wrap break-all leading-relaxed">
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
    <div className="px-4 py-3">
      <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest block mb-4">
        Tool Inspector
      </span>

      {toolLog.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 gap-2">
          <span className="text-3xl opacity-10">🔧</span>
          <span className="text-xs text-slate-700 font-mono">No tools called yet</span>
        </div>
      ) : (
        <div className="space-y-2">
          {[...toolLog].reverse().map((log, idx) => (
            <ToolEntry key={log.id} log={log} isLatest={idx === 0} />
          ))}
        </div>
      )}
    </div>
  )
}