# from fastapi import APIRouter, HTTPException
# from app.db.mongo import users
# from app.auth.password import hash_password, verify_password
# from app.auth.jwt_handler import create_token

# router = APIRouter(prefix="/auth")


# @router.post("/signup")
# def signup(username: str, password: str):
#     if users.find_one({"username": username}):
#         raise HTTPException(400, "User exists")

#     user = {
#         "username": username,
#         "password": hash_password(password)
#     }
#     res = users.insert_one(user)
#     token = create_token(str(res.inserted_id))

#     return {"token": token}


# @router.post("/login")
# def login(username: str, password: str):
#     user = users.find_one({"username": username})
#     if not user or not verify_password(password, user["password"]):
#         raise HTTPException(401, "Invalid creds")

#     token = create_token(str(user["_id"]))
#     return {"token": token}




from fastapi import APIRouter, HTTPException
from app.db.mongo import users
from app.auth.password import hash_password, verify_password
from app.auth.jwt_handler import create_token
from app.models.schemas import AuthRequest

router = APIRouter(prefix="/auth")


# @router.post("/signup")
# def signup(email: str, password: str):
#     if users.find_one({"email": email}):
#         raise HTTPException(400, "User already exists")

#     user = {
#         "email": email,
#         "password": hash_password(password)
#     }

#     res = users.insert_one(user)

#     token = create_token(str(res.inserted_id))

#     return {
#         "message": "User created",
#         "token": token
#     }



@router.post("/signup")
def signup(data: AuthRequest):
    if users.find_one({"email": data.email}):
        raise HTTPException(400, "User already exists")

    user = {
        "email": data.email,
        "password": hash_password(data.password)
    }

    res = users.insert_one(user)
    token = create_token(str(res.inserted_id))

    return {"token": token}


@router.post("/login")
def login(email: str, password: str):
    user = users.find_one({"email": email})

    if not user or not verify_password(password, user["password"]):
        raise HTTPException(401, "Invalid credentials")

    token = create_token(str(user["_id"]))

    return {
        "message": "Login successful",
        "token": token
    }