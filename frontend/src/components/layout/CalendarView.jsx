const DAYS   = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export default function CalendarView({ interviews }) {
  const today       = new Date()
  const year        = today.getFullYear()
  const month       = today.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDay    = new Date(year, month, 1).getDay()

  // Map date string → interview array
  const byDate = {}
  interviews.forEach((iv) => {
    if (!iv.date) return
    if (!byDate[iv.date]) byDate[iv.date] = []
    byDate[iv.date].push(iv)
  })

  // Build grid cells (null = empty padding)
  const cells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  return (
    <div className="px-4 py-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
          Calendar View
        </span>
        <span className="text-xs font-display font-semibold text-slate-300">
          {MONTHS[month]} {year}
        </span>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-[9px] font-mono text-slate-700 py-1">{d}</div>
        ))}
      </div>

      {/* Date grid */}
      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((day, idx) => {
          if (!day) return <div key={`pad-${idx}`} />

          const dateKey      = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          const dayItems     = byDate[dateKey] || []
          const isToday      = day === today.getDate()
          const hasInterview = dayItems.length > 0

          return (
            <div
              key={dateKey}
              title={hasInterview ? dayItems.map((i) => i.slot).join(', ') : undefined}
              className={[
                'relative aspect-square flex flex-col items-center justify-center rounded-lg text-[11px] font-mono cursor-default transition-all duration-150',
                isToday      && 'bg-electric-500/20 border border-electric-500/40 text-electric-300',
                hasInterview && 'bg-emerald-500/10 border border-emerald-500/25 text-emerald-300',
                !isToday && !hasInterview && 'text-slate-600 hover:bg-navy-800',
              ].filter(Boolean).join(' ')}
            >
              {day}
              {hasInterview && (
                <div className="absolute bottom-0.5 flex gap-0.5">
                  {dayItems.slice(0, 3).map((_, i) => (
                    <div key={i} className="w-1 h-1 rounded-full bg-emerald-400" />
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Scheduled list */}
      <div className="mt-4">
        <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest block mb-2">
          Scheduled ({interviews.length})
        </span>

        {interviews.length === 0 ? (
          <p className="text-xs text-slate-700 font-mono text-center py-4">
            No interviews scheduled
          </p>
        ) : (
          <div className="space-y-1.5">
            {interviews.map((iv) => (
              <div
                key={iv.event_id}
                className="flex items-center gap-2 px-3 py-2 bg-emerald-500/5 border border-emerald-500/15 rounded-xl"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] font-mono text-emerald-300">{iv.date}</span>
                  <span className="text-[10px] text-slate-500">{iv.slot}</span>
                </div>
                <span className="ml-auto text-[9px] font-mono text-emerald-700 uppercase flex-shrink-0">
                  scheduled
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}