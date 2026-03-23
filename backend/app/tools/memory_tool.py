from app.db.mongo import messages

def memory_tool(user_id: str, message: str):
    messages.update_one(
        {"user_id": user_id},
        {"$push": {"messages": message}},
        upsert=True
    )
    return {"status": "stored"}