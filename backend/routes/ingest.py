from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from tools.groq_client import extract_symptoms

router = APIRouter()

class IngestRequest(BaseModel):
    text: str

@router.post("/ingest")
async def process_ingest(request: IngestRequest):
    """
    Receives raw patient text -> Calls Groq -> Returns Symptom JSON
    """
    if not request.text:
        raise HTTPException(status_code=400, detail="Input text is empty")
    
    result = extract_symptoms(request.text)
    
    if "error" in result:
         raise HTTPException(status_code=500, detail=result["error"])
         
    return result
