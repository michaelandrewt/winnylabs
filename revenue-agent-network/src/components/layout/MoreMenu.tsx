import { cn } from "@/lib/utils"
import {
    Package,
    BarChart3,
    Settings,
    X,
    type LucideIcon,
} from "lucide-react"
import type { Page } from "@/types"

interface MenuItem {
    id: Page
    label: string
    icon: LucideIcon
    description: string
}

const menuItems: MenuItem[] = [
    { id: "products", label: "Products", icon: Package, description: "Manage product catalog" },
    { id: "analytics", label: "Analytics", icon: BarChart3, description: "View performance metrics" },
    { id: "settings", label: "Settings", icon: Settings, description: "Configure app settings" },
]

interface MoreMenuProps {
    isOpen: boolean
    onClose: () => void
    onNavigate: (page: Page) => void
}

export function MoreMenu({ isOpen, onClose, onNavigate }: MoreMenuProps) {
    if (!isOpen) return null

    const handleNavigate = (page: Page) => {
        onNavigate(page)
        onClose()
    }

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-50 bg-black/50 animate-in fade-in duration-200 md:hidden"
                onClick={onClose}
            />

            {/* Menu */}
            <div
                className={cn(
                    "fixed bottom-0 left-0 right-0 z-50 md:hidden",
                    "bg-white rounded-t-2xl",
                    "animate-in slide-in-from-bottom-full duration-300",
                    "pb-safe"
                )}
            >
                {/* Handle */}
                <div className="flex justify-center py-3">
                    <div className="w-10 h-1 rounded-full bg-[#E5E5E5]" />
                </div>

                {/* Header */}
                <div className="flex items-center justify-between px-6 pb-4">
                    <h2 className="text-lg font-semibold text-[#1A1A1A]">More</h2>
                    <button
                        onClick={onClose}
                        className="p-2 -mr-2 rounded-lg text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F5F5F5] transition-colors touch-target"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Menu Items */}
                <div className="px-4 pb-6 space-y-2">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleNavigate(item.id)}
                            className={cn(
                                "w-full flex items-center gap-4 p-4 rounded-xl",
                                "text-left transition-colors duration-200",
                                "hover:bg-[#F5F5F5] active:bg-[#E5E5E5]"
                            )}
                        >
                            <div className="w-12 h-12 rounded-xl bg-[#F5F5F5] flex items-center justify-center">
                                <item.icon className="w-6 h-6 text-[#1A1A1A]" />
                            </div>
                            <div>
                                <p className="text-base font-medium text-[#1A1A1A]">{item.label}</p>
                                <p className="text-sm text-[#6B6B6B]">{item.description}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </>
    )
}
