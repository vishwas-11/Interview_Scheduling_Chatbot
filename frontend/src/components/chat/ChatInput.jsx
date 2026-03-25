export default function ChatInput({ value, onChange, onSend, disabled }) {
  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); onSend() }
  }

  return (
    <div className="px-4 py-4 border-t border-navy-800">
      <div className="flex items-end gap-3 bg-navy-800 border border-navy-700 rounded-2xl px-4 py-3 focus-within:border-electric-500/50 transition-colors duration-200">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Type a message… (Enter to send)"
          rows={1}
          disabled={disabled}
          className="flex-1 bg-transparent resize-none text-sm text-slate-200 placeholder-slate-600 outline-none leading-relaxed max-h-32 disabled:opacity-50"
          style={{ minHeight: '24px' }}
        />
        <button
          onClick={onSend}
          disabled={!value.trim() || disabled}
          className="w-8 h-8 flex items-center justify-center rounded-xl bg-electric-500 hover:bg-electric-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex-shrink-0"
        >
          <svg className="w-4 h-4 text-white rotate-90" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
      <p className="text-[10px] text-slate-700 text-center mt-2 font-mono">
        Try: "schedule an interview tomorrow at 3pm"
      </p>
    </div>
  )
}