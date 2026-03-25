export default function TypingIndicator() {
  return (
    <div className="flex items-end gap-2.5 mb-5">
      <div className="w-7 h-7 rounded-full bg-navy-800 border border-navy-700 flex items-center justify-center text-xs flex-shrink-0">
        🤖
      </div>
      <div className="bg-navy-800 border border-navy-700 rounded-2xl rounded-bl-sm px-4 py-3">
        <div className="flex gap-1.5 items-center h-4">
          <span className="typing-dot w-1.5 h-1.5 rounded-full bg-electric-400 block" />
          <span className="typing-dot w-1.5 h-1.5 rounded-full bg-electric-400 block" />
          <span className="typing-dot w-1.5 h-1.5 rounded-full bg-electric-400 block" />
        </div>
      </div>
    </div>
  )
}