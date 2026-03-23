from app.tools.calendar_tools import create_event

def scheduling_agent(user_id, slot):
    return create_event(user_id, slot)


def scheduling_node(state):
    user_id = state["user_id"]
    slot = state["slots"][0]  # simple selection for now

    event_id = scheduling_agent(user_id, slot)

    return {
        **state,
        "selected_slot": slot,
        "event_id": event_id
    }