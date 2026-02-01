import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
import { Shield } from "lucide-react";

/**
 * Sign Up Page
 * 
 * Features passwordless registration via Clerk (SMS / Email OTP).
 * Emphasizes trust and simplicity with light theme.
 */
export default function SignUpPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-triage-green/5 via-transparent to-primary/5 pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-md flex flex-col items-center gap-8">
        {/* Branding Header */}
        <header className="text-center space-y-4">
          <div className="inline-flex items-center justify-center mb-2">
            <Image
              src="/logo.png"
              alt="RuralClinic Logo"
              width={80}
              height={80}
              className="rounded-2xl"
              priority
            />
          </div>
          <h1 className="text-3xl font-bold text-primary">Create Account</h1>
          <p className="text-text-secondary text-lg max-w-xs mx-auto">
            Join RuralClinic to get personalized health guidance
          </p>
        </header>

        {/* Clerk Sign Up Component */}
        <SignUp
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "bg-surface border border-border shadow-lg rounded-2xl p-0",
              headerTitle: "text-xl font-semibold text-text-primary",
              headerSubtitle: "text-text-secondary text-sm",
              socialButtonsBlockButton:
                "bg-surface hover:bg-surface-hover border border-border text-text-primary font-medium h-12 rounded-xl transition-colors",
              socialButtonsBlockButtonText: "text-text-primary",
              dividerLine: "bg-border",
              dividerText: "text-text-muted text-xs",
              formFieldLabel: "text-text-secondary text-sm font-medium",
              formFieldInput:
                "bg-background border-border text-text-primary h-12 rounded-xl text-base placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20",
              formButtonPrimary:
                "bg-primary hover:bg-primary-hover text-white font-semibold h-12 rounded-xl shadow-md transition-all",
              footerActionText: "text-text-muted text-sm",
              footerActionLink:
                "text-primary hover:text-primary-hover font-medium",
              identityPreviewText: "text-text-primary",
              identityPreviewEditButton: "text-primary hover:text-primary-hover",
              formResendCodeLink: "text-primary hover:text-primary-hover text-sm",
              otpCodeFieldInput:
                "bg-background border-border text-text-primary text-2xl h-14 rounded-xl",
              alertText: "text-text-secondary text-sm",
            },
          }}
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          forceRedirectUrl="/intake"
        />

        {/* Trust Indicators */}
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <Shield className="w-4 h-4 text-primary" />
          <span>Private, secure, and compliant with healthcare standards</span>
        </div>
      </div>
    </main>
  );
}
