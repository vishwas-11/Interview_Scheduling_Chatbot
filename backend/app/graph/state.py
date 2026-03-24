# from typing import TypedDict, Optional, List


# class GraphState(TypedDict):
#     user_id: str
#     message: str

#     intent: Optional[str]
#     response: Optional[str]

#     date: Optional[str]
#     time: Optional[str]
#     complete: Optional[bool]

#     # Conflict tracking
#     conflict: Optional[bool]
#     conflict_message: Optional[str]

#     slots: Optional[List[str]]
#     selected_slot: Optional[str]
#     event_id: Optional[str]




from typing import TypedDict, Optional, List


class GraphState(TypedDict):
    user_id: str
    message: str

    intent: Optional[str]
    response: Optional[str]

    date: Optional[str]
    time: Optional[str]
    complete: Optional[bool]

    # Conflict tracking
    conflict: Optional[bool]
    conflict_message: Optional[str]

    slots: Optional[List[str]]
    selected_slot: Optional[str]
    event_id: Optional[str]

    # Cancellation: list of scheduled interviews shown to user for selection
    # Each entry: { "event_id": str, "date": str, "slot": str }
    pending_cancellations: Optional[List[dict]]