import { useState } from "react"
import { cn } from "@/lib/utils"
import {
    Home,
    Package,
    Users,
    Bot,
    TrendingUp,
    BarChart3,
    CreditCard,
    Settings,
    Menu,
    X,
    Bell,
    Search,
    HelpCircle,
    ChevronDown,
    LogOut,
    User,
    Key,
    FileText,
    Headphones,
    Plus,
    type LucideIcon,
} from "lucide-react"

// Navigation structure for client app
interface NavSection {
    title?: string
    items: NavItem[]
}

interface NavItem {
    id: string
    label: string
    icon: LucideIcon
}

const navigationSections: NavSection[] = [
    {
        title: "Overview",
        items: [
            { id: "home", label: "Home", icon: Home },
        ],
    },
    {
        title: "Setup",
        items: [
            { id: "products", label: "Products", icon: Package },
            { id: "sales-team", label: "Sales Team", icon: Users },
            { id: "ai-agents", label: "AI Agents", icon: Bot },
        ],
    },
    {
        title: "Manage",
        items: [
            { id: "pipeline", label: "Pipeline", icon: TrendingUp },
            { id: "analytics", label: "Analytics", icon: BarChart3 },
        ],
    },
    {
        title: "Account",
        items: [
            { id: "billing", label: "Billing", icon: CreditCard },
            { id: "settings", label: "Settings", icon: Settings },
        ],
    },
]

export type ClientPage = "home" | "products" | "sales-team" | "ai-agents" | "pipeline" | "analytics" | "billing" | "settings"

interface ClientSidebarProps {
    currentPage: ClientPage
    onNavigate: (page: ClientPage) => void
    isOpen: boolean
    onToggle: () => void
    userName: string
    userEmail: string
    onLogout?: () => void
}

// Tooltip component
function Tooltip({ children, label, show }: { children: React.ReactNode; label: string; show: boolean }) {
    const [isVisible, setIsVisible] = useState(false)

    if (!show) return <>{children}</>

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <div className={cn(
                    "absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50",
                    "px-2.5 py-1.5 text-xs font-medium text-white bg-[#1A1A1A] rounded-md",
                    "whitespace-nowrap shadow-lg animate-in fade-in duration-150"
                )}>
                    {label}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#1A1A1A]" />
                </div>
            )}
        </div>
    )
}

export function ClientSidebar({ currentPage, onNavigate, isOpen, onToggle, userName, userEmail, onLogout }: ClientSidebarProps) {
    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-in fade-in duration-200"
                    onClick={onToggle}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "fixed left-0 top-0 h-screen bg-white border-r border-[#E5E5E5] flex flex-col z-50",
                "transition-all duration-200 ease-in-out",
                "lg:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
                isOpen ? "w-60" : "w-60 lg:w-16"
            )}>
                {/* Header */}
                <div className={cn(
                    "h-16 flex items-center border-b border-[#E5E5E5]",
                    isOpen ? "px-4 justify-between" : "px-0 justify-center"
                )}>
                    {isOpen ? (
                        <>
                            <button
                                onClick={() => onNavigate("home")}
                                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                            >
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center flex-shrink-0">
                                    <span className="text-white font-bold text-sm">R</span>
                                </div>
                                <span className="font-semibold text-[#1A1A1A] tracking-tight">RAN</span>
                            </button>
                            <button
                                onClick={onToggle}
                                className="p-2 rounded-lg text-[#6B6B6B] hidden lg:flex hover:text-[#1A1A1A] hover:bg-[#F5F5F5] transition-colors"
                            >
                                <Menu className="w-5 h-5" />
                            </button>
                            <button
                                onClick={onToggle}
                                className="p-2 rounded-lg text-[#6B6B6B] lg:hidden hover:text-[#1A1A1A] hover:bg-[#F5F5F5] transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={onToggle}
                            className="p-2 rounded-lg text-[#6B6B6B] hidden lg:flex hover:text-[#1A1A1A] hover:bg-[#F5F5F5] transition-colors"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-4 px-3">
                    {navigationSections.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="mb-6">
                            {section.title && isOpen && (
                                <p className="px-3 mb-2 text-xs font-medium text-[#6B6B6B] uppercase tracking-wider">
                                    {section.title}
                                </p>
                            )}
                            <ul className="space-y-1">
                                {section.items.map((item) => (
                                    <li key={item.id}>
                                        <Tooltip label={item.label} show={!isOpen}>
                                            <button
                                                onClick={() => {
                                                    onNavigate(item.id as ClientPage)
                                                    if (window.innerWidth < 1024) onToggle()
                                                }}
                                                className={cn(
                                                    "w-full flex items-center gap-3 rounded-lg font-medium transition-all duration-200",
                                                    isOpen ? "px-3 py-2.5" : "p-2.5 justify-center",
                                                    currentPage === item.id
                                                        ? "bg-[#F5F5F5] text-[#1A1A1A] border-l-[3px] border-blue-600 -ml-px"
                                                        : "text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F5F5F5]"
                                                )}
                                            >
                                                <item.icon className={cn("w-5 h-5 flex-shrink-0", !isOpen && "mx-auto")} />
                                                {isOpen && <span className="text-sm">{item.label}</span>}
                                            </button>
                                        </Tooltip>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>

                {/* New Agent CTA */}
                {isOpen && (
                    <div className="px-3 pb-4">
                        <button
                            onClick={() => onNavigate("ai-agents")}
                            className={cn(
                                "w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg",
                                "bg-[#1A1A1A] text-white text-sm font-medium",
                                "hover:opacity-90 transition-opacity"
                            )}
                        >
                            <Plus className="w-4 h-4" />
                            New Agent
                        </button>
                    </div>
                )}

                {/* Footer */}
                <div className={cn(
                    "py-4 border-t border-[#E5E5E5]",
                    isOpen ? "px-3" : "px-2"
                )}>
                    <Tooltip label={userName} show={!isOpen}>
                        <button
                            onClick={() => onNavigate("settings")}
                            className={cn(
                                "w-full flex items-center gap-3 rounded-lg",
                                "hover:bg-[#F5F5F5] transition-colors",
                                isOpen ? "px-2 py-2" : "p-2 justify-center"
                            )}
                        >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                                <span className="text-xs font-medium text-white">
                                    {userName.split(" ").map(n => n[0]).join("").slice(0, 2)}
                                </span>
                            </div>
                            {isOpen && (
                                <div className="flex-1 min-w-0 text-left">
                                    <p className="text-sm font-medium text-[#1A1A1A] truncate">{userName}</p>
                                    <p className="text-xs text-[#6B6B6B] truncate">{userEmail}</p>
                                </div>
                            )}
                        </button>
                    </Tooltip>
                    {onLogout && (
                        <button
                            onClick={onLogout}
                            className={cn(
                                "mt-2 flex items-center gap-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full",
                                isOpen ? "px-3 py-2" : "p-2 justify-center"
                            )}
                        >
                            <LogOut className="w-4 h-4" />
                            {isOpen && <span className="text-sm font-medium">Sign Out</span>}
                        </button>
                    )}
                </div>
            </aside>
        </>
    )
}

// Client Header
interface ClientHeaderProps {
    onMenuClick: () => void
    userName: string
}

export function ClientHeader({ onMenuClick, userName }: ClientHeaderProps) {
    const [isProfileOpen, setIsProfileOpen] = useState(false)

    return (
        <header className="h-16 bg-white border-b border-[#E5E5E5] flex items-center justify-between px-4 lg:px-6">
            {/* Left - Logo & Menu */}
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="p-2 -ml-2 rounded-lg text-[#6B6B6B] lg:hidden hover:text-[#1A1A1A] hover:bg-[#F5F5F5] transition-colors"
                >
                    <Menu className="w-5 h-5" />
                </button>
                <div className="hidden lg:flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                        <span className="text-white font-bold text-xs">R</span>
                    </div>
                    <span className="font-semibold text-[#1A1A1A] text-sm">Revenue Agent Network</span>
                </div>
            </div>

            {/* Center - Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B6B]" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className={cn(
                            "w-full pl-10 pr-4 py-2 text-sm rounded-lg border",
                            "bg-[#FAFAFA] border-[#E5E5E5]",
                            "placeholder:text-[#9CA3AF]",
                            "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500",
                            "transition-all duration-200"
                        )}
                    />
                </div>
            </div>

            {/* Right - Actions */}
            <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F5F5F5] transition-colors relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                </button>
                <button className="p-2 rounded-lg text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F5F5F5] transition-colors hidden md:flex">
                    <HelpCircle className="w-5 h-5" />
                </button>

                {/* Profile Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className={cn(
                            "flex items-center gap-2 px-2 py-1.5 rounded-lg",
                            "hover:bg-[#F5F5F5] transition-colors"
                        )}
                    >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                            <span className="text-xs font-medium text-white">
                                {userName.split(" ").map(n => n[0]).join("").slice(0, 2)}
                            </span>
                        </div>
                        <ChevronDown className={cn(
                            "w-4 h-4 text-[#6B6B6B] transition-transform hidden md:block",
                            isProfileOpen && "rotate-180"
                        )} />
                    </button>

                    {isProfileOpen && (
                        <>
                            <div
                                className="fixed inset-0 z-40"
                                onClick={() => setIsProfileOpen(false)}
                            />
                            <div className={cn(
                                "absolute right-0 top-full mt-2 w-56 z-50",
                                "bg-white rounded-lg border border-[#E5E5E5] shadow-lg",
                                "animate-in fade-in slide-in-from-top-2 duration-200"
                            )}>
                                <div className="p-3 border-b border-[#E5E5E5]">
                                    <p className="text-sm font-medium text-[#1A1A1A]">{userName}</p>
                                    <p className="text-xs text-[#6B6B6B]">client@company.com</p>
                                </div>
                                <div className="py-1">
                                    {[
                                        { icon: User, label: "Profile Settings" },
                                        { icon: Settings, label: "Appearance" },
                                        { icon: Key, label: "API Keys" },
                                    ].map((item) => (
                                        <button
                                            key={item.label}
                                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F5F5F5] transition-colors"
                                        >
                                            <item.icon className="w-4 h-4" />
                                            {item.label}
                                        </button>
                                    ))}
                                </div>
                                <div className="border-t border-[#E5E5E5] py-1">
                                    {[
                                        { icon: FileText, label: "Documentation" },
                                        { icon: Headphones, label: "Support" },
                                    ].map((item) => (
                                        <button
                                            key={item.label}
                                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F5F5F5] transition-colors"
                                        >
                                            <item.icon className="w-4 h-4" />
                                            {item.label}
                                        </button>
                                    ))}
                                </div>
                                <div className="border-t border-[#E5E5E5] py-1">
                                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                                        <LogOut className="w-4 h-4" />
                                        Log Out
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}

// Mobile Bottom Navigation
interface ClientMobileNavProps {
    currentPage: ClientPage
    onNavigate: (page: ClientPage) => void
    onMoreClick: () => void
}

export function ClientMobileNav({ currentPage, onNavigate, onMoreClick }: ClientMobileNavProps) {
    const navItems = [
        { id: "home", label: "Home", icon: Home },
        { id: "products", label: "Products", icon: Package },
        { id: "ai-agents", label: "Agents", icon: Bot },
        { id: "pipeline", label: "Pipeline", icon: TrendingUp },
        { id: "more", label: "More", icon: Menu },
    ]

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#E5E5E5] pb-safe lg:hidden">
            <div className="flex items-center justify-around h-16">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => item.id === "more" ? onMoreClick() : onNavigate(item.id as ClientPage)}
                        className={cn(
                            "flex flex-col items-center justify-center flex-1 h-full gap-1",
                            "transition-colors duration-200",
                            currentPage === item.id ? "text-blue-600" : "text-[#6B6B6B]"
                        )}
                    >
                        <item.icon className={cn("w-5 h-5", currentPage === item.id && "stroke-[2.5px]")} />
                        <span className="text-[10px] font-medium">{item.label}</span>
                    </button>
                ))}
            </div>
        </nav>
    )
}
