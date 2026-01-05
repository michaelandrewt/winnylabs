import { useState } from "react"
import { cn } from "@/lib/utils"
import {
    Plus,
    Search,
    Users,
    UserCheck,
    DollarSign,
    Star,
    LayoutGrid,
    List,
    Mail,
    Phone,
    MapPin,
    Clock,
    Bot,
    MessageSquare,
    TrendingUp,
    ExternalLink,
    FileText,
    Calendar,
    ChevronRight,
    X,
    Download,
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"
import { Modal, ModalFooter } from "@/components/ui/Modal"
import { useToast } from "@/components/ui/Toast"

// Types
interface Associate {
    id: string
    name: string
    initials: string
    email: string
    phone: string
    location: {
        city: string
        state: string
        country: string
        timezone: string
    }
    status: "active" | "on_break" | "inactive"
    joinDate: string
    assignments: {
        companies: string[]
        products: string[]
        agents: string[]
    }
    performance: {
        revenue: number
        dealsClosed: number
        conversations: number
        replyRate: number
    }
    rating: {
        overall: number
        totalReviews: number
    }
    compensation: {
        baseRate: number
        thisMonth: number
        pending: number
        lifetime: number
    }
    conversations: Conversation[]
    reviews: Review[]
    payouts: Payout[]
}

interface Conversation {
    id: string
    type: "email" | "call" | "linkedin"
    recipient: string
    subject: string
    timestamp: string
    status: string
    agentUsed: string
    company: string
}

interface Review {
    id: string
    rating: number
    content: string
    reviewer: string
    role: string
    company: string
    date: string
}

interface Payout {
    id: string
    date: string
    amount: number
    description: string
}

// Mock data
const mockAssociates: Associate[] = [
    {
        id: "1",
        name: "Michael Wong",
        initials: "MW",
        email: "michael@winnylabs.com",
        phone: "+1 (555) 123-4567",
        location: {
            city: "San Francisco",
            state: "CA",
            country: "USA",
            timezone: "PST (UTC-8)",
        },
        status: "active",
        joinDate: "2024-01-15",
        assignments: {
            companies: ["Anthropic", "Mistral AI", "Cohere", "Perplexity", "Runway", "Stability AI", "Character.AI", "Hugging Face"],
            products: ["AI Infrastructure API", "Enterprise Platform", "Developer Tools", "Custom Integration"],
            agents: ["Agent-AI-01", "Agent-AI-02", "Agent-Finance-01"],
        },
        performance: {
            revenue: 145000,
            dealsClosed: 18,
            conversations: 127,
            replyRate: 32,
        },
        rating: {
            overall: 4.8,
            totalReviews: 24,
        },
        compensation: {
            baseRate: 15,
            thisMonth: 21750,
            pending: 8400,
            lifetime: 186500,
        },
        conversations: [
            {
                id: "c1",
                type: "email",
                recipient: "john@anthropic.com",
                subject: "Enterprise Plan Discussion",
                timestamp: "2024-12-25T10:30:00Z",
                status: "Replied",
                agentUsed: "Agent-AI-01",
                company: "Anthropic",
            },
            {
                id: "c2",
                type: "call",
                recipient: "Sarah @Mistral",
                subject: "Demo scheduled",
                timestamp: "2024-12-25T05:00:00Z",
                status: "45min • Outcome: Demo scheduled",
                agentUsed: "",
                company: "Mistral AI",
            },
            {
                id: "c3",
                type: "linkedin",
                recipient: "Mark @Cohere",
                subject: "Connection request",
                timestamp: "2024-12-24T14:00:00Z",
                status: "Read, no reply yet",
                agentUsed: "",
                company: "Cohere",
            },
        ],
        reviews: [
            {
                id: "r1",
                rating: 5,
                content: "Excellent communication and deep understanding of our technical needs.",
                reviewer: "John Doe",
                role: "VP Engineering",
                company: "Anthropic",
                date: "2024-12-20",
            },
            {
                id: "r2",
                rating: 4,
                content: "Very responsive, though initial pitch needed more customization.",
                reviewer: "Sarah Chen",
                role: "CRO",
                company: "Mistral AI",
                date: "2024-12-18",
            },
        ],
        payouts: [
            { id: "p1", date: "2024-12-15", amount: 12000, description: "Anthropic deal" },
            { id: "p2", date: "2024-12-10", amount: 8500, description: "Mistral AI deal" },
            { id: "p3", date: "2024-12-01", amount: 15200, description: "Multiple deals" },
        ],
    },
    {
        id: "2",
        name: "Sarah Chen",
        initials: "SC",
        email: "sarah@winnylabs.com",
        phone: "+1 (555) 234-5678",
        location: {
            city: "New York",
            state: "NY",
            country: "USA",
            timezone: "EST (UTC-5)",
        },
        status: "active",
        joinDate: "2024-02-20",
        assignments: {
            companies: ["OpenAI", "Scale AI", "Databricks", "Snowflake"],
            products: ["Enterprise Platform", "Analytics Suite"],
            agents: ["Agent-AI-02"],
        },
        performance: {
            revenue: 128000,
            dealsClosed: 15,
            conversations: 98,
            replyRate: 38,
        },
        rating: {
            overall: 4.9,
            totalReviews: 18,
        },
        compensation: {
            baseRate: 15,
            thisMonth: 18500,
            pending: 5200,
            lifetime: 142000,
        },
        conversations: [],
        reviews: [],
        payouts: [],
    },
    {
        id: "3",
        name: "Alex Rivera",
        initials: "AR",
        email: "alex@winnylabs.com",
        phone: "+1 (555) 345-6789",
        location: {
            city: "Austin",
            state: "TX",
            country: "USA",
            timezone: "CST (UTC-6)",
        },
        status: "on_break",
        joinDate: "2024-03-10",
        assignments: {
            companies: ["Figma", "Notion", "Linear"],
            products: ["Developer Tools", "API Platform"],
            agents: ["Agent-Finance-01"],
        },
        performance: {
            revenue: 89000,
            dealsClosed: 12,
            conversations: 76,
            replyRate: 28,
        },
        rating: {
            overall: 4.5,
            totalReviews: 14,
        },
        compensation: {
            baseRate: 14,
            thisMonth: 0,
            pending: 3400,
            lifetime: 98000,
        },
        conversations: [],
        reviews: [],
        payouts: [],
    },
    {
        id: "4",
        name: "Jordan Park",
        initials: "JP",
        email: "jordan@winnylabs.com",
        phone: "+1 (555) 456-7890",
        location: {
            city: "Seattle",
            state: "WA",
            country: "USA",
            timezone: "PST (UTC-8)",
        },
        status: "active",
        joinDate: "2024-04-05",
        assignments: {
            companies: ["Stripe", "Plaid", "Square", "Brex"],
            products: ["Fintech Integration", "Payment API"],
            agents: ["Agent-AI-01", "Agent-Finance-01"],
        },
        performance: {
            revenue: 125000,
            dealsClosed: 14,
            conversations: 112,
            replyRate: 35,
        },
        rating: {
            overall: 4.7,
            totalReviews: 20,
        },
        compensation: {
            baseRate: 15,
            thisMonth: 19200,
            pending: 6800,
            lifetime: 156000,
        },
        conversations: [],
        reviews: [],
        payouts: [],
    },
]

const statusLabels = {
    active: "Active",
    on_break: "On Break",
    inactive: "Inactive",
}

const statusColors = {
    active: "success",
    on_break: "warning",
    inactive: "default",
} as const

const formatCurrency = (amount: number): string => {
    if (amount >= 1000) {
        return `$${(amount / 1000).toFixed(0)}K`
    }
    return `$${amount.toLocaleString()}`
}

const formatDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    })
}

const formatTime = (dateStr: string): string => {
    const date = new Date(dateStr)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))

    if (hours < 1) return "Just now"
    if (hours < 24) return `${hours} hours ago`
    if (hours < 48) return "Yesterday"
    return formatDate(dateStr)
}

const renderStars = (rating: number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <Star
                key={i}
                className={cn(
                    "w-4 h-4",
                    i <= rating ? "fill-amber-400 text-amber-400" : "text-gray-200"
                )}
            />
        )
    }
    return <div className="flex items-center gap-0.5">{stars}</div>
}

export function Associates() {
    const { addToast } = useToast()
    const [associates] = useState<Associate[]>(mockAssociates)
    const [searchQuery, setSearchQuery] = useState("")
    const [viewMode, setViewMode] = useState<"table" | "cards">("table")
    const [statusFilter, setStatusFilter] = useState<string>("all")
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [selectedAssociate, setSelectedAssociate] = useState<Associate | null>(null)
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

    // Filter associates
    const filteredAssociates = associates.filter((assoc) => {
        const matchesSearch =
            assoc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            assoc.email.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = statusFilter === "all" || assoc.status === statusFilter
        return matchesSearch && matchesStatus
    })

    // Stats
    const totalAssociates = associates.length
    const activeToday = associates.filter((a) => a.status === "active").length
    const totalRevenue = associates.reduce((sum, a) => sum + a.performance.revenue, 0)
    const avgRating = (associates.reduce((sum, a) => sum + a.rating.overall, 0) / associates.length).toFixed(1)

    const handleViewDetails = (associate: Associate) => {
        setSelectedAssociate(associate)
        setIsDetailModalOpen(true)
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between animate-fade-in">
                <div className="space-y-1">
                    <h1 className="text-xl md:text-2xl font-semibold text-[#1A1A1A] tracking-tight">
                        Associates
                    </h1>
                    <p className="text-sm md:text-base text-[#6B6B6B]">
                        Manage your sales team and monitor their performance.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="secondary" size="sm" className="hidden md:flex">
                        <Download className="w-4 h-4" />
                        Export
                    </Button>
                    <Button onClick={() => setIsAddModalOpen(true)}>
                        <Plus className="w-4 h-4" />
                        <span className="hidden sm:inline">Add Associate</span>
                        <span className="sm:hidden">Add</span>
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-slide-up">
                <div className="bg-white rounded-lg border border-[#E5E5E5] p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#F5F5F5] flex items-center justify-center">
                            <Users className="w-5 h-5 text-[#6B6B6B]" />
                        </div>
                        <div>
                            <p className="text-xs text-[#6B6B6B]">Total Associates</p>
                            <p className="text-xl font-semibold text-[#1A1A1A]">{totalAssociates}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg border border-[#E5E5E5] p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                            <UserCheck className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-xs text-[#6B6B6B]">Active Today</p>
                            <p className="text-xl font-semibold text-[#1A1A1A]">{activeToday}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg border border-[#E5E5E5] p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-xs text-[#6B6B6B]">Total Revenue</p>
                            <p className="text-xl font-semibold text-[#1A1A1A]">{formatCurrency(totalRevenue)}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg border border-[#E5E5E5] p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                            <Star className="w-5 h-5 text-amber-500" />
                        </div>
                        <div>
                            <p className="text-xs text-[#6B6B6B]">Avg Rating</p>
                            <p className="text-xl font-semibold text-[#1A1A1A]">{avgRating}★</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between animate-slide-up stagger-1">
                <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
                    {["all", "active", "on_break", "inactive"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={cn(
                                "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors",
                                statusFilter === status
                                    ? "bg-[#1A1A1A] text-white"
                                    : "bg-[#F5F5F5] text-[#6B6B6B] hover:bg-[#E5E5E5]"
                            )}
                        >
                            {status === "all" ? "All" : statusLabels[status as keyof typeof statusLabels]}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B6B]" />
                        <input
                            type="text"
                            placeholder="Search associates..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={cn(
                                "w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border",
                                "bg-white border-[#E5E5E5]",
                                "placeholder:text-[#9CA3AF]",
                                "focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/10 focus:border-[#1A1A1A]",
                                "transition-all duration-200"
                            )}
                        />
                    </div>
                    <div className="hidden md:flex items-center gap-1 border border-[#E5E5E5] rounded-lg p-1">
                        <button
                            onClick={() => setViewMode("table")}
                            className={cn(
                                "p-1.5 rounded-md transition-colors",
                                viewMode === "table" ? "bg-[#F5F5F5] text-[#1A1A1A]" : "text-[#6B6B6B] hover:text-[#1A1A1A]"
                            )}
                        >
                            <List className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode("cards")}
                            className={cn(
                                "p-1.5 rounded-md transition-colors",
                                viewMode === "cards" ? "bg-[#F5F5F5] text-[#1A1A1A]" : "text-[#6B6B6B] hover:text-[#1A1A1A]"
                            )}
                        >
                            <LayoutGrid className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Associates Table */}
            {viewMode === "table" ? (
                <div className="bg-white rounded-lg border border-[#E5E5E5] overflow-hidden animate-slide-up stagger-2">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px]">
                            <thead>
                                <tr className="border-b border-[#E5E5E5] bg-[#FAFAFA]">
                                    <th className="px-4 py-3 text-left text-xs font-medium text-[#6B6B6B] uppercase tracking-wider">
                                        Associate
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-[#6B6B6B] uppercase tracking-wider">
                                        Assignments
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-[#6B6B6B] uppercase tracking-wider">
                                        Performance
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-[#6B6B6B] uppercase tracking-wider">
                                        Rating
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-[#6B6B6B] uppercase tracking-wider">
                                        Payout
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-[#6B6B6B] uppercase tracking-wider">
                                        Location
                                    </th>
                                    <th className="px-4 py-3 text-center text-xs font-medium text-[#6B6B6B] uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-4 py-3"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#E5E5E5]">
                                {filteredAssociates.map((associate) => (
                                    <tr
                                        key={associate.id}
                                        className="hover:bg-[#FAFAFA] transition-colors cursor-pointer"
                                        onClick={() => handleViewDetails(associate)}
                                    >
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center flex-shrink-0">
                                                    <span className="text-sm font-medium text-[#6B6B6B]">
                                                        {associate.initials}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-[#1A1A1A]">{associate.name}</p>
                                                    <p className="text-xs text-[#6B6B6B]">{associate.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="space-y-0.5">
                                                <p className="text-sm text-[#1A1A1A]">{associate.assignments.companies.length} companies</p>
                                                <p className="text-xs text-[#6B6B6B]">{associate.assignments.products.length} products</p>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="space-y-0.5">
                                                <p className="text-sm font-medium text-[#1A1A1A]">{formatCurrency(associate.performance.revenue)}</p>
                                                <p className="text-xs text-[#6B6B6B]">{associate.performance.conversations} convos</p>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                                <span className="text-sm font-medium text-[#1A1A1A]">{associate.rating.overall}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <p className="text-sm font-medium text-[#1A1A1A]">${associate.compensation.thisMonth.toLocaleString()}</p>
                                        </td>
                                        <td className="px-4 py-4">
                                            <p className="text-sm text-[#6B6B6B]">{associate.location.city}, {associate.location.state}</p>
                                        </td>
                                        <td className="px-4 py-4 text-center">
                                            <Badge variant={statusColors[associate.status]}>
                                                {statusLabels[associate.status]}
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-4">
                                            <button className="text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors">
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                /* Cards View */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-slide-up stagger-2">
                    {filteredAssociates.map((associate) => (
                        <div
                            key={associate.id}
                            onClick={() => handleViewDetails(associate)}
                            className={cn(
                                "bg-white rounded-lg border border-[#E5E5E5] p-5",
                                "hover:border-[#1A1A1A] hover:shadow-sm",
                                "transition-all duration-200 cursor-pointer"
                            )}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-[#F5F5F5] flex items-center justify-center">
                                        <span className="text-base font-medium text-[#6B6B6B]">{associate.initials}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-base font-semibold text-[#1A1A1A]">{associate.name}</h3>
                                        <p className="text-xs text-[#6B6B6B]">{associate.location.city}, {associate.location.state}</p>
                                    </div>
                                </div>
                                <Badge variant={statusColors[associate.status]}>
                                    {statusLabels[associate.status]}
                                </Badge>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <p className="text-xs text-[#6B6B6B]">Revenue</p>
                                    <p className="text-sm font-semibold text-[#1A1A1A]">{formatCurrency(associate.performance.revenue)}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-[#6B6B6B]">Rating</p>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                        <span className="text-sm font-semibold text-[#1A1A1A]">{associate.rating.overall}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-[#E5E5E5]">
                                <p className="text-xs text-[#6B6B6B] mb-2">Assignments</p>
                                <div className="flex items-center gap-2 text-xs text-[#6B6B6B]">
                                    <span>{associate.assignments.companies.length} companies</span>
                                    <span>•</span>
                                    <span>{associate.assignments.agents.length} agents</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Add Associate Modal */}
            <AddAssociateModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAdd={() => {
                    setIsAddModalOpen(false)
                    addToast("success", "Associate added successfully!")
                }}
            />

            {/* Associate Detail Modal */}
            {selectedAssociate && (
                <AssociateDetailModal
                    associate={selectedAssociate}
                    isOpen={isDetailModalOpen}
                    onClose={() => {
                        setIsDetailModalOpen(false)
                        setSelectedAssociate(null)
                    }}
                />
            )}
        </div>
    )
}

// Add Associate Modal
interface AddAssociateModalProps {
    isOpen: boolean
    onClose: () => void
    onAdd: () => void
}

function AddAssociateModal({ isOpen, onClose, onAdd }: AddAssociateModalProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        city: "",
        state: "",
        timezone: "America/Los_Angeles",
        baseRate: "15",
        tieredCommission: true,
        role: "standard",
        sendWelcome: true,
    })

    const handleSubmit = () => {
        onAdd()
        setFormData({
            name: "",
            email: "",
            phone: "",
            city: "",
            state: "",
            timezone: "America/Los_Angeles",
            baseRate: "15",
            tieredCommission: true,
            role: "standard",
            sendWelcome: true,
        })
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-lg">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-[#1A1A1A]">Add New Associate</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F5F5F5] transition-colors hidden md:block"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Personal Information */}
                <div className="space-y-4">
                    <h3 className="text-sm font-medium text-[#1A1A1A] border-b border-[#E5E5E5] pb-2">
                        Personal Information
                    </h3>
                    <Input
                        label="Full Name"
                        placeholder="John Doe"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <Input
                        label="Email"
                        type="email"
                        placeholder="john@company.com"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <Input
                        label="Phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="City"
                            placeholder="San Francisco"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        />
                        <Input
                            label="State"
                            placeholder="CA"
                            value={formData.state}
                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">Timezone</label>
                        <select
                            value={formData.timezone}
                            onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                            className={cn(
                                "w-full px-3.5 py-3 md:py-2.5 text-base md:text-sm rounded-lg border",
                                "bg-white border-[#E5E5E5]",
                                "focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/10"
                            )}
                        >
                            <option value="America/Los_Angeles">Pacific Time (PST)</option>
                            <option value="America/Denver">Mountain Time (MST)</option>
                            <option value="America/Chicago">Central Time (CST)</option>
                            <option value="America/New_York">Eastern Time (EST)</option>
                        </select>
                    </div>
                </div>

                {/* Compensation */}
                <div className="space-y-4">
                    <h3 className="text-sm font-medium text-[#1A1A1A] border-b border-[#E5E5E5] pb-2">
                        Compensation
                    </h3>
                    <div>
                        <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                            Base Commission Rate (%)
                        </label>
                        <input
                            type="number"
                            value={formData.baseRate}
                            onChange={(e) => setFormData({ ...formData, baseRate: e.target.value })}
                            className={cn(
                                "w-full px-3.5 py-3 md:py-2.5 text-base md:text-sm rounded-lg border",
                                "bg-white border-[#E5E5E5]",
                                "focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/10"
                            )}
                        />
                    </div>
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={formData.tieredCommission}
                            onChange={(e) => setFormData({ ...formData, tieredCommission: e.target.checked })}
                            className="w-4 h-4 rounded border-[#E5E5E5] text-[#1A1A1A] focus:ring-[#1A1A1A]/10"
                        />
                        <span className="text-sm text-[#1A1A1A]">Enable tiered commissions</span>
                    </label>
                </div>

                {/* Access & Permissions */}
                <div className="space-y-4">
                    <h3 className="text-sm font-medium text-[#1A1A1A] border-b border-[#E5E5E5] pb-2">
                        Access & Permissions
                    </h3>
                    <div className="space-y-2">
                        {[
                            { value: "admin", label: "Full Access (Admin)" },
                            { value: "standard", label: "Sales Associate (Standard)" },
                            { value: "junior", label: "Junior Associate (Limited)" },
                        ].map((role) => (
                            <label key={role.value} className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="radio"
                                    name="role"
                                    value={role.value}
                                    checked={formData.role === role.value}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    className="w-4 h-4 border-[#E5E5E5] text-[#1A1A1A] focus:ring-[#1A1A1A]/10"
                                />
                                <span className="text-sm text-[#1A1A1A]">{role.label}</span>
                            </label>
                        ))}
                    </div>
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={formData.sendWelcome}
                            onChange={(e) => setFormData({ ...formData, sendWelcome: e.target.checked })}
                            className="w-4 h-4 rounded border-[#E5E5E5] text-[#1A1A1A] focus:ring-[#1A1A1A]/10"
                        />
                        <span className="text-sm text-[#1A1A1A]">Send welcome email with login credentials</span>
                    </label>
                </div>

                <ModalFooter>
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={!formData.name || !formData.email}>
                        Add Associate
                    </Button>
                </ModalFooter>
            </div>
        </Modal>
    )
}

// Associate Detail Modal
interface AssociateDetailModalProps {
    associate: Associate
    isOpen: boolean
    onClose: () => void
}

function AssociateDetailModal({ associate, isOpen, onClose }: AssociateDetailModalProps) {
    const [activeTab, setActiveTab] = useState<"overview" | "conversations" | "payouts" | "reviews">("overview")

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-3xl max-h-[90vh] overflow-hidden">
            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-start justify-between pb-4 border-b border-[#E5E5E5]">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-[#F5F5F5] flex items-center justify-center">
                            <span className="text-xl font-semibold text-[#6B6B6B]">{associate.initials}</span>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="text-xl font-semibold text-[#1A1A1A]">{associate.name}</h2>
                                <Badge variant={statusColors[associate.status]}>
                                    {statusLabels[associate.status]}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-4 mt-1 text-sm text-[#6B6B6B]">
                                <span className="flex items-center gap-1">
                                    <Mail className="w-3.5 h-3.5" />
                                    {associate.email}
                                </span>
                                <span className="flex items-center gap-1">
                                    <MapPin className="w-3.5 h-3.5" />
                                    {associate.location.city}, {associate.location.state}
                                </span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F5F5F5] transition-colors hidden md:block"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 py-3 border-b border-[#E5E5E5] overflow-x-auto scrollbar-hide">
                    {[
                        { id: "overview", label: "Overview" },
                        { id: "conversations", label: "Conversations" },
                        { id: "payouts", label: "Payouts" },
                        { id: "reviews", label: "Reviews" },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as typeof activeTab)}
                            className={cn(
                                "px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors",
                                activeTab === tab.id
                                    ? "bg-[#F5F5F5] text-[#1A1A1A]"
                                    : "text-[#6B6B6B] hover:text-[#1A1A1A]"
                            )}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto py-4">
                    {activeTab === "overview" && (
                        <div className="space-y-6">
                            {/* Contact Info */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="p-3 rounded-lg bg-[#FAFAFA]">
                                    <p className="text-xs text-[#6B6B6B] mb-1">Phone</p>
                                    <p className="text-sm font-medium text-[#1A1A1A]">{associate.phone}</p>
                                </div>
                                <div className="p-3 rounded-lg bg-[#FAFAFA]">
                                    <p className="text-xs text-[#6B6B6B] mb-1">Timezone</p>
                                    <p className="text-sm font-medium text-[#1A1A1A]">{associate.location.timezone}</p>
                                </div>
                                <div className="p-3 rounded-lg bg-[#FAFAFA]">
                                    <p className="text-xs text-[#6B6B6B] mb-1">Joined</p>
                                    <p className="text-sm font-medium text-[#1A1A1A]">{formatDate(associate.joinDate)}</p>
                                </div>
                                <div className="p-3 rounded-lg bg-[#FAFAFA]">
                                    <p className="text-xs text-[#6B6B6B] mb-1">Base Rate</p>
                                    <p className="text-sm font-medium text-[#1A1A1A]">{associate.compensation.baseRate}%</p>
                                </div>
                            </div>

                            {/* Assignments */}
                            <div>
                                <h3 className="text-sm font-semibold text-[#1A1A1A] mb-3">Assignments</h3>
                                <div className="space-y-3">
                                    <div className="p-4 rounded-lg border border-[#E5E5E5]">
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="text-sm font-medium text-[#1A1A1A]">Companies ({associate.assignments.companies.length})</p>
                                            <button className="text-xs text-[#6B6B6B] hover:text-[#1A1A1A]">Manage →</button>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {associate.assignments.companies.slice(0, 6).map((company) => (
                                                <span key={company} className="px-2 py-1 text-xs bg-[#F5F5F5] rounded-md text-[#6B6B6B]">
                                                    {company}
                                                </span>
                                            ))}
                                            {associate.assignments.companies.length > 6 && (
                                                <span className="px-2 py-1 text-xs text-[#6B6B6B]">
                                                    +{associate.assignments.companies.length - 6} more
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-lg border border-[#E5E5E5]">
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="text-sm font-medium text-[#1A1A1A]">AI Agents ({associate.assignments.agents.length})</p>
                                            <button className="text-xs text-[#6B6B6B] hover:text-[#1A1A1A]">View All →</button>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {associate.assignments.agents.map((agent) => (
                                                <span key={agent} className="px-2 py-1 text-xs bg-[#1A1A1A] text-white rounded-md flex items-center gap-1">
                                                    <Bot className="w-3 h-3" />
                                                    {agent}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Performance Metrics */}
                            <div>
                                <h3 className="text-sm font-semibold text-[#1A1A1A] mb-3">Performance Metrics</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="p-4 rounded-lg bg-emerald-50">
                                        <p className="text-xs text-emerald-600 mb-1">Revenue</p>
                                        <p className="text-xl font-semibold text-emerald-700">${associate.performance.revenue.toLocaleString()}</p>
                                    </div>
                                    <div className="p-4 rounded-lg bg-blue-50">
                                        <p className="text-xs text-blue-600 mb-1">Deals Closed</p>
                                        <p className="text-xl font-semibold text-blue-700">{associate.performance.dealsClosed}</p>
                                    </div>
                                    <div className="p-4 rounded-lg bg-purple-50">
                                        <p className="text-xs text-purple-600 mb-1">Conversations</p>
                                        <p className="text-xl font-semibold text-purple-700">{associate.performance.conversations}</p>
                                    </div>
                                    <div className="p-4 rounded-lg bg-amber-50">
                                        <p className="text-xs text-amber-600 mb-1">Reply Rate</p>
                                        <p className="text-xl font-semibold text-amber-700">{associate.performance.replyRate}%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "conversations" && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B6B]" />
                                    <input
                                        type="text"
                                        placeholder="Search conversations..."
                                        className={cn(
                                            "w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border",
                                            "bg-white border-[#E5E5E5]",
                                            "focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/10"
                                        )}
                                    />
                                </div>
                                <Button variant="secondary" size="sm">
                                    <Download className="w-4 h-4" />
                                    Export
                                </Button>
                            </div>

                            <div className="space-y-3">
                                {associate.conversations.map((convo) => (
                                    <div
                                        key={convo.id}
                                        className="p-4 rounded-lg border border-[#E5E5E5] hover:border-[#1A1A1A] transition-colors cursor-pointer"
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                {convo.type === "email" && <Mail className="w-4 h-4 text-blue-500" />}
                                                {convo.type === "call" && <Phone className="w-4 h-4 text-green-500" />}
                                                {convo.type === "linkedin" && <MessageSquare className="w-4 h-4 text-sky-500" />}
                                                <span className="text-sm font-medium text-[#1A1A1A]">
                                                    {convo.type === "email" ? "Email to " : convo.type === "call" ? "Call with " : "LinkedIn to "}
                                                    {convo.recipient}
                                                </span>
                                            </div>
                                            <span className="text-xs text-[#6B6B6B]">{formatTime(convo.timestamp)}</span>
                                        </div>
                                        <p className="text-sm text-[#6B6B6B] mb-2">{convo.subject}</p>
                                        <div className="flex items-center gap-3 text-xs text-[#6B6B6B]">
                                            <span>Status: {convo.status}</span>
                                            {convo.agentUsed && (
                                                <>
                                                    <span>•</span>
                                                    <span className="flex items-center gap-1">
                                                        <Bot className="w-3 h-3" />
                                                        {convo.agentUsed}
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {associate.conversations.length > 0 && (
                                <p className="text-center text-sm text-[#6B6B6B]">
                                    Showing {associate.conversations.length} of {associate.performance.conversations} conversations
                                </p>
                            )}
                        </div>
                    )}

                    {activeTab === "payouts" && (
                        <div className="space-y-6">
                            {/* Payout Summary */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="p-4 rounded-lg bg-emerald-50">
                                    <p className="text-xs text-emerald-600 mb-1">This Month</p>
                                    <p className="text-xl font-semibold text-emerald-700">${associate.compensation.thisMonth.toLocaleString()}</p>
                                </div>
                                <div className="p-4 rounded-lg bg-amber-50">
                                    <p className="text-xs text-amber-600 mb-1">Pending</p>
                                    <p className="text-xl font-semibold text-amber-700">${associate.compensation.pending.toLocaleString()}</p>
                                </div>
                                <div className="p-4 rounded-lg bg-blue-50">
                                    <p className="text-xs text-blue-600 mb-1">Lifetime</p>
                                    <p className="text-xl font-semibold text-blue-700">${associate.compensation.lifetime.toLocaleString()}</p>
                                </div>
                            </div>

                            {/* Recent Payouts */}
                            <div>
                                <h3 className="text-sm font-semibold text-[#1A1A1A] mb-3">Recent Payouts</h3>
                                <div className="border border-[#E5E5E5] rounded-lg overflow-hidden">
                                    <table className="w-full">
                                        <tbody className="divide-y divide-[#E5E5E5]">
                                            {associate.payouts.map((payout) => (
                                                <tr key={payout.id} className="hover:bg-[#FAFAFA]">
                                                    <td className="px-4 py-3 text-sm text-[#6B6B6B]">{formatDate(payout.date)}</td>
                                                    <td className="px-4 py-3 text-sm font-medium text-[#1A1A1A]">${payout.amount.toLocaleString()}</td>
                                                    <td className="px-4 py-3 text-sm text-[#6B6B6B]">{payout.description}</td>
                                                    <td className="px-4 py-3 text-right">
                                                        <button className="text-xs text-[#6B6B6B] hover:text-[#1A1A1A]">
                                                            <FileText className="w-4 h-4" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Commission Breakdown */}
                            <div className="p-4 rounded-lg bg-[#FAFAFA]">
                                <h4 className="text-sm font-medium text-[#1A1A1A] mb-2">Commission Breakdown</h4>
                                <ul className="text-sm text-[#6B6B6B] space-y-1">
                                    <li>• Base rate: {associate.compensation.baseRate}%</li>
                                    <li>• Tier 1 bonus: +3% (deals &gt; $50K)</li>
                                    <li>• Tier 2 bonus: +5% (deals &gt; $100K)</li>
                                </ul>
                            </div>
                        </div>
                    )}

                    {activeTab === "reviews" && (
                        <div className="space-y-6">
                            {/* Overall Rating */}
                            <div className="flex items-center gap-4 p-4 rounded-lg bg-[#FAFAFA]">
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-[#1A1A1A]">{associate.rating.overall}</p>
                                    {renderStars(associate.rating.overall)}
                                </div>
                                <div>
                                    <p className="text-sm text-[#6B6B6B]">{associate.rating.totalReviews} reviews</p>
                                </div>
                            </div>

                            {/* Reviews List */}
                            <div className="space-y-4">
                                {associate.reviews.map((review) => (
                                    <div key={review.id} className="p-4 rounded-lg border border-[#E5E5E5]">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                {renderStars(review.rating)}
                                                <p className="text-xs text-[#6B6B6B] mt-1">From: {review.company}</p>
                                            </div>
                                            <span className="text-xs text-[#6B6B6B]">{formatDate(review.date)}</span>
                                        </div>
                                        <p className="text-sm text-[#1A1A1A] mb-2">"{review.content}"</p>
                                        <p className="text-xs text-[#6B6B6B]">— {review.reviewer}, {review.role}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="pt-4 border-t border-[#E5E5E5]">
                    <div className="flex items-center justify-end gap-3">
                        <Button variant="secondary" onClick={onClose}>
                            Close
                        </Button>
                        <Button>
                            Edit Associate
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
