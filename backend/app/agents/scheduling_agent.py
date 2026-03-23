from app.tools.calendar_tools import create_event

def scheduling_agent(user_id, slot):
    return create_event(user_id, slot)


# def scheduling_node(state):
#     user_id = state["user_id"]
#     slot = state["slots"][0] 

#     event_id = scheduling_agent(user_id, slot)

#     return {
#         **state,
#         "selected_slot": slot,
#         "event_id": event_id
#     }



def scheduling_node(state):
    user_id = state["user_id"]
    slots = state["slots"]
    preferred_time = state["time"]

    selected = None
    for slot in slots:
        if preferred_time in slot:
            selected = slot
            break

    selected = selected or slots[0]

    event_id = create_event(user_id, selected)

    return {
        **state,
        "selected_slot": selected,
        "event_id": event_id,
        "response": f"Interview scheduled at {selected}"
    }