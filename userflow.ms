# APIHub — User Flow

This file uses Mermaid flowchart syntax and can be rendered by Mermaid-compatible tools.

## 1. Public Landing Page Flow

```mermaid
flowchart TD
    A[Open APIHub] --> B[Landing Page]
    B --> C{User Action}

    C -->|Get Started| D[Sign Up]
    C -->|Login| E[Login]
    C -->|Explore APIHub| F[View Product Information]
    C -->|Features| G[View Capabilities]
    C -->|How It Works| H[View API Lifecycle]
    C -->|Documentation| I[Documentation]
```

---

## 2. Authentication Flow

```mermaid
flowchart TD
    A[Landing Page] --> B[Sign Up]
    B --> C[Enter Account Details]
    C --> D{Valid?}

    D -->|No| C
    D -->|Yes| E[Create Account]
    E --> F[Create Session]
    F --> G[Authenticated Application]
```

Login:

```mermaid
flowchart TD
    A[Login] --> B[Enter Credentials]
    B --> C{Credentials Valid?}
    C -->|No| D[Show Error]
    D --> B
    C -->|Yes| E[Create Session]
    E --> F[Open Application]
```

---

## 3. First-Time User Flow

```mermaid
flowchart TD
    A[Authenticated User] --> B[Dashboard]
    B --> C{Has Project?}

    C -->|No| D[Create First Project]
    D --> E[Project Workspace]

    C -->|Yes| E[Project Workspace]

    E --> F[Create Request]
    F --> G[Configure Request]
    G --> H[Send Request]
    H --> I[View Response]
    I --> J[Save Request]
```

---

## 4. API Request Flow

```mermaid
flowchart TD
    A[Request Builder] --> B[Select HTTP Method]
    B --> C[Enter URL]
    C --> D[Configure Params]
    D --> E[Configure Headers]
    E --> F[Configure Body]
    F --> G[Configure Auth]
    G --> H[Select Environment]
    H --> I[Send Request]
    I --> J[Backend Validation]
    J --> K[HTTP Execution]
    K --> L[Receive Response]
    L --> M[Display Status]
    M --> N[Display Headers]
    N --> O[Display Body]
    O --> P[Save Execution History]
```

---

## 5. Collection Flow

```mermaid
flowchart TD
    A[Project] --> B[Collection]
    B --> C[Folder]
    C --> D[Request]

    D --> E{Request Action}

    E -->|Open| F[Request Builder]
    E -->|Rename| G[Rename Request]
    E -->|Duplicate| H[Duplicate Request]
    E -->|Move| I[Move Request]
    E -->|Delete| J[Delete Request]
```

---

## 6. Environment Flow

```mermaid
flowchart TD
    A[Environment Selector] --> B[Development]
    A --> C[Staging]
    A --> D[Production]

    B --> E[Resolve Variables]
    C --> E
    D --> E

    E --> F[Build Request]
    F --> G[Execute Request]
```

Example:

```text
Request URL:
{{BASE_URL}}/users

Development:
BASE_URL = http://localhost:4000

Staging:
BASE_URL = https://staging.example.com

Production:
BASE_URL = https://api.example.com
```

---

## 7. History Flow

```mermaid
flowchart TD
    A[Execute Request] --> B[Store History]
    B --> C[History]
    C --> D{User Action}

    D -->|Open| E[View Request]
    D -->|Re-run| F[Execute Again]
    D -->|Clear| G[Delete History]
```

---

## 8. Long-Term API Lifecycle

```mermaid
flowchart LR
    A[Build] --> B[Test]
    B --> C[Automate]
    C --> D[Mock]
    D --> E[Document]
    E --> F[Monitor]
```

---

## 9. Future Workflow Builder

```mermaid
flowchart LR
    A[Request A] -->|Extract value| B[Request B]
    B -->|Pass response data| C[Request C]
    C --> D[Workflow Result]
```

Example:

```text
POST /login
      |
      | extract token
      v
GET /profile
      |
      | extract userId
      v
GET /users/{{userId}}
```

This workflow capability is planned for a later product phase and is not part of the initial landing-page implementation.
