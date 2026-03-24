# from langgraph.graph import StateGraph, END
# from app.graph.state import GraphState

# from app.agents.conversation_agent import conversation_node
# from app.agents.availability_agent import availability_node
# from app.agents.scheduling_agent import scheduling_node
# from app.agents.reschedule_agent import reschedule_node
# from app.agents.cancellation_agent import cancel_node


# def route_from_llm(state):
#     intent = state.get("intent")
#     complete = state.get("complete")

#     # If still gathering info → STOP (wait for user next turn)
#     if not complete:
#         return "end"

#     if intent == "schedule":
#         return "availability"

#     elif intent == "reschedule":
#         return "reschedule"

#     elif intent == "cancel":
#         return "cancel"

#     return "end"


# def build_graph():
#     builder = StateGraph(GraphState)

#     # Nodes
#     builder.add_node("conversation", conversation_node)
#     builder.add_node("availability", availability_node)
#     builder.add_node("schedule", scheduling_node)
#     builder.add_node("reschedule", reschedule_node)
#     builder.add_node("cancel", cancel_node)

#     builder.set_entry_point("conversation")

#     builder.add_conditional_edges(
#         "conversation",
#         route_from_llm,
#         {
#             "availability": "availability",
#             "reschedule": "reschedule",
#             "cancel": "cancel",
#             "end": END,
#         }
#     )

#     builder.add_edge("availability", "schedule")
#     builder.add_edge("schedule", END)
#     builder.add_edge("reschedule", END)
#     builder.add_edge("cancel", END)

#     return builder.compile()


# graph = build_graph()


# def run_flow(user_id: str, message: str, prev_state: dict = None):
#     # Default blank state
#     state: GraphState = {
#         "user_id": user_id,
#         "message": message,
#         "intent": None,
#         "response": None,
#         "date": None,
#         "time": None,
#         "complete": False,
#         "conflict": False,
#         "conflict_message": None,
#         "slots": None,
#         "selected_slot": None,
#         "event_id": None,
#     }

#     if prev_state:
#         # Build merged state explicitly — avoids Pylance TypedDict unpacking error
#         state = GraphState(
#             user_id=user_id,
#             message=message,                                        # always new message
#             intent=prev_state.get("intent"),                        # preserve
#             response=None,                                          # reset
#             date=prev_state.get("date"),                            # preserve
#             time=prev_state.get("time"),                            # preserve
#             complete=False,                                         # re-evaluate each turn
#             conflict=False,                                         # reset each turn
#             conflict_message=None,                                  # reset each turn
#             slots=prev_state.get("slots"),                          # preserve
#             selected_slot=prev_state.get("selected_slot"),          # preserve
#             event_id=prev_state.get("event_id"),                    # preserve
#         )

#     result = graph.invoke(state, {"recursion_limit": 20})
#     return result







from langgraph.graph import StateGraph, END
from app.graph.state import GraphState

from app.agents.conversation_agent import conversation_node
from app.agents.availability_agent import availability_node
from app.agents.scheduling_agent import scheduling_node
from app.agents.reschedule_agent import reschedule_node
from app.agents.cancellation_agent import cancel_node


def route_from_llm(state):
    intent = state.get("intent")
    complete = state.get("complete")

    if not complete:
        return "end"

    if intent == "schedule":
        return "availability"

    elif intent == "reschedule":
        return "reschedule"

    elif intent == "cancel":
        return "cancel"

    return "end"


def build_graph():
    builder = StateGraph(GraphState)

    builder.add_node("conversation", conversation_node)
    builder.add_node("availability", availability_node)
    builder.add_node("schedule", scheduling_node)
    builder.add_node("reschedule", reschedule_node)
    builder.add_node("cancel", cancel_node)

    builder.set_entry_point("conversation")

    builder.add_conditional_edges(
        "conversation",
        route_from_llm,
        {
            "availability": "availability",
            "reschedule": "reschedule",
            "cancel": "cancel",
            "end": END,
        }
    )

    builder.add_edge("availability", "schedule")
    builder.add_edge("schedule", END)
    builder.add_edge("reschedule", END)
    builder.add_edge("cancel", END)

    return builder.compile()


graph = build_graph()


def run_flow(user_id: str, message: str, prev_state: dict = None):
    state: GraphState = {
        "user_id": user_id,
        "message": message,
        "intent": None,
        "response": None,
        "date": None,
        "time": None,
        "complete": False,
        "conflict": False,
        "conflict_message": None,
        "slots": None,
        "selected_slot": None,
        "event_id": None,
        "pending_cancellations": None,
    }

    if prev_state:
        state = GraphState(
            user_id=user_id,
            message=message,
            intent=prev_state.get("intent"),
            response=None,
            date=prev_state.get("date"),
            time=prev_state.get("time"),
            complete=False,
            conflict=False,
            conflict_message=None,
            slots=prev_state.get("slots"),
            selected_slot=prev_state.get("selected_slot"),
            event_id=prev_state.get("event_id"),
            pending_cancellations=prev_state.get("pending_cancellations"),  # preserve across turns
        )

    result = graph.invoke(state, {"recursion_limit": 20})
    return result