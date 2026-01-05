import { useState, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface SliderProps {
    label?: string
    min?: number
    max?: number
    step?: number
    value?: number
    defaultValue?: number
    onChange?: (value: number) => void
    showValue?: boolean
    valueFormatter?: (value: number) => string
    className?: string
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
    (
        {
            label,
            min = 0,
            max = 100,
            step = 1,
            value: controlledValue,
            defaultValue = 50,
            onChange,
            showValue = true,
            valueFormatter = (v) => `${v}`,
            className,
        },
        ref
    ) => {
        const [internalValue, setInternalValue] = useState(defaultValue)
        const value = controlledValue ?? internalValue

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = Number(e.target.value)
            setInternalValue(newValue)
            onChange?.(newValue)
        }

        const percentage = ((value - min) / (max - min)) * 100

        return (
            <div className={cn("space-y-2", className)}>
                {(label || showValue) && (
                    <div className="flex items-center justify-between">
                        {label && (
                            <label className="text-sm font-medium text-[#1A1A1A]">
                                {label}
                            </label>
                        )}
                        {showValue && (
                            <span className="text-sm font-medium text-[#6B6B6B]">
                                {valueFormatter(value)}
                            </span>
                        )}
                    </div>
                )}
                <div className="relative">
                    <input
                        ref={ref}
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={value}
                        onChange={handleChange}
                        className="w-full h-2 bg-transparent appearance-none cursor-pointer relative z-10
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-5
              [&::-webkit-slider-thumb]:h-5
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-[#1A1A1A]
              [&::-webkit-slider-thumb]:border-2
              [&::-webkit-slider-thumb]:border-white
              [&::-webkit-slider-thumb]:shadow-md
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:transition-transform
              [&::-webkit-slider-thumb]:duration-200
              [&::-webkit-slider-thumb]:hover:scale-110
              [&::-moz-range-thumb]:w-5
              [&::-moz-range-thumb]:h-5
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-[#1A1A1A]
              [&::-moz-range-thumb]:border-2
              [&::-moz-range-thumb]:border-white
              [&::-moz-range-thumb]:shadow-md
              [&::-moz-range-thumb]:cursor-pointer
            "
                    />
                    <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-2 rounded-full bg-[#E5E5E5] pointer-events-none">
                        <div
                            className="h-full rounded-full bg-[#1A1A1A] transition-all duration-100"
                            style={{ width: `${percentage}%` }}
                        />
                    </div>
                </div>
            </div>
        )
    }
)

Slider.displayName = "Slider"
