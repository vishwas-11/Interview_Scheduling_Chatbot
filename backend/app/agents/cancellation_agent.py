from app.tools.calendar_tools import calendar_delete_tool


def cancellation_agent(event_id: str):
    return calendar_delete_tool(event_id)

def cancel_node(state):
    if not state.get("event_id"):
        return {**state, "response": "No event to cancel"}

    calendar_delete_tool(state["event_id"])

    return {
        **state,
        "response": "Interview cancelled"
    }