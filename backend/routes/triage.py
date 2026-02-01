from fastapi import APIRouter
from pydantic import BaseModel
from typing import Dict, Any
from tools.rule_engine import evaluate_triage

from tools.diagnosis_engine import run_differential_diagnosis

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
    # 1. Standard Rule-Based Triage (Priority Level)
    triage_result = evaluate_triage(request.payload)
    
    # 2. Advanced Differential Diagnosis (Hybrid AI)
    # Flatten symptoms from body systems map to a single list
    all_symptoms = []
    body_systems = request.payload.get("body_systems", {})
    for system, symptoms in body_systems.items():
        all_symptoms.extend(symptoms)
        
    demographics = request.payload.get("patient_demographics", {})
    
    diagnosis = run_differential_diagnosis(all_symptoms, demographics)
    
    # Merge results
    triage_result["diagnosis"] = diagnosis
    
    return triage_result
