import Link from "next/link";
import {
  ArrowRight,
  Activity,
  Users,
  ClipboardList,
  Shield,
  Zap,
  Heart,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

/**
 * Landing Page
 * 
 * Public-facing page emphasizing trust, speed, and clinical safety.
 * Designed for calm, professional first impression per branding.md.
 */
export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-triage-green/5 pointer-events-none" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-24">
          {/* Header */}
          <header className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                <Activity className="w-6 h-6 text-primary" />
              </div>
              <span className="font-bold text-xl text-white">RuralClinic AI</span>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/sign-in">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/sign-up">
                <Button>Get Started</Button>
              </Link>
            </div>
          </header>

          {/* Hero Content */}
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-up">
            <Badge variant="secondary" className="mb-4">
              <Shield className="w-3 h-3 mr-1" />
              Clinician-Verified Triage
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                Clinical Intake
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary to-triage-green bg-clip-text text-transparent">
                at the Speed of Voice
              </span>
            </h1>

            <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              AI-assisted symptom capture with deterministic, rule-based triage.
              Designed for rural healthcare with unreliable networks and limited resources.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/intake">
                <Button size="lg" className="min-w-[200px]">
                  Start Consultation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button variant="outline" size="lg">
                  Staff Login
                </Button>
              </Link>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-text-muted">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>&lt;50ms Triage Time</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span>5-Level ESI Protocol</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Built for Rural Healthcare
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Every design decision prioritizes speed, accessibility, and clinical safety
            in low-resource environments.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Feature 1: Voice Intake */}
          <Card className="border-primary/20 hover:border-primary/40 transition-colors">
            <CardHeader>
              <div className="p-3 rounded-xl bg-primary/10 w-fit mb-2">
                <Activity className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Voice-First Intake</CardTitle>
            </CardHeader>
            <CardContent className="text-text-secondary">
              Patients describe symptoms naturally. AI normalizes free-text into
              structured clinical data for nurse review.
            </CardContent>
          </Card>

          {/* Feature 2: Nurse Review */}
          <Card className="border-triage-amber/20 hover:border-triage-amber/40 transition-colors">
            <CardHeader>
              <div className="p-3 rounded-xl bg-triage-amber/10 w-fit mb-2">
                <ClipboardList className="w-6 h-6 text-triage-amber" />
              </div>
              <CardTitle>Clinician Verification</CardTitle>
            </CardHeader>
            <CardContent className="text-text-secondary">
              Nurses verify AI-extracted symptoms with a simple checklist UI.
              Clear separation between AI suggestions and verified data.
            </CardContent>
          </Card>

          {/* Feature 3: Rule-Based Triage */}
          <Card className="border-triage-green/20 hover:border-triage-green/40 transition-colors">
            <CardHeader>
              <div className="p-3 rounded-xl bg-triage-green/10 w-fit mb-2">
                <Shield className="w-6 h-6 text-triage-green" />
              </div>
              <CardTitle>Deterministic Triage</CardTitle>
            </CardHeader>
            <CardContent className="text-text-secondary">
              5-level ESI triage using transparent rule engines. No AI black boxes.
              Full audit trails for clinical governance.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Workflow Preview */}
      <section className="bg-surface/50 border-y border-border">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Simple, Safe Workflow
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: 1,
                title: "Patient Describes",
                description: "Voice or text symptom entry",
                icon: Activity,
              },
              {
                step: 2,
                title: "AI Normalizes",
                description: "Text to structured symptoms",
                icon: Zap,
              },
              {
                step: 3,
                title: "Nurse Verifies",
                description: "Checklist verification UI",
                icon: ClipboardList,
              },
              {
                step: 4,
                title: "Rules Triage",
                description: "Deterministic 5-level result",
                icon: Shield,
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative text-center p-6 rounded-xl bg-surface border border-border"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center">
                  {item.step}
                </div>
                <item.icon className="w-8 h-8 text-primary mx-auto mb-4 mt-2" />
                <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-sm text-text-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-white mb-6">Quick Access</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Patient Intake */}
          <Link href="/intake">
            <Card className="h-full border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors group cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Activity className="w-7 h-7 text-primary" />
                  Start Triage
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-text-secondary">
                  Begin a new patient consultation using voice or text input.
                </p>
                <span className="inline-flex items-center text-primary font-medium group-hover:underline">
                  Start Now <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </CardContent>
            </Card>
          </Link>

          {/* Specialist Network */}
          <Link href="/network">
            <Card className="h-full hover:border-triage-green/30 transition-colors group cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Users className="w-7 h-7 text-triage-green" />
                  Specialist Network
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-text-secondary">
                  Connect patients with available specialists in your region.
                </p>
                <span className="inline-flex items-center text-triage-green font-medium group-hover:underline">
                  Find Specialists <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-white mb-6">Today's Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-surface/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-text-muted">
                Total Consults
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">24</div>
              <p className="text-xs text-triage-green">+12% from yesterday</p>
            </CardContent>
          </Card>

          <Card className="bg-surface/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-text-muted">
                Avg Triage Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">45ms</div>
              <p className="text-xs text-text-muted">Rule execution</p>
            </CardContent>
          </Card>

          <Card className="bg-surface/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-text-muted">
                High Priority
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-triage-red">3</div>
              <p className="text-xs text-text-muted">Levels 1-2</p>
            </CardContent>
          </Card>

          <Card className="bg-surface/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-text-muted">
                Referrals Sent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-triage-green">8</div>
              <p className="text-xs text-text-muted">To specialists</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-surface/30">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-text-muted text-sm">
              <Activity className="w-4 h-4" />
              <span>RuralClinic AI</span>
            </div>
            <p className="text-xs text-text-muted text-center">
              AI assists with text normalization only. All clinical decisions use
              deterministic rule engines verified by healthcare professionals.
            </p>
            <div className="flex items-center gap-4 text-sm text-text-muted">
              <Link href="/admin" className="hover:text-white transition-colors">
                <BarChart3 className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
