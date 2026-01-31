"use client";

import { useState } from "react";
import { Activity } from "lucide-react";
import IntakeForm from "@/components/IntakeForm";
import TriageCard from "@/components/TriageCard";

interface TriageResult {
  priority: "RED" | "AMBER" | "GREEN";
  action: string;
  rationale: string;
}

export default function Home() {
  const [step, setStep] = useState<"INTAKE" | "RESULT">("INTAKE");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TriageResult | null>(null);

  const handleAnalyze = async (text: string) => {
    setLoading(true);
    try {
      // 1. Ingest: Text → Structured Symptoms
      const ingestRes = await fetch("http://localhost:8000/ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!ingestRes.ok) throw new Error("Processing failed");
      const symptoms = await ingestRes.json();

      // 2. Triage: Symptoms → Recommendation
      const triageRes = await fetch("http://localhost:8000/triage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payload: symptoms }),
      });

      if (!triageRes.ok) throw new Error("Triage failed");
      const triageData = await triageRes.json();

      setResult(triageData);
      setStep("RESULT");
    } catch (error) {
      console.error(error);
      alert("Unable to connect. Please ensure the system is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setStep("INTAKE");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="py-4 px-6 border-b border-[var(--border)]">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[var(--accent)] flex items-center justify-center">
              <Activity className="w-5 h-5 text-black" />
            </div>
            <span className="font-semibold text-lg">RuralClinic AI</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="status-dot" />
            <span className="text-sm text-[var(--text-muted)]">Online</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full">
          {step === "INTAKE" && (
            <div className="space-y-8 text-center">
              {/* Hero */}
              <div className="space-y-3 max-w-md mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Tell us how you feel
                </h1>
                <p className="text-[var(--text-secondary)] text-lg">
                  We&apos;ll help prioritize your care
                </p>
              </div>

              {/* Form */}
              <IntakeForm onAnalyze={handleAnalyze} isProcessing={loading} />
            </div>
          )}

          {step === "RESULT" && result && (
            <TriageCard result={result} onReset={handleReset} />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 px-6 border-t border-[var(--border)]">
        <p className="text-center text-xs text-[var(--text-muted)]">
          Powered by Groq LPU • Deterministic Rule Engine
        </p>
      </footer>
    </div>
  );
}
