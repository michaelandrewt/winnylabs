import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import {
    Bot,
    Users,
    Building2,
    Package,
    TrendingUp,
    BarChart3,
    Settings,
    Menu,
    X,
    ChevronDown,
    Shield,
    User,
    type LucideIcon
} from "lucide-react"
import type { Page } from "@/App"

interface NavItem {
    id: Page
    label: string
    icon: LucideIcon
}

// Navigation items - Dashboard removed, Agents is now the home/default
const navItems: NavItem[] = [
    { id: "agents", label: "Agents", icon: Bot },
    { id: "associates", label: "Associates", icon: Users },
    { id: "companies", label: "Companies", icon: Building2 },
    { id: "products", label: "Products", icon: Package },
    { id: "pipeline", label: "Pipeline", icon: TrendingUp },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
]

interface SidebarProps {
    currentPage: Page
    onNavigate: (page: Page) => void
    isOpen: boolean
    onToggle: () => void
}

// Tooltip component for collapsed state
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
                    "whitespace-nowrap shadow-lg",
                    "animate-in fade-in duration-150"
                )}>
                    {label}
                    {/* Arrow */}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#1A1A1A]" />
                </div>
            )}
        </div>
    )
}

// User profiles - 4 different views under WinnyLabs
type ProfileType = "admin" | "client" | "associate" | "agents"

const profiles = {
    admin: {
        label: "Admin",
        icon: Shield,
        name: "WinnyLabs Admin",
        email: "admin@winnylabs.com",
        color: "bg-[#1A1A1A]",
    },
    client: {
        label: "Client",
        icon: User,
        name: "Client Portal",
        email: "client@company.com",
        color: "bg-blue-600",
    },
    associate: {
        label: "Associate",
        icon: Users,
        name: "Associate Portal",
        email: "associate@winnylabs.com",
        color: "bg-emerald-600",
    },
    agents: {
        label: "Agents",
        icon: Bot,
        name: "Agent Manager",
        email: "agents@winnylabs.com",
        color: "bg-purple-600",
    },
}

// User Profile Section with click dropdown
function UserProfileSection({ onNavigate, isOpen }: { onNavigate: (page: Page) => void; isOpen: boolean }) {
    const [activeProfile, setActiveProfile] = useState<ProfileType>(() => {
        if (typeof window !== "undefined") {
            return (localStorage.getItem("userProfile") as ProfileType) || "admin"
        }
        return "admin"
    })
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const handleProfileChange = (profile: ProfileType) => {
        setActiveProfile(profile)
        localStorage.setItem("userProfile", profile)
        setIsDropdownOpen(false)
    }

    const currentProfile = profiles[activeProfile]
    const Icon = currentProfile.icon

    return (
        <div className="relative">
            {/* Current Profile Avatar/Button */}
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={cn(
                    "w-full flex items-center gap-3 rounded-lg",
                    "hover:bg-[#F5F5F5] transition-colors duration-200",
                    isOpen ? "px-2 py-2" : "p-2 justify-center"
                )}
            >
                <div className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0",
                    currentProfile.color
                )}>
                    <Icon className="w-4 h-4 text-white" />
                </div>
                {isOpen && (
                    <div className="flex-1 min-w-0 text-left">
                        <p className="text-sm font-medium text-[#1A1A1A] truncate">{currentProfile.name}</p>
                        <p className="text-xs text-[#6B6B6B] truncate">{currentProfile.email}</p>
                    </div>
                )}
            </button>

            {/* Click Dropdown */}
            {isDropdownOpen && (
                <>
                    {/* Backdrop to close dropdown when clicking outside */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsDropdownOpen(false)}
                    />
                    <div className={cn(
                        "absolute z-50 bg-white rounded-lg border border-[#E5E5E5] shadow-lg",
                        "animate-in fade-in slide-in-from-bottom-2 duration-150",
                        isOpen
                            ? "bottom-full left-0 right-0 mb-2"
                            : "bottom-0 left-full ml-2 w-48"
                    )}>
                        <div className="p-2">
                            <p className="px-2 py-1 text-xs font-medium text-[#6B6B6B] uppercase tracking-wider">
                                Switch Profile
                            </p>
                            {(Object.keys(profiles) as ProfileType[]).map((profileKey) => {
                                const profile = profiles[profileKey]
                                const ProfileIcon = profile.icon
                                const isActive = activeProfile === profileKey
                                return (
                                    <button
                                        key={profileKey}
                                        onClick={() => handleProfileChange(profileKey)}
                                        className={cn(
                                            "w-full flex items-center gap-3 px-2 py-2.5 rounded-lg transition-colors duration-150",
                                            isActive
                                                ? "bg-[#F5F5F5] text-[#1A1A1A]"
                                                : "text-[#6B6B6B] hover:bg-[#F5F5F5] hover:text-[#1A1A1A]"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                                            profile.color
                                        )}>
                                            <ProfileIcon className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0 text-left">
                                            <p className="text-sm font-medium">{profile.name}</p>
                                            <p className="text-xs text-[#6B6B6B]">{profile.email}</p>
                                        </div>
                                        {isActive && (
                                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                        )}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export function Sidebar({ currentPage, onNavigate, isOpen, onToggle }: SidebarProps) {
    return (
        <>
            {/* Mobile overlay backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden animate-in fade-in duration-200"
                    onClick={onToggle}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "fixed left-0 top-0 h-screen bg-white border-r border-[#E5E5E5] flex flex-col z-50",
                "transition-all duration-200 ease-in-out",
                // Mobile: overlay from left
                "md:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
                // Width based on open state
                isOpen ? "w-60" : "w-60 md:w-16"
            )}>
                {/* Header with Logo and Hamburger */}
                <div className={cn(
                    "h-16 flex items-center border-b border-[#E5E5E5]",
                    isOpen ? "px-4 justify-between" : "px-0 justify-center"
                )}>
                    {isOpen ? (
                        <>
                            {/* Logo and branding */}
                            <button
                                onClick={() => onNavigate("agents")}
                                className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-200"
                            >
                                <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] flex items-center justify-center flex-shrink-0">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                                <span className="font-semibold text-[#1A1A1A] tracking-tight text-base">
                                    Revenue Agent
                                </span>
                            </button>
                            {/* Hamburger toggle (desktop) */}
                            <button
                                onClick={onToggle}
                                className={cn(
                                    "p-2 rounded-lg text-[#6B6B6B] hidden md:flex",
                                    "hover:text-[#1A1A1A] hover:bg-[#F5F5F5]",
                                    "transition-colors duration-200"
                                )}
                                aria-label="Collapse sidebar"
                            >
                                <Menu className="w-5 h-5" />
                            </button>
                            {/* Close button (mobile) */}
                            <button
                                onClick={onToggle}
                                className={cn(
                                    "p-2 rounded-lg text-[#6B6B6B] md:hidden",
                                    "hover:text-[#1A1A1A] hover:bg-[#F5F5F5]",
                                    "transition-colors duration-200"
                                )}
                                aria-label="Close sidebar"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </>
                    ) : (
                        /* Collapsed state - hamburger only (hidden on mobile) */
                        <button
                            onClick={onToggle}
                            className={cn(
                                "p-2 rounded-lg text-[#6B6B6B] hidden md:flex",
                                "hover:text-[#1A1A1A] hover:bg-[#F5F5F5]",
                                "transition-colors duration-200"
                            )}
                            aria-label="Expand sidebar"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                    )}
                </div>

                {/* Navigation */}
                <nav className={cn(
                    "flex-1 py-4",
                    isOpen ? "px-3" : "px-2"
                )}>
                    <ul className="space-y-1">
                        {navItems.map((item) => (
                            <li key={item.id}>
                                <Tooltip label={item.label} show={!isOpen}>
                                    <button
                                        onClick={() => {
                                            onNavigate(item.id)
                                            // Close sidebar on mobile after navigation
                                            if (window.innerWidth < 768) {
                                                onToggle()
                                            }
                                        }}
                                        className={cn(
                                            "w-full flex items-center gap-3 rounded-lg font-medium transition-all duration-200",
                                            isOpen ? "px-3 py-2.5" : "p-2.5 justify-center",
                                            currentPage === item.id
                                                ? "bg-[#F5F5F5] text-[#1A1A1A] border-l-[3px] border-[#1A1A1A] -ml-px"
                                                : "text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F5F5F5]"
                                        )}
                                        title={!isOpen ? item.label : undefined}
                                    >
                                        <item.icon className={cn(
                                            "w-5 h-5 flex-shrink-0",
                                            !isOpen && "mx-auto"
                                        )} />
                                        {isOpen && (
                                            <span className="text-sm">{item.label}</span>
                                        )}
                                    </button>
                                </Tooltip>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Footer - User Profile */}
                <div className={cn(
                    "py-3 border-t border-[#E5E5E5]",
                    isOpen ? "px-3" : "px-2"
                )}>
                    <UserProfileSection onNavigate={onNavigate} isOpen={isOpen} />
                </div>
            </aside>
        </>
    )
}

// Mobile header with hamburger (shown when sidebar is hidden on mobile)
interface MobileHeaderProps {
    onMenuClick: () => void
}

export function MobileHeader({ onMenuClick }: MobileHeaderProps) {
    return (
        <header className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-[#E5E5E5] z-30 md:hidden flex items-center px-4">
            <button
                onClick={onMenuClick}
                className={cn(
                    "p-2 -ml-2 rounded-lg text-[#6B6B6B]",
                    "hover:text-[#1A1A1A] hover:bg-[#F5F5F5]",
                    "transition-colors duration-200"
                )}
                aria-label="Open menu"
            >
                <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 ml-2">
                <div className="w-7 h-7 rounded-lg bg-[#1A1A1A] flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-[#1A1A1A] text-sm">Revenue Agent</span>
            </div>
        </header>
    )
}
