
import sys
import os

# Add project root to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from tools.rule_engine import evaluate_triage

def test_fracture():
    print("Testing Fracture Detection Logic...")
    
    # Test Case 1: Explicit Fracture
    payload_fracture = {
        "body_systems": {
            "musculoskeletal": [
                {"name": "fracture", "severity_scale": 8, "value": "broken arm"}
            ]
        }
    }
    
    result = evaluate_triage(payload_fracture)
    print(f"\nCase 1: 'fracture' keyword")
    print(f"Priority: {result['priority']}")
    print(f"Action: {result['action']}")
    
    if result['priority'] == 'RED' and "Fracture" in result['action']:
        print("✅ PASS")
    else:
        print("❌ FAIL")

    # Test Case 2: Trauma keyword
    payload_trauma = {
        "body_systems": {
            "general": [
                {"name": "bone_trauma", "severity_scale": 9}
            ]
        }
    }
    
    result = evaluate_triage(payload_trauma)
    print(f"\nCase 2: 'bone_trauma' keyword")
    print(f"Priority: {result['priority']}")
    
    if result['priority'] == 'RED':
        print("✅ PASS")
    else:
        print("❌ FAIL")

if __name__ == "__main__":
    test_fracture()
