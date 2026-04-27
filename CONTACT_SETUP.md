# Contact form setup

The contact-form endpoint at `/api/contact` is a Cloudflare Pages Function
(`functions/api/contact.ts`). It validates submissions and emails them to
`hello@oralstack.com` via [Resend](https://resend.com).

**One backend, four intents:**
- `/contact` page — Quick question, Migration assessment, Pilot proposal forms (intents `question`, `migration`, `pilot`)
- `/book-a-demo` page — DemoRequestForm (intent `demo`, normalized from its own field shape)
- `/api/lead-magnet` is a separate function for lead-magnet captures (also via Resend)

DemoRequestForm defaults to posting at `/api/contact`. Override with
`NEXT_PUBLIC_DEMO_FORM_ENDPOINT` if you want a third-party form service
(Formspree, Web3Forms) instead — useful for local-only dev when functions
aren't running.

Without the env vars below set, the endpoint still **accepts and validates** the
form (so the UI works end-to-end), but it logs the submission to the Cloudflare
Pages console instead of emailing. Useful for dev / pre-launch — but real users
need real email forwarding, so finish this setup before launch.

## One-time setup (~10 minutes)

### 1. Sign up for Resend

[resend.com](https://resend.com) — free tier is 100 emails/day, more than enough
for early-stage contact-form volume.

### 2. Verify `oralstack.com` in Resend

Resend dashboard → **Domains** → **Add Domain** → `oralstack.com`.

Resend will show 3–4 DNS records to add (SPF TXT, DKIM CNAME, return-path).
Since `oralstack.com` is on Cloudflare DNS:

1. Cloudflare dashboard → **DNS** → **Records** → **Add record** for each
2. Each record: copy the Type / Name / Content from Resend verbatim
3. **Important**: set Proxy status to **DNS only** (grey cloud), not Proxied
4. Back in Resend → **Verify** — usually <1 min

### 3. Get a Resend API key

Resend dashboard → **API Keys** → **Create API Key** → name it `oralstack-prod`.
Copy the key (starts with `re_…`).

### 4. Set the env vars in Cloudflare Pages

Cloudflare dashboard → **Workers & Pages** → **oralstack** → **Settings** →
**Environment variables** → **Production**.

Add:

| Name | Value |
|---|---|
| `RESEND_API_KEY` | `re_…` from step 3 |
| `CONTACT_INBOX` | `hello@oralstack.com` (or wherever you want submissions to land) |
| `CONTACT_FROM` | `Oralstack contact <noreply@oralstack.com>` |

(Optionally repeat for the **Preview** environment if you want preview deploys
to actually send.)

### 5. Redeploy

```bash
npm run deploy
```

The deploy script copies `functions/` into `out/functions/` so wrangler picks
them up.

### 6. Test

- Visit `https://oralstack.com/contact`
- Submit the "Quick question" form
- Confirm an email lands in your inbox within ~30 seconds
- Reply directly — the `Reply-To` header is set to the submitter's address

If something fails: Cloudflare dashboard → **oralstack** → **Functions** →
**Real-time logs** shows the function output (including any Resend API errors).

## Anti-spam notes

The function ships with two layers of cheap spam protection:

- **Honeypot field**: a hidden `website` input that bots fill but humans never
  see. Submissions with a non-empty `website` are silently dropped.
- **Per-intent validation**: required fields differ per form, so generic bot
  payloads typically fail validation.

If real spam volume becomes annoying later, add Cloudflare Turnstile (free,
seamless) — Pages has first-class support.

## Switching the WhatsApp number later

The WhatsApp number lives in [`content/contact.ts`](content/contact.ts):

```ts
export const contactChannels = {
  whatsappNumber: "6597217472",       // E.164 without leading +
  whatsappDisplay: "+65 9721 7472",
  email: "hello@oralstack.com",
};
```

Update both fields, redeploy, done. The change propagates to:
- The `/contact` page's WhatsApp card
- The article sticky bar's WhatsApp button
- Anywhere else that imports from `@/content/contact`
