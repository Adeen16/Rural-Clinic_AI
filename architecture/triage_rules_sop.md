# Triage Rules SOP (Layer 1)

## Objective
Apply deterministic `IF/THEN` logic to the structured JSON payload to generate a Triage Recommendation.
**NO AI is used in this step.**

## Logic Table

| Priority | Trigger Condition | Action / Output |
| :--- | :--- | :--- |
| **RED (Immediate)** | `symptom.name == 'chest_pain'` AND `severity >= 7` | "CRITICAL: Potential ACS. Dispatch Ambulance / ER Transfer." |
| **RED (Immediate)** | `symptom.name == 'shortness_of_breath'` AND `onset == 'sudden'` | "CRITICAL: Respiratory Distress. Immediate Evaluation." |
| **AMBER (Urgent)** | `symptom.name == 'fever'` AND `value >= '104'` (or 40C) | "URGENT: High Grade Fever. Evaluate within 1 hour." |
| **AMBER (Urgent)** | `symptom.name == 'suicidal_ideation'` | "URGENT: Mental Health Crisis. Monitor Patient 1:1." |
| **GREEN (Routine)** | Default (No Red/Amber triggers) | "ROUTINE: Schedule standard intake." |

## Implementation Rules
1.  **Iterate** through all body systems.
2.  **Highest Priority Wins**: If Red and Green rules both match, Output Red.
3.  **Fallback**: If no rules match, default to Green.
