from typing import TypedDict, Optional, List


class GraphState(TypedDict):
    user_id: str
    message: str

    intent: Optional[str]
    response: Optional[str]

    date: Optional[str]
    time: Optional[str]
    complete: Optional[bool]

    slots: Optional[List[str]]
    selected_slot: Optional[str]
    event_id: Optional[str]