import os
import sys
import json
from dotenv import load_dotenv

# Ensure we can import from project root
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(project_root)

from tools.groq_client import extract_symptoms
from tools.rule_engine import evaluate_triage

def test_logic():
    print("--- 🧪 Starting Logic Verification ---")
    
    # Test Case 1: Critical (Chest Pain)
    input_text = "I've had crushing chest pain for about 30 minutes. It hurts a lot."
    print(f"\n[Input]: \"{input_text}\"")
    
    # Step 1: Ingest (Groq)
    print("... Calling Groq API (Normalizing)...")
    symptom_payload = extract_symptoms(input_text)
    
    # DEBUG: Inspect the symptoms directly
    print("\n--- [DEBUG] Extracted Symptoms ---")
    for system, symptoms in symptom_payload.get("body_systems", {}).items():
        for s in symptoms:
            print(f"System: {system} | Name: '{s.get('name')}' | Severity: {s.get('severity_scale')} ({type(s.get('severity_scale'))})")
    print("----------------------------------\n")
    
    # Step 2: Triage (Rules)
    print("... Applying Triage Rules...")
    triage_result = evaluate_triage(symptom_payload)
    print(f"[Triage Result]: {json.dumps(triage_result, indent=2)}")
    
    # Validation
    if triage_result["priority"] == "RED":
        print("\n✅ Test PASSED: Correctly identified RED FLAG (Chest Pain).")
    else:
        print("\n❌ Test FAILED: Expected RED priority.")

    # Test Case 2: Routine (Cold)
    print("\n--- Test Case 2: Routine ---")
    input_text_2 = "I have a mild runny nose and cough since yesterday."
    print(f"[Input]: \"{input_text_2}\"")
    
    symptom_payload_2 = extract_symptoms(input_text_2)
    triage_result_2 = evaluate_triage(symptom_payload_2)
    print(f"[Triage Result]: {triage_result_2['priority']} - {triage_result_2['action']}")
    
    if triage_result_2["priority"] == "GREEN":
         print("\n✅ Test PASSED: Correctly identified GREEN (Routine).")
    else:
         print("\n❌ Test FAILED: Expected GREEN priority.")

if __name__ == "__main__":
    test_logic()
