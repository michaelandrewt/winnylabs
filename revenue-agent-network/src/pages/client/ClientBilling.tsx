import { useState } from "react"
import { cn } from "@/lib/utils"
import {
    CreditCard,
    Check,
    Bot,
    Users,
    Zap,
    Download,
    X,
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Modal, ModalFooter } from "@/components/ui/Modal"
import { Input } from "@/components/ui/Input"
import { useToast } from "@/components/ui/Toast"

// Mock data
const mockBillingData = {
    currentPlan: "professional",
    nextBilling: "Feb 1, 2025",
    paymentMethod: {
        type: "visa",
        last4: "4242",
        exp: "12/2026",
    },
    usage: {
        agents: 8,
        maxAgents: 10,
        teamMembers: 5,
        maxTeamMembers: 5,
        apiCalls: 12340,
        maxApiCalls: 50000,
    },
    billingHistory: [
        { date: "Jan 1, 2025", plan: "Professional", amount: 99, status: "Paid" },
        { date: "Dec 1, 2024", plan: "Professional", amount: 99, status: "Paid" },
        { date: "Nov 1, 2024", plan: "Professional", amount: 99, status: "Paid" },
        { date: "Oct 1, 2024", plan: "Solo (Free)", amount: 0, status: "Free" },
    ],
}

const plans = [
    {
        id: "solo",
        name: "Solo",
        price: 0,
        period: "mo",
        features: ["1 agent", "1 user", "3 companies", "Basic analytics"],
    },
    {
        id: "professional",
        name: "Professional",
        price: 99,
        period: "mo",
        popular: true,
        features: ["10 agents", "5 users", "Unlimited companies", "Advanced analytics", "API access"],
    },
    {
        id: "enterprise",
        name: "Enterprise",
        price: null,
        priceLabel: "Custom",
        features: ["Unlimited agents", "Unlimited users", "Dedicated support", "Custom integrations", "SSO/SAML", "SLA guarantees"],
    },
]

export function ClientBilling() {
    const { addToast } = useToast()
    const [billing] = useState(mockBillingData)
    const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly")
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-xl md:text-2xl font-semibold text-[#1A1A1A] tracking-tight">
                    Billing
                </h1>
                <p className="text-sm md:text-base text-[#6B6B6B]">
                    Manage your subscription and payment details
                </p>
            </div>

            {/* Current Plan */}
            <div className="bg-white rounded-lg border border-[#E5E5E5] p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <h2 className="text-lg font-semibold text-[#1A1A1A]">Professional Plan</h2>
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                                Current
                            </span>
                        </div>
                        <p className="text-2xl font-bold text-[#1A1A1A]">$99<span className="text-base font-normal text-[#6B6B6B]">/month</span></p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Button variant="secondary">Change Plan</Button>
                        <Button variant="secondary" onClick={() => setIsPaymentModalOpen(true)}>Update Payment</Button>
                        <Button variant="danger">Cancel</Button>
                    </div>
                </div>

                <div className="mt-6 pt-6 border-t border-[#E5E5E5]">
                    <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {["Up to 10 AI agents", "5 team members", "Unlimited companies", "Advanced analytics", "API access"].map((feature) => (
                            <li key={feature} className="flex items-center gap-2 text-sm text-[#6B6B6B]">
                                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-6 pt-6 border-t border-[#E5E5E5] flex flex-wrap gap-6 text-sm text-[#6B6B6B]">
                    <p>Next billing: <span className="text-[#1A1A1A] font-medium">{billing.nextBilling}</span></p>
                    <p>Payment method: <span className="text-[#1A1A1A] font-medium">•••• {billing.paymentMethod.last4}</span></p>
                </div>
            </div>

            {/* Usage This Month */}
            <div className="bg-white rounded-lg border border-[#E5E5E5] p-6">
                <h2 className="text-lg font-semibold text-[#1A1A1A] mb-6">Usage This Month</h2>
                <div className="space-y-6">
                    <UsageBar
                        label="AI Agents"
                        current={billing.usage.agents}
                        max={billing.usage.maxAgents}
                        icon={Bot}
                    />
                    <UsageBar
                        label="Team Members"
                        current={billing.usage.teamMembers}
                        max={billing.usage.maxTeamMembers}
                        icon={Users}
                        warning={billing.usage.teamMembers >= billing.usage.maxTeamMembers}
                    />
                    <UsageBar
                        label="API Calls"
                        current={billing.usage.apiCalls}
                        max={billing.usage.maxApiCalls}
                        icon={Zap}
                    />
                </div>
            </div>

            {/* Available Plans */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-[#1A1A1A]">Available Plans</h2>
                    <div className="flex items-center gap-1 bg-[#F5F5F5] rounded-lg p-1">
                        <button
                            onClick={() => setBillingPeriod("monthly")}
                            className={cn(
                                "px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
                                billingPeriod === "monthly"
                                    ? "bg-white text-[#1A1A1A] shadow-sm"
                                    : "text-[#6B6B6B] hover:text-[#1A1A1A]"
                            )}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingPeriod("annual")}
                            className={cn(
                                "px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
                                billingPeriod === "annual"
                                    ? "bg-white text-[#1A1A1A] shadow-sm"
                                    : "text-[#6B6B6B] hover:text-[#1A1A1A]"
                            )}
                        >
                            Annual <span className="text-emerald-600">-20%</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {plans.map((plan) => (
                        <PlanCard
                            key={plan.id}
                            plan={plan}
                            billingPeriod={billingPeriod}
                            isCurrent={plan.id === billing.currentPlan}
                        />
                    ))}
                </div>
            </div>

            {/* Billing History */}
            <div className="bg-white rounded-lg border border-[#E5E5E5] p-6">
                <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">Billing History</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left text-xs text-[#6B6B6B] border-b border-[#E5E5E5]">
                                <th className="pb-3 font-medium">Date</th>
                                <th className="pb-3 font-medium">Plan</th>
                                <th className="pb-3 font-medium">Amount</th>
                                <th className="pb-3 font-medium">Status</th>
                                <th className="pb-3 font-medium">Invoice</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E5E5E5]">
                            {billing.billingHistory.map((row, i) => (
                                <tr key={i}>
                                    <td className="py-3 text-[#1A1A1A]">{row.date}</td>
                                    <td className="py-3 text-[#6B6B6B]">{row.plan}</td>
                                    <td className="py-3 text-[#1A1A1A]">${row.amount.toFixed(2)}</td>
                                    <td className="py-3">
                                        <span className={cn(
                                            "px-2 py-0.5 rounded-full text-xs font-medium",
                                            row.status === "Paid" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-700"
                                        )}>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="py-3">
                                        {row.amount > 0 && (
                                            <button className="text-blue-600 hover:underline flex items-center gap-1">
                                                <Download className="w-3.5 h-3.5" />
                                                PDF
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button className="mt-4 text-sm text-[#6B6B6B] hover:text-[#1A1A1A]">
                    View All Invoices →
                </button>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg border border-[#E5E5E5] p-6">
                <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">Payment Method</h2>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-8 bg-[#F5F5F5] rounded flex items-center justify-center">
                            <CreditCard className="w-6 h-6 text-[#6B6B6B]" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-[#1A1A1A]">Visa ending in {billing.paymentMethod.last4}</p>
                            <p className="text-xs text-[#6B6B6B]">Expires: {billing.paymentMethod.exp}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="secondary" size="sm" onClick={() => setIsPaymentModalOpen(true)}>
                            Update Card
                        </Button>
                        <Button variant="secondary" size="sm">
                            Add Method
                        </Button>
                    </div>
                </div>
            </div>

            {/* Update Payment Modal */}
            <UpdatePaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                onUpdate={() => {
                    setIsPaymentModalOpen(false)
                    addToast("success", "Payment method updated successfully!")
                }}
            />
        </div>
    )
}

// Usage Bar
interface UsageBarProps {
    label: string
    current: number
    max: number
    icon: React.ElementType
    warning?: boolean
}

function UsageBar({ label, current, max, icon: Icon, warning }: UsageBarProps) {
    const percentage = (current / max) * 100

    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-[#6B6B6B]" />
                    <span className="text-sm font-medium text-[#1A1A1A]">{label}</span>
                </div>
                <span className="text-sm text-[#6B6B6B]">
                    {current.toLocaleString()} of {max.toLocaleString()}
                </span>
            </div>
            <div className="h-2 bg-[#F5F5F5] rounded-full overflow-hidden">
                <div
                    className={cn(
                        "h-full rounded-full transition-all duration-500",
                        warning ? "bg-amber-500" : percentage > 80 ? "bg-amber-500" : "bg-blue-500"
                    )}
                    style={{ width: `${percentage}%` }}
                />
            </div>
            {warning && (
                <p className="text-xs text-amber-600 mt-1">Upgrade to add more</p>
            )}
        </div>
    )
}

// Plan Card
interface PlanCardProps {
    plan: typeof plans[0]
    billingPeriod: "monthly" | "annual"
    isCurrent: boolean
}

function PlanCard({ plan, billingPeriod, isCurrent }: PlanCardProps) {
    const price = plan.price !== null
        ? billingPeriod === "annual" ? Math.round(plan.price * 0.8) : plan.price
        : null

    return (
        <div className={cn(
            "rounded-lg border p-6 relative",
            plan.popular ? "border-blue-500 bg-blue-50/50" : "border-[#E5E5E5] bg-white"
        )}>
            {plan.popular && (
                <span className="absolute top-0 right-4 -translate-y-1/2 px-2 py-0.5 bg-blue-500 text-white text-xs font-medium rounded-full">
                    Popular
                </span>
            )}

            <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">{plan.name}</h3>

            <div className="mb-4">
                {price !== null ? (
                    <p className="text-3xl font-bold text-[#1A1A1A]">
                        ${price}<span className="text-base font-normal text-[#6B6B6B]">/{plan.period}</span>
                    </p>
                ) : (
                    <p className="text-3xl font-bold text-[#1A1A1A]">{plan.priceLabel}</p>
                )}
            </div>

            <ul className="space-y-2 mb-6">
                {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-[#6B6B6B]">
                        <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        {feature}
                    </li>
                ))}
            </ul>

            <Button
                variant={isCurrent ? "secondary" : plan.id === "enterprise" ? "secondary" : "primary"}
                className="w-full"
                disabled={isCurrent}
            >
                {isCurrent ? "Current" : plan.id === "enterprise" ? "Contact Sales" : "Upgrade"}
            </Button>
        </div>
    )
}

// Update Payment Modal
interface UpdatePaymentModalProps {
    isOpen: boolean
    onClose: () => void
    onUpdate: () => void
}

function UpdatePaymentModal({ isOpen, onClose, onUpdate }: UpdatePaymentModalProps) {
    const [formData, setFormData] = useState({
        cardNumber: "",
        expiry: "",
        cvv: "",
        name: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "United States",
    })

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-md">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-[#1A1A1A]">Update Payment Method</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F5F5F5]"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="space-y-4">
                    <Input
                        label="Card Number"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Expiration"
                            placeholder="MM/YY"
                            value={formData.expiry}
                            onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                        />
                        <Input
                            label="CVV"
                            placeholder="123"
                            value={formData.cvv}
                            onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                        />
                    </div>
                    <Input
                        label="Cardholder Name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

                <div className="flex items-center gap-2 text-xs text-[#6B6B6B]">
                    <CreditCard className="w-4 h-4" />
                    🔒 Secure payment via Stripe
                </div>

                <ModalFooter>
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button onClick={onUpdate}>Update Payment Method</Button>
                </ModalFooter>
            </div>
        </Modal>
    )
}
