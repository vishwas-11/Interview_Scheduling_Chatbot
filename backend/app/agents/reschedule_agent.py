# from app.tools.calendar_tools import calendar_update_tool


# def reschedule_agent(event_id: str, new_time: str):
#     return calendar_update_tool(event_id, new_time)

# def reschedule_node(state):
#     if not state.get("event_id"):
#         return {**state, "response": "No event to reschedule"}

#     updated = calendar_update_tool(state["event_id"], "12:00")

#     return {
#         **state,
#         "response": "Interview rescheduled",
#         "selected_slot": "12:00"
#     }




from app.tools.calendar_tools import (
    calendar_update_tool,
    get_next_available_slot,
)
from app.tools.notification_tool import notification_tool
from app.db.mongo import interviews


def get_existing_event(user_id: str) -> dict | None:
    """Fetch the most recent scheduled interview for this user."""
    event = interviews.find_one(
        {"user_id": user_id, "status": "scheduled"},
        sort=[("_id", -1)]  # most recent first
    )
    return event


def reschedule_node(state):
    user_id = state.get("user_id")
    new_date = state.get("date")
    new_time = state.get("time")

    # Guard: need both date and time to proceed
    if not new_date or not new_time:
        return {
            **state,
            "response": (
                "To reschedule, please provide the new date and time you'd prefer. "
                "For example: 'Reschedule to tomorrow at 3pm'."
            ),
        }

    # Find the user's existing booked interview
    existing = get_existing_event(user_id)

    if not existing:
        return {
            **state,
            "response": (
                "I couldn't find any scheduled interview for you to reschedule. "
                "Would you like to book a new one?"
            ),
        }

    event_id = str(existing["_id"])
    old_slot = existing.get("slot", "your previous slot")
    old_date = existing.get("date", "")

    # Check the requested new slot for conflicts
    # Note: exclude the user's OWN current booking from conflict check
    # by temporarily ignoring it (same event_id won't conflict with itself)
    result = get_next_available_slot(user_id, new_date, new_time, exclude_event_id=event_id)

    conflict = result.get("conflict")
    final_slot = result.get("slot")
    original_slot = result.get("original")

    # No slots available at all on the requested date
    if final_slot is None:
        return {
            **state,
            "response": (
                f"Sorry, there are no available slots on {new_date}. "
                f"Your interview is still scheduled on {old_date} at {old_slot}. "
                f"Please choose a different date to reschedule."
            ),
        }

    # Update the existing interview document in MongoDB (date + slot)
    interviews.update_one(
        {"_id": existing["_id"]},
        {"$set": {"date": new_date, "slot": final_slot}}
    )

    # Send notification
    if conflict:
        notify_msg = (
            f"Your interview has been rescheduled. "
            f"The {original_slot} slot on {new_date} was unavailable, "
            f"so you've been moved to {final_slot} on {new_date}."
        )
    else:
        notify_msg = (
            f"Your interview has been rescheduled to {new_date} at {final_slot}."
        )

    notification_tool(user_id, notify_msg)

    # Build response
    if conflict:
        response = (
            f"The {original_slot} slot on {new_date} is already booked. "
            f"I've rescheduled your interview to the next available slot at "
            f"{final_slot} on {new_date}. You're all set!"
        )
    else:
        response = (
            f"Done! Your interview has been rescheduled from "
            f"{old_date} at {old_slot} to {new_date} at {final_slot}."
        )

    return {
        **state,
        "date": new_date,
        "time": final_slot,
        "selected_slot": final_slot,
        "event_id": event_id,
        "conflict": conflict,
        "conflict_message": notify_msg if conflict else None,
        "response": response,
        "complete": True,
    }