# Contact form

How the contact-form system is wired together. For setup walkthroughs and env-var inventory, follow the pointers below — this doc owns the *system specifics* (intents, anti-spam, WhatsApp).

## What posts where

One backend Pages Function, five intents, all flowing through `POST /api/contact`:

| Surface | Intent | Form component |
|---|---|---|
| `/contact` → Quick question tab | `question` | [`components/forms/QuickQuestionForm.tsx`](../components/forms/QuickQuestionForm.tsx) |
| `/contact` → Migration assessment tab | `migration` | [`components/forms/MigrationAssessmentForm.tsx`](../components/forms/MigrationAssessmentForm.tsx) |
| `/contact` → Pilot proposal tab | `pilot` | [`components/forms/PilotProposalForm.tsx`](../components/forms/PilotProposalForm.tsx) |
| `/contact` → Security review tab | `security` | [`components/forms/SecurityReviewForm.tsx`](../components/forms/SecurityReviewForm.tsx) |
| `/book-a-demo` → First-party request form | `demo` (auto-detected) | [`components/forms/DemoRequestForm.tsx`](../components/forms/DemoRequestForm.tsx) |

When Cal.com is configured, [`components/forms/CalDemoEmbed.tsx`](../components/forms/CalDemoEmbed.tsx)
first shows a disclosure and waits for an explicit user action. Only then does it create the Cal.com
iframe and pass the allowlisted evidence source and workflow focus as booking metadata and UTM
values. The iframe is not loaded before that action.

## Endpoint contract

Full request/response shapes, validation rules, and error modes live in [`functions/README.md`](../functions/README.md). One-line summary: every form posts JSON, the function validates, sends mail via Resend, returns `{ ok: boolean, message }`.

Without `RESEND_API_KEY` set, the endpoint fails closed with `503 {ok:false}`. It does not log submitted clinic or contact details; the form keeps the entered values and offers a direct email fallback.

## Data-handling boundary

The public form path is:

1. The browser sends the structured request to the Cloudflare Pages Function at `/api/contact`.
2. The function validates and normalizes the fields. It has no site database and does not log the
   submitted clinic or contact details.
3. When configured, the function sends the request through Resend to `CONTACT_INBOX`.

Successful API acceptance does not prove final inbox delivery. Resend and the destination inbox are
part of the request path, so the marketing-site privacy notice must describe them without assuming a
storage region or retention period.

Do not submit patient names, clinical records, credentials, or other sensitive patient data through
these public forms. If an evaluation needs sensitive material, arrange an approved transfer method
first.

## Environment variables

`RESEND_API_KEY`, `CONTACT_INBOX`, and `CONTACT_FROM`. All structured requests use the same audited `/api/contact` contract. Full inventory in [`ENV_VARS.md`](ENV_VARS.md).

## Setup

Operational setup (Resend signup, DNS verification, Cloudflare Pages env-var configuration, redeploy) is in [`CLOUDFLARE.md`](CLOUDFLARE.md) → **Step 7 — Form endpoints + Resend**. Don't reproduce here; do it there.

## Anti-spam

Two cheap layers built in:

- **Honeypot** — hidden `website` input. Bots fill it; humans don't. Non-empty `website` returns `200 { ok: true }` and silently drops the message (no log, no mail). Bots don't retry.
- **Per-intent validation** — required fields differ by intent, so generic spam payloads fail validation.

If real spam volume becomes annoying, consider rate limiting or Cloudflare Turnstile. Turnstile
requires both a client widget and server-side token verification; an environment variable alone is
not sufficient.

## Switching the WhatsApp number

The number lives in [`content/contact.ts`](../content/contact.ts):

```ts
export const contactChannels = {
  whatsappNumber: "6597217472",       // E.164 without leading +
  whatsappDisplay: "+65 9721 7472",
  email: "hello@oralstack.com",
};
```

Update both fields, redeploy, done. Propagates to:

- The `/contact` page WhatsApp card
- The article sticky bar WhatsApp button
- Any other component that imports from `@/content/contact`

WhatsApp is an external messaging channel. Keep the user-facing disclosure current and do not use
it to request patient, clinical, credential, or other sensitive data.
