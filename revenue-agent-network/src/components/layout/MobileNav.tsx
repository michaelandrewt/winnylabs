import { cn } from "@/lib/utils"
import {
    Bot,
    Building2,
    TrendingUp,
    MoreHorizontal,
    type LucideIcon,
} from "lucide-react"
import type { Page } from "@/App"

interface NavItem {
    id: Page | "more"
    label: string
    icon: LucideIcon
}

// Navigation items - Agents is now home/default
const navItems: NavItem[] = [
    { id: "agents", label: "Agents", icon: Bot },
    { id: "companies", label: "Companies", icon: Building2 },
    { id: "pipeline", label: "Pipeline", icon: TrendingUp },
    { id: "more", label: "More", icon: MoreHorizontal },
]

interface MobileNavProps {
    currentPage: Page
    onNavigate: (page: Page) => void
    onMoreClick: () => void
}

export function MobileNav({ currentPage, onNavigate, onMoreClick }: MobileNavProps) {
    const handleClick = (item: NavItem) => {
        if (item.id === "more") {
            onMoreClick()
        } else {
            onNavigate(item.id as Page)
        }
    }

    const isActive = (item: NavItem) => {
        if (item.id === "more") {
            return ["settings", "analytics", "products"].includes(currentPage)
        }
        return currentPage === item.id
    }

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#E5E5E5] pb-safe md:hidden">
            <div className="flex items-center justify-around h-16">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => handleClick(item)}
                        className={cn(
                            "flex flex-col items-center justify-center flex-1 h-full gap-1 touch-target",
                            "transition-colors duration-200",
                            isActive(item)
                                ? "text-[#1A1A1A]"
                                : "text-[#6B6B6B]"
                        )}
                    >
                        <item.icon className={cn(
                            "w-5 h-5",
                            isActive(item) && "stroke-[2.5px]"
                        )} />
                        <span className="text-[10px] font-medium">{item.label}</span>
                    </button>
                ))}
            </div>
        </nav>
    )
}
