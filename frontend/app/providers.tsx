"use client";

import { ClerkProvider } from "@clerk/nextjs";

interface ProvidersProps {
  children: React.ReactNode;
}

/**
 * Application-wide providers wrapper.
 * Configures Clerk with light theme to match RuralClinic design system.
 * Healthcare-friendly blue and green accents.
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <ClerkProvider
      appearance={{
        // Light theme configuration (healthcare-friendly)
        variables: {
          colorPrimary: "#2563eb",
          colorBackground: "#ffffff",
          colorInputBackground: "#f8fafc",
          colorInputText: "#1e293b",
          colorTextOnPrimaryBackground: "#ffffff",
          colorTextSecondary: "#475569",
          colorDanger: "#dc2626",
          colorSuccess: "#059669",
          colorWarning: "#d97706",
          borderRadius: "12px",
          fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        },
        elements: {
          // Root container
          rootBox: "w-full",
          
          // Card styling - Light theme
          card: "bg-white border border-[#e2e8f0] shadow-lg rounded-2xl",
          
          // Header
          headerTitle: "text-2xl font-bold text-[#1e293b]",
          headerSubtitle: "text-[#475569]",
          
          // Social buttons
          socialButtonsBlockButton:
            "bg-white border border-[#e2e8f0] hover:bg-[#f1f5f9] transition-colors text-[#1e293b]",
          socialButtonsBlockButtonText: "text-[#1e293b] font-medium",
          socialButtonsBlockButtonArrow: "text-[#475569]",
          
          // Form elements
          formButtonPrimary:
            "bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium h-12 rounded-xl shadow-md",
          formFieldInput:
            "bg-[#f8fafc] border-[#e2e8f0] text-[#1e293b] h-12 rounded-xl text-base placeholder:text-[#64748b] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20",
          formFieldLabel: "text-[#475569] text-sm font-medium",
          formFieldHintText: "text-[#64748b]",
          formFieldErrorText: "text-[#dc2626]",
          formFieldSuccessText: "text-[#059669]",
          
          // Footer
          footerActionText: "text-[#64748b] text-sm",
          footerActionLink: "text-[#2563eb] hover:text-[#1d4ed8] font-medium",
          
          // Divider
          dividerLine: "bg-[#e2e8f0]",
          dividerText: "text-[#64748b] text-xs",
          
          // Identity preview
          identityPreviewText: "text-[#1e293b]",
          identityPreviewEditButton: "text-[#2563eb] hover:text-[#1d4ed8]",
          identityPreviewEditButtonIcon: "text-[#2563eb]",
          
          // OTP input
          otpCodeFieldInput:
            "bg-[#f8fafc] border-[#e2e8f0] text-[#1e293b] text-2xl h-14 rounded-xl focus:border-[#2563eb]",
          
          // Resend code link
          formResendCodeLink: "text-[#2563eb] hover:text-[#1d4ed8] text-sm",
          
          // Alerts
          alert: "bg-[#f8fafc] border border-[#e2e8f0] text-[#1e293b] rounded-xl",
          alertText: "text-[#475569]",
          
          // User button (when signed in)
          userButtonBox: "focus:ring-2 focus:ring-[#2563eb]/20",
          userButtonTrigger: "focus:ring-2 focus:ring-[#2563eb]/20",
          userButtonPopoverCard: "bg-white border border-[#e2e8f0] rounded-xl shadow-lg",
          userButtonPopoverActionButton: "hover:bg-[#f1f5f9]",
          userButtonPopoverActionButtonText: "text-[#1e293b]",
          userButtonPopoverActionButtonIcon: "text-[#475569]",
          userButtonPopoverFooter: "border-t border-[#e2e8f0]",
          
          // User profile
          userPreviewMainIdentifier: "text-[#1e293b]",
          userPreviewSecondaryIdentifier: "text-[#475569]",
          
          // Modal overlay
          modalBackdrop: "bg-black/40 backdrop-blur-sm",
          modalContent: "bg-white border border-[#e2e8f0] rounded-2xl shadow-xl",
          
          // Navigation
          navbarButton: "text-[#475569] hover:text-[#1e293b]",
          navbarButtonIcon: "text-[#475569]",
          
          // Badge
          badge: "bg-[#2563eb]/10 text-[#2563eb]",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
