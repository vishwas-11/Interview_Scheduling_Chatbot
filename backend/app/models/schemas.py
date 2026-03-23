from pydantic import BaseModel

class AuthRequest(BaseModel):
    email: str
    password: str

class ChatRequest(BaseModel):
    message: str