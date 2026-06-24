-- Subscriptions table for tracking user subscription status
create table if not exists subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_email text not null,
  stripe_customer_id text,
  stripe_subscription_id text,
  plan_id text not null default 'free',
  status text not null default 'active',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Unique index on email (one subscription per user)
create unique index if not exists subscriptions_user_email_idx on subscriptions (user_email);

-- Unique index on stripe_customer_id for webhook lookups
create unique index if not exists subscriptions_stripe_customer_id_idx on subscriptions (stripe_customer_id);

-- Unique index on stripe_subscription_id for webhook lookups
create unique index if not exists subscriptions_stripe_subscription_id_idx on subscriptions (stripe_subscription_id);

-- Survey responses linked to subscriptions
alter table subscriptions add column if not exists survey_response text;

-- Survey responses table for post-purchase feedback
create table if not exists survey_responses (
  id uuid default gen_random_uuid() primary key,
  session_id text not null,
  subscription_id text,
  stripe_subscription_id text,
  user_email text not null,
  answer text not null,
  created_at timestamp with time zone default now()
);

create unique index if not exists survey_responses_session_id_idx on survey_responses (session_id);
create unique index if not exists survey_responses_subscription_id_idx on survey_responses (stripe_subscription_id);
