import { useState, useRef, useEffect } from 'react'
import { X, Mic, Send, Loader2 } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import './TryNowModal.css'

type EmotionalPhase = 'curiosity' | 'concern' | 'crisis' | 'relief' | 'action'
type ModalState = 'initial' | 'listening' | 'transcribing' | 'processing' | 'results'

interface AgentMessage {
    role: 'agent' | 'user'
    message: string
    timestamp: number
}

interface EconomicData {
    annualCost: number
    monthlyCost: number
    dailyCost: number
    relatable?: string
}

interface ConversationOutput {
    agentMessage: string
    emotionalPhase: EmotionalPhase
    nextQuestion?: string
    economicData?: EconomicData
    rootCause?: string
    contrarian?: string
    ctasToShow: boolean
    ctas?: Array<{ label: string; friction: 'low' | 'medium' | 'high'; action: string }>
}

// Speech Recognition types for Web Speech API
interface SpeechRecognitionEvent extends Event {
    resultIndex: number
    results: SpeechRecognitionResultList
}

interface SpeechRecognitionErrorEvent extends Event {
    error: string
}

interface SpeechRecognitionInstance {
    continuous: boolean
    interimResults: boolean
    start(): void
    stop(): void
    onstart: (() => void) | null
    onresult: ((event: SpeechRecognitionEvent) => void) | null
    onend: (() => void) | null
    onerror: ((event: SpeechRecognitionErrorEvent) => void) | null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance

interface TryNowModalProps {
    isOpen: boolean
    onClose: () => void
}

export function TryNowModal({ isOpen, onClose }: TryNowModalProps) {
    const [modalState, setModalState] = useState<ModalState>('initial')
    const [emotionalPhase, setEmotionalPhase] = useState<EmotionalPhase>('curiosity')
    const [conversation, setConversation] = useState<AgentMessage[]>([])
    const [userInput, setUserInput] = useState('')
    const [isListening, setIsListening] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [economicData, setEconomicData] = useState<EconomicData | null>(null)
    const [showCTAs, setShowCTAs] = useState(false)
    const [inputMethod, setInputMethod] = useState<'voice' | 'text' | null>(null)

    const recognitionRef = useRef<SpeechRecognitionInstance | null>(null)
    const scrollRef = useRef<HTMLDivElement>(null)

    // Initialize speech recognition
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const win = window as any
            const SpeechRecognitionAPI = win.SpeechRecognition || win.webkitSpeechRecognition
            if (SpeechRecognitionAPI) {
                const recognition = new SpeechRecognitionAPI() as SpeechRecognitionInstance
                recognition.continuous = false
                recognition.interimResults = true

                recognition.onstart = () => {
                    setIsListening(true)
                    setModalState('listening')
                }

                recognition.onresult = (event: SpeechRecognitionEvent) => {
                    let transcript = ''
                    for (let i = event.resultIndex; i < event.results.length; i++) {
                        transcript += event.results[i][0].transcript
                    }
                    setUserInput(transcript)
                    setModalState('transcribing')
                }

                recognition.onend = () => {
                    setIsListening(false)
                }

                recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
                    console.error('Speech recognition error:', event.error)
                    setIsListening(false)
                    setInputMethod('text') // Fallback to text input
                }

                recognitionRef.current = recognition
            }
        }
    }, [])

    // Auto-scroll to latest message
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [conversation, emotionalPhase])

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            // Save current scroll position and lock body
            document.body.style.overflow = 'hidden'
            document.body.style.position = 'fixed'
            document.body.style.top = `-${window.scrollY}px`
            document.body.style.width = '100%'
        } else {
            // Restore scroll position and unlock body
            const scrollY = document.body.style.top
            document.body.style.overflow = ''
            document.body.style.position = ''
            document.body.style.top = ''
            document.body.style.width = ''
            window.scrollTo(0, parseInt(scrollY || '0') * -1)
        }

        return () => {
            // Cleanup on unmount
            document.body.style.overflow = ''
            document.body.style.position = ''
            document.body.style.top = ''
            document.body.style.width = ''
        }
    }, [isOpen])

    const startListening = () => {
        if (recognitionRef.current && !isListening) {
            setUserInput('')
            setInputMethod('voice')
            try {
                recognitionRef.current.start()
            } catch (e) {
                console.error('Could not start speech recognition:', e)
                setInputMethod('text')
            }
        } else {
            // No speech recognition available, fallback to text
            setInputMethod('text')
        }
    }

    const stopListening = () => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop()
        }
        // Auto-submit if there's text
        if (userInput.trim()) {
            handleSubmitAnswer()
        }
    }

    const handleSubmitAnswer = async () => {
        if (!userInput.trim() || isProcessing) return

        // Add user message to conversation
        const newMessage: AgentMessage = {
            role: 'user',
            message: userInput,
            timestamp: Date.now(),
        }

        setConversation((prev) => [...prev, newMessage])
        setUserInput('')
        setModalState('processing')
        setIsProcessing(true)

        try {
            // For now, simulate AI response (replace with actual API call)
            // In production, you would call: await fetch('/api/agent/diagnose', {...})
            await simulateAgentResponse(newMessage.message, conversation.length)
        } catch (error) {
            console.error('Error:', error)
            // Add error message
            setConversation((prev) => [
                ...prev,
                {
                    role: 'agent',
                    message: "I apologize, but I'm having trouble processing that. Could you try again?",
                    timestamp: Date.now(),
                },
            ])
        }

        setIsProcessing(false)
        setModalState('listening')
    }

    // Simulated agent response (replace with actual API integration)
    const simulateAgentResponse = async (userMessage: string, turnCount: number) => {
        await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate API delay

        let response: ConversationOutput

        if (turnCount === 0) {
            // First response - ask about pipeline
            response = {
                agentMessage: `Got it! That's helpful context.

So here's my first real question: 🎯

**Right now, what's your biggest frustration with how deals move through your pipeline?**

Is it:
- Getting enough qualified leads in the door?
- Deals stalling in the middle?
- Lost deals at the finish line?

Just pick one or describe it your way.`,
                emotionalPhase: 'curiosity',
                ctasToShow: false,
            }
        } else if (turnCount === 2) {
            // Second response - dig deeper
            response = {
                agentMessage: `Interesting. That's actually more common than you'd think.

Let me ask this: **When was the last time a deal fell through that really surprised you?**

What happened in that specific situation?`,
                emotionalPhase: 'concern',
                ctasToShow: false,
            }
        } else if (turnCount === 4) {
            // Third response - reveal the diagnosis
            const annualCost = Math.floor(Math.random() * 300000) + 150000
            response = {
                agentMessage: `Here's what I'm seeing...

Based on what you've described, your primary bottleneck appears to be **inconsistent follow-up and lead nurturing**.

This is costing you real money. Let me show you:`,
                emotionalPhase: 'crisis',
                ctasToShow: false,
                economicData: {
                    annualCost,
                    monthlyCost: annualCost / 12,
                    dailyCost: annualCost / 365,
                    relatable: `That's a senior engineer salary every year.`,
                },
            }
            setEconomicData(response.economicData!)

            // Add follow-up after a delay
            setTimeout(() => {
                setConversation((prev) => [
                    ...prev,
                    {
                        role: 'agent',
                        message: `The good news? This is fixable.

Our AI agents handle the consistent follow-up automatically—they never forget, never get tired, and they learn what works for your specific buyers.

**Want to see exactly how we'd fix this for you?**`,
                        timestamp: Date.now(),
                    },
                ])
                setEmotionalPhase('relief')
                setShowCTAs(true)
                setModalState('results')
            }, 3000)
        } else {
            // Default response
            response = {
                agentMessage: `That's really insightful. Tell me more about how that affects your day-to-day operations.`,
                emotionalPhase: emotionalPhase,
                ctasToShow: false,
            }
        }

        setConversation((prev) => [
            ...prev,
            {
                role: 'agent',
                message: response.agentMessage,
                timestamp: Date.now(),
            },
        ])
        setEmotionalPhase(response.emotionalPhase)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmitAnswer()
        }
    }

    // Initial greeting when modal opens
    useEffect(() => {
        if (isOpen && conversation.length === 0) {
            setConversation([
                {
                    role: 'agent',
                    message: `Hey! 👋 I help founders understand why their revenue systems get stuck.

I'm not here to sell you—I'm going to diagnose your specific bottleneck so you can decide what to do about it.

**Just answer 3 questions and you'll know exactly what's holding you back.**

First, tell me: What does your company do, and roughly how large is your sales team?`,
                    timestamp: Date.now(),
                },
            ])
        }
    }, [isOpen, conversation.length])

    const handleClose = () => {
        stopListening()
        setModalState('initial')
        setConversation([])
        setEmotionalPhase('curiosity')
        setUserInput('')
        setShowCTAs(false)
        setEconomicData(null)
        setInputMethod(null)
        onClose()
    }

    const handleCTA = (action: string) => {
        if (action === 'analysis') {
            // Open full analysis page
            alert('Opening full revenue analysis...')
            // window.open('/revenue-analysis', '_blank')
        } else if (action === 'call') {
            // Open calendly or contact form
            alert('Opening calendar booking...')
            // window.open('https://calendly.com/winnylabs', '_blank')
        } else if (action === 'sprint') {
            // Go to pricing
            alert('Opening pricing page...')
            // window.location.href = '/pricing'
        }
    }

    // Return null when modal is closed
    if (!isOpen) {
        return null
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="try-now-backdrop"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                        className="try-now-modal"
                    >
                        {/* Header */}
                        <div className="try-now-header">
                            <div className="try-now-header-left">
                                <div className="try-now-avatar">
                                    <Mic className="try-now-avatar-icon" />
                                </div>
                                <h2 className="try-now-title">Revenue Diagnostic</h2>
                            </div>
                            <button onClick={handleClose} className="try-now-close">
                                <X />
                            </button>
                        </div>

                        {/* Conversation Area */}
                        <div ref={scrollRef} className="try-now-conversation">
                            {conversation.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className={`try-now-message ${msg.role}`}
                                >
                                    <div className={`try-now-bubble ${msg.role}`}>
                                        <p dangerouslySetInnerHTML={{
                                            __html: msg.message
                                                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                                .replace(/\n/g, '<br/>')
                                        }} />
                                    </div>
                                </motion.div>
                            ))}

                            {/* Economic Data Animation */}
                            {economicData && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="try-now-economic"
                                >
                                    <div className="try-now-economic-header">
                                        <span className="try-now-economic-emoji">💰</span>
                                        <div>
                                            <p className="try-now-economic-label">Annual Impact</p>
                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.3 }}
                                                className="try-now-economic-value"
                                            >
                                                ${(economicData.annualCost / 1000).toFixed(0)}K/year
                                            </motion.p>
                                        </div>
                                    </div>
                                    <div className="try-now-economic-details">
                                        <p>📊 ${(economicData.monthlyCost / 1000).toFixed(1)}K/month</p>
                                        <p>📅 ${economicData.dailyCost.toFixed(0)}/day</p>
                                        {economicData.relatable && (
                                            <p className="try-now-economic-relatable">{economicData.relatable}</p>
                                        )}
                                    </div>
                                </motion.div>
                            )}

                            {/* Processing State */}
                            {isProcessing && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="try-now-loading"
                                >
                                    <Loader2 className="try-now-loading-icon" />
                                    <span>Analyzing your situation...</span>
                                </motion.div>
                            )}

                            {/* CTAs */}
                            {showCTAs && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="try-now-ctas"
                                >
                                    <button
                                        onClick={() => handleCTA('analysis')}
                                        className="try-now-cta primary"
                                    >
                                        📊 See Full Analysis
                                    </button>
                                    <button
                                        onClick={() => handleCTA('call')}
                                        className="try-now-cta secondary"
                                    >
                                        📞 Schedule Call
                                    </button>
                                    <button
                                        onClick={() => handleCTA('sprint')}
                                        className="try-now-cta tertiary"
                                    >
                                        Start Revenue Sprint
                                    </button>
                                </motion.div>
                            )}
                        </div>

                        {/* Input Area */}
                        {!showCTAs && (
                            <div className="try-now-input-area">
                                {!inputMethod ? (
                                    <div className="try-now-input-buttons">
                                        <button onClick={startListening} className="try-now-input-btn primary">
                                            <Mic />
                                            Talk Now
                                        </button>
                                        <button onClick={() => setInputMethod('text')} className="try-now-input-btn secondary">
                                            ⌨️ Type Instead
                                        </button>
                                    </div>
                                ) : inputMethod === 'voice' && isListening ? (
                                    <div className="try-now-listening">
                                        <div className="try-now-waveform">
                                            {[1, 2, 3, 4, 5].map((i) => (
                                                <motion.div
                                                    key={i}
                                                    animate={{ height: ['4px', '24px', '4px'] }}
                                                    transition={{
                                                        duration: 0.5,
                                                        delay: i * 0.1,
                                                        repeat: Infinity,
                                                    }}
                                                    className="try-now-wave-bar"
                                                />
                                            ))}
                                        </div>
                                        <span className="try-now-listening-text">Listening...</span>
                                        {userInput && (
                                            <p className="try-now-transcript">{userInput}</p>
                                        )}
                                        <button onClick={stopListening} className="try-now-stop-btn">
                                            {userInput.trim() ? 'Done' : 'Cancel'}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="try-now-text-input">
                                        <textarea
                                            value={userInput}
                                            onChange={(e) => setUserInput(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            placeholder="Type your answer..."
                                            rows={3}
                                        />
                                        <button
                                            onClick={handleSubmitAnswer}
                                            disabled={!userInput.trim() || isProcessing}
                                            className="try-now-send-btn"
                                        >
                                            <Send />
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default TryNowModal
