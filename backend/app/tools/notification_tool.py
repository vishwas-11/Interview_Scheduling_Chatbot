def notification_tool(user_id: str, message: str):
    print(f"Notify {user_id}: {message}")
    return {"status": "sent"}


# =============================
# 📄 app/agents/intent_agent.py
# =============================
def detect_intent(message: str):
    message = message.lower()
    if "reschedule" in message:
        return "reschedule"
    if "cancel" in message:
        return "cancel"
    if "schedule" in message:
        return "schedule"
    return "inquiry"