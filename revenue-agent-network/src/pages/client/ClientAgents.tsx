import { useState } from "react"
import { cn } from "@/lib/utils"
import {
    Plus,
    Search,
    Bot,
    Zap,
    MessageSquare,
    Calendar,
    DollarSign,
    Pause,
    Play,
    Settings,
    Eye,
    TrendingUp,
    X,
    ChevronRight,
    ChevronLeft,
    Check,
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Modal, ModalFooter } from "@/components/ui/Modal"
import { Input } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"
import { useToast } from "@/components/ui/Toast"

// Types
interface Agent {
    id: string
    name: string
    specialty: string
    model: string
    personalization: "Low" | "Medium" | "High"
    status: "active" | "paused" | "learning"
    companies: string[]
    performance: {
        outreach: number
        replyRate: number
        meetings: number
        pipeline: number
        closed: number
    }
}

// Mock data
const mockAgents: Agent[] = [
    {
        id: "1",
        name: "Agent-AI-01",
        specialty: "AI/ML Infrastructure Specialist",
        model: "Claude Sonnet 4",
        personalization: "High",
        status: "active",
        companies: ["Anthropic", "Mistral AI", "Cohere", "Runway", "Stability AI"],
        performance: {
            outreach: 340,
            replyRate: 34,
            meetings: 12,
            pipeline: 87000,
            closed: 23000,
        },
    },
    {
        id: "2",
        name: "Agent-AI-02",
        specialty: "Developer Tools Expert",
        model: "GPT-4 Turbo",
        personalization: "Medium",
        status: "active",
        companies: ["Vercel", "Supabase", "Railway"],
        performance: {
            outreach: 280,
            replyRate: 28,
            meetings: 8,
            pipeline: 45000,
            closed: 15000,
        },
    },
    {
        id: "3",
        name: "Agent-Finance-01",
        specialty: "Fintech & Payments Specialist",
        model: "Claude Sonnet 4",
        personalization: "High",
        status: "paused",
        companies: ["Stripe", "Plaid", "Square"],
        performance: {
            outreach: 210,
            replyRate: 24,
            meetings: 6,
            pipeline: 32000,
            closed: 12000,
        },
    },
    {
        id: "4",
        name: "Agent-Healthcare-01",
        specialty: "Healthcare Technology Expert",
        model: "Gemini Pro",
        personalization: "Medium",
        status: "learning",
        companies: [],
        performance: {
            outreach: 0,
            replyRate: 0,
            meetings: 0,
            pipeline: 0,
            closed: 0,
        },
    },
]

const statusLabels = {
    active: "Active",
    paused: "Paused",
    learning: "Learning",
}

const statusBadgeVariants = {
    active: "success" as const,
    paused: "warning" as const,
    learning: "default" as const,
}

const formatCurrency = (amount: number): string => {
    if (amount >= 1000) {
        return `$${(amount / 1000).toFixed(0)}K`
    }
    return `$${amount.toLocaleString()}`
}

export function ClientAgents() {
    const { addToast } = useToast()
    const [agents, setAgents] = useState<Agent[]>(mockAgents)
    const [filter, setFilter] = useState<"all" | "active" | "paused" | "learning">("all")
    const [isWizardOpen, setIsWizardOpen] = useState(false)

    const filteredAgents = agents.filter((agent) =>
        filter === "all" ? true : agent.status === filter
    )

    const metrics = {
        activeAgents: agents.filter(a => a.status === "active").length,
        totalOutreach: agents.reduce((sum, a) => sum + a.performance.outreach, 0),
        avgReplyRate: Math.round(agents.reduce((sum, a) => sum + a.performance.replyRate, 0) / agents.length),
        dealsClosed: agents.reduce((sum, a) => sum + (a.performance.closed > 0 ? 1 : 0), 0),
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                    <h1 className="text-xl md:text-2xl font-semibold text-[#1A1A1A] tracking-tight">
                        AI Agents
                    </h1>
                    <p className="text-sm md:text-base text-[#6B6B6B]">
                        Configure and manage your AI-powered sales agents
                    </p>
                </div>
                <Button onClick={() => setIsWizardOpen(true)}>
                    <Plus className="w-4 h-4" />
                    Create Agent
                </Button>
            </div>

            {/* Fleet Overview Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <MetricCard icon={Bot} label="Active Agents" value={metrics.activeAgents.toString()} />
                <MetricCard icon={MessageSquare} label="Total Outreach" value={metrics.totalOutreach.toLocaleString()} />
                <MetricCard icon={TrendingUp} label="Avg Reply Rate" value={`${metrics.avgReplyRate}%`} />
                <MetricCard icon={DollarSign} label="Deals Closed" value={metrics.dealsClosed.toString()} />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 border-b border-[#E5E5E5]">
                {(["all", "active", "paused", "learning"] as const).map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={cn(
                            "px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px",
                            filter === status
                                ? "border-blue-600 text-blue-600"
                                : "border-transparent text-[#6B6B6B] hover:text-[#1A1A1A]"
                        )}
                    >
                        {status === "all" ? "All Agents" : statusLabels[status]}
                    </button>
                ))}
            </div>

            {/* Agent Cards */}
            <div className="space-y-4">
                {filteredAgents.map((agent) => (
                    <AgentCard key={agent.id} agent={agent} />
                ))}
            </div>

            {/* Create Agent Wizard */}
            <CreateAgentWizard
                isOpen={isWizardOpen}
                onClose={() => setIsWizardOpen(false)}
                onComplete={() => {
                    setIsWizardOpen(false)
                    addToast("success", "Agent created successfully!")
                }}
            />
        </div>
    )
}

// Metric Card
interface MetricCardProps {
    icon: React.ElementType
    label: string
    value: string
}

function MetricCard({ icon: Icon, label, value }: MetricCardProps) {
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

// Agent Card
function AgentCard({ agent }: { agent: Agent }) {
    return (
        <div className={cn(
            "bg-white rounded-lg border border-[#E5E5E5] p-5",
            "hover:border-[#1A1A1A] transition-colors"
        )}>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                {/* Left - Info */}
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-base font-semibold text-[#1A1A1A]">{agent.name}</h3>
                            <Badge variant={statusBadgeVariants[agent.status]}>
                                {statusLabels[agent.status]}
                            </Badge>
                        </div>
                        <p className="text-sm text-[#6B6B6B] italic mb-2">{agent.specialty}</p>
                        <p className="text-xs text-[#6B6B6B]">
                            {agent.model} • {agent.personalization} Personalization
                        </p>

                        {/* Assigned Companies */}
                        {agent.companies.length > 0 && (
                            <div className="mt-3">
                                <p className="text-xs text-[#6B6B6B] mb-1.5">
                                    Assigned Companies: {agent.companies.length}
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                    {agent.companies.slice(0, 3).map((company) => (
                                        <span
                                            key={company}
                                            className="px-2 py-0.5 bg-[#F5F5F5] rounded-md text-xs text-[#6B6B6B]"
                                        >
                                            {company}
                                        </span>
                                    ))}
                                    {agent.companies.length > 3 && (
                                        <span className="px-2 py-0.5 text-xs text-[#6B6B6B]">
                                            +{agent.companies.length - 3} more
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right - Performance & Actions */}
                <div className="flex flex-col md:items-end gap-4">
                    {/* Performance Grid */}
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-4 text-center md:text-right">
                        <div>
                            <p className="text-xs text-[#6B6B6B]">Outreach</p>
                            <p className="text-sm font-semibold text-[#1A1A1A]">{agent.performance.outreach}</p>
                        </div>
                        <div>
                            <p className="text-xs text-[#6B6B6B]">Reply</p>
                            <p className="text-sm font-semibold text-[#1A1A1A]">{agent.performance.replyRate}%</p>
                        </div>
                        <div>
                            <p className="text-xs text-[#6B6B6B]">Meetings</p>
                            <p className="text-sm font-semibold text-[#1A1A1A]">{agent.performance.meetings}</p>
                        </div>
                        <div className="hidden md:block">
                            <p className="text-xs text-[#6B6B6B]">Pipeline</p>
                            <p className="text-sm font-semibold text-[#1A1A1A]">{formatCurrency(agent.performance.pipeline)}</p>
                        </div>
                        <div className="hidden md:block">
                            <p className="text-xs text-[#6B6B6B]">Closed</p>
                            <p className="text-sm font-semibold text-emerald-600">{formatCurrency(agent.performance.closed)}</p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <Button variant="secondary" size="sm">
                            <Settings className="w-4 h-4" />
                            Configure
                        </Button>
                        <Button variant="secondary" size="sm">
                            <Eye className="w-4 h-4" />
                            Activity
                        </Button>
                        <Button variant="secondary" size="sm">
                            {agent.status === "paused" ? (
                                <>
                                    <Play className="w-4 h-4" />
                                    Resume
                                </>
                            ) : (
                                <>
                                    <Pause className="w-4 h-4" />
                                    Pause
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Create Agent Wizard
interface CreateAgentWizardProps {
    isOpen: boolean
    onClose: () => void
    onComplete: () => void
}

function CreateAgentWizard({ isOpen, onClose, onComplete }: CreateAgentWizardProps) {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        name: "",
        specialization: "",
        customSpecialization: "",
        companies: [] as string[],
        products: [] as string[],
        model: "claude",
        personalization: 2,
        researchDepth: "standard",
        dailyLimit: "50",
        followUp: "moderate",
        channels: ["email", "linkedin"],
        commission: "15",
        tieredBonus: true,
        attribution: "last",
        learningMode: true,
    })

    const totalSteps = 4

    const handleNext = () => {
        if (step < totalSteps) {
            setStep(step + 1)
        } else {
            onComplete()
        }
    }

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1)
        }
    }

    const renderStep = () => {
        switch (step) {
            case 1:
                return <Step1Identity formData={formData} setFormData={setFormData} />
            case 2:
                return <Step2Portfolio formData={formData} setFormData={setFormData} />
            case 3:
                return <Step3Configuration formData={formData} setFormData={setFormData} />
            case 4:
                return <Step4Commission formData={formData} setFormData={setFormData} />
            default:
                return null
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl">
            <div className="space-y-6">
                {/* Progress */}
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-[#1A1A1A]">
                        Step {step} of {totalSteps}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F5F5F5] transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="h-1 bg-[#F5F5F5] rounded-full overflow-hidden">
                    <div
                        className="h-full bg-blue-600 transition-all duration-300"
                        style={{ width: `${(step / totalSteps) * 100}%` }}
                    />
                </div>

                {/* Content */}
                <div className="min-h-[300px]">{renderStep()}</div>

                {/* Navigation */}
                <div className="flex items-center justify-between pt-4 border-t border-[#E5E5E5]">
                    <div>
                        {step > 1 && (
                            <Button variant="secondary" onClick={handleBack}>
                                <ChevronLeft className="w-4 h-4" />
                                Back
                            </Button>
                        )}
                    </div>
                    <Button onClick={handleNext}>
                        {step === totalSteps ? (
                            <>
                                Launch Agent
                                <Check className="w-4 h-4" />
                            </>
                        ) : (
                            <>
                                Next
                                <ChevronRight className="w-4 h-4" />
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

// Step 1: Agent Identity
function Step1Identity({ formData, setFormData }: any) {
    const specializations = [
        "AI/ML Infrastructure",
        "Fintech & Payments",
        "Healthcare Technology",
        "Horizontal SaaS",
        "Developer Tools",
        "Custom",
    ]

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-[#1A1A1A]">Agent Identity</h3>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                        Agent Name <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center">
                        <span className="px-3 py-2.5 bg-[#F5F5F5] border border-r-0 border-[#E5E5E5] rounded-l-lg text-sm text-[#6B6B6B]">
                            Agent-
                        </span>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="AI-03, Finance-01, Healthcare-01"
                            className={cn(
                                "flex-1 px-3 py-2.5 text-sm rounded-r-lg border border-[#E5E5E5]",
                                "focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                            )}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                        Specialization <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={formData.specialization}
                        onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                        className={cn(
                            "w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#E5E5E5]",
                            "focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        )}
                    >
                        <option value="">Select specialization...</option>
                        {specializations.map((spec) => (
                            <option key={spec} value={spec}>{spec}</option>
                        ))}
                    </select>
                </div>

                {formData.specialization === "Custom" && (
                    <Input
                        label="Custom Specialization"
                        placeholder="Describe your agent's specialty..."
                        value={formData.customSpecialization}
                        onChange={(e) => setFormData({ ...formData, customSpecialization: e.target.value })}
                    />
                )}
            </div>
        </div>
    )
}

// Step 2: Portfolio Assignment
function Step2Portfolio({ formData, setFormData }: any) {
    const companies = [
        { id: "1", name: "Anthropic", stage: "Series C", sector: "AI Infrastructure" },
        { id: "2", name: "Mistral AI", stage: "Series B", sector: "AI Models" },
        { id: "3", name: "Perplexity", stage: "Series B", sector: "AI Search" },
        { id: "4", name: "Cohere", stage: "Series C", sector: "AI Platform" },
        { id: "5", name: "Runway", stage: "Series C", sector: "AI Creative" },
    ]

    const products = [
        { id: "1", name: "AI Infrastructure API", price: "$10K-$50K" },
        { id: "2", name: "Enterprise AI Platform", price: "$50K-$200K" },
        { id: "3", name: "Developer Tools Suite", price: "$5K-$25K" },
    ]

    const toggleCompany = (id: string) => {
        const current = formData.companies
        if (current.includes(id)) {
            setFormData({ ...formData, companies: current.filter((c: string) => c !== id) })
        } else if (current.length < 5) {
            setFormData({ ...formData, companies: [...current, id] })
        }
    }

    const toggleProduct = (id: string) => {
        const current = formData.products
        if (current.includes(id)) {
            setFormData({ ...formData, products: current.filter((p: string) => p !== id) })
        } else {
            setFormData({ ...formData, products: [...current, id] })
        }
    }

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-[#1A1A1A]">Portfolio Assignment</h3>

            {/* Companies */}
            <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                    Assign Companies (max 5)
                </label>
                <p className="text-xs text-[#6B6B6B] mb-3">
                    Selected: {formData.companies.length} of 5 companies
                </p>
                <div className="space-y-2">
                    {companies.map((company) => (
                        <label
                            key={company.id}
                            className={cn(
                                "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                                formData.companies.includes(company.id)
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-[#E5E5E5] hover:bg-[#F5F5F5]"
                            )}
                        >
                            <input
                                type="checkbox"
                                checked={formData.companies.includes(company.id)}
                                onChange={() => toggleCompany(company.id)}
                                className="w-4 h-4 rounded border-[#E5E5E5] text-blue-600"
                            />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-[#1A1A1A]">{company.name}</p>
                                <p className="text-xs text-[#6B6B6B]">{company.stage} • {company.sector}</p>
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            {/* Products */}
            <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                    Assign Products
                </label>
                <div className="space-y-2">
                    {products.map((product) => (
                        <label
                            key={product.id}
                            className={cn(
                                "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                                formData.products.includes(product.id)
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-[#E5E5E5] hover:bg-[#F5F5F5]"
                            )}
                        >
                            <input
                                type="checkbox"
                                checked={formData.products.includes(product.id)}
                                onChange={() => toggleProduct(product.id)}
                                className="w-4 h-4 rounded border-[#E5E5E5] text-blue-600"
                            />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-[#1A1A1A]">{product.name}</p>
                                <p className="text-xs text-[#6B6B6B]">{product.price}</p>
                            </div>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    )
}

// Step 3: AI & Outreach Configuration
function Step3Configuration({ formData, setFormData }: any) {
    return (
        <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
            <h3 className="text-lg font-semibold text-[#1A1A1A]">AI & Outreach Configuration</h3>

            {/* AI Model */}
            <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-2">AI Model</label>
                <div className="space-y-2">
                    {[
                        { id: "claude", label: "Claude Sonnet 4", desc: "Recommended for technical" },
                        { id: "gpt4", label: "GPT-4 Turbo", desc: "Best for creative" },
                        { id: "gemini", label: "Gemini Pro", desc: "Best for data analysis" },
                    ].map((model) => (
                        <label
                            key={model.id}
                            className={cn(
                                "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                                formData.model === model.id
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-[#E5E5E5] hover:bg-[#F5F5F5]"
                            )}
                        >
                            <input
                                type="radio"
                                name="model"
                                checked={formData.model === model.id}
                                onChange={() => setFormData({ ...formData, model: model.id })}
                                className="w-4 h-4 text-blue-600"
                            />
                            <div>
                                <p className="text-sm font-medium text-[#1A1A1A]">{model.label}</p>
                                <p className="text-xs text-[#6B6B6B]">{model.desc}</p>
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            {/* Research Depth */}
            <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Research Depth</label>
                <div className="space-y-2">
                    {[
                        { id: "basic", label: "Basic", desc: "Company website + LinkedIn" },
                        { id: "standard", label: "Standard", desc: "+ Recent news + funding data" },
                        { id: "deep", label: "Deep", desc: "+ Competitor intel + tech stack" },
                    ].map((depth) => (
                        <label
                            key={depth.id}
                            className={cn(
                                "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                                formData.researchDepth === depth.id
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-[#E5E5E5] hover:bg-[#F5F5F5]"
                            )}
                        >
                            <input
                                type="radio"
                                name="depth"
                                checked={formData.researchDepth === depth.id}
                                onChange={() => setFormData({ ...formData, researchDepth: depth.id })}
                                className="w-4 h-4 text-blue-600"
                            />
                            <div>
                                <p className="text-sm font-medium text-[#1A1A1A]">{depth.label}</p>
                                <p className="text-xs text-[#6B6B6B]">{depth.desc}</p>
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            {/* Daily Limit */}
            <Input
                label="Daily Outreach Limit"
                type="number"
                value={formData.dailyLimit}
                onChange={(e) => setFormData({ ...formData, dailyLimit: e.target.value })}
                helperText="Max: 100 prospects per day"
            />

            {/* Channels */}
            <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Channels</label>
                <div className="space-y-2">
                    {[
                        { id: "email", label: "Email (Primary)" },
                        { id: "linkedin", label: "LinkedIn InMail" },
                        { id: "twitter", label: "Twitter DM (experimental)" },
                    ].map((channel) => (
                        <label key={channel.id} className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.channels.includes(channel.id)}
                                onChange={(e) => {
                                    const current = formData.channels
                                    if (e.target.checked) {
                                        setFormData({ ...formData, channels: [...current, channel.id] })
                                    } else {
                                        setFormData({ ...formData, channels: current.filter((c: string) => c !== channel.id) })
                                    }
                                }}
                                className="w-4 h-4 rounded border-[#E5E5E5] text-blue-600"
                            />
                            <span className="text-sm text-[#1A1A1A]">{channel.label}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    )
}

// Step 4: Commission & Launch
function Step4Commission({ formData, setFormData }: any) {
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-[#1A1A1A]">Commission & Launch</h3>

            {/* Commission */}
            <Input
                label="Base Commission Rate (%)"
                type="number"
                value={formData.commission}
                onChange={(e) => setFormData({ ...formData, commission: e.target.value })}
            />

            <label className="flex items-center gap-3 cursor-pointer">
                <input
                    type="checkbox"
                    checked={formData.tieredBonus}
                    onChange={(e) => setFormData({ ...formData, tieredBonus: e.target.checked })}
                    className="w-4 h-4 rounded border-[#E5E5E5] text-blue-600"
                />
                <span className="text-sm text-[#1A1A1A]">Enable tiered bonuses</span>
            </label>

            {formData.tieredBonus && (
                <div className="pl-7 space-y-2 text-sm text-[#6B6B6B]">
                    <p>• Tier 1: Deals over $50,000 → +3%</p>
                    <p>• Tier 2: Deals over $100,000 → +5%</p>
                </div>
            )}

            {/* Learning Mode */}
            <label className="flex items-start gap-3 cursor-pointer p-4 rounded-lg bg-[#F5F5F5]">
                <input
                    type="checkbox"
                    checked={formData.learningMode}
                    onChange={(e) => setFormData({ ...formData, learningMode: e.target.checked })}
                    className="w-4 h-4 rounded border-[#E5E5E5] text-blue-600 mt-0.5"
                />
                <div>
                    <p className="text-sm font-medium text-[#1A1A1A]">Enable 7-day learning mode</p>
                    <p className="text-xs text-[#6B6B6B]">
                        Agent will send test emails to YOUR inbox only for review before going live
                    </p>
                </div>
            </label>

            {/* Summary */}
            <div className="p-4 rounded-lg border border-[#E5E5E5] bg-[#FAFAFA]">
                <h4 className="text-sm font-medium text-[#1A1A1A] mb-3">Review Summary</h4>
                <div className="space-y-2 text-sm">
                    <p><span className="text-[#6B6B6B]">Agent:</span> Agent-{formData.name || "..."}</p>
                    <p><span className="text-[#6B6B6B]">Companies:</span> {formData.companies.length} selected</p>
                    <p><span className="text-[#6B6B6B]">Model:</span> {formData.model === "claude" ? "Claude Sonnet 4" : formData.model === "gpt4" ? "GPT-4 Turbo" : "Gemini Pro"}</p>
                    <p><span className="text-[#6B6B6B]">Daily limit:</span> {formData.dailyLimit} prospects</p>
                    <p><span className="text-[#6B6B6B]">Commission:</span> {formData.commission}% base {formData.tieredBonus && "+ tiered bonuses"}</p>
                </div>
            </div>
        </div>
    )
}
