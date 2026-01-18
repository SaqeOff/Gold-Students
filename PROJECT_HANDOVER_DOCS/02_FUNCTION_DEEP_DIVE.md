# 🔍 Function Deep Dive - Gold Students Club

> **Purpose:** Detailed function-level documentation for every file in the codebase  
> **Last Updated:** 2026-01-19

---

## 🌐 1. Context & State Management

### `src/context/AuthContext.tsx`
**Purpose:** Master authentication controller with register/login/logout and localStorage persistence

| Function | Parameters | Logic |
|----------|------------|-------|
| `register()` | `RegistrationData` | Creates new user account, saves to `gsc_user_data` + `gsc_auth_creds`, auto-logs in, redirects to `/` |
| `login()` | `email, password` | Validates credentials against localStorage |
| `logout()` | none | Clears `gsc_session` from localStorage, resets state |

---

## 🧠 2. Core Business Logic

### `src/lib/logic.ts`
**Purpose:** Opportunity matching, readiness index, and ranking algorithms

| Function | Parameters | Logic |
|----------|------------|-------|
| `calculateMatchScore()` | `User, Opportunity` | Scores 0-100 based on skills, goals, and context |
| `calculateReadinessIndex()` | `User` | Composite score for Dashboard ORI display |

---

## 📄 3. Pages (App Router)

### `src/app/onboarding/page.tsx`
**Purpose:** 4-step registration wizard with unstoppable redirect failsafe

**CRITICAL logic:**
- Uses `useRef` to survive re-renders. 
- `failsafeTimerRef` ensures the redirect to `/` happens after 4.5s regardless of any issues.
- `redirectInitiatedRef` prevents multiple registration attempts.

### `src/app/login/page.tsx`
- Centered layout with shake animation on error.
- Validates against `AuthContext`.
