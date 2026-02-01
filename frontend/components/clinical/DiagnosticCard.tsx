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
    let titleColor = "text-white";

    if (isCritical) {
        borderColor = "border-l-red-500";
        bgColor = "bg-red-500/5";
        titleColor = "text-red-400";
    } else if (isInsufficient) {
        borderColor = "border-l-amber-500";
        bgColor = "bg-amber-500/5";
        titleColor = "text-amber-400";
    }

    return (
        <Card className={cn("p-6 space-y-4 border-l-4", borderColor, bgColor)}>
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-1">
                        Primary Clinical Assessment
                    </h3>
                    <h2 className={cn("text-2xl font-bold", titleColor)}>
                        {diagnosis.primary_diagnosis}
                    </h2>
                </div>
                <div className="flex items-center gap-2 bg-background/50 px-3 py-1.5 rounded-full border border-border">
                    <Brain className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">
                        {diagnosis.confidence_score}% Confidence
                    </span>
                </div>
            </div>

            <div className="bg-background/40 p-4 rounded-lg border border-border/50">
                <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                    <Info className="w-4 h-4 text-blue-400" />
                    Clinical Reasoning
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                    {diagnosis.reasoning_summary}
                </p>
            </div>

            {diagnosis.differentials.length > 0 && (
                <div>
                    <h4 className="text-sm font-medium text-text-secondary mb-3">Differential Diagnosis</h4>
                    <div className="space-y-2">
                        {diagnosis.differentials.map((diff, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                                <span className="text-white font-medium">{diff.condition}</span>
                                <span className="text-sm text-text-muted">{diff.probability}% Likely</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {isCritical && (
                <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <p className="text-sm font-bold text-red-200">
                        {diagnosis.recommended_action}
                    </p>
                </div>
            )}

            {!isCritical && (
                <div className="flex items-center gap-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    <p className="text-sm text-blue-200">
                        Recommended: {diagnosis.recommended_action}
                    </p>
                </div>
            )}
        </Card>
    );
}
