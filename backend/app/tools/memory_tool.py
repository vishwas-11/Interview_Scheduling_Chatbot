from app.db.mongo import conversations


def get_user_state(user_id: str):
    data = conversations.find_one({"user_id": user_id})
    return data.get("state") if data else None


def save_user_state(user_id: str, state: dict):
    conversations.update_one(
        {"user_id": user_id},
        {"$set": {"state": state}},
        upsert=True
    )


def clear_user_state(user_id: str):
    conversations.delete_one({"user_id": user_id})