# from app.tools.calendar_tools import get_slots

# def availability_agent():
#     return get_slots()


# def availability_node(state):
#     slots = availability_agent()

#     return {**state, "slots": slots}







from app.tools.calendar_tools import get_slots, get_next_available_slot


def availability_node(state):
    date = state.get("date")
    time = state.get("time")
    user_id = state.get("user_id")

    # Get display slots for reference
    slots = get_slots()

    # Check conflict for the user's requested date + time
    if date and time and user_id:
        result = get_next_available_slot(user_id, date, time)

        conflict = result.get("conflict")
        available_slot = result.get("slot")
        original_slot = result.get("original")

        if available_slot is None:
            # No slots available at all on this date
            return {
                **state,
                "slots": slots,
                "selected_slot": None,
                "conflict": True,
                "conflict_message": (
                    f"Sorry, there are no available slots on {date}. "
                    f"Please choose a different date."
                ),
            }

        if conflict:
            # Slot was taken — auto-assign next available
            return {
                **state,
                "slots": slots,
                "time": available_slot,          # override time with next available
                "selected_slot": available_slot,
                "conflict": True,
                "conflict_message": (
                    f"The {original_slot} slot on {date} is already booked. "
                    f"I've scheduled you for the next available slot at {available_slot}."
                ),
            }

    # No conflict — proceed normally
    return {
        **state,
        "slots": slots,
        "selected_slot": time,
        "conflict": False,
        "conflict_message": None,
    }   