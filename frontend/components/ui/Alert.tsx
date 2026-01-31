import * as React from "react";
import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "success" | "warning" | "error";
  title?: string;
  /** Set to true to hide the icon */
  hideIcon?: boolean;
}

/**
 * Alert component for displaying important messages.
 * Uses triage-appropriate colors from branding.md.
 */
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "info", title, hideIcon, children, ...props }, ref) => {
    const config = {
      info: {
        icon: Info,
        styles: "bg-primary/10 border-primary/30 text-primary",
        iconColor: "text-primary",
      },
      success: {
        icon: CheckCircle,
        styles: "bg-triage-green/10 border-triage-green/30 text-triage-green",
        iconColor: "text-triage-green",
      },
      warning: {
        icon: AlertTriangle,
        styles: "bg-triage-amber/10 border-triage-amber/30 text-triage-amber",
        iconColor: "text-triage-amber",
      },
      error: {
        icon: XCircle,
        styles: "bg-triage-red/10 border-triage-red/30 text-triage-red",
        iconColor: "text-triage-red",
      },
    };

    const { icon: Icon, styles, iconColor } = config[variant];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "relative flex gap-3 p-4 rounded-xl border",
          styles,
          className
        )}
        {...props}
      >
        {!hideIcon && (
          <Icon className={cn("h-5 w-5 flex-shrink-0 mt-0.5", iconColor)} />
        )}
        <div className="flex-1 min-w-0">
          {title && (
            <h5 className="font-semibold text-white mb-1">{title}</h5>
          )}
          <div className="text-sm text-text-secondary">{children}</div>
        </div>
      </div>
    );
  }
);
Alert.displayName = "Alert";

export { Alert };
