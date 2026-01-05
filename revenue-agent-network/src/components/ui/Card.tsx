import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface CardProps {
    children: ReactNode
    className?: string
}

export function Card({ children, className }: CardProps) {
    return (
        <div
            className={cn(
                "bg-white rounded-lg border border-[#E5E5E5] shadow-[0_1px_3px_rgba(0,0,0,0.08)]",
                className
            )}
        >
            {children}
        </div>
    )
}

interface CardHeaderProps {
    children: ReactNode
    className?: string
}

export function CardHeader({ children, className }: CardHeaderProps) {
    return (
        <div className={cn("px-6 py-5 border-b border-[#E5E5E5]", className)}>
            {children}
        </div>
    )
}

interface CardContentProps {
    children: ReactNode
    className?: string
}

export function CardContent({ children, className }: CardContentProps) {
    return <div className={cn("p-6", className)}>{children}</div>
}

interface CardTitleProps {
    children: ReactNode
    className?: string
}

export function CardTitle({ children, className }: CardTitleProps) {
    return (
        <h3
            className={cn(
                "text-sm font-medium text-[#6B6B6B] tracking-wide uppercase",
                className
            )}
        >
            {children}
        </h3>
    )
}
