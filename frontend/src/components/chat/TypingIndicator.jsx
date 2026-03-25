// export default function TypingIndicator() {
//   return (
//     <div className="flex items-end gap-2.5 mb-5">
//       <div className="w-7 h-7 rounded-full bg-navy-800 border border-navy-700 flex items-center justify-center text-xs flex-shrink-0">
//         🤖
//       </div>
//       <div className="bg-navy-800 border border-navy-700 rounded-2xl rounded-bl-sm px-4 py-3">
//         <div className="flex gap-1.5 items-center h-4">
//           <span className="typing-dot w-1.5 h-1.5 rounded-full bg-electric-400 block" />
//           <span className="typing-dot w-1.5 h-1.5 rounded-full bg-electric-400 block" />
//           <span className="typing-dot w-1.5 h-1.5 rounded-full bg-electric-400 block" />
//         </div>
//       </div>
//     </div>
//   )
// }





export default function TypingIndicator() {
  return (
    <div className="flex items-end gap-3 mb-6" style={{ animation: 'fadeIn 0.4s ease-out' }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes typing { 0%, 100% { transform: translateY(0); opacity: 0.4; } 50% { transform: translateY(-4px); opacity: 1; } }
      `}</style>

      {/* AI Icon */}
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm flex-shrink-0 mb-6 shadow-lg border border-white/10">
        <span>🤖</span>
      </div>

      {/* Bubble */}
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl rounded-bl-none px-5 py-4 backdrop-blur-md">
        <div className="flex gap-1.5 items-center h-2">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" style={{ animation: 'typing 1.4s infinite 0ms' }} />
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" style={{ animation: 'typing 1.4s infinite 200ms' }} />
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" style={{ animation: 'typing 1.4s infinite 400ms' }} />
        </div>
      </div>
      
      <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest pb-1 self-end">
        Analyzing Slots...
      </span>
    </div>
  )
}