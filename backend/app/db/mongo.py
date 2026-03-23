from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(
    os.getenv("MONGO_URI"),
    tls=True,
    tlsAllowInvalidCertificates=True
)
db = client[os.getenv("DB_NAME")]

users = db["users"]
interviews = db["interviews"]
messages = db["messages"]