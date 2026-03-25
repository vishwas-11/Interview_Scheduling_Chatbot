import { useChat }    from '../hooks/useChat'
import Topbar        from '../components/layout/Topbar'
import Sidebar       from '../components/layout/Sidebar'
import MessageList   from '../components/chat/MessageList'
import ChatInput     from '../components/chat/ChatInput'

export default function ChatPage() {
  const {
    messages, input, setInput, loading, sendMessage,
    activeAgent, agentTimeline, toolLog, interviews,
  } = useChat()

  return (
    <div className="h-screen bg-navy-950 flex flex-col overflow-hidden">
      <Topbar activeAgent={activeAgent} />

      <div className="flex flex-1 overflow-hidden">
        {/* Main chat area */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Chat header */}
          <div className="flex items-center gap-3 px-5 py-3.5 border-b border-navy-800 flex-shrink-0">
            <div className="w-2 h-2 rounded-full bg-electric-400 animate-pulse-slow" />
            <span className="font-display font-semibold text-sm text-slate-200 tracking-wide">
              AI Scheduler
            </span>
            <span className="ml-auto text-[10px] font-mono text-slate-600 uppercase tracking-widest">
              Online
            </span>
          </div>

          {/* Messages */}
          <MessageList messages={messages} loading={loading} />

          {/* Input */}
          <ChatInput
            value={input}
            onChange={setInput}
            onSend={sendMessage}
            disabled={loading}
          />
        </main>

        {/* Right sidebar */}
        <Sidebar
          activeAgent={activeAgent}
          loading={loading}
          agentTimeline={agentTimeline}
          toolLog={toolLog}
          interviews={interviews}
        />
      </div>
    </div>
  )
}