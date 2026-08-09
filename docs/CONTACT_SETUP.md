# Contact form

How the contact-form system is wired together. For setup walkthroughs and env-var inventory, follow the pointers below — this doc owns the *system specifics* (intents, anti-spam, WhatsApp).

## What posts where

One backend Pages Function, four intents, all flowing through `POST /api/contact`:

| Surface | Intent | Form component |
|---|---|---|
| `/contact` → Quick question tab | `question` | [`components/forms/QuickQuestionForm.tsx`](components/forms/QuickQuestionForm.tsx) |
| `/contact` → Migration assessment tab | `migration` | [`components/forms/MigrationAssessmentForm.tsx`](components/forms/MigrationAssessmentForm.tsx) |
| `/contact` → Pilot proposal tab | `pilot` | [`components/forms/PilotProposalForm.tsx`](components/forms/PilotProposalForm.tsx) |
| `/book-a-demo` (when Cal.com env not set) | `demo` (auto-detected) | [`components/sections/DemoRequestForm.tsx`](components/sections/DemoRequestForm.tsx) |

## Endpoint contract

Full request/response shapes, validation rules, and error modes live in [`functions/README.md`](../functions/README.md). One-line summary: every form posts JSON, the function validates, sends mail via Resend, returns `{ ok: boolean, message }`.

Without `RESEND_API_KEY` set, the endpoint validates and **logs to the Cloudflare console** instead of sending. The form UI works either way — useful for dev.

## Environment variables

`RESEND_API_KEY`, `CONTACT_INBOX`, `CONTACT_FROM`, plus `NEXT_PUBLIC_DEMO_FORM_ENDPOINT` for the third-party-service escape hatch on `DemoRequestForm`. Full inventory in [`ENV_VARS.md`](ENV_VARS.md).

## Setup

Operational setup (Resend signup, DNS verification, Cloudflare Pages env-var configuration, redeploy) is in [`CLOUDFLARE.md`](CLOUDFLARE.md) → **Step 7 — Form endpoints + Resend**. Don't reproduce here; do it there.

## Anti-spam

Two cheap layers built in:

- **Honeypot** — hidden `website` input. Bots fill it; humans don't. Non-empty `website` returns `200 { ok: true }` and silently drops the message (no log, no mail). Bots don't retry.
- **Per-intent validation** — required fields differ by intent, so generic spam payloads fail validation.

If real spam volume becomes annoying, add Cloudflare Turnstile — Pages has first-class support, no code change beyond a token in `.env.local` and a Turnstile widget in the form.

## Switching the WhatsApp number

The number lives in [`content/contact.ts`](content/contact.ts):

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
