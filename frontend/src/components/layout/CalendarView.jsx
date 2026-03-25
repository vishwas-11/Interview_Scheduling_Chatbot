// const DAYS   = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
// const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

// export default function CalendarView({ interviews }) {
//   const today = new Date()
//   const year = today.getFullYear()
//   const month = today.getMonth()
//   const daysInMonth = new Date(year, month + 1, 0).getDate()
//   const firstDay = new Date(year, month, 1).getDay()

//   const byDate = {}
//   interviews.forEach((iv) => {
//     if (!iv.date) return
//     if (!byDate[iv.date]) byDate[iv.date] = []
//     byDate[iv.date].push(iv)
//   })

//   const cells = [
//     ...Array(firstDay).fill(null),
//     ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
//   ]

//   return (
//     <div className="px-4 py-4">
//       <div className="flex items-center justify-between mb-6">
//         <div className="flex items-center gap-2">
//           <div className="w-1 h-3 bg-indigo-500 rounded-full" />
//           <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Calendar</span>
//         </div>
//         <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
//           {MONTHS[month]} {year}
//         </span>
//       </div>

//       <div className="grid grid-cols-7 mb-2">
//         {DAYS.map((d) => (
//           <div key={d} className="text-center text-[9px] font-bold text-slate-600 uppercase py-1">{d}</div>
//         ))}
//       </div>

//       <div className="grid grid-cols-7 gap-1">
//         {cells.map((day, idx) => {
//           if (!day) return <div key={`pad-${idx}`} />
//           const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
//           const dayItems = byDate[dateKey] || []
//           const isToday = day === today.getDate()
//           const hasInterview = dayItems.length > 0

//           return (
//             <div
//               key={dateKey}
//               className={`relative aspect-square flex flex-col items-center justify-center rounded-lg text-[10px] font-bold transition-all duration-300 border ${
//                 isToday      ? 'bg-indigo-500 text-white border-indigo-400 shadow-lg shadow-indigo-500/20 scale-105 z-10' :
//                 hasInterview ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
//                 'text-slate-500 border-white/5 hover:bg-white/5'
//               }`}
//             >
//               {day}
//               {hasInterview && !isToday && (
//                 <div className="absolute bottom-1 w-1 h-1 rounded-full bg-emerald-400 shadow-[0_0_5px_rgba(52,211,153,0.8)]" />
//               )}
//             </div>
//           )
//         })}
//       </div>

//       <div className="mt-8">
//         <span className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] block mb-4 ml-1">
//           Pipeline Queue ({interviews.length})
//         </span>

//         {interviews.length === 0 ? (
//           <p className="text-[10px] text-slate-700 font-bold uppercase text-center py-8 tracking-widest opacity-40">
//             No confirmed slots
//           </p>
//         ) : (
//           <div className="space-y-2">
//             {interviews.map((iv) => (
//               <div
//                 key={iv.event_id}
//                 className="flex items-center gap-3 px-4 py-3 bg-white/[0.03] border border-white/5 rounded-xl hover:border-white/10 transition-colors"
//               >
//                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
//                 <div className="flex flex-col min-w-0">
//                   <span className="text-[11px] font-bold text-white tracking-tight">{iv.date}</span>
//                   <span className="text-[10px] font-medium text-slate-500">{iv.slot}</span>
//                 </div>
//                 <span className="ml-auto text-[8px] font-bold text-emerald-500/60 uppercase tracking-tighter border border-emerald-500/20 px-1.5 py-0.5 rounded">
//                   Confirmed
//                 </span>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }








import React from 'react';

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export default function CalendarView({ interviews = [] }) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  
  // Calculate calendar grid
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  // Map interviews to date strings for easy lookup
  const byDate = {};
  interviews.forEach((iv) => {
    if (!iv.date) return;
    // Expects date format "YYYY-MM-DD"
    if (!byDate[iv.date]) byDate[iv.date] = [];
    byDate[iv.date].push(iv);
  });

  const cells = [
    ...Array(firstDayOfMonth).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="px-4 py-5 h-full flex flex-col overflow-hidden">
      {/* 1. INTERNAL STYLES */}
      <style>{`
        @keyframes calendarFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .calendar-grid-item {
          transition: all 0.2s ease-in-out;
        }
        .calendar-grid-item:hover:not(.empty-cell) {
          background-color: rgba(255, 255, 255, 0.05);
          transform: translateY(-1px);
        }
        .custom-scroll-cal::-webkit-scrollbar { width: 3px; }
        .custom-scroll-cal::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll-cal::-webkit-scrollbar-thumb { 
          background: rgba(99, 102, 241, 0.2); 
          border-radius: 10px; 
        }
      `}</style>

      {/* 2. HEADER */}
      <div className="flex items-center justify-between mb-6" style={{ animation: 'calendarFadeIn 0.4s ease-out' }}>
        <div className="flex items-center gap-2">
          <div className="w-1 h-3 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
          <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">
            Calendar
          </span>
        </div>
        <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2 py-1 rounded border border-indigo-500/20">
          {MONTHS[month]} {year}
        </span>
      </div>

      {/* 3. DATE GRID */}
      <div className="flex-shrink-0" style={{ animation: 'calendarFadeIn 0.5s ease-out' }}>
        <div className="grid grid-cols-7 mb-2">
          {DAYS.map((d) => (
            <div key={d} className="text-center text-[9px] font-bold text-slate-600 uppercase py-1 tracking-tighter">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, idx) => {
            if (!day) return <div key={`pad-${idx}`} className="aspect-square empty-cell" />;
            
            const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayItems = byDate[dateKey] || [];
            const isToday = day === today.getDate();
            const hasInterview = dayItems.length > 0;

            return (
              <div
                key={dateKey}
                className={`
                  relative aspect-square flex flex-col items-center justify-center rounded-lg 
                  text-[10px] font-bold border calendar-grid-item
                  ${isToday 
                    ? 'bg-indigo-600 border-indigo-400 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)] z-10 scale-105' 
                    : hasInterview 
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                      : 'border-white/5 text-slate-500'
                  }
                `}
              >
                {day}
                {hasInterview && !isToday && (
                  <div className="absolute bottom-1.5 w-1 h-1 rounded-full bg-emerald-400 shadow-[0_0_5px_rgba(52,211,153,0.8)]" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. SCHEDULED LIST */}
      <div className="mt-8 flex-1 flex flex-col min-h-0" style={{ animation: 'calendarFadeIn 0.6s ease-out' }}>
        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] block mb-4 ml-1">
          Confirmed Pipeline ({interviews.length})
        </span>

        <div className="flex-1 overflow-y-auto custom-scroll-cal pr-1 space-y-2">
          {interviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 border border-dashed border-white/5 rounded-2xl opacity-40">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                No slots booked
              </span>
            </div>
          ) : (
            interviews.map((iv, i) => (
              <div
                key={iv.id || i}
                className="group flex items-center gap-3 px-4 py-3 bg-white/[0.03] border border-white/5 rounded-xl hover:border-indigo-500/30 hover:bg-white/[0.05] transition-all cursor-default"
              >
                <div className={`w-1.5 h-1.5 rounded-full ${iv.status === 'urgent' ? 'bg-rose-500' : 'bg-emerald-500'} shadow-[0_0_8px_rgba(16,185,129,0.4)]`} />
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] font-bold text-white tracking-tight">{iv.date}</span>
                  <span className="text-[10px] font-medium text-slate-500 tracking-tight">{iv.slot}</span>
                </div>
                <div className="ml-auto text-right">
                  <span className="block text-[8px] font-bold text-emerald-500/60 uppercase tracking-tighter border border-emerald-500/20 px-1.5 py-0.5 rounded">
                    {iv.type || 'Confirmed'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}