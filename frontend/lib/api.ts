export interface IngestResponse {
    patient_id: string;
    notes_summary: string;
    vitals: any;
    symptoms: string[];
}

export interface TriageResponse {
    priority: "RED" | "AMBER" | "GREEN";
    action: string;
    rationale: string;
}

const API_Base = "http://localhost:8000";

export async function ingestPatientData(text: string): Promise<IngestResponse> {
    // Simulate API call delay for demo purposes if backend isn't running
    // return new Promise(resolve => setTimeout(() => resolve({
    //     patient_id: "123",
    //     notes_summary: "Patient reported chest pain.",
    //     vitals: {},
    //     symptoms: ["Chest Pain"]
    // }), 2000));

    const res = await fetch(`${API_Base}/ingest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
    });
    if (!res.ok) throw new Error("Failed to ingest data");
    return res.json();
}

export async function getTriage(patientId: string): Promise<TriageResponse> {
    const res = await fetch(`${API_Base}/triage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patient_id: patientId }),
    });
    if (!res.ok) throw new Error("Failed to get triage");
    return res.json();
}
