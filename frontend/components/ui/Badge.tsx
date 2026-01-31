import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "destructive" | "outline";
  size?: "sm" | "md" | "lg";
}

/**
 * Badge component for status indicators, labels, and tags.
 * Follows branding.md color system.
 */
const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    const variants = {
      default: "bg-primary/20 text-primary border-primary/30",
      secondary: "bg-surface text-text-secondary border-border",
      success: "bg-triage-green/20 text-triage-green border-triage-green/30",
      warning: "bg-triage-amber/20 text-triage-amber border-triage-amber/30",
      destructive: "bg-triage-red/20 text-triage-red border-triage-red/30",
      outline: "bg-transparent text-text-primary border-border",
    };

    const sizes = {
      sm: "text-xs px-2 py-0.5",
      md: "text-sm px-2.5 py-1",
      lg: "text-base px-3 py-1.5",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center font-medium rounded-lg border transition-colors",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

export { Badge };
