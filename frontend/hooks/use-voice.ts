"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export interface UseVoiceProps {
    onResult?: (transcript: string) => void;
    onEnd?: () => void;
    onError?: (error: any) => void;
    lang?: string;
}

export function useVoice({ onResult, onEnd, onError, lang = "en-US" }: UseVoiceProps = {}) {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [volume, setVolume] = useState(0); // Mock volume for visualizer
    const recognitionRef = useRef<any>(null);
    const volumeIntervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Client-side only
        if (typeof window === "undefined") return;

        // @ts-ignore
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = lang;

            recognition.onstart = () => {
                setIsListening(true);
            };

            recognition.onend = () => {
                setIsListening(false);
                stopVolumeSimulation();
                if (onEnd) onEnd();
            };

            recognition.onresult = (event: any) => {
                let finalTranscript = "";
                let interimTranscript = "";

                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    } else {
                        interimTranscript += event.results[i][0].transcript;
                    }
                }

                const currentText = finalTranscript || interimTranscript;
                setTranscript(currentText);
                if (onResult) onResult(currentText);
            };

            recognition.onerror = (event: any) => {
                if (event.error === 'no-speech' || event.error === 'aborted') {
                    // Ignore benign errors
                    console.warn(`Speech Recognition: ${event.error} (ignored)`);
                    setIsListening(false);
                    stopVolumeSimulation();
                    return;
                }

                // transform network error to warning
                if (event.error === 'network') {
                    console.warn("Speech Recognition: Network error (check internet connection)");
                    if (onError) onError("Network error");
                    setIsListening(false);
                    stopVolumeSimulation();
                    return;
                }

                console.error("Speech Recognition Error", event.error);
                if (onError) onError(event.error);
                setIsListening(false);
                stopVolumeSimulation();
            };

            recognitionRef.current = recognition;
        } else {
            console.warn("Speech Recognition API not supported in this browser.");
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
            stopVolumeSimulation();
        };
    }, [onResult, onEnd, onError, lang]);

    const startVolumeSimulation = () => {
        if (volumeIntervalRef.current) clearInterval(volumeIntervalRef.current);
        volumeIntervalRef.current = setInterval(() => {
            setVolume(Math.random() * 0.5 + 0.3); // Random volume 0.3 - 0.8
        }, 100);
    };

    const stopVolumeSimulation = () => {
        if (volumeIntervalRef.current) clearInterval(volumeIntervalRef.current);
        setVolume(0);
    };

    const startListening = useCallback(() => {
        setTranscript("");
        if (recognitionRef.current) {
            try {
                recognitionRef.current.start();
                startVolumeSimulation();
            } catch (e) {
                console.error("Failed to start recognition", e);
            }
        } else {
            // Fallback simulation for dev environments without API
            setIsListening(true);
            startVolumeSimulation();
            setTimeout(() => {
                const mockText = "I have a severe headache and my vision is blurry.";
                setTranscript(mockText);
                if (onResult) onResult(mockText);
                setIsListening(false);
                stopVolumeSimulation();
            }, 3000);
        }
    }, [onResult]);

    const stopListening = useCallback(() => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        } else {
            setIsListening(false);
            stopVolumeSimulation();
        }
    }, []);

    const reset = useCallback(() => {
        setTranscript("");
        setIsListening(false);
        stopVolumeSimulation();
    }, []);

    const [isSupported, setIsSupported] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const isBrowserSupported = !!(window as any).SpeechRecognition || !!(window as any).webkitSpeechRecognition;
            setIsSupported(isBrowserSupported);
        }
    }, []);

    return {
        isListening,
        transcript,
        startListening,
        stopListening,
        reset,
        volume,
        isSupported
    };
}
