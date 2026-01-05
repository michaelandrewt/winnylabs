import { forwardRef, type ButtonHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "danger"
    size?: "sm" | "md" | "lg"
    loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = "primary", size = "md", loading, disabled, className, children, ...props }, ref) => {
        const baseStyles = cn(
            "inline-flex items-center justify-center gap-2 font-medium rounded-lg",
            "transition-all duration-200 ease-in-out",
            "focus:outline-none focus:ring-2 focus:ring-offset-2",
            "active:scale-[0.98]",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
        )

        const variants = {
            primary: cn(
                "bg-[#1A1A1A] text-white",
                "hover:opacity-90 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)]",
                "focus:ring-[#1A1A1A]"
            ),
            secondary: cn(
                "bg-white text-[#1A1A1A] border border-[#E5E5E5]",
                "hover:bg-[#FAFAFA] hover:border-[#D1D1D1]",
                "focus:ring-[#E5E5E5]"
            ),
            ghost: cn(
                "bg-transparent text-[#6B6B6B]",
                "hover:bg-[#F5F5F5] hover:text-[#1A1A1A]",
                "focus:ring-[#E5E5E5]"
            ),
            danger: cn(
                "bg-red-600 text-white",
                "hover:opacity-90 hover:shadow-[0_4px_12px_rgba(220,38,38,0.25)]",
                "focus:ring-red-600"
            ),
        }

        const sizes = {
            sm: "px-3 py-2 md:py-1.5 text-xs min-h-[36px] md:min-h-0",
            md: "px-4 py-3 md:py-2.5 text-sm min-h-[44px] md:min-h-0",
            lg: "px-6 py-3.5 md:py-3 text-base min-h-[48px] md:min-h-0",
        }

        return (
            <button
                ref={ref}
                disabled={disabled || loading}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                {...props}
            >
                {loading && (
                    <svg
                        className="animate-spin h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                )}
                {children}
            </button>
        )
    }
)

Button.displayName = "Button"
