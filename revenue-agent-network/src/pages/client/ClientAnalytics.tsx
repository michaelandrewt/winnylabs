import { cn } from "@/lib/utils"
import {
    DollarSign,
    TrendingUp,
    Target,
    Percent,
    Download,
    FileText,
    Mail,
    ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/Button"

// Mock data
const mockData = {
    metrics: {
        closedRevenue: 87000,
        closedTrend: 23,
        pipelineAdded: 145000,
        pipelineTrend: 15,
        avgDealSize: 18000,
        dealSizeTrend: 8,
        winRate: 42,
        winRateTrend: -2,
    },
    revenueTrend: [
        { month: "Aug", closed: 45000, pipeline: 67000 },
        { month: "Sep", closed: 52000, pipeline: 78000 },
        { month: "Oct", closed: 48000, pipeline: 92000 },
        { month: "Nov", closed: 65000, pipeline: 105000 },
        { month: "Dec", closed: 72000, pipeline: 120000 },
        { month: "Jan", closed: 87000, pipeline: 145000 },
    ],
    agentPerformance: [
        { agent: "Agent-AI-01", outreach: 340, replyRate: 34, meetings: 12, pipeline: 87000, revenue: 23000 },
        { agent: "Agent-AI-02", outreach: 280, replyRate: 28, meetings: 8, pipeline: 45000, revenue: 15000 },
        { agent: "Agent-Finance-01", outreach: 210, replyRate: 24, meetings: 6, pipeline: 32000, revenue: 12000 },
        { agent: "Agent-Healthcare-01", outreach: 150, replyRate: 22, meetings: 4, pipeline: 18000, revenue: 8000 },
    ],
    topCompanies: [
        { company: "Anthropic", deals: 3, pipeline: 67000, closed: 23000, winRate: 33 },
        { company: "Mistral AI", deals: 2, pipeline: 45000, closed: 15000, winRate: 50 },
        { company: "Stripe", deals: 2, pipeline: 32000, closed: 12000, winRate: 25 },
        { company: "Cohere", deals: 1, pipeline: 18000, closed: 0, winRate: 0 },
    ],
    funnel: {
        outreach: 1240,
        reply: 385,
        meeting: 48,
        deal: 18,
    },
}

const formatCurrency = (amount: number): string => {
    if (amount >= 1000) {
        return `$${(amount / 1000).toFixed(0)}K`
    }
    return `$${amount.toLocaleString()}`
}

export function ClientAnalytics() {
    const { metrics, revenueTrend, agentPerformance, topCompanies, funnel } = mockData
    const maxRevenue = Math.max(...revenueTrend.map(d => Math.max(d.closed, d.pipeline)))

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                    <h1 className="text-xl md:text-2xl font-semibold text-[#1A1A1A] tracking-tight">
                        Analytics
                    </h1>
                    <p className="text-sm md:text-base text-[#6B6B6B]">
                        Track your revenue performance and agent metrics
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    {/* Date Range Selector */}
                    <div className="flex items-center gap-1 bg-[#F5F5F5] rounded-lg p-1">
                        {["7D", "30D", "QTR"].map((range) => (
                            <button
                                key={range}
                                className={cn(
                                    "px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
                                    range === "30D"
                                        ? "bg-white text-[#1A1A1A] shadow-sm"
                                        : "text-[#6B6B6B] hover:text-[#1A1A1A]"
                                )}
                            >
                                {range}
                            </button>
                        ))}
                        <button className="px-3 py-1.5 text-xs font-medium text-[#6B6B6B] hover:text-[#1A1A1A] flex items-center gap-1">
                            Custom <ChevronDown className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Revenue Overview Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <MetricCard
                    label="Closed Revenue"
                    value={formatCurrency(metrics.closedRevenue)}
                    trend={metrics.closedTrend}
                    positive
                />
                <MetricCard
                    label="Pipeline Added"
                    value={formatCurrency(metrics.pipelineAdded)}
                    trend={metrics.pipelineTrend}
                    positive
                />
                <MetricCard
                    label="Avg Deal Size"
                    value={formatCurrency(metrics.avgDealSize)}
                    trend={metrics.dealSizeTrend}
                    positive
                />
                <MetricCard
                    label="Win Rate"
                    value={`${metrics.winRate}%`}
                    trend={metrics.winRateTrend}
                    positive={false}
                />
            </div>

            {/* Revenue Trend Chart */}
            <div className="bg-white rounded-lg border border-[#E5E5E5] p-5">
                <h2 className="text-base font-semibold text-[#1A1A1A] mb-4">Revenue Trend</h2>
                <div className="h-48 flex items-end gap-4">
                    {revenueTrend.map((data, i) => (
                        <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                            <div className="w-full flex items-end justify-center gap-1 h-36">
                                {/* Closed bar */}
                                <div
                                    className="w-4 bg-blue-500 rounded-t transition-all duration-500"
                                    style={{ height: `${(data.closed / maxRevenue) * 100}%` }}
                                />
                                {/* Pipeline bar */}
                                <div
                                    className="w-4 bg-blue-200 rounded-t transition-all duration-500"
                                    style={{ height: `${(data.pipeline / maxRevenue) * 100}%` }}
                                />
                            </div>
                            <span className="text-xs text-[#6B6B6B]">{data.month}</span>
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded" />
                        <span className="text-xs text-[#6B6B6B]">Closed</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-200 rounded" />
                        <span className="text-xs text-[#6B6B6B]">Pipeline</span>
                    </div>
                </div>
            </div>

            {/* Agent Performance & Top Companies */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Agent Performance Table */}
                <div className="bg-white rounded-lg border border-[#E5E5E5] p-5">
                    <h2 className="text-base font-semibold text-[#1A1A1A] mb-4">Agent Performance</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left text-xs text-[#6B6B6B] border-b border-[#E5E5E5]">
                                    <th className="pb-2 font-medium">Agent</th>
                                    <th className="pb-2 font-medium">Outreach</th>
                                    <th className="pb-2 font-medium">Reply %</th>
                                    <th className="pb-2 font-medium">Revenue</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#E5E5E5]">
                                {agentPerformance.map((row) => (
                                    <tr key={row.agent}>
                                        <td className="py-3 font-medium text-[#1A1A1A]">{row.agent}</td>
                                        <td className="py-3 text-[#6B6B6B]">{row.outreach}</td>
                                        <td className="py-3 text-[#6B6B6B]">{row.replyRate}%</td>
                                        <td className="py-3 font-medium text-emerald-600">{formatCurrency(row.revenue)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button className="mt-4 text-sm text-[#6B6B6B] hover:text-[#1A1A1A]">
                        View Detailed Report →
                    </button>
                </div>

                {/* Top Companies */}
                <div className="bg-white rounded-lg border border-[#E5E5E5] p-5">
                    <h2 className="text-base font-semibold text-[#1A1A1A] mb-4">Top Performing Companies</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left text-xs text-[#6B6B6B] border-b border-[#E5E5E5]">
                                    <th className="pb-2 font-medium">Company</th>
                                    <th className="pb-2 font-medium">Deals</th>
                                    <th className="pb-2 font-medium">Pipeline</th>
                                    <th className="pb-2 font-medium">Closed</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#E5E5E5]">
                                {topCompanies.map((row) => (
                                    <tr key={row.company}>
                                        <td className="py-3 font-medium text-[#1A1A1A]">{row.company}</td>
                                        <td className="py-3 text-[#6B6B6B]">{row.deals}</td>
                                        <td className="py-3 text-[#6B6B6B]">{formatCurrency(row.pipeline)}</td>
                                        <td className="py-3 font-medium text-emerald-600">{formatCurrency(row.closed)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Conversion Funnel */}
            <div className="bg-white rounded-lg border border-[#E5E5E5] p-5">
                <h2 className="text-base font-semibold text-[#1A1A1A] mb-4">Conversion Funnel</h2>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                    {[
                        { label: "Outreach", value: funnel.outreach, color: "bg-blue-500" },
                        { label: "Reply", value: funnel.reply, rate: Math.round((funnel.reply / funnel.outreach) * 100) },
                        { label: "Meeting", value: funnel.meeting, rate: Math.round((funnel.meeting / funnel.reply) * 100) },
                        { label: "Deal", value: funnel.deal, rate: Math.round((funnel.deal / funnel.meeting) * 100) },
                    ].map((stage, i) => (
                        <div key={stage.label} className="flex items-center gap-4">
                            <div className="text-center">
                                <div
                                    className={cn(
                                        "mx-auto mb-2 rounded-lg flex items-center justify-center text-white font-semibold",
                                        "bg-gradient-to-br from-blue-500 to-indigo-600"
                                    )}
                                    style={{
                                        width: `${80 - i * 15}px`,
                                        height: `${80 - i * 15}px`,
                                    }}
                                >
                                    {stage.value.toLocaleString()}
                                </div>
                                <p className="text-sm font-medium text-[#1A1A1A]">{stage.label}</p>
                                {stage.rate && (
                                    <p className="text-xs text-[#6B6B6B]">{stage.rate}% conversion</p>
                                )}
                            </div>
                            {i < 3 && (
                                <div className="hidden md:block text-[#E5E5E5]">
                                    →
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Export Options */}
            <div className="flex flex-wrap gap-3">
                <Button variant="secondary">
                    <Download className="w-4 h-4" />
                    Export CSV
                </Button>
                <Button variant="secondary">
                    <FileText className="w-4 h-4" />
                    Export PDF Report
                </Button>
                <Button variant="secondary">
                    <Mail className="w-4 h-4" />
                    Schedule Email
                </Button>
            </div>
        </div>
    )
}

// Metric Card
interface MetricCardProps {
    label: string
    value: string
    trend: number
    positive: boolean
}

function MetricCard({ label, value, trend, positive }: MetricCardProps) {
    return (
        <div className="bg-white rounded-lg border border-[#E5E5E5] p-4">
            <p className="text-xs text-[#6B6B6B] mb-1">{label}</p>
            <div className="flex items-end justify-between">
                <p className="text-2xl font-semibold text-[#1A1A1A]">{value}</p>
                <span className={cn(
                    "flex items-center gap-0.5 text-xs font-medium",
                    positive ? "text-emerald-600" : "text-red-500"
                )}>
                    {positive ? <TrendingUp className="w-3 h-3" /> : null}
                    {trend > 0 ? "+" : ""}{trend}%
                </span>
            </div>
        </div>
    )
}
