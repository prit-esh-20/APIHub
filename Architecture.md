# APIHub — Architecture Document

## 1. Architecture Overview

APIHub will initially use a **modular monolith architecture**.

This keeps development simple while allowing the codebase to evolve into more specialized services later if required.

High-level structure:

```text
Browser
   |
   v
Next.js Frontend
   |
   | REST / WebSocket later
   v
Node.js + Express Backend
   |
   +-----------------------------+
   |             |               |
 Auth         Projects       API Execution
 Collections Requests        Environments
 History
   |
   v
PostgreSQL
```

Future infrastructure may add:

```text
Redis
   |
BullMQ
   |
Background Workers
   |
Monitoring / Testing Jobs
```

---

## 2. Repository Structure

Current root:

```text
APIHub/
├── frontend/
└── backend/
```

Frontend:

```text
frontend/
├── app/
├── components/
├── lib/
├── hooks/
├── store/
├── public/
├── package.json
└── ...
```

Backend:

```text
backend/
├── src/
│   ├── modules/
│   │   ├── auth/
│   │   ├── projects/
│   │   ├── collections/
│   │   ├── requests/
│   │   ├── environments/
│   │   └── history/
│   ├── middleware/
│   ├── services/
│   ├── utils/
│   └── server.ts
├── package.json
└── ...
```

The backend folder remains intentionally untouched during the initial landing-page implementation.

---

## 3. Frontend Technology

Primary stack:

- React
- Next.js
- TypeScript
- Tailwind CSS

Supporting libraries planned:

- Zustand — client state
- TanStack Query — server state
- Monaco Editor — code/JSON editing
- React Flow — future visual workflows
- Recharts — future monitoring charts

Next.js App Router will be used.

---

## 4. Landing Page Frontend Architecture

The landing page should be componentized.

Suggested structure:

```text
frontend/
└── app/
    ├── page.tsx
    ├── layout.tsx
    └── globals.css

frontend/
└── components/
    └── landing/
        ├── Navbar.tsx
        ├── Hero.tsx
        ├── HeroVisual.tsx
        ├── ProductPreview.tsx
        ├── Capabilities.tsx
        ├── Lifecycle.tsx
        ├── WorkflowVisual.tsx
        ├── FinalCTA.tsx
        └── Footer.tsx
```

Only create components when they are actually needed. Do not generate the entire application at once.

---

## 5. Frontend Principles

### Component responsibility

Each component should have one clear responsibility.

Avoid one enormous `page.tsx`.

### Reusability

Buttons, badges, cards, and common layout primitives should be reusable where useful.

### Type safety

Use TypeScript types instead of unnecessary `any`.

### Accessibility

Use semantic HTML and accessible interactions.

### Performance

3D and animation must not make the page unnecessarily heavy.

Lazy-load expensive visual components where appropriate.

---

## 6. Backend Technology

Planned:

- Node.js
- Express.js
- TypeScript
- Zod
- JWT
- HTTP-only cookies

Database:

- PostgreSQL
- Prisma

---

## 7. Backend Modules

### Authentication

Responsibilities:

- Registration
- Login
- Logout
- Session verification
- Password hashing

### Projects

Responsibilities:

- Create
- Read
- Update
- Delete

### Collections

Responsibilities:

- Create
- Rename
- Delete
- Move
- Duplicate

### Requests

Responsibilities:

- Create
- Update
- Delete
- Execute

### Environments

Responsibilities:

- Environment CRUD
- Variable management
- Variable resolution

### History

Responsibilities:

- Store request execution history
- Retrieve history
- Clear history

---

## 8. API Execution Architecture

The backend executes external API requests.

Flow:

```text
Frontend
   |
   | POST /api/requests/:id/execute
   v
Backend
   |
   +--> Validate input
   |
   +--> Authenticate user
   |
   +--> Resolve environment variables
   |
   +--> Validate target URL
   |
   +--> Apply security rules
   |
   +--> Apply timeout / response limits
   |
   +--> Execute HTTP request
   |
   +--> Collect status, headers, body,
   |    response size and duration
   |
   +--> Store history
   |
   v
Frontend Response Viewer
```

---

## 9. Security Requirements

Because APIHub will eventually execute user-specified URLs from the backend, security is a major architectural concern.

Required protections include:

- URL validation
- SSRF protection
- Blocking or controlling private/internal network targets where appropriate
- Request timeouts
- Response-size limits
- Rate limiting
- Input validation
- Safe redirect handling
- Secret masking
- Secure cookie configuration
- Password hashing
- Authentication and authorization checks

These protections must be implemented before exposing arbitrary API execution in production.

---

## 10. Authentication Flow

```text
Register/Login
      |
      v
Validate request
      |
      v
Hash/verify password
      |
      v
Create session/JWT
      |
      v
HTTP-only cookie
      |
      v
Protected API routes
```

---

## 11. Planned API Endpoints

### Auth

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

### Projects

```text
GET    /api/projects
POST   /api/projects
GET    /api/projects/:id
PATCH  /api/projects/:id
DELETE /api/projects/:id
```

### Collections

```text
GET    /api/collections
POST   /api/collections
PATCH  /api/collections/:id
DELETE /api/collections/:id
```

### Requests

```text
GET    /api/requests
POST   /api/requests
PATCH  /api/requests/:id
DELETE /api/requests/:id
POST   /api/requests/:id/execute
```

### Environments

```text
GET    /api/environments
POST   /api/environments
PATCH  /api/environments/:id
DELETE /api/environments/:id
```

### History

```text
GET    /api/history
DELETE /api/history
```

---

## 12. Database Direction

Database design is intentionally deferred until the application workflow and requirements are stable.

Likely core entities:

```text
users
projects
collections
requests
environments
environment_variables
request_history
```

Relationships and detailed fields will be designed later.

---

## 13. Future Architecture

When testing and monitoring become computationally heavier:

```text
API Server
    |
    v
Redis Queue
    |
    v
BullMQ Workers
    |
    +--> Test execution
    +--> Monitoring checks
    +--> Scheduled jobs
```

WebSockets/Socket.IO may later be introduced for live execution status.

Docker and GitHub Actions can be added for deployment and CI/CD.

---

## 14. Architecture Principle

Start simple.

Do not introduce microservices, queues, Redis, or distributed infrastructure before the product actually needs them.

The initial goal is a maintainable modular monolith that can evolve without premature complexity.
