// import { useChat }    from '../hooks/useChat'
// import Topbar        from '../components/layout/Topbar'
// import Sidebar       from '../components/layout/Sidebar'
// import MessageList   from '../components/chat/MessageList'
// import ChatInput     from '../components/chat/ChatInput'

// export default function ChatPage() {
//   const {
//     messages, input, setInput, loading, sendMessage,
//     activeAgent, agentTimeline, toolLog, interviews,
//   } = useChat()

//   return (
//     <div className="h-screen bg-navy-950 flex flex-col overflow-hidden">
//       <Topbar activeAgent={activeAgent} />

//       <div className="flex flex-1 overflow-hidden">
//         {/* Main chat area */}
//         <main className="flex-1 flex flex-col min-w-0">
//           {/* Chat header */}
//           <div className="flex items-center gap-3 px-5 py-3.5 border-b border-navy-800 flex-shrink-0">
//             <div className="w-2 h-2 rounded-full bg-electric-400 animate-pulse-slow" />
//             <span className="font-display font-semibold text-sm text-slate-200 tracking-wide">
//               AI Scheduler
//             </span>
//             <span className="ml-auto text-[10px] font-mono text-slate-600 uppercase tracking-widest">
//               Online
//             </span>
//           </div>

//           {/* Messages */}
//           <MessageList messages={messages} loading={loading} />

//           {/* Input */}
//           <ChatInput
//             value={input}
//             onChange={setInput}
//             onSend={sendMessage}
//             disabled={loading}
//           />
//         </main>

//         {/* Right sidebar */}
//         <Sidebar
//           activeAgent={activeAgent}
//           loading={loading}
//           agentTimeline={agentTimeline}
//           toolLog={toolLog}
//           interviews={interviews}
//         />
//       </div>
//     </div>
//   )
// }









import { useChat } from '../hooks/useChat'
import Topbar from '../components/layout/Topbar'
import Sidebar from '../components/layout/Sidebar'
import MessageList from '../components/chat/MessageList'
import ChatInput from '../components/chat/ChatInput'
import LineWaves from '../components/layout/LineWaves' // Import the shader

export default function ChatPage() {
  const {
    messages, input, setInput, loading, sendMessage,
    activeAgent, agentTimeline, toolLog, interviews,
  } = useChat()

  return (
    <div className="relative h-screen bg-[#050505] flex flex-col overflow-hidden text-white font-sans">
      
      {/* 1. THE SHADER BACKGROUND */}
      {/* Set to fixed and low opacity so it stays behind all UI elements */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <LineWaves 
          speed={0.15}
          innerLineCount={45}
          outerLineCount={50}
          warpIntensity={0.6}
          rotation={-20}
          color1="#6366f1" // Indigo
          color2="#a855f7" // Purple
          color3="#ec4899" // Pink
          brightness={0.1}
        />
      </div>

      {/* 2. TOPBAR */}
      {/* Ensure Topbar has a backdrop-blur-md for the glass effect */}
      <div className="relative z-30">
        <Topbar activeAgent={activeAgent} />
      </div>

      <div className="relative z-20 flex flex-1 overflow-hidden">
        
        {/* 3. MAIN CHAT AREA */}
        <main className="flex-1 flex flex-col min-w-0 bg-white/[0.01] backdrop-blur-sm border-r border-white/5">
          
          {/* Chat header */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-white/5 flex-shrink-0 bg-black/20">
            <div className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xs text-white tracking-widest uppercase">
                AI Scheduler Engine
              </span>
              <span className="text-[10px] text-indigo-400/80 font-medium">
                Autonomous Mode Active
              </span>
            </div>
            
            <div className="ml-auto px-2 py-1 rounded bg-indigo-500/10 border border-indigo-500/20">
              <span className="text-[9px] font-mono text-indigo-300 uppercase tracking-tighter">
                v2.0_stable
              </span>
            </div>
          </div>

          {/* Messages container with custom scrollbar styling in CSS recommended */}
          <div className="flex-1 overflow-hidden flex flex-col relative">
             <MessageList messages={messages} loading={loading} />
          </div>

          {/* Input Area - Positioned above shader with glass effect */}
          <div className="p-4 bg-gradient-to-t from-black/40 to-transparent">
            <ChatInput
              value={input}
              onChange={setInput}
              onSend={sendMessage}
              disabled={loading}
            />
          </div>
        </main>

        {/* 4. RIGHT SIDEBAR */}
        {/* Sidebar should ideally have a transparent/blur background */}
        <aside className="w-80 hidden lg:block overflow-y-auto bg-black/20 backdrop-blur-xl border-l border-white/5">
          <Sidebar
            activeAgent={activeAgent}
            loading={loading}
            agentTimeline={agentTimeline}
            toolLog={toolLog}
            interviews={interviews}
          />
        </aside>
      </div>
    </div>
  )
}