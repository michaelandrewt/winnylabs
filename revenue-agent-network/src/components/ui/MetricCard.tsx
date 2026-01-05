import { cn } from "@/lib/utils"
import { type LucideIcon } from "lucide-react"

interface MetricCardProps {
    title: string
    value: string
    icon: LucideIcon
    trend?: {
        value: string
        positive: boolean
    }
    className?: string
}

export function MetricCard({
    title,
    value,
    icon: Icon,
    trend,
    className,
}: MetricCardProps) {
    return (
        <div
            className={cn(
                "bg-white rounded-lg border border-[#E5E5E5] shadow-[0_1px_3px_rgba(0,0,0,0.08)] p-4 md:p-6 group hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-200",
                className
            )}
        >
            <div className="flex items-start justify-between">
                <div className="space-y-2 md:space-y-3">
                    <p className="text-xs md:text-sm font-medium text-[#6B6B6B]">{title}</p>
                    <p className="text-2xl md:text-3xl font-semibold text-[#1A1A1A] tracking-tight">
                        {value}
                    </p>
                    {trend && (
                        <div className="flex items-center gap-1">
                            <span
                                className={cn(
                                    "text-sm font-medium",
                                    trend.positive ? "text-emerald-600" : "text-red-500"
                                )}
                            >
                                {trend.positive ? "↑" : "↓"} {trend.value}
                            </span>
                            <span className="text-xs text-[#6B6B6B]">vs last month</span>
                        </div>
                    )}
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#F5F5F5] flex items-center justify-center group-hover:bg-[#1A1A1A] transition-colors duration-200">
                    <Icon className="w-5 h-5 text-[#6B6B6B] group-hover:text-white transition-colors duration-200" />
                </div>
            </div>
        </div>
    )
}
