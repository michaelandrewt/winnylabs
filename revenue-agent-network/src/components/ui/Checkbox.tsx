import { forwardRef, type InputHTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: string
    description?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ label, description, className, checked, ...props }, ref) => {
        return (
            <label className={cn("flex items-start gap-3 cursor-pointer group", className)}>
                <div className="relative mt-0.5">
                    <input
                        ref={ref}
                        type="checkbox"
                        checked={checked}
                        className="sr-only peer"
                        {...props}
                    />
                    <div
                        className={cn(
                            "w-5 h-5 rounded-md border-2 transition-all duration-200",
                            "flex items-center justify-center",
                            "group-hover:border-[#1A1A1A]",
                            checked
                                ? "bg-[#1A1A1A] border-[#1A1A1A]"
                                : "bg-white border-[#D1D1D1]"
                        )}
                    >
                        {checked && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                    </div>
                </div>
                {(label || description) && (
                    <div className="flex-1">
                        {label && (
                            <span className="text-sm font-medium text-[#1A1A1A] block">
                                {label}
                            </span>
                        )}
                        {description && (
                            <span className="text-xs text-[#6B6B6B] block mt-0.5">
                                {description}
                            </span>
                        )}
                    </div>
                )}
            </label>
        )
    }
)

Checkbox.displayName = "Checkbox"
