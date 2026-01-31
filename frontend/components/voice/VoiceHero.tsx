import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, Square, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface VoiceHeroProps {
    state: "idle" | "listening" | "processing" | "success" | "error"
    onClick?: () => void
    volume?: number // 0-1, used for visualizing sound level
}

export function VoiceHero({ state, onClick, volume = 0 }: VoiceHeroProps) {
    // Animation variants
    const pulseVariant = {
        idle: {
            scale: [1, 1.05, 1],
            opacity: [0.5, 0.8, 0.5],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
            },
        },
        listening: {
            scale: [1, 1.2, 1],
            opacity: [1, 0.8, 1],
            transition: {
                duration: 0.5,
                repeat: Infinity,
                ease: "easeInOut",
            },
        },
        processing: {
            scale: 1,
            opacity: 1,
        }
    }

    const ringVariant = {
        idle: { scale: 1, opacity: 0 },
        listening: {
            scale: [1, 1.5, 2],
            opacity: [0.5, 0.2, 0],
            transition: { duration: 1.5, repeat: Infinity }
        }
    }

    return (
        <div className="relative flex flex-col items-center justify-center p-8">
            {/* Background Glows */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <AnimatePresence>
                    {state === "listening" && (
                        <>
                            <motion.div
                                className="absolute w-64 h-64 bg-primary/20 rounded-full blur-3xl"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1.5 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                            />
                            {/* Ripple Effect */}
                            <motion.div
                                className="absolute w-32 h-32 rounded-full border border-primary/50"
                                variants={ringVariant}
                                animate="listening"
                            />
                            <motion.div
                                className="absolute w-32 h-32 rounded-full border border-primary/30"
                                variants={ringVariant}
                                animate="listening"
                                transition={{ delay: 0.5 }}
                            />
                        </>
                    )}
                    {state === "processing" && (
                        <motion.div
                            className="absolute w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1.2 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                        />
                    )}
                </AnimatePresence>
            </div>

            {/* Main Orb */}
            <motion.button
                onClick={onClick}
                disabled={state === "processing"}
                className={cn(
                    "relative z-10 w-24 h-24 rounded-full flex items-center justify-center transition-colors duration-300 shadow-2xl",
                    state === "idle" && "bg-surface border-2 border-border hover:border-primary/50 hover:scale-105",
                    state === "listening" && "bg-primary border-4 border-primary-hover",
                    state === "processing" && "bg-surface border-2 border-purple-500",
                    state === "success" && "bg-success border-2 border-green-400",
                    state === "error" && "bg-destructive border-2 border-red-500",
                )}
                whileTap={{ scale: 0.95 }}
            >
                <AnimatePresence mode="wait">
                    {state === "idle" && (
                        <motion.div
                            key="idle"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                        >
                            <Mic className="w-10 h-10 text-text-primary" />
                        </motion.div>
                    )}
                    {state === "listening" && (
                        <motion.div
                            key="listening"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                        >
                            <Square className="w-8 h-8 text-white fill-current" />
                        </motion.div>
                    )}
                    {state === "processing" && (
                        <motion.div
                            key="processing"
                            initial={{ opacity: 0, rotate: 0 }}
                            animate={{ opacity: 1, rotate: 360 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                            <Loader2 className="w-10 h-10 text-purple-500" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Label */}
            <motion.p
                className="mt-8 text-lg font-medium tracking-wide text-text-muted"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 4, repeat: Infinity }}
            >
                {state === "idle" && "Tap to Speak"}
                {state === "listening" && <span className="text-primary">Listening...</span>}
                {state === "processing" && <span className="text-purple-400">Processing...</span>}
            </motion.p>
        </div>
    )
}
