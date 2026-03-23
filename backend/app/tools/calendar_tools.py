from app.db.mongo import interviews
from bson import ObjectId


def get_slots():
    return ["10:00", "12:00", "15:00"]


def create_event(user_id, slot):
    doc = {
        "user_id": user_id,
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