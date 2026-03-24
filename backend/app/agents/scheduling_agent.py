# from app.tools.calendar_tools import create_event


# def scheduling_node(state):
#     if not state.get("date") or not state.get("time"):
#         return {
#             **state,
#             "response": "Missing date or time"
#         }

#     event_id = create_event(state["user_id"], state["time"])

#     return {
#         **state,
#         "event_id": event_id,
#         "selected_slot": state["time"],
#         "response": f"Interview scheduled on {state['date']} at {state['time']}"
#     }





from app.tools.calendar_tools import create_event


def scheduling_node(state):
    date = state.get("date")
    time = state.get("time")          # may have been updated by availability_node
    user_id = state.get("user_id")
    conflict = state.get("conflict", False)
    conflict_message = state.get("conflict_message")

    # Guard: should never reach here without date+time, but safety net
    if not date or not time:
        return {
            **state,
            "response": "Missing date or time — please provide both to schedule your interview.",
        }

    # Create the event in MongoDB with both date and slot
    event_id = create_event(user_id, date, time)

    # Build response — if there was a conflict, lead with the conflict notice
    if conflict and conflict_message:
        response = (
            f"{conflict_message} "
            f"Your interview is confirmed for {date} at {time}. See you then!"
        )
    else:
        response = (
            f"Your interview has been successfully scheduled on {date} at {time}. "
            f"See you then!"
        )

    return {
        **state,
        "event_id": event_id,
        "selected_slot": time,
        "response": response,
        "complete": True,
    }