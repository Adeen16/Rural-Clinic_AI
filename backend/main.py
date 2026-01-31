from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routes import ingest, triage

app = FastAPI(title="RuralClinic AI")

# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Tighten this for prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(ingest.router)
app.include_router(triage.router)

@app.get("/")
def health_check():
    return {"status": "active", "system": "RuralClinic AI"}
