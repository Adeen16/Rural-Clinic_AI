import { AlertTriangle, Brain, CheckCircle, Info } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface DiagnosticCardProps {
    diagnosis: {
        primary_diagnosis: string;
        confidence_score: number;
        differentials: Array<{
            condition: string;
            probability: number;
            reasoning?: string;
        }>;
        reasoning_summary: string;
        recommended_action: string;
        is_critical?: boolean;
    };
}

export function DiagnosticCard({ diagnosis }: DiagnosticCardProps) {
    const isCritical = diagnosis.is_critical || diagnosis.primary_diagnosis.toLowerCase().includes("critical");
    const isInsufficient = diagnosis.primary_diagnosis.includes("Insufficient");

    let borderColor = "border-l-primary";
    let bgColor = "";
    let titleColor = "text-text-primary";

    if (isCritical) {
        borderColor = "border-l-red-500";
        bgColor = "bg-red-50";
        titleColor = "text-red-700";
    } else if (isInsufficient) {
        borderColor = "border-l-amber-500";
        bgColor = "bg-amber-50";
        titleColor = "text-amber-700";
    }

    return (
        <Card className={cn("p-6 space-y-4 border-l-4", borderColor, bgColor)}>
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-1">
                        What We Think Is Happening
                    </h3>
                    <h2 className={cn("text-2xl font-bold", titleColor)}>
                        {diagnosis.primary_diagnosis}
                    </h2>
                </div>
                <div className="flex items-center gap-2 bg-surface px-3 py-1.5 rounded-full border border-border">
                    <Brain className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">
                        {diagnosis.confidence_score}% Confident
                    </span>
                </div>
            </div>

            <div className="bg-surface p-4 rounded-lg border border-border">
                <h4 className="text-sm font-semibold text-text-primary mb-2 flex items-center gap-2">
                    <Info className="w-4 h-4 text-primary" />
                    Why We Think This
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                    {diagnosis.reasoning_summary}
                </p>
            </div>

            {diagnosis.differentials.length > 0 && (
                <div>
                    <h4 className="text-sm font-medium text-text-secondary mb-3">Other Possibilities</h4>
                    <div className="space-y-2">
                        {diagnosis.differentials.map((diff, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-surface rounded-lg border border-border">
                                <span className="text-text-primary font-medium">{diff.condition}</span>
                                <span className="text-sm text-text-muted">{diff.probability}% Possible</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {isCritical && (
                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <p className="text-sm font-bold text-red-800">
                        {diagnosis.recommended_action}
                    </p>
                </div>
            )}

            {!isCritical && (
                <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <p className="text-sm text-primary">
                        Recommendation: {diagnosis.recommended_action}
                    </p>
                </div>
            )}
        </Card>
    );
}
