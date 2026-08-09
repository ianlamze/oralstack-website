# Cloudflare deployment guide

This site is built as a Next.js static export and deployed to Cloudflare Pages. Below is the full setup, in the order that minimises waiting.

## What you need

- A Cloudflare account (free tier is fine)
- Ownership of `oralstack.com` (already true)
- ~15 minutes of your time, broken across three short interactive steps

## Step 1 — Authenticate Wrangler (one-time, ~30 seconds)

In your terminal:

```bash
cd "/Users/ianlam/Documents/Agent Projects/oralstack"
npx wrangler login
```

A browser tab opens at `dash.cloudflare.com`. Click **Allow**. The credentials cache to `~/.config/.wrangler/config/default.toml` and persist; future deploys don't need re-auth (until ~30 days inactive).

Verify with:

```bash
npx wrangler whoami
```

Should show your email + account ID. Tell me when this is done — I'll fire the first deploy from my session.

## Step 2 — First deploy

Production runs as the `oralstack-website` Pages project, **Git-connected**. Default deploy is automatic: push to `main` and Cloudflare picks it up, builds, and ships within ~60 seconds. No CLI step required for routine work.

Initial project creation is done in the Cloudflare dashboard once: **Workers & Pages → Create → Connect to Git → select the repo → set build command `npm run build:cf` and output dir `out` → set production branch `main`**. After that, every push to `main` deploys automatically.

`npm run deploy` is the manual fallback (out-of-band hotfixes, dirty working tree, or shipping the same commit again):

```bash
npm run deploy
```

Which is `npm run build:cf && wrangler pages deploy out --project-name=oralstack-website --commit-dirty=true --branch=main`.

## Step 3 — Wire `oralstack.com` (~5 minutes)

Two paths depending on where DNS lives today:

### Path A — Already on Cloudflare DNS

1. Cloudflare dashboard → **Workers & Pages** → **oralstack-website** → **Custom domains** → **Set up a custom domain**
2. Enter `oralstack.com` and click through. SSL auto-provisions in ~1 minute.
3. Repeat for `www.oralstack.com` if you want both.

### Path B — DNS is at your registrar (GoDaddy, Namecheap, Porkbun, etc.)

Recommended: move DNS to Cloudflare. It enables Email Routing (Step 5) and Web Analytics (Step 4) cleanly.

1. Cloudflare dashboard → **Add a Site** → enter `oralstack.com` → Free plan
2. Cloudflare gives you 2 nameservers like `xxx.ns.cloudflare.com`
3. At your registrar, replace existing nameservers with the Cloudflare ones
4. Wait for activation (usually <30 min, max 24 h)
5. Once active, follow Path A above

## Step 4 — Cloudflare Web Analytics (~3 minutes)

1. Cloudflare dashboard → **Analytics & Logs** → **Web Analytics** → **Add a site**
2. Choose **Automatic setup** if `oralstack.com` is on Cloudflare DNS, or **Manual setup** if not
3. Copy the **token** from the beacon snippet (the value of `data-cf-beacon='{"token": "..."}'`)
4. Create `.env.local` in the repo root:

```bash
NEXT_PUBLIC_CF_BEACON_TOKEN=your-token-here
```

5. Tell me — I rebuild and redeploy. Analytics start collecting on the next deploy.

The site does not load the beacon script if the env var is empty, so there's no analytics pollution during local dev.

## Step 5 — Email Routing for `hello@oralstack.com` (~5 minutes)

Requires `oralstack.com` to be on Cloudflare DNS (Step 3 Path A or completed Path B).

1. Cloudflare dashboard → **Email** → **Email Routing** → **Get started**
2. Cloudflare auto-adds the required DNS records (MX + SPF + TXT) when you accept
3. **Routing rules** → **Create address** → enter `hello@oralstack.com` → forward to your real inbox (your Gmail, Outlook, whatever)
4. Verify your destination email when Cloudflare sends the verification

Repeat for `security@oralstack.com`, `legal@oralstack.com`, `privacy@oralstack.com` (referenced in the legal pages and the security disclosure).

You can also create a catch-all rule that forwards `*@oralstack.com` to your inbox, so any address works.

## Step 6 — Cal.com demo booking (~5 minutes)

Optional — `/book-a-demo` uses the structured first-party request form without it.

1. Sign up at [cal.com](https://cal.com) (free tier)
2. Create an event type called "Demo" (or whatever) — 30 minutes, no payment, your availability rules
3. The URL will be `cal.com/{username}/{event-slug}`
4. Add to `.env.local`:

```bash
NEXT_PUBLIC_CALCOM_USERNAME=your-cal-username
NEXT_PUBLIC_CALCOM_EVENT=demo
```

5. Tell me — I rebuild and redeploy. `/book-a-demo` now embeds Cal.com directly.

The embed forwards the site's allowlisted evidence source and workflow focus as booking metadata
and UTM values. This keeps a DFI case-study request contextual without putting personal data in the
page URL.

## Step 7 — Form endpoints + Resend (~5 minutes)

The site has one Cloudflare Pages Function handling form submissions: [`/api/contact`](../functions/api/contact.ts) (multi-intent: question, migration, pilot, demo), plus an allowlisted interaction-event sink at [`/api/event`](../functions/api/event.ts). Endpoint contracts, request/response shapes, and error modes live in [`functions/README.md`](../functions/README.md). System overview in [`CONTACT_SETUP.md`](CONTACT_SETUP.md). Env-var inventory in [`ENV_VARS.md`](ENV_VARS.md).

Without `RESEND_API_KEY` set, the endpoint returns `503 {ok:false}`. It does not log submitted clinic or contact details, and the form offers a direct email fallback.

To activate real email forwarding:

1. Sign up at [resend.com](https://resend.com) (free tier: 100 emails/day, 3,000/month).
2. **Verify the sending domain.** Resend → Domains → Add → `oralstack.com` → add the DNS records (SPF, DKIM) Resend provides into Cloudflare DNS. Verification usually completes in 5–10 minutes.
3. Resend → API Keys → Create API Key (full access, single domain). Copy the value (starts with `re_`).
4. Cloudflare dashboard → Workers & Pages → **oralstack-website** → Settings → Environment variables:
   - `RESEND_API_KEY` (encrypted) — the key from step 3
   - `CONTACT_INBOX` — destination address (default: `hello@oralstack.com`)
   - `CONTACT_FROM` — From: header (default: `Oralstack contact <noreply@oralstack.com>`)
5. Redeploy. A successful form response is returned only after Resend accepts the message for
   sending to `CONTACT_INBOX`; final inbox delivery is not confirmed by this response.

The DemoRequestForm payload uses the shared contact shape: `{ intent: "demo", clinicName, name, email, location, focus, role, numChairs, providers, currentPms, preferredTimes, message }`. `focus` records the workflow selected before the request; the remaining clinic setup fields are optional.

## Troubleshooting

When a deploy fails, the cause is almost always one of these. Check in order.

### `npm run deploy` fails locally before upload

- **Wrangler auth expired** (~30 days inactive). Re-run `npx wrangler login`.
- **Non-ASCII commit message rejected.** Wrangler's deploy API rejects en-dash, arrows, emoji in the auto-detected commit message. Override with `npx wrangler pages deploy out --project-name=oralstack-website --commit-dirty=true --commit-message="ASCII only"`.
- **`next build` fails.** Run `npm run typecheck` and `npm run lint` first. Build errors often reduce to a TS error or a missing import. CI runs the same gate — see [.github/workflows/ci.yml](.github/workflows/ci.yml).
- **Content check fails.** `npm run check:content` catches banned voice words, duplicate slugs, malformed `publishedAt`. The error message points at the file + line.

### Site deploys but a route 404s in production

- **Trailing slash mismatch.** Static export emits directories — `/foo/index.html` works at `/foo/` but redirects (308) at `/foo`. Always link with the trailing slash in nav and sitemap.
- **Missing static export entry.** Dynamic routes (`/articles/[slug]`, `/compare/[slug]`) need their data registered in `content/<dir>/index.ts` so `generateStaticParams` picks them up. If the route is missing from the sitemap *and* 404s, that's the cause.
- **Sitemap not updated.** Add the route to [`app/sitemap.ts`](../app/sitemap.ts) and redeploy.

### Form returns 502 in production

`502` means Resend rejected the send or could not be reached. Causes:

- **Sending domain not verified** in Resend. Resend → Domains → check status. DNS propagation can take 5–10 min after adding records.
- **`CONTACT_FROM` doesn't match a verified domain.** Resend rejects sends from unverified domains.

If **`RESEND_API_KEY` is not set**, the function returns `503`, not `502`; no submission data is logged.

Real-time logs: Cloudflare dashboard → **Workers & Pages → oralstack-website → Functions → Real-time logs**. Look for the `[contact]` prefix.

### Custom domain SSL pending

Universal SSL provisioning takes ~1 minute after adding a custom domain. If still stuck after 10 min: Cloudflare dashboard → **Custom domains** → click the domain → manual reissue. SSL also requires the domain to be on Cloudflare DNS (Step 3 Path A).

### DNS not propagating

```bash
dig oralstack.com NS
dig www.oralstack.com
```

If NS records still point to the old registrar after 24 h, the registrar nameserver change didn't take. Re-check at the registrar.

### Pages Function returns 500 with no body

Cloudflare's runtime crashed before the function set a response. Check **Functions → Real-time logs** for the stack trace. Common causes: TypeScript runtime error from an unchecked `process.env.X` access (use a fallback), or a third-party fetch that threw outside the function's try/catch.

## Quick checklist

```
[ ] Step 1: npx wrangler login → npx wrangler whoami works
[ ] Step 2: npm run deploy (I run this once you're logged in)
[ ] Step 3: Custom domain wired in Cloudflare Pages
[ ] Step 4: Cloudflare Web Analytics token in .env.local
[ ] Step 5: hello@ + security@ + legal@ forwarding via Email Routing
[ ] Step 6: Cal.com username + event in .env.local
[ ] Step 7: Resend wired (RESEND_API_KEY in Cloudflare Pages env vars)
```

When you've done step 1, just say "logged in" and I take it from there.
