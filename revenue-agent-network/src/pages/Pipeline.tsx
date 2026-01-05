import { useState, useMemo } from "react"
import { cn } from "@/lib/utils"
import {
    Search,
    Filter,
    Download,
    ChevronUp,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    MoreHorizontal,
    X,
    Building2,
    User,
    Calendar,
    DollarSign,
    Clock,
    MessageSquare,
    ArrowRight,
} from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input, Textarea } from "@/components/ui/Input"
import { Select } from "@/components/ui/Select"
import { Badge } from "@/components/ui/Badge"
import { Modal, ModalFooter } from "@/components/ui/Modal"
import { useToast } from "@/components/ui/Toast"

// Types
type Stage = "discovery" | "demo" | "proposal" | "negotiation" | "closed_won" | "closed_lost"

interface Deal {
    id: string
    name: string
    company: string
    companyDomain: string
    value: number
    stage: Stage
    agent: string
    closeDate: string
    contact: {
        name: string
        email: string
        phone: string
        title: string
    }
    notes: string
    createdAt: string
    activities: {
        id: string
        type: string
        description: string
        date: string
    }[]
}

type SortField = "name" | "company" | "value" | "stage" | "agent" | "closeDate"
type SortDirection = "asc" | "desc"

// Stage configuration
const stageConfig: Record<Stage, { label: string; bgColor: string; textColor: string }> = {
    discovery: { label: "Discovery", bgColor: "bg-gray-100", textColor: "text-gray-700" },
    demo: { label: "Demo", bgColor: "bg-amber-50", textColor: "text-amber-700" },
    proposal: { label: "Proposal", bgColor: "bg-blue-50", textColor: "text-blue-700" },
    negotiation: { label: "Negotiation", bgColor: "bg-emerald-50", textColor: "text-emerald-700" },
    closed_won: { label: "Closed Won", bgColor: "bg-green-100", textColor: "text-green-700" },
    closed_lost: { label: "Closed Lost", bgColor: "bg-red-50", textColor: "text-red-700" },
}

// Mock data
const mockDeals: Deal[] = [
    {
        id: "1",
        name: "Enterprise Platform License",
        company: "TechCorp Industries",
        companyDomain: "techcorp.com",
        value: 85000,
        stage: "negotiation",
        agent: "Agent Alpha",
        closeDate: "2025-01-15",
        contact: { name: "Sarah Chen", email: "sarah@techcorp.com", phone: "+1 555-0123", title: "VP of Sales" },
        notes: "Final pricing discussion scheduled. Strong interest in annual contract.",
        createdAt: "2024-11-01",
        activities: [
            { id: "a1", type: "call", description: "Discovery call completed", date: "2024-11-05" },
            { id: "a2", type: "demo", description: "Product demo delivered", date: "2024-11-15" },
            { id: "a3", type: "proposal", description: "Proposal sent", date: "2024-12-01" },
            { id: "a4", type: "meeting", description: "Negotiation meeting", date: "2024-12-20" },
        ],
    },
    {
        id: "2",
        name: "Annual Subscription - Pro",
        company: "DataFlow Solutions",
        companyDomain: "dataflow.io",
        value: 42000,
        stage: "proposal",
        agent: "Agent Beta",
        closeDate: "2025-01-20",
        contact: { name: "Michael Torres", email: "m.torres@dataflow.io", phone: "+1 555-0456", title: "CTO" },
        notes: "Awaiting technical review from their engineering team.",
        createdAt: "2024-11-10",
        activities: [
            { id: "b1", type: "email", description: "Initial outreach", date: "2024-11-10" },
            { id: "b2", type: "call", description: "Discovery call", date: "2024-11-18" },
            { id: "b3", type: "demo", description: "Technical demo", date: "2024-12-05" },
        ],
    },
    {
        id: "3",
        name: "Starter Package",
        company: "CloudSync Global",
        companyDomain: "cloudsync.com",
        value: 18500,
        stage: "demo",
        agent: "Agent Gamma",
        closeDate: "2025-02-01",
        contact: { name: "Emily Watson", email: "ewatson@cloudsync.com", phone: "+1 555-0789", title: "Operations Manager" },
        notes: "Interested in starting small and scaling up.",
        createdAt: "2024-12-01",
        activities: [
            { id: "c1", type: "email", description: "Cold outreach", date: "2024-12-01" },
            { id: "c2", type: "call", description: "Intro call scheduled", date: "2024-12-10" },
        ],
    },
    {
        id: "4",
        name: "API Integration Suite",
        company: "InnovateLabs Inc",
        companyDomain: "innovatelabs.co",
        value: 67000,
        stage: "discovery",
        agent: "Agent Alpha",
        closeDate: "2025-02-15",
        contact: { name: "David Kim", email: "dkim@innovatelabs.co", phone: "+1 555-0321", title: "Head of Engineering" },
        notes: "Initial conversation about API needs and integration timeline.",
        createdAt: "2024-12-15",
        activities: [
            { id: "d1", type: "email", description: "Introduction email", date: "2024-12-15" },
        ],
    },
    {
        id: "5",
        name: "Full Platform Migration",
        company: "QuantumAI Systems",
        companyDomain: "quantumai.tech",
        value: 125000,
        stage: "closed_won",
        agent: "Agent Beta",
        closeDate: "2024-12-10",
        contact: { name: "Lisa Park", email: "lpark@quantumai.tech", phone: "+1 555-0654", title: "CEO" },
        notes: "Deal closed! 3-year contract signed. Implementation starting Q1.",
        createdAt: "2024-09-15",
        activities: [
            { id: "e1", type: "call", description: "Executive intro", date: "2024-09-20" },
            { id: "e2", type: "demo", description: "Full platform demo", date: "2024-10-05" },
            { id: "e3", type: "proposal", description: "Custom proposal", date: "2024-10-25" },
            { id: "e4", type: "meeting", description: "Contract negotiation", date: "2024-11-15" },
            { id: "e5", type: "closed", description: "Deal closed!", date: "2024-12-10" },
        ],
    },
    {
        id: "6",
        name: "Team License - 50 seats",
        company: "Nexus Digital",
        companyDomain: "nexusdigital.com",
        value: 35000,
        stage: "closed_lost",
        agent: "Agent Delta",
        closeDate: "2024-12-01",
        contact: { name: "James Wright", email: "jwright@nexusdigital.com", phone: "+1 555-0987", title: "IT Director" },
        notes: "Lost to competitor. Price was the main factor.",
        createdAt: "2024-10-01",
        activities: [
            { id: "f1", type: "call", description: "Discovery call", date: "2024-10-05" },
            { id: "f2", type: "demo", description: "Product demo", date: "2024-10-20" },
            { id: "f3", type: "lost", description: "Deal lost to competitor", date: "2024-12-01" },
        ],
    },
    {
        id: "7",
        name: "Enterprise Security Add-on",
        company: "SecureNet Corp",
        companyDomain: "securenet.io",
        value: 52000,
        stage: "proposal",
        agent: "Agent Gamma",
        closeDate: "2025-01-25",
        contact: { name: "Rachel Green", email: "rgreen@securenet.io", phone: "+1 555-1111", title: "CISO" },
        notes: "Security compliance review in progress.",
        createdAt: "2024-11-20",
        activities: [
            { id: "g1", type: "email", description: "Security inquiry", date: "2024-11-20" },
            { id: "g2", type: "call", description: "Security requirements call", date: "2024-11-28" },
            { id: "g3", type: "demo", description: "Security features demo", date: "2024-12-10" },
        ],
    },
    {
        id: "8",
        name: "Analytics Dashboard Pro",
        company: "MetricsMaster LLC",
        companyDomain: "metricsmaster.com",
        value: 29000,
        stage: "demo",
        agent: "Agent Alpha",
        closeDate: "2025-02-10",
        contact: { name: "Tom Anderson", email: "tanderson@metricsmaster.com", phone: "+1 555-2222", title: "Data Lead" },
        notes: "Very interested in real-time analytics capabilities.",
        createdAt: "2024-12-05",
        activities: [
            { id: "h1", type: "email", description: "Feature inquiry", date: "2024-12-05" },
            { id: "h2", type: "call", description: "Requirements gathering", date: "2024-12-12" },
        ],
    },
    {
        id: "9",
        name: "Startup Bundle",
        company: "LaunchPad Ventures",
        companyDomain: "launchpadvc.com",
        value: 15000,
        stage: "discovery",
        agent: "Agent Epsilon",
        closeDate: "2025-03-01",
        contact: { name: "Nina Patel", email: "nina@launchpadvc.com", phone: "+1 555-3333", title: "Partner" },
        notes: "Early stage discussion. Portfolio company referral.",
        createdAt: "2024-12-18",
        activities: [
            { id: "i1", type: "referral", description: "Referred by existing customer", date: "2024-12-18" },
        ],
    },
    {
        id: "10",
        name: "Custom Integration Package",
        company: "GlobalTech Solutions",
        companyDomain: "globaltech.com",
        value: 78000,
        stage: "negotiation",
        agent: "Agent Beta",
        closeDate: "2025-01-10",
        contact: { name: "Chris Morgan", email: "cmorgan@globaltech.com", phone: "+1 555-4444", title: "VP Engineering" },
        notes: "Final contract terms under review by legal.",
        createdAt: "2024-10-15",
        activities: [
            { id: "j1", type: "call", description: "Technical scoping", date: "2024-10-20" },
            { id: "j2", type: "demo", description: "Custom demo", date: "2024-11-05" },
            { id: "j3", type: "proposal", description: "Custom proposal sent", date: "2024-11-20" },
            { id: "j4", type: "meeting", description: "Contract review", date: "2024-12-15" },
        ],
    },
    // Add more deals for pagination demo
    ...Array.from({ length: 15 }, (_, i) => ({
        id: `${i + 11}`,
        name: `Deal ${i + 11}`,
        company: `Company ${i + 11}`,
        companyDomain: `company${i + 11}.com`,
        value: Math.floor(Math.random() * 80000) + 20000,
        stage: ["discovery", "demo", "proposal", "negotiation"][Math.floor(Math.random() * 4)] as Stage,
        agent: ["Agent Alpha", "Agent Beta", "Agent Gamma", "Agent Delta", "Agent Epsilon"][Math.floor(Math.random() * 5)],
        closeDate: `2025-0${Math.floor(Math.random() * 3) + 1}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
        contact: { name: `Contact ${i + 11}`, email: `contact${i + 11}@company.com`, phone: "+1 555-0000", title: "Manager" },
        notes: "Pipeline deal for testing pagination.",
        createdAt: "2024-12-01",
        activities: [],
    })),
]

const stageOptions = [
    { value: "all", label: "All Stages" },
    { value: "discovery", label: "Discovery" },
    { value: "demo", label: "Demo" },
    { value: "proposal", label: "Proposal" },
    { value: "negotiation", label: "Negotiation" },
    { value: "closed_won", label: "Closed Won" },
    { value: "closed_lost", label: "Closed Lost" },
]

const agentOptions = [
    { value: "all", label: "All Agents" },
    { value: "Agent Alpha", label: "Agent Alpha" },
    { value: "Agent Beta", label: "Agent Beta" },
    { value: "Agent Gamma", label: "Agent Gamma" },
    { value: "Agent Delta", label: "Agent Delta" },
    { value: "Agent Epsilon", label: "Agent Epsilon" },
]

const ITEMS_PER_PAGE = 20

export function Pipeline() {
    const { addToast } = useToast()
    const [searchQuery, setSearchQuery] = useState("")
    const [stageFilter, setStageFilter] = useState("all")
    const [agentFilter, setAgentFilter] = useState("all")
    const [sortField, setSortField] = useState<SortField>("closeDate")
    const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Filter and sort deals
    const filteredDeals = useMemo(() => {
        let result = [...mockDeals]

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            result = result.filter(
                (deal) =>
                    deal.name.toLowerCase().includes(query) ||
                    deal.company.toLowerCase().includes(query)
            )
        }

        // Stage filter
        if (stageFilter !== "all") {
            result = result.filter((deal) => deal.stage === stageFilter)
        }

        // Agent filter
        if (agentFilter !== "all") {
            result = result.filter((deal) => deal.agent === agentFilter)
        }

        // Sort
        result.sort((a, b) => {
            let comparison = 0
            switch (sortField) {
                case "name":
                    comparison = a.name.localeCompare(b.name)
                    break
                case "company":
                    comparison = a.company.localeCompare(b.company)
                    break
                case "value":
                    comparison = a.value - b.value
                    break
                case "stage":
                    comparison = a.stage.localeCompare(b.stage)
                    break
                case "agent":
                    comparison = a.agent.localeCompare(b.agent)
                    break
                case "closeDate":
                    comparison = new Date(a.closeDate).getTime() - new Date(b.closeDate).getTime()
                    break
            }
            return sortDirection === "asc" ? comparison : -comparison
        })

        return result
    }, [searchQuery, stageFilter, agentFilter, sortField, sortDirection])

    // Pagination
    const totalPages = Math.ceil(filteredDeals.length / ITEMS_PER_PAGE)
    const paginatedDeals = filteredDeals.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    )

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortField(field)
            setSortDirection("asc")
        }
    }

    const handleRowClick = (deal: Deal) => {
        setSelectedDeal(deal)
        setIsModalOpen(true)
    }

    const handleExportCSV = () => {
        const headers = ["Deal Name", "Company", "Value", "Stage", "Agent", "Close Date"]
        const rows = filteredDeals.map((deal) => [
            deal.name,
            deal.company,
            `$${deal.value.toLocaleString()}`,
            stageConfig[deal.stage].label,
            deal.agent,
            deal.closeDate,
        ])
        const csv = [headers, ...rows].map((row) => row.join(",")).join("\n")
        const blob = new Blob([csv], { type: "text/csv" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "pipeline-export.csv"
        a.click()
        URL.revokeObjectURL(url)
        addToast("success", `Exported ${filteredDeals.length} deals to CSV`)
    }

    const SortIcon = ({ field }: { field: SortField }) => {
        if (sortField !== field) return null
        return sortDirection === "asc" ? (
            <ChevronUp className="w-4 h-4" />
        ) : (
            <ChevronDown className="w-4 h-4" />
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between animate-fade-in">
                <div className="space-y-1">
                    <h1 className="text-2xl font-semibold text-[#1A1A1A] tracking-tight">
                        Pipeline
                    </h1>
                    <p className="text-[#6B6B6B]">
                        Manage and track all your deals in one place.
                    </p>
                </div>
                <Button onClick={handleExportCSV}>
                    <Download className="w-4 h-4" />
                    Export CSV
                </Button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4 animate-slide-up">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B6B]" />
                    <input
                        type="text"
                        placeholder="Search deals or companies..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value)
                            setCurrentPage(1)
                        }}
                        className={cn(
                            "w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border",
                            "bg-white border-[#E5E5E5]",
                            "placeholder:text-[#9CA3AF]",
                            "focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/10 focus:border-[#1A1A1A]",
                            "transition-all duration-200"
                        )}
                    />
                </div>
                <Select
                    options={stageOptions}
                    value={stageFilter}
                    onChange={(e) => {
                        setStageFilter(e.target.value)
                        setCurrentPage(1)
                    }}
                    className="w-40"
                />
                <Select
                    options={agentOptions}
                    value={agentFilter}
                    onChange={(e) => {
                        setAgentFilter(e.target.value)
                        setCurrentPage(1)
                    }}
                    className="w-40"
                />
            </div>

            {/* Results count */}
            <div className="text-sm text-[#6B6B6B]">
                Showing {paginatedDeals.length} of {filteredDeals.length} deals
            </div>

            {/* Table */}
            <Card className="overflow-hidden animate-slide-up stagger-1">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-[#E5E5E5] bg-[#FAFAFA]">
                                <th
                                    onClick={() => handleSort("name")}
                                    className="px-6 py-3 text-left text-xs font-medium text-[#6B6B6B] uppercase tracking-wider cursor-pointer hover:text-[#1A1A1A] transition-colors"
                                >
                                    <div className="flex items-center gap-1">
                                        Deal Name
                                        <SortIcon field="name" />
                                    </div>
                                </th>
                                <th
                                    onClick={() => handleSort("company")}
                                    className="px-4 py-3 text-left text-xs font-medium text-[#6B6B6B] uppercase tracking-wider cursor-pointer hover:text-[#1A1A1A] transition-colors"
                                >
                                    <div className="flex items-center gap-1">
                                        Company
                                        <SortIcon field="company" />
                                    </div>
                                </th>
                                <th
                                    onClick={() => handleSort("value")}
                                    className="px-4 py-3 text-left text-xs font-medium text-[#6B6B6B] uppercase tracking-wider cursor-pointer hover:text-[#1A1A1A] transition-colors"
                                >
                                    <div className="flex items-center gap-1">
                                        Value
                                        <SortIcon field="value" />
                                    </div>
                                </th>
                                <th
                                    onClick={() => handleSort("stage")}
                                    className="px-4 py-3 text-left text-xs font-medium text-[#6B6B6B] uppercase tracking-wider cursor-pointer hover:text-[#1A1A1A] transition-colors"
                                >
                                    <div className="flex items-center gap-1">
                                        Stage
                                        <SortIcon field="stage" />
                                    </div>
                                </th>
                                <th
                                    onClick={() => handleSort("agent")}
                                    className="px-4 py-3 text-left text-xs font-medium text-[#6B6B6B] uppercase tracking-wider cursor-pointer hover:text-[#1A1A1A] transition-colors"
                                >
                                    <div className="flex items-center gap-1">
                                        Agent
                                        <SortIcon field="agent" />
                                    </div>
                                </th>
                                <th
                                    onClick={() => handleSort("closeDate")}
                                    className="px-4 py-3 text-left text-xs font-medium text-[#6B6B6B] uppercase tracking-wider cursor-pointer hover:text-[#1A1A1A] transition-colors"
                                >
                                    <div className="flex items-center gap-1">
                                        Close Date
                                        <SortIcon field="closeDate" />
                                    </div>
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-[#6B6B6B] uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedDeals.map((deal) => (
                                <tr
                                    key={deal.id}
                                    onClick={() => handleRowClick(deal)}
                                    className="border-b border-[#E5E5E5] hover:bg-[#FAFAFA] transition-colors duration-150 cursor-pointer"
                                >
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-medium text-[#1A1A1A]">
                                            {deal.name}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-7 h-7 rounded-md bg-[#F5F5F5] flex items-center justify-center">
                                                <span className="text-xs font-medium text-[#6B6B6B]">
                                                    {deal.company.charAt(0)}
                                                </span>
                                            </div>
                                            <span className="text-sm text-[#1A1A1A]">{deal.company}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className="text-sm font-medium text-[#1A1A1A]">
                                            ${deal.value.toLocaleString()}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span
                                            className={cn(
                                                "inline-flex px-2.5 py-1 rounded-full text-xs font-medium",
                                                stageConfig[deal.stage].bgColor,
                                                stageConfig[deal.stage].textColor
                                            )}
                                        >
                                            {stageConfig[deal.stage].label}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className="text-sm text-[#6B6B6B]">{deal.agent}</span>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className="text-sm text-[#6B6B6B]">
                                            {new Date(deal.closeDate).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-right">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleRowClick(deal)
                                            }}
                                            className="p-2 rounded-lg text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F5F5F5] transition-colors"
                                        >
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between px-6 py-4 border-t border-[#E5E5E5]">
                        <div className="text-sm text-[#6B6B6B]">
                            Page {currentPage} of {totalPages}
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className="w-4 h-4" />
                                Previous
                            </Button>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                            >
                                Next
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                )}
            </Card>

            {/* Deal Detail Modal */}
            {selectedDeal && (
                <DealDetailModal
                    deal={selectedDeal}
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false)
                        setSelectedDeal(null)
                    }}
                />
            )}
        </div>
    )
}

// Deal Detail Modal Component
interface DealDetailModalProps {
    deal: Deal
    isOpen: boolean
    onClose: () => void
}

function DealDetailModal({ deal, isOpen, onClose }: DealDetailModalProps) {
    const { addToast } = useToast()
    const [stage, setStage] = useState(deal.stage)
    const [notes, setNotes] = useState(deal.notes)
    const [isSaving, setIsSaving] = useState(false)

    const handleSave = async () => {
        setIsSaving(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setIsSaving(false)
        addToast("success", "Deal updated successfully!")
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-[#1A1A1A]">{deal.name}</h2>
                        <p className="text-sm text-[#6B6B6B] mt-1">{deal.company}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F5F5F5] transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Deal Overview */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-[#FAFAFA]">
                        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center border border-[#E5E5E5]">
                            <DollarSign className="w-5 h-5 text-[#6B6B6B]" />
                        </div>
                        <div>
                            <p className="text-xs text-[#6B6B6B]">Deal Value</p>
                            <p className="text-lg font-semibold text-[#1A1A1A]">
                                ${deal.value.toLocaleString()}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-[#FAFAFA]">
                        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center border border-[#E5E5E5]">
                            <Calendar className="w-5 h-5 text-[#6B6B6B]" />
                        </div>
                        <div>
                            <p className="text-xs text-[#6B6B6B]">Close Date</p>
                            <p className="text-lg font-semibold text-[#1A1A1A]">
                                {new Date(deal.closeDate).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Company & Contact Info */}
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-sm font-semibold text-[#1A1A1A] mb-3 flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-[#6B6B6B]" />
                            Company
                        </h3>
                        <div className="space-y-2 text-sm">
                            <p className="text-[#1A1A1A] font-medium">{deal.company}</p>
                            <p className="text-[#6B6B6B]">{deal.companyDomain}</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-[#1A1A1A] mb-3 flex items-center gap-2">
                            <User className="w-4 h-4 text-[#6B6B6B]" />
                            Contact
                        </h3>
                        <div className="space-y-1 text-sm">
                            <p className="text-[#1A1A1A] font-medium">{deal.contact.name}</p>
                            <p className="text-[#6B6B6B]">{deal.contact.title}</p>
                            <p className="text-[#6B6B6B]">{deal.contact.email}</p>
                            <p className="text-[#6B6B6B]">{deal.contact.phone}</p>
                        </div>
                    </div>
                </div>

                {/* Stage & Agent */}
                <div className="grid grid-cols-2 gap-6">
                    <Select
                        label="Stage"
                        options={stageOptions.filter((s) => s.value !== "all")}
                        value={stage}
                        onChange={(e) => setStage(e.target.value as Stage)}
                    />
                    <div>
                        <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                            Assigned Agent
                        </label>
                        <div className="px-3.5 py-2.5 text-sm rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] text-[#6B6B6B]">
                            {deal.agent}
                        </div>
                    </div>
                </div>

                {/* Notes */}
                <div>
                    <Textarea
                        label="Notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={3}
                        placeholder="Add notes about this deal..."
                    />
                </div>

                {/* Activity Timeline */}
                {deal.activities.length > 0 && (
                    <div>
                        <h3 className="text-sm font-semibold text-[#1A1A1A] mb-4 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-[#6B6B6B]" />
                            Activity Timeline
                        </h3>
                        <div className="space-y-3">
                            {deal.activities.map((activity, index) => (
                                <div key={activity.id} className="flex items-start gap-3">
                                    <div className="relative">
                                        <div className="w-2 h-2 rounded-full bg-[#1A1A1A] mt-2" />
                                        {index < deal.activities.length - 1 && (
                                            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-px h-6 bg-[#E5E5E5]" />
                                        )}
                                    </div>
                                    <div className="flex-1 pb-2">
                                        <p className="text-sm text-[#1A1A1A]">{activity.description}</p>
                                        <p className="text-xs text-[#6B6B6B] mt-0.5">
                                            {new Date(activity.date).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E5E5E5]">
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} loading={isSaving}>
                        Save Changes
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
