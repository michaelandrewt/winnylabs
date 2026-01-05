import { useState } from "react"
import { cn } from "@/lib/utils"
import {
    DollarSign,
    TrendingUp,
    Target,
    Percent,
    Search,
    Filter,
    List,
    LayoutGrid,
    Plus,
    Building2,
    Bot,
    Calendar,
    GripVertical,
    X,
    Mail,
    Linkedin,
    ExternalLink,
    MessageSquare,
    ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Modal, ModalFooter } from "@/components/ui/Modal"
import { Input } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"
import { useToast } from "@/components/ui/Toast"

// Types
interface Deal {
    id: string
    company: string
    value: number
    stage: "discovery" | "demo" | "proposal" | "negotiation"
    agent: string
    closeDate: string
    probability: number
    contact: {
        name: string
        role: string
        email: string
    }
}

// Mock data
const mockDeals: Deal[] = [
    {
        id: "1",
        company: "Anthropic",
        value: 23000,
        stage: "negotiation",
        agent: "Agent-AI-01",
        closeDate: "Feb 5, 2025",
        probability: 85,
        contact: { name: "John Doe", role: "VP Engineering", email: "john@anthropic.com" },
    },
    {
        id: "2",
        company: "Mistral AI",
        value: 45000,
        stage: "demo",
        agent: "Agent-AI-02",
        closeDate: "Feb 12, 2025",
        probability: 45,
        contact: { name: "Sarah Chen", role: "CTO", email: "sarah@mistral.ai" },
    },
    {
        id: "3",
        company: "Cohere",
        value: 18000,
        stage: "proposal",
        agent: "Agent-AI-01",
        closeDate: "Feb 8, 2025",
        probability: 65,
        contact: { name: "Mike Ross", role: "Head of Ops", email: "mike@cohere.ai" },
    },
    {
        id: "4",
        company: "Perplexity",
        value: 35000,
        stage: "discovery",
        agent: "Agent-AI-01",
        closeDate: "Feb 20, 2025",
        probability: 25,
        contact: { name: "Lisa Park", role: "CEO", email: "lisa@perplexity.ai" },
    },
    {
        id: "5",
        company: "Runway",
        value: 28000,
        stage: "discovery",
        agent: "Agent-AI-02",
        closeDate: "Feb 18, 2025",
        probability: 30,
        contact: { name: "Alex Kim", role: "VP Sales", email: "alex@runway.ml" },
    },
    {
        id: "6",
        company: "Stability AI",
        value: 52000,
        stage: "demo",
        agent: "Agent-AI-01",
        closeDate: "Feb 15, 2025",
        probability: 50,
        contact: { name: "Emma Davis", role: "CRO", email: "emma@stability.ai" },
    },
    {
        id: "7",
        company: "Character.AI",
        value: 15000,
        stage: "proposal",
        agent: "Agent-AI-02",
        closeDate: "Feb 10, 2025",
        probability: 70,
        contact: { name: "Tom Wilson", role: "VP Product", email: "tom@character.ai" },
    },
]

const stages = [
    { id: "discovery", label: "Discovery", color: "bg-gray-100 text-gray-700" },
    { id: "demo", label: "Demo", color: "bg-amber-100 text-amber-700" },
    { id: "proposal", label: "Proposal", color: "bg-blue-100 text-blue-700" },
    { id: "negotiation", label: "Negotiation", color: "bg-emerald-100 text-emerald-700" },
]

const formatCurrency = (amount: number): string => {
    if (amount >= 1000) {
        return `$${(amount / 1000).toFixed(0)}K`
    }
    return `$${amount.toLocaleString()}`
}

export function ClientPipeline() {
    const { addToast } = useToast()
    const [deals, setDeals] = useState<Deal[]>(mockDeals)
    const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban")
    const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)

    const metrics = {
        totalPipeline: deals.reduce((sum, d) => sum + d.value, 0),
        weightedForecast: deals.reduce((sum, d) => sum + (d.value * d.probability / 100), 0),
        closeThisQtr: deals.filter(d => d.stage === "negotiation" || d.stage === "proposal").reduce((sum, d) => sum + d.value, 0),
        winRate: 42,
    }

    const getDealsByStage = (stageId: string) =>
        deals.filter((d) => d.stage === stageId)

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                    <h1 className="text-xl md:text-2xl font-semibold text-[#1A1A1A] tracking-tight">
                        Pipeline
                    </h1>
                    <p className="text-sm text-[#6B6B6B]">
                        Manage your deals and track progress
                    </p>
                </div>
                <Button onClick={() => setIsAddModalOpen(true)}>
                    <Plus className="w-4 h-4" />
                    Add Deal
                </Button>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <MetricCard icon={DollarSign} label="Total Pipeline" value={formatCurrency(metrics.totalPipeline)} />
                <MetricCard icon={TrendingUp} label="Weighted Forecast" value={formatCurrency(metrics.weightedForecast)} />
                <MetricCard icon={Target} label="Close This Qtr" value={formatCurrency(metrics.closeThisQtr)} />
                <MetricCard icon={Percent} label="Win Rate" value={`${metrics.winRate}%`} />
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B6B]" />
                    <input
                        type="text"
                        placeholder="Search deals..."
                        className={cn(
                            "w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border",
                            "bg-white border-[#E5E5E5]",
                            "focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        )}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="secondary" size="sm">
                        <Filter className="w-4 h-4" />
                        Filter
                    </Button>
                    <div className="flex items-center gap-1 border border-[#E5E5E5] rounded-lg p-1">
                        <button
                            onClick={() => setViewMode("kanban")}
                            className={cn(
                                "p-1.5 rounded-md transition-colors",
                                viewMode === "kanban" ? "bg-[#F5F5F5] text-[#1A1A1A]" : "text-[#6B6B6B]"
                            )}
                        >
                            <LayoutGrid className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode("table")}
                            className={cn(
                                "p-1.5 rounded-md transition-colors",
                                viewMode === "table" ? "bg-[#F5F5F5] text-[#1A1A1A]" : "text-[#6B6B6B]"
                            )}
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Kanban View */}
            {viewMode === "kanban" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stages.map((stage) => (
                        <div key={stage.id} className="bg-[#F5F5F5] rounded-lg p-3">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-sm font-semibold text-[#1A1A1A]">
                                    {stage.label}
                                </h3>
                                <span className="text-xs text-[#6B6B6B] bg-white px-2 py-0.5 rounded-full">
                                    {getDealsByStage(stage.id).length}
                                </span>
                            </div>
                            <div className="space-y-3">
                                {getDealsByStage(stage.id).map((deal) => (
                                    <DealCard
                                        key={deal.id}
                                        deal={deal}
                                        onClick={() => setSelectedDeal(deal)}
                                    />
                                ))}
                            </div>
                            <button className="w-full mt-3 py-2 text-sm text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-white rounded-lg transition-colors">
                                <Plus className="w-4 h-4 inline mr-1" />
                                Add Deal
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                /* Table View */
                <div className="bg-white rounded-lg border border-[#E5E5E5] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[700px]">
                            <thead>
                                <tr className="border-b border-[#E5E5E5] bg-[#FAFAFA]">
                                    <th className="px-4 py-3 text-left text-xs font-medium text-[#6B6B6B] uppercase">Company</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-[#6B6B6B] uppercase">Value</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-[#6B6B6B] uppercase">Stage</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-[#6B6B6B] uppercase">Agent</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-[#6B6B6B] uppercase">Close Date</th>
                                    <th className="px-4 py-3"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#E5E5E5]">
                                {deals.map((deal) => (
                                    <tr
                                        key={deal.id}
                                        className="hover:bg-[#FAFAFA] cursor-pointer"
                                        onClick={() => setSelectedDeal(deal)}
                                    >
                                        <td className="px-4 py-4">
                                            <p className="text-sm font-medium text-[#1A1A1A]">{deal.company}</p>
                                        </td>
                                        <td className="px-4 py-4">
                                            <p className="text-sm font-semibold text-[#1A1A1A]">{formatCurrency(deal.value)}</p>
                                        </td>
                                        <td className="px-4 py-4">
                                            <Badge variant={deal.stage === "negotiation" ? "success" : deal.stage === "demo" ? "warning" : "default"}>
                                                {stages.find(s => s.id === deal.stage)?.label}
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-4">
                                            <p className="text-sm text-[#6B6B6B]">{deal.agent}</p>
                                        </td>
                                        <td className="px-4 py-4">
                                            <p className="text-sm text-[#6B6B6B]">{deal.closeDate}</p>
                                        </td>
                                        <td className="px-4 py-4">
                                            <ChevronRight className="w-4 h-4 text-[#6B6B6B]" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Stage Velocity */}
            <p className="text-sm text-[#6B6B6B] text-center">
                Avg time in stage: Discovery 12d | Demo 8d | Proposal 14d | Negotiation 6d
            </p>

            {/* Deal Detail Modal */}
            {selectedDeal && (
                <DealDetailModal
                    deal={selectedDeal}
                    onClose={() => setSelectedDeal(null)}
                />
            )}

            {/* Add Deal Modal */}
            <AddDealModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAdd={() => {
                    setIsAddModalOpen(false)
                    addToast("success", "Deal created successfully!")
                }}
            />
        </div>
    )
}

// Metric Card
function MetricCard({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
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

// Deal Card (Kanban)
function DealCard({ deal, onClick }: { deal: Deal; onClick: () => void }) {
    return (
        <div
            onClick={onClick}
            className={cn(
                "bg-white rounded-lg border border-[#E5E5E5] p-4 cursor-pointer",
                "hover:border-[#1A1A1A] hover:shadow-sm transition-all"
            )}
        >
            <div className="flex items-start justify-between mb-2">
                <h4 className="text-sm font-semibold text-[#1A1A1A]">{deal.company}</h4>
                <GripVertical className="w-4 h-4 text-[#E5E5E5] opacity-0 group-hover:opacity-100" />
            </div>
            <p className="text-lg font-semibold text-blue-600 mb-2">{formatCurrency(deal.value)}</p>
            <div className="flex items-center gap-2 text-xs text-[#6B6B6B] mb-3">
                <Bot className="w-3.5 h-3.5" />
                {deal.agent}
            </div>
            <div className="flex items-center justify-between">
                <span className="text-xs text-[#6B6B6B]">{deal.closeDate}</span>
                <div className="flex items-center gap-1">
                    <div className="w-16 h-1 bg-[#F5F5F5] rounded-full overflow-hidden">
                        <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${deal.probability}%` }}
                        />
                    </div>
                    <span className="text-xs text-[#6B6B6B]">{deal.probability}%</span>
                </div>
            </div>
        </div>
    )
}

// Deal Detail Modal
function DealDetailModal({ deal, onClose }: { deal: Deal; onClose: () => void }) {
    return (
        <Modal isOpen={true} onClose={onClose} className="max-w-2xl">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h2 className="text-xl font-semibold text-[#1A1A1A]">{deal.company}</h2>
                            <Badge variant={deal.stage === "negotiation" ? "success" : "default"}>
                                {stages.find(s => s.id === deal.stage)?.label}
                            </Badge>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">{formatCurrency(deal.value)}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F5F5F5]"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-6">
                        {/* Deal Info */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-[#1A1A1A]">Deal Information</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-[#6B6B6B]">Probability</p>
                                    <p className="font-medium text-[#1A1A1A]">{deal.probability}%</p>
                                </div>
                                <div>
                                    <p className="text-[#6B6B6B]">Close Date</p>
                                    <p className="font-medium text-[#1A1A1A]">{deal.closeDate}</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-[#1A1A1A]">Contact</h3>
                            <div className="p-4 rounded-lg bg-[#FAFAFA]">
                                <p className="font-medium text-[#1A1A1A] mb-1">{deal.contact.name}</p>
                                <p className="text-sm text-[#6B6B6B] mb-2">{deal.contact.role}</p>
                                <p className="text-sm text-[#6B6B6B]">{deal.contact.email}</p>
                                <div className="flex items-center gap-2 mt-3">
                                    <Button variant="secondary" size="sm">
                                        <Mail className="w-4 h-4" />
                                        Email
                                    </Button>
                                    <Button variant="secondary" size="sm">
                                        <Linkedin className="w-4 h-4" />
                                        LinkedIn
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Agent */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-[#1A1A1A]">Assigned Agent</h3>
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-[#FAFAFA]">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                                    <Bot className="w-4 h-4 text-white" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-[#1A1A1A]">{deal.agent}</p>
                                </div>
                                <button className="text-xs text-[#6B6B6B] hover:text-[#1A1A1A]">
                                    View Config →
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Activity */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-[#1A1A1A]">Activity Timeline</h3>
                        <div className="space-y-3">
                            {[
                                { action: "Demo scheduled", time: "Today" },
                                { action: "Follow-up sent", time: "2d ago" },
                                { action: "Initial contact", time: "5d ago" },
                                { action: "Lead qualified", time: "7d ago" },
                            ].map((activity, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-500" />
                                    <div>
                                        <p className="text-sm text-[#1A1A1A]">{activity.action}</p>
                                        <p className="text-xs text-[#6B6B6B]">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A]">
                            View Full History →
                        </button>
                    </div>
                </div>

                <ModalFooter>
                    <Button variant="secondary" onClick={onClose}>Close</Button>
                    <Button variant="danger">Mark as Lost</Button>
                    <Button>Mark as Won</Button>
                </ModalFooter>
            </div>
        </Modal>
    )
}

// Add Deal Modal
function AddDealModal({ isOpen, onClose, onAdd }: { isOpen: boolean; onClose: () => void; onAdd: () => void }) {
    const [formData, setFormData] = useState({
        company: "",
        value: "",
        closeDate: "",
        product: "",
    })

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-md">
            <div className="space-y-6">
                <h2 className="text-xl font-semibold text-[#1A1A1A]">Add Deal</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">Company</label>
                        <select
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        >
                            <option value="">Select company...</option>
                            <option value="anthropic">Anthropic</option>
                            <option value="mistral">Mistral AI</option>
                            <option value="cohere">Cohere</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">Product</label>
                        <select
                            value={formData.product}
                            onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        >
                            <option value="">Select product...</option>
                            <option value="api">AI Infrastructure API</option>
                            <option value="platform">Enterprise Platform</option>
                        </select>
                    </div>
                    <Input
                        label="Value"
                        type="number"
                        placeholder="$25,000"
                        value={formData.value}
                        onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    />
                    <Input
                        label="Expected Close Date"
                        type="date"
                        value={formData.closeDate}
                        onChange={(e) => setFormData({ ...formData, closeDate: e.target.value })}
                    />
                </div>

                <ModalFooter>
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button onClick={onAdd}>Create Deal</Button>
                </ModalFooter>
            </div>
        </Modal>
    )
}
