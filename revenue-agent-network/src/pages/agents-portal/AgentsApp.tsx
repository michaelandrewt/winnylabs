import { useState } from "react"
import { cn } from "@/lib/utils"
import {
    Bot,
    Home,
    Settings,
    Activity,
    MessageSquare,
    Target,
    Menu,
    Play,
    Pause,
    Zap,
    TrendingUp,
    Users,
    Mail,
    LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"

type AgentsPage = "dashboard" | "fleet" | "activity" | "training" | "settings"

const navItems = [
    { id: "dashboard" as const, label: "Dashboard", icon: Home },
    { id: "fleet" as const, label: "Agent Fleet", icon: Bot },
    { id: "activity" as const, label: "Activity Log", icon: Activity },
    { id: "training" as const, label: "Training", icon: Target },
    { id: "settings" as const, label: "Settings", icon: Settings },
]

// Mock data
const mockAgents = [
    {
        id: "1",
        name: "Agent-AI-01",
        status: "active",
        model: "Claude Sonnet 4",
        specialty: "AI/ML Companies",
        outreach: 340,
        replyRate: 34,
        meetings: 12,
        pipeline: 87000,
    },
    {
        id: "2",
        name: "Agent-AI-02",
        status: "active",
        model: "GPT-4 Turbo",
        specialty: "Enterprise Tech",
        outreach: 280,
        replyRate: 28,
        meetings: 8,
        pipeline: 45000,
    },
    {
        id: "3",
        name: "Agent-Finance-01",
        status: "paused",
        model: "Claude Sonnet 4",
        specialty: "FinTech",
        outreach: 210,
        replyRate: 24,
        meetings: 6,
        pipeline: 32000,
    },
    {
        id: "4",
        name: "Agent-Healthcare-01",
        status: "learning",
        model: "Gemini Pro",
        specialty: "Healthcare",
        outreach: 150,
        replyRate: 22,
        meetings: 4,
        pipeline: 18000,
    },
]

interface AgentsAppProps {
    onLogout?: () => void
}

export function AgentsApp({ onLogout }: AgentsAppProps) {
    const [currentPage, setCurrentPage] = useState<AgentsPage>("dashboard")
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    return (
        <div className="min-h-screen bg-[#FAFAFA]">
            {/* Sidebar */}
            <aside className={cn(
                "fixed left-0 top-0 h-screen bg-white border-r border-[#E5E5E5] flex flex-col z-50 transition-all duration-200",
                isSidebarOpen ? "w-60" : "w-16"
            )}>
                {/* Header */}
                <div className={cn(
                    "h-16 flex items-center border-b border-[#E5E5E5]",
                    isSidebarOpen ? "px-4 justify-between" : "px-0 justify-center"
                )}>
                    {isSidebarOpen ? (
                        <>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                                <span className="font-semibold text-[#1A1A1A]">Agent Manager</span>
                            </div>
                            <button onClick={() => setIsSidebarOpen(false)} className="p-2 rounded-lg hover:bg-[#F5F5F5]">
                                <Menu className="w-5 h-5 text-[#6B6B6B]" />
                            </button>
                        </>
                    ) : (
                        <button onClick={() => setIsSidebarOpen(true)} className="p-2 rounded-lg hover:bg-[#F5F5F5]">
                            <Menu className="w-5 h-5 text-[#6B6B6B]" />
                        </button>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-4 px-3">
                    <ul className="space-y-1">
                        {navItems.map((item) => (
                            <li key={item.id}>
                                <button
                                    onClick={() => setCurrentPage(item.id)}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all",
                                        currentPage === item.id
                                            ? "bg-purple-50 text-purple-700 border-l-[3px] border-purple-600 -ml-px"
                                            : "text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F5F5F5]"
                                    )}
                                >
                                    <item.icon className="w-5 h-5" />
                                    {isSidebarOpen && <span className="text-sm">{item.label}</span>}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Profile */}
                <div className="p-3 border-t border-[#E5E5E5]">
                    <div className={cn(
                        "flex items-center gap-3 px-2 py-2",
                        !isSidebarOpen && "justify-center"
                    )}>
                        <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center">
                            <Bot className="w-4 h-4 text-white" />
                        </div>
                        {isSidebarOpen && (
                            <div>
                                <p className="text-sm font-medium text-[#1A1A1A]">Agent Manager</p>
                                <p className="text-xs text-[#6B6B6B]">agents@winnylabs.com</p>
                            </div>
                        )}
                    </div>
                    {onLogout && (
                        <button
                            onClick={onLogout}
                            className={cn(
                                "mt-2 flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full",
                                !isSidebarOpen && "justify-center"
                            )}
                        >
                            <LogOut className="w-4 h-4" />
                            {isSidebarOpen && <span className="text-sm font-medium">Sign Out</span>}
                        </button>
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <main className={cn(
                "transition-all duration-200 py-8 px-6",
                isSidebarOpen ? "ml-60" : "ml-16"
            )}>
                <div className="max-w-6xl mx-auto">
                    {currentPage === "dashboard" && <AgentsDashboard />}
                    {currentPage === "fleet" && <FleetPage />}
                    {currentPage === "activity" && <ActivityPage />}
                    {currentPage === "training" && <TrainingPage />}
                    {currentPage === "settings" && <SettingsPage />}
                </div>
            </main>
        </div>
    )
}

// Dashboard
function AgentsDashboard() {
    const activeAgents = mockAgents.filter(a => a.status === "active").length
    const totalOutreach = mockAgents.reduce((sum, a) => sum + a.outreach, 0)
    const avgReplyRate = Math.round(mockAgents.reduce((sum, a) => sum + a.replyRate, 0) / mockAgents.length)
    const totalPipeline = mockAgents.reduce((sum, a) => sum + a.pipeline, 0)

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-[#1A1A1A]">Agent Fleet Overview</h1>
                    <p className="text-[#6B6B6B]">Monitor and manage your AI sales agents</p>
                </div>
                <Button>
                    <Bot className="w-4 h-4" />
                    Deploy New Agent
                </Button>
            </div>

            {/* Fleet Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard icon={Bot} label="Active Agents" value={`${activeAgents}/${mockAgents.length}`} color="purple" />
                <StatCard icon={Mail} label="Total Outreach" value={totalOutreach.toLocaleString()} />
                <StatCard icon={TrendingUp} label="Avg Reply Rate" value={`${avgReplyRate}%`} />
                <StatCard icon={Target} label="Pipeline" value={`$${(totalPipeline / 1000).toFixed(0)}K`} />
            </div>

            {/* Agent List */}
            <div className="bg-white rounded-lg border border-[#E5E5E5]">
                <div className="p-4 border-b border-[#E5E5E5]">
                    <h2 className="text-lg font-semibold text-[#1A1A1A]">Agent Fleet</h2>
                </div>
                <div className="divide-y divide-[#E5E5E5]">
                    {mockAgents.map((agent) => (
                        <div key={agent.id} className="p-4 hover:bg-[#FAFAFA] transition-colors">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                                        <Bot className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-semibold text-[#1A1A1A]">{agent.name}</p>
                                            <Badge variant={agent.status === "active" ? "success" : agent.status === "paused" ? "warning" : "default"}>
                                                {agent.status}
                                            </Badge>
                                        </div>
                                        <p className="text-xs text-[#6B6B6B]">{agent.specialty} • {agent.model}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-8">
                                    <div className="text-center">
                                        <p className="text-sm font-semibold text-[#1A1A1A]">{agent.outreach}</p>
                                        <p className="text-xs text-[#6B6B6B]">Outreach</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-semibold text-[#1A1A1A]">{agent.replyRate}%</p>
                                        <p className="text-xs text-[#6B6B6B]">Reply</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-semibold text-[#1A1A1A]">{agent.meetings}</p>
                                        <p className="text-xs text-[#6B6B6B]">Meetings</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {agent.status === "active" ? (
                                            <Button variant="secondary" size="sm">
                                                <Pause className="w-4 h-4" />
                                                Pause
                                            </Button>
                                        ) : (
                                            <Button size="sm">
                                                <Play className="w-4 h-4" />
                                                Resume
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function StatCard({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: string; color?: string }) {
    return (
        <div className="bg-white rounded-lg border border-[#E5E5E5] p-4">
            <div className="flex items-center gap-3">
                <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    color === "purple" ? "bg-purple-100" : "bg-[#F5F5F5]"
                )}>
                    <Icon className={cn("w-5 h-5", color === "purple" ? "text-purple-600" : "text-[#6B6B6B]")} />
                </div>
                <div>
                    <p className="text-xs text-[#6B6B6B]">{label}</p>
                    <p className="text-xl font-semibold text-[#1A1A1A]">{value}</p>
                </div>
            </div>
        </div>
    )
}

// Placeholder pages
function FleetPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-[#1A1A1A]">Agent Fleet</h1>
            <p className="text-[#6B6B6B]">Manage all your AI agents</p>
            <div className="bg-white rounded-lg border border-[#E5E5E5] p-8 text-center">
                <Bot className="w-12 h-12 text-[#E5E5E5] mx-auto mb-4" />
                <p className="text-[#6B6B6B]">Full fleet management coming soon</p>
            </div>
        </div>
    )
}

function ActivityPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-[#1A1A1A]">Activity Log</h1>
            <p className="text-[#6B6B6B]">Real-time agent activity and events</p>
            <div className="bg-white rounded-lg border border-[#E5E5E5] p-8 text-center">
                <Activity className="w-12 h-12 text-[#E5E5E5] mx-auto mb-4" />
                <p className="text-[#6B6B6B]">Activity log coming soon</p>
            </div>
        </div>
    )
}

function TrainingPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-[#1A1A1A]">Agent Training</h1>
            <p className="text-[#6B6B6B]">Train and fine-tune your agents</p>
            <div className="bg-white rounded-lg border border-[#E5E5E5] p-8 text-center">
                <Target className="w-12 h-12 text-[#E5E5E5] mx-auto mb-4" />
                <p className="text-[#6B6B6B]">Training center coming soon</p>
            </div>
        </div>
    )
}

function SettingsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-[#1A1A1A]">Settings</h1>
            <p className="text-[#6B6B6B]">Configure agent defaults and preferences</p>
            <div className="bg-white rounded-lg border border-[#E5E5E5] p-8 text-center">
                <Settings className="w-12 h-12 text-[#E5E5E5] mx-auto mb-4" />
                <p className="text-[#6B6B6B]">Settings page coming soon</p>
            </div>
        </div>
    )
}
