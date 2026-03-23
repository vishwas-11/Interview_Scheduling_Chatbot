import jwt, os
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()

SECRET = os.getenv("JWT_SECRET")


def create_token(user_id: str):
    payload = {
        "user_id": user_id,
        "exp": datetime.utcnow() + timedelta(days=1)
    }
    return jwt.encode(payload, SECRET, algorithm="HS256")


def decode_token(token: str):
    return jwt.decode(token, SECRET, algorithms=["HS256"])