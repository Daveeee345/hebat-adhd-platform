# HEBAT Development Instructions

## Product

HEBAT is a closed-loop ADHD learning and support platform for school-age children.

Core loop:

Observe → Understand → Plan → Support → Track → Adjust / Refer

HEBAT is not an ADHD diagnostic tool.

## Roles

The main roles are:

- Student
- Parent
- Teacher
- Mental Health Professional
- School Administrator

Student, Parent, and Teacher accounts linked to the same child must share the appropriate child history while preserving role-based access.

## Core Domain

The central domain object is the Child Support Plan.

All relevant child data should be linked consistently using child_id.

## Existing Visual Design

DO NOT redesign the existing HEBAT visual identity.

Preserve:

- current HEBAT colors
- existing typography
- current rounded component style
- current illustrations
- existing visual character
- existing student-friendly design

You may improve:

- spacing
- responsiveness
- information hierarchy
- accessibility
- consistency

Do NOT introduce:

- generic AI dashboard styling
- excessive gradients
- glassmorphism
- neon/glowing effects
- unnecessary decorative animations
- excessive cards
- tiny text
- dense layouts

## ADHD-Friendly UX

Student interfaces must:

- minimize cognitive load
- show a clear next action
- avoid too many visible choices
- use readable text
- break larger activities into smaller steps
- use progressive disclosure
- provide immediate but calm feedback

Preserve the Duolingo-inspired progression concept, but mastery levels must represent skill progression rather than XP.

Stars/XP are reinforcement and must remain separate from mastery.

## Student Navigation

Primary Student experience:

- Today
- Focus
- Routine
- Rewards

Today's Plan should normally show only a small number of relevant activities.

## Parent Experience

Parent experience should prioritize:

- what happened today
- current support needs
- what the parent should do next
- progress
- teacher communication
- support plan
- referral when required

## Teacher Experience

Teacher experience should prioritize:

- students needing attention
- quick observation
- support plans
- progress
- parent communication
- periodic screening

Daily observation and ACTRS screening are separate workflows.

## Professional Experience

Professional access must be consent-gated.

Professional views may include:

- referral summary
- observations
- support strategies attempted
- longitudinal progress
- professional recommendations

Clinical diagnosis remains outside automated HEBAT decision-making.

## Clinical Safety

Never generate:

- ADHD diagnosis
- ADHD probability score
- automated clinical treatment decisions

Use terminology such as:

- Support Profile
- Needs Support
- Further Review Recommended
- Non-diagnostic screening

## Architecture

Prefer a modular monolith.

Current/target stack:

- React
- TypeScript
- Vite
- React Router
- TanStack Query
- Zod
- PostgreSQL / Supabase
- Supabase Auth
- Row Level Security
- Supabase Realtime
- server-side Edge Functions when appropriate

Do not use localStorage as the primary application database.

## Authentication and History

Users must have real persistent accounts.

History must be account-aware and child-aware.

Requirements:

- unrelated users cannot access each other's data
- parents only access linked children
- teachers only access assigned children/classes
- professionals only access consented referrals
- history persists across sessions
- linked Parent/Teacher/Student roles see the appropriate shared child history

## AI

Gemini or other LLM features must not diagnose ADHD.

AI may assist with:

- observation summaries
- plain-language explanations
- referral summaries
- explanations of expert-approved support strategies

Secrets must never be exposed in frontend code.

## Engineering Rules

Before modifying code:

1. Inspect the existing repository.
2. Understand the existing implementation.
3. Reuse existing components when possible.
4. Preserve working features.
5. Do not rewrite unrelated files.
6. Do not change the existing design unless explicitly requested.

After modifying code:

1. Run TypeScript checks.
2. Run relevant tests.
3. Run the production build.
4. Fix errors before completing the task.
5. Report what changed and which checks passed.
