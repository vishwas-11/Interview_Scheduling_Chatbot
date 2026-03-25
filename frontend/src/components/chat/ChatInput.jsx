export default function ChatInput({ value, onChange, onSend, disabled }) {
  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { 
      e.preventDefault(); 
      if (value.trim()) onSend(); 
    }
  }

  return (
    <div className="px-6 py-6 border-t border-white/5 bg-black/40 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end gap-3 bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-3 focus-within:border-indigo-500/50 focus-within:bg-white/[0.05] transition-all duration-300 shadow-2xl">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Instruct the AI scheduler..."
            rows={1}
            disabled={disabled}
            className="flex-1 bg-transparent resize-none text-sm text-white placeholder-slate-600 outline-none leading-relaxed max-h-32 disabled:opacity-50 py-1"
            style={{ minHeight: '24px' }}
          />
          
          <button
            onClick={onSend}
            disabled={!value.trim() || disabled}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-20 disabled:grayscale transition-all flex-shrink-0 shadow-lg shadow-indigo-500/20 active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
            </svg>
          </button>
        </div>
        
        <p className="text-[10px] text-slate-500 text-center mt-3 font-bold uppercase tracking-[0.2em] opacity-50">
          Tip: Try "Schedule an intro call with Sarah for Friday"
        </p>
      </div>
    </div>
  )
}