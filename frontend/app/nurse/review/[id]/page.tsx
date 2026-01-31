"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  X,
  Edit3,
  Plus,
  AlertTriangle,
  Sparkles,
  UserCheck,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Alert } from "@/components/ui/Alert";
import { Checkbox } from "@/components/ui/Checkbox";
import { SymptomListSkeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";
import DashboardLayout from "@/components/layout/DashboardLayout";

interface Symptom {
  id: string;
  original: string;
  normalized: string;
  category: string;
  confidence: number;
  verified: boolean;
}

interface ConsultationData {
  consultId: string;
  rawText: string;
  symptoms: Symptom[];
  timestamp: string;
}

/**
 * Symptom Normalization Review Page (Nurse View)
 * 
 * Displays structured JSON as human-readable checklist items.
 * Allows nurse verification/editing with clear visual separation
 * between AI extracted data and clinician verified data.
 */
export default function SymptomReviewPage() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState<ConsultationData | null>(null);
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingSymptom, setEditingSymptom] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [newSymptom, setNewSymptom] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    // Fetch consultation data
    const consultId = params.id as string;
    const stored = sessionStorage.getItem(consultId);

    if (stored) {
      const parsed = JSON.parse(stored) as ConsultationData;
      setData(parsed);
      setSymptoms(parsed.symptoms || []);
    } else {
      // Mock data for direct access
      const mockData: ConsultationData = {
        consultId,
        rawText:
          "Patient reports severe headache for 3 days, occasional dizziness, and mild fever. Also experiencing some chest tightness when breathing deeply.",
        symptoms: [
          {
            id: "1",
            original: "severe headache for 3 days",
            normalized: "Persistent headache",
            category: "Neurological",
            confidence: 0.94,
            verified: false,
          },
          {
            id: "2",
            original: "occasional dizziness",
            normalized: "Intermittent dizziness",
            category: "Neurological",
            confidence: 0.89,
            verified: false,
          },
          {
            id: "3",
            original: "mild fever",
            normalized: "Low-grade fever",
            category: "Systemic",
            confidence: 0.92,
            verified: false,
          },
          {
            id: "4",
            original: "chest tightness when breathing deeply",
            normalized: "Pleuritic chest pain",
            category: "Cardiovascular",
            confidence: 0.78,
            verified: false,
          },
        ],
        timestamp: new Date().toISOString(),
      };
      setData(mockData);
      setSymptoms(mockData.symptoms);
    }

    // Simulate loading
    setTimeout(() => setIsLoading(false), 800);
  }, [params.id]);

  // Toggle symptom verification
  const toggleVerified = (id: string) => {
    setSymptoms((prev) =>
      prev.map((s) => (s.id === id ? { ...s, verified: !s.verified } : s))
    );
  };

  // Start editing a symptom
  const startEdit = (symptom: Symptom) => {
    setEditingSymptom(symptom.id);
    setEditValue(symptom.normalized);
  };

  // Save edited symptom
  const saveEdit = (id: string) => {
    if (editValue.trim()) {
      setSymptoms((prev) =>
        prev.map((s) =>
          s.id === id ? { ...s, normalized: editValue.trim(), verified: true } : s
        )
      );
    }
    setEditingSymptom(null);
    setEditValue("");
  };

  // Remove a symptom
  const removeSymptom = (id: string) => {
    setSymptoms((prev) => prev.filter((s) => s.id !== id));
  };

  // Add new symptom
  const addSymptom = () => {
    if (newSymptom.trim()) {
      const newSym: Symptom = {
        id: `manual-${Date.now()}`,
        original: "Manually added",
        normalized: newSymptom.trim(),
        category: "General",
        confidence: 1.0,
        verified: true,
      };
      setSymptoms((prev) => [...prev, newSym]);
      setNewSymptom("");
      setShowAddForm(false);
    }
  };

  // Submit for triage
  const handleSubmitForTriage = async () => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Store verified symptoms
    const triageData = {
      consultId: data?.consultId,
      verifiedSymptoms: symptoms.filter((s) => s.verified),
      allSymptoms: symptoms,
      reviewedAt: new Date().toISOString(),
    };
    sessionStorage.setItem(`triage-${data?.consultId}`, JSON.stringify(triageData));

    router.push(`/results/${data?.consultId}`);
  };

  // Calculate stats
  const verifiedCount = symptoms.filter((s) => s.verified).length;
  const allVerified = symptoms.length > 0 && verifiedCount === symptoms.length;
  const hasLowConfidence = symptoms.some((s) => s.confidence < 0.85);

  return (
    <DashboardLayout>
      <div className="min-h-screen p-4 md:p-8 max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex items-center gap-4 mb-6">
          <Link href="/intake">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
              <span className="sr-only">Back to intake</span>
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Symptom Review
            </h1>
            <p className="text-text-secondary text-sm">
              Verify AI-extracted symptoms before triage
            </p>
          </div>
          <Badge variant={allVerified ? "success" : "secondary"}>
            {verifiedCount}/{symptoms.length} Verified
          </Badge>
        </header>

        {/* Low Confidence Warning */}
        {hasLowConfidence && !isLoading && (
          <Alert variant="warning" title="Review Required" className="mb-6">
            Some symptoms have low confidence scores. Please verify these carefully.
          </Alert>
        )}

        {/* Original Text */}
        {data && (
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-text-muted flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Original Patient Input
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-text-secondary italic">"{data.rawText}"</p>
            </CardContent>
          </Card>
        )}

        {/* Symptom List */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              Extracted Symptoms
              <Badge variant="secondary" size="sm">
                AI-Assisted
              </Badge>
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAddForm(true)}
              disabled={showAddForm}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Symptom
            </Button>
          </div>

          {isLoading ? (
            <SymptomListSkeleton count={4} />
          ) : (
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {symptoms.map((symptom) => (
                  <motion.div
                    key={symptom.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className={cn(
                      "p-4 rounded-xl border transition-all",
                      symptom.verified
                        ? "bg-triage-green/5 border-triage-green/30"
                        : "bg-surface border-border",
                      symptom.confidence < 0.85 &&
                        !symptom.verified &&
                        "border-triage-amber/50"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      {/* Verification Checkbox */}
                      <div className="pt-0.5">
                        <button
                          onClick={() => toggleVerified(symptom.id)}
                          className={cn(
                            "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
                            symptom.verified
                              ? "bg-triage-green border-triage-green text-white"
                              : "border-border hover:border-primary/50"
                          )}
                          aria-label={
                            symptom.verified ? "Mark as unverified" : "Verify symptom"
                          }
                        >
                          {symptom.verified && <Check className="w-4 h-4" />}
                        </button>
                      </div>

                      {/* Symptom Content */}
                      <div className="flex-1 min-w-0">
                        {editingSymptom === symptom.id ? (
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="flex-1 px-3 py-2 bg-background border border-primary rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                              autoFocus
                              onKeyDown={(e) => {
                                if (e.key === "Enter") saveEdit(symptom.id);
                                if (e.key === "Escape") setEditingSymptom(null);
                              }}
                            />
                            <Button
                              size="sm"
                              onClick={() => saveEdit(symptom.id)}
                            >
                              Save
                            </Button>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-medium text-white">
                                {symptom.normalized}
                              </span>
                              <Badge variant="secondary" size="sm">
                                {symptom.category}
                              </Badge>
                              {symptom.verified && (
                                <Badge variant="success" size="sm">
                                  <UserCheck className="w-3 h-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-text-muted mt-1">
                              Original: "{symptom.original}"
                            </p>
                            {symptom.confidence < 0.85 && !symptom.verified && (
                              <p className="text-xs text-triage-amber mt-1 flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" />
                                Low confidence ({Math.round(symptom.confidence * 100)}%)
                                - Please verify
                              </p>
                            )}
                          </>
                        )}
                      </div>

                      {/* Actions */}
                      {editingSymptom !== symptom.id && (
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => startEdit(symptom)}
                            aria-label="Edit symptom"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-text-muted hover:text-triage-red"
                            onClick={() => removeSymptom(symptom.id)}
                            aria-label="Remove symptom"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Add Symptom Form */}
              {showAddForm && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl border border-primary/30 bg-primary/5"
                >
                  <p className="text-sm font-medium text-white mb-2">
                    Add Missing Symptom
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSymptom}
                      onChange={(e) => setNewSymptom(e.target.value)}
                      placeholder="Enter symptom description..."
                      className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-white placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === "Enter") addSymptom();
                        if (e.key === "Escape") setShowAddForm(false);
                      }}
                    />
                    <Button onClick={addSymptom} disabled={!newSymptom.trim()}>
                      Add
                    </Button>
                    <Button variant="ghost" onClick={() => setShowAddForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </motion.div>
              )}

              {symptoms.length === 0 && !showAddForm && (
                <div className="text-center py-8 text-text-muted">
                  <p>No symptoms extracted. Add symptoms manually.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-8 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-surface border border-border" />
            <span className="text-text-muted">AI Extracted</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-triage-green/20 border border-triage-green/50" />
            <span className="text-text-muted">Clinician Verified</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-surface border-2 border-triage-amber/50" />
            <span className="text-text-muted">Needs Review</span>
          </div>
        </div>

        {/* Submit Section */}
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-semibold text-white">Ready for Triage?</h3>
              <p className="text-sm text-text-secondary">
                {allVerified
                  ? "All symptoms verified. Proceed to triage."
                  : `${symptoms.length - verifiedCount} symptom(s) need verification.`}
              </p>
            </div>
            <Button
              onClick={handleSubmitForTriage}
              disabled={symptoms.length === 0 || verifiedCount === 0 || isSubmitting}
              className="w-full sm:w-auto min-w-[180px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Run Triage
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Trust Indicator */}
        <p className="mt-6 text-center text-xs text-text-muted">
          Triage decisions are made by deterministic rule engines, not AI.
          Your verification ensures accuracy.
        </p>
      </div>
    </DashboardLayout>
  );
}
