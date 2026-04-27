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

Once you're authenticated, I run:

```bash
npm run deploy
```

Which is `next build && wrangler pages deploy out --project-name=oralstack --commit-dirty=true`. First run prompts to create the Pages project — Wrangler accepts the `--project-name=oralstack` flag and creates it without further input. Returns a URL like `https://oralstack.pages.dev`.

The Pages project is now live. Subsequent deploys are the same single command.

## Step 3 — Wire `oralstack.com` (~5 minutes)

Two paths depending on where DNS lives today:

### Path A — Already on Cloudflare DNS

1. Cloudflare dashboard → **Workers & Pages** → **oralstack** → **Custom domains** → **Set up a custom domain**
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

Optional but recommended — `/book-a-demo` falls back to a mailto card without it.

1. Sign up at [cal.com](https://cal.com) (free tier)
2. Create an event type called "Demo" (or whatever) — 30 minutes, no payment, your availability rules
3. The URL will be `cal.com/{username}/{event-slug}`
4. Add to `.env.local`:

```bash
NEXT_PUBLIC_CALCOM_USERNAME=your-cal-username
NEXT_PUBLIC_CALCOM_EVENT=demo
```

5. Tell me — I rebuild and redeploy. `/book-a-demo` now embeds Cal.com directly.

## Step 7 — Form endpoints + Resend (~5 minutes)

The site has two Cloudflare Pages Functions handling form submissions:

- [`functions/api/contact.ts`](functions/api/contact.ts) — POST `/api/contact`. Multi-intent (`question`, `migration`, `pilot`, `demo`). Powers `/contact`, the article inline magnet capture, **and** DemoRequestForm on `/book-a-demo` (which posts here by default).
- [`functions/api/lead-magnet.ts`](functions/api/lead-magnet.ts) — POST `/api/lead-magnet`. Email-captures the visitor address and emails them the link to the requested reference.

Without `RESEND_API_KEY` set, both endpoints still accept and validate submissions — they just log to the Cloudflare console instead of sending email. The form UI works either way.

To activate real email forwarding:

1. Sign up at [resend.com](https://resend.com) (free tier: 100 emails/day, 3,000/month).
2. **Verify the sending domain.** Resend → Domains → Add → `oralstack.com` → add the DNS records (SPF, DKIM) Resend provides into Cloudflare DNS. Verification usually completes in 5–10 minutes.
3. Resend → API Keys → Create API Key (full access, single domain). Copy the value (starts with `re_`).
4. Cloudflare dashboard → Workers & Pages → **oralstack** → Settings → Environment variables:
   - `RESEND_API_KEY` (encrypted) — the key from step 3
   - `CONTACT_INBOX` — destination address (default: `hello@oralstack.com`)
   - `CONTACT_FROM` — From: header (default: `Oralstack contact <noreply@oralstack.com>`)
   - `SITE_URL` — public origin for absolute lead-magnet URLs (default: `https://oralstack.com`)
5. Redeploy. Submissions land in `hello@oralstack.com` within a second.

DemoRequestForm at `/book-a-demo` posts to `/api/contact` by default; if you want a third-party form service instead (Formspree etc.), set `NEXT_PUBLIC_DEMO_FORM_ENDPOINT` in `.env.local` to override.

Function response codes:
- `200 { ok: true, message }` — submission accepted; email sent if Resend configured, logged otherwise.
- `400 { ok: false, message }` — missing or invalid fields (per-intent validation).
- `502` — Resend rejected the request (check Cloudflare function logs).

See [CONTACT_SETUP.md](CONTACT_SETUP.md) for the consolidated setup walkthrough.

### Optional: route DemoRequestForm at a third-party service

If you'd rather use Formspree / Web3Forms / similar instead of the in-repo Pages Function:

1. Sign up at [formspree.io](https://formspree.io) (free tier: 50 submissions/month).
2. Create a form, destination email `hello@oralstack.com`.
3. Copy the endpoint URL (e.g., `https://formspree.io/f/xxxxxxxx`).
4. Add to `.env.local` to override the default `/api/contact`:

```bash
NEXT_PUBLIC_DEMO_FORM_ENDPOINT=https://formspree.io/f/xxxxxxxx
```

5. Redeploy.

The DemoRequestForm payload is JSON `{ clinic, name, role, email, location, chairs, providers, currentPms, preferredTimes, notes }`. The in-repo `/api/contact` function detects this shape and normalizes it to `intent: "demo"` automatically.

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
