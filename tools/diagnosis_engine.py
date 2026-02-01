import os
import json
from groq import Groq
from dotenv import load_dotenv

# Load env from project root
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
load_dotenv(os.path.join(project_root, '.env'))

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

DIAGNOSIS_SYSTEM_PROMPT = """
You are an expert Chief Medical Officer (Internal Medicine). 
Your goal is to provide a highly accurate "Differential Diagnosis" based on the patient's symptoms.

### RULES:
1.  **Analyze** the provided symptoms, age, and biological sex.
2.  **Generate** the Top 3 most likely medical conditions (Differential Diagnosis).
3.  **Assign** a Confidence Score (0-100%) to each.
4.  **Reasoning**: Explain WHY you chose these. specific symptom matches.
5.  **Critical Check**: If the symptoms strongly match a life-threatening emergency (Heart Attack, Stroke, Sepsis, Meningitis), flag the Primary Diagnosis as "CRITICAL" in the reasoning.
6.  **Uncertainty**: If symptoms are vague (e.g., just "weakness"), give lower confidence scores and suggest broad categories.

### OUTPUT JSON FORMAT:
{
  "primary_diagnosis": "Most Likely Condition Name",
  "confidence_score": 85,
  "differentials": [
    {"condition": "Condition A", "probability": 40, "reasoning": "Matches symptom X"},
    {"condition": "Condition B", "probability": 20, "reasoning": "Possible due to Y"}
  ],
  "reasoning_summary": "Patient presents with classic signs of...",
  "recommended_action": "Refer to Cardiologist / Start hydration",
  "dietary_advice": {
    "recommended_foods": ["Warm Khichdi", "Curd (Dahi)", "Boiled Water"],
    "foods_to_avoid": ["Spicy Pickles", "Fried Pakoras", "Tea on empty stomach"],
    "daily_habit": "Drink warm water every morning."
  }
}

### DIETARY ADVICE RULES (STRICT):
1.  **NO SCIENTIFIC METRICS**: Do NOT use "calories", "grams", "protein", "carbohydrates", "vitamins".
2.  **RURAL FRIENDLY**: Use terms a farmer understands. (e.g., "Handful", "Bowl", "Glass").
3.  **INDIAN CONTEXT**: Suggest local foods (Roti, Dal, Rice, Khichdi, Curd, Jaggery).
4.  **SIMPLE & ACTIONABLE**: "Eat X", "Don't Eat Y".
5.  **FALLBACK**: If diagnosis is Insufficient/Unknown, set dietary_advice to null.
"""

CRITICAL_RULES = [
    {"symptoms": ["chest_pain", "shortness_of_breath"], "condition": "Possible Myocardial Infarction", "severity": 10},
    {"symptoms": ["chest_pain", "sweating"], "condition": "Possible Myocardial Infarction", "severity": 10},
    {"symptoms": ["facial_droop", "arm_weakness"], "condition": "Possible Stroke", "severity": 10},
    {"symptoms": ["active_bleeding", "dizziness"], "condition": "Hemorrhagic Shock", "severity": 10}
]

def check_critical_rules(symptoms_list):
    """
    Deterministic Red Flag Check
    """
    normalized_symptoms = [s.get('name', '').lower() for s in symptoms_list]
    
    for rule in CRITICAL_RULES:
        # Check if ALL symptoms in the rule are present
        if all(req in normalized_symptoms for req in rule["symptoms"]):
            return {
                "primary_diagnosis": rule["condition"],
                "confidence_score": 100,
                "differentials": [],
                "reasoning_summary": "CRITICAL EMERGENCY: Symptoms match strict clinical protocol for " + rule["condition"],
                "recommended_action": "IMMEDIATE ER TRANSFER / AMBULANCE",
                "is_critical": True
            }
    return None

def run_differential_diagnosis(symptoms_list, demographics=None):
    """
    Hybrid Diagnosis: Rules -> LLM
    """
    # 1. Deterministic Rule Check
    rule_result = check_critical_rules(symptoms_list)
    if rule_result:
        return rule_result

    # 2. LLM Reasoning
    # Format symptoms for the prompt
    symptom_text = ", ".join([f"{s.get('name')} (Severity: {s.get('severity_scale', 0)})" for s in symptoms_list])
    demo_text = f"Age: {demographics.get('age')}, Sex: {demographics.get('sex')}" if demographics else "Demographics unknown"
    
    user_prompt = f"""
    Patient Demographics: {demo_text}
    Symptoms: {symptom_text}
    
    Provide Differential Diagnosis JSON.
    """

    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": DIAGNOSIS_SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.0,
            response_format={"type": "json_object"}
        )
        
        response_content = completion.choices[0].message.content
        result = json.loads(response_content)
        
        # Enforce Sufficiency Threshold (Safety Layer)
        # If AI is less than 40% confident, we suppress the diagnosis
        if result.get("confidence_score", 0) < 40 and not result.get("primary_diagnosis", "").startswith("CRITICAL"):
             result["primary_diagnosis"] = "Insufficient Clinical Data"
             result["reasoning_summary"] = "The reported symptoms are too vague to form a reliable differential diagnosis. Please gather more history (duration, severity, location)."
             result["recommended_action"] = "Conduct detailed patient interview."
             result["differentials"] = []
             # Fallback Dietary Advice (User Request: Show "Not enough data" message)
             result["dietary_advice"] = {
                 "recommended_foods": [],
                 "foods_to_avoid": [],
                 "daily_habit": "We do not have enough symptoms to provide specific dietary advice."
             }
             
        return result
        
    except Exception as e:
        print(f"Diagnosis LLM Error: {e}")
        # Fallback
        return {
            "primary_diagnosis": "Unspecified Clinical Presentation",
            "confidence_score": 0,
            "differentials": [],
            "reasoning_summary": "AI Service Unavailable. Clinical judgment required.",
            "recommended_action": "Manual Triage Required"
        }
