# from app.llm.llm_extractor import extract_with_llm
# from app.agents.intent_agent import llm
# import json

# def conversation_node(state):

#     # STEP 1: Extract structured data
#     llm_data = extract_with_llm(state)

#     intent = llm_data.get("intent")
#     date = llm_data.get("date")
#     time = llm_data.get("time")
#     complete = llm_data.get("complete")

#     # STEP 2: Build SMART conversational prompt
#     prompt = f"""
# You are a smart AI interview scheduling assistant.

# Conversation state:
# - intent: {intent}
# - date: {date}
# - time: {time}
# - complete: {complete}

# User message:
# "{state.get("message")}"

# Your job:
# - Respond naturally like a human assistant
# - If details are missing → ask for them
# - If complete → confirm scheduling clearly
# - Be short, professional, and helpful

# Examples:
# - Missing date → "Sure! What date would you prefer?"
# - Missing time → "Got it. What time works for you?"
# - Complete → "Great! Your interview is scheduled on {date} at {time}"

# Return ONLY a natural response text.
# """

#     res = llm.invoke(prompt)

#     content = res.content
#     if isinstance(content, list):
#         content = content[0].get("text", "")

#     response = content.strip()

#     return {
#         **state,
#         "intent": intent,
#         "date": date,
#         "time": time,
#         "complete": complete,
#         "response": response
#     }







from app.llm.llm_extractor import extract_with_llm
from app.agents.intent_agent import llm


def conversation_node(state):

    # STEP 1: Extract structured data
    llm_data = extract_with_llm(state)

    intent = llm_data.get("intent")
    date = llm_data.get("date")
    time = llm_data.get("time")
    complete = llm_data.get("complete")

    # STEP 2: Build SMART conversational prompt
    prompt = f"""
You are a smart AI interview scheduling assistant.

Conversation state:
- intent: {intent}
- date: {date}
- time: {time}
- complete: {complete}

User message:
"{state.get("message")}"

Your job:
- Respond naturally like a human assistant
- If date is missing → ask specifically for the date
- If time is missing → ask specifically for the time
- If both are present (complete = true) → confirm scheduling clearly
- Be short, professional, and helpful

Examples:
- intent=schedule, date=None, time=None → "Sure! What date would you prefer for the interview?"
- intent=schedule, date=set, time=None → "Got it. What time works for you?"
- intent=schedule, date=None, time=set → "Great! And what date would you like?"
- intent=schedule, complete=True → "Your interview is scheduled on {date} at {time}. See you then!"
- intent=cancel → "Got it, I'll cancel your interview. Can you confirm your name or booking ID?"
- intent=reschedule → "Sure! What new date and time would work for you?"

Return ONLY the response text, no JSON, no extra formatting.
"""

    res = llm.invoke(prompt)

    content = res.content
    if isinstance(content, list):
        content = content[0].get("text", "")

    response = content.strip()

    return {
        **state,
        "intent": intent,
        "date": date,
        "time": time,
        "complete": complete,
        "response": response,
    }