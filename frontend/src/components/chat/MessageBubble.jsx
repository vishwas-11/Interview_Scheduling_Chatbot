import Badge from '../ui/Badge'
import { AGENT_ICON } from '../../utils/agentMeta'

export default function MessageBubble({ msg }) {
  const isUser = msg.role === 'user'
  const time   = msg.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  return (
    <div className={`animate-fade-up flex items-end gap-2.5 mb-5 ${isUser ? 'flex-row-reverse' : ''}`}>

      {/* Avatar */}
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-navy-800 border border-navy-700 flex items-center justify-center text-xs flex-shrink-0 mb-4">
          {AGENT_ICON[msg.agent] ?? '🤖'}
        </div>
      )}

      <div className={`flex flex-col gap-1 max-w-[76%] ${isUser ? 'items-end' : 'items-start'}`}>

        {/* Agent badge */}
        {!isUser && msg.agent && <Badge agent={msg.agent} />}

        {/* Bubble */}
        <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap break-words ${
          isUser
            ? 'bg-electric-500 text-white rounded-br-sm'
            : `bg-navy-800 border text-slate-200 rounded-bl-sm ${msg.conflict ? 'border-amber-500/40' : 'border-navy-700'}`
        }`}>
          {msg.conflict && (
            <p className="flex items-center gap-1.5 mb-2 text-amber-400 text-[11px] font-mono">
              <span>⚠</span> Conflict detected — slot reassigned
            </p>
          )}
          {msg.text}
        </div>

        <span className="text-[10px] text-slate-600 px-1">{time}</span>
      </div>
    </div>
  )
}