import { useState } from "react"
import { cn } from "@/lib/utils"
import {
    Plus,
    Search,
    Bot,
    Building2,
    Package,
    TrendingUp,
    Mail,
    DollarSign,
    Activity,
    MoreHorizontal,
    X,
    ChevronRight,
    Zap,
    Clock,
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Select } from "@/components/ui/Select"
import { Slider } from "@/components/ui/Slider"
import { Checkbox } from "@/components/ui/Checkbox"
import { Badge } from "@/components/ui/Badge"
import { Modal, ModalFooter } from "@/components/ui/Modal"
import { useToast } from "@/components/ui/Toast"

// Types
interface Agent {
    id: string
    name: string
    specialization: string
    companies: string[]
    products: string[]
    personalizationLevel: number
    followUpCadence: string
    aiModel: string
    baseRate: number
    bonusThreshold: number
    bonusRate: number
    status: "active" | "paused"
    activeDeals: number
    replyRate: number
    revenueMTD: number
    createdAt: string
    recentActivity: { id: string; description: string; date: string }[]
}

// Mock data
const mockCompanies = [
    { id: "1", name: "TechCorp Industries", sector: "Technology" },
    { id: "2", name: "DataFlow Solutions", sector: "SaaS" },
    { id: "3", name: "CloudSync Global", sector: "Cloud" },
    { id: "4", name: "InnovateLabs Inc", sector: "AI/ML" },
    { id: "5", name: "QuantumAI Systems", sector: "AI/ML" },
    { id: "6", name: "SecureNet Corp", sector: "Security" },
    { id: "7", name: "MetricsMaster LLC", sector: "Analytics" },
    { id: "8", name: "FinanceHub Pro", sector: "Fintech" },
]

const mockProducts = [
    { id: "1", name: "Enterprise Platform", type: "Software" },
    { id: "2", name: "API Integration Suite", type: "Service" },
    { id: "3", name: "Analytics Dashboard", type: "Software" },
    { id: "4", name: "Security Add-on", type: "Add-on" },
    { id: "5", name: "Support Package", type: "Service" },
]

const mockAgents: Agent[] = [
    {
        id: "1",
        name: "Agent-Alpha-01",
        specialization: "SaaS",
        companies: ["1", "4", "7"],
        products: ["1", "3"],
        personalizationLevel: 80,
        followUpCadence: "moderate",
        aiModel: "claude-sonnet-4",
        baseRate: 10,
        bonusThreshold: 50000,
        bonusRate: 5,
        status: "active",
        activeDeals: 8,
        replyRate: 24,
        revenueMTD: 89000,
        createdAt: "2024-10-15",
        recentActivity: [
            { id: "a1", description: "Closed deal with TechCorp - $45K", date: "2024-12-24" },
            { id: "a2", description: "Sent 12 follow-up emails", date: "2024-12-23" },
            { id: "a3", description: "New lead qualified - InnovateLabs", date: "2024-12-22" },
        ],
    },
    {
        id: "2",
        name: "Agent-Beta-02",
        specialization: "Fintech",
        companies: ["8"],
        products: ["1", "2", "4"],
        personalizationLevel: 70,
        followUpCadence: "light",
        aiModel: "gpt-4",
        baseRate: 12,
        bonusThreshold: 40000,
        bonusRate: 4,
        status: "active",
        activeDeals: 5,
        replyRate: 18,
        revenueMTD: 72000,
        createdAt: "2024-11-01",
        recentActivity: [
            { id: "b1", description: "Proposal sent to FinanceHub", date: "2024-12-24" },
            { id: "b2", description: "Demo scheduled for next week", date: "2024-12-22" },
        ],
    },
    {
        id: "3",
        name: "Agent-Gamma-03",
        specialization: "Healthcare",
        companies: ["2", "3"],
        products: ["1", "5"],
        personalizationLevel: 90,
        followUpCadence: "aggressive",
        aiModel: "claude-sonnet-4",
        baseRate: 8,
        bonusThreshold: 60000,
        bonusRate: 6,
        status: "active",
        activeDeals: 6,
        replyRate: 31,
        revenueMTD: 58000,
        createdAt: "2024-11-15",
        recentActivity: [
            { id: "c1", description: "High-value lead identified", date: "2024-12-23" },
        ],
    },
    {
        id: "4",
        name: "Agent-Delta-04",
        specialization: "AI/ML",
        companies: ["4", "5"],
        products: ["2", "3"],
        personalizationLevel: 60,
        followUpCadence: "moderate",
        aiModel: "gemini-pro",
        baseRate: 10,
        bonusThreshold: 45000,
        bonusRate: 5,
        status: "paused",
        activeDeals: 3,
        replyRate: 15,
        revenueMTD: 45000,
        createdAt: "2024-12-01",
        recentActivity: [
            { id: "d1", description: "Agent paused for reconfiguration", date: "2024-12-20" },
        ],
    },
    {
        id: "5",
        name: "Agent-Epsilon-05",
        specialization: "Generalist",
        companies: ["6"],
        products: ["1", "2", "4", "5"],
        personalizationLevel: 50,
        followUpCadence: "light",
        aiModel: "gpt-4",
        baseRate: 8,
        bonusThreshold: 30000,
        bonusRate: 3,
        status: "active",
        activeDeals: 4,
        replyRate: 12,
        revenueMTD: 32000,
        createdAt: "2024-12-10",
        recentActivity: [
            { id: "e1", description: "Started outreach to SecureNet", date: "2024-12-21" },
        ],
    },
]

const specializationOptions = [
    { value: "fintech", label: "Fintech" },
    { value: "healthcare", label: "Healthcare" },
    { value: "ai-ml", label: "AI/ML" },
    { value: "saas", label: "SaaS" },
    { value: "generalist", label: "Generalist" },
]

const cadenceOptions = [
    { value: "light", label: "Light (1-2 touches/week)" },
    { value: "moderate", label: "Moderate (3-4 touches/week)" },
    { value: "aggressive", label: "Aggressive (5+ touches/week)" },
]

const modelOptions = [
    { value: "claude-sonnet-4", label: "Claude Sonnet 4" },
    { value: "gpt-4", label: "GPT-4" },
    { value: "gemini-pro", label: "Gemini Pro" },
]

export function Agents() {
    const { addToast } = useToast()
    const [agents, setAgents] = useState<Agent[]>(mockAgents)
    const [searchQuery, setSearchQuery] = useState("")
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

    const filteredAgents = agents.filter(
        (agent) =>
            agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            agent.specialization.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleStatusToggle = (agentId: string) => {
        setAgents((prev) =>
            prev.map((agent) =>
                agent.id === agentId
                    ? { ...agent, status: agent.status === "active" ? "paused" : "active" }
                    : agent
            )
        )
        const agent = agents.find((a) => a.id === agentId)
        addToast(
            "success",
            `${agent?.name} ${agent?.status === "active" ? "paused" : "activated"}`
        )
    }

    const handleRowClick = (agent: Agent) => {
        setSelectedAgent(agent)
        setIsDetailModalOpen(true)
    }

    const handleAgentCreated = (newAgent: Agent) => {
        setAgents((prev) => [...prev, newAgent])
        setIsCreateModalOpen(false)
        addToast("success", `${newAgent.name} launched successfully!`)
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between animate-fade-in">
                <div className="space-y-1">
                    <h1 className="text-2xl font-semibold text-[#1A1A1A] tracking-tight">
                        Agents
                    </h1>
                    <p className="text-[#6B6B6B]">
                        Create and manage your AI sales agents.
                    </p>
                </div>
                <Button onClick={() => setIsCreateModalOpen(true)}>
                    <Plus className="w-4 h-4" />
                    Create Agent
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 animate-slide-up">
                <div className="bg-white rounded-lg border border-[#E5E5E5] p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#F5F5F5] flex items-center justify-center">
                            <Bot className="w-5 h-5 text-[#6B6B6B]" />
                        </div>
                        <div>
                            <p className="text-xs text-[#6B6B6B]">Total Agents</p>
                            <p className="text-xl font-semibold text-[#1A1A1A]">{agents.length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg border border-[#E5E5E5] p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                            <Activity className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-xs text-[#6B6B6B]">Active</p>
                            <p className="text-xl font-semibold text-[#1A1A1A]">
                                {agents.filter((a) => a.status === "active").length}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg border border-[#E5E5E5] p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-xs text-[#6B6B6B]">Total Deals</p>
                            <p className="text-xl font-semibold text-[#1A1A1A]">
                                {agents.reduce((sum, a) => sum + a.activeDeals, 0)}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg border border-[#E5E5E5] p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#F5F5F5] flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-[#6B6B6B]" />
                        </div>
                        <div>
                            <p className="text-xs text-[#6B6B6B]">Revenue MTD</p>
                            <p className="text-xl font-semibold text-[#1A1A1A]">
                                ${(agents.reduce((sum, a) => sum + a.revenueMTD, 0) / 1000).toFixed(0)}K
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="flex items-center gap-4 animate-slide-up stagger-1">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B6B]" />
                    <input
                        type="text"
                        placeholder="Search agents..."
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
            </div>

            {/* Agents Table */}
            <Card className="overflow-hidden animate-slide-up stagger-2">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-[#E5E5E5] bg-[#FAFAFA]">
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B6B6B] uppercase tracking-wider">
                                    Agent Name
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-[#6B6B6B] uppercase tracking-wider">
                                    Type
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-[#6B6B6B] uppercase tracking-wider">
                                    Companies
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-[#6B6B6B] uppercase tracking-wider">
                                    Active Deals
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-[#6B6B6B] uppercase tracking-wider">
                                    Reply Rate
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-[#6B6B6B] uppercase tracking-wider">
                                    Revenue MTD
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-[#6B6B6B] uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-[#6B6B6B] uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAgents.map((agent) => (
                                <tr
                                    key={agent.id}
                                    onClick={() => handleRowClick(agent)}
                                    className="border-b border-[#E5E5E5] hover:bg-[#FAFAFA] transition-colors duration-150 cursor-pointer"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] flex items-center justify-center">
                                                <Bot className="w-4 h-4 text-white" />
                                            </div>
                                            <span className="text-sm font-medium text-[#1A1A1A]">
                                                {agent.name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <Badge variant="default">{agent.specialization}</Badge>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className="text-sm text-[#6B6B6B]">
                                            {agent.companies.length} assigned
                                        </span>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className="text-sm font-medium text-[#1A1A1A]">
                                            {agent.activeDeals}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className="text-sm text-[#1A1A1A]">{agent.replyRate}%</span>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className="text-sm font-medium text-[#1A1A1A]">
                                            ${agent.revenueMTD.toLocaleString()}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleStatusToggle(agent.id)
                                            }}
                                            className={cn(
                                                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200",
                                                agent.status === "active" ? "bg-emerald-500" : "bg-gray-300"
                                            )}
                                        >
                                            <span
                                                className={cn(
                                                    "inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 shadow-sm",
                                                    agent.status === "active" ? "translate-x-6" : "translate-x-1"
                                                )}
                                            />
                                        </button>
                                    </td>
                                    <td className="px-4 py-4 text-right">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleRowClick(agent)
                                            }}
                                            className="p-2 rounded-lg text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F5F5F5] transition-colors"
                                        >
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Create Agent Modal */}
            <CreateAgentModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onAgentCreated={handleAgentCreated}
            />

            {/* Agent Detail Modal */}
            {selectedAgent && (
                <AgentDetailModal
                    agent={selectedAgent}
                    isOpen={isDetailModalOpen}
                    onClose={() => {
                        setIsDetailModalOpen(false)
                        setSelectedAgent(null)
                    }}
                />
            )}
        </div>
    )
}

// Create Agent Modal
interface CreateAgentModalProps {
    isOpen: boolean
    onClose: () => void
    onAgentCreated: (agent: Agent) => void
}

function CreateAgentModal({ isOpen, onClose, onAgentCreated }: CreateAgentModalProps) {
    const [isLaunching, setIsLaunching] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        specialization: "saas",
        companies: [] as string[],
        products: [] as string[],
        personalizationLevel: 70,
        followUpCadence: "moderate",
        aiModel: "claude-sonnet-4",
        baseRate: "10",
        bonusThreshold: "50000",
        bonusRate: "5",
    })

    const handleCompanyToggle = (companyId: string) => {
        if (formData.companies.includes(companyId)) {
            setFormData({
                ...formData,
                companies: formData.companies.filter((id) => id !== companyId),
            })
        } else if (formData.companies.length < 5) {
            setFormData({
                ...formData,
                companies: [...formData.companies, companyId],
            })
        }
    }

    const handleProductToggle = (productId: string) => {
        if (formData.products.includes(productId)) {
            setFormData({
                ...formData,
                products: formData.products.filter((id) => id !== productId),
            })
        } else {
            setFormData({
                ...formData,
                products: [...formData.products, productId],
            })
        }
    }

    const handleLaunch = async () => {
        setIsLaunching(true)
        await new Promise((resolve) => setTimeout(resolve, 1500))

        const newAgent: Agent = {
            id: `${Date.now()}`,
            name: formData.name,
            specialization: specializationOptions.find((s) => s.value === formData.specialization)?.label || "Generalist",
            companies: formData.companies,
            products: formData.products,
            personalizationLevel: formData.personalizationLevel,
            followUpCadence: formData.followUpCadence,
            aiModel: formData.aiModel,
            baseRate: parseInt(formData.baseRate) || 10,
            bonusThreshold: parseInt(formData.bonusThreshold) || 50000,
            bonusRate: parseInt(formData.bonusRate) || 5,
            status: "active",
            activeDeals: 0,
            replyRate: 0,
            revenueMTD: 0,
            createdAt: new Date().toISOString().split("T")[0],
            recentActivity: [
                { id: "new", description: "Agent launched", date: new Date().toISOString().split("T")[0] },
            ],
        }

        setIsLaunching(false)
        onAgentCreated(newAgent)

        // Reset form
        setFormData({
            name: "",
            specialization: "saas",
            companies: [],
            products: [],
            personalizationLevel: 70,
            followUpCadence: "moderate",
            aiModel: "claude-sonnet-4",
            baseRate: "10",
            bonusThreshold: "50000",
            bonusRate: "5",
        })
    }

    const isFormValid = formData.name.trim().length > 0 && formData.companies.length > 0 && formData.products.length > 0

    const getPersonalizationLabel = (value: number) => {
        if (value <= 33) return "Low"
        if (value <= 66) return "Medium"
        return "High"
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-[#1A1A1A]">Create New Agent</h2>
                        <p className="text-sm text-[#6B6B6B] mt-1">Configure your AI sales agent</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F5F5F5] transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Agent Name"
                        placeholder="e.g., Agent-Finance-01"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <Select
                        label="Specialization"
                        options={specializationOptions}
                        value={formData.specialization}
                        onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    />
                </div>

                {/* Assigned Companies */}
                <div>
                    <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                        Assigned Companies <span className="text-[#6B6B6B]">(max 5)</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2 p-4 rounded-lg bg-[#FAFAFA] max-h-40 overflow-y-auto">
                        {mockCompanies.map((company) => (
                            <Checkbox
                                key={company.id}
                                label={company.name}
                                description={company.sector}
                                checked={formData.companies.includes(company.id)}
                                onChange={() => handleCompanyToggle(company.id)}
                                disabled={!formData.companies.includes(company.id) && formData.companies.length >= 5}
                            />
                        ))}
                    </div>
                    <p className="text-xs text-[#6B6B6B] mt-1">
                        {formData.companies.length}/5 companies selected
                    </p>
                </div>

                {/* Products to Sell */}
                <div>
                    <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                        Products to Sell
                    </label>
                    <div className="grid grid-cols-2 gap-2 p-4 rounded-lg bg-[#FAFAFA]">
                        {mockProducts.map((product) => (
                            <Checkbox
                                key={product.id}
                                label={product.name}
                                description={product.type}
                                checked={formData.products.includes(product.id)}
                                onChange={() => handleProductToggle(product.id)}
                            />
                        ))}
                    </div>
                </div>

                {/* Outreach Configuration */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-[#1A1A1A]">Outreach Configuration</h3>

                    <Slider
                        label="AI Personalization"
                        min={0}
                        max={100}
                        value={formData.personalizationLevel}
                        onChange={(value) => setFormData({ ...formData, personalizationLevel: value })}
                        valueFormatter={(v) => getPersonalizationLabel(v)}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <Select
                            label="Follow-up Cadence"
                            options={cadenceOptions}
                            value={formData.followUpCadence}
                            onChange={(e) => setFormData({ ...formData, followUpCadence: e.target.value })}
                        />
                        <Select
                            label="AI Model"
                            options={modelOptions}
                            value={formData.aiModel}
                            onChange={(e) => setFormData({ ...formData, aiModel: e.target.value })}
                        />
                    </div>
                </div>

                {/* Commission Structure */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-[#1A1A1A]">Commission Structure</h3>
                    <div className="grid grid-cols-3 gap-4">
                        <Input
                            label="Base Rate (%)"
                            type="number"
                            value={formData.baseRate}
                            onChange={(e) => setFormData({ ...formData, baseRate: e.target.value })}
                        />
                        <Input
                            label="Bonus Threshold ($)"
                            type="number"
                            value={formData.bonusThreshold}
                            onChange={(e) => setFormData({ ...formData, bonusThreshold: e.target.value })}
                        />
                        <Input
                            label="Bonus Rate (%)"
                            type="number"
                            value={formData.bonusRate}
                            onChange={(e) => setFormData({ ...formData, bonusRate: e.target.value })}
                        />
                    </div>
                    <p className="text-xs text-[#6B6B6B]">
                        Deals over ${parseInt(formData.bonusThreshold || "0").toLocaleString()} → +{formData.bonusRate || 0}% commission
                    </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E5E5E5]">
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleLaunch} loading={isLaunching} disabled={!isFormValid}>
                        <Zap className="w-4 h-4" />
                        Launch Agent
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

// Agent Detail Modal
interface AgentDetailModalProps {
    agent: Agent
    isOpen: boolean
    onClose: () => void
}

function AgentDetailModal({ agent, isOpen, onClose }: AgentDetailModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#1A1A1A] flex items-center justify-center">
                            <Bot className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-[#1A1A1A]">{agent.name}</h2>
                            <div className="flex items-center gap-2 mt-1">
                                <Badge variant="default">{agent.specialization}</Badge>
                                <Badge variant={agent.status === "active" ? "success" : "warning"}>
                                    {agent.status === "active" ? "Active" : "Paused"}
                                </Badge>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F5F5F5] transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-4 gap-4">
                    <div className="p-4 rounded-lg bg-[#FAFAFA]">
                        <p className="text-xs text-[#6B6B6B]">Active Deals</p>
                        <p className="text-2xl font-semibold text-[#1A1A1A]">{agent.activeDeals}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-[#FAFAFA]">
                        <p className="text-xs text-[#6B6B6B]">Reply Rate</p>
                        <p className="text-2xl font-semibold text-[#1A1A1A]">{agent.replyRate}%</p>
                    </div>
                    <div className="p-4 rounded-lg bg-[#FAFAFA]">
                        <p className="text-xs text-[#6B6B6B]">Revenue MTD</p>
                        <p className="text-2xl font-semibold text-[#1A1A1A]">${(agent.revenueMTD / 1000).toFixed(0)}K</p>
                    </div>
                    <div className="p-4 rounded-lg bg-[#FAFAFA]">
                        <p className="text-xs text-[#6B6B6B]">Commission</p>
                        <p className="text-2xl font-semibold text-[#1A1A1A]">{agent.baseRate}%</p>
                    </div>
                </div>

                {/* Configuration */}
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-sm font-semibold text-[#1A1A1A] mb-3 flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-[#6B6B6B]" />
                            Assigned Companies
                        </h3>
                        <div className="space-y-2">
                            {agent.companies.map((companyId) => {
                                const company = mockCompanies.find((c) => c.id === companyId)
                                return company ? (
                                    <div key={companyId} className="flex items-center gap-2 text-sm">
                                        <div className="w-6 h-6 rounded bg-[#F5F5F5] flex items-center justify-center">
                                            <span className="text-xs font-medium text-[#6B6B6B]">
                                                {company.name.charAt(0)}
                                            </span>
                                        </div>
                                        <span className="text-[#1A1A1A]">{company.name}</span>
                                    </div>
                                ) : null
                            })}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-[#1A1A1A] mb-3 flex items-center gap-2">
                            <Package className="w-4 h-4 text-[#6B6B6B]" />
                            Products
                        </h3>
                        <div className="space-y-2">
                            {agent.products.map((productId) => {
                                const product = mockProducts.find((p) => p.id === productId)
                                return product ? (
                                    <div key={productId} className="flex items-center gap-2 text-sm">
                                        <div className="w-6 h-6 rounded bg-[#F5F5F5] flex items-center justify-center">
                                            <Package className="w-3 h-3 text-[#6B6B6B]" />
                                        </div>
                                        <span className="text-[#1A1A1A]">{product.name}</span>
                                        <span className="text-xs text-[#6B6B6B]">({product.type})</span>
                                    </div>
                                ) : null
                            })}
                        </div>
                    </div>
                </div>

                {/* Outreach Config */}
                <div className="grid grid-cols-3 gap-4 p-4 rounded-lg bg-[#FAFAFA]">
                    <div>
                        <p className="text-xs text-[#6B6B6B]">AI Model</p>
                        <p className="text-sm font-medium text-[#1A1A1A] capitalize">
                            {modelOptions.find((m) => m.value === agent.aiModel)?.label || agent.aiModel}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-[#6B6B6B]">Personalization</p>
                        <p className="text-sm font-medium text-[#1A1A1A]">{agent.personalizationLevel}%</p>
                    </div>
                    <div>
                        <p className="text-xs text-[#6B6B6B]">Follow-up</p>
                        <p className="text-sm font-medium text-[#1A1A1A] capitalize">{agent.followUpCadence}</p>
                    </div>
                </div>

                {/* Recent Activity */}
                {agent.recentActivity.length > 0 && (
                    <div>
                        <h3 className="text-sm font-semibold text-[#1A1A1A] mb-3 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-[#6B6B6B]" />
                            Recent Activity
                        </h3>
                        <div className="space-y-3">
                            {agent.recentActivity.map((activity) => (
                                <div key={activity.id} className="flex items-start gap-3">
                                    <div className="w-2 h-2 rounded-full bg-[#1A1A1A] mt-2" />
                                    <div className="flex-1">
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
                        Close
                    </Button>
                    <Button>Edit Agent</Button>
                </div>
            </div>
        </Modal>
    )
}
