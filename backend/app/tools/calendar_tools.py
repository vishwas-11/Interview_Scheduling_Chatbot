# from app.db.mongo import interviews
# from bson import ObjectId
# from datetime import datetime, timedelta


# # Default available slots in HH:MM (24hr)
# DEFAULT_SLOTS = ["10:00", "12:00", "15:00", "17:00", "18:00", "19:00"]


# def get_slots():
#     return DEFAULT_SLOTS[:3]  # Return first 3 as display options


# def is_slot_booked(user_id: str, date: str, time: str) -> bool:
#     """Check if a specific date+time slot is already booked for this user."""
#     existing = interviews.find_one({
#         "user_id": user_id,
#         "date": date,
#         "slot": time,
#         "status": "scheduled"
#     })
#     return existing is not None


# def get_next_available_slot(user_id: str, date: str, requested_time: str) -> dict:
#     """
#     Given a requested date+time, check if it's booked.
#     If booked, find the next available slot on the same date.
#     Returns: { "slot": "HH:MM", "conflict": True/False, "original": "HH:MM" }
#     """
#     # Fetch all booked slots for this user on this date
#     booked_cursor = interviews.find({
#         "user_id": user_id,
#         "date": date,
#         "status": "scheduled"
#     })
#     booked_slots = {doc["slot"] for doc in booked_cursor}

#     # If requested slot is free, use it
#     if requested_time not in booked_slots:
#         return {
#             "slot": requested_time,
#             "conflict": False,
#             "original": requested_time
#         }

#     # Find next available slot after requested time
#     # Build a sorted list of all candidate slots starting from requested_time + 30min
#     try:
#         base_dt = datetime.strptime(f"{date} {requested_time}", "%Y-%m-%d %H:%M")
#     except ValueError:
#         return {
#             "slot": requested_time,
#             "conflict": False,
#             "original": requested_time
#         }

#     # Try up to 8 slots in 30-min increments (covers 4 hours ahead)
#     for i in range(1, 9):
#         candidate_dt = base_dt + timedelta(minutes=30 * i)
#         # Only consider slots within business hours (09:00 - 20:00)
#         if candidate_dt.hour < 9 or candidate_dt.hour >= 20:
#             continue
#         candidate_slot = candidate_dt.strftime("%H:%M")
#         if candidate_slot not in booked_slots:
#             return {
#                 "slot": candidate_slot,
#                 "conflict": True,
#                 "original": requested_time
#             }

#     # No slots available today — return None to signal fully booked
#     return {
#         "slot": None,
#         "conflict": True,
#         "original": requested_time
#     }


# def create_event(user_id: str, date: str, slot: str):
#     """Insert a new interview event into MongoDB."""
#     doc = {
#         "user_id": user_id,
#         "date": date,
#         "slot": slot,
#         "status": "scheduled"
#     }
#     return str(interviews.insert_one(doc).inserted_id)


# def calendar_update_tool(event_id: str, new_slot: str):
#     interviews.update_one(
#         {"_id": ObjectId(event_id)},
#         {"$set": {"slot": new_slot}}
#     )
#     return {"status": "updated", "event_id": event_id}


# def calendar_delete_tool(event_id: str):
#     interviews.delete_one({"_id": ObjectId(event_id)})
#     return {"status": "deleted", "event_id": event_id}








from app.db.mongo import interviews
from bson import ObjectId
from datetime import datetime, timedelta


# Default available slots in HH:MM (24hr)
DEFAULT_SLOTS = ["10:00", "12:00", "15:00", "17:00", "18:00", "19:00"]


def get_slots():
    return DEFAULT_SLOTS[:6]  # Return first 3 as display options


def get_next_available_slot(
    user_id: str,
    date: str,
    requested_time: str,
    exclude_event_id: str | None = None   # used during reschedule to ignore own booking
) -> dict:
    """
    Given a requested date+time, check if it's booked.
    If booked, find the next available slot on the same date.

    exclude_event_id: if provided, that specific document is excluded from the
                      conflict check (so a user rescheduling their own slot
                      doesn't conflict with themselves).

    Returns: { "slot": "HH:MM" | None, "conflict": bool, "original": "HH:MM" }
    """
    # Build query to fetch all booked slots for this user on this date
    query = {
        "user_id": user_id,
        "date": date,
        "status": "scheduled"
    }

    booked_cursor = interviews.find(query)

    # Collect booked slots, optionally skipping own event
    booked_slots = set()
    for doc in booked_cursor:
        if exclude_event_id and str(doc["_id"]) == exclude_event_id:
            continue
        booked_slots.add(doc["slot"])

    # If requested slot is free, use it
    if requested_time not in booked_slots:
        return {
            "slot": requested_time,
            "conflict": False,
            "original": requested_time
        }

    # Find next available slot after requested time in 30-min increments
    try:
        base_dt = datetime.strptime(f"{date} {requested_time}", "%Y-%m-%d %H:%M")
    except ValueError:
        return {
            "slot": requested_time,
            "conflict": False,
            "original": requested_time
        }

    # Try up to 8 slots in 30-min increments (covers 4 hours ahead)
    for i in range(1, 9):
        candidate_dt = base_dt + timedelta(minutes=30 * i)
        # Only consider slots within business hours (09:00 - 20:00)
        if candidate_dt.hour < 9 or candidate_dt.hour >= 20:
            continue
        candidate_slot = candidate_dt.strftime("%H:%M")
        if candidate_slot not in booked_slots:
            return {
                "slot": candidate_slot,
                "conflict": True,
                "original": requested_time
            }

    # No slots available today
    return {
        "slot": None,
        "conflict": True,
        "original": requested_time
    }


def create_event(user_id: str, date: str, slot: str) -> str:
    """Insert a new interview event into MongoDB."""
    doc = {
        "user_id": user_id,
        "date": date,
        "slot": slot,
        "status": "scheduled"
    }
    return str(interviews.insert_one(doc).inserted_id)


def calendar_update_tool(event_id: str, new_slot: str):
    interviews.update_one(
        {"_id": ObjectId(event_id)},
        {"$set": {"slot": new_slot}}
    )
    return {"status": "updated", "event_id": event_id}


def calendar_delete_tool(event_id: str):
    interviews.delete_one({"_id": ObjectId(event_id)})
    return {"status": "deleted", "event_id": event_id}