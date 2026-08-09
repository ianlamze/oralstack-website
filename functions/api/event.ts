// Vendor-agnostic event sink. POST { event, props, ts, path } from the
// client; we log it. Today the log goes to wrangler tail and Cloudflare's
// runtime logs (visible in the Pages dashboard). The payload is intentionally
// small and excludes form content, referrer, country, and user-agent data.
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
  "mgmt_period_changed",
  "mgmt_stat_focused",
  "mgmt_category_focused",
  "mgmt_heatmap_cell_focused",
  "mgmt_cta_click",
  "eod_investigate_clicked",
  "eod_mismatch_resolved",
  "eod_xero_sync_clicked",
  "eod_reset",
  "patient_comm_thread_opened",
  "patient_comm_template_picked",
  "patient_comm_message_sent",
]);

type EventPayload = {
  event: string;
  props?: Record<string, unknown>;
  ts?: number;
  path?: string;
};

const MAX_PROPS = 12;
const MAX_KEY_LENGTH = 40;
const MAX_STRING_LENGTH = 120;
const MAX_PATH_LENGTH = 240;

function isEventPayload(x: unknown): x is EventPayload {
  if (!x || typeof x !== "object") return false;
  const o = x as { event?: unknown };
  return typeof o.event === "string";
}

function record(payload: EventPayload): void {
  // Strip any properties beyond strings/numbers/booleans/null — defensive
  // against random payloads being sent at us.
  const safeProps: Record<string, string | number | boolean | null> = {};
  if (payload.props && typeof payload.props === "object") {
    for (const [key, value] of Object.entries(payload.props).slice(0, MAX_PROPS)) {
      if (!key || key.length > MAX_KEY_LENGTH || !/^[a-zA-Z0-9_]+$/.test(key)) continue;
      if (typeof value === "string") safeProps[key] = value.slice(0, MAX_STRING_LENGTH);
      else if (typeof value === "number" && Number.isFinite(value)) safeProps[key] = value;
      else if (typeof value === "boolean" || value === null) safeProps[key] = value;
    }
  }

  const safePath =
    typeof payload.path === "string" && payload.path.startsWith("/")
      ? payload.path.split(/[?#]/, 1)[0].slice(0, MAX_PATH_LENGTH)
      : null;

  const line = {
    event: payload.event,
    props: safeProps,
    ts: typeof payload.ts === "number" && Number.isFinite(payload.ts) ? payload.ts : Date.now(),
    path: safePath,
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
  ctx.waitUntil(Promise.resolve().then(() => record(body)));

  // 204 No Content — nothing for the client to do with the response.
  return new Response(null, { status: 204, headers: { "cache-control": "no-store" } });
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
