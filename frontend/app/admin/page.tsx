"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  FileText,
  Settings,
  Shield,
  Users,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  GitBranch,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import DashboardLayout from "@/components/layout/DashboardLayout";

/**
 * Admin Dashboard
 * 
 * Provides clinical administrators with:
 * - Overview of triage activity
 * - Rule execution statistics
 * - Access to audit trails
 * - System health indicators
 */
export default function AdminPage() {
  const [timeRange, setTimeRange] = useState<"today" | "week" | "month">("today");

  // Mock statistics
  const stats = {
    today: {
      totalConsultations: 24,
      avgTriageTime: "45ms",
      rulesTriggered: 156,
      highPriority: 3,
    },
    week: {
      totalConsultations: 168,
      avgTriageTime: "42ms",
      rulesTriggered: 1092,
      highPriority: 18,
    },
    month: {
      totalConsultations: 720,
      avgTriageTime: "44ms",
      rulesTriggered: 4680,
      highPriority: 72,
    },
  };

  const currentStats = stats[timeRange];

  // Mock recent consultations
  const recentConsultations = [
    {
      id: "consult-1",
      patientId: "P-2024-001",
      triageLevel: 2,
      rulesTriggered: 4,
      timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
    },
    {
      id: "consult-2",
      patientId: "P-2024-002",
      triageLevel: 3,
      rulesTriggered: 3,
      timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
    },
    {
      id: "consult-3",
      patientId: "P-2024-003",
      triageLevel: 5,
      rulesTriggered: 1,
      timestamp: new Date(Date.now() - 32 * 60000).toISOString(),
    },
    {
      id: "consult-4",
      patientId: "P-2024-004",
      triageLevel: 4,
      rulesTriggered: 2,
      timestamp: new Date(Date.now() - 48 * 60000).toISOString(),
    },
  ];

  // Mock rule performance
  const rulePerformance = [
    { name: "Cardiac Symptom Check", triggered: 45, accuracy: 98 },
    { name: "Neurological Cluster", triggered: 32, accuracy: 95 },
    { name: "Respiratory Distress", triggered: 28, accuracy: 97 },
    { name: "Fever Present", triggered: 67, accuracy: 99 },
    { name: "Multi-System Involvement", triggered: 23, accuracy: 94 },
  ];

  const triageLevelConfig = {
    1: { color: "text-red-500", bg: "bg-red-500/10", label: "L1" },
    2: { color: "text-triage-red", bg: "bg-triage-red/10", label: "L2" },
    3: { color: "text-triage-amber", bg: "bg-triage-amber/10", label: "L3" },
    4: { color: "text-green-400", bg: "bg-green-500/10", label: "L4" },
    5: { color: "text-triage-green", bg: "bg-triage-green/10", label: "L5" },
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    return `${diffHours}h ago`;
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Admin Dashboard
            </h1>
            <p className="text-text-secondary text-sm">
              Rule engine monitoring and audit access
            </p>
          </div>
          <div className="flex gap-2">
            {(["today", "week", "month"] as const).map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange(range)}
                className="capitalize"
              >
                {range}
              </Button>
            ))}
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-text-muted flex items-center gap-1">
                <Activity className="w-3 h-3" />
                Consultations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {currentStats.totalConsultations}
              </div>
              <p className="text-xs text-triage-green flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +12% from yesterday
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-text-muted flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Avg Triage Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {currentStats.avgTriageTime}
              </div>
              <p className="text-xs text-text-muted">Rule execution</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-text-muted flex items-center gap-1">
                <GitBranch className="w-3 h-3" />
                Rules Triggered
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {currentStats.rulesTriggered}
              </div>
              <p className="text-xs text-text-muted">
                ~{Math.round(
                  currentStats.rulesTriggered / currentStats.totalConsultations
                )}{" "}
                per consult
              </p>
            </CardContent>
          </Card>

          <Card className="border-triage-red/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-text-muted flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                High Priority
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-triage-red">
                {currentStats.highPriority}
              </div>
              <p className="text-xs text-text-muted">Level 1-2 cases</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Consultations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Recent Consultations
                </span>
                <Link href="/nurse/review">
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentConsultations.map((consult) => {
                const levelConfig =
                  triageLevelConfig[consult.triageLevel as keyof typeof triageLevelConfig];
                return (
                  <Link
                    key={consult.id}
                    href={`/admin/audit/${consult.id}`}
                    className="block"
                  >
                    <div className="p-3 rounded-xl bg-surface-hover hover:bg-surface-hover/80 border border-border hover:border-primary/30 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm",
                              levelConfig.bg,
                              levelConfig.color
                            )}
                          >
                            {levelConfig.label}
                          </div>
                          <div>
                            <p className="font-medium text-white text-sm">
                              {consult.patientId}
                            </p>
                            <p className="text-xs text-text-muted">
                              {consult.rulesTriggered} rules triggered
                            </p>
                          </div>
                        </div>
                        <span className="text-xs text-text-muted">
                          {formatTime(consult.timestamp)}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </CardContent>
          </Card>

          {/* Rule Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-triage-green" />
                Rule Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {rulePerformance.map((rule, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary truncate flex-1 mr-4">
                      {rule.name}
                    </span>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" size="sm">
                        {rule.triggered}x
                      </Badge>
                      <span className="text-triage-green text-xs font-medium w-12 text-right">
                        {rule.accuracy}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-surface-hover rounded-full h-1.5">
                    <div
                      className="bg-triage-green h-1.5 rounded-full transition-all"
                      style={{ width: `${rule.accuracy}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          <Link href="/admin/rules">
            <Card className="p-4 hover:border-primary/30 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Settings className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Rule Editor</h3>
                  <p className="text-sm text-text-muted">
                    Configure triage rules
                  </p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/admin/users">
            <Card className="p-4 hover:border-primary/30 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-triage-green/10">
                  <Users className="w-6 h-6 text-triage-green" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">User Management</h3>
                  <p className="text-sm text-text-muted">Manage staff access</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/admin/compliance">
            <Card className="p-4 hover:border-primary/30 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-triage-amber/10">
                  <Shield className="w-6 h-6 text-triage-amber" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Compliance</h3>
                  <p className="text-sm text-text-muted">Audit logs & reports</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>

        {/* Trust Footer */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-xs text-text-muted">
            <Shield className="w-4 h-4" />
            <span>
              All triage decisions use deterministic rule engines. AI is only used for
              symptom text normalization.
            </span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
