import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react"

type ToastType = "success" | "error" | "info"

interface Toast {
    id: string
    type: ToastType
    message: string
    duration?: number
}

interface ToastContextType {
    toasts: Toast[]
    addToast: (type: ToastType, message: string, duration?: number) => void
    removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export function useToast() {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider")
    }
    return context
}

let toastId = 0

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([])

    const addToast = useCallback((type: ToastType, message: string, duration?: number) => {
        const id = `toast-${toastId++}`
        const defaultDuration = type === "success" ? 3000 : type === "info" ? 5000 : undefined

        setToasts((prev) => [...prev, { id, type, message, duration: duration ?? defaultDuration }])

        const finalDuration = duration ?? defaultDuration
        if (finalDuration) {
            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id))
            }, finalDuration)
        }
    }, [])

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
    }, [])

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
            {children}
            <ToastContainer toasts={toasts} onDismiss={removeToast} />
        </ToastContext.Provider>
    )
}

interface ToastContainerProps {
    toasts: Toast[]
    onDismiss: (id: string) => void
}

function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
            {toasts.map((toast) => (
                <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
            ))}
        </div>
    )
}

interface ToastItemProps {
    toast: Toast
    onDismiss: (id: string) => void
}

function ToastItem({ toast, onDismiss }: ToastItemProps) {
    const config = {
        success: {
            icon: CheckCircle2,
            bgColor: "bg-emerald-50",
            borderColor: "border-emerald-200",
            iconColor: "text-emerald-600",
            textColor: "text-emerald-800",
        },
        error: {
            icon: AlertCircle,
            bgColor: "bg-red-50",
            borderColor: "border-red-200",
            iconColor: "text-red-600",
            textColor: "text-red-800",
        },
        info: {
            icon: Info,
            bgColor: "bg-blue-50",
            borderColor: "border-blue-200",
            iconColor: "text-blue-600",
            textColor: "text-blue-800",
        },
    }

    const { icon: Icon, bgColor, borderColor, iconColor, textColor } = config[toast.type]

    return (
        <div
            className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg min-w-[320px] max-w-[420px]",
                "animate-in slide-in-from-right-full fade-in duration-200",
                bgColor,
                borderColor
            )}
        >
            <Icon className={cn("w-5 h-5 shrink-0", iconColor)} />
            <p className={cn("text-sm font-medium flex-1", textColor)}>{toast.message}</p>
            <button
                onClick={() => onDismiss(toast.id)}
                className={cn(
                    "p-1 rounded-md hover:bg-black/5 transition-colors duration-200",
                    textColor
                )}
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    )
}
