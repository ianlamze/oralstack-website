import Section from "@/components/primitives/Section";
import Wordmark from "@/components/sections/Wordmark";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)]">
      <Section className="py-12 md:py-16">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <Wordmark size="md" />
            <p className="mt-3 text-xs text-[var(--color-text-muted)] max-w-[36ch] leading-relaxed">
              The operating system for modern dental clinics.
            </p>
          </div>

          <FooterColumn
            title="Product"
            links={[
              { label: "Workflows", href: "/workflows" },
              { label: "Integrations", href: "/integrations" },
              { label: "Pricing", href: "/pricing" },
              { label: "Compare", href: "/compare" },
              { label: "Changelog", href: "/changelog" },
            ]}
          />

          <FooterColumn
            title="Solutions"
            links={[
              { label: "For solo & small clinics", href: "/for-solo-clinics" },
              { label: "For multi-clinic & DSO", href: "/for-multi-clinic" },
              { label: "Customers", href: "/customers" },
              { label: "Articles", href: "/articles" },
              { label: "References", href: "/lead-magnets" },
              { label: "FAQ", href: "/faq" },
            ]}
          />

          <FooterColumn
            title="Company"
            links={[
              { label: "About", href: "/about" },
              { label: "Security", href: "/security" },
              { label: "Contact", href: "/contact" },
              { label: "Privacy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
            ]}
          />
        </div>

        <p className="mt-12 text-xs text-[var(--color-text-soft)]">
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
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
        {title}
      </p>
      <ul className="mt-4 grid gap-2.5 text-sm text-[var(--color-text-muted)]">
        {links.map((l) => (
          <li key={l.href}>
            <a className="hover:text-[var(--color-text)]" href={l.href}>
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
