import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
    hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, hint, required, className, ...props }, ref) => {
        return (
            <div className="space-y-1.5">
                {label && (
                    <label className="block text-sm font-medium text-[#1A1A1A]">
                        {label}
                        {required && <span className="text-red-500 ml-0.5">*</span>}
                    </label>
                )}
                <input
                    ref={ref}
                    required={required}
                    className={cn(
                        "w-full px-3.5 py-3 md:py-2.5 text-base md:text-sm rounded-lg border bg-white min-h-[48px] md:min-h-0",
                        "transition-all duration-200 ease-in-out",
                        "placeholder:text-[#9CA3AF]",
                        "focus:outline-none focus:ring-2 focus:ring-offset-0",
                        error
                            ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                            : "border-[#E5E5E5] focus:border-[#1A1A1A] focus:ring-[#1A1A1A]/10",
                        className
                    )}
                    {...props}
                />
                {error && (
                    <p className="text-xs text-red-600 flex items-center gap-1">
                        {error}
                    </p>
                )}
                {hint && !error && (
                    <p className="text-xs text-[#6B6B6B]">{hint}</p>
                )}
            </div>
        )
    }
)

Input.displayName = "Input"

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string
    error?: string
    hint?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ label, error, hint, required, className, ...props }, ref) => {
        return (
            <div className="space-y-1.5">
                {label && (
                    <label className="block text-sm font-medium text-[#1A1A1A]">
                        {label}
                        {required && <span className="text-red-500 ml-0.5">*</span>}
                    </label>
                )}
                <textarea
                    ref={ref}
                    required={required}
                    className={cn(
                        "w-full px-3.5 py-3 md:py-2.5 text-base md:text-sm rounded-lg border bg-white resize-none",
                        "transition-all duration-200 ease-in-out",
                        "placeholder:text-[#9CA3AF]",
                        "focus:outline-none focus:ring-2 focus:ring-offset-0",
                        error
                            ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                            : "border-[#E5E5E5] focus:border-[#1A1A1A] focus:ring-[#1A1A1A]/10",
                        className
                    )}
                    {...props}
                />
                {error && (
                    <p className="text-xs text-red-600 flex items-center gap-1">
                        {error}
                    </p>
                )}
                {hint && !error && (
                    <p className="text-xs text-[#6B6B6B]">{hint}</p>
                )}
            </div>
        )
    }
)

Textarea.displayName = "Textarea"
