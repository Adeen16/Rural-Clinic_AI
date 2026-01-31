import os
import sys
import json

# Ensure we can import from project root
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(project_root)

from tools.rule_engine import evaluate_triage

def test_rule_engine_isolation():
    print("--- 🧪 Testing Rule Engine (Isolation) ---")
    
    # Mock Payload: Critical Chest Pain
    mock_payload_red = {
        "body_systems": {
            "cardiovascular": [
                {
                    "name": "chest_pain",
                    "severity_scale": 9,
                    "onset": "unknown",
                    "value": None
                }
            ]
        }
    }
    
    print(f"\n[Mock Input RED]: {json.dumps(mock_payload_red)}")
    result_red = evaluate_triage(mock_payload_red)
    print(f"[Result]: {result_red['priority']}")
    
    if result_red["priority"] == "RED":
        print("✅ Rule Engine Logic: PASS (Red detected)")
    else:
        print("❌ Rule Engine Logic: FAIL (Expected Red)")

    # Mock Payload: Routine
    mock_payload_green = {
        "body_systems": {
            "respiratory": [
                {
                    "name": "cough",
                    "severity_scale": 2
                }
            ]
        }
    }
    
    print(f"\n[Mock Input GREEN]: {json.dumps(mock_payload_green)}")
    result_green = evaluate_triage(mock_payload_green)
    print(f"[Result]: {result_green['priority']}")
    
    if result_green["priority"] == "GREEN":
         print("✅ Rule Engine Logic: PASS (Green detected)")
    else:
         print("❌ Rule Engine Logic: FAIL (Expected Green)")

if __name__ == "__main__":
    test_rule_engine_isolation()
