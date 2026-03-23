from fastapi import APIRouter, Depends, Header, HTTPException
from app.graph.langgraph_flow import run_flow
from app.auth.jwt_handler import decode_token
from app.models.schemas import ChatRequest

from app.tools.memory_tool import get_user_state, save_user_state, clear_user_state

router = APIRouter()


def get_user(authorization: str = Header(...)):
    try:
        token = authorization.split(" ")[1]
        return decode_token(token)["user_id"]
    except:
        raise HTTPException(401, "Invalid token")


@router.post("/chat")
def chat(data: ChatRequest, user_id=Depends(get_user)):

    #  STEP 1: Load previous state
    prev_state = get_user_state(user_id)

    #  STEP 2: Run flow
    result = run_flow(user_id, data.message, prev_state)

    #  STEP 3: Save updated state
    save_user_state(user_id, result)

    #  STEP 4: If completed → clear memory
    if result.get("event_id"):
        clear_user_state(user_id)

    return result