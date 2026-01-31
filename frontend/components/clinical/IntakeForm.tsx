"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Pencil, Eraser } from "lucide-react";
import { VoiceHero } from "@/components/voice/VoiceHero";
import { useVoice } from "@/hooks/use-voice";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface IntakeFormProps {
    onAnalyze: (text: string) => void;
    isProcessing: boolean;
}

export default function IntakeForm({ onAnalyze, isProcessing }: IntakeFormProps) {
    const [manualMode, setManualMode] = useState(false);
    const [inputText, setInputText] = useState("");

    const {
        isListening,
        transcript,
        startListening,
        stopListening,
        volume
    } = useVoice({
        onResult: (text) => setInputText(text),
    });

    // Handle voice hero click
    const handleVoiceInteraction = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
            setManualMode(false);
        }
    };

    const handleSubmit = () => {
        if (inputText.trim()) {
            onAnalyze(inputText);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-8 py-8 px-4">
            {/* Voice Visualization / Status */}
            <div className="flex-1 flex flex-col items-center justify-center min-h-[300px]">
                <VoiceHero
                    state={isProcessing ? "processing" : isListening ? "listening" : "idle"}
                    onClick={handleVoiceInteraction}
                    volume={volume}
                />
            </div>

            {/* Streaming Text Display */}
            <div className="w-full min-h-[120px] flex items-center justify-center text-center">
                <AnimatePresence mode="wait">
                    {!inputText && !isListening && !manualMode ? (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-2xl font-medium text-text-muted"
                        >
                            "Describe your symptoms..."
                        </motion.p>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="w-full"
                        >
                            {manualMode ? (
                                <textarea
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    className="input-area h-32 text-xl bg-surface/50 border-primary/20 focus:border-primary"
                                    placeholder="Type symptoms here..."
                                    autoFocus
                                />
                            ) : (
                                <p className={cn(
                                    "text-3xl font-medium leading-relaxed transition-colors",
                                    isListening ? "text-text-primary" : "text-text-primary/90"
                                )}>
                                    {inputText || transcript}
                                    {isListening && <span className="inline-block w-1 h-8 ml-1 bg-primary animate-pulse translate-y-1" />}
                                </p>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Action Bar */}
            <div className="flex items-center gap-4 w-full justify-center">
                {!isListening && (inputText || manualMode) ? (
                    <div className="flex gap-4 animate-fade-up">
                        <Button
                            variant="ghost"
                            onClick={() => {
                                setInputText("");
                                setManualMode(false);
                            }}
                        >
                            <Eraser className="w-4 h-4 mr-2" />
                            Clear
                        </Button>

                        <Button
                            variant="outline"
                            onClick={() => setManualMode(!manualMode)}
                        >
                            <Pencil className="w-4 h-4 mr-2" />
                            {manualMode ? "Mic" : "Edit"}
                        </Button>

                        <Button
                            onClick={handleSubmit}
                            disabled={!inputText.trim() || isProcessing}
                            className="min-w-[140px]"
                        >
                            {isProcessing ? "Analyzing..." : "Get Triage"}
                            {!isProcessing && <ArrowRight className="w-4 h-4 ml-2" />}
                        </Button>
                    </div>
                ) : (
                    // Initial State Actions
                    !isListening && (
                        <Button
                            variant="ghost"
                            className="text-text-muted hover:text-text-primary"
                            onClick={() => setManualMode(true)}
                        >
                            Prefer to type?
                        </Button>
                    )
                )}
            </div>
        </div>
    );
}
