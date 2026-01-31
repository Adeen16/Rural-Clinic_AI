def evaluate_triage(payload: dict) -> dict:
    """
    Applies deterministic IF/THEN rules to a structured symptom payload.
    Returns a Triage Object with 'priority', 'action', and 'rationale'.
    """
    
    # Default Result
    result = {
        "priority": "GREEN",
        "action": "ROUTINE: Schedule standard intake.",
        "rationale": "No critical red flags detected."
    }
    
    body_systems = payload.get("body_systems", {})
    
    # Helper to flatten all symptoms for global checks (like fever)
    all_symptoms = []
    for system_list in body_systems.values():
        all_symptoms.extend(system_list)
        
    # --- RED FLAG RULES (IMMEDIATE) ---
    
    for s in all_symptoms:
        # Fallback if AI uses 'symptom' instead of 'name'
        raw_name = s.get("name") or s.get("symptom") or ""
        name = raw_name.lower().replace(" ", "_") # Force snake_case normalization
        severity = s.get("severity_scale", 0)
        quality = s.get("quality", "").lower()
        
        # Rule 1: Chest Pain + High Severity
        if name == "chest_pain" and severity >= 7:
            return {
                "priority": "RED",
                "action": "CRITICAL: Potential ACS. Dispatch Ambulance / ER Transfer.",
                "rationale": f"Detected severe chest pain (Severity: {severity})"
            }

        # Rule 2: Shortness of Breath + Sudden
        if name == "shortness_of_breath" and s.get("onset") == "sudden":
            return {
                "priority": "RED",
                "action": "CRITICAL: Respiratory Distress. Immediate Evaluation.",
                "rationale": "Sudden onset shortness of breath detected."
            }

        # Rule 3: Fracture / Major Trauma
        if "fracture" in name or "bone" in name or "deformity" in name:
            # We treat mentioned fractures as critical in rural settings due to lack of imaging
            return {
                "priority": "RED",
                "action": "CRITICAL: Possible Fracture/Trauma. Immobilize & Transfer.",
                "rationale": f"Detected potential fracture symptom: {name}"
            }

    # --- AMBER FLAG RULES (URGENT) ---
    
    for s in all_symptoms:
        name = s.get("name", "").lower()
        val_str = str(s.get("value", "0"))
        
        # Rule 3: High Fever (>104F)
        # Simple extraction logic: check if '104' is in value string
        # In a real app, we'd have a helper to parse floats safely
        if name == "fever" and ("104" in val_str or "105" in val_str):
             result = { # Don't return yet, check for higher priority? (Red > Amber)
                "priority": "AMBER",
                "action": "URGENT: High Grade Fever. Evaluate within 1 hour.",
                "rationale": f"High fever detected: {val_str}"
            }
            
        # Rule 4: Suicidal Ideation
        if name == "suicidal_ideation":
             return { # Mental health safety is often immediate/high priority
                "priority": "AMBER",
                "action": "URGENT: Mental Health Crisis. Monitor Patient 1:1.",
                "rationale": "Suicidal ideation flagged."
            }

    # If we found an AMBER result but no RED, return AMBER.
    # Otherwise return default GREEN.
    return result
