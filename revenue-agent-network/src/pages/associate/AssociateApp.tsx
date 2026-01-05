import { useState } from "react"
import { cn } from "@/lib/utils"
import {
    Home,
    DollarSign,
    MessageSquare,
    Star,
    Settings,
    Menu,
    X,
    Bell,
    TrendingUp,
    Users,
    Calendar,
    Target,
    LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/Button"

type AssociatePage = "dashboard" | "earnings" | "conversations" | "reviews" | "settings"

const navItems = [
    { id: "dashboard" as const, label: "Dashboard", icon: Home },
    { id: "earnings" as const, label: "Earnings", icon: DollarSign },
    { id: "conversations" as const, label: "Conversations", icon: MessageSquare },
    { id: "reviews" as const, label: "Reviews", icon: Star },
    { id: "settings" as const, label: "Settings", icon: Settings },
]

// Mock data
const mockData = {
    earnings: {
        thisMonth: 4250,
        pending: 1200,
        lifetime: 28500,
    },
    stats: {
        dealsClosedThisMonth: 8,
        avgDealSize: 531,
        conversionRate: 24,
        companiesAssigned: 12,
    },
    recentDeals: [
        { company: "Anthropic", amount: 1200, date: "Dec 23, 2024", status: "Paid" },
        { company: "Mistral AI", amount: 850, date: "Dec 20, 2024", status: "Pending" },
        { company: "Cohere", amount: 650, date: "Dec 18, 2024", status: "Paid" },
    ],
    upcomingCalls: [
        { company: "Perplexity", contact: "Lisa Park", time: "Today, 2:00 PM" },
        { company: "Runway", contact: "Alex Kim", time: "Tomorrow, 10:00 AM" },
    ],
}

interface AssociateAppProps {
    onLogout?: () => void
}

export function AssociateApp({ onLogout }: AssociateAppProps) {
    const [currentPage, setCurrentPage] = useState<AssociatePage>("dashboard")
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
                                <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
                                    <Users className="w-5 h-5 text-white" />
                                </div>
                                <span className="font-semibold text-[#1A1A1A]">Associate</span>
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
                                            ? "bg-emerald-50 text-emerald-700 border-l-[3px] border-emerald-600 -ml-px"
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

                {/* Profile Switcher Link */}
                <div className="p-3 border-t border-[#E5E5E5]">
                    <div className={cn(
                        "flex items-center gap-3 px-2 py-2",
                        !isSidebarOpen && "justify-center"
                    )}>
                        <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center">
                            <Users className="w-4 h-4 text-white" />
                        </div>
                        {isSidebarOpen && (
                            <div>
                                <p className="text-sm font-medium text-[#1A1A1A]">Associate Portal</p>
                                <p className="text-xs text-[#6B6B6B]">associate@winnylabs.com</p>
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
                    {currentPage === "dashboard" && <AssociateDashboard />}
                    {currentPage === "earnings" && <EarningsPage />}
                    {currentPage === "conversations" && <ConversationsPage />}
                    {currentPage === "reviews" && <ReviewsPage />}
                    {currentPage === "settings" && <SettingsPage />}
                </div>
            </main>
        </div>
    )
}

// Dashboard
function AssociateDashboard() {
    const { earnings, stats, recentDeals, upcomingCalls } = mockData

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold text-[#1A1A1A]">Welcome back, Associate</h1>
                <p className="text-[#6B6B6B]">Here's your performance overview</p>
            </div>

            {/* Earnings Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg p-5 text-white">
                    <p className="text-emerald-100 text-sm">This Month</p>
                    <p className="text-3xl font-bold mt-1">${earnings.thisMonth.toLocaleString()}</p>
                </div>
                <div className="bg-white rounded-lg border border-[#E5E5E5] p-5">
                    <p className="text-[#6B6B6B] text-sm">Pending</p>
                    <p className="text-2xl font-semibold text-[#1A1A1A] mt-1">${earnings.pending.toLocaleString()}</p>
                </div>
                <div className="bg-white rounded-lg border border-[#E5E5E5] p-5">
                    <p className="text-[#6B6B6B] text-sm">Lifetime Earnings</p>
                    <p className="text-2xl font-semibold text-[#1A1A1A] mt-1">${earnings.lifetime.toLocaleString()}</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard icon={Target} label="Deals Closed" value={stats.dealsClosedThisMonth.toString()} />
                <StatCard icon={DollarSign} label="Avg Deal Size" value={`$${stats.avgDealSize}`} />
                <StatCard icon={TrendingUp} label="Conversion Rate" value={`${stats.conversionRate}%`} />
                <StatCard icon={Users} label="Companies" value={stats.companiesAssigned.toString()} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Deals */}
                <div className="bg-white rounded-lg border border-[#E5E5E5] p-5">
                    <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">Recent Deals</h2>
                    <div className="space-y-3">
                        {recentDeals.map((deal, i) => (
                            <div key={i} className="flex items-center justify-between py-2 border-b border-[#E5E5E5] last:border-0">
                                <div>
                                    <p className="text-sm font-medium text-[#1A1A1A]">{deal.company}</p>
                                    <p className="text-xs text-[#6B6B6B]">{deal.date}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-emerald-600">${deal.amount}</p>
                                    <span className={cn(
                                        "text-xs px-2 py-0.5 rounded-full",
                                        deal.status === "Paid" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                                    )}>{deal.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Calls */}
                <div className="bg-white rounded-lg border border-[#E5E5E5] p-5">
                    <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">Upcoming Calls</h2>
                    <div className="space-y-3">
                        {upcomingCalls.map((call, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-[#FAFAFA]">
                                <Calendar className="w-5 h-5 text-[#6B6B6B]" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-[#1A1A1A]">{call.company}</p>
                                    <p className="text-xs text-[#6B6B6B]">{call.contact} • {call.time}</p>
                                </div>
                                <Button size="sm">Join</Button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

function StatCard({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
    return (
        <div className="bg-white rounded-lg border border-[#E5E5E5] p-4">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#F5F5F5] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#6B6B6B]" />
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
function EarningsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-[#1A1A1A]">Earnings</h1>
            <p className="text-[#6B6B6B]">Track your commissions and payouts</p>
            <div className="bg-white rounded-lg border border-[#E5E5E5] p-8 text-center">
                <DollarSign className="w-12 h-12 text-[#E5E5E5] mx-auto mb-4" />
                <p className="text-[#6B6B6B]">Detailed earnings breakdown coming soon</p>
            </div>
        </div>
    )
}

function ConversationsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-[#1A1A1A]">Conversations</h1>
            <p className="text-[#6B6B6B]">Your sales conversations and follow-ups</p>
            <div className="bg-white rounded-lg border border-[#E5E5E5] p-8 text-center">
                <MessageSquare className="w-12 h-12 text-[#E5E5E5] mx-auto mb-4" />
                <p className="text-[#6B6B6B]">Conversation history coming soon</p>
            </div>
        </div>
    )
}

function ReviewsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-[#1A1A1A]">Reviews</h1>
            <p className="text-[#6B6B6B]">Your performance reviews and feedback</p>
            <div className="bg-white rounded-lg border border-[#E5E5E5] p-8 text-center">
                <Star className="w-12 h-12 text-[#E5E5E5] mx-auto mb-4" />
                <p className="text-[#6B6B6B]">Reviews section coming soon</p>
            </div>
        </div>
    )
}

function SettingsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-[#1A1A1A]">Settings</h1>
            <p className="text-[#6B6B6B]">Manage your account preferences</p>
            <div className="bg-white rounded-lg border border-[#E5E5E5] p-8 text-center">
                <Settings className="w-12 h-12 text-[#E5E5E5] mx-auto mb-4" />
                <p className="text-[#6B6B6B]">Settings page coming soon</p>
            </div>
        </div>
    )
}
