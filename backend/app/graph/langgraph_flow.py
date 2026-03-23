from langgraph.graph import StateGraph, END

from app.graph.state import GraphState

from app.agents.intent_agent import intent_node
from app.agents.conversation_agent import conversation_node
from app.agents.availability_agent import availability_node
from app.agents.scheduling_agent import scheduling_node
from app.agents.reschedule_agent import reschedule_node
from app.agents.cancellation_agent import cancel_node


#  Decide what to do AFTER conversation
def route_after_conversation(state):
    if state.get("intent") == "schedule_ready":
        return "availability"
    return "end"


def route_intent(state):
    intent = state["intent"]

    if "schedule" in intent:
        return "conversation"
    elif "reschedule" in intent:
        return "reschedule"
    elif "cancel" in intent:
        return "cancel"
    else:
        return "conversation"


def build_graph():
    builder = StateGraph(GraphState)

    # Nodes
    builder.add_node("intent", intent_node)
    builder.add_node("conversation", conversation_node)
    builder.add_node("availability", availability_node)
    builder.add_node("schedule", scheduling_node)
    builder.add_node("reschedule", reschedule_node)
    builder.add_node("cancel", cancel_node)

    # Entry
    builder.set_entry_point("intent")

    # Intent routing
    builder.add_conditional_edges(
        "intent",
        route_intent,
        {
            "conversation": "conversation",
            "reschedule": "reschedule",
            "cancel": "cancel"
        }
    )

    #  NO LOOP HERE
    builder.add_conditional_edges(
        "conversation",
        route_after_conversation,
        {
            "availability": "availability",
            "end": END
        }
    )

    # Scheduling flow
    builder.add_edge("availability", "schedule")
    builder.add_edge("schedule", END)

    # Other flows
    builder.add_edge("reschedule", END)
    builder.add_edge("cancel", END)

    return builder.compile()


graph = build_graph()


def run_flow(user_id: str, message: str, prev_state: dict = None):

    #  merge previous state
    if prev_state:  
        state = {
            **prev_state,
            "message": message
        }
    else:
        state: GraphState = {
            "user_id": user_id,
            "message": message,
            "intent": None,
            "response": None,
            "slots": None,
            "selected_slot": None,
            "event_id": None,
            "date": None,
            "time": None,
            "confirmed": None
        }

    result = graph.invoke(state)

    return result