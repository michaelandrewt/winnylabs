import { useState, useEffect } from "react"
import { ClientSidebar, ClientHeader, ClientMobileNav, type ClientPage } from "@/components/layout/ClientLayout"
import { ClientDashboard } from "@/pages/client/ClientDashboard"
import { ClientProducts } from "@/pages/client/ClientProducts"
import { ClientAgents } from "@/pages/client/ClientAgents"
import { ClientPipeline } from "@/pages/client/ClientPipeline"
import { ClientAnalytics } from "@/pages/client/ClientAnalytics"
import { ClientBilling } from "@/pages/client/ClientBilling"
import { ClientSettings } from "@/pages/client/ClientSettings"
import { ClientSalesTeam } from "@/pages/client/ClientSalesTeam"
import { cn } from "@/lib/utils"

const SIDEBAR_STORAGE_KEY = "clientSidebarOpen"

interface ClientAppProps {
    onSwitchToAdmin?: () => void
    onLogout?: () => void
}

export function ClientApp({ onSwitchToAdmin, onLogout }: ClientAppProps) {
    const [currentPage, setCurrentPage] = useState<ClientPage>("home")
    const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false)

    const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem(SIDEBAR_STORAGE_KEY)
            return saved !== "false"
        }
        return true
    })

    useEffect(() => {
        localStorage.setItem(SIDEBAR_STORAGE_KEY, String(isSidebarOpen))
    }, [isSidebarOpen])

    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev)

    const renderPage = () => {
        switch (currentPage) {
            case "home":
                return <ClientDashboard />
            case "products":
                return <ClientProducts />
            case "sales-team":
                return <ClientSalesTeam />
            case "ai-agents":
                return <ClientAgents />
            case "pipeline":
                return <ClientPipeline />
            case "analytics":
                return <ClientAnalytics />
            case "billing":
                return <ClientBilling />
            case "settings":
                return <ClientSettings />
            default:
                return <ClientDashboard />
        }
    }

    return (
        <div className="min-h-screen bg-[#FAFAFA]">
            {/* Sidebar */}
            <ClientSidebar
                currentPage={currentPage}
                onNavigate={setCurrentPage}
                isOpen={isSidebarOpen}
                onToggle={toggleSidebar}
                userName="Client User"
                userEmail="client@company.com"
                onLogout={onLogout}
            />

            {/* Main Content */}
            <div className={cn(
                "transition-all duration-200 ease-in-out",
                "lg:pt-0",
                isSidebarOpen ? "lg:ml-60" : "lg:ml-16"
            )}>
                {/* Header */}
                <ClientHeader
                    onMenuClick={toggleSidebar}
                    userName="Client User"
                />

                {/* Page Content */}
                <main className={cn(
                    "p-4 md:p-6 lg:p-8",
                    "pb-20 lg:pb-8" // Extra padding for mobile nav
                )}>
                    <div className="max-w-6xl mx-auto">
                        {renderPage()}
                    </div>
                </main>
            </div>

            {/* Mobile Bottom Navigation */}
            <ClientMobileNav
                currentPage={currentPage}
                onNavigate={setCurrentPage}
                onMoreClick={() => setIsMoreMenuOpen(true)}
            />

            {/* More Menu Modal (Mobile) */}
            {isMoreMenuOpen && (
                <MoreMenuModal
                    onClose={() => setIsMoreMenuOpen(false)}
                    onNavigate={(page) => {
                        setCurrentPage(page)
                        setIsMoreMenuOpen(false)
                    }}
                />
            )}
        </div>
    )
}

// More Menu Modal for mobile
interface MoreMenuModalProps {
    onClose: () => void
    onNavigate: (page: ClientPage) => void
}

function MoreMenuModal({ onClose, onNavigate }: MoreMenuModalProps) {
    const menuItems = [
        { id: "sales-team" as ClientPage, label: "Sales Team", icon: "👥" },
        { id: "analytics" as ClientPage, label: "Analytics", icon: "📊" },
        { id: "billing" as ClientPage, label: "Billing", icon: "💳" },
        { id: "settings" as ClientPage, label: "Settings", icon: "⚙️" },
    ]

    return (
        <>
            <div
                className="fixed inset-0 bg-black/50 z-50 animate-in fade-in duration-200"
                onClick={onClose}
            />
            <div className={cn(
                "fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl",
                "animate-in slide-in-from-bottom duration-300",
                "pb-safe"
            )}>
                <div className="p-4">
                    <div className="w-12 h-1 bg-[#E5E5E5] rounded-full mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">More Options</h3>
                    <div className="space-y-2">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => onNavigate(item.id)}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg",
                                    "text-left hover:bg-[#F5F5F5] transition-colors"
                                )}
                            >
                                <span className="text-xl">{item.icon}</span>
                                <span className="text-base font-medium text-[#1A1A1A]">{item.label}</span>
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={onClose}
                        className={cn(
                            "w-full mt-4 py-3 rounded-lg",
                            "bg-[#F5F5F5] text-[#6B6B6B] font-medium",
                            "hover:bg-[#E5E5E5] transition-colors"
                        )}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </>
    )
}
