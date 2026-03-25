// import { useState } from 'react'
// import StatusBar    from './StatusBar'
// import Timeline     from './Timeline'
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
//     <aside className="w-72 xl:w-80 flex-shrink-0 flex flex-col border-l border-navy-800 h-full overflow-hidden">
//       {/* Always-visible status bar */}
//       <StatusBar activeAgent={activeAgent} loading={loading} />

//       {/* Tab strip */}
//       <div className="flex border-b border-navy-800 px-3 pt-2 gap-0.5 flex-shrink-0">
//         {TABS.map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`px-3 py-1.5 text-[11px] font-mono rounded-t-md transition-all duration-150 ${
//               activeTab === tab.id
//                 ? 'text-electric-300 border-b-2 border-electric-500 -mb-px bg-navy-800/40'
//                 : 'text-slate-600 hover:text-slate-400'
//             }`}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Tab content — scrollable */}
//       <div className="flex-1 overflow-y-auto">
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
    <aside className="w-72 xl:w-80 flex-shrink-0 flex flex-col border-l border-white/5 h-full overflow-hidden bg-black/20 backdrop-blur-xl">
      {/* Always-visible status bar */}
      <StatusBar activeAgent={activeAgent} loading={loading} />

      {/* Tab strip */}
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

      {/* Tab content — scrollable */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {activeTab === 'timeline' && <Timeline agentTimeline={agentTimeline} />}
        {activeTab === 'tools'    && <ToolInspector toolLog={toolLog} />}
        {activeTab === 'calendar' && <CalendarView interviews={interviews} />}
      </div>
    </aside>
  )
}