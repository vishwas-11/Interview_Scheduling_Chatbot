// import { useChat } from '../hooks/useChat'
// import Topbar from '../components/layout/Topbar'
// import Sidebar from '../components/layout/Sidebar'
// import MessageList from '../components/chat/MessageList'
// import ChatInput from '../components/chat/ChatInput'
// import LineWaves from '../components/layout/LineWaves' // Import the shader

// export default function ChatPage() {
//   const {
//     messages, input, setInput, loading, sendMessage,
//     activeAgent, agentTimeline, toolLog, interviews,
//   } = useChat()

//   return (
//     <div className="relative h-screen bg-[#050505] flex flex-col overflow-hidden text-white font-sans">
      
//       {/* 1. THE SHADER BACKGROUND */}
//       {/* Set to fixed and low opacity so it stays behind all UI elements */}
//       <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
//         <LineWaves 
//           speed={0.15}
//           innerLineCount={45}
//           outerLineCount={50}
//           warpIntensity={0.6}
//           rotation={-20}
//           color1="#6366f1" // Indigo
//           color2="#a855f7" // Purple
//           color3="#ec4899" // Pink
//           brightness={0.1}
//         />
//       </div>

//       {/* 2. TOPBAR */}
//       {/* Ensure Topbar has a backdrop-blur-md for the glass effect */}
//       <div className="relative z-30">
//         <Topbar activeAgent={activeAgent} />
//       </div>

//       <div className="relative z-20 flex flex-1 overflow-hidden">
        
//         {/* 3. MAIN CHAT AREA */}
//         <main className="flex-1 flex flex-col min-w-0 bg-white/[0.01] backdrop-blur-sm border-r border-white/5">
          
//           {/* Chat header */}
//           <div className="flex items-center gap-3 px-6 py-4 border-b border-white/5 flex-shrink-0 bg-black/20">
//             <div className="relative flex h-2.5 w-2.5">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
//             </div>
//             <div className="flex flex-col">
//               <span className="font-bold text-xs text-white tracking-widest uppercase">
//                 AI Scheduler Engine
//               </span>
//               <span className="text-[10px] text-indigo-400/80 font-medium">
//                 Autonomous Mode Active
//               </span>
//             </div>
            
//             <div className="ml-auto px-2 py-1 rounded bg-indigo-500/10 border border-indigo-500/20">
//               <span className="text-[9px] font-mono text-indigo-300 uppercase tracking-tighter">
//                 v2.0_stable
//               </span>
//             </div>
//           </div>

//           {/* Messages container with custom scrollbar styling in CSS recommended */}
//           <div className="flex-1 overflow-hidden flex flex-col relative">
//              <MessageList messages={messages} loading={loading} />
//           </div>

//           {/* Input Area - Positioned above shader with glass effect */}
//           <div className="p-4 bg-gradient-to-t from-black/40 to-transparent">
//             <ChatInput
//               value={input}
//               onChange={setInput}
//               onSend={sendMessage}
//               disabled={loading}
//             />
//           </div>
//         </main>

//         {/* 4. RIGHT SIDEBAR */}
//         {/* Sidebar should ideally have a transparent/blur background */}
//         <aside className="w-80 hidden lg:block overflow-y-auto bg-black/20 backdrop-blur-xl border-l border-white/5">
//           <Sidebar
//             activeAgent={activeAgent}
//             loading={loading}
//             agentTimeline={agentTimeline}
//             toolLog={toolLog}
//             interviews={interviews}
//           />
//         </aside>
//       </div>
//     </div>
//   )
// }







import { useChat } from '../hooks/useChat'
import Topbar from '../components/layout/Topbar'
import Sidebar from '../components/layout/Sidebar'
import MessageList from '../components/chat/MessageList'
import ChatInput from '../components/chat/ChatInput'
import LineWaves from '../components/layout/LineWaves'

export default function ChatPage() {
  const {
    messages, input, setInput, loading, sendMessage,
    activeAgent, agentTimeline, toolLog, interviews,
  } = useChat()

  return (
    <div className="relative h-screen bg-[#020205] flex flex-col overflow-hidden text-white font-sans">
      
      {/* 1. DYNAMIC BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Deep Radial Glow to lift the "black" look */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[120px] rounded-full" />
        
        {/* Adjusted Shader - Increased brightness and opacity */}
        <div className="absolute inset-0 opacity-40"> 
          <LineWaves 
            speed={0.12}
            innerLineCount={50}
            outerLineCount={60}
            warpIntensity={0.8}
            rotation={-15}
            color1="#6366f1" // Indigo
            color2="#818cf8" // Lighter Indigo
            color3="#c084fc" // Soft Purple
            brightness={0.25} // Increased from 0.1
          />
        </div>
      </div>

      {/* 2. TOPBAR - Increased glass intensity */}
      <div className="relative z-30 bg-black/40 backdrop-blur-xl border-b border-white/10">
        <Topbar activeAgent={activeAgent} />
      </div>

      <div className="relative z-20 flex flex-1 overflow-hidden">
        
        {/* 3. MAIN CHAT AREA */}
        <main className="flex-1 flex flex-col min-w-0 bg-white/[0.02] backdrop-blur-[2px] border-r border-white/5">
          
          {/* Chat header */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-white/5 flex-shrink-0 bg-white/[0.03]">
            <div className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xs text-white tracking-widest uppercase">
                AI Scheduler Engine
              </span>
              <span className="text-[10px] text-indigo-300 font-medium">
                Autonomous Mode Active
              </span>
            </div>
            
            <div className="ml-auto px-2 py-1 rounded bg-indigo-500/20 border border-indigo-500/30">
              <span className="text-[9px] font-mono text-indigo-100 uppercase tracking-tighter">
                v2.0_stable
              </span>
            </div>
          </div>

          {/* Messages container */}
          <div className="flex-1 overflow-hidden flex flex-col relative">
             <MessageList messages={messages} loading={loading} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-gradient-to-t from-[#020205] via-[#020205]/80 to-transparent">
            <ChatInput
              value={input}
              onChange={setInput}
              onSend={sendMessage}
              disabled={loading}
            />
          </div>
        </main>

        {/* 4. RIGHT SIDEBAR - Higher blur to distinguish from background */}
        <aside className="w-80 hidden lg:block overflow-y-auto bg-black/40 backdrop-blur-2xl border-l border-white/10">
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