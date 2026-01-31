import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Skeleton variant for different content types */
  variant?: "text" | "circular" | "rectangular";
  /** Width of the skeleton (supports Tailwind classes or CSS values) */
  width?: string;
  /** Height of the skeleton (supports Tailwind classes or CSS values) */
  height?: string;
}

/**
 * Skeleton loader component for perceived performance optimization.
 * Used instead of spinners per branding.md guidelines.
 * 
 * @example
 * // Text skeleton
 * <Skeleton variant="text" className="w-3/4" />
 * 
 * // Card skeleton
 * <Skeleton variant="rectangular" className="h-32 w-full" />
 * 
 * // Avatar skeleton
 * <Skeleton variant="circular" className="h-12 w-12" />
 */
export function Skeleton({
  className,
  variant = "rectangular",
  width,
  height,
  ...props
}: SkeletonProps) {
  const variants = {
    text: "h-4 rounded",
    circular: "rounded-full",
    rectangular: "rounded-xl",
  };

  return (
    <div
      className={cn(
        "animate-pulse bg-surface-hover",
        variants[variant],
        className
      )}
      style={{
        width: width,
        height: height,
      }}
      aria-hidden="true"
      {...props}
    />
  );
}

/**
 * Pre-built skeleton for card content.
 */
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("p-6 space-y-4", className)}>
      <Skeleton variant="text" className="h-6 w-1/3" />
      <Skeleton variant="text" className="h-4 w-full" />
      <Skeleton variant="text" className="h-4 w-4/5" />
      <Skeleton variant="rectangular" className="h-10 w-32 mt-4" />
    </div>
  );
}

/**
 * Pre-built skeleton for triage result.
 */
export function TriageSkeleton() {
  return (
    <div className="p-6 space-y-6 border border-border rounded-2xl bg-surface">
      <div className="flex items-center gap-4">
        <Skeleton variant="circular" className="h-14 w-14" />
        <div className="space-y-2 flex-1">
          <Skeleton variant="text" className="h-4 w-24" />
          <Skeleton variant="text" className="h-6 w-48" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton variant="text" className="h-3 w-20" />
        <Skeleton variant="text" className="h-5 w-full" />
        <Skeleton variant="text" className="h-5 w-3/4" />
      </div>
      <div className="flex gap-4">
        <Skeleton variant="rectangular" className="h-12 flex-1" />
        <Skeleton variant="rectangular" className="h-12 flex-1" />
      </div>
    </div>
  );
}

/**
 * Pre-built skeleton for symptom checklist.
 */
export function SymptomListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-4 border border-border rounded-xl">
          <Skeleton variant="rectangular" className="h-5 w-5 rounded" />
          <div className="flex-1 space-y-1">
            <Skeleton variant="text" className="h-4 w-3/4" />
            <Skeleton variant="text" className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
