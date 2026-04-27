import type { Customer } from "@/content/customers";

const statusLabels: Record<Customer["status"], string> = {
  live: "Live",
  pilot: "Pilot",
  "in-conversation": "In conversation",
};

const statusStyles: Record<Customer["status"], string> = {
  live: "bg-[color-mix(in_oklch,var(--color-sea),white_70%)] text-[var(--color-text)]",
  pilot: "bg-[color-mix(in_oklch,var(--color-sunset),white_72%)] text-[var(--color-text)]",
  "in-conversation": "bg-[var(--color-canvas-tinted)] text-[var(--color-text-muted)]",
};

type CustomerCardProps = {
  customer: Customer;
};

export default function CustomerCard({ customer }: CustomerCardProps) {
  const isLinked = Boolean(customer.caseStudySlug);
  const inner = (
    <article className="grid gap-5 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-7 md:p-8 h-full transition-colors duration-150 hover:border-[var(--color-border-strong)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
            {customer.location}
          </p>
          <h3 className="mt-2 text-xl md:text-2xl font-semibold tracking-tight">{customer.name}</h3>
        </div>
        <span
          className={`text-xs font-medium uppercase tracking-[0.12em] rounded-full px-2.5 py-1 whitespace-nowrap ${statusStyles[customer.status]}`}
        >
          {statusLabels[customer.status]}
        </span>
      </div>

      <p className="text-[var(--color-text-muted)] leading-relaxed">{customer.blurb}</p>

      {(customer.size || customer.specialty) && (
        <p className="text-xs text-[var(--color-text-soft)] tracking-[0.04em]">
          {[customer.specialty, customer.size].filter(Boolean).join(" · ")}
        </p>
      )}

      {isLinked && (
        <p className="text-sm font-medium text-[var(--color-accent-deep)]">Read the case study →</p>
      )}
    </article>
  );

  if (isLinked) {
    return (
      <a href={`/customers/${customer.caseStudySlug}`} className="block h-full">
        {inner}
      </a>
    );
  }
  return inner;
}
