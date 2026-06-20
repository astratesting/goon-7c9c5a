# Goon — Full Product Build Plan

## 1. PRODUCT

Goon is a custom 3D printing service for hobbyist makers — tabletop gamers, cosplayers, prop builders, and DIY creators who need small-batch, high-detail prints without owning a printer. The landing page already sells the brand; this build extends it into a working product where a maker can sign up, describe a print job, get an instant material-and-size-based price estimate, upload a model file, and track the job from "submitted" to "shipped." The core value is collapsing the friction between "I have an STL file" and "I have a finished part in my hand" — no email back-and-forth, no quote delays, no minimum order games. The primary user is a hobbyist who already knows what they want printed and just needs a fast, trustworthy way to get it made. The pain it solves: existing 3D printing services (Shapeways, Treatstock, local print shops) bury pricing behind quote forms, take days to respond, and treat hobbyists like enterprise buyers.

## 2. WHO IT'S FOR

The ICP is a hobbyist maker aged 18-45, technically comfortable (they have an STL or 3MF file on their machine), budget-conscious ($20-200 per typical order), and time-sensitive (they need the part for a game night, a con, a commission deadline). They are NOT enterprise procurement. They are NOT first-time 3D printer users. They are people who already know the vocabulary — "PLA," "resin," "layer height," "infill." This shapes the product:

- **Tone**: peer-to-peer, maker-to-maker. Not corporate. Not "solutions." Not "partners."
- **Density**: technical terms are fine (resin, SLA, FDM, infill) — don't dumb them down.
- **Speed**: every flow optimized for "I already know what I want, get me to the price."
- **No enterprise scaffolding**: no "request a demo," no "contact sales," no tiered pricing cards with "Contact us" buttons.
- **Honest copy**: no fake testimonials, no invented customer counts, no "trusted by 10,000 makers." The product is new; the copy admits it.

## 3. LOOK & FEEL

### Visual System

**Vibe**: dark analytical interface — like a CAD tool or a maker's workbench monitor. High contrast, monospace accents for numbers and specs, generous whitespace, no decorative gradients. The aesthetic says "we measure things precisely" not "we're a fun brand."

**Color palette** (locked from existing globals.css):
- Background: `#0A0A0F` (ink black) — primary canvas
- Surface: `#12121A` — cards, panels
- Surface elevated: `#1A1A24` — hover, active states
- Border: `#2A2A38` — subtle dividers
- Text primary: `#F5F5FA`
- Text secondary: `#9CA3AF`
- Text muted: `#6B7280`
- Accent indigo: `#6366F1` — primary CTAs, active nav
- Accent cyan: `#00E5FF` — data viz, price numbers, highlights
- Accent purple: `#A855F7` — secondary accent, badges
- Success: `#10B981`
- Warning: `#F59E0B`
- Error: `#EF4444`

**Typography**:
- Headings: Space Grotesk, 600 weight, tight tracking
- Body: Space Grotesk, 400 weight
- Numbers, specs, prices, file sizes: JetBrains Mono — every price, dimension, and material property is monospace
- Scale: 12 / 14 / 16 / 18 / 24 / 32 / 48 / 64

**Spacing**: 4px base unit. Cards use 24px internal padding. Sections use 64-96px vertical rhythm. Dashboard uses denser 16px padding for data-dense screens.

**Key components**:
- `Card` — `#12121A` background, 1px `#2A2A38` border, 12px radius, 24px padding
- `Button` — primary (indigo fill, white text), secondary (transparent, border), ghost (no border)
- `Input` — `#12121A` bg, `#2A2A38` border, focus ring `#6366F1`, 40px height
- `Badge` — small pill, used for status (Submitted, In Print, Shipped)
- `Stat` — large monospace number + small label, used in dashboard tiles
- `Sidebar` — fixed left, 240px wide, dark surface, active item has indigo left border

**Iconography**: Lucide React icons throughout. No emoji. No custom SVGs except the existing logo.

**Imagery**: no stock photos of "happy makers." Use abstract technical imagery — grid patterns, wireframe shapes, material swatches as solid color blocks. The landing page's existing hero treatment carries over.

**Interaction/motion**: minimal. 150ms ease-out on hover. No scroll animations. No parallax. The product feels like a tool, not a marketing site.

### Screen-by-Screen Layout

**Landing page (`/`)** — UNCHANGED. Existing Hero, Features, FAQ, Pricing, CTA, Footer, Navbar remain. Only the Navbar's auth buttons and the CTA buttons get updated to link to `/login` and `/signup`.

**Signup (`/signup`)** — centered card on full-bleed dark background. Card is 400px wide, contains: Goon wordmark at top, "Create your account" heading, three fields (Name, Email, Password), primary "Create account" button, divider with "or", link to `/login`. Below the card: small text "By signing up you agree to our terms" (no fake legal links — just text).

**Login (`/login`)** — same centered card layout. Fields: Email, Password. "Log in" button. Link to `/signup` below. "Forgot password?" link (renders a simple "Check your email" message — no real reset flow in v1, honest about it).

**Dashboard home (`/dashboard`)** — sidebar + main area. Main area shows: greeting "Welcome back, {name}" with current date in mono, a 3-tile stat row (Active orders, Completed prints, Total spent — all show 0 or real data), a "Recent activity" list (empty state: "No orders yet. Submit your first print."), and a primary CTA "Start a new print" linking to `/dashboard/new-project`.

**My Projects (`/dashboard/projects`)** — sidebar + main. Main area: page title "My Projects", filter tabs (All / Active / Completed), table or card grid of projects. Each row: project name, material, status badge, submitted date, estimated price. Empty state: illustration placeholder + "You haven't submitted any prints yet" + CTA.

**New Project (`/dashboard/new-project`)** — sidebar + main. Two-column layout on desktop, stacked on mobile. Left column: file upload dropzone (accepts .stl, .3mf, .obj, max 50MB), project name input, description textarea. Right column: MaterialSelector, size inputs (X/Y/Z in mm), QuoteCalculator showing live estimate. Bottom: "Submit print request" button.

**Settings (`/dashboard/settings`)** — sidebar + main. Sections: Profile (name, email — read-only), Password change, Danger zone (delete account — disabled with "Contact support" text). Honest, minimal.

## 4. USER FLOWS

### Flow 1: Sign up → first print request

1. User lands on `/`, clicks "Sign Up" in navbar.
2. `/signup` — fills name, email, password. Submits.
3. Supabase creates account, sends confirmation email (if enabled) or auto-confirms.
4. Redirect to `/dashboard`. Empty state shown.
5. User clicks "Start a new print" → `/dashboard/new-project`.
6. Drops STL file, enters name "Goblin King bust", selects "Resin", enters 80×80×120mm.
7. QuoteCalculator updates live: shows "$24.50" in mono cyan.
8. Clicks "Submit print request" → row inserted in `projects` table, status "submitted".
9. Redirect to `/dashboard/projects` showing the new row with "Submitted" badge.

**States**:
- Signup error (email taken, weak password) → inline red text under field
- File too large → dropzone shows red border + "Max 50MB"
- File wrong type → dropzone shows "STL, 3MF, or OBJ only"
- Submit success → toast "Print request submitted"
- Submit error → toast "Something went wrong. Try again."

### Flow 2: Login → view existing projects

1. User on `/login`, enters credentials.
2. Supabase authenticates, sets session cookie.
3. Redirect to `/dashboard`.
4. If they have projects, dashboard shows recent activity populated.
5. Click "My Projects" in sidebar → `/dashboard/projects` shows full list.

**States**:
- Wrong password → "Invalid email or password" (no enumeration)
- Unconfirmed email → "Check your email to confirm your account"
- Session expired → middleware redirects to `/login?redirect=/dashboard`

### Flow 3: Quote calculation

1. User on `/dashboard/new-project` selects material from MaterialSelector.
2. Enters dimensions in mm.
3. QuoteCalculator computes: `volume_cm3 = (x * y * z) / 1000`, `base_price = volume * material_rate`, `min_price = $15`, returns `max(base_price, min_price)`.
4. Material rates (hardcoded constants, honest placeholders):
   - PLA: $0.08/cm³
   - PETG: $0.10/cm³
   - Resin: $0.15/cm³
   - ABS: $0.09/cm³
5. Display updates on every change, debounced 100ms.

## 5. PAGES/ROUTES

| Route | Purpose | Auth |
|---|---|---|
| `/` | Landing page (existing, unchanged) | Public |
| `/signup` | Create account | Public |
| `/login` | Log in | Public |
| `/auth/callback` | Supabase email confirmation callback | Public |
| `/dashboard` | Dashboard home | Protected |
| `/dashboard/projects` | List of user's print projects | Protected |
| `/dashboard/new-project` | Submit new print request | Protected |
| `/dashboard/settings` | Account settings | Protected |

## 6. CORE FEATURES

### Authentication (Supabase Auth)
- Email + password signup with name field stored in `user_metadata`
- Email + password login
- Session managed via `@supabase/ssr` cookies
- Middleware checks session on every `/dashboard/*` request
- Logout from user menu in dashboard header
- No OAuth buttons (no dead social login)

### Dashboard
- Welcome header with user's first name and current date
- 3 stat tiles: Active orders (count where status in [submitted, printing]), Completed (count where status = shipped), Total spent (sum of estimated_price where status = shipped)
- Recent activity list: last 5 projects, sorted by created_at desc
- Quick action: "Start a new print" button

### Projects list
- Table view: Name, Material, Status badge, Submitted date, Estimated price
- Filter tabs: All / Active / Completed
- Empty state with CTA
- Click row → detail view (read-only summary, no edit in v1)

### New project form
- File upload: drag-and-drop or click, accepts .stl/.3mf/.obj, max 50MB, stored in Supabase Storage bucket `print-files`
- Project name: required, 3-80 chars
- Description: optional, max 500 chars
- Material: dropdown (PLA, PETG, Resin, ABS)
- Dimensions: X, Y, Z in mm, each 1-500
- Live quote calculation
- Submit creates row in `projects` table with status `submitted`

### QuoteCalculator
- Pure client-side calculation
- Formula: `volume_cm3 = (x * y * z) / 1000`, `price = max(volume_cm3 * rate, 15)`
- Displays: volume in cm³, unit rate, total in USD
- Updates on every input change
- Shows breakdown: "12.0 cm³ × $0.15/cm³ = $1.80 → minimum $15.00"

### MaterialSelector
- Radio cards, not dropdown — each material shows: name, short description, rate per cm³, color swatch
- PLA: indigo swatch, "Standard, biodegradable, good for prototypes"
- PETG: cyan swatch, "Tough, heat-resistant, food-safe options"
- Resin: purple swatch, "High detail, smooth finish, for miniatures"
- ABS: gray swatch, "Durable, heat-resistant, requires enclosure"

### Settings
- Profile section: name (editable), email (read-only)
- Password change: current password + new password + confirm
- Delete account: disabled button with "Contact support to delete your account" text

## 7. DATA MODEL

### `profiles` table
- `id` uuid PK (references `auth.users.id`)
- `name` text
- `created_at` timestamptz default now()
- `updated_at` timestamptz

### `projects` table
- `id` uuid PK default `gen_random_uuid()`
- `user_id` uuid FK → `auth.users.id`
- `name` text not null
- `description` text
- `material` text not null check in ('PLA','PETG','Resin','ABS')
- `size_x` numeric not null
- `size_y` numeric not null
- `size_z` numeric not null
- `volume_cm3` numeric not null
- `estimated_price` numeric not null
- `file_path` text — Supabase Storage path
- `file_name` text
- `status` text default 'submitted' check in ('submitted','reviewing','printing','shipped','cancelled')
- `created_at` timestamptz default now()
- `updated_at` timestamptz

### Supabase Storage
- Bucket `print-files`, private
- Path convention: `{user_id}/{project_id}/{filename}`

### Row Level Security
- `profiles`: users can SELECT/UPDATE own row only
- `projects`: users can SELECT/INSERT/UPDATE own rows only (no DELETE in v1)

## 8. AUTH

Supabase Auth with `@supabase/ssr`. Email + password only. No OAuth. No magic links in v1 (can add later). Session stored in HTTP-only cookies via SSR helper. Middleware refreshes session on every request to `/dashboard/*`.

## 9. FILES

```
app/
  layout.tsx                          (existing, unchanged)
  page.tsx                            (existing, unchanged)
  globals.css                         (existing, unchanged)
  (auth)/
    layout.tsx                        Auth layout: centered card on dark bg
    signup/page.tsx                   Signup form
    login/page.tsx                    Login form
  auth/
    callback/route.ts                 Supabase auth callback handler
  dashboard/
    layout.tsx                        Dashboard layout: sidebar + header
    page.tsx                          Dashboard home
    projects/page.tsx                 Projects list
    new-project/page.tsx              New print request form
    settings/page.tsx                 Account settings
components/
  Navbar.tsx                          (existing, update auth links)
  Hero.tsx                            (existing, unchanged)
  Features.tsx                        (existing, unchanged)
  FAQ.tsx                             (existing, unchanged)
  Pricing.tsx                         (existing, unchanged)
  CTA.tsx                             (existing, update button links)
  Footer.tsx                          (existing, unchanged)
  dashboard/
    Sidebar.tsx                       Dashboard sidebar nav
    Header.tsx                        Dashboard header with user menu
    StatTile.tsx                      Stat tile component
    ProjectRow.tsx                    Project list row
    StatusBadge.tsx                   Status badge
    EmptyState.tsx                    Empty state component
  auth/
    AuthCard.tsx                      Reusable auth card wrapper
  QuoteCalculator.tsx                 Price estimator
  MaterialSelector.tsx                Material picker
  FileUpload.tsx                      File dropzone
  Button.tsx                          Shared button (if not exists)
  Input.tsx                           Shared input (if not exists)
lib/
  supabase/
    server.ts                         Server-side Supabase client
    client.ts                         Browser Supabase client
    middleware.ts                     Middleware Supabase helper
  utils/
    quote.ts                          Quote calculation logic
    types.ts                          Shared TypeScript types
middleware.ts                          Root middleware for auth protection
.env.example                          Environment variable template
.env.local                            Local env with placeholder values
package.json                          Add @supabase/ssr, @supabase/supabase-js, uuid
```

## 10. ACCEPTANCE

- [ ] Landing page renders unchanged at `/`
- [ ] Navbar shows "Log In" and "Sign Up" buttons that link to `/login` and `/signup`
- [ ] CTA buttons on landing page link to `/signup`
- [ ] `/signup` form creates a Supabase user and redirects to `/dashboard`
- [ ] `/login` form authenticates and redirects to `/dashboard`
- [ ] `/auth/callback` handles Supabase email confirmation redirects
- [ ] Middleware blocks unauthenticated access to `/dashboard/*` and redirects to `/login`
- [ ] Dashboard shows user's name and current date
- [ ] Dashboard shows 0/0/$0 stats for new users
- [ ] `/dashboard/projects` shows empty state for new users
- [ ] `/dashboard/new-project` accepts file upload (stl/3mf/obj, max 50MB)
- [ ] MaterialSelector shows 4 materials with descriptions and rates
- [ ] QuoteCalculator updates price live as dimensions change
- [ ] Submitting a project creates a row in `projects` table with status `submitted`
- [ ] Submitted project appears in `/dashboard/projects` with correct status badge
- [ ] `/dashboard/settings` shows user's name and email
- [ ] Logout from header clears session and redirects to `/`
- [ ] All new pages use the existing dark theme (indigo/cyan/purple on ink black)
- [ ] All new pages use Space Grotesk + JetBrains Mono
- [ ] No dead buttons anywhere — every link goes to a real page
- [ ] No fake testimonials, customer counts, or invented social proof
- [ ] `.env.example` documents SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
- [ ] `package.json` includes @supabase/ssr, @supabase/supabase-js, uuid

FILES: ["app/(auth)/layout.tsx","app/(auth)/signup/page.tsx","app/(auth)/login/page.tsx","app/auth/callback/route.ts","app/dashboard/layout.tsx","app/dashboard/page.tsx","app/dashboard/projects/page.tsx","app/dashboard/new-project/page.tsx","app/dashboard/settings/page.tsx","components/dashboard/Sidebar.tsx","components/dashboard/Header.tsx","components/dashboard/StatTile.tsx","components/dashboard/ProjectRow.tsx","components/dashboard/StatusBadge.tsx","components/dashboard/EmptyState.tsx","components/auth/AuthCard.tsx","components/QuoteCalculator.tsx","components/MaterialSelector.tsx","components/FileUpload.tsx","lib/supabase/server.ts","lib/supabase/client.ts","lib/supabase/middleware.ts","lib/utils/quote.ts","lib/utils/types.ts","middleware.ts",".env.example",".env.local","package.json"