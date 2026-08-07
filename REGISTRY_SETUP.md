# Registry setup

The baby registry uses Supabase (Postgres + magic-link auth) and Resend for email. Server logic runs in two places: SECURITY DEFINER Postgres functions (claiming, undo, thank-you list) and a Vercel serverless route (`api/send-claim-email.ts`) that sends the confirmation and owner-notification emails.

## Prerequisites
- Supabase account and project
- Resend account and API key
- Node 20+ (only if running tests locally)

## 1. Environment variables

### Client (browser) — set in Vercel and locally
| Name | Value |
|---|---|
| `VITE_SUPABASE_URL` | `https://<project-ref>.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Supabase → Project Settings → API Keys → Publishable key |

### Server (Vercel only, never expose to the browser)
| Name | Value |
|---|---|
| `SUPABASE_URL` | same URL as above |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API Keys → **Secret key** (`sb_secret_...`) |
| `RESEND_API_KEY` | Resend → API Keys → `re_...` |
| `RESEND_FROM` | e.g. `Everything Baby <onboarding@resend.dev>` or `<hello@yourdomain>` once verified |
| `SITE_URL` | your public site origin, e.g. `https://everything-baby-buddy-16.vercel.app` |

Add all of these in Vercel → Project → Settings → Environment Variables (all three environments ticked), then trigger a redeploy so the serverless function picks them up.

## 2. Database schema

Apply the migrations in order in Supabase → SQL Editor:

1. `supabase/migrations/0001_registry.sql`
2. `supabase/migrations/0002_registry_storage.sql` — creates the `registry-images` storage bucket and its RLS policies (owners upload into a path prefixed with their user id; anyone can read).

The first migration creates:
- `registries`, `registry_items`, `claims` tables
- `public_registries` view (omits `shipping_address` and `owner_email`)
- Column-level grants so `anon` can only read the view
- `create_claim`, `undo_claim`, `create_registry`, `owner_thank_you_list`, `generate_registry_slug` functions
- `create_claim` uses `SELECT ... FOR UPDATE` to serialise concurrent claims

`pgcrypto` is installed into the `extensions` schema and every function has `search_path = public, extensions` so `gen_random_bytes` resolves.

## 3. Auth configuration

Supabase → Authentication → URL Configuration:
- **Site URL**: your production origin (e.g. `https://everything-baby-buddy-16.vercel.app`)
- **Redirect URLs**: add `<origin>/registry/auth/callback` for each environment

For branded magic-link emails, use custom SMTP with Resend:
- Supabase → Authentication → Emails → SMTP Settings
- Host `smtp.resend.com`, port `465`, username `resend`, password = your Resend API key
- Sender name `Everything Baby`, sender email `onboarding@resend.dev` (or your verified domain)

Without a verified domain in Resend, emails only reach the address you signed up to Resend with. Verify your domain to send to any recipient.

## 4. Transactional emails

The Vercel route at `api/send-claim-email.ts` is called by the client after every successful claim. It:
- Fetches the claim server-side using the service role key (never trusts the client for anonymity or address)
- Sends the guest a confirmation with an undo link, plus the shipping address if the item is external
- Sends the owner a notification (respecting the anonymity flag — "Someone (anonymously)" if the guest opted out)

If any env var is missing the route returns 200 with `reason: email_not_configured`, so a mis-configured account never blocks a claim.

## 5. Tests

`tests/registry-db.test.ts` needs a real Postgres. Locally:
```
supabase start
SUPABASE_DB_URL=postgres://postgres:postgres@127.0.0.1:54322/postgres npm run test
```
Without the env var, DB tests skip so `npm run test` still passes on a fresh clone. In CI (`CI=true`), the tests fail loudly if `SUPABASE_DB_URL` is missing.

Also runs on every `npm run test`:
- `send-claim-email payload builder` — asserts internal claims never include the shipping address, external claims do, HTML injection is escaped

## Roadmap
- Auto-fetch `og:image` from external URLs so owners don't have to paste an image URL
- Multiple registries per owner
- Payments / group gifting
- BIMI / Google Workspace for the sender avatar in Gmail
