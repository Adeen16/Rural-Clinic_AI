import * as React from "react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Loader2 } from "lucide-react"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
    size?: "default" | "sm" | "lg" | "icon"
    isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", isLoading, children, ...props }, ref) => {

        const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"

        const variants = {
            default: "bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/20",
            destructive: "bg-destructive text-white hover:bg-destructive/90",
            outline: "border border-border bg-transparent text-text-primary hover:bg-surface-hover",
            secondary: "bg-surface hover:bg-surface-hover text-text-primary border border-border",
            ghost: "text-text-primary hover:bg-surface-hover",
            link: "text-primary underline-offset-4 hover:underline",
        }

        const sizes = {
            default: "h-12 px-6 py-2",
            sm: "h-9 rounded-lg px-3 text-xs",
            lg: "h-14 rounded-2xl px-10 text-base",
            icon: "h-10 w-10",
        }

        return (
            <button
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                ref={ref}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        )
    }
)
Button.displayName = "Button"

export { Button }
