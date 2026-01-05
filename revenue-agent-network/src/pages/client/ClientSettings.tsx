import { useState } from "react"
import { cn } from "@/lib/utils"
import {
    User,
    Bell,
    Shield,
    Link,
    Cpu,
    Moon,
    Sun,
    Monitor,
    Trash2,
    Eye,
    EyeOff,
    Check,
    X,
    Slack,
    Zap,
    TestTube,
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { useToast } from "@/components/ui/Toast"

type SettingsTab = "general" | "integrations" | "ai" | "notifications" | "security"

const settingsTabs = [
    { id: "general", label: "General", icon: User },
    { id: "integrations", label: "Integrations", icon: Link },
    { id: "ai", label: "AI Configuration", icon: Cpu },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
]

// Mock integrations data
const integrations = [
    { id: "instantly", name: "Instantly.ai", description: "Email outreach automation", connected: true, connectedDate: "Jan 15, 2025" },
    { id: "clay", name: "Clay", description: "Data enrichment platform", connected: true, connectedDate: "Jan 10, 2025" },
    { id: "apollo", name: "Apollo", description: "Contact data provider", connected: false },
    { id: "crunchbase", name: "Crunchbase", description: "Company data & funding info", connected: false },
    { id: "slack", name: "Slack", description: "Team notifications", connected: true, connectedDate: "Jan 5, 2025" },
]

export function ClientSettings() {
    const { addToast } = useToast()
    const [activeTab, setActiveTab] = useState<SettingsTab>("general")

    return (
        <div className="animate-fade-in">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-xl md:text-2xl font-semibold text-[#1A1A1A] tracking-tight">
                    Settings
                </h1>
                <p className="text-sm md:text-base text-[#6B6B6B]">
                    Manage your account and preferences
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Settings Navigation */}
                <nav className="lg:w-48 flex-shrink-0">
                    <ul className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-1 pb-2 lg:pb-0">
                        {settingsTabs.map((tab) => (
                            <li key={tab.id}>
                                <button
                                    onClick={() => setActiveTab(tab.id as SettingsTab)}
                                    className={cn(
                                        "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
                                        activeTab === tab.id
                                            ? "bg-[#F5F5F5] text-[#1A1A1A]"
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

                {/* Settings Content */}
                <div className="flex-1 min-w-0">
                    {activeTab === "general" && <GeneralSettings onSave={() => addToast("success", "Settings saved!")} />}
                    {activeTab === "integrations" && <IntegrationsSettings onConnect={() => addToast("success", "Integration connected!")} />}
                    {activeTab === "ai" && <AISettings onSave={() => addToast("success", "AI settings saved!")} />}
                    {activeTab === "notifications" && <NotificationSettings onSave={() => addToast("success", "Notification settings saved!")} />}
                    {activeTab === "security" && <SecuritySettings />}
                </div>
            </div>
        </div>
    )
}

// General Settings
function GeneralSettings({ onSave }: { onSave: () => void }) {
    const [profile, setProfile] = useState({
        name: "Michael Wong",
        email: "michael@winnylabs.com",
        role: "GTM Engineer",
    })

    const [notifications, setNotifications] = useState({
        dealUpdates: true,
        agentPerformance: true,
        weeklyDigest: false,
        marketing: false,
    })

    const [appearance, setAppearance] = useState<"light" | "dark" | "system">("system")

    return (
        <div className="space-y-8">
            {/* Profile Information */}
            <section className="bg-white rounded-lg border border-[#E5E5E5] p-6">
                <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">Profile Information</h2>
                <div className="space-y-4 max-w-md">
                    <Input
                        label="Name"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                    <Input
                        label="Email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                    <Input
                        label="Role"
                        value={profile.role}
                        onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                    />
                    <Button onClick={onSave}>Save Changes</Button>
                </div>
            </section>

            {/* Notification Preferences */}
            <section className="bg-white rounded-lg border border-[#E5E5E5] p-6">
                <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">Notification Preferences</h2>
                <div className="space-y-3">
                    {[
                        { key: "dealUpdates", label: "Deal updates" },
                        { key: "agentPerformance", label: "Agent performance alerts" },
                        { key: "weeklyDigest", label: "Weekly digest" },
                        { key: "marketing", label: "Marketing emails" },
                    ].map((item) => (
                        <label key={item.key} className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={notifications[item.key as keyof typeof notifications]}
                                onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                                className="w-4 h-4 rounded border-[#E5E5E5] text-blue-600"
                            />
                            <span className="text-sm text-[#1A1A1A]">{item.label}</span>
                        </label>
                    ))}
                </div>
            </section>

            {/* Appearance */}
            <section className="bg-white rounded-lg border border-[#E5E5E5] p-6">
                <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">Appearance</h2>
                <div className="flex gap-3">
                    {[
                        { id: "light", icon: Sun, label: "Light" },
                        { id: "dark", icon: Moon, label: "Dark" },
                        { id: "system", icon: Monitor, label: "System" },
                    ].map((option) => (
                        <button
                            key={option.id}
                            onClick={() => setAppearance(option.id as typeof appearance)}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors",
                                appearance === option.id
                                    ? "border-blue-500 bg-blue-50 text-blue-700"
                                    : "border-[#E5E5E5] text-[#6B6B6B] hover:border-[#1A1A1A]"
                            )}
                        >
                            <option.icon className="w-4 h-4" />
                            <span className="text-sm font-medium">{option.label}</span>
                        </button>
                    ))}
                </div>
            </section>
        </div>
    )
}

// Integrations Settings
function IntegrationsSettings({ onConnect }: { onConnect: () => void }) {
    return (
        <div className="bg-white rounded-lg border border-[#E5E5E5] p-6">
            <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">Integrations</h2>
            <div className="space-y-4">
                {integrations.map((integration) => (
                    <div
                        key={integration.id}
                        className="flex items-center justify-between p-4 rounded-lg border border-[#E5E5E5]"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-[#F5F5F5] flex items-center justify-center">
                                {integration.id === "slack" ? (
                                    <Slack className="w-5 h-5 text-[#6B6B6B]" />
                                ) : (
                                    <Zap className="w-5 h-5 text-[#6B6B6B]" />
                                )}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-[#1A1A1A]">{integration.name}</p>
                                <p className="text-xs text-[#6B6B6B]">{integration.description}</p>
                                {integration.connected && integration.connectedDate && (
                                    <p className="text-xs text-emerald-600">Connected {integration.connectedDate}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {integration.connected ? (
                                <>
                                    <Button variant="secondary" size="sm">
                                        <TestTube className="w-4 h-4" />
                                        Test
                                    </Button>
                                    <Button variant="danger" size="sm">
                                        Disconnect
                                    </Button>
                                </>
                            ) : (
                                <Button size="sm" onClick={onConnect}>
                                    Connect
                                </Button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

// AI Settings
function AISettings({ onSave }: { onSave: () => void }) {
    const [showKeys, setShowKeys] = useState<Record<string, boolean>>({})

    return (
        <div className="space-y-6">
            {/* Default AI Model */}
            <section className="bg-white rounded-lg border border-[#E5E5E5] p-6">
                <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">Default AI Model</h2>
                <select className="w-full max-w-xs px-3 py-2 text-sm rounded-lg border border-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                    <option>Claude Sonnet 4</option>
                    <option>GPT-4 Turbo</option>
                    <option>Gemini Pro</option>
                </select>
            </section>

            {/* API Keys */}
            <section className="bg-white rounded-lg border border-[#E5E5E5] p-6">
                <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">API Keys</h2>
                <div className="space-y-4">
                    {[
                        { id: "anthropic", label: "Anthropic API Key" },
                        { id: "openai", label: "OpenAI API Key" },
                        { id: "google", label: "Google AI API Key" },
                    ].map((key) => (
                        <div key={key.id} className="flex items-center gap-3">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">{key.label}</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type={showKeys[key.id] ? "text" : "password"}
                                        defaultValue="sk-••••••••••••••••••••••••"
                                        className="flex-1 px-3 py-2 text-sm rounded-lg border border-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    />
                                    <button
                                        onClick={() => setShowKeys({ ...showKeys, [key.id]: !showKeys[key.id] })}
                                        className="p-2 text-[#6B6B6B] hover:text-[#1A1A1A]"
                                    >
                                        {showKeys[key.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                    <Button variant="secondary" size="sm">Update</Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <Button className="mt-4" variant="secondary" onClick={onSave}>
                    <TestTube className="w-4 h-4" />
                    Test All Connections
                </Button>
            </section>
        </div>
    )
}

// Notification Settings
function NotificationSettings({ onSave }: { onSave: () => void }) {
    const [settings, setSettings] = useState({
        lowReplyRate: 25,
        highValueDeal: 50000,
        pipelineDrop: 20,
        slackWebhook: "https://hooks.slack.com/services/...",
    })

    return (
        <div className="space-y-6">
            {/* Alert Thresholds */}
            <section className="bg-white rounded-lg border border-[#E5E5E5] p-6">
                <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">Alert Thresholds</h2>
                <div className="space-y-4 max-w-md">
                    <div>
                        <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">Low reply rate alert</label>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-[#6B6B6B]">Below</span>
                            <input
                                type="number"
                                value={settings.lowReplyRate}
                                onChange={(e) => setSettings({ ...settings, lowReplyRate: parseInt(e.target.value) })}
                                className="w-20 px-3 py-2 text-sm rounded-lg border border-[#E5E5E5]"
                            />
                            <span className="text-sm text-[#6B6B6B]">%</span>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">High-value deal alert</label>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-[#6B6B6B]">Above $</span>
                            <input
                                type="number"
                                value={settings.highValueDeal}
                                onChange={(e) => setSettings({ ...settings, highValueDeal: parseInt(e.target.value) })}
                                className="w-28 px-3 py-2 text-sm rounded-lg border border-[#E5E5E5]"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">Pipeline drop alert</label>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-[#6B6B6B]">More than</span>
                            <input
                                type="number"
                                value={settings.pipelineDrop}
                                onChange={(e) => setSettings({ ...settings, pipelineDrop: parseInt(e.target.value) })}
                                className="w-20 px-3 py-2 text-sm rounded-lg border border-[#E5E5E5]"
                            />
                            <span className="text-sm text-[#6B6B6B]">% decrease</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Slack Webhook */}
            <section className="bg-white rounded-lg border border-[#E5E5E5] p-6">
                <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">Slack Webhook</h2>
                <div className="flex items-center gap-2 max-w-lg">
                    <input
                        type="text"
                        value={settings.slackWebhook}
                        onChange={(e) => setSettings({ ...settings, slackWebhook: e.target.value })}
                        className="flex-1 px-3 py-2 text-sm rounded-lg border border-[#E5E5E5]"
                    />
                    <Button variant="secondary" size="sm">Test</Button>
                </div>
                <Button className="mt-4" onClick={onSave}>Save Settings</Button>
            </section>
        </div>
    )
}

// Security Settings
function SecuritySettings() {
    const [sessions] = useState([
        { device: "Chrome on MacOS", location: "San Francisco, CA", lastActive: "Now", current: true },
        { device: "Safari on iPhone", location: "San Francisco, CA", lastActive: "2h ago", current: false },
        { device: "Firefox on Windows", location: "New York, NY", lastActive: "5d ago", current: false },
    ])

    return (
        <div className="space-y-6">
            {/* Two-Factor Authentication */}
            <section className="bg-white rounded-lg border border-[#E5E5E5] p-6">
                <h2 className="text-lg font-semibold text-[#1A1A1A] mb-2">Two-Factor Authentication</h2>
                <p className="text-sm text-[#6B6B6B] mb-4">Add an extra layer of security to your account</p>
                <div className="flex items-center gap-4">
                    <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded">Disabled</span>
                    <Button>Enable 2FA</Button>
                </div>
            </section>

            {/* Active Sessions */}
            <section className="bg-white rounded-lg border border-[#E5E5E5] p-6">
                <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">Active Sessions</h2>
                <div className="space-y-3">
                    {sessions.map((session, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-[#E5E5E5]">
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="text-sm font-medium text-[#1A1A1A]">{session.device}</p>
                                    {session.current && (
                                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-medium rounded">
                                            Current
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-[#6B6B6B]">{session.location} • {session.lastActive}</p>
                            </div>
                            {!session.current && (
                                <Button variant="danger" size="sm">Revoke</Button>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Danger Zone */}
            <section className="bg-white rounded-lg border border-red-200 p-6">
                <h2 className="text-lg font-semibold text-red-600 mb-2">Danger Zone</h2>
                <p className="text-sm text-[#6B6B6B] mb-4">
                    Permanently delete your account and all associated data
                </p>
                <Button variant="danger">
                    <Trash2 className="w-4 h-4" />
                    Delete Account
                </Button>
            </section>
        </div>
    )
}
