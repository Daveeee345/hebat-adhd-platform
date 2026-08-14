# HEBAT 2.0 Account Architecture

## Request lifecycle

```text
Visitor
  ↓
Register / Login
  ↓
Password verification (scrypt)
  ↓
Opaque session token
  ↓
HttpOnly cookie
  ↓
Authentication middleware
  ↓
User → Child relationship check
  ↓
Account-scoped API response
  ↓
React HebatDataContext
  ↓
Student / Parent / Teacher / Professional UI
```

## Data ownership

HEBAT separates **account identity** from **child support history**.

- `users`: login identity and role.
- `userChildLinks`: determines which child profiles an account may access.
- `children`: child profile identity.
- Observations, focus sessions, routines, mood, screening, rewards, messages, referrals and mission completion records all contain `childId`.
- Action records contain `actorUserId`, allowing an account-specific activity history without splitting the shared child timeline.

This means a Parent and Teacher linked to Leo see the same child history, but the Account History page can still show which actions were performed by the currently signed-in account.

## Authentication model used by runnable demo

Passwords:

`password → random salt → scrypt → stored hash`

Sessions:

`random 256-bit token → SHA-256 hash stored server-side → raw token in HttpOnly cookie`

The server never returns password hashes or raw persisted session hashes to the browser.

## Production path

The local JSON repository is replaceable by the schema in `supabase/schema.sql`:

```text
React
  ↓
Supabase Auth
  ↓
JWT
  ↓
PostgreSQL + RLS
  ↓
Support / Recommendation Edge Functions
```

The frontend domain objects can remain largely unchanged because account/child identity is already explicit in the current API model.
