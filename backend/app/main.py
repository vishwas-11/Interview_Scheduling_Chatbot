from fastapi import FastAPI
from app.routes.chat_routes import router as chat_router
from app.routes.auth_routes import router as auth_router

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://interview-scheduling-chatbot.vercel.app/"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(chat_router)


@app.get("/")
def root():
    return {"message" : "Interview Scheduling Chatbot is running"}