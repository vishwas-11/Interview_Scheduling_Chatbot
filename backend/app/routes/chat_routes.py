from fastapi import APIRouter, Depends, Header, HTTPException
from app.graph.langgraph_flow import run_flow
from app.auth.jwt_handler import decode_token
from app.models.schemas import ChatRequest

router = APIRouter()


def get_user(authorization: str = Header(...)):
    try:
        token = authorization.split(" ")[1]
        return decode_token(token)["user_id"]
    except:
        raise HTTPException(401, "Invalid token")


# @router.post("/chat")
# def chat(message: str, user_id=Depends(get_user)):
#     return run_flow(user_id, message)



@router.post("/chat")
def chat(data: ChatRequest, user_id=Depends(get_user)):
    return run_flow(user_id, data.message)