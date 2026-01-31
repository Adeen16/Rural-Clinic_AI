"use client";

import { AlertTriangle, Clock, CheckCircle, RotateCcw, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TriageResult {
    priority: "RED" | "AMBER" | "GREEN";
    action: string;
    rationale: string;
}

interface TriageCardProps {
    result: TriageResult;
    onReset: () => void;
}

export default function TriageCard({ result, onReset }: TriageCardProps) {
    const { priority, action, rationale } = result;

    const config = {
        RED: {
            title: "Immediate Attention",
            action: action || "Please wait here. A nurse will see you right away.",
            icon: AlertTriangle,
            borderColor: "border-triage-red",
            glowColor: "shadow-[0_0_40px_-10px_var(--triage-red)]",
            textColor: "text-triage-red",
            bgGradient: "bg-gradient-to-b from-triage-red/10 to-transparent",
        },
        AMBER: {
            title: "Urgent Attention",
            action: action || "Please take a seat. You will be seen within the hour.",
            icon: Clock,
            borderColor: "border-triage-amber",
            glowColor: "shadow-[0_0_40px_-10px_var(--triage-amber)]",
            textColor: "text-triage-amber",
            bgGradient: "bg-gradient-to-b from-triage-amber/10 to-transparent",
        },
        GREEN: {
            title: "Standard Priority",
            action: action || "Please check in at the front desk for your appointment.",
            icon: CheckCircle,
            borderColor: "border-triage-green",
            glowColor: "shadow-[0_0_40px_-10px_var(--triage-green)]",
            textColor: "text-triage-green",
            bgGradient: "bg-gradient-to-b from-triage-green/10 to-transparent",
        },
    };

    const theme = config[priority];
    const Icon = theme.icon;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-xl mx-auto"
        >
            <Card className={cn(
                "relative overflow-hidden border-2 bg-surface backdrop-blur-xl",
                theme.borderColor,
                theme.glowColor
            )}>
                {/* Background Gradient */}
                <div className={cn("absolute inset-0 opacity-20", theme.bgGradient)} />

                <CardHeader className="relative z-10 flex flex-row items-center gap-4 pb-2">
                    <div className={cn("p-3 rounded-xl bg-surface/50 border", theme.borderColor)}>
                        <Icon className={cn("w-8 h-8", theme.textColor)} />
                    </div>
                    <div>
                        <p className={cn("text-sm font-bold tracking-wider uppercase", theme.textColor)}>
                            Triage Result
                        </p>
                        <CardTitle className="text-2xl">{theme.title}</CardTitle>
                    </div>
                </CardHeader>

                <CardContent className="relative z-10 pt-6 space-y-6">
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium text-text-muted uppercase tracking-wide">
                            Next Step
                        </h3>
                        <p className="text-xl font-medium text-text-primary leading-relaxed">
                            {theme.action}
                        </p>
                    </div>

                    {rationale && (
                        <div className="p-4 rounded-xl bg-surface/50 border border-border/50">
                            <h4 className="text-sm font-medium text-text-muted mb-1">
                                AI Rationale
                            </h4>
                            <p className="text-sm text-text-secondary leading-relaxed">
                                {rationale}
                            </p>
                        </div>
                    )}
                </CardContent>

                <CardFooter className="relative z-10 gap-4 pt-2">
                    <Button variant="outline" className="w-full" onClick={onReset}>
                        <RotateCcw className="w-4 h-4 mr-2" />
                        New Check-in
                    </Button>
                    <Button variant="default" className={cn("w-full bg-surface hover:bg-surface-hover text-white border", theme.borderColor)}>
                        View Details
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </CardFooter>
            </Card>

            <p className="mt-6 text-center text-xs text-text-muted opacity-60">
                This is a preliminary AI assessment. Final care decisions are reserved for healthcare providers.
            </p>
        </motion.div>
    );
}
