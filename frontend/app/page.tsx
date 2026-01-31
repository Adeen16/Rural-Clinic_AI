import Link from "next/link";
import { ArrowRight, Activity, Users, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function Home() {
  return (
    <main className="min-h-screen p-6 md:p-12 max-w-7xl mx-auto flex flex-col gap-12">
      {/* Header */}
      <header className="flex flex-col gap-4 animate-fade-up">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
          RuralClinic AI
        </h1>
        <p className="text-xl text-text-secondary max-w-2xl">
          Clinical decision support at the speed of voice.
          Designed for rapid triage in low-resource environments.
        </p>
      </header>

      {/* Main Action Area */}
      <section className="grid md:grid-cols-2 gap-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>

        {/* Primary Action: New Consult */}
        <Link href="/intake" className="col-span-full md:col-span-1">
          <Card className="h-full border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors group cursor-pointer relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-3xl">
                <Activity className="w-8 h-8 text-primary" />
                Start Triage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg text-text-secondary">
                Begin a new patient consultation using voice or text. Instant assessment.
              </p>
              <Button className="w-full md:w-auto" variant="default">
                Start Consultation <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </Link>

        {/* Action: Specialist Network */}
        <Link href="/network" className="col-span-1">
          <Card className="h-full hover:border-border-light transition-colors group cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Users className="w-6 h-6 text-triage-green" />
                Specialist Network
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-text-secondary mb-6">
                Connect patients with available specialists nearby.
              </p>
              <span className="text-sm font-medium text-primary group-hover:underline underline-offset-4 flex items-center">
                Find a Doctor <ArrowRight className="ml-1 w-3 h-3" />
              </span>
            </CardContent>
          </Card>
        </Link>
      </section>

      {/* Recent Activity / Stats (Mock) */}
      <section className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
        <h2 className="text-2xl font-bold mb-6">Daily Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-surface/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-text-muted">Total Consults</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">24</div>
              <p className="text-xs text-text-secondary">+12% from yesterday</p>
            </CardContent>
          </Card>
          <Card className="bg-surface/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-text-muted">High Priority</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-triage-red">3</div>
              <p className="text-xs text-text-secondary">Requires follow-up</p>
            </CardContent>
          </Card>
          <Card className="bg-surface/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-text-muted">Referrals Sent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-triage-green">8</div>
              <p className="text-xs text-text-secondary">To network specialists</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
