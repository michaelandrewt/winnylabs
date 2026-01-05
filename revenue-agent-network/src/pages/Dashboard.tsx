import { useState, useEffect } from "react"
import { Bot, Building2, DollarSign, Clock, Plus } from "lucide-react"
import { MetricCard } from "@/components/ui/MetricCard"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { SkeletonCard, SkeletonActivityFeed } from "@/components/ui/Skeleton"
import { EmptyAgents } from "@/components/ui/EmptyState"
import { Button } from "@/components/ui/Button"
import { Modal, ModalFooter } from "@/components/ui/Modal"
import { Input, Textarea } from "@/components/ui/Input"
import { useToast } from "@/components/ui/Toast"

const recentActivity = [
    {
        id: 1,
        action: "Agent deployed",
        description: "Sales Agent Alpha started prospecting for TechCorp",
        time: "2 minutes ago",
        type: "success",
    },
    {
        id: 2,
        action: "New lead captured",
        description: "InnovateLabs qualified a $45K opportunity",
        time: "15 minutes ago",
        type: "info",
    },
    {
        id: 3,
        action: "Deal closed",
        description: 'Agent Beta closed "Enterprise Plan" for DataFlow Inc',
        time: "1 hour ago",
        type: "success",
    },
    {
        id: 4,
        action: "Company onboarded",
        description: "CloudSync Solutions added to the network",
        time: "3 hours ago",
        type: "info",
    },
    {
        id: 5,
        action: "Pipeline updated",
        description: "Agent Gamma moved 3 deals to negotiation stage",
        time: "5 hours ago",
        type: "info",
    },
]

export function Dashboard() {
    const [isLoading, setIsLoading] = useState(true)
    const [showEmptyState, setShowEmptyState] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({ name: "", description: "" })
    const [formErrors, setFormErrors] = useState<{ name?: string; description?: string }>({})
    const { addToast } = useToast()

    // Simulate loading state
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1500)
        return () => clearTimeout(timer)
    }, [])

    const validateForm = () => {
        const errors: { name?: string; description?: string } = {}
        if (!formData.name.trim()) {
            errors.name = "Agent name is required"
        } else if (formData.name.length < 3) {
            errors.name = "Name must be at least 3 characters"
        }
        if (!formData.description.trim()) {
            errors.description = "Description is required"
        }
        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }

    const isFormValid = formData.name.trim().length >= 3 && formData.description.trim().length > 0

    const handleSubmit = async () => {
        if (!validateForm()) return

        setIsSubmitting(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setIsSubmitting(false)
        setIsModalOpen(false)
        setFormData({ name: "", description: "" })
        setFormErrors({})
        addToast("success", "Agent created successfully!")
    }

    const handleCreateAgent = () => {
        setIsModalOpen(true)
    }

    return (
        <div className="space-y-6 md:space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="space-y-1 animate-fade-in">
                    <h1 className="text-xl md:text-2xl font-semibold text-[#1A1A1A] tracking-tight">
                        Dashboard
                    </h1>
                    <p className="text-sm md:text-base text-[#6B6B6B]">
                        Monitor your AI sales agents and revenue performance.
                    </p>
                </div>
                <div className="flex items-center gap-2 md:gap-3 overflow-x-auto scrollbar-hide">
                    <Button variant="secondary" size="sm" className="hidden md:flex" onClick={() => setShowEmptyState(!showEmptyState)}>
                        {showEmptyState ? "Show Data" : "Show Empty"}
                    </Button>
                    <Button variant="secondary" size="sm" className="hidden md:flex" onClick={() => setIsLoading(true)}>
                        Reload
                    </Button>
                    <Button onClick={handleCreateAgent} className="flex-shrink-0">
                        <Plus className="w-4 h-4" />
                        <span className="hidden sm:inline">New Agent</span>
                        <span className="sm:hidden">New</span>
                    </Button>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {isLoading ? (
                    <>
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                    </>
                ) : (
                    <>
                        <div className="animate-slide-up stagger-1">
                            <MetricCard
                                title="Active Agents"
                                value="12"
                                icon={Bot}
                                trend={{ value: "3 new", positive: true }}
                            />
                        </div>
                        <div className="animate-slide-up stagger-2">
                            <MetricCard
                                title="Portfolio Companies"
                                value="34"
                                icon={Building2}
                                trend={{ value: "8%", positive: true }}
                            />
                        </div>
                        <div className="animate-slide-up stagger-3">
                            <MetricCard
                                title="Pipeline Value"
                                value="$248K"
                                icon={DollarSign}
                                trend={{ value: "12%", positive: true }}
                            />
                        </div>
                    </>
                )}
            </div>

            {/* Recent Activity or Empty State */}
            {showEmptyState ? (
                <Card className="animate-fade-in">
                    <EmptyAgents onAction={handleCreateAgent} />
                </Card>
            ) : (
                <Card className="animate-slide-up stagger-4">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Recent Activity</CardTitle>
                            <button className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-all duration-200">
                                View all
                            </button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        {isLoading ? (
                            <SkeletonActivityFeed items={5} />
                        ) : (
                            <div className="divide-y divide-[#E5E5E5]">
                                {recentActivity.map((item, index) => (
                                    <div
                                        key={item.id}
                                        className="px-6 py-4 flex items-start gap-4 hover:bg-[#FAFAFA] transition-all duration-200 cursor-pointer animate-fade-in"
                                        style={{ animationDelay: `${index * 50}ms` }}
                                    >
                                        <div className="mt-0.5">
                                            <div
                                                className={`w-2 h-2 rounded-full ${item.type === "success" ? "bg-emerald-500" : "bg-blue-500"
                                                    }`}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-[#1A1A1A]">
                                                {item.action}
                                            </p>
                                            <p className="text-sm text-[#6B6B6B] truncate">
                                                {item.description}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs text-[#6B6B6B] shrink-0">
                                            <Clock className="w-3.5 h-3.5" />
                                            {item.time}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}

            {/* Demo Buttons for Toast Notifications - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-3 pt-4">
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => addToast("success", "Action completed successfully!")}
                >
                    Show Success Toast
                </Button>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => addToast("error", "Something went wrong. Please try again.")}
                >
                    Show Error Toast
                </Button>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => addToast("info", "Your changes have been saved.")}
                >
                    Show Info Toast
                </Button>
            </div>

            {/* Create Agent Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-[#1A1A1A] mb-4">Create New Agent</h2>
                    <Input
                        label="Agent Name"
                        placeholder="e.g., Sales Agent Alpha"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        error={formErrors.name}
                    />
                    <Textarea
                        label="Description"
                        placeholder="Describe what this agent will do..."
                        required
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        error={formErrors.description}
                    />
                </div>
                <ModalFooter>
                    <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        loading={isSubmitting}
                        disabled={!isFormValid}
                    >
                        Create Agent
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
