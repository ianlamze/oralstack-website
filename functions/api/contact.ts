/**
 * Cloudflare Pages Function — POST /api/contact
 *
 * Receives a contact-form submission, validates it, and (if a Resend API key is
 * configured) emails the contents to CONTACT_INBOX (defaults to hello@oralstack.com).
 *
 * Required env vars (set in Cloudflare Pages → Settings → Environment variables):
 *   RESEND_API_KEY    — your Resend API key (https://resend.com)
 *   CONTACT_INBOX     — optional override of the destination inbox
 *   CONTACT_FROM      — optional override of the From: address (must be on a
 *                       Resend-verified domain; defaults to noreply@oralstack.com)
 *
 * If RESEND_API_KEY is not set, the function still accepts and validates the
 * submission, logs it to the Pages console, and returns ok:true with a note.
 * That keeps the form usable in pre-launch / dev mode while you wire up Resend.
 */

interface Env {
  RESEND_API_KEY?: string;
  CONTACT_INBOX?: string;
  CONTACT_FROM?: string;
}

type PagesFunction<E = unknown> = (context: {
  request: Request;
  env: E;
  waitUntil: (p: Promise<unknown>) => void;
}) => Promise<Response> | Response;

type Intent = "question" | "migration" | "pilot" | "demo";

interface ContactPayload {
  intent: Intent;
  name?: string;
  email?: string;
  message?: string;
  // migration / pilot / demo-specific
  clinicName?: string;
  currentPms?: string;
  numChairs?: string | number;
  timeline?: string;
  // pilot-specific
  numLocations?: string | number;
  numChairsTotal?: string | number;
  startDate?: string;
  // demo-specific
  role?: string;
  location?: string;
  providers?: string | number;
  preferredTimes?: string;
  // honeypot — bots fill, humans don't see
  website?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

function row(label: string, value: string | number | undefined): string {
  if (value === undefined || value === "" || value === null) return "";
  return `<tr><td style="padding:6px 12px 6px 0;color:#666;vertical-align:top">${escapeHtml(label)}</td><td style="padding:6px 0">${escapeHtml(String(value))}</td></tr>`;
}

function buildEmail(p: ContactPayload): { subject: string; html: string; text: string } {
  const intentLabel: Record<Intent, string> = {
    question: "Quick question",
    migration: "Migration assessment request",
    pilot: "Pilot proposal request",
    demo: "Demo request",
  };
  const subject = `[oralstack contact] ${intentLabel[p.intent]} — ${p.name ?? "(no name)"}`;
  const rows = [
    row("Intent", intentLabel[p.intent]),
    row("Name", p.name),
    row("Role", p.role),
    row("Email", p.email),
    row("Clinic name", p.clinicName),
    row("Location", p.location),
    row("Current PMS", p.currentPms),
    row("# chairs", p.numChairs),
    row("# providers", p.providers),
    row("Preferred times", p.preferredTimes),
    row("Timeline", p.timeline),
    row("# locations", p.numLocations),
    row("# chairs total", p.numChairsTotal),
    row("Target start date", p.startDate),
  ].join("");
  const messageHtml = p.message
    ? `<div style="margin-top:18px;padding:14px;border-left:3px solid #ddd;background:#fafafa;white-space:pre-wrap">${escapeHtml(p.message)}</div>`
    : "";
  const html = `<div style="font:14px/1.5 -apple-system,Segoe UI,sans-serif;color:#222"><p style="margin:0 0 12px;color:#666;font-size:12px">New contact-form submission via oralstack.com</p><table style="border-collapse:collapse">${rows}</table>${messageHtml}</div>`;
  const text = [
    `New contact-form submission via oralstack.com`,
    ``,
    `Intent: ${intentLabel[p.intent]}`,
    p.name && `Name: ${p.name}`,
    p.role && `Role: ${p.role}`,
    p.email && `Email: ${p.email}`,
    p.clinicName && `Clinic: ${p.clinicName}`,
    p.location && `Location: ${p.location}`,
    p.currentPms && `Current PMS: ${p.currentPms}`,
    p.numChairs && `# chairs: ${p.numChairs}`,
    p.providers && `# providers: ${p.providers}`,
    p.preferredTimes && `Preferred times: ${p.preferredTimes}`,
    p.timeline && `Timeline: ${p.timeline}`,
    p.numLocations && `# locations: ${p.numLocations}`,
    p.numChairsTotal && `# chairs total: ${p.numChairsTotal}`,
    p.startDate && `Target start: ${p.startDate}`,
    p.message && `\n${p.message}`,
  ]
    .filter(Boolean)
    .join("\n");
  return { subject, html, text };
}

function validate(p: ContactPayload): string | null {
  if (!p.intent || !["question", "migration", "pilot", "demo"].includes(p.intent)) {
    return "Missing or invalid intent.";
  }
  if (!p.name || p.name.trim().length < 2) return "Please enter your name.";
  if (!p.email || !EMAIL_RE.test(p.email)) return "Please enter a valid email.";
  if (p.intent === "question" && (!p.message || p.message.trim().length < 10)) {
    return "Please write a question (at least 10 characters).";
  }
  if (p.intent === "migration") {
    if (!p.clinicName) return "Please tell us your clinic name.";
    if (!p.currentPms) return "Please pick your current PMS.";
  }
  if (p.intent === "pilot") {
    if (!p.clinicName) return "Please tell us your clinic / group name.";
    if (!p.numLocations) return "Please tell us how many locations.";
  }
  if (p.intent === "demo") {
    if (!p.clinicName) return "Please tell us your clinic name.";
    if (!p.location) return "Please tell us your clinic location.";
  }
  return null;
}

async function sendViaResend(env: Env, p: ContactPayload): Promise<Response> {
  const { subject, html, text } = buildEmail(p);
  const to = env.CONTACT_INBOX ?? "hello@oralstack.com";
  const from = env.CONTACT_FROM ?? "Oralstack contact <noreply@oralstack.com>";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html,
      text,
      reply_to: p.email,
    }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("Resend send failed:", res.status, detail);
    return bad(
      "Sorry — couldn't deliver that just now. Please email hello@oralstack.com directly.",
      502,
    );
  }
  return ok("Message received — we'll reply within one working day.");
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let raw: Record<string, unknown>;
  try {
    raw = (await request.json()) as Record<string, unknown>;
  } catch {
    return bad("Could not parse request body.");
  }

  const payload = raw as unknown as ContactPayload;

  // Honeypot: bots fill the hidden `website` field; real users never see it.
  if (payload.website && payload.website.trim() !== "") {
    // Pretend success so the bot doesn't retry.
    return ok("Message received.");
  }

  const error = validate(payload);
  if (error) return bad(error);

  if (!env.RESEND_API_KEY) {
    // Email pipeline not yet wired up — log the submission and tell the user.
    console.log("[contact] RESEND_API_KEY not set; submission:", JSON.stringify(payload));
    return ok(
      "Message received. (Email forwarding is being wired up — we'll get back to you via the address you provided.)",
    );
  }

  return sendViaResend(env, payload);
};

export const onRequest: PagesFunction = () =>
  new Response("Method Not Allowed", {
    status: 405,
    headers: { Allow: "POST" },
  });
