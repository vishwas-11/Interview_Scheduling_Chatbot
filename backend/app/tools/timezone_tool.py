from datetime import datetime
import pytz

IST = pytz.timezone("Asia/Kolkata")

def normalize_to_ist(time_str: str):
    dt = datetime.fromisoformat(time_str)
    return IST.localize(dt).isoformat()
