"use client";

import { useState } from "react";
import { Loader2, ArrowRight } from "lucide-react";
import VoiceButton from "./VoiceButton";

interface IntakeFormProps {
    onAnalyze: (text: string) => void;
    isProcessing: boolean;
}

export default function IntakeForm({ onAnalyze, isProcessing }: IntakeFormProps) {
    const [text, setText] = useState("");
    const [isVoiceActive, setIsVoiceActive] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim() && !isProcessing) {
            onAnalyze(text);
        }
    };

    const handleVoiceClick = () => {
        setIsVoiceActive(!isVoiceActive);
        // Demo: simulate voice input after 2 seconds
        if (!isVoiceActive) {
            setTimeout(() => {
                setIsVoiceActive(false);
                setText("I have been experiencing chest pain for the last hour. It feels like pressure.");
            }, 2000);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
            <div className="card-elevated p-6 md:p-8 space-y-6">
                {/* Textarea */}
                <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">
                        Describe your symptoms
                    </label>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Example: I have a headache and feel dizzy..."
                        className="input-area h-40"
                        disabled={isProcessing}
                    />
                </div>

                {/* Voice Button - Centered */}
                <div className="flex flex-col items-center gap-3">
                    <VoiceButton
                        onClick={handleVoiceClick}
                        isActive={isVoiceActive}
                        isDisabled={isProcessing}
                    />
                    <span className="text-sm text-[var(--text-muted)]">
                        {isVoiceActive ? "Listening..." : "Tap to speak"}
                    </span>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={!text.trim() || isProcessing}
                    className="btn-primary w-full"
                >
                    {isProcessing ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Analyzing...
                        </>
                    ) : (
                        <>
                            Get Triage
                            <ArrowRight className="w-5 h-5" />
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
