# Login Page Specification for Revenue Agent Network

## Overview

This document provides a comprehensive specification for rebuilding the Login Page component that matches the alex.com-inspired design system of the Revenue Agent Network landing page. The login page should seamlessly integrate with the existing landing page aesthetics.

---

## Design System Reference

### Color Palette (from LandingPage.css)

```css
--color-primary: #1B4332;        /* Forest green - main brand color */
--color-primary-light: #40916C;  /* Lighter green for accents */
--color-primary-dark: #081C15;   /* Darker green for depth */
--color-accent: #52B788;         /* Bright green for highlights */
--color-accent-light: #95D5B2;   /* Light accent green */
--color-bg-primary: #FDFBF7;     /* Warm off-white background */
--color-bg-secondary: #F7F5F0;   /* Slightly darker off-white */
--color-bg-accent: rgba(64, 145, 108, 0.08); /* Subtle green tint */
--color-text-primary: #1A1A1A;   /* Near-black for headings */
--color-text-secondary: #4A4A4A; /* Dark gray for body text */
--color-text-muted: #6B6B6B;     /* Medium gray for subtle text */
--color-border: #E5E5E5;         /* Light gray borders */
--color-border-light: rgba(0, 0, 0, 0.06); /* Very subtle borders */
```

### Typography

```css
--font-heading: 'Playfair Display', Georgia, 'Times New Roman', serif;
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

- **Headings**: Playfair Display (serif) - elegant, premium feel
- **Body text**: Inter (sans-serif) - clean, modern readability

### Spacing System

```css
--space-xs: 0.25rem;   /* 4px */
--space-sm: 0.5rem;    /* 8px */
--space-md: 1rem;      /* 16px */
--space-lg: 1.5rem;    /* 24px */
--space-xl: 2rem;      /* 32px */
--space-2xl: 3rem;     /* 48px */
```

### Border Radius

```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-2xl: 20px;
--radius-full: 9999px;
```

### Shadows

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03);
--shadow-large: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
```

---

## Component Structure

### Props Interface

```typescript
interface LoginPageProps {
  onLogin: () => void;   // Callback when login succeeds - navigates to app
  onBack: () => void;    // Callback to go back to landing page
}
```

### State Management

```typescript
const [email, setEmail] = useState<string>("");
const [password, setPassword] = useState<string>("");
const [isLoading, setIsLoading] = useState<boolean>(false);
const [error, setError] = useState<string>("");
```

---

## Page Layout

### 1. Background Layer (Fixed, z-index: -1)

The login page shares the same subtle background as the landing page:

- **Hero Gradient**: Radial gradient ellipses with forest green at 8% opacity
  ```css
  background:
    radial-gradient(ellipse at 30% 20%, rgba(64, 145, 108, 0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 80%, rgba(27, 67, 50, 0.05) 0%, transparent 50%);
  ```
- **Hero Pattern**: Subtle cross/plus pattern SVG at 2% opacity

### 2. Navigation Header

Simplified navigation matching landing page style:

- **Logo** (clickable button, returns to landing page):
  - SVG icon: Circle with cross/plus inside (32x32px)
  - Text: "Revenue Agent Network" in Playfair Display
  - Color: Forest green (#1B4332)

- **Back Button** (right side):
  - Text: "← Back to Home"
  - Style: `.btn-text` - transparent background, forest green text
  - Hover: Slight opacity reduction

### 3. Login Card (Centered)

**Container**: `.login-container`
- Flexbox centered (both axes)
- Padding: 32px (var(--space-xl))
- Top padding: 120px (accounts for fixed nav)

**Card**: `.login-card`
- Background: White
- Border radius: 20px (var(--radius-2xl))
- Padding: 48px (var(--space-2xl))
- Max width: 420px
- Width: 100%
- Box shadow: Large shadow
- Border: 1px solid light border
- Animation: `fadeInUp 0.6s ease-out`

---

## Card Content Sections

### A. Header Section

**Icon** (`.login-icon`):
- Size: 64x64px
- SVG: User silhouette in circle
  - Outer circle (r=20, stroke-width=2)
  - Head circle (r=6, centered at top)
  - Body arc path at bottom
- Color: Forest green (--color-primary)
- Centered with margin-bottom

**Title** (`h1`):
- Text: "Welcome back"
- Font: Playfair Display, 1.75rem
- Color: Near-black (#1A1A1A)
- Margin-bottom: 4px

**Subtitle** (`p`):
- Text: "Sign in to your account to continue"
- Font: Inter, 0.9375rem (15px)
- Color: Dark gray (#4A4A4A)

### B. Form Section

**Form** (`.login-form`):
- Display: flex, column
- Gap: 16px (var(--space-md))

**Error Message** (`.login-error` - conditional):
- Background: #FEF2F2 (light red)
- Border: 1px solid #FECACA
- Color: #DC2626 (red)
- Padding: 8px 16px
- Border-radius: 8px
- Font-size: 0.875rem
- Text-align: center

**Form Groups** (`.form-group`):
- Display: flex, column
- Gap: 4px (var(--space-xs))

**Labels**:
- Font-size: 0.875rem (14px)
- Font-weight: 500
- Color: Near-black (#1A1A1A)

**Inputs**:
- Padding: 14px 16px (0.875rem 1rem)
- Border: 1px solid #E5E5E5
- Border-radius: 8px
- Font-size: 1rem
- Font-family: Inter
- Background: Off-white (#FDFBF7)
- **Focus state**:
  - Border-color: Forest green (#1B4332)
  - Box-shadow: 0 0 0 3px rgba(27, 67, 50, 0.1)
  - Background: White

**Email Field**:
- Type: email
- ID: "email"
- Placeholder: "you@company.com"
- Autocomplete: "email"
- Required: true

**Password Field**:
- Type: password
- ID: "password"
- Placeholder: "Enter your password"
- Autocomplete: "current-password"
- Required: true

### C. Form Options Row

**Container** (`.form-options`):
- Display: flex
- Justify-content: space-between
- Align-items: center
- Font-size: 0.875rem

**Remember Me Checkbox**:
- Checkbox input (16x16px)
- Accent-color: Forest green
- Label text: "Remember me"
- Color: Secondary gray (#4A4A4A)

**Forgot Password Link**:
- Text: "Forgot password?"
- Color: Forest green (#1B4332)
- Font-weight: 500
- No text decoration
- Hover: Opacity 0.8

### D. Submit Button

**Classes**: `.btn-primary .btn-full .btn-large`
- Background: Forest green (#1B4332)
- Color: White
- Width: 100%
- Padding: 16px 32px
- Font-size: 1rem
- Font-weight: 500
- Border-radius: 9999px (pill shape)
- Transition: all 200ms

**Disabled state** (when loading):
- Opacity reduced
- Cursor: not-allowed

**Loading state**:
- Content: `<span class="loading-spinner">Signing in...</span>`
- Spinner: CSS-only spinning circle
  - 16x16px circle
  - Border: 2px solid rgba(255, 255, 255, 0.3)
  - Border-top-color: white
  - Animation: spin 0.8s linear infinite

**Hover state** (when not disabled):
- Background slightly lighter
- Transform: translateY(-2px)
- Box-shadow enhancement

### E. Divider

**Container** (`.login-divider`):
- Display: flex
- Align-items: center
- Gap: 16px
- Margin: 24px 0 (var(--space-lg))
- Color: Muted gray (#6B6B6B)
- Font-size: 0.8125rem (13px)

**Lines** (::before and ::after pseudo-elements):
- Flex: 1
- Height: 1px
- Background: #E5E5E5

**Text**: "or continue with"

### F. Social Login Buttons

**Container** (`.social-buttons`):
- Display: grid
- Grid-template-columns: 1fr 1fr
- Gap: 8px (var(--space-sm))

**Buttons** (`.btn-social`):
- Display: flex
- Align-items: center
- Justify-content: center
- Gap: 8px
- Padding: 12px 16px
- Border: 1px solid #E5E5E5
- Border-radius: 8px
- Background: White
- Color: Near-black (#1A1A1A)
- Font-size: 0.9375rem
- Font-weight: 500
- Cursor: pointer
- Transition: all 150ms

**Hover state**:
- Background: Off-white (#F7F5F0)
- Border-color: Forest green

**Google Button**:
- Google "G" logo SVG (multi-color paths)
- Text: "Google"
- onClick: calls onLogin

**GitHub Button**:
- GitHub octocat logo SVG
- Text: "GitHub"
- onClick: calls onLogin

### G. Footer Text

**Container** (`.login-footer`):
- Text-align: center
- Margin-top: 24px (var(--space-lg))
- Font-size: 0.9375rem
- Color: Secondary gray (#4A4A4A)

**Content**: "Don't have an account? [Book a demo]"

**Link**:
- Color: Forest green (#1B4332)
- Font-weight: 500
- No text decoration
- Hover: Underline
- onClick: preventDefault, calls onLogin

---

## Animations

### fadeInUp Animation

```css
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

### Spin Animation (for loading)

```css
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

---

## Form Submission Logic

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setIsLoading(true);

  // Simulate login delay (replace with actual API call)
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Validate and authenticate
  if (email && password) {
    onLogin(); // Success - navigate to app
  } else {
    setError("Please enter your email and password");
    setIsLoading(false);
  }
};
```

---

## SVG Icons

### Logo Icon (32x32)

```svg
<svg width="32" height="32" viewBox="0 0 32 32" fill="none">
  <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2"/>
  <path d="M10 16h12M16 10v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
</svg>
```

### User Icon (48x48)

```svg
<svg width="48" height="48" viewBox="0 0 48 48" fill="none">
  <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2"/>
  <circle cx="24" cy="20" r="6" stroke="currentColor" strokeWidth="2"/>
  <path d="M12 38c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
</svg>
```

### Google Logo SVG

```svg
<svg viewBox="0 0 24 24" width="20" height="20">
  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
</svg>
```

### GitHub Logo SVG

```svg
<svg viewBox="0 0 24 24" width="20" height="20">
  <path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/>
</svg>
```

---

## App.tsx Integration

The login page should integrate with the main App component using a view state system:

```typescript
// View states
type ViewState = "landing" | "login" | "app";

// State
const [viewState, setViewState] = useState<ViewState>("landing");

// Handlers
const handleGoToLogin = () => setViewState("login");
const handleBackToLanding = () => setViewState("landing");
const handleLogin = () => {
  localStorage.setItem("isLoggedIn", "true");
  setViewState("app");
};

// Render
if (viewState === "landing") {
  return <LandingPage onGetStarted={handleGoToLogin} />;
}
if (viewState === "login") {
  return <LoginPage onLogin={handleLogin} onBack={handleBackToLanding} />;
}
return <AppDashboard />;
```

---

## CSS Required (add to LandingPage.css)

The login page styles should be added to the existing LandingPage.css file. The styles are already defined from lines 1191-1425 in the current file. Key class names:

- `.login-page` - Main wrapper
- `.login-background` - Fixed background layer
- `.login-container` - Centered content container
- `.login-card` - White card with form
- `.login-header` - Icon, title, subtitle
- `.login-icon` - User icon container
- `.login-form` - Form element
- `.login-error` - Error message box
- `.form-group` - Label + input wrapper
- `.form-options` - Remember me + forgot password row
- `.checkbox-label` - Checkbox styling
- `.forgot-link` - Forgot password link
- `.loading-spinner` - Spinning loader
- `.login-divider` - "or continue with" divider
- `.social-buttons` - Grid for social buttons
- `.btn-social` - Social login button style
- `.login-footer` - Bottom signup text

---

## Responsive Considerations

- Card max-width: 420px (remains centered on all screens)
- Padding adjusts for mobile (var(--space-xl) → var(--space-md))
- Navigation stacks on mobile if needed
- Inputs are full-width
- Social buttons remain 2-column grid but resize

---

## Accessibility

- All inputs have associated labels with htmlFor/id matching
- Required fields marked with `required` attribute
- Proper autocomplete attributes for email/password
- Error messages are visible and centered
- Keyboard navigation works throughout
- Sufficient color contrast maintained

---

## Dependencies

- React (useState)
- LandingPage.css (shared styles and CSS variables)
- Google Fonts: Playfair Display, Inter

---

## File Location

```
src/pages/LoginPage.tsx
```

The component should be exported as both named `LoginPage` and default export.
