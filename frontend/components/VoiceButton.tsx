"use client";

import { Mic } from "lucide-react";

interface VoiceButtonProps {
    onClick: () => void;
    isActive?: boolean;
    isDisabled?: boolean;
}

export default function VoiceButton({ onClick, isActive = false, isDisabled = false }: VoiceButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={isDisabled}
            className={`voice-btn ${isActive ? "active" : ""} ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
            aria-label={isActive ? "Stop listening" : "Start voice input"}
        >
            <Mic className="w-7 h-7" strokeWidth={2} />
        </button>
    );
}
