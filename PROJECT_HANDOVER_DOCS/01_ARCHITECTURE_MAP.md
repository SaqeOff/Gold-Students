# 🏗️ Architecture Map - Gold Students Club

> **Purpose:** Comprehensive overview of project structure, data flows, and technology stack
> 
> **Last Updated:** 2026-01-19  
> **For:** New developers joining the project

---

## 📁 Project Tree Structure

```
gold-students-club/
├── 📂 src/
│   ├── 📂 app/                    # Next.js App Router pages
│   │   ├── page.tsx               # Dashboard (Homepage)
│   │   ├── layout.tsx             # Root layout with AuthProvider & UserProvider
│   │   ├── globals.css            # Global styles & Tailwind directives
│   │   ├── 📂 login/
│   │   │   └── page.tsx           # Login page with shake animation
│   │   ├── 📂 onboarding/
│   │   │   └── page.tsx           # 4-step registration flow
│   │   ├── 📂 profile/
│   │   │   └── page.tsx           # User profile (Student or Admin view)
│   │   ├── 📂 admin/
│   │   │   └── page.tsx           # Admin control panel
│   │   ├── 📂 opportunities/
│   │   │   ├── page.tsx           # Opportunities list with filters
│   │   │   └── 📂 [id]/
│   │   │       └── page.tsx       # Dynamic opportunity details
│   │   └── 📂 community/
│   │       └── page.tsx           # Community groups & peers
│   │
│   ├── 📂 components/             # Reusable React components
│   │   ├── Sidebar.tsx            # Navigation sidebar (collapsible)
│   │   ├── Header.tsx             # Top header with user info
│   │   ├── UserContext.tsx        # User data context provider
│   │   ├── SidebarContext.tsx     # Sidebar state management
│   │   ├── 📂 admin/
│   │   │   ├── AccessControl.tsx  # Admin role protection
│   │   │   ├── StatsOverview.tsx  # Admin dashboard stats
│   │   │   └── VerificationTable.tsx  # Pending user verifications
│   │   ├── 📂 dashboard/
│   │   │   └── AiReportModal.tsx  # AI analysis modal (unused - inlined in page.tsx)
│   │   ├── 📂 opportunities/
│   │   │   ├── OpportunityCard.tsx     # Individual opportunity display
│   │   │   ├── FilterSidebar.tsx       # Filter controls
│   │   │   ├── GapAnalysisCard.tsx     # Skill gap visualization
│   │   │   └── TrustGraph.tsx          # Trust level graph
│   │   ├── 📂 community/
│   │   │   ├── GroupCard.tsx      # Community group display
│   │   │   └── PeerCard.tsx       # Peer user card
│   │   └── 📂 ui/
│   │       └── CircularProgress.tsx  # Circular progress indicator
│   │
│   ├── 📂 context/                # Global state management
│   │   └── AuthContext.tsx        # Authentication & session management
│   │
│   ├── 📂 lib/                    # Business logic & utilities
│   │   ├── mockData.ts            # Mock backend data (users, opportunities)
│   │   ├── logic.ts               # Core calculations (ORI, trust scores)
│   │   ├── aiLogic.ts             # AI verdict generation logic
│   │   └── utils.ts               # Helper functions (formatting, styling)
│   │
│   └── 📂 types/
│       └── index.ts               # TypeScript type definitions
│
├── 📂 public/                     # Static assets
│   ├── favicon.ico
│   └── fonts/
│
├── package.json                   # Dependencies & scripts
├── tsconfig.json                  # TypeScript configuration
├── tailwind.config.ts             # Tailwind CSS settings
├── next.config.ts                 # Next.js configuration
└── README.md                      # Project documentation

```

---

## 🔄 Key Data Flows

### 1. **Authentication Flow**
```mermaid
graph LR
    A[User visits /login] --> B{Credentials valid?}
    B -->|Admin| C[AuthContext.login] --> D[Set user: admin]
    B -->|Student| E[Check localStorage] --> F[Load user from gsc_user_data]
    D --> G[Redirect to /admin]
    F --> H[Redirect to /]
    I[New User] --> J[/onboarding] --> K[AuthContext.register]
    K --> L[Save to localStorage] --> H
```

**Key Components:**
- **`AuthContext`** (`src/context/AuthContext.tsx`): Master authentication controller
  - `register()`: Creates new user account
  - `login()`: Validates credentials against localStorage
  - `logout()`: Clears session
- **LocalStorage Keys:**
  - `gsc_user_data`: Full user profile object
  - `gsc_auth_creds`: Email & password for login validation
  - `gsc_session`: Current session metadata (role, email)

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | `16.1.3` | React framework with App Router |
| **React** | `19.2.3` | UI library |
| **TypeScript** | `^5` | Type safety |
| **Tailwind CSS** | `^4` | Utility-first styling |
| **Lucide React** | `^0.562.0` | Icon library |

---

## 🔐 Authentication System

### How It Works
1. **Registration** (`/onboarding`)
   - Collects: name, email, password, university, country, skills, goals
   - Stores credentials in `localStorage` (client-side only)
   - Auto-logs in after completion

2. **Login** (`/login`)
   - Admin: `admin` / `13389392` (hardcoded)
   - Students: Email + password from registration

---

## 🚀 Key Features

### ✅ Implemented
- [x] User registration (4-step onboarding)
- [x] Login with password validation
- [x] Admin vs. Student role separation
- [x] Dashboard with AI analysis modal
- [x] Opportunities browser with filters
- [x] Profile view (dynamic: Student or Admin)
- [x] Responsive sidebar navigation
