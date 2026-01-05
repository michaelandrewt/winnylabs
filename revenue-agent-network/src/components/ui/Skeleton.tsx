import { cn } from "@/lib/utils"

interface SkeletonProps {
    className?: string
}

export function Skeleton({ className }: SkeletonProps) {
    return (
        <div
            className={cn(
                "animate-pulse rounded-lg bg-[#E5E5E5]",
                className
            )}
        />
    )
}

export function SkeletonCard() {
    return (
        <div className="bg-white rounded-lg border border-[#E5E5E5] shadow-[0_1px_3px_rgba(0,0,0,0.08)] p-6 animate-pulse">
            <div className="flex items-start justify-between">
                <div className="space-y-3 flex-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="w-10 h-10 rounded-lg" />
            </div>
        </div>
    )
}

export function SkeletonTableRow() {
    return (
        <div className="px-6 py-4 flex items-center gap-4 animate-pulse">
            <Skeleton className="w-8 h-8 rounded-full" />
            <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-3 w-32" />
            </div>
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-4 w-20" />
        </div>
    )
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
    return (
        <div className="bg-white rounded-lg border border-[#E5E5E5] shadow-[0_1px_3px_rgba(0,0,0,0.08)] overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-[#E5E5E5] flex items-center gap-4 animate-pulse">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-24" />
            </div>
            {/* Rows */}
            <div className="divide-y divide-[#E5E5E5]">
                {Array.from({ length: rows }).map((_, i) => (
                    <SkeletonTableRow key={i} />
                ))}
            </div>
        </div>
    )
}

export function SkeletonActivityFeed({ items = 5 }: { items?: number }) {
    return (
        <div className="divide-y divide-[#E5E5E5]">
            {Array.from({ length: items }).map((_, i) => (
                <div key={i} className="px-6 py-4 flex items-start gap-4 animate-pulse">
                    <Skeleton className="w-2 h-2 rounded-full mt-2" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-48" />
                    </div>
                    <Skeleton className="h-3 w-20" />
                </div>
            ))}
        </div>
    )
}
