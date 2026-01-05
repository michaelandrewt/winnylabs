import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

type BadgeVariant = "default" | "success" | "warning" | "error" | "info"

interface BadgeProps {
    children: ReactNode
    variant?: BadgeVariant
    className?: string
}

const variants: Record<BadgeVariant, string> = {
    default: "bg-[#F5F5F5] text-[#6B6B6B]",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    error: "bg-red-50 text-red-700 border-red-200",
    info: "bg-blue-50 text-blue-700 border-blue-200",
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border",
                variants[variant],
                className
            )}
        >
            {children}
        </span>
    )
}
