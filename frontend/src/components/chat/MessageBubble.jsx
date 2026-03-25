// import Badge from '../ui/Badge'
// import { AGENT_ICON } from '../../utils/agentMeta'

// export default function MessageBubble({ msg }) {
//   const isUser = msg.role === 'user'
//   const time   = msg.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

//   return (
//     <div className={`animate-fade-up flex items-end gap-2.5 mb-5 ${isUser ? 'flex-row-reverse' : ''}`}>

//       {/* Avatar */}
//       {!isUser && (
//         <div className="w-7 h-7 rounded-full bg-navy-800 border border-navy-700 flex items-center justify-center text-xs flex-shrink-0 mb-4">
//           {AGENT_ICON[msg.agent] ?? '🤖'}
//         </div>
//       )}

//       <div className={`flex flex-col gap-1 max-w-[76%] ${isUser ? 'items-end' : 'items-start'}`}>

//         {/* Agent badge */}
//         {!isUser && msg.agent && <Badge agent={msg.agent} />}

//         {/* Bubble */}
//         <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap break-words ${
//           isUser
//             ? 'bg-electric-500 text-white rounded-br-sm'
//             : `bg-navy-800 border text-slate-200 rounded-bl-sm ${msg.conflict ? 'border-amber-500/40' : 'border-navy-700'}`
//         }`}>
//           {msg.conflict && (
//             <p className="flex items-center gap-1.5 mb-2 text-amber-400 text-[11px] font-mono">
//               <span>⚠</span> Conflict detected — slot reassigned
//             </p>
//           )}
//           {msg.text}
//         </div>

//         <span className="text-[10px] text-slate-600 px-1">{time}</span>
//       </div>
//     </div>
//   )
// }







// import Badge from '../ui/Badge'
// import { AGENT_ICON } from '../../utils/agentMeta'

// export default function MessageBubble({ msg }) {
//   const isUser = msg.role === 'user'
//   const time = msg.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

//   return (
//     <div className={`flex items-end gap-3 mb-6 ${isUser ? 'flex-row-reverse animate-fade-in-right' : 'animate-fade-in-left'}`}>

//       {/* 1. AVATAR (AI Only) */}
//       {!isUser && (
//         <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm flex-shrink-0 mb-6 shadow-lg shadow-indigo-500/10 border border-white/10">
//           <span className="drop-shadow-sm">{AGENT_ICON[msg.agent] ?? '🤖'}</span>
//         </div>
//       )}

//       {/* 2. MESSAGE CONTENT */}
//       <div className={`flex flex-col gap-2 max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>

//         {/* Dynamic Agent Badge */}
//         {!isUser && msg.agent && (
//           <div className="ml-1">
//             <Badge agent={msg.agent} />
//           </div>
//         )}

//         {/* The Bubble */}
//         <div className={`relative px-4 py-3 rounded-2xl text-[13.5px] leading-relaxed whitespace-pre-wrap break-words transition-all duration-300 ${
//           isUser
//             ? 'bg-indigo-600 text-white rounded-br-none shadow-lg shadow-indigo-600/10 font-medium'
//             : `bg-white/[0.03] backdrop-blur-md border text-slate-200 rounded-bl-none ${
//                 msg.conflict ? 'border-amber-500/40 bg-amber-500/5' : 'border-white/10'
//               }`
//         }`}>
          
//           {/* Conflict Notification Style */}
//           {msg.conflict && (
//             <div className="flex items-center gap-2 mb-2 pb-2 border-b border-amber-500/20 text-amber-400 text-[10px] font-bold uppercase tracking-widest">
//               <span className="text-sm">⚡</span> System: Conflict Resolved
//             </div>
//           )}

//           {msg.text}
//         </div>

//         {/* Timestamp */}
//         <div className="flex items-center gap-2 px-1">
//            <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">{time}</span>
//            {isUser && (
//              <div className="flex gap-0.5">
//                 <div className="w-1 h-1 rounded-full bg-indigo-500/40" />
//                 <div className="w-1 h-1 rounded-full bg-indigo-500/40" />
//              </div>
//            )}
//         </div>
//       </div>
//     </div>
//   )
// }










import Badge from '../ui/Badge'
import { AGENT_ICON } from '../../utils/agentMeta'

export default function MessageBubble({ msg }) {
  const isUser = msg.role === 'user'
  const time = msg.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  return (
    <div 
      className={`flex items-end gap-3 mb-6 ${isUser ? 'flex-row-reverse' : ''}`}
      style={{ animation: isUser ? 'slideInRight 0.4s ease-out' : 'slideInLeft 0.4s ease-out' }}
    >
      <style>{`
        @keyframes slideInRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>

      {!isUser && (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm flex-shrink-0 mb-6 border border-white/10 shadow-lg">
          <span className="drop-shadow-sm">{AGENT_ICON[msg.agent] ?? '🤖'}</span>
        </div>
      )}

      <div className={`flex flex-col gap-2 max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
        {!isUser && msg.agent && <div className="ml-1"><Badge agent={msg.agent} /></div>}

        <div className={`px-4 py-3 rounded-2xl text-[13.5px] leading-relaxed whitespace-pre-wrap break-words border transition-all ${
          isUser
            ? 'bg-indigo-600 border-indigo-500 text-white rounded-br-none shadow-md font-medium'
            : `bg-white/[0.03] backdrop-blur-md text-slate-200 rounded-bl-none ${
                msg.conflict ? 'border-amber-500/40 bg-amber-500/5' : 'border-white/10'
              }`
        }`}>
          {msg.conflict && (
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-amber-500/20 text-amber-400 text-[10px] font-bold uppercase tracking-widest">
              <span>⚡</span> System: Conflict Resolved
            </div>
          )}
          {msg.text}
        </div>

        <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest px-1">{time}</span>
      </div>
    </div>
  )
}