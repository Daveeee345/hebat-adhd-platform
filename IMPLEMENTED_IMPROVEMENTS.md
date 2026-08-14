# Implemented HEBAT 2.0 Improvements

## Product flow
- Reorganised the product around Observe → Understand → Plan → Support → Track → Adjust / Refer.
- Added one shared Child Support Plan across roles.
- Replaced “ADHD score” style framing with support-priority domains.

## Student
- Simplified dashboard into Today, Focus, Routine, Rewards.
- Today shows only a few recommended missions.
- Existing curriculum remains available as the Activity Library.
- Added mastery tracks separate from Stars.
- Reworked Focus Timer into an adaptive short Focus Sprint.
- Reworked routine into a three-step visual flow.
- Removed punitive streak-loss framing from Rewards.

## Parent
- Rebuilt home screen around school summary + one home action.
- Added contextual Parent Coach instead of a module-heavy PMT landing experience.
- Added school-home messaging.
- Added non-diagnostic referral summary and consent-oriented professional review flow.

## Teacher
- Rebuilt Classroom around students needing attention, quick observation, and one current strategy.
- Added server-backed quick observations that recalculate the Support Plan.
- Separated daily observations from periodic screening.

## Professional
- Added referral workspace with rationale, attempted strategies, longitudinal metrics, and professional review notes.

## Full stack
- Added Express + Vite middleware server.
- Added persistent server-side demo database.
- Added explainable support engine.
- Added API endpoints for observations, focus sessions, routines, screening, mood, missions, rewards, messaging, and referrals.
- Added production-oriented PostgreSQL/Supabase schema reference.

## Visual design
- Preserved the uploaded design language: Nunito, orange primary, blue/green accents, pillowy bordered cards, rounded controls, and playful child-facing UI.
- Reduced information density and tiny text on primary workflows.
- Added focus-visible and reduced-motion accessibility support.

## Account Backend Upgrade (v2.1)

- Added visitor registration, login, logout, and persistent server-side sessions.
- Added salted scrypt password hashing and hashed session tokens.
- Added authenticated role identity instead of role-switching via sessionStorage.
- Added per-account linked child profiles and a multi-child selector.
- Added connection codes for linking parent/teacher accounts to an existing child profile.
- Added consent-aware professional access: professional child access disappears if referral consent is revoked.
- Added account-level event/audit history and shared child timeline.
- New accounts no longer inherit Leo demo data; they start from a clean baseline.
- Removed hard-coded classroom students from the active Teacher dashboard and use only linked profiles.
- Added Account & History UI while preserving the existing HEBAT visual style.
- Added production-oriented Supabase/PostgreSQL account + RLS migration schema.
