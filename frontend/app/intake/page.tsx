"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import IntakeForm from "@/components/clinical/IntakeForm";
// import { ingestPatientData, getTriage } from "@/lib/api"; 
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function IntakePage() {
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleAnalyze = async (text: string) => {
        setIsProcessing(true);
        try {
            // Mocking the API flow for the UI demo to ensure smooth navigation 
            // regardless of backend state. In production, uncomment API calls.

            console.log("Analyzing:", text);

            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Mock ID logic
            const mockId = "consult-" + Date.now();

            // Store result in sessionStorage to pass to results page (as we don't have a real DB persistence in this demo)
            const mockResult = {
                priority: text.toLowerCase().includes("chest") ? "RED" : "GREEN",
                action: text.toLowerCase().includes("chest")
                    ? "Immediate Nurse Attention Required. Keep patient stable."
                    : "Schedule standard appointment.",
                rationale: "Analysis of symptoms indicates potential cardiac event."
            };
            sessionStorage.setItem(mockId, JSON.stringify(mockResult));

            router.push(`/results/${mockId}`);

            /* 
            const ingestRes = await ingestPatientData(text);
            const triageRes = await getTriage(ingestRes.patient_id);
            // Navigate to results
            router.push(`/results/${ingestRes.patient_id}`);
            */

        } catch (error) {
            console.error("Analysis failed", error);
            alert("Failed to process. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <main className="min-h-screen p-6 md:p-12 max-w-4xl mx-auto flex flex-col gap-8">
            <header className="flex items-center gap-4">
                <Link href="/">
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <ArrowLeft className="w-6 h-6" />
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold">Patient Intake</h1>
            </header>

            <div className="flex-1 flex flex-col items-center justify-center">
                <IntakeForm onAnalyze={handleAnalyze} isProcessing={isProcessing} />
            </div>
        </main>
    );
}
