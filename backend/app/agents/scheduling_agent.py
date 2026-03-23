from app.tools.calendar_tools import create_event


def scheduling_node(state):
    if not state.get("date") or not state.get("time"):
        return {
            **state,
            "response": "Missing date or time"
        }

    event_id = create_event(state["user_id"], state["time"])

    return {
        **state,
        "event_id": event_id,
        "selected_slot": state["time"],
        "response": f"Interview scheduled on {state['date']} at {state['time']}"
    }