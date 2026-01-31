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
 * 5-Level ESI Triage Configuration
 * Based on Emergency Severity Index protocol
 */
const TRIAGE_CONFIG = {
  1: {
    level: 1,
    name: "Resuscitation",
    description: "Life-threatening, immediate intervention required",
    icon: Heart,
    color: "text-red-500",
    borderColor: "border-red-500",
    bgColor: "bg-red-500/10",
    glowColor: "shadow-[0_0_40px_-10px_rgba(220,38,38,0.6)]",
    badgeVariant: "destructive" as const,
  },
  2: {
    level: 2,
    name: "Emergent",
    description: "High-risk, time-sensitive condition",
    icon: AlertTriangle,
    color: "text-triage-red",
    borderColor: "border-triage-red",
    bgColor: "bg-triage-red/10",
    glowColor: "shadow-[0_0_40px_-10px_var(--triage-red)]",
    badgeVariant: "destructive" as const,
  },
  3: {
    level: 3,
    name: "Urgent",
    description: "Stable, multiple resources expected",
    icon: Clock,
    color: "text-triage-amber",
    borderColor: "border-triage-amber",
    bgColor: "bg-triage-amber/10",
    glowColor: "shadow-[0_0_40px_-10px_var(--triage-amber)]",
    badgeVariant: "warning" as const,
  },
  4: {
    level: 4,
    name: "Less Urgent",
    description: "Non-urgent, one resource expected",
    icon: Activity,
    color: "text-green-400",
    borderColor: "border-green-500",
    bgColor: "bg-green-500/10",
    glowColor: "shadow-[0_0_40px_-10px_rgba(34,197,94,0.5)]",
    badgeVariant: "success" as const,
  },
  5: {
    level: 5,
    name: "Non-Urgent",
    description: "Routine care, no resources expected",
    icon: CheckCircle,
    color: "text-triage-green",
    borderColor: "border-triage-green",
    bgColor: "bg-triage-green/10",
    glowColor: "shadow-[0_0_40px_-10px_var(--triage-green)]",
    badgeVariant: "success" as const,
  },
} as const;

// Legacy support for RED/AMBER/GREEN
const LEGACY_MAPPING = {
  RED: 2,
  AMBER: 3,
  GREEN: 5,
} as const;

type TriageLevel = 1 | 2 | 3 | 4 | 5;
type LegacyPriority = "RED" | "AMBER" | "GREEN";

export interface TriageResult {
  /** ESI level (1-5) or legacy priority (RED/AMBER/GREEN) */
  priority: TriageLevel | LegacyPriority;
  /** Action instruction for patient/staff */
  action: string;
  /** AI rationale (optional, for transparency) */
  rationale?: string;
}

interface TriageCardProps {
  result: TriageResult;
  onReset: () => void;
  /** Show detailed view with rationale */
  detailed?: boolean;
}

/**
 * TriageCard Component
 *
 * Displays triage result with 5-level ESI visual hierarchy.
 * Supports legacy RED/AMBER/GREEN priorities for backward compatibility.
 * Never displays diagnosis - only symptoms, priority, and next steps.
 */
export default function TriageCard({
  result,
  onReset,
  detailed = false,
}: TriageCardProps) {
  // Convert legacy priority to ESI level
  const level: TriageLevel =
    typeof result.priority === "number"
      ? result.priority
      : LEGACY_MAPPING[result.priority];

  const config = TRIAGE_CONFIG[level];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-xl mx-auto"
    >
      <Card
        className={cn(
          "relative overflow-hidden border-2 bg-surface backdrop-blur-xl",
          config.borderColor,
          config.glowColor
        )}
      >
        {/* Background Gradient */}
        <div
          className={cn("absolute inset-0 opacity-30", config.bgColor)}
          style={{
            background: `linear-gradient(to bottom, var(--${config.bgColor.replace(
              "bg-",
              ""
            )}), transparent)`,
          }}
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
              <span className="text-xs text-text-muted">ESI</span>
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
              Next Step
            </h3>
            <p className="text-xl font-medium text-text-primary leading-relaxed">
              {result.action}
            </p>
          </div>

          {/* Rationale (only if detailed and provided) */}
          {detailed && result.rationale && (
            <div className="p-4 rounded-xl bg-surface/50 border border-border/50">
              <h4 className="text-sm font-medium text-text-muted mb-1">
                Assessment Notes
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
            New Check-in
          </Button>
          <Button
            variant="default"
            className={cn(
              "w-full bg-surface hover:bg-surface-hover text-white border",
              config.borderColor
            )}
          >
            View Details
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>

      {/* Disclaimer */}
      <p className="mt-6 text-center text-xs text-text-muted opacity-60">
        This triage level was determined by clinical rule protocols.
        <br />
        Final care decisions are made by healthcare providers.
      </p>
    </motion.div>
  );
}

export { TRIAGE_CONFIG, type TriageLevel, type LegacyPriority };
