# from fastapi import APIRouter, Depends, Header, HTTPException
# from app.graph.langgraph_flow import run_flow
# from app.auth.jwt_handler import decode_token
# from app.models.schemas import ChatRequest

# from app.tools.memory_tool import get_user_state, save_user_state, clear_user_state

# router = APIRouter()


# def get_user(authorization: str = Header(...)):
#     try:
#         token = authorization.split(" ")[1]
#         return decode_token(token)["user_id"]
#     except:
#         raise HTTPException(401, "Invalid token")


# @router.post("/chat")
# def chat(data: ChatRequest, user_id=Depends(get_user)):

#     # STEP 1: Load previous state (preserves date, time, intent across turns)
#     prev_state = get_user_state(user_id)

#     # STEP 2: Run flow with accumulated state
#     result = run_flow(user_id, data.message, prev_state)

#     # STEP 3: Save updated state for next turn
#     save_user_state(user_id, result)

#     # STEP 4: If scheduling completed → clear memory so next convo starts fresh
#     if result.get("event_id"):
#         clear_user_state(user_id)

#     return result






from fastapi import APIRouter, Depends, Header, HTTPException
from app.graph.langgraph_flow import run_flow
from app.auth.jwt_handler import decode_token
from app.models.schemas import ChatRequest
from app.tools.memory_tool import get_user_state, save_user_state, clear_user_state
from app.db.mongo import interviews as interviews_collection

router = APIRouter()


def get_user(authorization: str = Header(...)):
    try:
        token = authorization.split(" ")[1]
        return decode_token(token)["user_id"]
    except:
        raise HTTPException(401, "Invalid token")


@router.get("/interviews")
def get_user_interviews(user_id=Depends(get_user)):
    """Fetch all scheduled interviews for the logged-in user."""
    cursor = interviews_collection.find(
        {"user_id": user_id, "status": "scheduled"},
        sort=[("date", 1), ("slot", 1)]
    )
    result = []
    for doc in cursor:
        result.append({
            "event_id": str(doc["_id"]),
            "date":     doc.get("date", ""),
            "slot":     doc.get("slot", ""),
        })
    return result


@router.post("/chat")
def chat(data: ChatRequest, user_id=Depends(get_user)):

    # STEP 1: Load previous state (preserves date, time, intent across turns)
    prev_state = get_user_state(user_id)

    # STEP 2: Run flow with accumulated state
    result = run_flow(user_id, data.message, prev_state)

    # STEP 3: Save updated state for next turn
    save_user_state(user_id, result)

    # STEP 4: If scheduling completed → clear memory so next convo starts fresh
    if result.get("event_id"):
        clear_user_state(user_id)

    return result