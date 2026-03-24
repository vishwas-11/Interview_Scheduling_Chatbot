# from app.llm.llm_extractor import extract_with_llm
# from app.agents.intent_agent import llm


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
# - If date is missing → ask specifically for the date
# - If time is missing → ask specifically for the time
# - If both are present (complete = true) → confirm scheduling clearly
# - Be short, professional, and helpful

# Examples:
# - intent=schedule, date=None, time=None → "Sure! What date would you prefer for the interview?"
# - intent=schedule, date=set, time=None → "Got it. What time works for you?"
# - intent=schedule, date=None, time=set → "Great! And what date would you like?"
# - intent=schedule, complete=True → "Your interview is scheduled on {date} at {time}. See you then!"
# - intent=cancel → "Got it, I'll cancel your interview. Can you confirm your name or booking ID?"
# - intent=reschedule → "Sure! What new date and time would work for you?"

# Return ONLY the response text, no JSON, no extra formatting.
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
#         "response": response,
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

    # STEP 2: Override complete logic per intent
    if intent == "cancel":
        # For cancel, route to cancel_node as soon as intent is known.
        # cancel_node itself handles the two-step flow:
        # - no date/time → lists bookings and asks which one
        # - date/time present → cancels that specific one
        complete = True

    # STEP 3: Build conversational prompt
    prompt = f"""
You are a smart AI interview scheduling assistant.

Conversation state:
- intent: {intent}
- date: {date}
- time: {time}
- complete: {complete}
- pending_cancellations: {state.get("pending_cancellations")}

User message:
"{state.get("message")}"

Your job:
- Respond naturally like a human assistant
- If intent is schedule and date is missing → ask for the date
- If intent is schedule and time is missing → ask for the time
- If intent is schedule and both present → confirm scheduling
- If intent is cancel → say you're looking up their interviews (cancel_node will handle the rest)
- If intent is reschedule and date or time missing → ask for the missing info
- If intent is reschedule and both present → confirm rescheduling

Examples:
- intent=schedule, date=None → "Sure! What date would you prefer for the interview?"
- intent=schedule, date=set, time=None → "Got it. What time works for you?"
- intent=schedule, complete=True → "Scheduling your interview on {date} at {time}."
- intent=cancel → "Sure, let me pull up your scheduled interviews."
- intent=reschedule, date=None → "What new date and time would you like to reschedule to?"
- intent=reschedule, complete=True → "Rescheduling your interview to {date} at {time}."

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