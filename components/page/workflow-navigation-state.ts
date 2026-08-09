export const WORKFLOW_CHANGE_EVENT = "oralstack:workflow-change";
export const WORKFLOW_DESKTOP_MEDIA_QUERY = "(min-width: 80rem)";

export type WorkflowChangeDetail = {
  behavior: ScrollBehavior;
};

export function preferredWorkflowScrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}

export function publishWorkflowChange(slug: string, behavior: ScrollBehavior) {
  if (window.location.hash !== `#${slug}`) {
    window.history.pushState(null, "", `#${slug}`);
  }

  window.dispatchEvent(
    new CustomEvent<WorkflowChangeDetail>(WORKFLOW_CHANGE_EVENT, {
      detail: { behavior },
    }),
  );
}

export function workflowChangeBehavior(event?: Event): ScrollBehavior {
  if (event instanceof CustomEvent) {
    const detail = event.detail as Partial<WorkflowChangeDetail> | undefined;
    if (detail?.behavior === "smooth" || detail?.behavior === "auto") {
      return detail.behavior;
    }
  }

  return "auto";
}
