from app.tools.memory_tool import memory_tool
from app.agents.intent_agent import llm


def conversation_agent(user_id, message):
    memory_tool(user_id, message)

    prompt = f"Ask missing interview details for: {message}"
    res = llm.invoke(prompt)

    return res.content


def conversation_node(state):
    user_id = state["user_id"]
    message = state["message"]

    reply = conversation_agent(user_id, message)

    return {**state, "response": reply}