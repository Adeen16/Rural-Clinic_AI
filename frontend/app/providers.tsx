"use client";

import { ClerkProvider } from "@clerk/nextjs";

interface ProvidersProps {
  children: React.ReactNode;
}

/**
 * Application-wide providers wrapper.
 * Configures Clerk with dark theme to match RuralClinic AI design system.
 * 
 * Note: Using inline dark theme configuration instead of @clerk/themes
 * to reduce dependencies.
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <ClerkProvider
      appearance={{
        // Dark theme configuration inline (matches branding.md)
        variables: {
          colorPrimary: "#3b82f6",
          colorBackground: "#0a0a0a",
          colorInputBackground: "#121212",
          colorInputText: "#ffffff",
          colorTextOnPrimaryBackground: "#ffffff",
          colorTextSecondary: "#a1a1aa",
          colorDanger: "#ef4444",
          colorSuccess: "#10b981",
          colorWarning: "#f59e0b",
          borderRadius: "12px",
          fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        },
        elements: {
          // Root container
          rootBox: "w-full",
          
          // Card styling
          card: "bg-[#121212] border border-[#2a2a2a] shadow-xl rounded-2xl",
          
          // Header
          headerTitle: "text-2xl font-bold text-white",
          headerSubtitle: "text-[#a1a1aa]",
          
          // Social buttons
          socialButtonsBlockButton:
            "bg-[#121212] border border-[#2a2a2a] hover:bg-[#1e1e1e] transition-colors text-white",
          socialButtonsBlockButtonText: "text-white font-medium",
          socialButtonsBlockButtonArrow: "text-[#a1a1aa]",
          
          // Form elements
          formButtonPrimary:
            "bg-[#3b82f6] hover:bg-[#2563eb] text-white font-medium h-12 rounded-xl shadow-lg",
          formFieldInput:
            "bg-[#0a0a0a] border-[#2a2a2a] text-white h-12 rounded-xl text-base placeholder:text-[#71717a] focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/20",
          formFieldLabel: "text-[#a1a1aa] text-sm font-medium",
          formFieldHintText: "text-[#71717a]",
          formFieldErrorText: "text-[#ef4444]",
          formFieldSuccessText: "text-[#10b981]",
          
          // Footer
          footerActionText: "text-[#71717a] text-sm",
          footerActionLink: "text-[#3b82f6] hover:text-[#2563eb] font-medium",
          
          // Divider
          dividerLine: "bg-[#2a2a2a]",
          dividerText: "text-[#71717a] text-xs",
          
          // Identity preview
          identityPreviewText: "text-white",
          identityPreviewEditButton: "text-[#3b82f6] hover:text-[#2563eb]",
          identityPreviewEditButtonIcon: "text-[#3b82f6]",
          
          // OTP input
          otpCodeFieldInput:
            "bg-[#0a0a0a] border-[#2a2a2a] text-white text-2xl h-14 rounded-xl focus:border-[#3b82f6]",
          
          // Resend code link
          formResendCodeLink: "text-[#3b82f6] hover:text-[#2563eb] text-sm",
          
          // Alerts
          alert: "bg-[#121212] border border-[#2a2a2a] text-white rounded-xl",
          alertText: "text-[#a1a1aa]",
          
          // User button (when signed in)
          userButtonBox: "focus:ring-2 focus:ring-[#3b82f6]/20",
          userButtonTrigger: "focus:ring-2 focus:ring-[#3b82f6]/20",
          userButtonPopoverCard: "bg-[#121212] border border-[#2a2a2a] rounded-xl",
          userButtonPopoverActionButton: "hover:bg-[#1e1e1e]",
          userButtonPopoverActionButtonText: "text-white",
          userButtonPopoverActionButtonIcon: "text-[#a1a1aa]",
          userButtonPopoverFooter: "border-t border-[#2a2a2a]",
          
          // User profile
          userPreviewMainIdentifier: "text-white",
          userPreviewSecondaryIdentifier: "text-[#a1a1aa]",
          
          // Modal overlay
          modalBackdrop: "bg-black/60 backdrop-blur-sm",
          modalContent: "bg-[#121212] border border-[#2a2a2a] rounded-2xl",
          
          // Navigation
          navbarButton: "text-[#a1a1aa] hover:text-white",
          navbarButtonIcon: "text-[#a1a1aa]",
          
          // Badge
          badge: "bg-[#3b82f6]/20 text-[#3b82f6]",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
