# APIHub — Design Document

## 1. Design Objective

APIHub should provide a modern, developer-focused experience that is:

- Simple
- Professional
- Intuitive
- Visually interesting
- Easy to learn
- Technically credible
- Portfolio-quality

The interface should combine developer-tool usability with modern SaaS visual polish.

Reference the general usability principles of tools such as IDEs and API clients, but do not directly copy another product's interface.

---

## 2. Brand

**Name:** APIHub

**Tagline:** Your APIs. One Hub.

Brand personality:

- Technical
- Confident
- Modern
- Clean
- Helpful
- Developer-centric

---

## 3. Color System

### Base

| Purpose | Color |
|---|---|
| App background | `#0B0F19` |
| Sidebar | `#111827` |
| Cards / panels | `#151C2C` |
| Elevated panels | `#1B2436` |
| Borders | `#263247` |
| Primary text | `#F8FAFC` |
| Secondary text | `#94A3B8` |
| Muted text | `#64748B` |

### Brand

- Electric Violet: `#8B5CF6`
- Cyan: `#22D3EE`

### HTTP Methods

- GET: `#22C55E`
- POST: `#F59E0B`
- PUT: `#3B82F6`
- PATCH: `#A855F7`
- DELETE: `#EF4444`

### Feature Colors

- Testing: `#EC4899`
- Mocking: `#14B8A6`
- Monitoring: `#F97316`
- Documentation: `#3B82F6`

### Semantic

- Success: `#22C55E`
- Warning: `#F59E0B`
- Error: `#EF4444`
- Info: `#3B82F6`
- Neutral: `#64748B`

Color ratio target:

- Approximately 70% neutral
- 20% brand colors
- 10% semantic/feature colors

Avoid rainbow UI. Colors must communicate meaning.

---

## 4. Typography

Primary UI font:

- Inter or Geist

Monospace font:

- Geist Mono, JetBrains Mono, or equivalent

Use monospace for:

- URLs
- API paths
- JSON
- Headers
- Code
- Variables

Suggested hierarchy:

- Hero headline: 52–72px desktop
- Page title: 28–32px
- Section title: 32–44px
- Body: 14–18px depending on context
- Metadata: 12–13px

Responsive typography must scale down gracefully.

---

## 5. Landing Page Design

### Important Scope Rule

This document currently focuses on the public landing page.

**Do not place authenticated dashboard UI into the landing page.**

The landing page should sell/explain the product and visually preview it, but it should not become the dashboard.

### Landing Page Sections

1. Navbar
2. Hero
3. Product visual / API workspace preview
4. Core capabilities
5. API lifecycle
6. Workflow/automation visual
7. Why APIHub
8. Final CTA
9. Footer

---

## 6. Navbar

Desktop navigation:

- APIHub logo
- Features
- How It Works
- Documentation
- GitHub
- Login
- Get Started

The navbar should remain compact.

Use a sticky or semi-sticky header with a subtle backdrop/border effect.

Primary CTA:

**Get Started**

Secondary navigation should remain visually quieter.

Mobile:

- Logo
- Menu button
- Collapsible navigation drawer

---

## 7. Hero

Headline:

**Build APIs. Test Them. Ship With Confidence.**

Product identity:

**Your APIs. One Hub.**

Supporting copy should explain that APIHub brings API development, testing, automation, mocking, documentation, and monitoring into one workspace.

Primary CTA:

**Get Started Free**

Secondary CTA:

**Explore APIHub**

The hero must immediately communicate:

- What APIHub is
- Who it is for
- Why it is useful

---

## 8. 3D Visual Direction

The landing page must include tasteful 3D elements.

3D should enhance the interface rather than dominate it.

Possible elements:

- Floating 3D API nodes
- Rotating abstract API/network sphere
- Floating request/response cards
- 3D cubes representing API lifecycle stages
- Layered 3D endpoint cards
- Subtle glowing connection lines
- Floating JSON/code panels

The 3D scene should use APIHub's purple/cyan visual identity.

Avoid:

- Cartoonish 3D
- Huge objects blocking text
- Distracting constant rotation
- Excessive glow
- Visually heavy scenes

3D motion should be subtle and performance-conscious.

---

## 9. Hover Effects

Interactive elements should have clear but restrained hover feedback.

Buttons:

- Slight brightness change
- Small elevation
- Subtle shadow/glow
- 150–200ms transition

Feature cards:

- Border accent
- Slight upward movement
- Very subtle background shift

3D objects:

- Slight parallax
- Gentle rotation/position response
- No extreme movement

Navigation:

- Text color transition
- Small underline or accent

Do not animate every element.

---

## 10. Motion

Use motion purposefully.

Preferred:

- Fade-in on section entry
- Gentle upward reveal
- Staggered feature-card appearance
- Subtle floating 3D objects
- Smooth hover transitions
- Scroll-linked parallax only where it improves the experience

Avoid:

- Constant large movement
- Long loading animations
- Excessive bounce effects
- Motion that harms readability

Respect `prefers-reduced-motion`.

---

## 11. Product Preview

The landing page should show a realistic visual preview of APIHub.

The preview can include:

- Request method
- API URL
- Params / Headers / Body / Auth tabs
- Send button
- Response status
- Response time
- JSON response

It should look like a product screenshot/mockup rather than a functional dashboard.

Use subtle 3D perspective or layered panels to create depth.

---

## 12. Core Capabilities Section

Show:

- Build
- Test
- Automate
- Mock
- Document
- Monitor

Each capability gets:

- Icon
- Title
- One-sentence explanation
- Feature color
- Subtle hover interaction

Keep cards concise.

---

## 13. API Lifecycle Section

Visual:

**Build → Test → Automate → Mock → Document → Monitor**

Use connecting lines and subtle animation.

Each stage gets its semantic feature color.

This section is one of the most important product-positioning visuals.

---

## 14. Responsive Design

Desktop:

- Full-width layouts
- Large hero typography
- 3D visual composition

Tablet:

- Reduced spacing
- Smaller visual objects
- Two-column layouts where appropriate

Mobile:

- Single-column layout
- Simplified 3D scene
- Smaller typography
- Collapsible navbar
- Stacked CTAs

Do not simply shrink desktop UI.

---

## 15. Accessibility

Requirements:

- Sufficient contrast
- Keyboard navigation
- Visible focus states
- Semantic HTML
- Accessible button labels
- Decorative 3D elements hidden from screen readers
- Respect reduced-motion preferences

---

## 16. UX Principle

The user should understand the landing page hierarchy almost instantly:

**What is APIHub? → What can it do? → How does it help me? → Start using it.**

---

## 17. Visual Principle

The final landing page should feel:

**Simple + Professional + Interactive + Technical + Memorable**

The visual effects should support the product story, not become the product story.
