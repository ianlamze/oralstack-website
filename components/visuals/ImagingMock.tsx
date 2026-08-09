type Asset = {
  kind: "xray" | "photo" | "document";
  category: string;
  label: string;
  date: string;
};

const assets: Asset[] = [
  { kind: "xray", category: "X-ray", label: "Bitewing · 16–17", date: "22 Apr" },
  { kind: "photo", category: "Photo", label: "Anterior view", date: "22 Apr" },
  { kind: "xray", category: "X-ray", label: "Pano", date: "14 Apr" },
  { kind: "document", category: "Consent", label: "Implant consent.pdf", date: "10 Apr" },
];

const categoryStyles: Record<string, string> = {
  "X-ray":
    "bg-[color-mix(in_oklch,var(--color-violet),white_82%)] text-[color-mix(in_oklch,var(--color-violet),var(--color-ink)_45%)]",
  Photo:
    "bg-[color-mix(in_oklch,var(--color-sea),white_70%)] text-[color-mix(in_oklch,var(--color-sea),var(--color-ink)_55%)]",
  Consent: "bg-[var(--color-canvas-tinted)] text-[var(--color-text-muted)]",
};

function Thumbnail({ kind }: { kind: Asset["kind"] }) {
  if (kind === "xray") {
    return (
      <div
        aria-hidden
        className="aspect-[4/3] rounded-md overflow-hidden relative"
        style={{
          background: "radial-gradient(circle at 40% 50%, #2a3142 0%, #15192C 60%, #0a0d18 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(ellipse at 38% 55%, rgba(220,210,190,0.35) 0%, rgba(220,210,190,0) 35%), radial-gradient(ellipse at 60% 50%, rgba(220,210,190,0.30) 0%, rgba(220,210,190,0) 40%)",
          }}
        />
        <div
          className="absolute inset-x-3 bottom-3 h-px"
          style={{ background: "rgba(255,255,255,0.18)" }}
        />
      </div>
    );
  }
  if (kind === "photo") {
    return (
      <div
        aria-hidden
        className="aspect-[4/3] rounded-md overflow-hidden relative"
        style={{
          background:
            "linear-gradient(140deg, color-mix(in oklch, var(--color-sunset), white 50%), color-mix(in oklch, var(--color-sunset-deep), var(--color-ink) 35%))",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 60%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 45%)",
          }}
        />
      </div>
    );
  }
  return (
    <div
      aria-hidden
      className="aspect-[4/3] rounded-md flex items-center justify-center bg-[var(--color-canvas-tinted)] border border-[var(--color-border)]"
    >
      <div className="grid gap-1">
        <div className="h-1 w-10 rounded bg-[var(--color-border-strong)]" />
        <div className="h-1 w-14 rounded bg-[var(--color-border-strong)]" />
        <div className="h-1 w-8 rounded bg-[var(--color-border-strong)]" />
      </div>
    </div>
  );
}

export default function ImagingMock() {
  return (
    <div
      role="img"
      aria-label="Illustrative oralstack imaging surface: 2x2 grid of patient assets — bitewing X-ray, intraoral photo, panoramic X-ray, and a consent document."
      className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-4 sm:p-5 md:p-6 max-w-[480px] shadow-[0_1px_0_rgba(0,0,0,0.02),0_18px_60px_-30px_rgba(20,30,60,0.18)]"
    >
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[var(--color-text-soft)] gap-3">
        <span>Imaging · Visit timeline</span>
        <span className="text-[var(--color-text-muted)] normal-case tracking-normal text-right">
          Demo patient 102 · 4 assets
        </span>
      </div>

      <ul className="mt-5 grid grid-cols-2 gap-3 sm:gap-4">
        {assets.map((a, i) => (
          <li key={i} className="grid gap-2">
            <div className="relative">
              <Thumbnail kind={a.kind} />
              <span
                className={`absolute top-2 left-2 inline-flex items-center text-[9px] font-medium uppercase tracking-[0.12em] rounded-full px-1.5 py-0.5 ${categoryStyles[a.category]}`}
              >
                {a.category}
              </span>
            </div>
            <div className="grid gap-0.5">
              <p className="text-xs font-medium text-[var(--color-text)] truncate">{a.label}</p>
              <p className="text-[10px] text-[var(--color-text-soft)] tabular-nums">
                {a.date} · DICOM
              </p>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-[10px] text-[var(--color-text-soft)] tracking-[0.04em] border-t border-[var(--color-border)] pt-3">
        Drag-drop upload · sensor-bridge · DICOM C-STORE / C-FIND
      </p>
    </div>
  );
}
