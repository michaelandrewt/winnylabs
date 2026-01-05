# Landing Page Specification for Revenue Agent Network

## Overview

This document provides a comprehensive specification for the Revenue Agent Network landing page. The design is inspired by **alex.com** and features a premium, nature-inspired aesthetic with forest green colors, elegant serif typography, and smooth animations.

---

## Business Description & Page Content

This section documents all the text content displayed on the landing page, organized by section.

---

### Brand Identity

- **Company Name**: Revenue Agent Network
- **Tagline**: "Revenue generation, reimagined."
- **Footer Tagline**: "The future of AI-powered revenue generation."
- **Copyright**: © 2026 Revenue Agent Network. All rights reserved.

---

### Announcement Banner Copy

```
🎉 Introducing Revenue Agent Network — The future of AI-powered sales
[Learn more →]
```

---

### Hero Section Copy

**Headline:**
```
Revenue generation,
reimagined.
```

**Subtitle:**
```
Harness the power of AI agents and a network of elite associates
to transform your sales pipeline into a revenue engine.
```

**CTA Buttons:**
- Primary: "Try Now"
- Secondary: "See How It Works"

**Trust Section:**
```
Trusted by teams at
```
**Logos:** Anthropic, OpenAI, Mistral, Cohere

---

### Stats Section Copy

| Metric | Value | Label |
|--------|-------|-------|
| Pipeline Growth | 10x | Pipeline Growth |
| Revenue | $2.4M | Avg. Revenue Increase |
| Satisfaction | 94% | Client Satisfaction |
| Network Size | 500+ | Active Associates |

---

### Features Section Copy

**Section Header:**
- Tag: "Features"
- Title: "Everything you need to accelerate growth"
- Subtitle: "Our platform combines AI intelligence with human expertise to deliver results that matter."

**Feature 1 (Large/Featured):**
- Title: "AI-Powered Agents"
- Description: "Intelligent agents that learn your business, identify opportunities, and engage prospects with personalized outreach at scale."

**Feature 2:**
- Title: "Real-Time Analytics"
- Description: "Deep insights into pipeline performance, conversion rates, and revenue attribution."

**Feature 3:**
- Title: "Associate Network"
- Description: "Access 500+ vetted sales professionals who extend your reach globally."

**Feature 4:**
- Title: "Seamless Integration"
- Description: "Connect with Salesforce, HubSpot, and your existing tech stack in minutes."

**Feature 5:**
- Title: "Verified Leads"
- Description: "Every lead is qualified and verified before reaching your pipeline."

---

### How It Works Section Copy

**Section Header:**
- Tag: "Process"
- Title: "How it works"
- Subtitle: "Get started in three simple steps"

**Step 1:**
- Number: "01"
- Title: "Connect Your Data"
- Description: "Integrate your CRM, marketing tools, and data sources. Our AI learns your ideal customer profile and pipeline patterns."

**Step 2:**
- Number: "02"
- Title: "Deploy Your Agents"
- Description: "Activate AI agents that prospect, qualify, and nurture leads 24/7. Pair with human associates for high-touch engagements."

**Step 3:**
- Number: "03"
- Title: "Watch Revenue Grow"
- Description: "Track every interaction, measure attribution, and scale what works. Real results, not vanity metrics."

---

### Integrations Section Copy

**Section Header:**
- Tag: "Integrations"
- Title: "Works with your stack"
- Subtitle: "Seamlessly connect with the tools you already use"

**Integration Logos (8 total):**
1. Salesforce
2. HubSpot
3. Slack
4. Zoom
5. Gmail
6. LinkedIn
7. Outreach
8. Gong

---

### Pricing Section Copy

**Section Header:**
- Tag: "Pricing"
- Title: "Simple, transparent pricing"
- Subtitle: "Start with what you need, scale as you grow"

**Plan 1: Starter**
- Name: "Starter"
- Description: "For teams getting started"
- Price: "$499" "/month"
- Features:
  - 2 AI Agents
  - Up to 500 leads/month
  - Basic analytics
  - Email support
- CTA: "Get Started"

**Plan 2: Growth (Featured)**
- Badge: "Most Popular"
- Name: "Growth"
- Description: "For scaling teams"
- Price: "$1,499" "/month"
- Features:
  - 10 AI Agents
  - Unlimited leads
  - Associate network access
  - Advanced analytics
  - Priority support
- CTA: "Try Now"

**Plan 3: Enterprise**
- Name: "Enterprise"
- Description: "For large organizations"
- Price: "Custom"
- Features:
  - Unlimited agents
  - Dedicated associate team
  - Custom integrations
  - White-glove onboarding
  - 24/7 phone support
- CTA: "Contact Sales"

---

### CTA Section Copy

**Headline:**
```
Ready to transform your revenue?
```

**Subtitle:**
```
Join 500+ companies already using Revenue Agent Network to accelerate growth.
```

**Buttons:**
- Primary (White): "Try Now"
- Ghost: "Start Free Trial"

---

### Footer Content

**Footer Tagline:**
```
The future of AI-powered revenue generation.
```

**Link Columns:**

| Product | Resources | Company |
|---------|-----------|---------|
| Features | Documentation | About Us |
| Pricing | Blog | Careers |
| Integrations | Case Studies | Contact |
| Roadmap | Help Center | Press |

**Legal Links:**
- Privacy Policy
- Terms of Service

---

### Business Summary

**What Revenue Agent Network Does:**
Revenue Agent Network is an AI-powered sales acceleration platform that combines:
1. **AI Agents** - Autonomous software that prospects, qualifies, and nurtures leads 24/7
2. **Human Associates** - A network of 500+ vetted sales professionals for high-touch engagements
3. **Unified Platform** - Real-time analytics, CRM integration, and revenue attribution

**Value Proposition:**
- Transform your sales pipeline into a revenue engine
- Hybrid AI + human approach for best results
- Proven ROI: 10x pipeline growth, $2.4M avg. revenue increase

**Target Customer:**
- B2B SaaS companies
- Growth-stage startups
- Sales/Revenue leaders (VP Sales, CRO)
- Companies looking to scale outbound sales

**Pricing Tiers:**
- Starter ($499/mo) - Small teams, 2 agents
- Growth ($1,499/mo) - Scaling teams, full features
- Enterprise (Custom) - Large organizations

---



## Design System Reference

### Color Palette

```css
/* Primary Colors - Nature-inspired forest green */
--color-primary: #1B4332;        /* Deep forest green - main brand color */
--color-primary-light: #2D6A4F;  /* Lighter forest green */
--color-primary-dark: #0D2818;   /* Darker forest green */
--color-accent: #40916C;         /* Accent green */
--color-accent-light: #52B788;   /* Light accent green */

/* Backgrounds */
--color-bg-primary: #FDFBF7;     /* Warm off-white - main background */
--color-bg-secondary: #F5F3EE;   /* Slightly darker off-white */
--color-bg-accent: #E8F5EE;      /* Light green tint */
--color-bg-dark: #1B4332;        /* Dark green for CTA sections */

/* Text */
--color-text-primary: #1A1A1A;   /* Near-black for headings */
--color-text-secondary: #5A5A5A; /* Dark gray for body text */
--color-text-muted: #8A8A8A;     /* Medium gray for subtle text */
--color-text-light: #FFFFFF;     /* White text for dark backgrounds */

/* Border & Shadows */
--color-border: #E5E2DC;         /* Light warm gray borders */
--color-border-light: #F0EDE7;   /* Very subtle borders */
--shadow-soft: 0 2px 20px rgba(27, 67, 50, 0.06);
--shadow-medium: 0 4px 40px rgba(27, 67, 50, 0.08);
--shadow-large: 0 10px 60px rgba(27, 67, 50, 0.12);
```

### Typography

```css
--font-heading: 'Playfair Display', Georgia, serif;
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
```

**Google Fonts Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
```

- **Headings (h1-h4)**: Playfair Display, weight 500, letter-spacing -0.02em, line-height 1.2
- **Body text**: Inter, weight 400, line-height 1.6

### Spacing System

```css
--space-xs: 0.5rem;   /* 8px */
--space-sm: 1rem;     /* 16px */
--space-md: 1.5rem;   /* 24px */
--space-lg: 2rem;     /* 32px */
--space-xl: 3rem;     /* 48px */
--space-2xl: 4rem;    /* 64px */
--space-3xl: 6rem;    /* 96px */
--space-4xl: 8rem;    /* 128px */
```

### Border Radius

```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-2xl: 24px;
--radius-full: 9999px;  /* Pill shape */
```

### Transitions

```css
--transition-fast: 150ms ease;
--transition-default: 250ms ease;
--transition-slow: 400ms ease;
```

---

## Component Props

```typescript
interface LandingPageProps {
  onGetStarted?: () => void;  // Optional callback (currently not used)
}
```

### State Management

```typescript
const [isScrolled, setIsScrolled] = useState(false);      // Header scroll effect
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);  // Mobile menu toggle
```

---

## Page Structure

### 1. Announcement Banner

**Class**: `.announcement-bar`

A full-width banner at the very top of the page.

```html
<div class="announcement-bar">
  <span>🎉 Introducing Revenue Agent Network — The future of AI-powered sales</span>
  <a href="#features" class="announcement-link">Learn more →</a>
</div>
```

**Styling:**
- Background: Forest green (#1B4332)
- Text: White
- Font-size: 0.875rem (14px)
- Centered with flexbox
- Link: Light green accent color (#52B788)

---

### 2. Navigation Header

**Class**: `.nav-header`

Sticky header with frosted glass effect.

**State Classes:**
- `.nav-scrolled` - Applied when `window.scrollY > 20`

**Features:**
- Sticky position, z-index: 100
- Background: rgba(253, 251, 247, 0.9) with blur(20px)
- Border appears on scroll
- Smooth transition animations

**Structure:**
```html
<header class="nav-header nav-scrolled?">
  <nav class="nav-container">
    <!-- Logo -->
    <div class="nav-logo">
      <svg>...</svg>  <!-- Circle with cross icon -->
      <span class="logo-text">Revenue Agent Network</span>
    </div>
    
    <!-- Desktop Links -->
    <div class="nav-links">
      <a href="#features">Features</a>
      <a href="#how-it-works">How it Works</a>
      <a href="#pricing">Pricing</a>
    </div>
    
    <!-- CTA Button -->
    <div class="nav-actions">
      <button class="btn-primary">Try Now</button>
    </div>
    
    <!-- Mobile Hamburger -->
    <button class="mobile-menu-toggle">
      <span class="hamburger open?">...</span>
    </button>
  </nav>
  
  <!-- Mobile Menu -->
  <div class="mobile-menu open?">...</div>
</header>
```

**Logo SVG (32x32):**
```svg
<svg width="32" height="32" viewBox="0 0 32 32" fill="none">
  <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2"/>
  <path d="M10 16h12M16 10v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
</svg>
```

---

### 3. Hero Section

**Class**: `.hero`

The main above-the-fold section.

**Structure:**
```html
<section class="hero">
  <!-- Background Effects -->
  <div class="hero-background">
    <div class="hero-gradient"></div>
    <div class="hero-pattern"></div>
  </div>
  
  <!-- Content -->
  <div class="hero-content">
    <h1 class="hero-title">
      Revenue generation,<br/>
      <span class="hero-highlight">reimagined.</span>
    </h1>
    <p class="hero-subtitle">
      Harness the power of AI agents and a network of elite associates
      to transform your sales pipeline into a revenue engine.
    </p>
    <div class="hero-cta">
      <button class="btn-primary btn-large">Try Now</button>
      <button class="btn-secondary btn-large">See How It Works</button>
    </div>
    <div class="hero-trust">
      <span class="trust-label">Trusted by teams at</span>
      <div class="trust-logos">
        <span class="trust-logo">Anthropic</span>
        <span class="trust-logo">OpenAI</span>
        <span class="trust-logo">Mistral</span>
        <span class="trust-logo">Cohere</span>
      </div>
    </div>
  </div>
</section>
```

**Hero Title:**
- Font: Playfair Display
- Size: clamp(2.5rem, 6vw, 4.5rem)
- `.hero-highlight` - Italic style with green underline decoration

**Hero Background:**
- Radial gradients with subtle green tints
- SVG pattern overlay at 2% opacity

**Buttons:**
- `.btn-primary` - Forest green background, white text, pill shape
- `.btn-secondary` - White background with border, green text

---

### 4. Stats Section

**Class**: `.stats-section`

Social proof statistics bar.

**Structure:**
```html
<section class="stats-section">
  <div class="container">
    <div class="stats-grid">
      <div class="stat-item">
        <span class="stat-number">10x</span>
        <span class="stat-label">Pipeline Growth</span>
      </div>
      <div class="stat-item">
        <span class="stat-number">$2.4M</span>
        <span class="stat-label">Avg. Revenue Increase</span>
      </div>
      <div class="stat-item">
        <span class="stat-number">94%</span>
        <span class="stat-label">Client Satisfaction</span>
      </div>
      <div class="stat-item">
        <span class="stat-number">500+</span>
        <span class="stat-label">Active Associates</span>
      </div>
    </div>
  </div>
</section>
```

**Styling:**
- 4-column grid on desktop, 2x2 on mobile
- `.stat-number` - Playfair Display, large green text
- `.stat-label` - Small muted text

---

### 5. Features Section

**Class**: `.features-section`
**ID**: `#features`

**Structure:**
```html
<section id="features" class="features-section">
  <div class="container">
    <div class="section-header">
      <span class="section-tag">Features</span>
      <h2 class="section-title">
        Everything you need to<br/>
        <span class="text-accent">accelerate growth</span>
      </h2>
      <p class="section-subtitle">...</p>
    </div>
    
    <div class="features-grid">
      <div class="feature-card feature-large">...</div>  <!-- AI-Powered Agents -->
      <div class="feature-card">...</div>                <!-- Real-Time Analytics -->
      <div class="feature-card">...</div>                <!-- Associate Network -->
      <div class="feature-card">...</div>                <!-- Seamless Integration -->
      <div class="feature-card">...</div>                <!-- Verified Leads -->
    </div>
  </div>
</section>
```

**Section Header Pattern:**
- `.section-tag` - Small uppercase text, pill badge style
- `.section-title` - Large Playfair Display heading
- `.section-subtitle` - Muted paragraph text, max-width 600px centered

**Features (5 total):**
1. **AI-Powered Agents** (featured/large) - Hub icon with orbital dots
2. **Real-Time Analytics** - Bar chart icon
3. **Associate Network** - Three overlapping circles
4. **Seamless Integration** - Cross/plus in circle
5. **Verified Leads** - Checkmark icon

**Feature Card Styling:**
- White background with subtle border
- Padding: 32px
- Border-radius: 16px
- SVG icon (48x48) in green
- h3 heading + paragraph text

---

### 6. How It Works Section

**Class**: `.how-it-works-section`
**ID**: `#how-it-works`

**Structure:**
```html
<section id="how-it-works" class="how-it-works-section">
  <div class="container">
    <div class="section-header">
      <span class="section-tag">Process</span>
      <h2 class="section-title">How it works</h2>
      <p class="section-subtitle">Get started in three simple steps</p>
    </div>
    
    <div class="steps-container">
      <div class="step-card">
        <div class="step-number">01</div>
        <h3>Connect Your Data</h3>
        <p>Integrate your CRM, marketing tools, and data sources...</p>
      </div>
      <div class="step-connector"></div>
      <div class="step-card">
        <div class="step-number">02</div>
        <h3>Deploy Your Agents</h3>
        <p>Activate AI agents that prospect, qualify, and nurture leads 24/7...</p>
      </div>
      <div class="step-connector"></div>
      <div class="step-card">
        <div class="step-number">03</div>
        <h3>Watch Revenue Grow</h3>
        <p>Track every interaction, measure attribution, and scale what works...</p>
      </div>
    </div>
  </div>
</section>
```

**Steps:**
1. **Connect Your Data** - CRM integrations, AI learning
2. **Deploy Your Agents** - 24/7 AI + human associates
3. **Watch Revenue Grow** - Tracking and attribution

**Styling:**
- `.step-number` - Large green text (01, 02, 03)
- `.step-connector` - Horizontal line between steps
- Cards aligned horizontally on desktop, stacked on mobile

---

### 7. Integrations Section

**Class**: `.integrations-section`

**Structure:**
```html
<section class="integrations-section">
  <div class="container">
    <div class="section-header">
      <span class="section-tag">Integrations</span>
      <h2 class="section-title">Works with your stack</h2>
      <p class="section-subtitle">Seamlessly connect with the tools you already use</p>
    </div>
    
    <div class="integrations-grid">
      <div class="integration-card"><span class="integration-name">Salesforce</span></div>
      <div class="integration-card"><span class="integration-name">HubSpot</span></div>
      <div class="integration-card"><span class="integration-name">Slack</span></div>
      <div class="integration-card"><span class="integration-name">Zoom</span></div>
      <div class="integration-card"><span class="integration-name">Gmail</span></div>
      <div class="integration-card"><span class="integration-name">LinkedIn</span></div>
      <div class="integration-card"><span class="integration-name">Outreach</span></div>
      <div class="integration-card"><span class="integration-name">Gong</span></div>
    </div>
  </div>
</section>
```

**8 Integrations:**
Salesforce, HubSpot, Slack, Zoom, Gmail, LinkedIn, Outreach, Gong

**Integration Card:**
- 4-column grid (responsive)
- White background with border
- Centered text logo name
- Hover: slight lift and border color change

---

### 8. Pricing Section

**Class**: `.pricing-section`
**ID**: `#pricing`

**Structure:**
```html
<section id="pricing" class="pricing-section">
  <div class="container">
    <div class="section-header">
      <span class="section-tag">Pricing</span>
      <h2 class="section-title">Simple, transparent pricing</h2>
      <p class="section-subtitle">Start with what you need, scale as you grow</p>
    </div>
    
    <div class="pricing-grid">
      <!-- Starter Plan -->
      <div class="pricing-card">
        <div class="pricing-header">
          <h3>Starter</h3>
          <p>For teams getting started</p>
        </div>
        <div class="pricing-price">
          <span class="price-amount">$499</span>
          <span class="price-period">/month</span>
        </div>
        <ul class="pricing-features">
          <li>2 AI Agents</li>
          <li>Up to 500 leads/month</li>
          <li>Basic analytics</li>
          <li>Email support</li>
        </ul>
        <button class="btn-secondary btn-full">Get Started</button>
      </div>
      
      <!-- Growth Plan (Featured) -->
      <div class="pricing-card featured">
        <div class="pricing-badge">Most Popular</div>
        <div class="pricing-header">
          <h3>Growth</h3>
          <p>For scaling teams</p>
        </div>
        <div class="pricing-price">
          <span class="price-amount">$1,499</span>
          <span class="price-period">/month</span>
        </div>
        <ul class="pricing-features">
          <li>10 AI Agents</li>
          <li>Unlimited leads</li>
          <li>Associate network access</li>
          <li>Advanced analytics</li>
          <li>Priority support</li>
        </ul>
        <button class="btn-primary btn-full">Try Now</button>
      </div>
      
      <!-- Enterprise Plan -->
      <div class="pricing-card">
        <div class="pricing-header">
          <h3>Enterprise</h3>
          <p>For large organizations</p>
        </div>
        <div class="pricing-price">
          <span class="price-amount">Custom</span>
        </div>
        <ul class="pricing-features">
          <li>Unlimited agents</li>
          <li>Dedicated associate team</li>
          <li>Custom integrations</li>
          <li>White-glove onboarding</li>
          <li>24/7 phone support</li>
        </ul>
        <button class="btn-secondary btn-full">Contact Sales</button>
      </div>
    </div>
  </div>
</section>
```

**Plans:**

| Plan | Price | Features |
|------|-------|----------|
| Starter | $499/mo | 2 AI Agents, 500 leads/mo, Basic analytics, Email support |
| Growth | $1,499/mo | 10 AI Agents, Unlimited leads, Associate network, Advanced analytics, Priority support |
| Enterprise | Custom | Unlimited agents, Dedicated team, Custom integrations, White-glove onboarding, 24/7 phone |

**Featured Card:**
- `.pricing-card.featured` - Green border, slightly elevated
- `.pricing-badge` - "Most Popular" pill badge

---

### 9. CTA Section

**Class**: `.cta-section`

Dark forest green section with call-to-action.

**Structure:**
```html
<section class="cta-section">
  <div class="cta-background">
    <div class="cta-gradient"></div>
  </div>
  <div class="container">
    <div class="cta-content">
      <h2>Ready to transform your revenue?</h2>
      <p>Join 500+ companies already using Revenue Agent Network to accelerate growth.</p>
      <div class="cta-buttons">
        <button class="btn-white btn-large">Try Now</button>
        <button class="btn-ghost btn-large">Start Free Trial</button>
      </div>
    </div>
  </div>
</section>
```

**Styling:**
- Background: Dark forest green (#1B4332)
- Text: White
- Gradient overlay for depth
- `.btn-white` - White background, green text
- `.btn-ghost` - Transparent with white border

---

### 10. Footer

**Class**: `.site-footer`

**Structure:**
```html
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <!-- Brand Column -->
      <div class="footer-brand">
        <div class="footer-logo">
          <svg>...</svg>
          <span>Revenue Agent Network</span>
        </div>
        <p class="footer-tagline">The future of AI-powered revenue generation.</p>
      </div>
      
      <!-- Links Columns -->
      <div class="footer-links">
        <div class="footer-column">
          <h4>Product</h4>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#integrations">Integrations</a>
          <a href="#roadmap">Roadmap</a>
        </div>
        <div class="footer-column">
          <h4>Resources</h4>
          <a href="#docs">Documentation</a>
          <a href="#blog">Blog</a>
          <a href="#case-studies">Case Studies</a>
          <a href="#help">Help Center</a>
        </div>
        <div class="footer-column">
          <h4>Company</h4>
          <a href="#about">About Us</a>
          <a href="#careers">Careers</a>
          <a href="#contact">Contact</a>
          <a href="#press">Press</a>
        </div>
      </div>
    </div>
    
    <!-- Bottom Bar -->
    <div class="footer-bottom">
      <p>© 2026 Revenue Agent Network. All rights reserved.</p>
      <div class="footer-legal">
        <a href="#privacy">Privacy Policy</a>
        <a href="#terms">Terms of Service</a>
      </div>
    </div>
  </div>
</footer>
```

**Footer Links:**

| Product | Resources | Company |
|---------|-----------|---------|
| Features | Documentation | About Us |
| Pricing | Blog | Careers |
| Integrations | Case Studies | Contact |
| Roadmap | Help Center | Press |

---

## Button Variants

```css
/* Primary - Forest green solid */
.btn-primary {
  background: var(--color-primary);
  color: white;
  border-radius: var(--radius-full);
  padding: 12px 24px;
  font-weight: 500;
}

/* Secondary - White with border */
.btn-secondary {
  background: white;
  color: var(--color-primary);
  border: 1px solid var(--color-border);
}

/* Large variant */
.btn-large {
  padding: 16px 32px;
  font-size: 1rem;
}

/* Full width */
.btn-full {
  width: 100%;
}

/* White (for dark backgrounds) */
.btn-white {
  background: white;
  color: var(--color-primary);
}

/* Ghost (transparent with border) */
.btn-ghost {
  background: transparent;
  color: white;
  border: 1px solid rgba(255,255,255,0.3);
}
```

---

## Responsive Breakpoints

- **Desktop**: > 1024px - Full layout
- **Tablet**: 768px - 1024px - Adjusted grids
- **Mobile**: < 768px - Stacked layouts, hamburger menu

**Mobile Menu:**
- Triggered by hamburger button
- Full-width dropdown
- Links stacked vertically
- Closes on link click

---

## Animations

### Scroll Effect (Header)
```javascript
useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 20)
  }
  window.addEventListener("scroll", handleScroll)
  return () => window.removeEventListener("scroll", handleScroll)
}, [])
```

### Smooth Scroll (Try Now button)
```javascript
const handleBookDemo = () => {
  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
}
```

### CSS Animations
```css
/* Fade in from bottom */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## File Structure

```
src/pages/
├── LandingPage.tsx    # Component file
├── LandingPage.css    # All styles (1200+ lines)
```

---

## Key Design Principles

1. **Premium Feel** - Playfair Display serif font, forest green palette, generous whitespace
2. **Nature-Inspired** - Warm off-white backgrounds, organic green colors
3. **Clarity** - Clear section headers, simple navigation, scannable content
4. **Trust Signals** - Stats section, company logos, social proof
5. **Conversion Focus** - Multiple CTAs, clear value proposition, pricing transparency
6. **Responsive First** - Mobile-friendly with smooth transitions

---

## Dependencies

- React (useState, useEffect)
- Google Fonts: Playfair Display, Inter
- No external component libraries (pure CSS)
