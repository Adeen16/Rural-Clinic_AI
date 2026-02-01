"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  RotateCcw,
  AlertTriangle,
  Clock,
  CheckCircle,
  Heart,
  Activity,
  Shield,
  FileText,
  Users,
  Phone,
  MapPin,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Alert } from "@/components/ui/Alert";
import { TriageSkeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { DiagnosticCard } from "@/components/clinical/DiagnosticCard";
import { DietaryCard } from "@/components/clinical/DietaryCard";

/**
 * 5-level priority configuration
 * Human-friendly naming for patients
 */
const PRIORITY_LEVELS = {
  1: {
    level: 1,
    name: "Immediate Emergency",
    description: "You need immediate medical attention right now",
    action: "Please stay calm. A healthcare professional is coming to you immediately.",
    icon: Heart,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-500",
    glowColor: "shadow-[0_0_40px_-10px_rgba(220,38,38,0.4)]",
    badgeVariant: "destructive" as const,
  },
  2: {
    level: 2,
    name: "High Priority",
    description: "You should be seen by a doctor very soon",
    action: "A nurse will see you shortly. Please let us know if anything changes.",
    icon: AlertTriangle,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-500",
    glowColor: "shadow-[0_0_40px_-10px_rgba(234,88,12,0.4)]",
    badgeVariant: "destructive" as const,
  },
  3: {
    level: 3,
    name: "Moderate Priority",
    description: "You need care today, but can wait a bit",
    action: "Please take a seat. You will be seen within 30 minutes.",
    icon: Clock,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-500",
    glowColor: "shadow-[0_0_40px_-10px_rgba(217,119,6,0.4)]",
    badgeVariant: "warning" as const,
  },
  4: {
    level: 4,
    name: "Standard Care",
    description: "You can be seen during regular hours",
    action: "Please take a seat. You will be called when a room is available.",
    icon: Activity,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-500",
    glowColor: "shadow-[0_0_40px_-10px_rgba(5,150,105,0.4)]",
    badgeVariant: "success" as const,
  },
  5: {
    level: 5,
    name: "Routine Visit",
    description: "This can wait for a scheduled appointment",
    action: "Please check in at the front desk for your appointment.",
    icon: CheckCircle,
    color: "text-teal-600",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-500",
    glowColor: "shadow-[0_0_40px_-10px_rgba(13,148,136,0.4)]",
    badgeVariant: "success" as const,
  },
} as const;

type PriorityLevel = 1 | 2 | 3 | 4 | 5;

interface ResultData {
  consultId: string;
  triageLevel: PriorityLevel;
  verifiedSymptoms: Array<{ normalized: string; category: string }>;
  rulesTriggered: string[];
  diagnosis?: any;
  timestamp: string;
}

/**
 * Health Check Result Screen
 * 
 * Displays priority level (1-5) with reassuring, non-alarming visuals.
 * Uses plain language suitable for all patients.
 */
export default function HealthCheckResultPage() {
  const params = useParams();
  const router = useRouter();
  const [result, setResult] = useState<ResultData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const consultId = params.id as string;

    // Simulate fetching result (or reading from storage)
    setTimeout(() => {
      const stored = sessionStorage.getItem(`triage-${consultId}`);

      if (stored) {
        const data = JSON.parse(stored);
        setResult(data);
      } else {
        setResult(null);
      }
      setIsLoading(false);
    }, 500);
  }, [params.id]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen p-4 md:p-8 max-w-4xl mx-auto">
          <header className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 rounded-full bg-surface-hover animate-pulse" />
            <div className="space-y-2">
              <div className="h-6 w-48 bg-surface-hover animate-pulse rounded" />
              <div className="h-4 w-32 bg-surface-hover animate-pulse rounded" />
            </div>
          </header>
          <TriageSkeleton />
        </div>
      </DashboardLayout>
    );
  }

  if (!result) {
    return (
      <DashboardLayout>
        <div className="min-h-screen p-4 md:p-8 flex items-center justify-center">
          <Card className="p-8 text-center max-w-md">
            <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-text-primary mb-2">Result Not Found</h2>
            <p className="text-text-secondary mb-6">
              We couldn't find your health check result. Would you like to start a new one?
            </p>
            <Link href="/intake">
              <Button>Start New Health Check</Button>
            </Link>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  const config = PRIORITY_LEVELS[result.triageLevel];
  const Icon = config.icon;


  // Specialist Mapping Configuration
  const SPECIALISTS = {
    cardio: {
      name: "Dr. Sarah Khan",
      title: "Heart Specialist",
      hospital: "Memorial Hospital",
      distance: "5km",
    },
    neuro: {
      name: "Dr. Anjali Gupta",
      title: "Brain & Nerve Specialist",
      hospital: "City Neuro Center",
      distance: "8km",
    },
    trauma: {
      name: "Dr. James Wilson",
      title: "Bone & Joint Specialist",
      hospital: "City Trauma Center",
      distance: "15km",
    },
    respiratory: {
      name: "Dr. Emily Chen",
      title: "Breathing Specialist",
      hospital: "District Hospital",
      distance: "12km",
    },
    general: {
      name: "Dr. Amit Patel",
      title: "Family Doctor",
      hospital: "Rural Health Center",
      distance: "2km",
    },
  };

  // Determine recommended specialist based on symptoms
  const getRecommendedSpecialist = () => {
    if (!result) return null;

    if (result.rulesTriggered.some(r => r.includes("CARDIAC"))) return SPECIALISTS.cardio;
    if (result.verifiedSymptoms.some(s => s.normalized.toLowerCase().includes("fracture") || s.normalized.toLowerCase().includes("bone"))) return SPECIALISTS.trauma;
    if (result.rulesTriggered.some(r => r.includes("NEURO"))) return SPECIALISTS.neuro;
    if (result.verifiedSymptoms.some(s => s.category.toLowerCase().includes("respiratory"))) return SPECIALISTS.respiratory;

    return SPECIALISTS.general;
  };

  const specialist = getRecommendedSpecialist();

  return (
    <DashboardLayout>
      <div className="min-h-screen p-4 md:p-8 max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex items-center gap-4 mb-6">
          <Link href="/nurse/review">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
              <span className="sr-only">Go back</span>
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary">
              Your Health Check Result
            </h1>
            <p className="text-text-secondary text-sm">
              Reference: {result.consultId}
            </p>
          </div>
        </header>

        {/* Main Priority Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card
            className={cn(
              "relative overflow-hidden border-2 mb-8",
              config.borderColor,
              config.glowColor
            )}
          >
            {/* Background gradient */}
            <div
              className={cn(
                "absolute inset-0 opacity-50",
                config.bgColor
              )}
            />

            <CardHeader className="relative z-10 flex flex-row items-center gap-4 pb-4">
              {/* Icon Container */}
              <div
                className={cn(
                  "p-4 rounded-2xl border-2",
                  config.bgColor,
                  config.borderColor
                )}
              >
                <Icon className={cn("w-10 h-10", config.color)} />
              </div>

              {/* Level Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={config.badgeVariant}>
                    Level {config.level}
                  </Badge>
                  <span className="text-xs text-text-muted">Priority</span>
                </div>
                <CardTitle className="text-2xl md:text-3xl">
                  {config.name}
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent className="relative z-10 space-y-6">
              {/* Description */}
              <p className="text-text-secondary text-lg">
                {config.description}
              </p>

              {/* Action Box */}
              <div className={cn("p-4 rounded-xl", config.bgColor)}>
                <h3 className="text-sm font-semibold text-text-muted mb-2 uppercase tracking-wide">
                  What Happens Next
                </h3>
                <p className="text-xl font-medium text-text-primary">
                  {config.action}
                </p>
              </div>

              {/* Verified Symptoms Summary */}
              {result.verifiedSymptoms.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide">
                    What You Told Us ({result.verifiedSymptoms.length})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.verifiedSymptoms.map((symptom, i) => (
                      <Badge key={i} variant="secondary">
                        {symptom.normalized}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => router.push("/intake")}
                  className="sm:w-auto"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Start New Check
                </Button>
                <Link href={`/admin/audit/${result.consultId}`} className="sm:ml-auto">
                  <Button variant="secondary" className="w-full sm:w-auto">
                    <FileText className="w-4 h-4 mr-2" />
                    View Full Details
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Health Information Card */}
        {result.diagnosis && (
          <div className="space-y-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <DiagnosticCard diagnosis={result.diagnosis} />
            </motion.div>

            {/* Care Recommendations */}
            {result.diagnosis.dietary_advice && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <DietaryCard advice={result.diagnosis.dietary_advice} />
              </motion.div>
            )}
          </div>
        )}

        {/* Additional Information Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* What To Do While Waiting */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" />
                While You Wait
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-text-secondary">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-triage-green mt-0.5 flex-shrink-0" />
                  <span>Stay in the waiting area until called</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-triage-green mt-0.5 flex-shrink-0" />
                  <span>Tell staff if you feel worse or symptoms change</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-triage-green mt-0.5 flex-shrink-0" />
                  <span>Drink water and stay comfortable</span>
                </li>
              </ul>
              <Alert variant="info" hideIcon className="text-sm">
                This recommendation is based on what you told us. A healthcare
                professional will review your case personally.
              </Alert>
            </CardContent>
          </Card>

          {/* Specialist Referral (if needed) */}
          {result.triageLevel <= 3 && specialist && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="w-5 h-5 text-triage-green" />
                  Recommended Doctor
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-xl bg-surface-hover border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-sm text-primary">
                      {specialist.name.split(" ")[1][0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-text-primary">{specialist.name}</p>
                      <p className="text-sm text-primary">{specialist.title}</p>
                      <p className="text-xs text-text-muted flex items-center mt-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        {specialist.hospital} - {specialist.distance}
                      </p>
                    </div>
                  </div>
                </div>
                <Link href="/network">
                  <Button className="w-full" variant="outline">
                    <Phone className="w-4 h-4 mr-2" />
                    Find More Doctors
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Trust Footer */}
        <div className="mt-8 text-center space-y-2">
          <div className="inline-flex items-center gap-2 text-xs text-text-muted">
            <Shield className="w-4 h-4 text-primary" />
            <span>Your information is kept private and secure</span>
          </div>
          <p className="text-xs text-text-muted">
            Result generated at{" "}
            {new Date(result.timestamp).toLocaleString()}
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
