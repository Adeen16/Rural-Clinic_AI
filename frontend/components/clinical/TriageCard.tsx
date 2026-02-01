"use client";

import {
  AlertTriangle,
  Clock,
  CheckCircle,
  RotateCcw,
  ArrowRight,
  Heart,
  Activity,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * 5-Level Priority Configuration
 * Human-friendly naming for patients
 */
const PRIORITY_CONFIG = {
  1: {
    level: 1,
    name: "Immediate Emergency",
    description: "You need immediate medical attention right now",
    icon: Heart,
    color: "text-red-600",
    borderColor: "border-red-500",
    bgColor: "bg-red-50",
    glowColor: "shadow-[0_0_40px_-10px_rgba(220,38,38,0.4)]",
    badgeVariant: "destructive" as const,
  },
  2: {
    level: 2,
    name: "High Priority",
    description: "You should be seen by a doctor very soon",
    icon: AlertTriangle,
    color: "text-orange-600",
    borderColor: "border-orange-500",
    bgColor: "bg-orange-50",
    glowColor: "shadow-[0_0_40px_-10px_rgba(234,88,12,0.4)]",
    badgeVariant: "destructive" as const,
  },
  3: {
    level: 3,
    name: "Moderate Priority",
    description: "You need care today, but can wait a bit",
    icon: Clock,
    color: "text-amber-600",
    borderColor: "border-amber-500",
    bgColor: "bg-amber-50",
    glowColor: "shadow-[0_0_40px_-10px_rgba(217,119,6,0.4)]",
    badgeVariant: "warning" as const,
  },
  4: {
    level: 4,
    name: "Standard Care",
    description: "You can be seen during regular hours",
    icon: Activity,
    color: "text-emerald-600",
    borderColor: "border-emerald-500",
    bgColor: "bg-emerald-50",
    glowColor: "shadow-[0_0_40px_-10px_rgba(5,150,105,0.4)]",
    badgeVariant: "success" as const,
  },
  5: {
    level: 5,
    name: "Routine Visit",
    description: "This can wait for a scheduled appointment",
    icon: CheckCircle,
    color: "text-teal-600",
    borderColor: "border-teal-500",
    bgColor: "bg-teal-50",
    glowColor: "shadow-[0_0_40px_-10px_rgba(13,148,136,0.4)]",
    badgeVariant: "success" as const,
  },
} as const;

// Legacy support for RED/AMBER/GREEN
const LEGACY_MAPPING = {
  RED: 2,
  AMBER: 3,
  GREEN: 5,
} as const;

type PriorityLevel = 1 | 2 | 3 | 4 | 5;
type LegacyPriority = "RED" | "AMBER" | "GREEN";

export interface TriageResult {
  /** Priority level (1-5) or legacy priority (RED/AMBER/GREEN) */
  priority: PriorityLevel | LegacyPriority;
  /** Action instruction for patient/staff */
  action: string;
  /** Reasoning (optional, for transparency) */
  rationale?: string;
}

interface TriageCardProps {
  result: TriageResult;
  onReset: () => void;
  /** Show detailed view with rationale */
  detailed?: boolean;
}

/**
 * Priority Card Component
 *
 * Displays health check result with 5-level visual hierarchy.
 * Uses plain, reassuring language suitable for all users.
 */
export default function TriageCard({
  result,
  onReset,
  detailed = false,
}: TriageCardProps) {
  // Convert legacy priority to level
  const level: PriorityLevel =
    typeof result.priority === "number"
      ? result.priority
      : LEGACY_MAPPING[result.priority];

  const config = PRIORITY_CONFIG[level];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-xl mx-auto"
    >
      <Card
        className={cn(
          "relative overflow-hidden border-2 bg-surface",
          config.borderColor,
          config.glowColor
        )}
      >
        {/* Background Gradient */}
        <div
          className={cn("absolute inset-0 opacity-50", config.bgColor)}
        />

        <CardHeader className="relative z-10 flex flex-row items-center gap-4 pb-2">
          {/* Icon Container */}
          <div
            className={cn(
              "p-3 rounded-xl border",
              config.bgColor,
              config.borderColor
            )}
          >
            <Icon className={cn("w-8 h-8", config.color)} />
          </div>

          {/* Level Info */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant={config.badgeVariant} size="sm">
                Level {level}
              </Badge>
              <span className="text-xs text-text-muted">Priority</span>
            </div>
            <CardTitle className="text-2xl">{config.name}</CardTitle>
          </div>
        </CardHeader>

        <CardContent className="relative z-10 pt-4 space-y-6">
          {/* Description */}
          <p className="text-text-secondary">{config.description}</p>

          {/* Action Box */}
          <div className={cn("p-4 rounded-xl", config.bgColor)}>
            <h3 className="text-sm font-medium text-text-muted uppercase tracking-wide mb-2">
              What To Do Next
            </h3>
            <p className="text-xl font-medium text-text-primary leading-relaxed">
              {result.action}
            </p>
          </div>

          {/* Rationale (only if detailed and provided) */}
          {detailed && result.rationale && (
            <div className="p-4 rounded-xl bg-surface border border-border">
              <h4 className="text-sm font-medium text-text-muted mb-1">
                Why This Recommendation
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                {result.rationale}
              </p>
            </div>
          )}
        </CardContent>

        <CardFooter className="relative z-10 gap-4 pt-2">
          <Button variant="outline" className="w-full" onClick={onReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Start Over
          </Button>
          <Button
            variant="default"
            className={cn(
              "w-full bg-surface hover:bg-surface-hover text-text-primary border",
              config.borderColor
            )}
          >
            See Details
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>

      {/* Disclaimer */}
      <p className="mt-6 text-center text-xs text-text-muted opacity-80">
        This recommendation is based on the information you provided.
        <br />
        A healthcare professional will review your case.
      </p>
    </motion.div>
  );
}

export { PRIORITY_CONFIG as TRIAGE_CONFIG, type PriorityLevel as TriageLevel, type LegacyPriority };
