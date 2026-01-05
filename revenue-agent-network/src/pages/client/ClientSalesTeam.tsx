import { useState } from "react"
import { cn } from "@/lib/utils"
import {
    Plus,
    Users,
    DollarSign,
    TrendingUp,
    Edit,
    Eye,
    X,
    Mail,
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Modal, ModalFooter } from "@/components/ui/Modal"
import { Input } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"
import { useToast } from "@/components/ui/Toast"

// Types
interface TeamMember {
    id: string
    name: string
    initials: string
    email: string
    role: "owner" | "admin" | "closer" | "viewer"
    portfolio: number
    pipeline: number
    agentsAssigned: number
}

// Mock data
const mockTeam: TeamMember[] = [
    {
        id: "1",
        name: "Michael Wong",
        initials: "MW",
        email: "michael@winnylabs.com",
        role: "owner",
        portfolio: 8,
        pipeline: 145000,
        agentsAssigned: 3,
    },
    {
        id: "2",
        name: "Sarah Chen",
        initials: "SC",
        email: "sarah@winnylabs.com",
        role: "admin",
        portfolio: 5,
        pipeline: 87000,
        agentsAssigned: 2,
    },
    {
        id: "3",
        name: "Alex Rivera",
        initials: "AR",
        email: "alex@winnylabs.com",
        role: "closer",
        portfolio: 4,
        pipeline: 55000,
        agentsAssigned: 1,
    },
]

const roleLabels = {
    owner: "Owner",
    admin: "Admin",
    closer: "Closer",
    viewer: "Viewer",
}

const roleBadgeVariants = {
    owner: "default" as const,
    admin: "default" as const,
    closer: "success" as const,
    viewer: "warning" as const,
}

const roleDescriptions = {
    owner: "Full access",
    admin: "All except billing",
    closer: "Pipeline + assigned companies",
    viewer: "Read-only access",
}

const formatCurrency = (amount: number): string => {
    if (amount >= 1000) {
        return `$${(amount / 1000).toFixed(0)}K`
    }
    return `$${amount.toLocaleString()}`
}

export function ClientSalesTeam() {
    const { addToast } = useToast()
    const [team] = useState<TeamMember[]>(mockTeam)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)

    const metrics = {
        totalMembers: team.length,
        totalPipeline: team.reduce((sum, m) => sum + m.pipeline, 0),
        avgDealSize: Math.round(team.reduce((sum, m) => sum + m.pipeline, 0) / team.length / 3),
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                    <h1 className="text-xl md:text-2xl font-semibold text-[#1A1A1A] tracking-tight">
                        Sales Team
                    </h1>
                    <p className="text-sm md:text-base text-[#6B6B6B]">
                        Manage your human sales team and their portfolios
                    </p>
                </div>
                <Button onClick={() => setIsAddModalOpen(true)}>
                    <Plus className="w-4 h-4" />
                    Add Member
                </Button>
            </div>

            {/* Team Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <MetricCard icon={Users} label="Team Members" value={metrics.totalMembers.toString()} />
                <MetricCard icon={DollarSign} label="Total Pipeline" value={formatCurrency(metrics.totalPipeline)} />
                <MetricCard icon={TrendingUp} label="Avg Deal Size" value={formatCurrency(metrics.avgDealSize)} />
            </div>

            {/* Team Members List */}
            <div className="space-y-4">
                {team.map((member) => (
                    <TeamMemberCard key={member.id} member={member} />
                ))}
            </div>

            {/* Team Roles */}
            <div className="bg-white rounded-lg border border-[#E5E5E5] p-5">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-semibold text-[#1A1A1A]">Team Roles & Permissions</h2>
                    <button className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A]">
                        Manage →
                    </button>
                </div>
                <ul className="space-y-2">
                    {Object.entries(roleDescriptions).map(([role, desc]) => (
                        <li key={role} className="flex items-center gap-2 text-sm">
                            <span className="w-2 h-2 rounded-full bg-[#1A1A1A]" />
                            <span className="font-medium text-[#1A1A1A]">{roleLabels[role as keyof typeof roleLabels]}</span>
                            <span className="text-[#6B6B6B]">({desc})</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Add Member Modal */}
            <AddMemberModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAdd={() => {
                    setIsAddModalOpen(false)
                    addToast("success", "Invitation sent successfully!")
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

// Team Member Card
function TeamMemberCard({ member }: { member: TeamMember }) {
    return (
        <div className={cn(
            "bg-white rounded-lg border border-[#E5E5E5] p-5",
            "hover:border-[#1A1A1A] transition-colors"
        )}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Left - Info */}
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#F5F5F5] flex items-center justify-center flex-shrink-0">
                        <span className="text-base font-semibold text-[#6B6B6B]">{member.initials}</span>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-base font-semibold text-[#1A1A1A]">{member.name}</h3>
                            <Badge variant={roleBadgeVariants[member.role]}>
                                {roleLabels[member.role]}
                            </Badge>
                        </div>
                        <p className="text-sm text-[#6B6B6B] font-mono">{member.email}</p>
                    </div>
                </div>

                {/* Center - Stats */}
                <div className="flex items-center gap-6 md:gap-8">
                    <div className="text-center">
                        <p className="text-xs text-[#6B6B6B]">Portfolio</p>
                        <p className="text-sm font-semibold text-[#1A1A1A]">{member.portfolio} companies</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-[#6B6B6B]">Pipeline</p>
                        <p className="text-sm font-semibold text-[#1A1A1A]">{formatCurrency(member.pipeline)}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-[#6B6B6B]">Agents</p>
                        <p className="text-sm font-semibold text-[#1A1A1A]">{member.agentsAssigned} assigned</p>
                    </div>
                </div>

                {/* Right - Actions */}
                <div className="flex items-center gap-2">
                    <Button variant="secondary" size="sm">
                        <Edit className="w-4 h-4" />
                        Edit
                    </Button>
                    <Button variant="secondary" size="sm">
                        <Eye className="w-4 h-4" />
                        Activity
                    </Button>
                </div>
            </div>
        </div>
    )
}

// Add Member Modal
interface AddMemberModalProps {
    isOpen: boolean
    onClose: () => void
    onAdd: () => void
}

function AddMemberModal({ isOpen, onClose, onAdd }: AddMemberModalProps) {
    const [formData, setFormData] = useState({
        email: "",
        role: "closer",
        companies: [] as string[],
        agents: [] as string[],
        commissionSplit: "50",
    })

    const companies = ["Anthropic", "Mistral AI", "Cohere", "Perplexity", "Runway"]
    const agents = ["Agent-AI-01", "Agent-AI-02", "Agent-Finance-01"]

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-md">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-[#1A1A1A]">Add Team Member</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F5F5F5]"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="space-y-4">
                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="teammate@company.com"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />

                    {/* Role Selection */}
                    <div>
                        <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Role</label>
                        <div className="space-y-2">
                            {Object.entries(roleLabels).map(([role, label]) => (
                                <label
                                    key={role}
                                    className={cn(
                                        "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                                        formData.role === role
                                            ? "border-blue-500 bg-blue-50"
                                            : "border-[#E5E5E5] hover:bg-[#F5F5F5]"
                                    )}
                                >
                                    <input
                                        type="radio"
                                        name="role"
                                        checked={formData.role === role}
                                        onChange={() => setFormData({ ...formData, role })}
                                        className="w-4 h-4 text-blue-600"
                                    />
                                    <div>
                                        <p className="text-sm font-medium text-[#1A1A1A]">{label}</p>
                                        <p className="text-xs text-[#6B6B6B]">{roleDescriptions[role as keyof typeof roleDescriptions]}</p>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Company Assignment */}
                    <div>
                        <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Assign Companies</label>
                        <div className="space-y-1.5 max-h-32 overflow-y-auto">
                            {companies.map((company) => (
                                <label key={company} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.companies.includes(company)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setFormData({ ...formData, companies: [...formData.companies, company] })
                                            } else {
                                                setFormData({ ...formData, companies: formData.companies.filter(c => c !== company) })
                                            }
                                        }}
                                        className="w-4 h-4 rounded border-[#E5E5E5] text-blue-600"
                                    />
                                    <span className="text-sm text-[#1A1A1A]">{company}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Agent Assignment */}
                    <div>
                        <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Assign Agents</label>
                        <div className="space-y-1.5">
                            {agents.map((agent) => (
                                <label key={agent} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.agents.includes(agent)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setFormData({ ...formData, agents: [...formData.agents, agent] })
                                            } else {
                                                setFormData({ ...formData, agents: formData.agents.filter(a => a !== agent) })
                                            }
                                        }}
                                        className="w-4 h-4 rounded border-[#E5E5E5] text-blue-600"
                                    />
                                    <span className="text-sm text-[#1A1A1A]">{agent}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Commission Split */}
                    <div>
                        <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">Commission Split</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                value={formData.commissionSplit}
                                onChange={(e) => setFormData({ ...formData, commissionSplit: e.target.value })}
                                className="w-20 px-3 py-2 text-sm rounded-lg border border-[#E5E5E5]"
                            />
                            <span className="text-sm text-[#6B6B6B]">% of deals they close</span>
                        </div>
                    </div>
                </div>

                <ModalFooter>
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button onClick={onAdd} disabled={!formData.email}>
                        <Mail className="w-4 h-4" />
                        Send Invitation
                    </Button>
                </ModalFooter>
            </div>
        </Modal>
    )
}
