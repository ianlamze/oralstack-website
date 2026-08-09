# Environment variables

Master inventory of every env var the Oralstack site reads at runtime. Two scopes:

- **`NEXT_PUBLIC_*`** — read by Next.js during `next build` and **baked into the static export** at compile time. Available client-side. Set in `.env.local` for dev and in the Cloudflare Pages dashboard for prod (re-deploy after any change). Never put secrets here — these values ship to the browser.
- **Server-only** — read at request time by Cloudflare Pages Functions in [`functions/`](../functions/). Never bundled into the static export. Set only in the Cloudflare Pages dashboard. Safe for secrets like API keys.

## Master table

| Name | Scope | Required | Used by | Purpose |
|---|---|---|---|---|
| `NEXT_PUBLIC_CF_BEACON_TOKEN` | Client | Optional | [app/layout.tsx](../app/layout.tsx) | Cloudflare Web Analytics beacon token. If unset, the analytics script is not injected. |
| `NEXT_PUBLIC_CALCOM_USERNAME` | Client | Optional | [app/book-a-demo/page.tsx](../app/book-a-demo/page.tsx) | Cal.com username for the booking iframe at `/book-a-demo`. The embed preserves allowlisted source and workflow context as booking metadata and UTM values. If unset, the page falls back to `DemoRequestForm`. |
| `NEXT_PUBLIC_CALCOM_EVENT` | Client | Optional (default `demo`) | [app/book-a-demo/page.tsx](../app/book-a-demo/page.tsx) | Cal.com event slug appended to the booking URL. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Client | Optional | [app/layout.tsx](../app/layout.tsx) | Google Search Console HTML-tag verification value. Skip if you used DNS verification (see [SEARCH_CONSOLE.md](SEARCH_CONSOLE.md)). |
| `RESEND_API_KEY` | Server | Required for successful form delivery | [functions/api/contact.ts](../functions/api/contact.ts) | Resend API key for outbound email. Without it, the endpoint returns `503` and does not log submitted clinic or contact details. |
| `CONTACT_INBOX` | Server | Optional (default `hello@oralstack.com`) | [functions/api/contact.ts](../functions/api/contact.ts) | Destination address for contact-form notifications. |
| `CONTACT_FROM` | Server | Optional (default `Oralstack contact <noreply@oralstack.com>`) | [functions/api/contact.ts](../functions/api/contact.ts) | `From:` header on outbound emails. Must be on a Resend-verified domain. |

## Local dev

```bash
cp .env.example .env.local
```

Fill in only what you need. None are required to boot `npm run dev`. Common dev setups:

- **Booking iframe** — set `NEXT_PUBLIC_CALCOM_USERNAME` to see the real Cal.com embed; otherwise `/book-a-demo` shows the fallback form. Both paths preserve allowlisted `source` and `focus` context.
- **Form delivery testing** — run `npm run build`, then `npx wrangler pages dev out` with a test Resend key and controlled destination inbox.

Server-only vars (`RESEND_API_KEY` etc.) are not read from `.env.local` — they only apply when functions execute on Cloudflare. Test the email path against the deployed preview.

After changing any `NEXT_PUBLIC_*` var, re-run `npm run build` — values are baked at build time.

## Production

Set vars in the Cloudflare Pages dashboard:

**Workers & Pages → oralstack → Settings → Environment variables**

See [CLOUDFLARE.md](CLOUDFLARE.md) (deploy + dashboard env step) and [CONTACT_SETUP.md](CONTACT_SETUP.md) (Resend onboarding) for the full walkthrough. Mark `RESEND_API_KEY` as **encrypted**.

After saving env vars, redeploy (`npm run deploy`) so the static export picks up new `NEXT_PUBLIC_*` values.

## Adding a new env var

1. **Decide the scope.** Does any client component or page need to read it? → `NEXT_PUBLIC_*` prefix. Only Pages Functions read it? → unprefixed, server-only. Never expose secrets via `NEXT_PUBLIC_*`.
2. **Add a documented entry to [`.env.example`](../.env.example)** with a comment explaining what it does, where to get the value, and the fallback behavior when unset.
3. **Read it safely** — provide a fallback (`process.env.X ?? "default"`) or guard the feature behind a truthy check. Don't throw at build time on a missing optional var; the static export needs to build cleanly without it.
4. **For server-only vars** — add the field to the function's `Env` interface in [`functions/api/*.ts`](../functions/api/) so TypeScript catches typos.
5. **Update this table.** Name, scope, required, used-by paths, one-line purpose.
6. **Set it in production** via the Cloudflare Pages dashboard, then redeploy.
