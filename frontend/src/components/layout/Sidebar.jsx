// import { useState } from 'react'
// import StatusBar from './StatusBar'
// import Timeline from './Timeline'
// import ToolInspector from './ToolInspector'
// import CalendarView from './CalendarView'

// const TABS = [
//   { id: 'timeline', label: 'Timeline' },
//   { id: 'tools',    label: 'Tools'    },
//   { id: 'calendar', label: 'Calendar' },
// ]

// export default function Sidebar({ activeAgent, loading, agentTimeline, toolLog, interviews }) {
//   const [activeTab, setActiveTab] = useState('timeline')

//   return (
//     <aside className="w-72 xl:w-80 flex-shrink-0 flex flex-col border-l border-white/5 h-full overflow-hidden bg-black/20 backdrop-blur-xl">
//       {/* Always-visible status bar */}
//       <StatusBar activeAgent={activeAgent} loading={loading} />

//       {/* Tab strip */}
//       <div className="flex border-b border-white/5 px-3 pt-2 gap-1 flex-shrink-0 bg-black/40">
//         {TABS.map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`px-3 py-2 text-[10px] font-bold uppercase tracking-widest rounded-t-lg transition-all duration-200 ${
//               activeTab === tab.id
//                 ? 'text-indigo-400 border-b-2 border-indigo-500 -mb-px bg-white/[0.03]'
//                 : 'text-slate-600 hover:text-slate-400'
//             }`}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Tab content — scrollable */}
//       <div className="flex-1 overflow-y-auto custom-scrollbar">
//         {activeTab === 'timeline' && <Timeline agentTimeline={agentTimeline} />}
//         {activeTab === 'tools'    && <ToolInspector toolLog={toolLog} />}
//         {activeTab === 'calendar' && <CalendarView interviews={interviews} />}
//       </div>
//     </aside>
//   )
// }







import { useState } from 'react'
import StatusBar from './StatusBar'
import Timeline from './Timeline'
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
    <aside className="w-72 xl:w-80 flex-shrink-0 flex flex-col border-l border-white/5 h-full overflow-hidden bg-black/20 backdrop-blur-xl"
           style={{ animation: 'sidebarSlide 0.5s ease-out' }}>
      <style>{`
        @keyframes sidebarSlide { from { transform: translateX(30px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        .custom-scroll::-webkit-scrollbar { width: 3px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: rgba(99, 102, 241, 0.2); border-radius: 10px; }
      `}</style>

      <StatusBar activeAgent={activeAgent} loading={loading} />

      <div className="flex border-b border-white/5 px-3 pt-2 gap-1 flex-shrink-0 bg-black/40">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-2 text-[10px] font-bold uppercase tracking-widest rounded-t-lg transition-all duration-200 ${
              activeTab === tab.id
                ? 'text-indigo-400 border-b-2 border-indigo-500 -mb-px bg-white/[0.03]'
                : 'text-slate-600 hover:text-slate-400'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto custom-scroll">
        {activeTab === 'timeline' && <Timeline agentTimeline={agentTimeline} />}
        {activeTab === 'tools'    && <ToolInspector toolLog={toolLog} />}
        {activeTab === 'calendar' && <CalendarView interviews={interviews} />}
      </div>
    </aside>
  )
}