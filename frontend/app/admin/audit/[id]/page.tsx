"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Clock,
  FileText,
  Cpu,
  Shield,
  GitBranch,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import DashboardLayout from "@/components/layout/DashboardLayout";

interface RuleExecution {
  ruleId: string;
  ruleName: string;
  condition: string;
  triggered: boolean;
  score: number;
  weight: number;
  timestamp: string;
}

interface AuditData {
  consultId: string;
  inputSymptoms: Array<{ normalized: string; category: string }>;
  rulesExecuted: RuleExecution[];
  finalTriageLevel: number;
  totalScore: number;
  executionTimeMs: number;
  timestamp: string;
}

/**
 * Admin Rules Confidence UI
 * 
 * Read-only visualization showing:
 * - Input symptoms
 * - Rules triggered
 * - Final triage score
 * 
 * Emphasizes determinism and explainability for clinical administrators.
 */
export default function AuditTrailPage() {
  const params = useParams();
  const [auditData, setAuditData] = useState<AuditData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedRule, setExpandedRule] = useState<string | null>(null);

  useEffect(() => {
    const consultId = params.id as string;

    // Simulate loading audit data
    setTimeout(() => {
      setAuditData({
        consultId,
        inputSymptoms: [
          { normalized: "Persistent headache", category: "Neurological" },
          { normalized: "Intermittent dizziness", category: "Neurological" },
          { normalized: "Low-grade fever", category: "Systemic" },
          { normalized: "Pleuritic chest pain", category: "Cardiovascular" },
        ],
        rulesExecuted: [
          {
            ruleId: "RULE-001",
            ruleName: "Cardiac Symptom Check",
            condition:
              "IF category == 'Cardiovascular' AND symptom CONTAINS 'chest'",
            triggered: true,
            score: 25,
            weight: 1.5,
            timestamp: new Date(Date.now() - 1000).toISOString(),
          },
          {
            ruleId: "RULE-002",
            ruleName: "Neurological Cluster Detection",
            condition:
              "IF COUNT(category == 'Neurological') >= 2",
            triggered: true,
            score: 15,
            weight: 1.2,
            timestamp: new Date(Date.now() - 950).toISOString(),
          },
          {
            ruleId: "RULE-003",
            ruleName: "Fever Present",
            condition:
              "IF symptom CONTAINS 'fever' OR symptom CONTAINS 'temperature'",
            triggered: true,
            score: 10,
            weight: 1.0,
            timestamp: new Date(Date.now() - 900).toISOString(),
          },
          {
            ruleId: "RULE-004",
            ruleName: "Multi-System Involvement",
            condition: "IF COUNT(DISTINCT category) >= 3",
            triggered: true,
            score: 20,
            weight: 1.3,
            timestamp: new Date(Date.now() - 850).toISOString(),
          },
          {
            ruleId: "RULE-005",
            ruleName: "Respiratory Distress",
            condition:
              "IF symptom CONTAINS 'breath' OR symptom CONTAINS 'respiratory'",
            triggered: false,
            score: 0,
            weight: 1.5,
            timestamp: new Date(Date.now() - 800).toISOString(),
          },
          {
            ruleId: "RULE-006",
            ruleName: "Pediatric Age Factor",
            condition: "IF patient.age < 12",
            triggered: false,
            score: 0,
            weight: 1.2,
            timestamp: new Date(Date.now() - 750).toISOString(),
          },
        ],
        finalTriageLevel: 2,
        totalScore: 70,
        executionTimeMs: 45,
        timestamp: new Date().toISOString(),
      });
      setIsLoading(false);
    }, 800);
  }, [params.id]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen p-4 md:p-8 max-w-5xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-surface rounded w-1/3" />
            <div className="h-4 bg-surface rounded w-1/4" />
            <div className="h-48 bg-surface rounded-2xl" />
            <div className="h-64 bg-surface rounded-2xl" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!auditData) {
    return (
      <DashboardLayout>
        <div className="min-h-screen p-4 md:p-8 flex items-center justify-center">
          <Card className="p-8 text-center max-w-md">
            <AlertTriangle className="w-12 h-12 text-triage-amber mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Audit Not Found</h2>
            <p className="text-text-secondary mb-6">
              The audit trail for this consultation could not be loaded.
            </p>
            <Link href="/admin">
              <Button>Back to Admin</Button>
            </Link>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  const triggeredRules = auditData.rulesExecuted.filter((r) => r.triggered);
  const skippedRules = auditData.rulesExecuted.filter((r) => !r.triggered);

  // Calculate score breakdown
  const scoreBreakdown = triggeredRules.map((r) => ({
    name: r.ruleName,
    score: r.score * r.weight,
  }));
  const maxPossibleScore = 100;
  const scorePercentage = Math.min(
    (auditData.totalScore / maxPossibleScore) * 100,
    100
  );

  return (
    <DashboardLayout>
      <div className="min-h-screen p-4 md:p-8 max-w-5xl mx-auto">
        {/* Header */}
        <header className="flex items-center gap-4 mb-6">
          <Link href="/admin">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
              <span className="sr-only">Back to admin</span>
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Audit Trail
            </h1>
            <p className="text-text-secondary text-sm">
              Consultation {auditData.consultId}
            </p>
          </div>
          <Badge variant="secondary">
            <Clock className="w-3 h-3 mr-1" />
            {auditData.executionTimeMs}ms
          </Badge>
        </header>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {/* Input Symptoms */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-text-muted flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Input Symptoms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-2">
                {auditData.inputSymptoms.length}
              </div>
              <div className="flex flex-wrap gap-1">
                {auditData.inputSymptoms.map((s, i) => (
                  <Badge key={i} variant="secondary" size="sm">
                    {s.category}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Rules Triggered */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-text-muted flex items-center gap-2">
                <GitBranch className="w-4 h-4" />
                Rules Triggered
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-2">
                {triggeredRules.length}
                <span className="text-lg text-text-muted font-normal">
                  /{auditData.rulesExecuted.length}
                </span>
              </div>
              <div className="w-full bg-surface-hover rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{
                    width: `${
                      (triggeredRules.length / auditData.rulesExecuted.length) *
                      100
                    }%`,
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Final Score */}
          <Card className="border-primary/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-text-muted flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                Triage Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary">
                  {auditData.totalScore}
                </span>
                <span className="text-text-muted">/ {maxPossibleScore}</span>
              </div>
              <Badge variant="destructive" className="mt-2">
                Level {auditData.finalTriageLevel} - Emergent
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Input Symptoms Detail */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Verified Symptoms Input
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-3">
              {auditData.inputSymptoms.map((symptom, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-surface-hover border border-border flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-medium text-white">{symptom.normalized}</p>
                    <p className="text-xs text-text-muted">{symptom.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Rules Execution Detail */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-triage-green" />
              Rule Execution Log
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Triggered Rules */}
            <div>
              <h4 className="text-sm font-semibold text-triage-green mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Triggered Rules ({triggeredRules.length})
              </h4>
              <div className="space-y-2">
                {triggeredRules.map((rule) => (
                  <div
                    key={rule.ruleId}
                    className={cn(
                      "border rounded-xl overflow-hidden transition-all",
                      "border-triage-green/30 bg-triage-green/5"
                    )}
                  >
                    <button
                      onClick={() =>
                        setExpandedRule(
                          expandedRule === rule.ruleId ? null : rule.ruleId
                        )
                      }
                      className="w-full p-4 flex items-center gap-3 text-left hover:bg-triage-green/10 transition-colors"
                    >
                      <CheckCircle2 className="w-5 h-5 text-triage-green flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-white">
                            {rule.ruleName}
                          </span>
                          <Badge variant="secondary" size="sm">
                            {rule.ruleId}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-mono text-triage-green">
                          +{(rule.score * rule.weight).toFixed(1)} pts
                        </span>
                        <ChevronRight
                          className={cn(
                            "w-4 h-4 text-text-muted transition-transform",
                            expandedRule === rule.ruleId && "rotate-90"
                          )}
                        />
                      </div>
                    </button>
                    {expandedRule === rule.ruleId && (
                      <div className="px-4 pb-4 pt-0 border-t border-triage-green/20">
                        <div className="mt-3 p-3 rounded-lg bg-background font-mono text-sm text-text-secondary">
                          {rule.condition}
                        </div>
                        <div className="mt-3 flex items-center gap-4 text-xs text-text-muted">
                          <span>Base Score: {rule.score}</span>
                          <span>Weight: {rule.weight}x</span>
                          <span>
                            Executed:{" "}
                            {new Date(rule.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Skipped Rules */}
            <div>
              <h4 className="text-sm font-semibold text-text-muted mb-3 flex items-center gap-2">
                <XCircle className="w-4 h-4" />
                Not Triggered ({skippedRules.length})
              </h4>
              <div className="space-y-2">
                {skippedRules.map((rule) => (
                  <div
                    key={rule.ruleId}
                    className="border border-border rounded-xl bg-surface/50"
                  >
                    <button
                      onClick={() =>
                        setExpandedRule(
                          expandedRule === rule.ruleId ? null : rule.ruleId
                        )
                      }
                      className="w-full p-4 flex items-center gap-3 text-left hover:bg-surface-hover transition-colors"
                    >
                      <XCircle className="w-5 h-5 text-text-muted flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-text-secondary">
                            {rule.ruleName}
                          </span>
                          <Badge variant="outline" size="sm">
                            {rule.ruleId}
                          </Badge>
                        </div>
                      </div>
                      <ChevronRight
                        className={cn(
                          "w-4 h-4 text-text-muted transition-transform",
                          expandedRule === rule.ruleId && "rotate-90"
                        )}
                      />
                    </button>
                    {expandedRule === rule.ruleId && (
                      <div className="px-4 pb-4 pt-0 border-t border-border">
                        <div className="mt-3 p-3 rounded-lg bg-background font-mono text-sm text-text-muted">
                          {rule.condition}
                        </div>
                        <p className="mt-2 text-xs text-text-muted">
                          Condition not met based on input symptoms
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Score Calculation */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Cpu className="w-5 h-5 text-primary" />
              Score Calculation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {scoreBreakdown.map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="flex-1 text-text-secondary truncate">
                    {item.name}
                  </span>
                  <span className="font-mono text-white">
                    +{item.score.toFixed(1)}
                  </span>
                </div>
              ))}
              <div className="border-t border-border pt-3 mt-3 flex items-center gap-4">
                <span className="flex-1 font-semibold text-white">
                  Total Score
                </span>
                <span className="font-mono text-xl text-primary font-bold">
                  {auditData.totalScore}
                </span>
              </div>
            </div>

            {/* Score to Triage Level Mapping */}
            <div className="mt-6 p-4 rounded-xl bg-surface-hover">
              <h4 className="text-sm font-semibold text-text-muted mb-3">
                Score to Triage Level Mapping
              </h4>
              <div className="grid grid-cols-5 gap-2 text-center text-xs">
                {[
                  { level: 5, range: "0-20", label: "Non-Urgent" },
                  { level: 4, range: "21-40", label: "Less Urgent" },
                  { level: 3, range: "41-60", label: "Urgent" },
                  { level: 2, range: "61-80", label: "Emergent" },
                  { level: 1, range: "81-100", label: "Resuscitation" },
                ].map((item) => (
                  <div
                    key={item.level}
                    className={cn(
                      "p-2 rounded-lg border",
                      auditData.finalTriageLevel === item.level
                        ? "border-primary bg-primary/10"
                        : "border-border"
                    )}
                  >
                    <div className="font-bold text-white">L{item.level}</div>
                    <div className="text-text-muted">{item.range}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trust Footer */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 text-xs text-text-muted">
            <Shield className="w-4 h-4" />
            <span>Deterministic rule engine - No AI involved in triage decision</span>
          </div>
          <p className="text-xs text-text-muted">
            Audit generated at{" "}
            {new Date(auditData.timestamp).toLocaleString()}
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
