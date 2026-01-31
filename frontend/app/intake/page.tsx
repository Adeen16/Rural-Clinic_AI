"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mic, MicOff, Keyboard, Send, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Alert } from "@/components/ui/Alert";
import { VoiceHero } from "@/components/voice/VoiceHero";
import { useVoice } from "@/hooks/use-voice";
import { cn } from "@/lib/utils";
import DashboardLayout from "@/components/layout/DashboardLayout";

/**
 * Patient Intake Page
 * 
 * Features:
 * - Large, accessible text input for symptom description
 * - Voice input with visual feedback
 * - Clear processing states optimized for perceived speed
 * - Mobile-first, large touch targets
 */
export default function IntakePage() {
  const router = useRouter();
  const [inputText, setInputText] = useState("");
  const [inputMode, setInputMode] = useState<"voice" | "text">("voice");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    volume,
    isSupported,
  } = useVoice({
    onResult: (text) => setInputText(text),
    onError: () => setError("Voice input failed. Please try again or type instead."),
  });

  // Handle voice button interaction
  const handleVoiceToggle = useCallback(() => {
    setError(null);
    if (isListening) {
      stopListening();
    } else {
      startListening();
      setInputMode("voice");
    }
  }, [isListening, startListening, stopListening]);

  // Handle form submission
  const handleSubmit = async () => {
    if (!inputText.trim()) return;

    if (isListening) {
      stopListening();
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Simulate API call - in production, call actual API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generate mock consultation ID
      const consultId = `consult-${Date.now()}`;

      // Store mock result for demo
      const mockResult = {
        consultId,
        rawText: inputText,
        symptoms: extractMockSymptoms(inputText),
        timestamp: new Date().toISOString(),
      };
      sessionStorage.setItem(consultId, JSON.stringify(mockResult));

      // Navigate to nurse review page
      router.push(`/nurse/review/${consultId}`);
    } catch (err) {
      setError("Failed to process intake. Please try again.");
      setIsProcessing(false);
    }
  };

  // Mock symptom extraction for demo
  const extractMockSymptoms = (text: string) => {
    const keywords = [
      { term: "headache", normalized: "Headache", category: "neurological" },
      { term: "chest", normalized: "Chest discomfort", category: "cardiovascular" },
      { term: "fever", normalized: "Elevated temperature", category: "systemic" },
      { term: "cough", normalized: "Cough", category: "respiratory" },
      { term: "pain", normalized: "Pain", category: "general" },
      { term: "dizzy", normalized: "Dizziness", category: "neurological" },
      { term: "nausea", normalized: "Nausea", category: "gastrointestinal" },
      { term: "tired", normalized: "Fatigue", category: "systemic" },
      { term: "breath", normalized: "Shortness of breath", category: "respiratory" },
    ];

    return keywords
      .filter((k) => text.toLowerCase().includes(k.term))
      .map((k, i) => ({
        id: `sym-${i}`,
        original: k.term,
        normalized: k.normalized,
        category: k.category,
        confidence: 0.85 + Math.random() * 0.15,
        verified: false,
      }));
  };

  const hasInput = inputText.trim().length > 0;
  const currentState = isProcessing
    ? "processing"
    : isListening
      ? "listening"
      : "idle";

  return (
    <DashboardLayout>
      <div className="min-h-screen p-4 md:p-8 max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
              <span className="sr-only">Back to home</span>
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Patient Intake
            </h1>
            <p className="text-text-secondary text-sm md:text-base">
              Describe symptoms using voice or text
            </p>
          </div>
        </header>

        {/* Error Alert */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6"
            >
              <Alert variant="error" title="Input Error">
                {error}
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Input Area */}
        <Card className="p-6 md:p-8 space-y-8">
          {/* Voice Input Section */}
          {inputMode === "voice" && (
            <div className="flex flex-col items-center">
              <VoiceHero
                state={currentState}
                onClick={handleVoiceToggle}
                volume={volume}
              />

              {/* Voice Support Warning */}
              {!isSupported && (
                <p className="mt-4 text-sm text-text-muted text-center">
                  Voice input not supported in this browser. Please use text input.
                </p>
              )}
            </div>
          )}

          {/* Text Display / Input */}
          <div className="space-y-4">
            {inputMode === "text" || hasInput ? (
              <div className="space-y-2">
                <label
                  htmlFor="symptom-input"
                  className="block text-sm font-medium text-text-secondary"
                >
                  Symptom Description
                </label>
                <textarea
                  id="symptom-input"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Describe the patient's symptoms in detail..."
                  className={cn(
                    "w-full min-h-[160px] p-4 md:p-5",
                    "text-lg md:text-xl leading-relaxed",
                    "bg-background border border-border rounded-xl",
                    "text-white placeholder:text-text-muted",
                    "focus:border-primary focus:ring-2 focus:ring-primary/20",
                    "transition-all resize-none"
                  )}
                  disabled={isProcessing}
                  aria-describedby="symptom-hint"
                />
                <p id="symptom-hint" className="text-xs text-text-muted">
                  Include details like duration, severity, and related symptoms
                </p>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-xl text-text-muted">
                  {isListening ? (
                    <span className="text-primary">Listening...</span>
                  ) : (
                    '"Tap the microphone and describe symptoms"'
                  )}
                </p>
              </div>
            )}

            {/* Live Transcript Display */}
            {isListening && transcript && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-primary/5 border border-primary/20 rounded-xl"
              >
                <p className="text-sm text-text-muted mb-1">Hearing:</p>
                <p className="text-lg text-white">
                  {transcript}
                  <span className="inline-block w-0.5 h-5 ml-1 bg-primary animate-pulse" />
                </p>
              </motion.div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            {/* Toggle Input Mode */}
            <Button
              variant="outline"
              onClick={() => {
                if (isListening) stopListening();
                setInputMode(inputMode === "voice" ? "text" : "voice");
              }}
              disabled={isProcessing}
              className="sm:w-auto"
            >
              {inputMode === "voice" ? (
                <>
                  <Keyboard className="w-4 h-4 mr-2" />
                  Type Instead
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4 mr-2" />
                  Use Voice
                </>
              )}
            </Button>

            {/* Clear Button */}
            {hasInput && (
              <Button
                variant="ghost"
                onClick={() => {
                  setInputText("");
                  setError(null);
                }}
                disabled={isProcessing}
              >
                Clear
              </Button>
            )}

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={!hasInput || isProcessing}
              className="sm:ml-auto min-w-[160px]"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit for Review
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Trust Indicator */}
        <p className="mt-6 text-center text-xs text-text-muted">
          AI assists with text normalization only. All clinical decisions are made
          by healthcare professionals using rule-based protocols.
        </p>
      </div>
    </DashboardLayout>
  );
}
