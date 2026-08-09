type Message = {
  from: "patient" | "clinic";
  text: string;
  time: string;
  status?: "sent" | "delivered" | "read";
};

const conversation: Message[] = [
  {
    from: "clinic",
    text: "Hi Wei Jian — you're due for your six-month hygiene visit. Want to book one this week?",
    time: "Mon · 2:31 PM",
    status: "read",
  },
  {
    from: "patient",
    text: "Yes please. Thursday afternoon if possible 🙏",
    time: "Mon · 2:33 PM",
  },
  {
    from: "clinic",
    text: "Booked: Thu 2 May, 3:00 PM with Provider B. Confirmation + intake form sent. See you soon.",
    time: "Mon · 2:34 PM",
    status: "delivered",
  },
];

const statusLabel: Record<NonNullable<Message["status"]>, string> = {
  sent: "Sent",
  delivered: "Delivered",
  read: "Read",
};

export default function MessagingMock() {
  return (
    <div
      role="img"
      aria-label="Illustrative oralstack patient messaging: a WhatsApp Business recall conversation with the clinic confirming a hygiene appointment with Demo patient 101."
      className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-4 sm:p-5 md:p-6 max-w-[440px] shadow-[0_1px_0_rgba(0,0,0,0.02),0_18px_60px_-30px_rgba(20,30,60,0.18)]"
    >
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[var(--color-text-soft)] gap-3">
        <span>Recall · WhatsApp Business</span>
        <span className="text-[var(--color-text-muted)] normal-case tracking-normal text-right">
          Templated
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between border-b border-[var(--color-border)] pb-3">
        <div className="flex items-center gap-2.5">
          <div
            aria-hidden
            className="h-7 w-7 rounded-full bg-[var(--color-canvas-tinted)] flex items-center justify-center text-[10px] font-medium text-[var(--color-text-muted)]"
          >
            LW
          </div>
          <div className="grid gap-0.5">
            <p className="text-sm font-medium text-[var(--color-text)] leading-tight">
              Demo patient 101
            </p>
            <p className="text-[10px] text-[var(--color-text-soft)] tabular-nums">
              +65 0000 0000 · DEMO-1042
            </p>
          </div>
        </div>
      </div>

      <ul className="mt-4 grid gap-3">
        {conversation.map((m, i) => {
          const isClinic = m.from === "clinic";
          return (
            <li key={i} className={`flex flex-col ${isClinic ? "items-end" : "items-start"} gap-1`}>
              <div
                className={`max-w-[85%] rounded-[14px] px-3 py-2 text-[13px] leading-snug ${
                  isClinic
                    ? "bg-[color-mix(in_oklch,var(--color-sunset),white_72%)] text-[var(--color-text)] rounded-br-[4px]"
                    : "bg-[var(--color-canvas-tinted)] text-[var(--color-text)] rounded-bl-[4px]"
                }`}
              >
                {m.text}
              </div>
              <div
                className={`flex items-center gap-1.5 text-[10px] text-[var(--color-text-soft)] tabular-nums ${
                  isClinic ? "flex-row-reverse" : ""
                }`}
              >
                <span>{m.time}</span>
                {m.status && (
                  <span aria-hidden className="opacity-70">
                    · {statusLabel[m.status]}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <p className="mt-4 text-[10px] text-[var(--color-text-soft)] tracking-[0.04em] border-t border-[var(--color-border)] pt-3">
        WhatsApp Business API · Singapore-region routing · audit-logged
      </p>
    </div>
  );
}
