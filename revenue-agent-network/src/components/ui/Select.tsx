import { forwardRef, type SelectHTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

interface SelectOption {
    value: string
    label: string
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
    label?: string
    error?: string
    hint?: string
    options: SelectOption[]
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, error, hint, required, options, className, ...props }, ref) => {
        return (
            <div className="space-y-1.5">
                {label && (
                    <label className="block text-sm font-medium text-[#1A1A1A]">
                        {label}
                        {required && <span className="text-red-500 ml-0.5">*</span>}
                    </label>
                )}
                <div className="relative">
                    <select
                        ref={ref}
                        required={required}
                        className={cn(
                            "w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white appearance-none cursor-pointer",
                            "transition-all duration-200 ease-in-out",
                            "focus:outline-none focus:ring-2 focus:ring-offset-0",
                            error
                                ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                : "border-[#E5E5E5] focus:border-[#1A1A1A] focus:ring-[#1A1A1A]/10",
                            className
                        )}
                        {...props}
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B6B] pointer-events-none" />
                </div>
                {error && (
                    <p className="text-xs text-red-600">{error}</p>
                )}
                {hint && !error && (
                    <p className="text-xs text-[#6B6B6B]">{hint}</p>
                )}
            </div>
        )
    }
)

Select.displayName = "Select"
