// Vendor-agnostic event sink. POST { event, props, ts, path, ref } from the
// client; we log it. Today the log goes to wrangler tail and Cloudflare's
// runtime logs (visible in the Pages dashboard). Later, swap the body of
// `record()` to write to Analytics Engine, forward to PostHog, etc.
//
// Inline the PagesFunction type so we don't need @cloudflare/workers-types
// at runtime (kept in line with functions/api/contact.ts pattern).
type EventContext<Env = Record<string, unknown>> = {
  request: Request;
  env: Env;
  waitUntil: (p: Promise<unknown>) => void;
};

type PagesFunction<Env = Record<string, unknown>> = (
  context: EventContext<Env>,
) => Response | Promise<Response>;

const ALLOWED_EVENTS = new Set([
  "schedule_drag_completed",
  "schedule_drag_blocked",
  "wizard_pain_picked",
  "estimator_input_changed",
  "estimator_cta_click",
  "roi_input_changed",
  "roi_cta_click",
  "compare_capability_toggled",
  "compare_competitor_toggled",
  "checkout_mode_picked",
  "checkout_payment_taken",
  "recall_sent",
  "recall_sorted",
  "odontogram_tooth_selected",
  "treatment_plan_procedure_added",
  "treatment_plan_procedure_removed",
  "treatment_plan_cta_click",
  "waitlist_cancel_simulated",
  "waitlist_autofill_opened",
  "waitlist_candidate_picked",
  "waitlist_reset",
  "perio_site_recorded",
  "perio_bop_toggled",
  "perio_reset",
  "eligibility_chas_changed",
  "eligibility_insurance_changed",
  "eligibility_procedure_toggled",
  "eligibility_cta_click",
  "huddle_pane_focused",
  "huddle_cta_click",
]);

type EventPayload = {
  event: string;
  props?: Record<string, unknown>;
  ts?: number;
  path?: string;
  ref?: string | null;
};

function isEventPayload(x: unknown): x is EventPayload {
  if (!x || typeof x !== "object") return false;
  const o = x as { event?: unknown };
  return typeof o.event === "string";
}

function record(payload: EventPayload, request: Request): void {
  // Strip any properties beyond strings/numbers/booleans/null — defensive
  // against random payloads being sent at us.
  const safeProps: Record<string, string | number | boolean | null> = {};
  if (payload.props && typeof payload.props === "object") {
    for (const [k, v] of Object.entries(payload.props)) {
      if (typeof v === "string" || typeof v === "number" || typeof v === "boolean" || v === null) {
        safeProps[k] = v;
      }
    }
  }

  const cf = (request as Request & { cf?: { country?: string } }).cf;

  const line = {
    event: payload.event,
    props: safeProps,
    ts: typeof payload.ts === "number" ? payload.ts : Date.now(),
    path: typeof payload.path === "string" ? payload.path : null,
    ref: typeof payload.ref === "string" ? payload.ref : null,
    country: cf?.country ?? null,
    ua: request.headers.get("user-agent") ?? null,
  };

  // Visible via `wrangler pages deployment tail` and the Pages dashboard.
  console.log("[event]", JSON.stringify(line));
}

export const onRequestPost: PagesFunction = async (ctx) => {
  let body: unknown;
  try {
    body = await ctx.request.json();
  } catch {
    return new Response("invalid json", { status: 400 });
  }

  if (!isEventPayload(body)) {
    return new Response("missing event field", { status: 400 });
  }

  if (!ALLOWED_EVENTS.has(body.event)) {
    return new Response("unknown event", { status: 400 });
  }

  // Run the record outside the request lifetime — fire-and-forget.
  ctx.waitUntil(Promise.resolve().then(() => record(body, ctx.request)));

  // 204 No Content — nothing for the client to do with the response.
  return new Response(null, { status: 204 });
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      "access-control-allow-methods": "POST, OPTIONS",
      "access-control-allow-headers": "content-type",
    },
  });
};
