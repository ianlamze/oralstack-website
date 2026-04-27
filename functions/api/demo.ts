/// <reference types="@cloudflare/workers-types" />
// Cloudflare Pages Function — POST /api/demo
//
// Receives the demo-request form payload, validates, and forwards to a
// transactional email service (Resend). To activate:
//
//   1. Sign up at resend.com, verify oralstack.com sending domain.
//   2. In Cloudflare dashboard → Pages → oralstack → Settings →
//      Environment variables, set RESEND_API_KEY (encrypted).
//      Optionally set DEMO_FROM_EMAIL (default: demo@oralstack.com)
//      and DEMO_TO_EMAIL (default: hello@oralstack.com).
//   3. Set NEXT_PUBLIC_DEMO_FORM_ENDPOINT=/api/demo in .env.local
//      and redeploy. The DemoRequestForm will POST here automatically.
//
// Until RESEND_API_KEY is set, this function returns 503 — the form
// component falls back to mailto behaviour because no endpoint env var
// is configured.

interface Env {
  RESEND_API_KEY?: string;
  DEMO_FROM_EMAIL?: string;
  DEMO_TO_EMAIL?: string;
}

interface DemoPayload {
  clinic?: string;
  name?: string;
  role?: string;
  email?: string;
  location?: string;
  chairs?: string;
  providers?: string;
  currentPms?: string;
  preferredTimes?: string;
  notes?: string;
}

const REQUIRED_FIELDS = ["clinic", "name", "role", "email", "location", "chairs"] as const;

function jsonResponse(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store",
    },
  });
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function buildEmail(payload: DemoPayload) {
  const candidates: Array<[string, string | undefined]> = [
    ["Clinic", payload.clinic],
    ["Name", payload.name],
    ["Role", payload.role],
    ["Email", payload.email],
    ["Location", payload.location],
    ["Chairs", payload.chairs],
    ["Providers", payload.providers],
    ["Current PMS", payload.currentPms],
    ["Preferred times", payload.preferredTimes],
    ["Notes", payload.notes],
  ];

  const lines: Array<[string, string]> = [];
  for (const [k, v] of candidates) {
    if (v && v.trim().length > 0) lines.push([k, v]);
  }

  const text = lines.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = lines
    .map(
      ([k, v]) =>
        `<p><strong>${escapeHtml(k)}:</strong> ${escapeHtml(v).replaceAll("\n", "<br>")}</p>`,
    )
    .join("");

  return { text, html };
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  if (!env.RESEND_API_KEY) {
    return jsonResponse(503, {
      ok: false,
      error: "Email service not configured. Set RESEND_API_KEY in Pages env vars.",
    });
  }

  let payload: DemoPayload;
  try {
    payload = (await request.json()) as DemoPayload;
  } catch {
    return jsonResponse(400, { ok: false, error: "Invalid JSON payload." });
  }

  const missing = REQUIRED_FIELDS.filter((f) => !payload[f]?.trim());
  if (missing.length) {
    return jsonResponse(400, {
      ok: false,
      error: `Missing required fields: ${missing.join(", ")}`,
    });
  }

  if (!/^\S+@\S+\.\S+$/.test(payload.email ?? "")) {
    return jsonResponse(400, { ok: false, error: "Invalid email address." });
  }

  const fromEmail = env.DEMO_FROM_EMAIL ?? "demo@oralstack.com";
  const toEmail = env.DEMO_TO_EMAIL ?? "hello@oralstack.com";
  const { text, html } = buildEmail(payload);

  try {
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: payload.email,
        subject: `Demo request — ${payload.clinic}`,
        text,
        html,
      }),
    });

    if (!resendRes.ok) {
      const detail = await resendRes.text();
      return jsonResponse(502, {
        ok: false,
        error: "Email service rejected the request.",
        detail: detail.slice(0, 500),
      });
    }
  } catch (err) {
    return jsonResponse(502, {
      ok: false,
      error: `Email service unreachable: ${err instanceof Error ? err.message : "unknown"}`,
    });
  }

  return jsonResponse(200, { ok: true });
};
