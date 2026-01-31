import os
import sys
import json

# Ensure we can import from project root
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(project_root)

from tools.groq_client import extract_symptoms

def probe_groq():
    input_text = "I've had crushing chest pain for about 30 minutes. It hurts a lot."
    print("Probing Groq...")
    
    payload = extract_symptoms(input_text)
    
    # Save to file to avoid stdout corruption
    with open("debug_groq.json", "w") as f:
        json.dump(payload, f, indent=2)
        
    print("Saved to debug_groq.json")

if __name__ == "__main__":
    probe_groq()
