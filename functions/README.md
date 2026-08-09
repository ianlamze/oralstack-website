# functions/

Cloudflare Pages Functions. The site is a Next.js static export (`output: "export"` in `next.config.ts`) deployed to Cloudflare Pages, so this directory is the **entire** dynamic surface — no Node server, no API routes under `app/`, no database. Cloudflare discovers this directory at the project root; it must not be copied into the static `out/` directory.

The contact endpoint sends mail via [Resend](https://resend.com) and ships a no-key fallback path: if `RESEND_API_KEY` is unset, it still validates the payload, logs it to the Pages console, and returns `200 { ok: true }` so the form UI works in dev.

## Files

- [`api/contact.ts`](api/contact.ts) → `POST /api/contact`
- [`api/event.ts`](api/event.ts) → `POST /api/event`

The route maps directly from the file path under `functions/` (Cloudflare Pages convention). The file exports `onRequestPost` for the happy path and `onRequest` returning `405 Allow: POST` for any other method.

## Endpoints

| Route | Purpose | Callers | Env vars consumed |
|---|---|---|---|
| `POST /api/contact` | Multi-intent contact form. Validates, builds an email, sends one message to `CONTACT_INBOX` with `Reply-To` set to the submitter. Subject is `[oralstack contact] <intent label> — <name>`. | `FormShell` (used on `/contact` for `question` / `migration` / `pilot` intents); `DemoRequestForm` on `/book-a-demo` (intent `demo`, posts in its own `{clinic, notes, …}` shape — auto-detected and normalized). | `RESEND_API_KEY`, `CONTACT_INBOX` (default `hello@oralstack.com`), `CONTACT_FROM` (default `Oralstack contact <noreply@oralstack.com>`) |
| `POST /api/event` | Allowlisted, vendor-neutral product-marketing interaction events. Logs primitive properties plus request country and user agent to Cloudflare runtime logs. | `lib/analytics.ts` | None |

### Request shapes

`/api/contact` — JSON. Canonical payload:

```ts
{ intent: "question" | "migration" | "pilot" | "demo",
  name, email,                      // always required
  message?,                         // required for "question" (≥10 chars)
  clinicName?, currentPms?, workflowGoal?, numChairs?, timeline?,
  numLocations?, numChairsTotal?, startDate?,
  role?, location?, providers?, preferredTimes?, focus?,
  website?                          // honeypot — must be empty
}
```

Demo submissions use `{ intent: "demo", clinicName, name, email, location, focus?, role?, numChairs?, providers?, currentPms?, preferredTimes?, message?, website? }`. `focus` carries the workflow selected in the homepage explorer or workflow guide.

Per-intent required fields (see `validate()` in `api/contact.ts`):
- `question`: `message` ≥10 chars.
- `migration`: `clinicName`, `currentPms`. The current UI also requires `workflowGoal`;
  the endpoint accepts legacy clients without it during the compatibility window.
- `pilot`: `clinicName`, `numLocations` (whole number, minimum 1). The current UI also requires
  `currentPms` and `workflowGoal`; the endpoint keeps those optional for legacy clients.
- `demo`: `clinicName`, `location`.

### Response shape

Always JSON, always `{ ok: boolean, message: string }`.

| Status | When |
|---|---|
| `200 { ok: true }` | Success. Also returned on honeypot trip (silent drop) and in dev-mode (no `RESEND_API_KEY`). |
| `400 { ok: false }` | Parse failure or per-intent validation failure. `message` is the user-facing reason — surfaced verbatim by the form components. |
| `502 { ok: false }` | Resend rejected the send. Status + response body logged via `console.error`. |
| `405 Allow: POST` | Any non-POST method. |

## Local testing

`next dev` does not run Pages Functions — it serves the React app only, so form submissions hit `404`. Two options:

1. **Run the full Pages bundle locally.** From the repo root:

   ```bash
   npm run build
   npx wrangler pages dev out
   ```

   Then exercise an endpoint:

   ```bash
   curl -X POST http://localhost:8788/api/contact \
     -H 'Content-Type: application/json' \
     -d '{"intent":"question","name":"Ada","email":"a@b.co","message":"ten chars please"}'
   ```

   Without `RESEND_API_KEY` in your shell, you get `200 {ok:true}` plus a `[contact]` log line in the wrangler stdout. To exercise the real send path, export `RESEND_API_KEY=re_…` (and optionally `CONTACT_INBOX` / `CONTACT_FROM`) before starting wrangler. The sending domain must be verified in Resend or the API returns 4xx and the function returns `502`.

2. **Skip the function entirely.** For `DemoRequestForm` only, set `NEXT_PUBLIC_DEMO_FORM_ENDPOINT=https://formspree.io/f/...` in `.env.local` and run `npm run dev`. The form posts to that URL instead of `/api/contact`. There is no equivalent escape hatch for the other forms.

## Error modes

- **Bad JSON body** → `400 {ok:false,message:"Could not parse request body."}`.
- **Missing / invalid field** → `400 {ok:false,message:<human reason>}`. The form components render `message` directly to the user.
- **Honeypot tripped** (`website` non-empty) → `200 {ok:true,message:"Message received."}`. No mail sent. No log line. Bots don't retry.
- **`RESEND_API_KEY` unset** → `200 {ok:true}` with a dev-mode note in `message`. Submission body is logged with prefix `[contact]` via `console.log`. Visible in the Cloudflare dashboard under **Workers & Pages → oralstack → Functions → Real-time logs**, or in `wrangler pages dev` stdout locally.
- **Resend API rejects the send** → `502 {ok:false,message}`. Status + response body are logged via `console.error`.
- **Unverified Resend sending domain** → surfaces as the `502` case above.

## Setup pointers

Operational setup (Resend account, DNS verification, Cloudflare env-var configuration, custom domain, Email Routing) is not duplicated here. See:

- [`../CLOUDFLARE.md`](../CLOUDFLARE.md) — full Cloudflare Pages deployment + env-var walkthrough. Step 7 covers Resend wiring.
- [`../CONTACT_SETUP.md`](../CONTACT_SETUP.md) — focused contact-form setup, anti-spam notes, WhatsApp number switch.
