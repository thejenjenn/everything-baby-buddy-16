# Registry setup

The baby registry uses Supabase (Postgres + magic-link auth) plus Resend for transactional email. Everything is server-authoritative: the client only calls RPCs and the transactional email Edge Function.

## Prerequisites
- Supabase account and project
- Resend account and API key
- Node 20+

## 1. Environment variables

Copy `.env.example` to `.env.local` and fill in:

```
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon key from Supabase dashboard>
```

## 2. Database schema

Apply the migration in `supabase/migrations/0001_registry.sql` using either the Supabase CLI (`supabase db push`) or by pasting the file into the SQL editor.

The migration creates:
- `registries`, `registry_items`, `claims` tables
- `public_registries` view (omits `shipping_address` and `owner_email`)
- Column-level grants: `anon` cannot select `registries` directly, only the view
- RLS policies for owner writes
- `create_claim`, `undo_claim`, `create_registry`, `owner_thank_you_list`, `generate_registry_slug` functions
- `create_claim` uses `SELECT ... FOR UPDATE` to serialise concurrent claims

## 3. Auth configuration

In the Supabase dashboard under Auth > URL Configuration:
- Site URL: your production origin (e.g. `https://theeverythingbaby.com`)
- Additional redirect URLs: add `.../registry/auth/callback` for each environment (localhost, preview, prod)

Email templates: the default magic-link template is fine. You can customise it in Auth > Email Templates.

## 4. Edge Function for confirmation emails

```
supabase functions deploy send-claim-email
supabase secrets set \
  RESEND_API_KEY=re_... \
  RESEND_FROM='Everything Baby <hello@yourdomain>' \
  SITE_URL=https://theeverythingbaby.com
```

The client calls this function after every successful `create_claim`. If the function fails, the claim is still recorded; the guest just does not receive the email.

## 5. Tests

Registry-critical tests live in `tests/registry-db.test.ts`:
- Concurrent claims: 8 parallel requests for the last unit, exactly one wins
- Slug enumeration: 200 slugs, all match the expected shape; obvious guesses fail; `anon` cannot `SELECT` on `registries` at all; the public view never exposes `shipping_address` or `owner_email`
- Anonymous privacy: an anonymous claimant's real name and email never appear in the owner's dashboard response

To run them locally, start a Supabase database and point the test at it:

```
supabase start
SUPABASE_DB_URL=postgres://postgres:postgres@127.0.0.1:54322/postgres npm run test
```

Without `SUPABASE_DB_URL`, all DB tests skip (so `npm run test` still passes in CI without a database).

## 6. Deployment

Set the same `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Vercel's project environment variables.

Deploy as normal; nothing else needed on Vercel. Postgres and Resend live in Supabase and Resend respectively.

## Roadmap notes
- Auto-fetch an `og:image` from the pasted external URL so owners do not have to enter an image URL manually
- Multiple registries per owner
- Payments / group gifting
