import Section from "@/components/primitives/Section";
import Wordmark from "@/components/ui/Wordmark";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-sidebar-border)] bg-[var(--color-sidebar)] text-[var(--color-sidebar-foreground)]">
      <Section className="py-12 md:py-16">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <Wordmark size="md" tone="inverse" />
            <p className="mt-3 max-w-[36ch] text-xs leading-relaxed text-[color-mix(in_srgb,var(--color-sidebar-foreground)_60%,transparent)]">
              The Plato-connected clinic workspace for the front desk, chairside team and practice
              manager.
            </p>
          </div>

          <FooterColumn
            title="Product"
            links={[
              { label: "Run the day", href: "/workflows#run-the-day" },
              { label: "Patient care", href: "/workflows#patient-care" },
              { label: "Checkout & money", href: "/workflows#checkout-money" },
              { label: "Patient access", href: "/workflows#patient-access" },
              { label: "Clinic operations", href: "/workflows#clinic-operations" },
              { label: "Insights", href: "/workflows#insights" },
              { label: "Organization & security", href: "/workflows#organization-security" },
            ]}
          />

          <FooterColumn
            title="Resources"
            links={[
              { label: "Customers", href: "/customers" },
              { label: "Integrations", href: "/integrations" },
              { label: "Pricing", href: "/pricing" },
              { label: "Changelog", href: "/changelog" },
              { label: "FAQ", href: "/faq" },
            ]}
          />

          <FooterColumn
            title="Trust & company"
            links={[
              { label: "Security & compliance", href: "/security" },
              { label: "Status", href: "/status" },
              { label: "Accessibility", href: "/accessibility" },
              { label: "Privacy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
            ]}
          />
        </div>

        <p className="mt-12 text-xs text-[color-mix(in_srgb,var(--color-sidebar-foreground)_48%,transparent)]">
          © {new Date().getFullYear()} Oralstack
        </p>
      </Section>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-[color-mix(in_srgb,var(--color-sidebar-foreground)_48%,transparent)]">
        {title}
      </p>
      <ul className="mt-4 grid gap-2.5 text-sm text-[color-mix(in_srgb,var(--color-sidebar-foreground)_66%,transparent)]">
        {links.map((l) => (
          <li key={l.href}>
            <a
              className="transition-colors hover:text-[var(--color-sidebar-foreground)]"
              href={l.href}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
