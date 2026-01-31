"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ClipboardList, Clock, AlertTriangle, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import DashboardLayout from "@/components/layout/DashboardLayout";

interface QueueItem {
  id: string;
  patientId: string;
  summary: string;
  symptomsCount: number;
  verifiedCount: number;
  createdAt: string;
  priority: "low" | "medium" | "high";
}

/**
 * Nurse Review Queue Page
 * 
 * Shows list of pending consultations needing symptom verification.
 */
export default function ReviewQueuePage() {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "urgent">("all");

  useEffect(() => {
    // Mock queue data
    setQueue([
      {
        id: "consult-1",
        patientId: "P-2024-001",
        summary: "Headache, dizziness, mild fever reported",
        symptomsCount: 4,
        verifiedCount: 2,
        createdAt: new Date(Date.now() - 5 * 60000).toISOString(),
        priority: "medium",
      },
      {
        id: "consult-2",
        patientId: "P-2024-002",
        summary: "Chest tightness and shortness of breath",
        symptomsCount: 3,
        verifiedCount: 0,
        createdAt: new Date(Date.now() - 12 * 60000).toISOString(),
        priority: "high",
      },
      {
        id: "consult-3",
        patientId: "P-2024-003",
        summary: "Mild cough and runny nose for 2 days",
        symptomsCount: 2,
        verifiedCount: 2,
        createdAt: new Date(Date.now() - 25 * 60000).toISOString(),
        priority: "low",
      },
    ]);
  }, []);

  const filteredQueue = queue.filter((item) => {
    if (filter === "pending") return item.verifiedCount < item.symptomsCount;
    if (filter === "urgent") return item.priority === "high";
    return true;
  });

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    return `${diffHours}h ago`;
  };

  const priorityConfig = {
    low: { label: "Low", variant: "success" as const },
    medium: { label: "Medium", variant: "warning" as const },
    high: { label: "High", variant: "destructive" as const },
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen p-4 md:p-8 max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex items-center gap-4 mb-6">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Review Queue
            </h1>
            <p className="text-text-secondary text-sm">
              Consultations awaiting symptom verification
            </p>
          </div>
          <Badge variant="secondary">{queue.length} pending</Badge>
        </header>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {(["all", "pending", "urgent"] as const).map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f)}
              className="capitalize"
            >
              {f === "urgent" && <AlertTriangle className="w-3 h-3 mr-1" />}
              {f}
            </Button>
          ))}
        </div>

        {/* Queue List */}
        <div className="space-y-8">
          {filteredQueue.length === 0 ? (
            <Card className="p-12 text-center">
              <ClipboardList className="w-12 h-12 text-text-muted mx-auto mb-4" />
              <p className="text-text-secondary">No consultations in queue</p>
            </Card>
          ) : (
            filteredQueue.map((item) => {
              const config = priorityConfig[item.priority];
              const needsReview = item.verifiedCount < item.symptomsCount;

              return (
                <Link key={item.id} href={`/nurse/review/${item.id}`}>
                  <Card
                    className={cn(
                      "p-8 hover:border-primary/30 transition-colors cursor-pointer",
                      item.priority === "high" && "border-triage-red/30"
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="font-medium text-white">
                            {item.patientId}
                          </span>
                          <Badge variant={config.variant} size="sm">
                            {config.label} Priority
                          </Badge>
                          {needsReview && (
                            <Badge variant="warning" size="sm">
                              Needs Review
                            </Badge>
                          )}
                        </div>
                        <p className="text-text-secondary text-sm truncate">
                          {item.summary}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-text-muted">
                          <span className="flex items-center gap-1">
                            <ClipboardList className="w-3 h-3" />
                            {item.verifiedCount}/{item.symptomsCount} verified
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatTime(item.createdAt)}
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Review
                      </Button>
                    </div>
                  </Card>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
