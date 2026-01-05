import { useState } from "react"
import { cn } from "@/lib/utils"
import {
    User,
    Puzzle,
    Brain,
    Percent,
    Bell,
    ExternalLink,
    Check,
    Zap,
} from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Checkbox } from "@/components/ui/Checkbox"
import { Select } from "@/components/ui/Select"
import { Slider } from "@/components/ui/Slider"
import { Badge } from "@/components/ui/Badge"
import { useToast } from "@/components/ui/Toast"

type SettingsTab = "profile" | "integrations" | "ai" | "commission" | "notifications"

const tabs: { id: SettingsTab; label: string; icon: React.ElementType }[] = [
    { id: "profile", label: "Profile", icon: User },
    { id: "integrations", label: "Integrations", icon: Puzzle },
    { id: "ai", label: "AI Configuration", icon: Brain },
    { id: "commission", label: "Commission Rules", icon: Percent },
    { id: "notifications", label: "Notifications", icon: Bell },
]

export function Settings() {
    const [activeTab, setActiveTab] = useState<SettingsTab>("profile")

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="space-y-1 animate-fade-in">
                <h1 className="text-2xl font-semibold text-[#1A1A1A] tracking-tight">
                    Settings
                </h1>
                <p className="text-[#6B6B6B]">
                    Manage your account settings and preferences.
                </p>
            </div>

            {/* Two-column layout */}
            <div className="flex gap-8">
                {/* Left: Settings navigation */}
                <nav className="w-56 shrink-0">
                    <ul className="space-y-1">
                        {tabs.map((tab) => (
                            <li key={tab.id}>
                                <button
                                    onClick={() => setActiveTab(tab.id)}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                                        activeTab === tab.id
                                            ? "bg-[#1A1A1A] text-white"
                                            : "text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F5F5F5]"
                                    )}
                                >
                                    <tab.icon className="w-4 h-4" />
                                    {tab.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Right: Content area */}
                <div className="flex-1 min-w-0">
                    <Card className="animate-fade-in">
                        <div className="p-6">
                            {activeTab === "profile" && <ProfileSettings />}
                            {activeTab === "integrations" && <IntegrationsSettings />}
                            {activeTab === "ai" && <AISettings />}
                            {activeTab === "commission" && <CommissionSettings />}
                            {activeTab === "notifications" && <NotificationsSettings />}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

// Profile Settings
function ProfileSettings() {
    const { addToast } = useToast()
    const [isSaving, setIsSaving] = useState(false)
    const [profile, setProfile] = useState({
        name: "John Doe",
        email: "john@company.com",
        role: "Sales Manager",
    })
    const [notifications, setNotifications] = useState({
        emailUpdates: true,
        dealAlerts: true,
        weeklyDigest: false,
        productNews: true,
    })

    const handleSave = async () => {
        setIsSaving(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setIsSaving(false)
        addToast("success", "Profile settings saved successfully!")
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-lg font-semibold text-[#1A1A1A] mb-1">Profile Information</h2>
                <p className="text-sm text-[#6B6B6B]">Update your personal details.</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <Input
                    label="Full Name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
                <Input
                    label="Email Address"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
                <Input
                    label="Role"
                    value={profile.role}
                    onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                    className="col-span-2"
                />
            </div>

            <hr className="border-[#E5E5E5]" />

            <div>
                <h3 className="text-base font-semibold text-[#1A1A1A] mb-4">Notification Preferences</h3>
                <div className="space-y-4">
                    <Checkbox
                        label="Email updates"
                        description="Receive email notifications about your account"
                        checked={notifications.emailUpdates}
                        onChange={(e) => setNotifications({ ...notifications, emailUpdates: e.target.checked })}
                    />
                    <Checkbox
                        label="Deal alerts"
                        description="Get notified when deals move through stages"
                        checked={notifications.dealAlerts}
                        onChange={(e) => setNotifications({ ...notifications, dealAlerts: e.target.checked })}
                    />
                    <Checkbox
                        label="Weekly digest"
                        description="Receive a weekly summary of agent performance"
                        checked={notifications.weeklyDigest}
                        onChange={(e) => setNotifications({ ...notifications, weeklyDigest: e.target.checked })}
                    />
                    <Checkbox
                        label="Product news"
                        description="Stay updated with new features and improvements"
                        checked={notifications.productNews}
                        onChange={(e) => setNotifications({ ...notifications, productNews: e.target.checked })}
                    />
                </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-[#E5E5E5]">
                <Button onClick={handleSave} loading={isSaving}>
                    Save Changes
                </Button>
            </div>
        </div>
    )
}

// Integrations Settings
function IntegrationsSettings() {
    const { addToast } = useToast()
    const [integrations, setIntegrations] = useState({
        instantly: true,
        clay: false,
        apollo: true,
        crunchbase: false,
    })
    const [crunchbaseKey, setCrunchbaseKey] = useState("")
    const [isSaving, setIsSaving] = useState(false)

    const handleConnect = (name: string, key: keyof typeof integrations) => {
        setIntegrations({ ...integrations, [key]: !integrations[key] })
        addToast(
            integrations[key] ? "info" : "success",
            integrations[key] ? `${name} disconnected` : `${name} connected successfully!`
        )
    }

    const handleSave = async () => {
        setIsSaving(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setIsSaving(false)
        addToast("success", "Integration settings saved!")
    }

    const integrationsList = [
        { key: "instantly" as const, name: "Instantly.ai", description: "Email automation and outreach platform" },
        { key: "clay" as const, name: "Clay", description: "Data enrichment and lead research" },
        { key: "apollo" as const, name: "Apollo", description: "Sales intelligence and engagement" },
    ]

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-lg font-semibold text-[#1A1A1A] mb-1">Integrations</h2>
                <p className="text-sm text-[#6B6B6B]">Connect your favorite tools to enhance agent capabilities.</p>
            </div>

            <div className="space-y-4">
                {integrationsList.map((integration) => (
                    <div
                        key={integration.key}
                        className="flex items-center justify-between p-4 rounded-lg border border-[#E5E5E5] hover:border-[#D1D1D1] transition-colors duration-200"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-[#F5F5F5] flex items-center justify-center">
                                <Puzzle className="w-5 h-5 text-[#6B6B6B]" />
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-[#1A1A1A]">{integration.name}</h4>
                                <p className="text-xs text-[#6B6B6B]">{integration.description}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Badge variant={integrations[integration.key] ? "success" : "default"}>
                                {integrations[integration.key] ? "Connected" : "Not Connected"}
                            </Badge>
                            <Button
                                variant={integrations[integration.key] ? "secondary" : "primary"}
                                size="sm"
                                onClick={() => handleConnect(integration.name, integration.key)}
                            >
                                {integrations[integration.key] ? "Disconnect" : "Connect"}
                            </Button>
                        </div>
                    </div>
                ))}

                {/* Crunchbase with API Key */}
                <div className="p-4 rounded-lg border border-[#E5E5E5]">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-[#F5F5F5] flex items-center justify-center">
                                <Puzzle className="w-5 h-5 text-[#6B6B6B]" />
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-[#1A1A1A]">Crunchbase</h4>
                                <p className="text-xs text-[#6B6B6B]">Company data and funding information</p>
                            </div>
                        </div>
                        <Badge variant={integrations.crunchbase ? "success" : "default"}>
                            {integrations.crunchbase ? "Connected" : "Not Connected"}
                        </Badge>
                    </div>
                    <div className="flex gap-3">
                        <Input
                            placeholder="Enter your Crunchbase API key"
                            value={crunchbaseKey}
                            onChange={(e) => setCrunchbaseKey(e.target.value)}
                            className="flex-1"
                        />
                        <Button
                            variant="secondary"
                            onClick={() => {
                                if (crunchbaseKey) {
                                    setIntegrations({ ...integrations, crunchbase: true })
                                    addToast("success", "Crunchbase API key saved!")
                                }
                            }}
                        >
                            Save Key
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-[#E5E5E5]">
                <Button onClick={handleSave} loading={isSaving}>
                    Save Changes
                </Button>
            </div>
        </div>
    )
}

// AI Configuration Settings
function AISettings() {
    const { addToast } = useToast()
    const [isSaving, setIsSaving] = useState(false)
    const [testingConnection, setTestingConnection] = useState<string | null>(null)
    const [config, setConfig] = useState({
        defaultModel: "claude-3-5-sonnet",
        personalizationLevel: 70,
        claudeKey: "",
        openaiKey: "",
        googleKey: "",
    })

    const handleTestConnection = async (provider: string) => {
        setTestingConnection(provider)
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setTestingConnection(null)
        addToast("success", `${provider} connection successful!`)
    }

    const handleSave = async () => {
        setIsSaving(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setIsSaving(false)
        addToast("success", "AI configuration saved!")
    }

    const modelOptions = [
        { value: "claude-3-5-sonnet", label: "Claude 3.5 Sonnet" },
        { value: "claude-3-opus", label: "Claude 3 Opus" },
        { value: "gpt-4-turbo", label: "GPT-4 Turbo" },
        { value: "gpt-4o", label: "GPT-4o" },
        { value: "gemini-pro", label: "Gemini Pro" },
    ]

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-lg font-semibold text-[#1A1A1A] mb-1">AI Configuration</h2>
                <p className="text-sm text-[#6B6B6B]">Configure AI models and personalization settings.</p>
            </div>

            <div className="space-y-6">
                <Select
                    label="Default AI Model"
                    options={modelOptions}
                    value={config.defaultModel}
                    onChange={(e) => setConfig({ ...config, defaultModel: e.target.value })}
                />

                <Slider
                    label="Default Personalization Level"
                    min={0}
                    max={100}
                    value={config.personalizationLevel}
                    onChange={(value) => setConfig({ ...config, personalizationLevel: value })}
                    valueFormatter={(v) => `${v}%`}
                />
                <p className="text-xs text-[#6B6B6B] -mt-4">
                    Higher levels create more personalized messages but may take longer to generate.
                </p>
            </div>

            <hr className="border-[#E5E5E5]" />

            <div>
                <h3 className="text-base font-semibold text-[#1A1A1A] mb-4">API Keys</h3>
                <div className="space-y-4">
                    {/* Claude API Key */}
                    <div className="flex gap-3 items-end">
                        <Input
                            label="Claude API Key (Anthropic)"
                            type="password"
                            placeholder="sk-ant-..."
                            value={config.claudeKey}
                            onChange={(e) => setConfig({ ...config, claudeKey: e.target.value })}
                            className="flex-1"
                        />
                        <Button
                            variant="secondary"
                            onClick={() => handleTestConnection("Claude")}
                            loading={testingConnection === "Claude"}
                        >
                            <Zap className="w-4 h-4" />
                            Test
                        </Button>
                    </div>

                    {/* OpenAI API Key */}
                    <div className="flex gap-3 items-end">
                        <Input
                            label="OpenAI API Key"
                            type="password"
                            placeholder="sk-..."
                            value={config.openaiKey}
                            onChange={(e) => setConfig({ ...config, openaiKey: e.target.value })}
                            className="flex-1"
                        />
                        <Button
                            variant="secondary"
                            onClick={() => handleTestConnection("OpenAI")}
                            loading={testingConnection === "OpenAI"}
                        >
                            <Zap className="w-4 h-4" />
                            Test
                        </Button>
                    </div>

                    {/* Google API Key */}
                    <div className="flex gap-3 items-end">
                        <Input
                            label="Google AI API Key"
                            type="password"
                            placeholder="AI..."
                            value={config.googleKey}
                            onChange={(e) => setConfig({ ...config, googleKey: e.target.value })}
                            className="flex-1"
                        />
                        <Button
                            variant="secondary"
                            onClick={() => handleTestConnection("Google AI")}
                            loading={testingConnection === "Google AI"}
                        >
                            <Zap className="w-4 h-4" />
                            Test
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-[#E5E5E5]">
                <Button onClick={handleSave} loading={isSaving}>
                    Save Changes
                </Button>
            </div>
        </div>
    )
}

// Commission Rules Settings
function CommissionSettings() {
    const { addToast } = useToast()
    const [isSaving, setIsSaving] = useState(false)
    const [config, setConfig] = useState({
        baseRate: "10",
        tier1Threshold: "10000",
        tier1Bonus: "2",
        tier2Threshold: "25000",
        tier2Bonus: "5",
        tier3Threshold: "50000",
        tier3Bonus: "8",
        paymentSchedule: "monthly",
    })

    const handleSave = async () => {
        setIsSaving(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setIsSaving(false)
        addToast("success", "Commission rules saved!")
    }

    const scheduleOptions = [
        { value: "weekly", label: "Weekly" },
        { value: "biweekly", label: "Bi-weekly" },
        { value: "monthly", label: "Monthly" },
        { value: "quarterly", label: "Quarterly" },
    ]

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-lg font-semibold text-[#1A1A1A] mb-1">Commission Rules</h2>
                <p className="text-sm text-[#6B6B6B]">Configure commission rates and bonus thresholds.</p>
            </div>

            <div className="space-y-6">
                <Input
                    label="Default Base Rate (%)"
                    type="number"
                    value={config.baseRate}
                    onChange={(e) => setConfig({ ...config, baseRate: e.target.value })}
                    hint="Base commission percentage for all deals"
                />

                <hr className="border-[#E5E5E5]" />

                <div>
                    <h3 className="text-base font-semibold text-[#1A1A1A] mb-4">Bonus Tier Thresholds</h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Tier 1 Threshold ($)"
                                type="number"
                                value={config.tier1Threshold}
                                onChange={(e) => setConfig({ ...config, tier1Threshold: e.target.value })}
                            />
                            <Input
                                label="Tier 1 Bonus (%)"
                                type="number"
                                value={config.tier1Bonus}
                                onChange={(e) => setConfig({ ...config, tier1Bonus: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Tier 2 Threshold ($)"
                                type="number"
                                value={config.tier2Threshold}
                                onChange={(e) => setConfig({ ...config, tier2Threshold: e.target.value })}
                            />
                            <Input
                                label="Tier 2 Bonus (%)"
                                type="number"
                                value={config.tier2Bonus}
                                onChange={(e) => setConfig({ ...config, tier2Bonus: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Tier 3 Threshold ($)"
                                type="number"
                                value={config.tier3Threshold}
                                onChange={(e) => setConfig({ ...config, tier3Threshold: e.target.value })}
                            />
                            <Input
                                label="Tier 3 Bonus (%)"
                                type="number"
                                value={config.tier3Bonus}
                                onChange={(e) => setConfig({ ...config, tier3Bonus: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <hr className="border-[#E5E5E5]" />

                <Select
                    label="Payment Schedule"
                    options={scheduleOptions}
                    value={config.paymentSchedule}
                    onChange={(e) => setConfig({ ...config, paymentSchedule: e.target.value })}
                />
            </div>

            <div className="flex justify-end pt-4 border-t border-[#E5E5E5]">
                <Button onClick={handleSave} loading={isSaving}>
                    Save Changes
                </Button>
            </div>
        </div>
    )
}

// Notifications Settings
function NotificationsSettings() {
    const { addToast } = useToast()
    const [isSaving, setIsSaving] = useState(false)
    const [config, setConfig] = useState({
        slackWebhook: "",
        pipelineThreshold: "50000",
        dealCloseThreshold: "10000",
        lowActivityDays: "3",
    })
    const [emailNotifs, setEmailNotifs] = useState({
        newLead: true,
        dealClosed: true,
        agentError: true,
        dailySummary: false,
        weeklyReport: true,
    })

    const handleSave = async () => {
        setIsSaving(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setIsSaving(false)
        addToast("success", "Notification settings saved!")
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-lg font-semibold text-[#1A1A1A] mb-1">Notifications</h2>
                <p className="text-sm text-[#6B6B6B]">Configure how and when you receive notifications.</p>
            </div>

            <div>
                <h3 className="text-base font-semibold text-[#1A1A1A] mb-4">Email Notifications</h3>
                <div className="space-y-4">
                    <Checkbox
                        label="New lead captured"
                        description="Get notified when agents capture new qualified leads"
                        checked={emailNotifs.newLead}
                        onChange={(e) => setEmailNotifs({ ...emailNotifs, newLead: e.target.checked })}
                    />
                    <Checkbox
                        label="Deal closed"
                        description="Receive alerts when deals are successfully closed"
                        checked={emailNotifs.dealClosed}
                        onChange={(e) => setEmailNotifs({ ...emailNotifs, dealClosed: e.target.checked })}
                    />
                    <Checkbox
                        label="Agent errors"
                        description="Get notified about agent failures or issues"
                        checked={emailNotifs.agentError}
                        onChange={(e) => setEmailNotifs({ ...emailNotifs, agentError: e.target.checked })}
                    />
                    <Checkbox
                        label="Daily summary"
                        description="Receive a daily digest of all agent activities"
                        checked={emailNotifs.dailySummary}
                        onChange={(e) => setEmailNotifs({ ...emailNotifs, dailySummary: e.target.checked })}
                    />
                    <Checkbox
                        label="Weekly report"
                        description="Get a comprehensive weekly performance report"
                        checked={emailNotifs.weeklyReport}
                        onChange={(e) => setEmailNotifs({ ...emailNotifs, weeklyReport: e.target.checked })}
                    />
                </div>
            </div>

            <hr className="border-[#E5E5E5]" />

            <div>
                <h3 className="text-base font-semibold text-[#1A1A1A] mb-4">Slack Integration</h3>
                <Input
                    label="Slack Webhook URL"
                    placeholder="https://hooks.slack.com/services/..."
                    value={config.slackWebhook}
                    onChange={(e) => setConfig({ ...config, slackWebhook: e.target.value })}
                    hint="Paste your Slack webhook URL to receive notifications in Slack"
                />
            </div>

            <hr className="border-[#E5E5E5]" />

            <div>
                <h3 className="text-base font-semibold text-[#1A1A1A] mb-4">Alert Thresholds</h3>
                <div className="grid grid-cols-2 gap-6">
                    <Input
                        label="Pipeline Alert ($)"
                        type="number"
                        value={config.pipelineThreshold}
                        onChange={(e) => setConfig({ ...config, pipelineThreshold: e.target.value })}
                        hint="Alert when pipeline exceeds this value"
                    />
                    <Input
                        label="Deal Close Alert ($)"
                        type="number"
                        value={config.dealCloseThreshold}
                        onChange={(e) => setConfig({ ...config, dealCloseThreshold: e.target.value })}
                        hint="Alert for deals above this amount"
                    />
                    <Input
                        label="Low Activity Days"
                        type="number"
                        value={config.lowActivityDays}
                        onChange={(e) => setConfig({ ...config, lowActivityDays: e.target.value })}
                        hint="Alert after X days of no agent activity"
                    />
                </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-[#E5E5E5]">
                <Button onClick={handleSave} loading={isSaving}>
                    Save Changes
                </Button>
            </div>
        </div>
    )
}
