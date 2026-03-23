from app.tools.calendar_tools import get_slots

def availability_agent():
    return get_slots()


def availability_node(state):
    slots = availability_agent()

    return {**state, "slots": slots}