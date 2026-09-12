# APIHub — Tech Stack

## 1. Technology Philosophy

APIHub will use a modern, industry-relevant full-stack JavaScript/TypeScript ecosystem.

The technology choices should prioritize:

- Type safety
- Developer experience
- Maintainability
- Strong React ecosystem support
- Good frontend performance
- Clean component architecture
- Easy local development
- Portfolio and interview value
- Ability to scale the product later without premature complexity

The project is initially structured as a **modular monolith**.

---

# 2. Project Structure

```text
APIHub/
│
├── PRD.md
├── DesignDoc.md
├── Architecture.md
├── Tech Stack.md
├── userflow.ms
│
├── frontend/
│
└── backend/
```

### Current implementation priority

The current phase is **frontend-first**.

Only the `frontend` directory should be modified during the frontend implementation phase.

The `backend` directory should remain untouched until the frontend foundation is ready.

---

# 3. Frontend Stack

## Core Framework

### Next.js

Use the current stable Next.js version installed by the project setup.

Next.js provides:

- React-based application development
- App Router
- Routing
- Layouts
- Server/client component architecture
- Production optimization
- Asset optimization

APIHub uses the **Next.js App Router**.

---

## UI Framework

### React

React is the primary UI library.

Use React components to build:

- Navigation
- Hero sections
- Feature sections
- Product previews
- Forms
- Dashboard UI
- API request builder
- Response viewer
- Collections
- Environment controls
- Reusable UI components

The application should use a component-based architecture rather than putting large amounts of UI into a single file.

---

## Language

### TypeScript

TypeScript is required.

Use TypeScript for:

- Components
- Props
- API response types
- Request models
- Form models
- State
- Utility functions
- Shared frontend types

Avoid unnecessary `any`.

Prefer explicit interfaces/types where they improve clarity.

---

# 4. Styling

## Tailwind CSS

Tailwind CSS is the primary styling solution.

Use it for:

- Layout
- Spacing
- Typography
- Colors
- Responsive behavior
- Borders
- Shadows
- Hover states
- Focus states
- Transitions

Avoid creating huge amounts of custom CSS when Tailwind can express the same design cleanly.

However, custom CSS is allowed where it is genuinely useful, especially for:

- Complex animations
- 3D effects
- CSS variables
- Special visual effects
- Global styling

---

# 5. Design System

The APIHub visual system is defined in `DesignDoc.md`.

Important base colors:

```text
Background:        #0B0F19
Sidebar:           #111827
Panel:             #151C2C
Elevated Panel:    #1B2436
Border:            #263247

Primary Text:      #F8FAFC
Secondary Text:    #94A3B8
Muted Text:        #64748B

Brand Purple:      #8B5CF6
Brand Cyan:        #22D3EE
```

HTTP method colors:

```text
GET:               #22C55E
POST:              #F59E0B
PUT:               #3B82F6
PATCH:             #A855F7
DELETE:            #EF4444
```

Feature colors:

```text
Testing:           #EC4899
Mocking:           #14B8A6
Monitoring:        #F97316
Documentation:     #3B82F6
```

The agent must use `DesignDoc.md` as the source of truth for detailed visual decisions.

---

# 6. UI Component Strategy

APIHub should use reusable React components.

Recommended structure:

```text
frontend/
│
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── globals.css
│   │
│   ├── login/
│   ├── signup/
│   ├── dashboard/
│   ├── projects/
│   ├── history/
│   └── settings/
│
├── components/
│   ├── ui/
│   ├── landing/
│   ├── auth/
│   ├── dashboard/
│   └── api-workspace/
│
├── lib/
├── hooks/
└── store/
```

This is a suggested architecture, not a requirement to create every directory immediately.

Create files when they are actually needed.

---

# 7. State Management

## Zustand

Use Zustand for client-side application state when global/shared state becomes necessary.

Potential state:

- Selected project
- Selected collection
- Selected request
- Active environment
- Request builder state
- UI preferences
- Sidebar state

Do not introduce global state for data that can remain local to a component.

---

# 8. Server State / Data Fetching

## TanStack Query

Use TanStack Query for server-state management once the frontend connects to the backend.

Use it for:

- Projects
- Collections
- Requests
- Environments
- History
- User/session data

Benefits:

- Caching
- Refetching
- Loading states
- Error states
- Mutation handling

During the initial frontend-only phase, use mock/local data where necessary.

Do not create fake backend endpoints just to make the UI appear connected.

---

# 9. Code / JSON Editor

## Monaco Editor

Use Monaco Editor for API-development areas that require a code editor experience.

Potential uses:

- JSON request body
- JSON response viewer
- Headers or scripts in future versions
- Code-based API testing in later phases

The editor should be introduced when the relevant API workspace is implemented.

Do not add it unnecessarily to the landing page.

---

# 10. 3D Graphics

The landing page should contain tasteful 3D visual elements.

A suitable technology may be:

### React Three Fiber

Use React Three Fiber when an interactive real-time 3D scene is genuinely beneficial.

Potential uses:

- Floating API nodes
- Network connections
- Abstract API structures
- 3D lifecycle visualization
- Interactive product visuals

Possible supporting libraries:

- `three`
- `@react-three/fiber`
- `@react-three/drei`

### 3D Rules

3D must:

- Enhance the product story
- Remain professional
- Be lightweight where possible
- Be responsive
- Avoid blocking important text
- Avoid excessive animation
- Respect reduced-motion preferences where practical

Do not create a huge complex 3D scene merely for visual spectacle.

If a CSS-based or lightweight visual can achieve the same result, prefer the simpler solution.

---

# 11. Animation / Motion

Use a React-compatible animation library when appropriate.

### Recommended: Framer Motion / Motion

Use motion for:

- Section reveals
- Hover interactions
- Button transitions
- Card interactions
- Navigation transitions
- Product-preview movement
- Subtle page transitions

Animations should generally be:

- Fast
- Smooth
- Purposeful
- Subtle

Avoid excessive animation.

Respect:

```css
prefers-reduced-motion
```

---

# 12. Icons

Use a consistent icon library such as:

### Lucide React

Use icons for:

- Navigation
- Buttons
- Feature cards
- API methods
- Settings
- History
- Projects
- Documentation
- Monitoring
- UI actions

Do not mix many unrelated icon styles.

Icons should support the UI rather than replace clear labels.

---

# 13. Forms

Use standard React form patterns initially.

As forms become more complex, use:

### React Hook Form

Potential uses:

- Login
- Signup
- Project creation
- Environment creation
- Request configuration
- Settings

Validation can use:

### Zod

Keep validation schemas reusable where both client and server validation may eventually share the same concepts.

---

# 14. Backend Stack

The backend will be implemented later.

## Runtime

### Node.js

Use Node.js for the backend runtime.

---

## Framework

### Express.js

Express will provide the REST API layer.

Responsibilities:

- Routing
- Middleware
- Authentication endpoints
- Project endpoints
- Collection endpoints
- Request endpoints
- Environment endpoints
- History endpoints

---

## Language

### TypeScript

The backend will also use TypeScript.

---

## Validation

### Zod

Use Zod for:

- Request validation
- Environment validation
- Authentication input
- API payload validation
- Configuration validation

---

# 15. Authentication

Planned authentication technologies:

### JWT

Use JWT-based authentication for sessions where appropriate.

### HTTP-only Cookies

Store authentication tokens/session credentials in secure HTTP-only cookies rather than exposing sensitive authentication tokens to client-side JavaScript unnecessarily.

Authentication will include:

- Register
- Login
- Logout
- Session verification
- Protected routes

Passwords must be securely hashed.

---

# 16. Database

## PostgreSQL

PostgreSQL is the planned primary relational database.

Potential entities:

```text
users
projects
collections
requests
environments
environment_variables
request_history
```

Detailed database design is intentionally deferred.

---

# 17. ORM

## Prisma

Use Prisma as the PostgreSQL ORM/database toolkit.

Prisma will provide:

- Database schema
- Type-safe database access
- Migrations
- Querying
- Relations

---

# 18. API Communication

Frontend-to-backend communication will use:

### REST APIs

Example:

```text
Frontend
   |
   | HTTP
   v
Next.js
   |
   | REST
   v
Express Backend
```

Potential future real-time communication:

### WebSockets / Socket.IO

Possible uses:

- Live request execution
- Monitoring status
- Background job status
- Real-time notifications

Do not add WebSockets until there is a real requirement.

---

# 19. API Request Execution

APIHub will eventually execute external API requests through the backend.

The backend will be responsible for:

- Validation
- Authentication
- Environment variable resolution
- URL validation
- SSRF protection
- Timeout enforcement
- Response-size limits
- Safe redirect handling
- HTTP execution
- Response processing
- History storage

This is important because arbitrary user-provided URLs can introduce security risks.

---

# 20. Future Background Processing

Not part of the initial implementation.

Potential future stack:

### Redis

Used for:

- Caching
- Queues
- Temporary state
- Rate limiting where appropriate

### BullMQ

Used for:

- Scheduled monitoring
- Automated testing
- Background jobs
- Workflow execution

Architecture:

```text
Express API
    |
    v
Redis
    |
    v
BullMQ
    |
    v
Worker
```

---

# 21. Data Visualization

### Recharts

Potential future use:

- API response-time charts
- Monitoring metrics
- Availability charts
- Error-rate charts
- Execution history analytics

Do not introduce charts into the initial landing page unless they serve a clear visual purpose.

---

# 22. Visual Workflow Builder

### React Flow

Planned for a future workflow-builder feature.

Potential uses:

- Request nodes
- Data connections
- Variable mapping
- Conditional branches
- Workflow execution visualization

Example:

```text
POST /login
      |
      | token
      v
GET /profile
      |
      | userId
      v
GET /users/:id
```

React Flow should not be introduced into the initial landing page or MVP unless explicitly required for a visual prototype.

---

# 23. Development Tools

Recommended:

- VS Code
- Git
- GitHub
- npm
- ESLint
- TypeScript

Use Git commits throughout development.

Suggested commit style:

```text
feat: create APIHub landing page
feat: add authentication UI
feat: add dashboard shell
fix: improve request builder layout
refactor: extract reusable button component
```

---

# 24. Testing

Testing will be added progressively.

Potential tools:

### Vitest

For unit/component-level tests where appropriate.

### Playwright

For end-to-end browser testing.

Testing priorities:

- Authentication
- Request builder
- API execution
- Environment variables
- Critical navigation flows

---

# 25. Deployment — Future

Potential deployment architecture:

### Frontend

- Vercel or another Next.js-compatible platform

### Backend

- Node.js-compatible hosting/container

### Database

- Managed PostgreSQL

### Infrastructure

- Docker
- GitHub Actions

Deployment decisions will be made later.

---

# 26. Dependency Principles

Do not install libraries merely because they are popular.

Before adding a dependency, ask:

1. Does APIHub actually need it?
2. Does it simplify a real problem?
3. Can the same result be achieved cleanly with existing tools?
4. Does it add unnecessary bundle size?
5. Is it compatible with the current architecture?

Prefer a smaller, understandable dependency set.

---

# 27. Current Frontend Phase

The immediate implementation sequence is:

```text
1. Next.js + React setup
        ↓
2. Global design foundation
        ↓
3. Landing page
        ↓
4. Authentication UI
        ↓
5. Application shell
        ↓
6. Dashboard
        ↓
7. API workspace
        ↓
8. Request builder
        ↓
9. Response viewer
        ↓
10. Collections
        ↓
11. Environments
        ↓
12. History
```

Backend integration comes afterward.

---

# 28. Critical Agent Rules

Any coding agent working on APIHub must follow these rules:

### Rule 1 — Read the project documents first

Before making significant changes, read:

```text
PRD.md
DesignDoc.md
Architecture.md
Tech Stack.md
userflow.ms
```

These documents are the project's primary specification.

### Rule 2 — Frontend-only phase

During the current frontend implementation:

**Only modify files inside `frontend/`.**

Do not modify:

```text
backend/
```

unless explicitly instructed.

### Rule 3 — Do not invent backend behavior

If the backend is not implemented, use appropriate mock/local state for UI development.

Do not create fake API integrations that imply the backend exists.

### Rule 4 — Preserve the design system

Use `DesignDoc.md` as the source of truth for:

- Colors
- Typography
- Spacing
- Motion
- UI hierarchy
- Visual style

### Rule 5 — Componentize thoughtfully

Do not create one enormous component.

But also do not create dozens of tiny components with no meaningful reuse.

### Rule 6 — Keep the UI professional

Avoid:

- Generic templates
- Excessive gradients
- Excessive glassmorphism
- Random colors
- Excessive animations
- Unnecessary 3D
- Clutter

### Rule 7 — Build incrementally

After a meaningful feature is implemented:

1. Run the application.
2. Check for errors.
3. Check responsive behavior.
4. Verify navigation.
5. Verify accessibility.
6. Continue to the next feature.

### Rule 8 — Do not overwrite working functionality unnecessarily

Prefer targeted changes.

Do not rewrite unrelated files simply to implement a new feature.

---

# 29. Final Technology Summary

| Area | Technology |
|---|---|
| UI Library | React |
| Frontend Framework | Next.js |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Client State | Zustand |
| Server State | TanStack Query |
| Forms | React Hook Form |
| Validation | Zod |
| Icons | Lucide React |
| Code Editor | Monaco Editor |
| 3D | Three.js + React Three Fiber |
| Animation | Motion / Framer Motion |
| Workflow Builder | React Flow |
| Charts | Recharts |
| Backend Runtime | Node.js |
| Backend Framework | Express.js |
| Backend Language | TypeScript |
| Authentication | JWT + HTTP-only Cookies |
| Database | PostgreSQL |
| ORM | Prisma |
| Future Queue | BullMQ |
| Future Cache/Queue Store | Redis |
| Future Real-time | WebSockets / Socket.IO |
| Testing | Vitest + Playwright |
| Containerization | Docker |
| CI/CD | GitHub Actions |

---

# 30. Final Stack Principle

APIHub should use modern technologies where they solve real problems.

The project should remain:

**Type-safe + componentized + maintainable + performant + understandable.**

Avoid premature infrastructure.

The initial goal is a clean React/Next.js frontend and modular Node.js/Express backend, with more advanced infrastructure introduced only when the product requires it.
