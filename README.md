# HEBAT 2.0 — Account-Based Full-Stack Support Platform

This build continues the existing HEBAT visual style while adding a real server-side account layer so each visitor can sign in and receive history/data that follows the authenticated account and linked child profile.

## What is new in this build

- Email/password account registration and sign-in.
- Passwords are stored server-side as salted `scrypt` hashes, not plaintext.
- Opaque session tokens are stored as SHA-256 hashes and delivered through `HttpOnly`, `SameSite=Lax` cookies.
- Four account roles: Student, Parent, Teacher, Professional.
- Each account can have one or more linked child profiles.
- Each child has a connection code that can be shared with an approved parent/teacher. Professional access is restricted to profiles that already have a consented referral in the demo backend.
- Student progress, focus sessions, routines, mood, rewards, missions, observations, messages, screenings, and referrals are stored server-side per child.
- Account actions are stored separately in `events`/`auditLogs`, so the account-history page changes depending on who is signed in.
- Teacher observations and parent/student activity affect the same child history when accounts are linked to the same child.
- Multi-child account selector for parent/teacher accounts.
- New **Account & History** screen showing child timeline, account-specific activity, and the child connection code.
- New accounts begin with a baseline state instead of inheriting Leo's demo history.
- Existing HEBAT orange/blue/green, Nunito, pillowy cards, button language, and overall visual identity are preserved.

## Architecture

```text
Browser / React
      |
      | HttpOnly session cookie
      v
Express Account API
      |
      +-- Authentication + session middleware
      +-- Role / child relationship authorization
      +-- Support Engine
      +-- Reward / activity history
      +-- Audit + event history
      |
      v
server/data/hebat-db.json
```

The JSON database is intentional for the runnable competition/demo package: there is no external account or cloud credential required. A production-oriented Supabase/PostgreSQL migration reference is included in `supabase/schema.sql`.

## Demo accounts

All demo accounts use password:

`Demo123!`

| Role | Email |
|---|---|
| Student | `student@hebat.demo` |
| Parent | `parent@hebat.demo` |
| Teacher | `teacher@hebat.demo` |
| Professional | `professional@hebat.demo` |

These four accounts are linked to the same demo child (Leo), so the shared home-school-professional history can be demonstrated across multiple logins.

Demo child connection code: `LEO2026A`

## Run locally

Requirements: Node.js 20+ recommended.

```bash
npm install
npm run dev
```

Open:

`http://localhost:3000`

The command starts both the Express backend and Vite frontend through one server.

## Build / production mode

```bash
npm run build
npm run start
```

For deployment with actual users and sensitive child information, do not use the local JSON database as the final production persistence layer. Migrate to a reviewed PostgreSQL/Supabase setup, implement final RLS/write policies, HTTPS, secure secrets, backups, monitoring, consent governance, and applicable legal/privacy controls.

## Account data behavior

### New Student
A Student registration automatically creates that student's own child profile. It begins with empty personal history, 100 welcome Stars, Stage 1 mastery tracks, and a baseline support plan.

### New Parent / Teacher
The account may create its first child/student during registration, create one later, or link an existing child using a child connection code.

### Professional
Professional accounts should connect only to referral cases with recorded consent. The seeded Professional demo account already has access to Leo's consented referral case.

## Key API routes

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me

POST /api/account/children
POST /api/account/link-child
GET  /api/account/history

GET  /api/bootstrap?childId=...
POST /api/observations
POST /api/focus-sessions
POST /api/routine-sessions
POST /api/mood
POST /api/screenings
POST /api/messages
POST /api/referrals
PATCH /api/referrals/:referralId
POST /api/missions/:missionId/complete
POST /api/rewards/redeem
```

Every child-data endpoint requires authentication. The backend resolves the authenticated account and verifies that the selected child is linked to that user before data is returned or changed.

## Important boundary

HEBAT is designed as a non-diagnostic support and coordination platform. The Support Profile is used to prioritise educational/behavioral support, not to produce an ADHD diagnosis or probability.
