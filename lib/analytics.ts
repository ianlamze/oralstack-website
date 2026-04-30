// Vendor-agnostic event tracker for the interactive features on the marketing
// site. Calls fire-and-forget — the UI never waits, never errors out from
// analytics. The endpoint at /api/event currently just logs; later it can
// pipe to Cloudflare Analytics Engine, PostHog, Plausible, etc. without
// touching component code.

export type AnalyticsEvent =
  // Schedule mock
  | "schedule_drag_completed"
  | "schedule_drag_blocked"
  // Workflow wizard
  | "wizard_pain_picked"
  // Migration estimator
  | "estimator_input_changed"
  | "estimator_cta_click"
  // ROI calculator
  | "roi_input_changed"
  | "roi_cta_click"
  // Compare builder
  | "compare_capability_toggled"
  | "compare_competitor_toggled"
  // Checkout mock
  | "checkout_mode_picked"
  | "checkout_payment_taken"
  // Recall mock
  | "recall_sent"
  | "recall_sorted"
  // Odontogram mock
  | "odontogram_tooth_selected"
  // Treatment plan builder
  | "treatment_plan_procedure_added"
  | "treatment_plan_procedure_removed"
  | "treatment_plan_cta_click"
  // Waitlist auto-fill
  | "waitlist_cancel_simulated"
  | "waitlist_autofill_opened"
  | "waitlist_candidate_picked"
  | "waitlist_reset"
  // Perio chart
  | "perio_site_recorded"
  | "perio_bop_toggled"
  | "perio_reset"
  // Eligibility & estimate
  | "eligibility_chas_changed"
  | "eligibility_insurance_changed"
  | "eligibility_procedure_toggled"
  | "eligibility_cta_click"
  // Daily huddle
  | "huddle_pane_focused"
  | "huddle_cta_click"
  // Management report
  | "mgmt_period_changed"
  | "mgmt_stat_focused"
  | "mgmt_category_focused"
  | "mgmt_heatmap_cell_focused"
  | "mgmt_cta_click"
  // End-of-day reconciliation
  | "eod_investigate_clicked"
  | "eod_mismatch_resolved"
  | "eod_xero_sync_clicked"
  | "eod_reset"
  // Patient communication center
  | "patient_comm_thread_opened"
  | "patient_comm_template_picked"
  | "patient_comm_message_sent"
  // Online booking
  | "booking_reason_picked"
  | "booking_slot_picked"
  | "booking_phone_lookup"
  | "booking_completed"
  | "booking_reset"
  // Lab order tracking
  | "lab_order_opened"
  | "lab_order_advanced"
  | "lab_order_reschedule_clicked"
  | "lab_order_reset"
  // Insurance claims
  | "claim_opened"
  | "claim_submitted"
  | "claim_resubmitted"
  | "claim_reset"
  // Inventory
  | "inventory_item_opened"
  | "inventory_reorder_clicked"
  | "inventory_reset"
  // Sterilisation
  | "sterilization_load_opened"
  | "sterilization_spore_marked"
  | "sterilization_recall_notified"
  | "sterilization_reset"
  // Plan presentation
  | "plan_phase_toggled"
  | "plan_signed"
  | "plan_accepted"
  | "plan_reset"
  // Provider productivity
  | "provider_opened"
  | "provider_period_changed"
  // Reviews & referrals
  | "reviews_visit_opened"
  | "reviews_request_sent"
  | "reviews_reset"
  // Medical alerts
  | "alerts_patient_opened"
  | "alerts_acknowledged"
  | "alerts_reset"
  // Patient journey explorer
  | "journey_stage_selected"
  | "journey_stage_cta_click";

type Props = Record<string, string | number | boolean | null | undefined>;

const ENDPOINT = "/api/event";

/**
 * Fire-and-forget event track. Safe to call anywhere — never throws, never
 * blocks. No-ops on the server (useEffect / event handlers only).
 */
export function track(event: AnalyticsEvent, props: Props = {}): void {
  if (typeof window === "undefined") return;
  if (typeof navigator === "undefined") return;

  const payload = {
    event,
    props,
    ts: Date.now(),
    path: window.location.pathname,
    ref: document.referrer || null,
  };

  // Prefer sendBeacon — runs reliably during page-unload, doesn't block.
  // Fall back to fetch with keepalive for browsers that lack it (rare).
  try {
    const body = JSON.stringify(payload);
    if (typeof navigator.sendBeacon === "function") {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon(ENDPOINT, blob);
      return;
    }
    void fetch(ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {
      /* swallow */
    });
  } catch {
    /* swallow */
  }
}
