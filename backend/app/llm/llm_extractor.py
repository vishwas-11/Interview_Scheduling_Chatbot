from app.agents.intent_agent import llm
from datetime import datetime, timedelta
import json


def extract_with_llm(message: str):
    today = datetime.now().strftime("%Y-%m-%d")

    prompt = f"""
You are an AI assistant for scheduling interviews.

Today's date is {today}.

Extract structured data from the user message.

Return ONLY JSON in this format:
{{
    "intent": "schedule | reschedule | cancel | other",
    "date": "YYYY-MM-DD or null",
    "time": "HH:MM (24hr) or null",
    "complete": true/false,
    "response": "what should the assistant say next"
}}

Rules:
- Convert relative dates like "tomorrow", "next monday" to real dates
- Convert time like "2pm", "10 am" to 24-hour format
- If missing info → complete = false
- If all info present → complete = true
- Response should be conversational

User message:
"{message}"
"""

    # res = llm.invoke(prompt)

    res = llm.invoke(prompt)

    content = res.content

    if isinstance(content, list):
        content = content[0].get("text", "")

    try:
        data = json.loads(content)
        return data
    except:
        # fallback safety
        return {
            "intent": "other",
            "date": None,
            "time": None,
            "complete": False,
            "response": "Sorry, I couldn't understand. Can you rephrase?"
        }