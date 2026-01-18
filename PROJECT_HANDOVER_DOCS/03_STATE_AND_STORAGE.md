# 💾 State and Storage - Gold Students Club

> **Purpose:** Complete guide to global state, localStorage usage, and mock backend simulation  
> **Last Updated:** 2026-01-19

---

## 🗄️ LocalStorage Architecture

### Storage Keys

#### **1. `gsc_user_data`**
Full user profile object. Created during onboarding.

#### **2. `gsc_auth_creds`**
Credentials (email/password) for login validation. 
⚠️ *Demo only: passwords stored in plain text.*

#### **3. `gsc_session`**
Current session state (role and email). Restored on page load. Redirection to `/login` happens if missing and trying to access protected pages.

---

## 🎭 Mock Backend Simulation

All data is statically served from `src/lib/mockData.ts`. 
- **Users:** 10 sample users.
- **Opportunities:** 15 scholarships and programs.
- **Algorithms:** `lib/logic.ts` simulates backend processing (matching, rankings).
