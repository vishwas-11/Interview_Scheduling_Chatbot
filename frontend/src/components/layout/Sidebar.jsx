import { useState } from 'react'
import StatusBar    from './StatusBar'
import Timeline     from './Timeline'
import ToolInspector from './ToolInspector'
import CalendarView from './CalendarView'

const TABS = [
  { id: 'timeline', label: 'Timeline' },
  { id: 'tools',    label: 'Tools'    },
  { id: 'calendar', label: 'Calendar' },
]

export default function Sidebar({ activeAgent, loading, agentTimeline, toolLog, interviews }) {
  const [activeTab, setActiveTab] = useState('timeline')

  return (
    <aside className="w-72 xl:w-80 flex-shrink-0 flex flex-col border-l border-navy-800 h-full overflow-hidden">
      {/* Always-visible status bar */}
      <StatusBar activeAgent={activeAgent} loading={loading} />

      {/* Tab strip */}
      <div className="flex border-b border-navy-800 px-3 pt-2 gap-0.5 flex-shrink-0">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1.5 text-[11px] font-mono rounded-t-md transition-all duration-150 ${
              activeTab === tab.id
                ? 'text-electric-300 border-b-2 border-electric-500 -mb-px bg-navy-800/40'
                : 'text-slate-600 hover:text-slate-400'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content — scrollable */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'timeline' && <Timeline agentTimeline={agentTimeline} />}
        {activeTab === 'tools'    && <ToolInspector toolLog={toolLog} />}
        {activeTab === 'calendar' && <CalendarView interviews={interviews} />}
      </div>
    </aside>
  )
}







// export default function Sidebar({ user, logout }) {
//   return (
//     <aside className="w-64 border-r border-slate-800 flex flex-col bg-[#010409]">
//       <div className="p-6">
//         <div className="flex items-center gap-3 mb-8">
//           <div className="w-8 h-8 bg-[#00f2ff] rounded-lg flex items-center justify-center text-[#020617] font-bold">
//             IS
//           </div>
//           <span className="font-bold text-lg">Scheduler</span>
//         </div>
        
//         <button className="w-full py-3 px-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 text-sm font-medium transition-all text-left flex items-center gap-2">
//           <span className="text-lg">+</span> New Chat
//         </button>
//       </div>

//       <div className="flex-1 px-4 overflow-y-auto">
//         <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-2">Recent History</p>
//         {/* Placeholder history items */}
//         <div className="space-y-1">
//           <div className="p-3 rounded-lg bg-[#00f2ff]/5 text-[#00f2ff] text-sm cursor-pointer">Frontend Developer...</div>
//           <div className="p-3 rounded-lg hover:bg-slate-900 text-slate-400 text-sm cursor-pointer transition-colors">Backend Interview...</div>
//         </div>
//       </div>

//       <div className="p-4 border-t border-slate-800">
//         <div className="flex items-center gap-3 p-2 mb-2">
//           <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs">
//             {user?.email?.charAt(0).toUpperCase() || 'U'}
//           </div>
//           <div className="overflow-hidden">
//             <p className="text-xs font-medium truncate">{user?.email}</p>
//             <p className="text-[10px] text-slate-500">Free Plan</p>
//           </div>
//         </div>
//         <button 
//           onClick={logout}
//           className="w-full py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
//         >
//           Sign Out
//         </button>
//       </div>
//     </aside>
//   )
// }