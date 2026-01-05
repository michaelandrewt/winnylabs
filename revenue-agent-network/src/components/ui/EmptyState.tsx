import { cn } from "@/lib/utils"
import { type LucideIcon, Bot, Building2, Package, TrendingUp, Plus } from "lucide-react"

interface EmptyStateProps {
    icon: LucideIcon
    title: string
    description: string
    actionLabel: string
    onAction?: () => void
    className?: string
}

export function EmptyState({
    icon: Icon,
    title,
    description,
    actionLabel,
    onAction,
    className,
}: EmptyStateProps) {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center py-16 px-6 text-center",
                className
            )}
        >
            <div className="w-14 h-14 rounded-2xl bg-[#F5F5F5] flex items-center justify-center mb-4">
                <Icon className="w-7 h-7 text-[#6B6B6B]" />
            </div>
            <h3 className="text-lg font-semibold text-[#1A1A1A] mb-1">{title}</h3>
            <p className="text-sm text-[#6B6B6B] mb-6 max-w-sm">{description}</p>
            <button
                onClick={onAction}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1A1A1A] text-white text-sm font-medium rounded-lg hover:bg-[#333] transition-all duration-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] active:scale-[0.98]"
            >
                <Plus className="w-4 h-4" />
                {actionLabel}
            </button>
        </div>
    )
}

// Pre-configured empty states for common use cases
export function EmptyAgents({ onAction }: { onAction?: () => void }) {
    return (
        <EmptyState
            icon={Bot}
            title="No agents yet"
            description="Create your first AI sales agent to start automating your outreach and closing deals."
            actionLabel="Create your first agent"
            onAction={onAction}
        />
    )
}

export function EmptyCompanies({ onAction }: { onAction?: () => void }) {
    return (
        <EmptyState
            icon={Building2}
            title="No companies imported"
            description="Import your first company to start managing your portfolio and tracking performance."
            actionLabel="Import your first company"
            onAction={onAction}
        />
    )
}

export function EmptyProducts({ onAction }: { onAction?: () => void }) {
    return (
        <EmptyState
            icon={Package}
            title="No products added"
            description="Add products that your AI agents can sell to prospects."
            actionLabel="Add your first product"
            onAction={onAction}
        />
    )
}

export function EmptyPipeline({ onAction }: { onAction?: () => void }) {
    return (
        <EmptyState
            icon={TrendingUp}
            title="Pipeline is empty"
            description="Deals from your AI agents will appear here as they progress through the sales funnel."
            actionLabel="View agent activity"
            onAction={onAction}
        />
    )
}
