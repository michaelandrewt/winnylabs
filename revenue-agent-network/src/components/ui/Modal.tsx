import { useEffect } from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
    className?: string
}

export function Modal({ isOpen, onClose, children, className }: ModalProps) {
    // Handle escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onClose()
            }
        }

        document.addEventListener("keydown", handleEscape)
        return () => document.removeEventListener("keydown", handleEscape)
    }, [isOpen, onClose])

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => {
            document.body.style.overflow = ""
        }
    }, [isOpen])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50">
            {/* Backdrop - hidden on mobile for full-screen modal */}
            <div
                className="absolute inset-0 bg-black/50 animate-in fade-in duration-200 hidden md:block"
                onClick={onClose}
            />

            {/* Mobile backdrop */}
            <div
                className="absolute inset-0 bg-[#FAFAFA] md:hidden"
                onClick={onClose}
            />

            {/* Modal - Full screen on mobile, centered on desktop */}
            <div className={cn(
                // Mobile: full screen, slide up from bottom
                "fixed md:absolute",
                "inset-0 md:inset-auto",
                "md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2",
                "bg-white",
                "md:rounded-xl md:shadow-lg",
                "flex flex-col",
                "animate-in duration-300 md:duration-200",
                "slide-in-from-bottom-full md:slide-in-from-bottom-4 md:fade-in",
                className
            )}>
                {/* Mobile header with close button */}
                <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-[#E5E5E5]">
                    <div className="w-10" /> {/* Spacer */}
                    <div className="w-10 h-1 rounded-full bg-[#E5E5E5] absolute left-1/2 -translate-x-1/2 top-2" />
                    <button
                        onClick={onClose}
                        className="p-2 -mr-2 rounded-lg text-[#6B6B6B] hover:text-[#1A1A1A] touch-target"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6">
                    {children}
                </div>
            </div>
        </div>
    )
}

interface ModalFooterProps {
    children: React.ReactNode
    className?: string
}

export function ModalFooter({ children, className }: ModalFooterProps) {
    return (
        <div className={cn(
            "flex items-center justify-end gap-3",
            "pt-4 border-t border-[#E5E5E5]",
            "pb-safe", // Safe area for mobile
            className
        )}>
            {children}
        </div>
    )
}
