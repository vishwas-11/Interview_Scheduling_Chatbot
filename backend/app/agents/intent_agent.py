from langchain_google_genai import ChatGoogleGenerativeAI
import os
from dotenv import load_dotenv

load_dotenv()

llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature = 0.4)


# def detect_intent(message: str):
#     prompt = f"Classify intent: {message} (schedule/reschedule/cancel/inquiry)"
#     return llm.invoke(prompt).content.lower()


def detect_intent(message: str):
    prompt = f"Classify intent: {message} (schedule/reschedule/cancel/inquiry)"

    res = llm.invoke(prompt)

    content = res.content

    #  HANDLE GEMINI RESPONSE STRUCTURE
    if isinstance(content, list):
        content = content[0].get("text", "")

    return content.strip().lower()


def intent_node(state):
    message = state["message"]
    intent = detect_intent(message)

    return {**state, "intent": intent}