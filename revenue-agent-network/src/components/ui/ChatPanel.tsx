import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import {
    MessageCircle,
    X,
    Minus,
    Send,
    Bot,
    TrendingUp,
    BarChart3,
    Building2,
    FileText,
    ArrowLeft,
} from "lucide-react"

interface Message {
    id: string
    content: string
    sender: "user" | "ai"
    timestamp: Date
}

const quickActions = [
    { icon: TrendingUp, label: "Check pipeline status" },
    { icon: BarChart3, label: "Agent performance" },
    { icon: Building2, label: "Add company" },
    { icon: FileText, label: "Generate report" },
]

const initialMessages: Message[] = [
    {
        id: "welcome",
        content: "How can I help you manage your agents today?",
        sender: "ai",
        timestamp: new Date(),
    },
]

export function ChatPanel() {
    const [isOpen, setIsOpen] = useState(false)
    const [isMinimized, setIsMinimized] = useState(false)
    const [messages, setMessages] = useState<Message[]>(initialMessages)
    const [inputValue, setInputValue] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isOpen])

    // Prevent body scroll when chat is open on mobile
    useEffect(() => {
        if (isOpen && window.innerWidth < 768) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => {
            document.body.style.overflow = ""
        }
    }, [isOpen])

    const handleSend = () => {
        if (!inputValue.trim()) return

        const userMessage: Message = {
            id: `user-${Date.now()}`,
            content: inputValue,
            sender: "user",
            timestamp: new Date(),
        }

        setMessages((prev) => [...prev, userMessage])
        setInputValue("")
        setIsTyping(true)

        // Simulate AI response
        setTimeout(() => {
            const aiMessage: Message = {
                id: `ai-${Date.now()}`,
                content: getAIResponse(inputValue),
                sender: "ai",
                timestamp: new Date(),
            }
            setMessages((prev) => [...prev, aiMessage])
            setIsTyping(false)
        }, 1000 + Math.random() * 500)
    }

    const handleQuickAction = (label: string) => {
        const userMessage: Message = {
            id: `user-${Date.now()}`,
            content: label,
            sender: "user",
            timestamp: new Date(),
        }

        setMessages((prev) => [...prev, userMessage])
        setIsTyping(true)

        setTimeout(() => {
            const aiMessage: Message = {
                id: `ai-${Date.now()}`,
                content: getQuickActionResponse(label),
                sender: "ai",
                timestamp: new Date(),
            }
            setMessages((prev) => [...prev, aiMessage])
            setIsTyping(false)
        }, 800)
    }

    const getAIResponse = (input: string): string => {
        const lowerInput = input.toLowerCase()
        if (lowerInput.includes("pipeline") || lowerInput.includes("deals")) {
            return "Your pipeline currently has 48 deals in Discovery, 32 in Demo, 18 in Proposal, 12 in Negotiation, and 8 Won this month. Total pipeline value is $2.2M."
        }
        if (lowerInput.includes("agent") || lowerInput.includes("performance")) {
            return "Agent Alpha leads with $89K in revenue this month. Agent Beta follows at $72K. All 12 agents are currently active and performing well."
        }
        if (lowerInput.includes("company") || lowerInput.includes("add")) {
            return "To add a new company, go to Companies → Add Company. You'll need the company name, domain, and at least one contact."
        }
        if (lowerInput.includes("report")) {
            return "I can generate reports for: Pipeline Summary, Agent Performance, Monthly Revenue, or Company Analytics. Which would you like?"
        }
        return "I can help you with pipeline status, agent performance, adding companies, or generating reports. What would you like to know?"
    }

    const getQuickActionResponse = (action: string): string => {
        switch (action) {
            case "Check pipeline status":
                return "📊 Current Pipeline Status:\n\n• Discovery: 48 deals ($960K)\n• Demo: 32 deals ($640K)\n• Proposal: 18 deals ($360K)\n• Negotiation: 12 deals ($240K)\n• Won: 8 deals ($160K)\n\nTotal: $2.36M in active pipeline"
            case "Agent performance":
                return "🤖 Top Performing Agents:\n\n1. Agent Alpha — $89K revenue\n2. Agent Beta — $72K revenue\n3. Agent Gamma — $58K revenue\n\nAll 12 agents are active. Win rate: 68%"
            case "Add company":
                return "To add a new company:\n\n1. Navigate to Companies in the sidebar\n2. Click 'Add Company'\n3. Enter company details\n4. Assign an agent\n\nWould you like me to walk you through it?"
            case "Generate report":
                return "📄 Available Reports:\n\n• Pipeline Summary\n• Agent Performance\n• Revenue Analysis\n• Company Overview\n\nWhich report would you like me to generate?"
            default:
                return "How can I help you with that?"
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    // Collapsed state - floating button
    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className={cn(
                    "fixed z-50",
                    // Mobile: smaller button, above bottom nav
                    "bottom-20 right-4 w-12 h-12 md:bottom-6 md:right-6 md:w-14 md:h-14",
                    "rounded-full",
                    "bg-[#2D2D2D] text-white",
                    "flex items-center justify-center",
                    "shadow-[0_4px_12px_rgba(0,0,0,0.15)]",
                    "transition-all duration-200 ease-in-out",
                    "hover:scale-105 hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)]",
                    "active:scale-95"
                )}
            >
                <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
            </button>
        )
    }

    // Minimized state
    if (isMinimized) {
        return (
            <button
                onClick={() => setIsMinimized(false)}
                className={cn(
                    "fixed z-50",
                    "bottom-20 right-4 w-12 h-12 md:bottom-6 md:right-6 md:w-14 md:h-14",
                    "rounded-full",
                    "bg-[#2D2D2D] text-white",
                    "flex items-center justify-center",
                    "shadow-[0_4px_12px_rgba(0,0,0,0.15)]",
                    "transition-all duration-200 ease-in-out",
                    "hover:scale-105",
                    "active:scale-95"
                )}
            >
                <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
                {/* Notification dot */}
                <span className="absolute top-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
            </button>
        )
    }

    // Expanded state
    return (
        <div
            className={cn(
                "fixed z-50",
                // Mobile: full screen
                "inset-0 md:inset-auto",
                "md:bottom-6 md:right-6",
                "md:w-[360px] md:h-[560px]",
                "bg-white md:rounded-xl",
                "md:shadow-[0_8px_30px_rgba(0,0,0,0.12)]",
                "md:border md:border-[#E5E5E5]",
                "flex flex-col",
                "animate-in duration-300 md:duration-200",
                "slide-in-from-bottom-full md:slide-in-from-bottom-4 md:fade-in"
            )}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E5E5]">
                <div className="flex items-center gap-3">
                    {/* Back button on mobile */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 -ml-2 rounded-lg text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F5F5F5] transition-colors md:hidden touch-target"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="w-8 h-8 rounded-lg bg-[#2D2D2D] flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-[#1A1A1A]">Revenue AI</h3>
                        <p className="text-xs text-emerald-600 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                            Online
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => setIsMinimized(true)}
                        className="p-2 rounded-lg text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F5F5F5] transition-colors duration-200 hidden md:block"
                    >
                        <Minus className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 rounded-lg text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F5F5F5] transition-colors duration-200 hidden md:block"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={cn(
                            "flex",
                            message.sender === "user" ? "justify-end" : "justify-start"
                        )}
                    >
                        <div
                            className={cn(
                                "max-w-[85%] px-4 py-2.5 rounded-2xl text-sm whitespace-pre-wrap",
                                message.sender === "user"
                                    ? "bg-[#F0F0F0] text-[#1A1A1A] rounded-br-md"
                                    : "bg-white border border-[#E5E5E5] text-[#1A1A1A] rounded-bl-md shadow-sm"
                            )}
                        >
                            {message.content}
                        </div>
                    </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-white border border-[#E5E5E5] px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
                            <div className="flex items-center gap-1">
                                <span className="w-2 h-2 bg-[#6B6B6B] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                <span className="w-2 h-2 bg-[#6B6B6B] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                <span className="w-2 h-2 bg-[#6B6B6B] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length === 1 && (
                <div className="px-4 pb-3">
                    <div className="flex flex-wrap gap-2">
                        {quickActions.map((action) => (
                            <button
                                key={action.label}
                                onClick={() => handleQuickAction(action.label)}
                                className={cn(
                                    "inline-flex items-center gap-1.5 px-3 py-2 md:py-1.5",
                                    "text-xs font-medium text-[#6B6B6B]",
                                    "bg-[#F5F5F5] rounded-full",
                                    "hover:bg-[#E5E5E5] hover:text-[#1A1A1A]",
                                    "transition-colors duration-200",
                                    "touch-target"
                                )}
                            >
                                <action.icon className="w-3 h-3" />
                                {action.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-[#E5E5E5] pb-safe">
                <div className="flex items-center gap-2">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Ask anything..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className={cn(
                            "flex-1 px-4 py-3 md:py-2.5 text-sm md:text-sm rounded-full",
                            "bg-[#F5F5F5] border-0",
                            "placeholder:text-[#9CA3AF]",
                            "focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/10",
                            "transition-all duration-200"
                        )}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!inputValue.trim()}
                        className={cn(
                            "w-12 h-12 md:w-10 md:h-10 rounded-full",
                            "flex items-center justify-center flex-shrink-0",
                            "transition-all duration-200",
                            inputValue.trim()
                                ? "bg-[#1A1A1A] text-white hover:bg-[#333]"
                                : "bg-[#E5E5E5] text-[#9CA3AF] cursor-not-allowed"
                        )}
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}
