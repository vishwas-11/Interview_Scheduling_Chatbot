# from app.agents.intent_agent import llm
# import re


# def extract_info(message: str):
#     date = None
#     time = None

#     msg = message.lower()

#     #  Date extraction
#     if "tomorrow" in msg:
#         date = "tomorrow"

#     #  Time extraction (handles 10am, 2pm, 14:00 etc)
#     time_match = re.search(r"\b(\d{1,2})(:\d{2})?\s?(am|pm)?\b", msg)

#     if time_match:
#         hour = int(time_match.group(1))
#         minute = time_match.group(2) if time_match.group(2) else ":00"
#         meridian = time_match.group(3)

#         if meridian == "pm" and hour != 12:
#             hour += 12
#         if meridian == "am" and hour == 12:
#             hour = 0

#         time = f"{hour:02d}{minute}"

#     return date, time

# def conversation_node(state):
#     message = state["message"]

#     extracted_date, extracted_time = extract_info(message)

#     # merge with existing state
#     date = extracted_date or state.get("date")
#     time = extracted_time or state.get("time")

#     #  Missing both → ask user and STOP
#     if not date and not time:
#         return {
#             **state,
#             "response": "Please provide date and time for the interview.",
#             "date": None,
#             "time": None,
#             "intent": "incomplete"
#         }

#     #  Missing date
#     if not date:
#         return {
#             **state,
#             "response": "Which date would you like?",
#             "date": None,
#             "time": time,
#             "intent": "incomplete"
#         }

#     #  Missing time
#     if not time:
#         return {
#             **state,
#             "response": "What time works for you?",
#             "date": date,
#             "time": None,
#             "intent": "incomplete"
#         }

#     #  All info available → proceed
#     return {
#         **state,
#         "date": date,
#         "time": time,
#         "intent": "schedule_ready"
#     }



from app.llm.llm_extractor import extract_with_llm


def conversation_node(state):
    message = state["message"]

    llm_data = extract_with_llm(message)

    return {
        **state,
        "intent": llm_data.get("intent"),
        "date": llm_data.get("date"),
        "time": llm_data.get("time"),
        "response": llm_data.get("response"),
        "complete": llm_data.get("complete")
    }