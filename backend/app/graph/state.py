from typing import TypedDict, Optional, List

class GraphState(TypedDict):
    user_id: str
    message: str
    intent: Optional[str]
    response: Optional[str]
    slots: Optional[List[str]]
    selected_slot: Optional[str]
    event_id: Optional[str]