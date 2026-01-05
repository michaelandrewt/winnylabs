import { useState } from "react"
import {
    DollarSign,
    TrendingUp,
    Target,
    BarChart3,
    Calendar,
    ChevronDown,
} from "lucide-react"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    Cell,
} from "recharts"
import { MetricCard } from "@/components/ui/MetricCard"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Select } from "@/components/ui/Select"
import { Button } from "@/components/ui/Button"

// Mock data
const revenueData = [
    { month: "Jul", revenue: 42000 },
    { month: "Aug", revenue: 58000 },
    { month: "Sep", revenue: 51000 },
    { month: "Oct", revenue: 73000 },
    { month: "Nov", revenue: 89000 },
    { month: "Dec", revenue: 124000 },
]

const agentPerformance = [
    { name: "Agent Alpha", revenue: 89000, color: "#1A1A1A" },
    { name: "Agent Beta", revenue: 72000, color: "#404040" },
    { name: "Agent Gamma", revenue: 58000, color: "#6B6B6B" },
    { name: "Agent Delta", revenue: 45000, color: "#8B8B8B" },
    { name: "Agent Epsilon", revenue: 32000, color: "#ABABAB" },
]

const pipelineData = [
    { stage: "Discovery", deals: 48, value: 960000, fill: "#1A1A1A" },
    { stage: "Demo", deals: 32, value: 640000, fill: "#404040" },
    { stage: "Proposal", deals: 18, value: 360000, fill: "#6B6B6B" },
    { stage: "Negotiation", deals: 12, value: 240000, fill: "#8B8B8B" },
    { stage: "Won", deals: 8, value: 160000, fill: "#ABABAB" },
]

const topCompanies = [
    { name: "TechCorp Industries", deals: 12, revenue: 156000, pipeline: 89000 },
    { name: "DataFlow Solutions", deals: 8, revenue: 124000, pipeline: 67000 },
    { name: "CloudSync Global", deals: 6, revenue: 98000, pipeline: 45000 },
    { name: "InnovateLabs Inc", deals: 5, revenue: 87000, pipeline: 34000 },
    { name: "QuantumAI Systems", deals: 4, revenue: 72000, pipeline: 28000 },
]

const dateRangeOptions = [
    { value: "7d", label: "Last 7 days" },
    { value: "30d", label: "Last 30 days" },
    { value: "90d", label: "Last 90 days" },
    { value: "6m", label: "Last 6 months" },
    { value: "1y", label: "Last year" },
]

const agentOptions = [
    { value: "all", label: "All Agents" },
    { value: "alpha", label: "Agent Alpha" },
    { value: "beta", label: "Agent Beta" },
    { value: "gamma", label: "Agent Gamma" },
    { value: "delta", label: "Agent Delta" },
    { value: "epsilon", label: "Agent Epsilon" },
]

const companyOptions = [
    { value: "all", label: "All Companies" },
    { value: "techcorp", label: "TechCorp Industries" },
    { value: "dataflow", label: "DataFlow Solutions" },
    { value: "cloudsync", label: "CloudSync Global" },
    { value: "innovatelabs", label: "InnovateLabs Inc" },
]

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white px-3 py-2 rounded-lg shadow-lg border border-[#E5E5E5]">
                <p className="text-xs text-[#6B6B6B] mb-1">{label}</p>
                <p className="text-sm font-semibold text-[#1A1A1A]">
                    ${payload[0].value.toLocaleString()}
                </p>
            </div>
        )
    }
    return null
}

const AgentTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white px-3 py-2 rounded-lg shadow-lg border border-[#E5E5E5]">
                <p className="text-xs text-[#6B6B6B] mb-1">{payload[0].payload.name}</p>
                <p className="text-sm font-semibold text-[#1A1A1A]">
                    ${payload[0].value.toLocaleString()}
                </p>
            </div>
        )
    }
    return null
}

const FunnelTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white px-3 py-2 rounded-lg shadow-lg border border-[#E5E5E5]">
                <p className="text-xs text-[#6B6B6B] mb-1">{payload[0].payload.stage}</p>
                <p className="text-sm font-semibold text-[#1A1A1A]">
                    {payload[0].value} deals
                </p>
                <p className="text-xs text-[#6B6B6B]">
                    ${payload[0].payload.value.toLocaleString()} value
                </p>
            </div>
        )
    }
    return null
}

export function Analytics() {
    const [dateRange, setDateRange] = useState("6m")
    const [agentFilter, setAgentFilter] = useState("all")
    const [companyFilter, setCompanyFilter] = useState("all")

    return (
        <div className="space-y-8">
            {/* Header with Filters */}
            <div className="flex items-start justify-between">
                <div className="space-y-1 animate-fade-in">
                    <h1 className="text-2xl font-semibold text-[#1A1A1A] tracking-tight">
                        Analytics
                    </h1>
                    <p className="text-[#6B6B6B]">
                        Track performance metrics and revenue trends.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-3">
                    <Select
                        options={dateRangeOptions}
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="w-36"
                    />
                    <Select
                        options={agentOptions}
                        value={agentFilter}
                        onChange={(e) => setAgentFilter(e.target.value)}
                        className="w-40"
                    />
                    <Select
                        options={companyOptions}
                        value={companyFilter}
                        onChange={(e) => setCompanyFilter(e.target.value)}
                        className="w-44"
                    />
                </div>
            </div>

            {/* Top Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-slide-up">
                <MetricCard
                    title="Total Revenue"
                    value="$437K"
                    icon={DollarSign}
                    trend={{ value: "18%", positive: true }}
                />
                <MetricCard
                    title="Average Deal Size"
                    value="$12.4K"
                    icon={BarChart3}
                    trend={{ value: "5%", positive: true }}
                />
                <MetricCard
                    title="Win Rate"
                    value="68%"
                    icon={Target}
                    trend={{ value: "3%", positive: true }}
                />
                <MetricCard
                    title="Active Pipeline"
                    value="$2.2M"
                    icon={TrendingUp}
                    trend={{ value: "24%", positive: true }}
                />
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Over Time */}
                <Card className="animate-slide-up stagger-1">
                    <CardHeader>
                        <CardTitle>Revenue Over Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={revenueData}>
                                    <XAxis
                                        dataKey="month"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "#6B6B6B", fontSize: 12 }}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "#6B6B6B", fontSize: 12 }}
                                        tickFormatter={(value) => `$${value / 1000}k`}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Line
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#1A1A1A"
                                        strokeWidth={2}
                                        dot={{ fill: "#1A1A1A", strokeWidth: 0, r: 4 }}
                                        activeDot={{ r: 6, fill: "#1A1A1A" }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Agent Performance */}
                <Card className="animate-slide-up stagger-2">
                    <CardHeader>
                        <CardTitle>Agent Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={agentPerformance}
                                    layout="vertical"
                                    margin={{ left: 20 }}
                                >
                                    <XAxis
                                        type="number"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "#6B6B6B", fontSize: 12 }}
                                        tickFormatter={(value) => `$${value / 1000}k`}
                                    />
                                    <YAxis
                                        type="category"
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "#6B6B6B", fontSize: 12 }}
                                        width={90}
                                    />
                                    <Tooltip content={<AgentTooltip />} cursor={{ fill: "#F5F5F5" }} />
                                    <Bar dataKey="revenue" radius={[0, 4, 4, 0]} barSize={20}>
                                        {agentPerformance.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pipeline by Stage (Funnel) */}
                <Card className="animate-slide-up stagger-3">
                    <CardHeader>
                        <CardTitle>Pipeline by Stage</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={pipelineData} layout="vertical" margin={{ left: 10 }}>
                                    <XAxis
                                        type="number"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "#6B6B6B", fontSize: 12 }}
                                    />
                                    <YAxis
                                        type="category"
                                        dataKey="stage"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "#6B6B6B", fontSize: 12 }}
                                        width={80}
                                    />
                                    <Tooltip content={<FunnelTooltip />} cursor={{ fill: "#F5F5F5" }} />
                                    <Bar dataKey="deals" radius={[0, 4, 4, 0]} barSize={24}>
                                        {pipelineData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Top Companies Table */}
                <Card className="animate-slide-up stagger-4">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Top Companies</CardTitle>
                            <button className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors duration-200">
                                View all
                            </button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-[#E5E5E5]">
                                        <th className="px-6 py-3 text-left text-xs font-medium text-[#6B6B6B] uppercase tracking-wider">
                                            Company
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-[#6B6B6B] uppercase tracking-wider">
                                            Deals
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-[#6B6B6B] uppercase tracking-wider">
                                            Revenue
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-[#6B6B6B] uppercase tracking-wider">
                                            Pipeline
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#E5E5E5]">
                                    {topCompanies.map((company, index) => (
                                        <tr
                                            key={company.name}
                                            className="hover:bg-[#FAFAFA] transition-colors duration-200"
                                        >
                                            <td className="px-6 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-[#F5F5F5] flex items-center justify-center">
                                                        <span className="text-xs font-semibold text-[#6B6B6B]">
                                                            {company.name.charAt(0)}
                                                        </span>
                                                    </div>
                                                    <span className="text-sm font-medium text-[#1A1A1A]">
                                                        {company.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-[#6B6B6B]">
                                                {company.deals}
                                            </td>
                                            <td className="px-4 py-3 text-sm font-medium text-[#1A1A1A]">
                                                ${(company.revenue / 1000).toFixed(0)}K
                                            </td>
                                            <td className="px-6 py-3 text-sm text-[#6B6B6B]">
                                                ${(company.pipeline / 1000).toFixed(0)}K
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Monthly Revenue Bar Chart */}
            <Card className="animate-slide-up stagger-5">
                <CardHeader>
                    <CardTitle>Monthly Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueData}>
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#6B6B6B", fontSize: 12 }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#6B6B6B", fontSize: 12 }}
                                    tickFormatter={(value) => `$${value / 1000}k`}
                                />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: "#F5F5F5" }} />
                                <Bar dataKey="revenue" fill="#1A1A1A" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
