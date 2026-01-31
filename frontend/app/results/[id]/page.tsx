"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, BookOpen, Stethoscope, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import TriageCard, { TriageResult } from "@/components/clinical/TriageCard";
import Link from "next/link";

export default function ResultPage() {
    const params = useParams();
    const router = useRouter();
    const [result, setResult] = useState<TriageResult | null>(null);

    useEffect(() => {
        // In a real app, fetch from API using params.id
        // For this demo, we use sessionStorage (or fallback mock)
        const stored = sessionStorage.getItem(params.id as string);
        if (stored) {
            setResult(JSON.parse(stored));
        } else {
            // Fallback for direct access without intake
            setResult({
                priority: "AMBER",
                action: "Consult a specialist within 24 hours.",
                rationale: "Symptoms suggest possible non-critical infection."
            });
        }
    }, [params.id]);

    if (!result) return <div className="p-12 text-center">Loading result...</div>;

    return (
        <main className="min-h-screen p-6 md:p-12 max-w-4xl mx-auto flex flex-col gap-8">
            <header className="flex items-center gap-4">
                <Link href="/intake">
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <ArrowLeft className="w-6 h-6" />
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold">Consultation Result</h1>
            </header>

            {/* Triage Status */}
            <section>
                <TriageCard result={result} onReset={() => router.push("/intake")} />
            </section>

            {/* Patient Education & Actions */}
            <div className="grid md:grid-cols-2 gap-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>

                {/* Education Module */}
                <Card className="md:col-span-1 bg-surface/50 border-primary/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <BookOpen className="w-5 h-5 text-primary" />
                            Patient Education
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-text-secondary">
                        <p>Based on the symptoms provided:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Monitor temperature and blood pressure every 4 hours.</li>
                            <li>Stay hydrated and avoid strenuous activity.</li>
                            <li>If symptoms worsen (e.g., shortness of breath), return immediately.</li>
                        </ul>
                        <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
                            <p className="text-sm text-primary font-medium">
                                Note: This information is automatically generated based on clinical guidelines for this triage category.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Specialist Referral */}
                <Card className="md:col-span-1 bg-surface/50 border-triage-green/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <Stethoscope className="w-5 h-5 text-triage-green" />
                            Recommended Specialist
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <h3 className="text-lg font-medium text-white">Cardiologist (Heart Specialist)</h3>
                            <p className="text-sm text-text-muted">Recommended due to chest pressure symptoms.</p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-surface border border-border">
                                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold">Dr</div>
                                <div>
                                    <p className="font-medium text-white">Dr. Sarah Khan</p>
                                    <p className="text-xs text-text-muted flex items-center">
                                        <MapPin className="w-3 h-3 mr-1" /> 5km away • Memorial Hospital
                                    </p>
                                </div>
                                <Button size="sm" variant="outline" className="ml-auto">
                                    Details
                                </Button>
                            </div>

                            <div className="flex items-center gap-3 p-3 rounded-lg bg-surface border border-border">
                                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold">Dr</div>
                                <div>
                                    <p className="font-medium text-white">Dr. Amit Patel</p>
                                    <p className="text-xs text-text-muted flex items-center">
                                        <MapPin className="w-3 h-3 mr-1" /> 8km away • City Clinic
                                    </p>
                                </div>
                                <Button size="sm" variant="outline" className="ml-auto">
                                    Details
                                </Button>
                            </div>
                        </div>

                        <Link href="/network" className="block">
                            <Button className="w-full bg-triage-green hover:bg-green-600 text-white border-none shadow-lg shadow-green-900/20">
                                <Phone className="w-4 h-4 mr-2" />
                                Find More Specialists
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
