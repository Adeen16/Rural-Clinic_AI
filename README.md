# RuralClinic AI 🏥

> **AI-Powered Clinical Decision Support for Rural Healthcare**
>
> *Designed for low-resource environments. Verified for safety. Built for speed.*

## Overview
RuralClinic AI is a lightweight diagnostic support tool designed for rural health workers. It uses **Groq LPU (Llama 3.3)** to normalize unstructured patient narratives into structured clinical data, and a **Deterministic Rule Engine** to provide instant, safe triage recommendations (Red/Amber/Green).

### Key Features
*   **Voice-First Design**: Large touch targets and clean UI for field use.
*   **Safety First**: No AI Diagnoses. Triage logic is 100% deterministic code.
*   **Edge Optimized**: Lightweight Frontend (Next.js) + Fast Backend (FastAPI).

---

## Architecture (The 3-Layer Brain)

1.  **Layer 1 (SOPs)**: Definitions of truth.
    *   `normalization_sop.md`: Dictates how Llama 3.3 extracts symptoms.
    *   `triage_rules_sop.md`: Dictates the IF/THEN logic for alerts.
2.  **Layer 2 (Navigation)**: API Routing.
    *   `POST /ingest`: Text -> JSON (via Groq).
    *   `POST /triage`: JSON -> Recommendation (via Python Rules).
3.  **Layer 3 (Tools)**: Core Engines.
    *   `groq_client.py`: The AI Adapter.
    *   `rule_engine.py`: The Logic Gatekeeper.

---

## Quick Start 🚀

### Option A: One-Click Launch (Windows)
Simply double-click **`launch_app.bat`**.
*   It launches the Backend (Port 8000).
*   It installs frontend deps & launches Frontend (Port 3000).

### Option B: Manual Setup

**Backend:**
```bash
pip install -r requirements.txt
python -m uvicorn backend.main:app --reload --port 8000
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### Option C: Docker (Production)
```bash
docker-compose up --build
```

---

## Tech Stack
*   **Frontend**: Next.js 14, Tailwind CSS (Minimalist Theme).
*   **Backend**: FastAPI, Pydantic.
*   **AI**: Groq (Llama 3.3-70B).
*   **Database**: Supabase (PostgreSQL) + Redis (Cache).

---

## Status
*   ✅ **Phase 1 (Blueprint)**: Schema & Vision defined.
*   ✅ **Phase 2 (Link)**: Connected to Groq & Supabase.
*   ✅ **Phase 3 (Architect)**: Built the Logic Core.
*   ✅ **Phase 4 (Stylize)**: Built the UI.
*   ✅ **Phase 5 (Trigger)**: Dockerized & Documented.

---
*Built with the B.L.A.S.T. Protocol.*
