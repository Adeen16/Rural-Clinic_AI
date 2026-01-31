import os
import json
from groq import Groq
from dotenv import load_dotenv

# Load env from project root
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
load_dotenv(os.path.join(project_root, '.env'))

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# Load the Prompt from SOP
sop_path = os.path.join(project_root, 'architecture', 'normalization_sop.md')
try:
    with open(sop_path, 'r') as f:
        # Simple extraction of the system prompt text block
        # In a real app, we might parse markdown more robustly
        # For now, we assume the prompt is the core instruction
        # We will use a hardcoded version derived from the SOP for reliability
        # but in a perfect world we read the SOP directly.
        pass
except Exception:
    pass

SYSTEM_PROMPT = """
You are a clinical data extraction engine. You DO NOT diagnose. You DO NOT provide medical advice.
Your ONLY job is to extract symptoms from the patient's text and map them to the following JSON structure.

### RULES:
1. Extract ALL symptoms mentioned.
2. If a specific value is provided (e.g., "102 degrees"), put it in 'value'.
3. Estimate 'severity_scale' (1-10) based on adjectives (mild=2, severe/crushing=9). Default to 0 if unknown.
4. Normalize durations to 'duration_value' and 'duration_unit'.
5. Map symptoms to the correct 'body_system'.
6. If the input contains NO medical symptoms, return extracted_timestamp and empty lists.
7. Output STRICT JSON only. No markdown formatting.

### SYMPTOM OBJECT STRUCTURE:
{
  "name": "symptom_name_snake_case (MUST be key 'name', NOT 'symptom')",
  "value": "raw_value_or_null",
  "severity_scale": 0,
  "duration_value": null,
  "duration_unit": null,
  "body_system": "general",
  "certainty": "certain",
  "negated": false,
  "onset_timestamp": null,
  "resolution_timestamp": null,
  "notes": null
}

### JSON SCHEMA:
{
  "patient_input_summary": "One sentence summary",
  "extracted_timestamp": "ISO8601 string",
  "patient_demographics": { "age_value": null, "age_unit": null },
  "body_systems": {
    "general": [], "respiratory": [], "cardiovascular": [], 
    "gastrointestinal": [], "neurological": [], 
    "genitourinary": [], "musculoskeletal": [], "mental_health": []
  },
  "flags": { "uncertainty_detected": false, "missing_critical_info": [] }
}
"""

def extract_symptoms(text: str) -> dict:
    """
    Sends raw text to Groq Llama 3.3 and returns structured JSON.
    """
    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": text}
            ],
            temperature=0.0,
            response_format={"type": "json_object"}
        )
        
        response_content = completion.choices[0].message.content
        return json.loads(response_content)
        
    except Exception as e:
        print(f"Groq Extraction Error: {e}")
        return {"error": str(e), "flags": {"uncertainty_detected": True}}
