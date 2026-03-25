// import { useEffect, useRef } from 'react'
// import MessageBubble from './MessageBubble'
// import TypingIndicator from './TypingIndicator'

// export default function MessageList({ messages, loading }) {
//   const bottomRef = useRef(null)

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
//   }, [messages, loading])

//   return (
//     <div className="flex-1 overflow-y-auto px-4 py-5">
//       {messages.map((msg) => (
//         <MessageBubble key={msg.id} msg={msg} />
//       ))}
//       {loading && <TypingIndicator />}
//       <div ref={bottomRef} />
//     </div>
//   )
// }







import { useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'

export default function MessageList({ messages, loading }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  return (
    <div className="flex-1 overflow-y-auto px-6 py-8 custom-scrollbar space-y-6">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} msg={msg} />
      ))}
      
      {loading && (
        <div className="flex items-center gap-3 animate-pulse">
          <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center">
             <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
          </div>
          <TypingIndicator />
        </div>
      )}
      
      <div ref={bottomRef} className="h-4" />
    </div>
  )
}