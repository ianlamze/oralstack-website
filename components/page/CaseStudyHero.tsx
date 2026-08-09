import Section from "@/components/primitives/Section";
import type { CaseStudy } from "@/content/case-studies/types";

type CaseStudyHeroProps = {
  study: CaseStudy;
};

export default function CaseStudyHero({ study }: CaseStudyHeroProps) {
  const { eyebrow, title, outcome, profile } = study;

  return (
    <Section className="pt-16 md:pt-20 pb-16">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
            {eyebrow}
          </p>
          <h1 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.08] text-balance">
            {title}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-[var(--color-text-muted)] leading-relaxed max-w-[58ch]">
            {outcome}
          </p>
        </div>

        <aside className="lg:border-l lg:border-[var(--color-border)] lg:pl-10 grid gap-5 self-start">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
            Profile
          </p>
          <dl className="grid gap-4 text-sm">
            <ProfileRow label="Location" value={profile.location} />
            {profile.specialty && <ProfileRow label="Specialty" value={profile.specialty} />}
            {profile.chairs && (
              <ProfileRow
                label="Size"
                value={`${profile.chairs} chair${profile.chairs === 1 ? "" : "s"}${profile.providers ? ` · ${profile.providers} providers` : ""}`}
              />
            )}
            <ProfileRow label="Pilot start" value={profile.pilotStart} />
            <ProfileRow label="Pilot scope" value={profile.inProduction.join(" · ")} />
            {profile.notYet && profile.notYet.length > 0 && (
              <ProfileRow label="Not included" value={profile.notYet.join(" · ")} muted />
            )}
          </dl>
        </aside>
      </div>
    </Section>
  );
}

function ProfileRow({
  label,
  value,
  muted = false,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="grid gap-1">
      <dt className="text-xs uppercase tracking-[0.14em] text-[var(--color-text-soft)]">{label}</dt>
      <dd
        className={muted ? "text-[var(--color-text-soft)]" : "text-[var(--color-text)] font-medium"}
      >
        {value}
      </dd>
    </div>
  );
}
