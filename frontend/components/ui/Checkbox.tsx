"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Label text displayed next to the checkbox */
  label?: string;
  /** Description text displayed below the label */
  description?: string;
  /** Error state styling */
  error?: boolean;
}

/**
 * Accessible checkbox component with large touch target (48x48px minimum).
 * Designed for clinical workflows requiring quick verification.
 */
const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, error, id, ...props }, ref) => {
    const inputId = id || React.useId();

    return (
      <label
        htmlFor={inputId}
        className={cn(
          "flex items-start gap-3 cursor-pointer select-none group",
          props.disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        {/* Custom checkbox visual */}
        <div className="relative flex items-center justify-center min-w-[48px] min-h-[48px]">
          <input
            type="checkbox"
            ref={ref}
            id={inputId}
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              "h-6 w-6 rounded-lg border-2 transition-all duration-150",
              "flex items-center justify-center",
              "border-border bg-background",
              "group-hover:border-primary/50",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-primary/30 peer-focus-visible:border-primary",
              "peer-checked:bg-primary peer-checked:border-primary",
              error && "border-triage-red"
            )}
          >
            <Check
              className={cn(
                "h-4 w-4 text-white opacity-0 scale-50 transition-all duration-150",
                "peer-checked:opacity-100 peer-checked:scale-100"
              )}
              strokeWidth={3}
            />
          </div>
        </div>

        {/* Label and description */}
        {(label || description) && (
          <div className="flex flex-col pt-3">
            {label && (
              <span className="text-base font-medium text-text-primary leading-tight">
                {label}
              </span>
            )}
            {description && (
              <span className="text-sm text-text-secondary mt-0.5">
                {description}
              </span>
            )}
          </div>
        )}
      </label>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
