# 🐛 TODO and Bugs - Gold Students Club

> **Purpose:** Known issues, incomplete features, and development priorities  
> **Last Updated:** 2026-01-19

---

## 🐛 Known Bugs & Issues

### 🔴 CRITICAL
- **Infinite Loading (FIXED):** Was happening in onboarding. Fixed with `useRef` failsafe.
- **Security:** Plain text passwords in localStorage. Needs migration to real backend.

---

## ⏳ Incomplete Features
1. **Profile Editing:** Users cannot currently edit their details.
2. **Opportunity Application:** "Apply" buttons are just links; needs internal tracking.
3. **Real Auth:** Replace mock localStorage auth with JWT/Backend.

---

## 🎯 Architect's Advice: Where to Start
1. **Understand Logic:** Review `lib/logic.ts` first.
2. **Cleanup Cache:** Use `localStorage.clear()` frequently during testing.
3. **Next Big Feature:** Implement the "Edit Profile" modal.
