-- HEBAT 2.0 / Account Backend — production migration reference
-- Runnable local demo uses the Express + server/data/hebat-db.json backend.
-- For deployment with real users, migrate persistence/auth to Supabase Auth + PostgreSQL and review every policy.

create extension if not exists pgcrypto;

-- One row per Supabase Auth account.
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('child','parent','teacher','professional','school_admin','system_admin')),
  full_name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists schools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists children (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  birth_date date,
  age integer,
  grade text,
  school_id uuid references schools(id),
  school_name text,
  invite_code text unique default upper(substr(encode(gen_random_bytes(8),'hex'),1,8)),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- General relationship table used for permission checks and multi-child accounts.
create table if not exists user_child_links (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  child_id uuid not null references children(id) on delete cascade,
  relationship text not null check (relationship in ('self','parent','guardian','teacher','professional','school_admin')),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  unique(user_id, child_id, relationship)
);
create index if not exists user_child_links_user_idx on user_child_links(user_id) where active=true;
create index if not exists user_child_links_child_idx on user_child_links(child_id) where active=true;

create table if not exists consents (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references children(id) on delete cascade,
  guardian_id uuid not null references profiles(id),
  consent_type text not null check (consent_type in ('school_observation','parent_teacher_data_sharing','professional_referral','analytics_use','research_use')),
  status text not null check (status in ('granted','revoked','expired')),
  granted_at timestamptz,
  revoked_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists consents_child_type_idx on consents(child_id, consent_type, status);

create table if not exists observations (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references children(id) on delete cascade,
  observer_id uuid not null references profiles(id),
  observer_role text not null,
  context text not null default 'classroom',
  attention text,
  task_completion text,
  prompt_level text,
  transition text,
  note text,
  observed_at timestamptz not null default now()
);
create index if not exists observations_child_time_idx on observations(child_id, observed_at desc);

create table if not exists screenings (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references children(id) on delete cascade,
  respondent_id uuid not null references profiles(id),
  respondent_role text not null,
  instrument text not null,
  instrument_version text,
  total_score numeric,
  result_category text,
  non_diagnostic boolean not null default true,
  submitted_at timestamptz not null default now()
);

create table if not exists screening_answers (
  id uuid primary key default gen_random_uuid(),
  screening_id uuid not null references screenings(id) on delete cascade,
  item_key text not null,
  response_value numeric,
  unique(screening_id, item_key)
);

create table if not exists mood_checkins (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references children(id) on delete cascade,
  actor_id uuid not null references profiles(id),
  mood text not null,
  created_at timestamptz not null default now()
);

create table if not exists focus_sessions (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references children(id) on delete cascade,
  actor_id uuid not null references profiles(id),
  assigned_minutes integer not null check (assigned_minutes between 1 and 60),
  completed_minutes integer not null check (completed_minutes between 0 and 60),
  completed boolean not null,
  created_at timestamptz not null default now()
);
create index if not exists focus_sessions_child_time_idx on focus_sessions(child_id, created_at desc);

create table if not exists routine_sessions (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references children(id) on delete cascade,
  actor_id uuid not null references profiles(id),
  routine_key text not null,
  completed_steps integer not null,
  total_steps integer not null check (total_steps > 0),
  created_at timestamptz not null default now()
);

create table if not exists mastery_tracks (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references children(id) on delete cascade,
  track_key text not null,
  label text not null,
  stage integer not null default 1,
  max_stage integer not null default 5,
  progress numeric not null default 0,
  updated_at timestamptz not null default now(),
  unique(child_id, track_key)
);

create table if not exists mission_completions (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references children(id) on delete cascade,
  actor_id uuid not null references profiles(id),
  mission_key text not null,
  completed_at timestamptz not null default now(),
  unique(child_id, mission_key)
);

create table if not exists support_profiles (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references children(id) on delete cascade,
  period_start date,
  period_end date,
  priority_domain text,
  data_status text,
  profile_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists support_plans (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references children(id) on delete cascade,
  version text not null,
  status text not null,
  priority_domain text,
  start_date date,
  review_date date,
  rationale jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists support_plan_items (
  id uuid primary key default gen_random_uuid(),
  support_plan_id uuid not null references support_plans(id) on delete cascade,
  actor text not null check (actor in ('child','parent','teacher','professional')),
  target_domain text not null,
  intervention_key text not null,
  instruction text not null,
  active boolean not null default true
);

create table if not exists interventions (
  id uuid primary key default gen_random_uuid(),
  intervention_key text unique not null,
  domain text not null,
  actor text not null,
  name text not null,
  description text not null,
  evidence_reference text,
  expert_reviewed boolean not null default false,
  reviewed_by text,
  version text not null default '1.0'
);

create table if not exists reward_transactions (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references children(id) on delete cascade,
  actor_id uuid references profiles(id),
  amount integer not null,
  reason text not null,
  created_at timestamptz not null default now()
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references children(id) on delete cascade,
  sender_id uuid not null references profiles(id),
  recipient_role text,
  body text not null check (char_length(body) <= 2000),
  created_at timestamptz not null default now()
);

create table if not exists referrals (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references children(id) on delete cascade,
  requested_by uuid not null references profiles(id),
  professional_id uuid references profiles(id),
  status text not null,
  reason text not null,
  consent_id uuid references consents(id),
  professional_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  child_id uuid references children(id) on delete cascade,
  actor_id uuid not null references profiles(id) on delete cascade,
  event_type text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists events_actor_time_idx on events(actor_id, created_at desc);
create index if not exists events_child_time_idx on events(child_id, created_at desc);

create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references profiles(id),
  child_id uuid references children(id),
  action text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- Helper: authenticated account is actively linked to the child.
create or replace function public.can_access_child(target_child uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from user_child_links
    where user_id = auth.uid()
      and child_id = target_child
      and active = true
  );
$$;

-- Enable RLS on user/child-related tables.
alter table profiles enable row level security;
alter table children enable row level security;
alter table user_child_links enable row level security;
alter table consents enable row level security;
alter table observations enable row level security;
alter table screenings enable row level security;
alter table screening_answers enable row level security;
alter table mood_checkins enable row level security;
alter table focus_sessions enable row level security;
alter table routine_sessions enable row level security;
alter table mastery_tracks enable row level security;
alter table mission_completions enable row level security;
alter table support_profiles enable row level security;
alter table support_plans enable row level security;
alter table support_plan_items enable row level security;
alter table reward_transactions enable row level security;
alter table messages enable row level security;
alter table referrals enable row level security;
alter table events enable row level security;
alter table audit_logs enable row level security;

-- Baseline policies. These are intentionally conservative examples and must be reviewed before real deployment.
create policy if not exists "profiles_read_self" on profiles for select using (id = auth.uid());
create policy if not exists "profiles_update_self" on profiles for update using (id = auth.uid()) with check (id = auth.uid());

create policy if not exists "children_read_linked" on children for select using (public.can_access_child(id));
create policy if not exists "links_read_self" on user_child_links for select using (user_id = auth.uid());

create policy if not exists "observations_read_linked" on observations for select using (public.can_access_child(child_id));
create policy if not exists "focus_read_linked" on focus_sessions for select using (public.can_access_child(child_id));
create policy if not exists "routine_read_linked" on routine_sessions for select using (public.can_access_child(child_id));
create policy if not exists "support_profile_read_linked" on support_profiles for select using (public.can_access_child(child_id));
create policy if not exists "support_plan_read_linked" on support_plans for select using (public.can_access_child(child_id));
create policy if not exists "rewards_read_linked" on reward_transactions for select using (public.can_access_child(child_id));
create policy if not exists "messages_read_linked" on messages for select using (public.can_access_child(child_id));
create policy if not exists "events_read_own" on events for select using (actor_id = auth.uid());

-- IMPORTANT:
-- Write policies should additionally check profile.role, guardian consent, school/class assignment,
-- and professional referral consent. Do not deploy real child support/health-related data using only
-- the example read policies above. Perform privacy, security, legal, and clinical governance review first.
