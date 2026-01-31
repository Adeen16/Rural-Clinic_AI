"use client";

import { AlertTriangle, Clock, CheckCircle, RotateCcw } from "lucide-react";

interface TriageResult {
    priority: "RED" | "AMBER" | "GREEN";
    action: string;
    rationale: string;
}

interface TriageCardProps {
    result: TriageResult;
    onReset: () => void;
}

export default function TriageCard({ result, onReset }: TriageCardProps) {
    const { priority } = result;

    // Patient-friendly messaging (no clinical jargon)
    const config = {
        RED: {
            title: "High Priority",
            message: "Please wait here. A nurse will see you right away.",
            icon: AlertTriangle,
            colorClass: "red",
            iconColor: "text-[var(--triage-red)]",
        },
        AMBER: {
            title: "Medium Priority",
            message: "Please take a seat. You will be seen within the hour.",
            icon: Clock,
            colorClass: "amber",
            iconColor: "text-[var(--triage-amber)]",
        },
        GREEN: {
            title: "Standard Priority",
            message: "Please check in at the front desk for your appointment.",
            icon: CheckCircle,
            colorClass: "green",
            iconColor: "text-[var(--triage-green)]",
        },
    };

    const { title, message, icon: Icon, colorClass, iconColor } = config[priority];

    return (
        <div className="w-full max-w-xl mx-auto animate-fade-up space-y-6">
            {/* Main Result Card */}
            <div className={`triage-banner ${colorClass}`}>
                <div className="flex items-start gap-5">
                    <div className="flex-shrink-0">
                        <Icon className={`w-12 h-12 ${iconColor}`} strokeWidth={2} />
                    </div>
                    <div className="space-y-2">
                        <h2 className={`text-2xl font-bold ${iconColor}`}>
                            {title}
                        </h2>
                        <p className="text-lg text-[var(--text-primary)] leading-relaxed">
                            {message}
                        </p>
                    </div>
                </div>
            </div>

            {/* Reset Button */}
            <button onClick={onReset} className="btn-secondary w-full">
                <RotateCcw className="w-4 h-4" />
                Start Over
            </button>

            {/* Disclaimer */}
            <p className="text-center text-xs text-[var(--text-muted)] px-4">
                This is a preliminary assessment. Final care decisions are made by healthcare providers.
            </p>
        </div>
    );
}
