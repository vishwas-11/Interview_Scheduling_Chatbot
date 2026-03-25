// import { useState, useCallback } from 'react'
// import { sendChatMessage } from '../api/chat'
// import { resolveAgent, buildToolLogs, AGENT_LABEL } from '../utils/agentMeta'

// const INITIAL_MESSAGE = {
//   id: 1,
//   role: 'assistant',
//   text: "Hello! I'm your AI Interview Scheduler. I can help you schedule, reschedule, or cancel interviews. What would you like to do?",
//   timestamp: new Date(),
//   agent: 'conversation',
// }

// const INITIAL_TIMELINE = [
//   { agent: 'conversation', label: AGENT_LABEL.conversation, time: new Date(), intent: null },
// ]

// export function useChat() {
//   const [messages,      setMessages]      = useState([INITIAL_MESSAGE])
//   const [input,         setInput]         = useState('')
//   const [loading,       setLoading]       = useState(false)
//   const [activeAgent,   setActiveAgent]   = useState('conversation')
//   const [agentTimeline, setAgentTimeline] = useState(INITIAL_TIMELINE)
//   const [toolLog,       setToolLog]       = useState([])
//   const [interviews,    setInterviews]    = useState([])

//   const sendMessage = useCallback(async () => {
//     const text = input.trim()
//     if (!text || loading) return

//     const userMsg = { id: Date.now(), role: 'user', text, timestamp: new Date() }
//     setMessages((prev) => [...prev, userMsg])
//     setInput('')
//     setLoading(true)

//     try {
//       const { data } = await sendChatMessage(text)
//       const agent    = resolveAgent(data)

//       setActiveAgent(agent)

//       setAgentTimeline((prev) => [
//         ...prev,
//         { agent, label: AGENT_LABEL[agent], time: new Date(), intent: data.intent },
//       ])

//       const newLogs = buildToolLogs(data, text)
//       if (newLogs.length) {
//         setToolLog((prev) => [...prev, ...newLogs].slice(-30))
//       }

//       // Sync calendar state
//       if (data.event_id && data.date && data.selected_slot && data.intent !== 'cancel') {
//         setInterviews((prev) => {
//           const rest = prev.filter((i) => i.event_id !== data.event_id)
//           return [...rest, { event_id: data.event_id, date: data.date, slot: data.selected_slot }]
//         })
//       }
//       if (data.intent === 'cancel' && data.event_id) {
//         setInterviews((prev) => prev.filter((i) => i.event_id !== data.event_id))
//       }

//       setMessages((prev) => [
//         ...prev,
//         {
//           id:        Date.now() + 1,
//           role:      'assistant',
//           text:      data.response,
//           timestamp: new Date(),
//           agent,
//           intent:    data.intent,
//           conflict:  data.conflict,
//         },
//       ])
//     } catch (err) {
//       setMessages((prev) => [
//         ...prev,
//         {
//           id:        Date.now() + 1,
//           role:      'assistant',
//           text:      err.response?.data?.detail || 'Something went wrong. Please try again.',
//           timestamp: new Date(),
//           agent:     'error',
//         },
//       ])
//     } finally {
//       setLoading(false)
//     }
//   }, [input, loading])

//   return {
//     messages, input, setInput, loading, sendMessage,
//     activeAgent, agentTimeline, toolLog, interviews,
//   }
// }









import { useState, useCallback, useEffect } from 'react'
import { sendChatMessage, getInterviews } from '../api/chat'
import { resolveAgent, buildToolLogs, AGENT_LABEL } from '../utils/agentMeta'

const INITIAL_MESSAGE = {
  id: 1,
  role: 'assistant',
  text: "Hello! I'm your AI Interview Scheduler. I can help you schedule, reschedule, or cancel interviews. What would you like to do?",
  timestamp: new Date(),
  agent: 'conversation',
}

const INITIAL_TIMELINE = [
  { agent: 'conversation', label: AGENT_LABEL.conversation, time: new Date(), intent: null },
]

export function useChat() {
  const [messages,      setMessages]      = useState([INITIAL_MESSAGE])
  const [input,         setInput]         = useState('')
  const [loading,       setLoading]       = useState(false)
  const [activeAgent,   setActiveAgent]   = useState('conversation')
  const [agentTimeline, setAgentTimeline] = useState(INITIAL_TIMELINE)
  const [toolLog,       setToolLog]       = useState([])
  const [interviews,    setInterviews]    = useState([])

  // ─── Fetch existing interviews on mount so calendar + cancel/reschedule
  //     work correctly after re-login without needing to re-schedule first ───
  useEffect(() => {
    getInterviews()
      .then(({ data }) => {
        if (Array.isArray(data) && data.length > 0) {
          setInterviews(data)
        }
      })
      .catch(() => {
        // Silently fail — user just won't see pre-existing interviews in the
        // calendar view. The backend agents still work correctly regardless.
      })
  }, []) // empty dep array = runs once when ChatPage mounts (i.e. on login)

  const sendMessage = useCallback(async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg = { id: Date.now(), role: 'user', text, timestamp: new Date() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const { data } = await sendChatMessage(text)
      const agent    = resolveAgent(data)

      setActiveAgent(agent)

      setAgentTimeline((prev) => [
        ...prev,
        { agent, label: AGENT_LABEL[agent], time: new Date(), intent: data.intent },
      ])

      const newLogs = buildToolLogs(data, text)
      if (newLogs.length) {
        setToolLog((prev) => [...prev, ...newLogs].slice(-30))
      }

      // Sync calendar — add or update on schedule/reschedule
      if (data.event_id && data.date && data.selected_slot && data.intent !== 'cancel') {
        setInterviews((prev) => {
          const rest = prev.filter((i) => i.event_id !== data.event_id)
          return [...rest, {
            event_id: data.event_id,
            date:     data.date,
            slot:     data.selected_slot,
          }]
        })
      }

      // Sync calendar — remove on cancel
      if (data.intent === 'cancel' && data.event_id) {
        setInterviews((prev) => prev.filter((i) => i.event_id !== data.event_id))
      }

      setMessages((prev) => [
        ...prev,
        {
          id:        Date.now() + 1,
          role:      'assistant',
          text:      data.response,
          timestamp: new Date(),
          agent,
          intent:    data.intent,
          conflict:  data.conflict,
        },
      ])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id:        Date.now() + 1,
          role:      'assistant',
          text:      err.response?.data?.detail || 'Something went wrong. Please try again.',
          timestamp: new Date(),
          agent:     'error',
        },
      ])
    } finally {
      setLoading(false)
    }
  }, [input, loading])

  return {
    messages, input, setInput, loading, sendMessage,
    activeAgent, agentTimeline, toolLog, interviews,
  }
}