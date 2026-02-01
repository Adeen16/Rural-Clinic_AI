import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Users,
  ClipboardCheck,
  Shield,
  Zap,
  Heart,
  MessageCircle,
  HandHeart,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Navbar } from "@/components/layout/Navbar";



/**
 * Landing Page
 * 
 * Public-facing page emphasizing trust, warmth, and accessibility.
 * Designed for rural healthcare users with plain, reassuring language.
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex flex-col">
        {/* Background gradient - soft and welcoming */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-triage-green/5 pointer-events-none" />

        {/* Unified Navbar */}
        <Navbar />

        {/* Header Spacer for correct hero alignment */}
        <div className="pt-16" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-16 flex flex-col flex-1">

          {/* Hero Content - Centered in remaining space */}
          <div className="flex-1 flex items-center justify-center">
            <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-up">
              <Badge variant="secondary" className="mb-4">
                <Shield className="w-3 h-3 mr-1" />
                Nurse-Reviewed Health Checks
              </Badge>

              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                <span className="text-text-primary">
                  Your Health,
                </span>
                <br />
                <span className="bg-gradient-to-r from-primary to-triage-green bg-clip-text text-transparent">
                  Made Simple
                </span>
              </h1>

              <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
                Tell us how you're feeling in your own words. We'll guide you
                on what to do next and connect you with the right care.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link href="/intake">
                  <Button size="lg" className="min-w-[200px]">
                    Start Consultation
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-text-muted">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>Private & Secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  <span>Quick Results</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-primary" />
                  <span>Caring Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Healthcare That Understands You
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Every step is designed to be simple and supportive -
            because getting help shouldn't be complicated.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Feature 1: Voice Input */}
          <Card className="border-primary/20 hover:border-primary/40 transition-colors">
            <CardHeader>
              <div className="p-3 rounded-xl bg-primary/10 w-fit mb-2">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Speak or Type</CardTitle>
            </CardHeader>
            <CardContent className="text-text-secondary">
              Describe how you're feeling in your own words - no medical
              terms needed. Just tell us what's bothering you.
            </CardContent>
          </Card>

          {/* Feature 2: Nurse Review */}
          <Card className="border-triage-amber/20 hover:border-triage-amber/40 transition-colors">
            <CardHeader>
              <div className="p-3 rounded-xl bg-triage-amber/10 w-fit mb-2">
                <ClipboardCheck className="w-6 h-6 text-triage-amber" />
              </div>
              <CardTitle>Nurse Review</CardTitle>
            </CardHeader>
            <CardContent className="text-text-secondary">
              A real nurse reviews your information to ensure
              you get accurate and helpful guidance.
            </CardContent>
          </Card>

          {/* Feature 3: Clear Next Steps */}
          <Card className="border-triage-green/20 hover:border-triage-green/40 transition-colors">
            <CardHeader>
              <div className="p-3 rounded-xl bg-triage-green/10 w-fit mb-2">
                <Shield className="w-6 h-6 text-triage-green" />
              </div>
              <CardTitle>Clear Next Steps</CardTitle>
            </CardHeader>
            <CardContent className="text-text-secondary">
              Get simple advice on what to do next - whether
              it's home care tips or when to see a doctor.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Workflow Preview */}
      <section className="bg-surface border-y border-border">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              How It Works
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: 1,
                title: "Tell Us How You Feel",
                description: "Use voice or text",
                icon: MessageCircle,
              },
              {
                step: 2,
                title: "We Listen",
                description: "Your words are understood",
                icon: Heart,
              },
              {
                step: 3,
                title: "Nurse Checks",
                description: "Professional review",
                icon: ClipboardCheck,
              },
              {
                step: 4,
                title: "Get Guidance",
                description: "Clear next steps",
                icon: Shield,
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative text-center p-6 rounded-xl bg-background border border-border"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center">
                  {item.step}
                </div>
                <item.icon className="w-8 h-8 text-primary mx-auto mb-4 mt-2" />
                <h3 className="font-semibold text-text-primary mb-1">{item.title}</h3>
                <p className="text-sm text-text-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-text-primary mb-6">Get Started</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Start Health Check */}
          <Link href="/intake">
            <Card className="h-full border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors group cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Heart className="w-6 h-6 text-primary" />
                  Start Health Check
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-text-secondary text-sm">
                  Tell us how you're feeling and we'll help you figure out what to do next.
                </p>
                <span className="inline-flex items-center text-primary font-medium text-sm group-hover:underline">
                  Start Now <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </CardContent>
            </Card>
          </Link>

          {/* Find a Doctor */}
          <Link href="/network">
            <Card className="h-full border-triage-green/20 bg-triage-green/5 hover:bg-triage-green/10 transition-colors group cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Users className="w-6 h-6 text-triage-green" />
                  Find a Doctor
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-text-secondary text-sm">
                  Browse doctors in your area who can help with your health needs.
                </p>
                <span className="inline-flex items-center text-triage-green font-medium text-sm group-hover:underline">
                  Find Doctors <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </CardContent>
            </Card>
          </Link>

          {/* NGO Support */}
          <Link href="/ngo">
            <Card className="h-full border-triage-amber/20 bg-triage-amber/5 hover:bg-triage-amber/10 transition-colors group cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <HandHeart className="w-6 h-6 text-triage-amber" />
                  NGO Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-text-secondary text-sm">
                  Find NGOs that provide financial assistance for your treatment.
                </p>
                <span className="inline-flex items-center text-triage-amber font-medium text-sm group-hover:underline">
                  Get Support <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </CardContent>
            </Card>
          </Link>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-surface">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-text-muted text-sm">
              <Image
                src="/logo.png"
                alt="RuralClinic Logo"
                width={32}
                height={32}
                className="rounded-lg object-contain"
              />
              <span className="font-semibold text-primary">RuralClinic</span>
            </div>
            <p className="text-xs text-text-muted text-center max-w-md">
              Your health information is private and secure.
              All guidance is reviewed by nurses.
            </p>
            <div className="flex items-center gap-4 text-sm text-text-muted">
              <span className="text-xs">Need help? Call your local clinic</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
