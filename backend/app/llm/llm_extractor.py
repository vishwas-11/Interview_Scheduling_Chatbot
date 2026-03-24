from app.agents.intent_agent import llm
import dateparser
from datetime import datetime, timedelta
import json
import re


# Only attempt to parse time if the message actually contains time-like patterns
TIME_PATTERN = re.compile(
    r'\b(\d{1,2}(:\d{2})?\s*(am|pm)|(\d{1,2}:\d{2}))\b',
    re.IGNORECASE
)

# Only attempt to parse date if the message contains date-like patterns
DATE_PATTERN = re.compile(
    r'\b(today|tomorrow|yesterday|monday|tuesday|wednesday|thursday|friday|saturday|sunday'
    r'|next\s+\w+|in\s+\d+\s+days?|\d{1,2}[/-]\d{1,2}([/-]\d{2,4})?'
    r'|\d{4}-\d{2}-\d{2}|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\b',
    re.IGNORECASE
)


def parse_date(text):
    if not DATE_PATTERN.search(text):
        return None
    dt = dateparser.parse(text, settings={
        "PREFER_DATES_FROM": "future",
        "RELATIVE_BASE": datetime.now(),
        "RETURN_AS_TIMEZONE_AWARE": False,
    })
    if dt:
        return dt.strftime("%Y-%m-%d")
    return None


def parse_time(text):
    # Only parse time if the message actually contains a time expression
    if not TIME_PATTERN.search(text):
        return None
    dt = dateparser.parse(text, settings={
        "PREFER_DATES_FROM": "future",
        "RELATIVE_BASE": datetime.now(),
        "RETURN_AS_TIMEZONE_AWARE": False,
    })
    if dt and (dt.hour != 0 or dt.minute != 0):
        return dt.strftime("%H:%M")
    return None


def extract_with_llm(state):
    today = datetime.now().strftime("%Y-%m-%d")
    tomorrow = (datetime.now() + timedelta(days=1)).strftime("%Y-%m-%d")

    message = state.get("message")
    prev_intent = state.get("intent")
    prev_date = state.get("date")
    prev_time = state.get("time")

    prompt = f"""
You are an AI assistant for scheduling interviews.

Today's date is {today}.
Tomorrow's date is {tomorrow}.

Previous extracted data:
- intent: {prev_intent}
- date: {prev_date}
- time: {prev_time}

User message:
"{message}"

Extract intent, date, and time from the user message.

Valid intents:
- schedule → user wants to book interview
- reschedule → user wants to change time
- cancel → user wants to cancel
- other → unrelated or unclear

Return ONLY JSON (no markdown, no backticks, no extra text):
{{
    "intent": "...",
    "date": "YYYY-MM-DD or null",
    "time": "HH:MM (24hr) or null",
    "complete": true/false,
    "response": "natural conversational reply"
}}

STRICT RULES — follow exactly:
1. ONLY extract date if the user explicitly mentioned a date or day (e.g. "tomorrow", "Monday", "March 25"). Otherwise return null.
2. ONLY extract time if the user explicitly mentioned a time (e.g. "3pm", "15:00", "at 10"). Otherwise return null.
3. NEVER invent or guess a time. If the user did not say a time → time MUST be null.
4. NEVER invent or guess a date. If the user did not say a date → date MUST be null.
5. Preserve previous values: if prev_date is already set and user didn't say a new date → keep prev_date. Same for time.
6. complete = true ONLY if BOTH date AND time are present (either from this message or preserved from previous).
7. If intent = schedule and date or time is still missing → ask the user for the missing info in response.
8. Convert relative dates: "tomorrow" → {tomorrow}, "today" → {today}.
9. Convert time to 24hr format.
10. Do NOT return "other" for scheduling-related messages.
"""

    res = llm.invoke(prompt)

    content = res.content

    if isinstance(content, list):
        content = content[0].get("text", "")

    # Strip markdown fences if LLM adds them anyway
    content = content.strip()
    if content.startswith("```"):
        content = content.split("```")[1]
        if content.startswith("json"):
            content = content[4:]
        content = content.strip()

    try:
        data = json.loads(content)

        # Safe merge: never downgrade a valid intent to "other"
        new_intent = data.get("intent")
        if prev_intent in ["schedule", "reschedule", "cancel"] and new_intent == "other":
            final_intent = prev_intent
        else:
            final_intent = new_intent or prev_intent

        # Hard parse — only runs if message actually contains date/time patterns
        parsed_date = parse_date(message)
        parsed_time = parse_time(message)

        # LLM result takes priority, then hard parse, then previous state
        # Normalize literal "null" string the LLM might return
        llm_date = data.get("date")
        llm_time = data.get("time")
        if llm_date == "null":
            llm_date = None
        if llm_time == "null":
            llm_time = None

        final_date = llm_date or parsed_date or prev_date
        final_time = llm_time or parsed_time or prev_time

        return {
            "intent": final_intent,
            "date": final_date,
            "time": final_time,
            "complete": bool(final_date and final_time),
            "response": data.get("response"),
        }

    except Exception:
        # Fallback: still try hard parsing even if JSON failed
        parsed_date = parse_date(message)
        parsed_time = parse_time(message)
        return {
            "intent": prev_intent or "other",
            "date": parsed_date or prev_date,
            "time": parsed_time or prev_time,
            "complete": bool((parsed_date or prev_date) and (parsed_time or prev_time)),
            "response": "Sorry, I couldn't understand. Can you rephrase?",
        }