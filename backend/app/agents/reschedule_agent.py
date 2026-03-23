from app.tools.calendar_tools import calendar_update_tool


def reschedule_agent(event_id: str, new_time: str):
    return calendar_update_tool(event_id, new_time)

def reschedule_node(state):
    if not state.get("event_id"):
        return {**state, "response": "No event to reschedule"}

    updated = calendar_update_tool(state["event_id"], "12:00")

    return {
        **state,
        "response": "Interview rescheduled",
        "selected_slot": "12:00"
    }