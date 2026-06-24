# Repo Inspection Report

**Date:** 2026-06-24  
**Repo:** goon-7c9c5a (Next.js 14 + Tailwind)  
**App Name:** "Goon" — Custom 3D Printing for Makers

---

## Summary

The repo contains a **substantial but inconsistent** Next.js app. Most of the infrastructure is in place (auth, Stripe, Supabase, dashboard), but the landing page content is mismatched and several pieces are placeholder-only. The app is **not production-ready** but has a solid skeleton.

---

## What's Already Built

### Core Stack
- **Next.js 14** with App Router + TypeScript + Tailwind CSS
- **NextAuth** credentials provider (demo users, no real DB auth)
- **Supabase** client/server wrappers + schema SQL
- **Stripe** server + client helpers, checkout, portal, webhook, subscription check

### Pages & Routes
| Route | Status |
|---|---|
| `/` (Landing) | Built, but content is for "Prismflow" (salon/spa), NOT Goon (3D printing) |
| `/login` | Working — NextAuth credentials flow |
| `/pricing` | Working — renders 3 pricing cards from `lib/plans.ts` |
| `/dashboard` | Working — sidebar layout, empty-state tour, mock data |
| `/dashboard/upload` | Exists |
| `/dashboard/jobs` | Exists |
| `/dashboard/projects` | Exists |
| `/dashboard/settings` | Exists |
| `/dashboard/subscription` | Exists |
| `/dashboard/orders` | Exists |
| `/dashboard/new-project` | Exists |
| `/dashboard/ai-studio` | Exists |
| `/dashboard/success` | Exists |
| `/upgrade` | Exists |
| `/survey` | Exists |
| `/cancel`, `/payment/cancel`, `/payment/success` | Exist |

### API Routes
| Route | Method | Purpose |
|---|---|---|
| `/api/stripe/checkout` | POST | Create Stripe checkout session |
| `/api/stripe/webhook` | POST | Handle Stripe webhooks (checkout, subscription CRUD) |
| `/api/stripe/check-subscription` | GET | Check user subscription status via Supabase |
| `/api/stripe/portal` | GET | Redirect to Stripe billing portal |
| `/api/auth/[...nextauth]` | * | NextAuth handler |
| `/api/waitlist` | POST | Waitlist form submission |
| `/api/survey` | POST | Post-purchase survey |
| `/api/create-checkout-session` | POST | Duplicate checkout route |
| `/api/create-portal-session` | POST | Duplicate portal route |
| `/api/checkout` | POST | Another duplicate checkout route |
| `/api/webhook` | POST | Another duplicate webhook route |
| `/api/webhooks/stripe` | POST | Another duplicate webhook route |
| `/api/payment/success` | POST | Payment success handler |
| `/api/test-payment` | POST | Test payment route |

### Components (20+)
Landing: Hero, Features, HowItWorks, Pricing, PricingCard, PricingCalculator, FAQ, CTA, Footer, WaitlistForm  
Auth: Compass (loading spinner), Navbar  
Dashboard: Sidebar, SubscriptionGuard, SubscriptionGate, UpgradeGate, PlanBadge, Paywall, SubscriptionContext

### Library Files
- `lib/stripe.ts` — Stripe server + client helpers
- `lib/auth.ts` — NextAuth config with demo users
- `lib/plans.ts` — 3 subscription plans (Single $29, Bundle $79, Bulk $119)
- `lib/supabase/server.ts`, `client.ts` — Supabase wrappers
- `lib/supabase/schema.sql` — subscriptions + survey_responses tables
- `lib/demo-data.ts` — mock print jobs, designs, stats

---

## What's Missing / Broken

### 1. Landing Page Content Mismatch
`app/page.tsx` renders "Prismflow" (a salon/spa for gay men) content, but the entire rest of the app is "Goon" (3D printing for makers). The landing page needs to be rewritten to match the app's actual purpose.

### 2. Duplicate API Routes
There are **multiple overlapping routes** for the same functionality:
- 3 checkout routes: `/api/stripe/checkout`, `/api/create-checkout-session`, `/api/checkout`
- 3 webhook routes: `/api/stripe/webhook`, `/api/webhook`, `/api/webhooks/stripe`
- 2 portal routes: `/api/stripe/portal`, `/api/create-portal-session`

Only the `/api/stripe/*` versions appear to be the "canonical" ones used by the frontend. The others are dead code.

### 3. No Real Auth Database
`lib/auth.ts` accepts any email/password combo (demo mode). No real user registration or database-backed auth.

### 4. All Data is Mock
Dashboard uses `lib/demo-data.ts` for all content. No real database queries for projects, orders, or print jobs.

### 5. `.env.local` Has Only Placeholders
All keys are placeholder strings, not real values. The app won't function with real Stripe/Supabase until real keys are configured.

### 6. No `.env.example` File
There is no `.env.example` — developers would need to read `.env.local` to know what env vars are needed.

### 7. No Tests
No test files found anywhere in the repo.

### 8. No Stripe Products/Prices Created
Plans reference env vars like `NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID` but no indication these have been created in a Stripe dashboard.

### 9. Middleware is Minimal
`middleware.ts` only re-exports NextAuth middleware for `/dashboard/*`. No other route protection.

### 10. Supabase Schema Missing Columns
The webhook handler references `survey_response` on the `subscriptions` table, which is added via ALTER TABLE in the schema. This works but is fragile — the column should be in the original CREATE TABLE.

---

## Build Health

```
Dependencies:  Next.js 14.2.29, React 18, Stripe 22, NextAuth 4, Supabase 2
Dev tooling:   TypeScript 5, Tailwind 3, PostCSS, Autoprefixer
```

The app should build and run with `npm run dev` given valid env vars, but the landing page content is wrong for the product.
