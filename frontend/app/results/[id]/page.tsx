"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
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

/**
 * ESI-based 5-level triage configuration
 * Per branding.md clinical triage colors
 */
const TRIAGE_LEVELS = {
  1: {
    level: 1,
    name: "Resuscitation",
    description: "Life-threatening condition requiring immediate intervention",
    action: "Immediate medical attention required. Do not leave patient unattended.",
    icon: Heart,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500",
    glowColor: "shadow-[0_0_40px_-10px_rgba(220,38,38,0.6)]",
    badgeVariant: "destructive" as const,
  },
  2: {
    level: 2,
    name: "Emergent",
    description: "High-risk situation requiring rapid intervention",
    action: "Notify senior clinician immediately. Begin initial assessment.",
    icon: AlertTriangle,
    color: "text-triage-red",
    bgColor: "bg-triage-red/10",
    borderColor: "border-triage-red",
    glowColor: "shadow-[0_0_40px_-10px_var(--triage-red)]",
    badgeVariant: "destructive" as const,
  },
  3: {
    level: 3,
    name: "Urgent",
    description: "Multiple resources expected, stable condition",
    action: "Patient will be seen within 30 minutes. Continue monitoring.",
    icon: Clock,
    color: "text-triage-amber",
    bgColor: "bg-triage-amber/10",
    borderColor: "border-triage-amber",
    glowColor: "shadow-[0_0_40px_-10px_var(--triage-amber)]",
    badgeVariant: "warning" as const,
  },
  4: {
    level: 4,
    name: "Less Urgent",
    description: "One resource expected, non-urgent condition",
    action: "Please take a seat. You will be called when a room is available.",
    icon: Activity,
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500",
    glowColor: "shadow-[0_0_40px_-10px_rgba(34,197,94,0.5)]",
    badgeVariant: "success" as const,
  },
  5: {
    level: 5,
    name: "Non-Urgent",
    description: "No resources expected, routine care",
    action: "Please check in at the front desk for your scheduled appointment.",
    icon: CheckCircle,
    color: "text-triage-green",
    bgColor: "bg-triage-green/10",
    borderColor: "border-triage-green",
    glowColor: "shadow-[0_0_40px_-10px_var(--triage-green)]",
    badgeVariant: "success" as const,
  },
} as const;

type TriageLevel = 1 | 2 | 3 | 4 | 5;

interface TriageResultData {
  consultId: string;
  triageLevel: TriageLevel;
  verifiedSymptoms: Array<{ normalized: string; category: string }>;
  rulesTriggered: string[];
  timestamp: string;
}

/**
 * Triage Result Screen
 * 
 * Displays triage level (1-5) with non-alarming visual hierarchy.
 * No diagnosis text - only structured symptoms, priority, and next steps.
 */
export default function TriageResultPage() {
  const params = useParams();
  const router = useRouter();
  const [result, setResult] = useState<TriageResultData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const consultId = params.id as string;

    // Simulate fetching triage result
    setTimeout(() => {
      // Check sessionStorage for triage data
      const triageStored = sessionStorage.getItem(`triage-${consultId}`);
      const consultStored = sessionStorage.getItem(consultId);

      if (triageStored) {
        const triageData = JSON.parse(triageStored);
        // Determine triage level based on symptoms
        const symptoms = triageData.verifiedSymptoms || [];
        const hasCardiac = symptoms.some(
          (s: any) =>
            s.category?.toLowerCase().includes("cardio") ||
            s.normalized?.toLowerCase().includes("chest")
        );
        const hasNeuro = symptoms.some(
          (s: any) =>
            s.category?.toLowerCase().includes("neuro") ||
            s.normalized?.toLowerCase().includes("headache")
        );
        const hasFracture = symptoms.some(
          (s: any) =>
            s.normalized?.toLowerCase().includes("fracture") ||
            s.normalized?.toLowerCase().includes("trauma") ||
            s.normalized?.toLowerCase().includes("bone")
        );

        // Mock triage level determination
        let level: TriageLevel = 5;
        if (hasCardiac || hasFracture) level = 2;
        else if (hasNeuro && symptoms.length > 2) level = 3;
        else if (symptoms.length > 1) level = 4;

        setResult({
          consultId,
          triageLevel: level,
          verifiedSymptoms: symptoms,
          rulesTriggered: hasCardiac
            ? ["CARDIAC_SYMPTOM_PRESENT", "IMMEDIATE_ATTENTION"]
            : hasFracture
              ? ["POSSIBLE_FRACTURE", "IMMOBILIZE_PATIENT"]
              : hasNeuro
                ? ["NEUROLOGICAL_CLUSTER", "MONITORING_REQUIRED"]
                : ["STANDARD_ASSESSMENT"],
          timestamp: new Date().toISOString(),
        });
      } else {
        // Default mock result
        setResult({
          consultId,
          triageLevel: 3,
          verifiedSymptoms: [
            { normalized: "Persistent headache", category: "Neurological" },
            { normalized: "Intermittent dizziness", category: "Neurological" },
            { normalized: "Low-grade fever", category: "Systemic" },
          ],
          rulesTriggered: [
            "NEUROLOGICAL_CLUSTER",
            "FEVER_PRESENT",
            "MULTI_SYSTEM_INVOLVEMENT",
          ],
          timestamp: new Date().toISOString(),
        });
      }
      setIsLoading(false);
    }, 1000);
  }, [params.id]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen p-4 md:p-8 max-w-4xl mx-auto">
          <header className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 rounded-full bg-surface animate-pulse" />
            <div className="space-y-2">
              <div className="h-6 w-48 bg-surface animate-pulse rounded" />
              <div className="h-4 w-32 bg-surface animate-pulse rounded" />
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
            <AlertTriangle className="w-12 h-12 text-triage-amber mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Result Not Found</h2>
            <p className="text-text-secondary mb-6">
              The triage result could not be loaded.
            </p>
            <Link href="/intake">
              <Button>Start New Consultation</Button>
            </Link>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  const config = TRIAGE_LEVELS[result.triageLevel];
  const Icon = config.icon;


  // Specialist Mapping Configuration
  const SPECIALISTS = {
    cardio: {
      name: "Dr. Sarah Khan",
      title: "Cardiologist",
      hospital: "Memorial Hospital",
      distance: "5km",
    },
    neuro: {
      name: "Dr. Anjali Gupta",
      title: "Neurologist",
      hospital: "City Neuro Center",
      distance: "8km",
    },
    trauma: {
      name: "Dr. James Wilson",
      title: "Orthopedic Surgeon",
      hospital: "City Trauma Center",
      distance: "15km",
    },
    respiratory: {
      name: "Dr. Emily Chen",
      title: "Pulmonologist",
      hospital: "District Hospital",
      distance: "12km",
    },
    general: {
      name: "Dr. Amit Patel",
      title: "General Physician",
      hospital: "Rural Health Center",
      distance: "2km",
    },
  };

  // Determine recommended specialist based on symptoms
  const getRecommendedSpecialist = () => {
    if (!result) return null;

    // Check for high priority matches first
    if (result.rulesTriggered.some(r => r.includes("CARDIAC"))) return SPECIALISTS.cardio;
    if (result.verifiedSymptoms.some(s => s.normalized.toLowerCase().includes("fracture") || s.normalized.toLowerCase().includes("bone"))) return SPECIALISTS.trauma;
    if (result.rulesTriggered.some(r => r.includes("NEURO"))) return SPECIALISTS.neuro;
    if (result.verifiedSymptoms.some(s => s.category.toLowerCase().includes("respiratory"))) return SPECIALISTS.respiratory;

    // Default fallback
    return SPECIALISTS.general;
  };

  const specialist = getRecommendedSpecialist();

  return (
    <DashboardLayout>
      <div className="min-h-screen p-4 md:p-8 max-w-4xl mx-auto">
        {/* ... (Header and Main Triage Card remain the same) ... */}

        {/* Header */}
        <header className="flex items-center gap-4 mb-6">
          <Link href="/nurse/review">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
              <span className="sr-only">Back to review</span>
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Triage Result
            </h1>
            <p className="text-text-secondary text-sm">
              Consultation {result.consultId}
            </p>
          </div>
        </header>

        {/* Main Triage Card */}
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
                "absolute inset-0 opacity-30",
                "bg-gradient-to-br from-transparent",
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
                  <span className="text-xs text-text-muted">ESI Scale</span>
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
                  Next Step
                </h3>
                <p className="text-xl font-medium text-white">
                  {config.action}
                </p>
              </div>

              {/* Verified Symptoms Summary */}
              {result.verifiedSymptoms.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide">
                    Verified Symptoms ({result.verifiedSymptoms.length})
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
                  New Consultation
                </Button>
                <Link href={`/admin/audit/${result.consultId}`} className="sm:ml-auto">
                  <Button variant="secondary" className="w-full sm:w-auto">
                    <FileText className="w-4 h-4 mr-2" />
                    View Audit Trail
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Additional Information Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Patient Education */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" />
                Patient Guidance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-text-secondary">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-triage-green mt-0.5 flex-shrink-0" />
                  <span>Remain in the waiting area until called</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-triage-green mt-0.5 flex-shrink-0" />
                  <span>Inform staff if symptoms change or worsen</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-triage-green mt-0.5 flex-shrink-0" />
                  <span>Stay hydrated and comfortable</span>
                </li>
              </ul>
              <Alert variant="info" hideIcon className="text-sm">
                This assessment was made using clinical protocols. A healthcare
                provider will review your case.
              </Alert>
            </CardContent>
          </Card>

          {/* Specialist Referral (if needed) */}
          {result.triageLevel <= 3 && specialist && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="w-5 h-5 text-triage-green" />
                  Recommended Specialist
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-xl bg-surface-hover border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-sm text-white">
                      {specialist.name.split(" ")[1][0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white">{specialist.name}</p>
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
                    Find More Specialists
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Trust Footer */}
        <div className="mt-8 text-center space-y-2">
          <div className="inline-flex items-center gap-2 text-xs text-text-muted">
            <Shield className="w-4 h-4" />
            <span>Triage determined by rule-based clinical protocols</span>
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
