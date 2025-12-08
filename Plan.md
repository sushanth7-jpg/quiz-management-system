# PLAN.md — Quiz Management System

## 1. Assumptions

- Only **admin** can create quizzes. Users can only view and take quizzes.
- Admin authentication is simple (password → JWT). No full user management.
- Three question types:  
  - MCQ  
  - True/False  
  - Text-based short answer  
- Each quiz belongs to the global collection (no multi-tenant logic).
- The system does not require quiz editing or deleting initially.
- The UI is intentionally simple but functional.

---

## 2. Scope

### In Scope
- Admin login (JWT-based)
- Create quiz with unlimited questions
- MCQ, True/False, and Text question support
- Public quiz listing
- Public quiz taking + scoring
- Basic admin dashboard
- Client built using React + fetch API
- Server built using Node.js, Express, MongoDB (Mongoose)

### Out of Scope (Future)
- Admin quiz editing
- Admin quiz deletion
- Users with accounts
- Timed quizzes
- Analytics dashboard

---

## 3. Architecture Overview

### Backend (Node.js + Express)
