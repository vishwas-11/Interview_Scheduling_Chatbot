# from app.tools.calendar_tools import calendar_delete_tool


# def cancellation_agent(event_id: str):
#     return calendar_delete_tool(event_id)

# def cancel_node(state):
#     if not state.get("event_id"):
#         return {**state, "response": "No event to cancel"}

#     calendar_delete_tool(state["event_id"])

#     return {
#         **state,
#         "response": "Interview cancelled"
#     }





from app.tools.calendar_tools import calendar_delete_tool
from app.tools.notification_tool import notification_tool
from app.db.mongo import interviews
from bson import ObjectId


def get_all_scheduled(user_id: str) -> list:
    """Fetch all scheduled interviews for this user."""
    cursor = interviews.find(
        {"user_id": user_id, "status": "scheduled"},
        sort=[("date", 1), ("slot", 1)]  # sorted by date then time
    )
    return list(cursor)


def find_matching_event(user_id: str, date: str, time: str) -> dict | None:
    """Find a specific scheduled interview by user_id + date + slot."""
    return interviews.find_one({
        "user_id": user_id,
        "date": date,
        "slot": time,
        "status": "scheduled"
    })


def cancel_node(state):
    user_id = state.get("user_id")
    date = state.get("date")
    time = state.get("time")
    pending = state.get("pending_cancellations")

    # STEP 1: If we don't have date+time yet, fetch all bookings and ask
    if not date or not time:
        all_interviews = get_all_scheduled(user_id)

        if not all_interviews:
            return {
                **state,
                "complete": True,
                "pending_cancellations": None,
                "response": (
                    "I couldn't find any scheduled interviews to cancel. "
                    "It may have already been cancelled or never booked."
                ),
            }

        # Build a readable list for the user
        lines = []
        for idx, interview in enumerate(all_interviews, start=1):
            lines.append(f"{idx}. {interview['date']} at {interview['slot']}")

        interview_list = "\n".join(lines)

        # Store them in state so next turn we can match
        pending_cancellations = [
            {
                "event_id": str(i["_id"]),
                "date": i["date"],
                "slot": i["slot"]
            }
            for i in all_interviews
        ]

        return {
            **state,
            "complete": False,           # wait for user to specify which one
            "pending_cancellations": pending_cancellations,
            "response": (
                f"You have the following scheduled interviews:\n{interview_list}\n\n"
                f"Which one would you like to cancel? Please tell me the date and time."
            ),
        }

    # STEP 2: User has provided date+time — find the exact interview
    existing = find_matching_event(user_id, date, time)

    if not existing:
        # Build hint from pending list if available
        hint = ""
        if pending:
            lines = [f"{i['date']} at {i['slot']}" for i in pending]
            hint = " Your scheduled interviews are: " + ", ".join(lines) + "."

        return {
            **state,
            "complete": False,
            "response": (
                f"I couldn't find a scheduled interview on {date} at {time}.{hint} "
                f"Please double-check the date and time."
            ),
        }

    event_id = str(existing["_id"])
    cancelled_date = existing.get("date")
    cancelled_slot = existing.get("slot")

    # STEP 3: Cancel — mark as cancelled (keeps audit trail)
    interviews.update_one(
        {"_id": existing["_id"]},
        {"$set": {"status": "cancelled"}}
    )

    # STEP 4: Send notification
    notify_msg = (
        f"Your interview on {cancelled_date} at {cancelled_slot} "
        f"has been successfully cancelled."
    )
    notification_tool(user_id, notify_msg)

    return {
        **state,
        "event_id": event_id,
        "complete": True,
        "pending_cancellations": None,  # clear after done
        "date": None,                   # clean state for next conversation
        "time": None,
        "selected_slot": None,
        "response": (
            f"Done! Your interview on {cancelled_date} at {cancelled_slot} "
            f"has been cancelled. Let me know if you'd like to book a new one."
        ),
    }