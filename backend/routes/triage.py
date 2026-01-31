from fastapi import APIRouter
from pydantic import BaseModel
from typing import Dict, Any
from tools.rule_engine import evaluate_triage

router = APIRouter()

# In a strict Pydantic world, we would define the full Symptom Schema here too
# For now, we accept loose Dict to pass through to the Rule Engine
class TriageRequest(BaseModel):
    payload: Dict[str, Any]

@router.post("/triage")
async def process_triage(request: TriageRequest):
    """
    Receives Structured Symptom JSON -> Applies Rules -> Returns Recommendation
    """
    result = evaluate_triage(request.payload)
    return result
