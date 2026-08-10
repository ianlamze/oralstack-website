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
 * If RESEND_API_KEY is not set, the function fails closed with a user-facing
 * 503. It never logs the submitted clinic or contact details.
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

type Intent = "question" | "migration" | "pilot" | "security" | "demo";

interface ContactPayload {
  intent: Intent;
  name?: string;
  email?: string;
  message?: string;
  // migration / pilot / demo-specific
  clinicName?: string;
  startMode?: string;
  currentPms?: string;
  workflowGoal?: string;
  requestType?: string;
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
  focus?: string;
  sourcePage?: string;
  // honeypot — bots fill, humans don't see
  website?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function textField(value: unknown, maxLength = 500): string | undefined {
  if (typeof value !== "string") return undefined;
  const cleaned = value.trim();
  return cleaned ? cleaned.slice(0, maxLength) : undefined;
}

function numberField(value: unknown): string | number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  return textField(value, 32);
}

function normalizePayload(raw: Record<string, unknown>): ContactPayload {
  return {
    intent: textField(raw.intent, 24) as Intent,
    name: textField(raw.name, 120),
    email: textField(raw.email, 254),
    message: textField(raw.message, 5000),
    clinicName: textField(raw.clinicName, 200),
    startMode: textField(raw.startMode, 120),
    currentPms: textField(raw.currentPms, 120),
    workflowGoal: textField(raw.workflowGoal, 120),
    requestType: textField(raw.requestType, 120),
    numChairs: numberField(raw.numChairs),
    timeline: textField(raw.timeline, 120),
    numLocations: numberField(raw.numLocations),
    numChairsTotal: numberField(raw.numChairsTotal),
    startDate: textField(raw.startDate, 120),
    role: textField(raw.role, 120),
    location: textField(raw.location, 200),
    providers: numberField(raw.providers),
    preferredTimes: textField(raw.preferredTimes, 1000),
    focus: textField(raw.focus, 120),
    sourcePage: textField(raw.sourcePage, 120),
    website: textField(raw.website, 200),
  };
}

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

const SOURCE_LABELS: Record<string, string> = {
  "dfi-synergy": "DFI Synergy · April 2026 Plato-connected pilot evidence",
  pricing: "Guided pilot pricing",
  "solo-clinic": "One-clinic guide",
  "clinic-group": "Clinic-group guide",
  integrations: "Connections guide",
  switching: "Switching & setup guide",
  security: "Security & compliance overview",
  status: "Capability status snapshot",
  about: "About Oralstack",
};

const START_MODE_LABELS: Record<string, string> = {
  "new-clinic": "Start a new clinic with no existing system",
  "paper-spreadsheets": "Move from paper or spreadsheets",
  "existing-pms": "Move from an existing clinic system",
  "plato-connected": "Keep Plato connected",
  exploring: "Still exploring",
};

const SECURITY_REQUEST_LABELS: Record<string, string> = {
  "security-questionnaire": "Security questionnaire",
  "controls-walkthrough": "Controls walkthrough",
  "evidence-pack": "Current security evidence pack",
  "product-agreement": "Product agreement",
  "data-processing-terms": "Data processing terms",
  "subprocessor-information": "Deployment-specific subprocessors",
  "deployment-status": "Current deployment confirmation",
  other: "Another procurement question",
};

function sourceLabel(sourcePage: string | undefined): string | undefined {
  return sourcePage && Object.hasOwn(SOURCE_LABELS, sourcePage)
    ? SOURCE_LABELS[sourcePage]
    : undefined;
}

function securityRequestLabel(requestType: string | undefined): string | undefined {
  return requestType && Object.hasOwn(SECURITY_REQUEST_LABELS, requestType)
    ? SECURITY_REQUEST_LABELS[requestType]
    : undefined;
}

function startModeLabel(startMode: string | undefined): string | undefined {
  return startMode && Object.hasOwn(START_MODE_LABELS, startMode)
    ? START_MODE_LABELS[startMode]
    : undefined;
}

function buildEmail(p: ContactPayload): { subject: string; html: string; text: string } {
  const intentLabel: Record<Intent, string> = {
    question: "Quick question",
    migration: "Switching & setup assessment",
    pilot: "Pilot proposal request",
    security: "Security review request",
    demo: "Demo request",
  };
  const source = sourceLabel(p.sourcePage);
  const securityRequest = securityRequestLabel(p.requestType);
  const startMode = startModeLabel(p.startMode);
  const subjectName = p.name?.replace(/[\r\n]+/g, " ") ?? "(no name)";
  const subject = `[oralstack contact] ${intentLabel[p.intent]} — ${subjectName}`;
  const rows = [
    row("Intent", intentLabel[p.intent]),
    row("Request source", source),
    row("Name", p.name),
    row("Role", p.role),
    row("Email", p.email),
    row("Clinic name", p.clinicName),
    row("How the clinic wants to start", startMode),
    row("Location", p.location),
    row("Current clinic system", p.currentPms),
    row("Workflow to improve first", p.workflowGoal),
    row("Security review request", securityRequest),
    row("# chairs", p.numChairs),
    row("# providers", p.providers),
    row("Preferred times", p.preferredTimes),
    row("Walkthrough focus", p.focus),
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
    source && `Request source: ${source}`,
    p.name && `Name: ${p.name}`,
    p.role && `Role: ${p.role}`,
    p.email && `Email: ${p.email}`,
    p.clinicName && `Clinic: ${p.clinicName}`,
    startMode && `How the clinic wants to start: ${startMode}`,
    p.location && `Location: ${p.location}`,
    p.currentPms && `Current clinic system: ${p.currentPms}`,
    p.workflowGoal && `Workflow to improve first: ${p.workflowGoal}`,
    securityRequest && `Security review request: ${securityRequest}`,
    p.numChairs && `# chairs: ${p.numChairs}`,
    p.providers && `# providers: ${p.providers}`,
    p.preferredTimes && `Preferred times: ${p.preferredTimes}`,
    p.focus && `Walkthrough focus: ${p.focus}`,
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
  if (!p.intent || !["question", "migration", "pilot", "security", "demo"].includes(p.intent)) {
    return "Missing or invalid intent.";
  }
  if (!p.name || p.name.trim().length < 2) return "Please enter your name.";
  if (!p.email || !EMAIL_RE.test(p.email)) return "Please enter a valid email.";
  if (p.intent === "question" && (!p.message || p.message.trim().length < 10)) {
    return "Please write a question (at least 10 characters).";
  }
  if (p.intent === "migration") {
    if (!p.clinicName) return "Please tell us your clinic name.";
    if (!p.currentPms) return "Please pick your current clinic system.";
  }
  if (p.startMode && !startModeLabel(p.startMode)) {
    return "Please pick a valid clinic starting point.";
  }
  if (p.intent === "pilot") {
    if (!p.clinicName) return "Please tell us your clinic / group name.";
    if (!p.numLocations) return "Please tell us how many locations.";
    const locationCount = Number(p.numLocations);
    if (!Number.isInteger(locationCount) || locationCount < 1) {
      return "Please enter at least one whole location.";
    }
  }
  if (p.intent === "security") {
    if (!p.clinicName) return "Please tell us your organization or clinic name.";
    if (!p.role) return "Please tell us your role or team.";
    if (!p.requestType || !securityRequestLabel(p.requestType)) {
      return "Please choose what your review needs.";
    }
    if (!p.timeline) return "Please choose a review timeline.";
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
  let res: Response;
  try {
    res = await fetch("https://api.resend.com/emails", {
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
  } catch {
    console.error("[contact] Resend request failed before provider acceptance.");
    return bad("Online delivery is temporarily unavailable. Your request was not sent.", 502);
  }
  if (!res.ok) {
    console.error("[contact] Resend rejected the send.", res.status);
    return bad("Online delivery is temporarily unavailable. Your request was not sent.", 502);
  }
  const successMessage: Record<Intent, string> = {
    question: "Question received. We'll reply by email.",
    migration: "Setup assessment received. We'll reply with the questions for the next step.",
    pilot: "Pilot request received. We'll reply with the setup questions needed to scope it.",
    security:
      "Security review request received. We'll reply with the current evidence boundary and next step.",
    demo: "Demo request received. We'll reply with availability and any setup questions.",
  };
  return ok(successMessage[p.intent]);
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let raw: Record<string, unknown>;
  try {
    raw = (await request.json()) as Record<string, unknown>;
  } catch {
    return bad("Could not parse request body.");
  }

  const payload = normalizePayload(raw);

  // Honeypot: bots fill the hidden `website` field; real users never see it.
  if (payload.website && payload.website.trim() !== "") {
    // Pretend success so the bot doesn't retry.
    return ok("Message received.");
  }

  const error = validate(payload);
  if (error) return bad(error);

  if (!env.RESEND_API_KEY) {
    console.error("[contact] RESEND_API_KEY is not configured; request was not sent.");
    return bad("Online delivery is temporarily unavailable. Your request was not sent.", 503);
  }

  return sendViaResend(env, payload);
};

export const onRequest: PagesFunction = () =>
  new Response("Method Not Allowed", {
    status: 405,
    headers: { Allow: "POST" },
  });
