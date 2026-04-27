/**
 * Cloudflare Pages Function — POST /api/lead-magnet
 *
 * Captures a visitor email + chosen lead magnet, then emails the visitor a
 * link to the magnet page. Optionally also notifies CONTACT_INBOX so the
 * team knows a new lead came in.
 *
 * Reuses the same Resend env vars as /api/contact:
 *   RESEND_API_KEY    — required for actual email sending
 *   CONTACT_INBOX     — internal notification recipient (optional)
 *   CONTACT_FROM      — From: header on outbound emails
 *   SITE_URL          — public site origin, default https://oralstack.com
 *                       (used to build the absolute magnet URL in the email)
 *
 * If RESEND_API_KEY is not set, the function still validates and accepts the
 * submission, logs it, and returns ok:true so the form UX works in dev.
 */

interface Env {
  RESEND_API_KEY?: string;
  CONTACT_INBOX?: string;
  CONTACT_FROM?: string;
  SITE_URL?: string;
}

type PagesFunction<E = unknown> = (context: {
  request: Request;
  env: E;
  waitUntil: (p: Promise<unknown>) => void;
}) => Promise<Response> | Response;

interface MagnetPayload {
  email?: string;
  magnetSlug?: string;
  magnetTitle?: string;
  website?: string; // honeypot
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SLUG_RE = /^[a-z0-9-]+$/;
const DEFAULT_SITE = "https://oralstack.com";

function bad(message: string, status = 400): Response {
  return Response.json({ ok: false, message }, { status });
}

function ok(message: string): Response {
  return Response.json({ ok: true, message });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildVisitorEmail(args: { magnetTitle: string; magnetUrl: string }): {
  subject: string;
  html: string;
  text: string;
} {
  const { magnetTitle, magnetUrl } = args;
  const safeTitle = escapeHtml(magnetTitle);
  const subject = `Your ${magnetTitle} from Oralstack`;
  const html = `<div style="font:14px/1.6 -apple-system,Segoe UI,sans-serif;color:#222;max-width:560px">
<p>Thanks for asking — here's the reference you requested:</p>
<p style="margin:20px 0">
  <a href="${magnetUrl}" style="display:inline-block;padding:12px 20px;background:#0a0f14;color:#fff;text-decoration:none;border-radius:6px;font-weight:500">Read ${safeTitle} →</a>
</p>
<p style="color:#666;font-size:13px">It's free to read and free to share. No paywall, no follow-up sequence — just the reference.</p>
<p style="color:#666;font-size:13px">If anything's off in the content, or you want a related reference we haven't written yet, hit reply — this email goes to a real person.</p>
<p style="margin-top:32px;color:#999;font-size:12px">— The Oralstack team</p>
</div>`;
  const text = `Thanks for asking — here's the reference you requested:

${magnetTitle}
${magnetUrl}

It's free to read and free to share. No paywall, no follow-up sequence — just the reference.

If anything's off in the content, or you want a related reference we haven't written yet, hit reply — this email goes to a real person.

— The Oralstack team`;
  return { subject, html, text };
}

function buildInternalEmail(args: { email: string; magnetTitle: string }): {
  subject: string;
  html: string;
  text: string;
} {
  const { email, magnetTitle } = args;
  const subject = `[oralstack lead] ${magnetTitle} — ${email}`;
  const html = `<div style="font:14px/1.5 -apple-system,Segoe UI,sans-serif;color:#222">
<p style="margin:0 0 12px;color:#666;font-size:12px">New lead-magnet capture via oralstack.com</p>
<table style="border-collapse:collapse">
<tr><td style="padding:6px 12px 6px 0;color:#666">Email</td><td style="padding:6px 0">${escapeHtml(email)}</td></tr>
<tr><td style="padding:6px 12px 6px 0;color:#666">Magnet</td><td style="padding:6px 0">${escapeHtml(magnetTitle)}</td></tr>
</table>
</div>`;
  const text = `New lead-magnet capture via oralstack.com\n\nEmail: ${email}\nMagnet: ${magnetTitle}\n`;
  return { subject, html, text };
}

async function sendViaResend(args: {
  apiKey: string;
  from: string;
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}): Promise<{ ok: boolean; status: number; body?: string }> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${args.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: args.from,
      to: [args.to],
      subject: args.subject,
      html: args.html,
      text: args.text,
      reply_to: args.replyTo,
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    return { ok: false, status: res.status, body };
  }
  return { ok: true, status: res.status };
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let payload: MagnetPayload;
  try {
    payload = (await request.json()) as MagnetPayload;
  } catch {
    return bad("Could not parse request body.");
  }

  // Honeypot — bots fill, humans don't see.
  if (payload.website && payload.website.trim() !== "") {
    return ok("Message received.");
  }

  if (!payload.email || !EMAIL_RE.test(payload.email)) {
    return bad("Please enter a valid email.");
  }
  if (!payload.magnetSlug || !SLUG_RE.test(payload.magnetSlug)) {
    return bad("Missing or invalid magnet.");
  }
  if (!payload.magnetTitle) {
    return bad("Missing magnet title.");
  }

  const siteUrl = env.SITE_URL ?? DEFAULT_SITE;
  const magnetUrl = `${siteUrl.replace(/\/$/, "")}/lead-magnets/${payload.magnetSlug}/`;

  if (!env.RESEND_API_KEY) {
    console.log(
      "[lead-magnet] RESEND_API_KEY not set; capture:",
      JSON.stringify({
        email: payload.email,
        slug: payload.magnetSlug,
        title: payload.magnetTitle,
      }),
    );
    return ok(
      `Message received. (Email forwarding is being wired up — for now, you can read it directly at ${magnetUrl})`,
    );
  }

  const from = env.CONTACT_FROM ?? "Oralstack <noreply@oralstack.com>";
  const visitorEmail = buildVisitorEmail({
    magnetTitle: payload.magnetTitle,
    magnetUrl,
  });

  const visitorRes = await sendViaResend({
    apiKey: env.RESEND_API_KEY,
    from,
    to: payload.email,
    subject: visitorEmail.subject,
    html: visitorEmail.html,
    text: visitorEmail.text,
  });

  if (!visitorRes.ok) {
    console.error("Resend visitor email failed:", visitorRes.status, visitorRes.body);
    return bad(
      `Sorry — couldn't email that just now. You can read it directly at ${magnetUrl}`,
      502,
    );
  }

  // Best-effort internal notification — don't fail the user submission if it errors.
  if (env.CONTACT_INBOX) {
    const internal = buildInternalEmail({
      email: payload.email,
      magnetTitle: payload.magnetTitle,
    });
    void sendViaResend({
      apiKey: env.RESEND_API_KEY,
      from,
      to: env.CONTACT_INBOX,
      subject: internal.subject,
      html: internal.html,
      text: internal.text,
      replyTo: payload.email,
    }).catch((err) => console.error("Internal lead-magnet notify failed:", err));
  }

  return ok("We've emailed you the link — should arrive within a minute.");
};

export const onRequest: PagesFunction = () =>
  new Response("Method Not Allowed", {
    status: 405,
    headers: { Allow: "POST" },
  });
