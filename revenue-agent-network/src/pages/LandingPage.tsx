import { useState, useEffect } from "react"
import "./LandingPage.css"
import { TryNowModal } from "@/components/TryNowModal"

// Landing Page Component - Inspired by alex.com
export function LandingPage({ onGetStarted }: { onGetStarted?: () => void }) {
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const handleBookDemo = () => {
        // Open the Try Now modal
        setIsModalOpen(true)
    }

    return (
        <div className="landing-page">

            {/* Navigation */}
            <header className={`nav-header ${isScrolled ? "nav-scrolled" : ""}`}>
                <nav className="nav-container">
                    <div className="nav-logo">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" />
                            <path d="M10 16h12M16 10v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <span className="logo-text">Winny Labs</span>
                    </div>

                    <div className="nav-links">
                        <a href="#features">Features</a>
                        <a href="#how-it-works">How it Works</a>
                    </div>

                    <button
                        className="mobile-menu-toggle"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className={`hamburger ${mobileMenuOpen ? "open" : ""}`}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </button>
                </nav>

                {/* Mobile Menu */}
                <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
                    <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
                    <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>How it Works</a>
                </div>
            </header>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-background">
                    <div className="hero-gradient"></div>
                    <div className="hero-pattern"></div>
                </div>
                <div className="hero-content">
                    <h1 className="hero-title">
                        Revenue generation,<br />
                        <span className="hero-highlight">reimagined.</span>
                    </h1>
                    <p className="hero-subtitle">
                        Harness the power of AI agents and a network of elite associates
                        to transform your sales pipeline into a revenue engine.
                    </p>
                    <div className="hero-cta">
                        <button className="btn-primary btn-large" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>
                            See How It Works
                        </button>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="container">
                    <div className="stats-grid">
                        <div className="stat-item">
                            <span className="stat-number">10x</span>
                            <span className="stat-label">Pipeline Growth</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">$2.4M</span>
                            <span className="stat-label">Avg. Revenue Increase</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">94%</span>
                            <span className="stat-label">Client Satisfaction</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">500+</span>
                            <span className="stat-label">Active Associates</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="features-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">Features</span>
                        <h2 className="section-title">
                            Everything you need to<br />
                            <span className="text-accent">accelerate growth</span>
                        </h2>
                        <p className="section-subtitle">
                            Our platform combines AI intelligence with human expertise to deliver
                            results that matter.
                        </p>
                    </div>

                    <div className="features-grid">
                        <div className="feature-card feature-large">
                            <div className="feature-icon">
                                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" />
                                    <circle cx="24" cy="24" r="8" fill="currentColor" />
                                    <circle cx="24" cy="8" r="3" fill="currentColor" />
                                    <circle cx="24" cy="40" r="3" fill="currentColor" />
                                    <circle cx="8" cy="24" r="3" fill="currentColor" />
                                    <circle cx="40" cy="24" r="3" fill="currentColor" />
                                </svg>
                            </div>
                            <h3>AI-Powered Agents</h3>
                            <p>
                                Intelligent agents that learn your business, identify opportunities,
                                and engage prospects with personalized outreach at scale.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="6" y="6" width="36" height="36" rx="4" stroke="currentColor" strokeWidth="2" />
                                    <path d="M14 32V22M24 32V16M34 32V24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                                </svg>
                            </div>
                            <h3>Real-Time Analytics</h3>
                            <p>
                                Deep insights into pipeline performance, conversion rates, and revenue attribution.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="16" cy="16" r="8" stroke="currentColor" strokeWidth="2" />
                                    <circle cx="32" cy="16" r="8" stroke="currentColor" strokeWidth="2" />
                                    <circle cx="24" cy="32" r="8" stroke="currentColor" strokeWidth="2" />
                                </svg>
                            </div>
                            <h3>Associate Network</h3>
                            <p>
                                Access 500+ vetted sales professionals who extend your reach globally.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24 4v40M4 24h40" stroke="currentColor" strokeWidth="2" />
                                    <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2" />
                                </svg>
                            </div>
                            <h3>Seamless Integration</h3>
                            <p>
                                Connect with Salesforce, HubSpot, and your existing tech stack in minutes.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 24l12 12 20-20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3>Verified Leads</h3>
                            <p>
                                Every lead is qualified and verified before reaching your pipeline.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="how-it-works-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">Process</span>
                        <h2 className="section-title">
                            How it works
                        </h2>
                        <p className="section-subtitle">
                            Get started in three simple steps
                        </p>
                    </div>

                    <div className="steps-container">
                        <div className="step-card">
                            <div className="step-number">01</div>
                            <h3>Connect Your Data</h3>
                            <p>
                                Integrate your CRM, marketing tools, and data sources. Our AI learns
                                your ideal customer profile and pipeline patterns.
                            </p>
                        </div>

                        <div className="step-connector"></div>

                        <div className="step-card">
                            <div className="step-number">02</div>
                            <h3>Deploy Your Agents</h3>
                            <p>
                                Activate AI agents that prospect, qualify, and nurture leads 24/7.
                                Pair with human associates for high-touch engagements.
                            </p>
                        </div>

                        <div className="step-connector"></div>

                        <div className="step-card">
                            <div className="step-number">03</div>
                            <h3>Watch Revenue Grow</h3>
                            <p>
                                Track every interaction, measure attribution, and scale what works.
                                Real results, not vanity metrics.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Integrations Section */}
            <section className="integrations-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">Integrations</span>
                        <h2 className="section-title">
                            Works with your stack
                        </h2>
                        <p className="section-subtitle">
                            Seamlessly connect with the tools you already use
                        </p>
                    </div>

                    <div className="integrations-grid">
                        <div className="integration-card">
                            <span className="integration-name">Salesforce</span>
                        </div>
                        <div className="integration-card">
                            <span className="integration-name">HubSpot</span>
                        </div>
                        <div className="integration-card">
                            <span className="integration-name">Slack</span>
                        </div>
                        <div className="integration-card">
                            <span className="integration-name">Zoom</span>
                        </div>
                        <div className="integration-card">
                            <span className="integration-name">Gmail</span>
                        </div>
                        <div className="integration-card">
                            <span className="integration-name">LinkedIn</span>
                        </div>
                        <div className="integration-card">
                            <span className="integration-name">Outreach</span>
                        </div>
                        <div className="integration-card">
                            <span className="integration-name">Gong</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="site-footer">
                <div className="container">
                    <div className="footer-grid">
                        <div className="footer-links">
                            <div className="footer-column">
                                <h4>Products</h4>
                                <a href="#ai-agents">AI Agents</a>
                                <a href="#ai-copilot">AI Copilot</a>
                            </div>
                            <div className="footer-column">
                                <h4>Industries</h4>
                                <a href="#retail">Retail</a>
                                <a href="#finance">Finance</a>
                                <a href="#telecom">Telecom</a>
                                <a href="#healthcare">Healthcare</a>
                                <a href="#travel">Travel</a>
                            </div>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p>&copy; 2026 Winny Labs. All rights reserved.</p>
                    </div>
                </div>
            </footer>

            {/* Try Now Modal - AI Revenue Diagnostic */}
            <TryNowModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    )
}

export default LandingPage
