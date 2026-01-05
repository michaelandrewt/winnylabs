import { cn } from "@/lib/utils"
import {
    Bot,
    DollarSign,
    Calendar,
    MessageSquare,
    TrendingUp,
    ArrowUpRight,
    Clock,
    ChevronRight,
    Plus,
    Upload,
    Building2,
} from "lucide-react"
import { Button } from "@/components/ui/Button"

// Mock data
const mockData = {
    user: {
        name: "Michael",
    },
    metrics: {
        activeAgents: 8,
        pipelineValue: 145000,
        meetingsThisWeek: 12,
        replyRate: 32,
    },
    recentActivity: [
        { id: 1, message: "Agent-AI-03 closed $12K deal with Anthropic", time: "2h ago" },
        { id: 2, message: "Agent-Finance-01 booked 3 meetings at Stripe", time: "5h ago" },
        { id: 3, message: "Agent-AI-01 sent 45 outreach emails", time: "8h ago" },
        { id: 4, message: "New lead from Mistral AI qualified", time: "12h ago" },
        { id: 5, message: "Agent-Healthcare-01 completed training", time: "1d ago" },
    ],
    activeDeals: [
        {
            id: 1,
            company: "Anthropic",
            value: 23000,
            stage: "Negotiation",
            agent: "Agent-AI-01",
            closeDate: "Feb 5, 2025",
            progress: 85,
        },
        {
            id: 2,
            company: "Mistral AI",
            value: 45000,
            stage: "Demo",
            agent: "Agent-AI-02",
            closeDate: "Feb 12, 2025",
            progress: 45,
        },
        {
            id: 3,
            company: "Cohere",
            value: 18000,
            stage: "Proposal",
            agent: "Agent-AI-01",
            closeDate: "Feb 8, 2025",
            progress: 65,
        },
    ],
    agentPerformance: [
        { name: "Agent-AI-01", revenue: 87000 },
        { name: "Agent-AI-02", revenue: 45000 },
        { name: "Agent-Finance-01", revenue: 32000 },
        { name: "Agent-Healthcare-01", revenue: 18000 },
    ],
}

const formatCurrency = (amount: number): string => {
    if (amount >= 1000) {
        return `$${(amount / 1000).toFixed(0)}K`
    }
    return `$${amount.toLocaleString()}`
}

const getTimeOfDay = (): string => {
    const hour = new Date().getHours()
    if (hour < 12) return "morning"
    if (hour < 17) return "afternoon"
    return "evening"
}

const stageBadgeColors: Record<string, string> = {
    Discovery: "bg-gray-100 text-gray-700",
    Demo: "bg-amber-100 text-amber-700",
    Proposal: "bg-blue-100 text-blue-700",
    Negotiation: "bg-emerald-100 text-emerald-700",
}

export function ClientDashboard() {
    const { user, metrics, recentActivity, activeDeals, agentPerformance } = mockData
    const maxRevenue = Math.max(...agentPerformance.map(a => a.revenue))

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Welcome Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-xl md:text-2xl font-semibold text-[#1A1A1A] tracking-tight">
                        Good {getTimeOfDay()}, {user.name}
                    </h1>
                    <p className="text-sm md:text-base text-[#6B6B6B]">
                        Here's your revenue portfolio at a glance
                    </p>
                </div>
                <p className="text-xs text-[#6B6B6B] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Last updated: 2m ago
                </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <MetricCard
                    icon={Bot}
                    label="Active Agents"
                    value={metrics.activeAgents.toString()}
                    trend="+2"
                    trendPositive
                />
                <MetricCard
                    icon={DollarSign}
                    label="Pipeline Value"
                    value={formatCurrency(metrics.pipelineValue)}
                    trend="+23%"
                    trendPositive
                />
                <MetricCard
                    icon={Calendar}
                    label="Meetings This Week"
                    value={metrics.meetingsThisWeek.toString()}
                    trend="+5"
                    trendPositive
                />
                <MetricCard
                    icon={MessageSquare}
                    label="Reply Rate"
                    value={`${metrics.replyRate}%`}
                    trend="+8%"
                    trendPositive
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <div className="bg-white rounded-lg border border-[#E5E5E5] p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-base font-semibold text-[#1A1A1A]">Recent Activity</h2>
                        <button className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] flex items-center gap-1 transition-colors">
                            View All <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                    <ul className="space-y-3">
                        {recentActivity.map((activity) => (
                            <li key={activity.id} className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-[#1A1A1A]">{activity.message}</p>
                                    <p className="text-xs text-[#6B6B6B]">{activity.time}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Agent Performance */}
                <div className="bg-white rounded-lg border border-[#E5E5E5] p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-base font-semibold text-[#1A1A1A]">Your Agents Performance</h2>
                        <button className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] flex items-center gap-1 transition-colors">
                            View Analytics <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="space-y-4">
                        {agentPerformance.map((agent) => (
                            <div key={agent.name} className="space-y-1.5">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-[#1A1A1A] font-medium">{agent.name}</span>
                                    <span className="text-[#6B6B6B]">{formatCurrency(agent.revenue)}</span>
                                </div>
                                <div className="h-2 bg-[#F5F5F5] rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                                        style={{ width: `${(agent.revenue / maxRevenue) * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Active Deals */}
            <div className="bg-white rounded-lg border border-[#E5E5E5] p-5">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-semibold text-[#1A1A1A]">Active Deals</h2>
                    <button className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] flex items-center gap-1 transition-colors">
                        View Pipeline <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
                <div className="space-y-4">
                    {activeDeals.map((deal) => (
                        <div
                            key={deal.id}
                            className="p-4 rounded-lg border border-[#E5E5E5] hover:border-[#1A1A1A] transition-colors cursor-pointer"
                        >
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-[#F5F5F5] flex items-center justify-center flex-shrink-0">
                                        <Building2 className="w-5 h-5 text-[#6B6B6B]" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-base font-semibold text-[#1A1A1A]">{deal.company}</h3>
                                            <span className={cn(
                                                "px-2 py-0.5 rounded-full text-xs font-medium",
                                                stageBadgeColors[deal.stage] || "bg-gray-100 text-gray-700"
                                            )}>
                                                {deal.stage}
                                            </span>
                                        </div>
                                        <p className="text-sm text-[#6B6B6B]">
                                            {deal.agent} • Close: {deal.closeDate}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 md:gap-6">
                                    <div className="text-right">
                                        <p className="text-lg font-semibold text-[#1A1A1A]">{formatCurrency(deal.value)}</p>
                                        <p className="text-xs text-[#6B6B6B]">{deal.progress}% probability</p>
                                    </div>
                                    <div className="w-24 hidden md:block">
                                        <div className="h-1.5 bg-[#F5F5F5] rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-emerald-500 rounded-full"
                                                style={{ width: `${deal.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg border border-[#E5E5E5] p-5">
                <h2 className="text-base font-semibold text-[#1A1A1A] mb-4">Quick Actions</h2>
                <div className="flex flex-wrap gap-3">
                    <Button variant="secondary" size="sm">
                        <Building2 className="w-4 h-4" />
                        Add Company
                    </Button>
                    <Button variant="secondary" size="sm">
                        <Bot className="w-4 h-4" />
                        Create Agent
                    </Button>
                    <Button variant="secondary" size="sm">
                        <Upload className="w-4 h-4" />
                        Upload Product
                    </Button>
                </div>
            </div>
        </div>
    )
}

// Metric Card Component
interface MetricCardProps {
    icon: React.ElementType
    label: string
    value: string
    trend?: string
    trendPositive?: boolean
}

function MetricCard({ icon: Icon, label, value, trend, trendPositive }: MetricCardProps) {
    return (
        <div className={cn(
            "bg-white rounded-lg border border-[#E5E5E5] p-4 md:p-5",
            "hover:shadow-sm transition-shadow"
        )}>
            <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#F5F5F5] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#6B6B6B]" />
                </div>
                {trend && (
                    <span className={cn(
                        "flex items-center gap-0.5 text-xs font-medium",
                        trendPositive ? "text-emerald-600" : "text-red-500"
                    )}>
                        {trendPositive ? <TrendingUp className="w-3 h-3" /> : null}
                        {trend}
                    </span>
                )}
            </div>
            <p className="text-xs text-[#6B6B6B] mb-1">{label}</p>
            <p className="text-2xl md:text-3xl font-semibold text-[#1A1A1A]">{value}</p>
        </div>
    )
}
