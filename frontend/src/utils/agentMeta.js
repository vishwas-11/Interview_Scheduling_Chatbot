export const AGENT_LABEL = {
  conversation:  'Conversation Agent',
  availability:  'Availability Agent',
  scheduling:    'Scheduling Agent',
  reschedule:    'Reschedule Agent',
  cancellation:  'Cancellation Agent',
  error:         'Error',
}

export const AGENT_ICON = {
  conversation:  '💬',
  availability:  '📅',
  scheduling:    '✅',
  reschedule:    '🔄',
  cancellation:  '❌',
  error:         '⚠️',
}

export const AGENT_COLOR = {
  conversation:  'bg-blue-500/20   text-blue-300   border-blue-500/30',
  availability:  'bg-violet-500/20 text-violet-300 border-violet-500/30',
  scheduling:    'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  reschedule:    'bg-amber-500/20  text-amber-300  border-amber-500/30',
  cancellation:  'bg-rose-500/20   text-rose-300   border-rose-500/30',
  error:         'bg-red-500/20    text-red-300    border-red-500/30',
}

export const AGENT_DESCRIPTION = {
  conversation:  'Extracting intent and collecting details',
  availability:  'Checking calendar for open slots',
  scheduling:    'Creating calendar event',
  reschedule:    'Updating existing booking',
  cancellation:  'Processing cancellation request',
  error:         'An error occurred',
}

export const TOOL_COLOR = {
  llm_extractor:        'text-blue-400   border-blue-500/30   bg-blue-500/10',
  calendar_read_tool:   'text-violet-400 border-violet-500/30 bg-violet-500/10',
  calendar_create_tool: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
  calendar_delete_tool: 'text-rose-400   border-rose-500/30   bg-rose-500/10',
  conflict_resolver:    'text-amber-400  border-amber-500/30  bg-amber-500/10',
  notification_tool:    'text-cyan-400   border-cyan-500/30   bg-cyan-500/10',
}

/** Derive which agent handled a response */
export function resolveAgent(data) {
  if (data.intent === 'cancel'     && data.complete) return 'cancellation'
  if (data.intent === 'reschedule' && data.complete) return 'reschedule'
  if (data.event_id && data.complete)                return 'scheduling'
  if (data.slots)                                    return 'availability'
  return 'conversation'
}

/** Build tool log entries from API response */
export function buildToolLogs(data, userMessage) {
  const ts   = new Date()
  const logs = []

  if (data.intent) {
    logs.push({
      id: Date.now(),
      tool: 'llm_extractor',
      input:  { message: userMessage },
      output: { intent: data.intent, date: data.date, time: data.time },
      time: ts,
    })
  }
  if (data.slots) {
    logs.push({
      id: Date.now() + 1,
      tool: 'calendar_read_tool',
      input:  { date: data.date },
      output: { slots: data.slots },
      time: ts,
    })
  }
  if (data.event_id) {
    logs.push({
      id: Date.now() + 2,
      tool: data.intent === 'cancel' ? 'calendar_delete_tool' : 'calendar_create_tool',
      input:  { date: data.date, slot: data.selected_slot },
      output: { event_id: data.event_id, status: 'success' },
      time: ts,
    })
  }
  if (data.conflict) {
    logs.push({
      id: Date.now() + 3,
      tool: 'conflict_resolver',
      input:  { requested_slot: data.time },
      output: { conflict: true, assigned_slot: data.selected_slot },
      time: ts,
    })
  }
  return logs
}