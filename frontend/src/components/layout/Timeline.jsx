// import { AGENT_COLOR, AGENT_ICON, AGENT_LABEL } from '../../utils/agentMeta'

// function TimelineEntry({ entry, isLatest }) {
//   const time = entry.time?.toLocaleTimeString([], {
//     hour: '2-digit', minute: '2-digit', second: '2-digit'
//   })

//   return (
//     <div className={`flex items-start gap-4 pl-1 transition-all duration-700 ${isLatest ? 'opacity-100 scale-100' : 'opacity-30 scale-95 grayscale'}`}>
//       <div className={`relative z-10 w-6 h-6 rounded-lg flex items-center justify-center text-xs flex-shrink-0 mt-0.5 border transition-all ${
//         isLatest
//           ? 'bg-indigo-600 border-indigo-400 shadow-lg shadow-indigo-500/40 text-white'
//           : 'bg-black/40 border-white/10 text-slate-500'
//       }`}>
//         {AGENT_ICON[entry.agent]}
//       </div>

//       <div className="flex flex-col gap-1 min-w-0">
//         <span className={`text-[11px] font-bold uppercase tracking-wider ${isLatest ? 'text-white' : 'text-slate-500'}`}>
//           {AGENT_LABEL[entry.agent]}
//         </span>
//         {entry.intent && (
//           <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full w-fit border uppercase tracking-tighter ${
//             isLatest ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' : 'bg-white/5 border-white/10 text-slate-600'
//           }`}>
//             {entry.intent}
//           </span>
//         )}
//         <span className="text-[9px] text-slate-700 font-mono font-bold uppercase tracking-widest">{time}</span>
//       </div>
//     </div>
//   )
// }

// export default function Timeline({ agentTimeline }) {
//   return (
//     <div className="px-4 py-4">
//       <div className="flex items-center gap-2 mb-6">
//         <div className="w-1 h-3 bg-indigo-500 rounded-full" />
//         <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Agent Activity Log</span>
//       </div>

//       {agentTimeline.length === 0 ? (
//         <div className="flex flex-col items-center justify-center py-12 border border-dashed border-white/5 rounded-2xl">
//           <span className="text-[10px] text-slate-700 font-bold uppercase tracking-widest">Awaiting Transition...</span>
//         </div>
//       ) : (
//         <div className="relative">
//           {/* Subtle connecting vertical line */}
//           <div className="absolute left-[11px] top-2 bottom-2 w-[1px] bg-gradient-to-b from-indigo-500/50 via-white/5 to-transparent" />
//           <div className="space-y-8">
//             {agentTimeline.map((entry, idx) => (
//               <TimelineEntry
//                 key={idx}
//                 entry={entry}
//                 isLatest={idx === agentTimeline.length - 1}
//               />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }








import { AGENT_ICON, AGENT_LABEL } from '../../utils/agentMeta'

function TimelineEntry({ entry, isLatest }) {
  return (
    <div className={`flex items-start gap-4 pl-1 transition-all duration-500 ${isLatest ? 'opacity-100 scale-100' : 'opacity-30 scale-95 grayscale'}`}>
      <div className={`relative z-10 w-6 h-6 rounded-lg flex items-center justify-center text-xs flex-shrink-0 mt-0.5 border ${
        isLatest ? 'bg-indigo-600 border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.4)] text-white' : 'bg-black/40 border-white/10 text-slate-500'
      }`}>
        {AGENT_ICON[entry.agent]}
      </div>
      <div className="flex flex-col gap-1">
        <span className={`text-[11px] font-bold uppercase tracking-wider ${isLatest ? 'text-white' : 'text-slate-500'}`}>
          {AGENT_LABEL[entry.agent]}
        </span>
        <span className="text-[9px] text-slate-700 font-mono font-bold uppercase tracking-widest">
          {entry.time?.toLocaleTimeString()}
        </span>
      </div>
    </div>
  )
}

export default function Timeline({ agentTimeline }) {
  return (
    <div className="px-4 py-4 relative">
      <div className="flex items-center gap-2 mb-6 text-[10px] font-bold text-white uppercase tracking-[0.2em]">
        <div className="w-1 h-3 bg-indigo-500 rounded-full" /> Activity Log
      </div>
      <div className="absolute left-[26px] top-16 bottom-8 w-[1px] bg-gradient-to-b from-indigo-500/50 via-white/5 to-transparent" />
      <div className="space-y-8">
        {agentTimeline.map((entry, idx) => (
          <TimelineEntry key={idx} entry={entry} isLatest={idx === agentTimeline.length - 1} />
        ))}
      </div>
    </div>
  )
}