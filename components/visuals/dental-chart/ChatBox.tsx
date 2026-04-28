"use client";

import { forwardRef, useMemo } from "react";
import { Mic } from "lucide-react";
import { parseChartText, type ParsedChartCommand } from "@/content/charting/parser";
import { CONDITION_COLORS, CONDITION_LABELS, formatSurfaceCodes } from "@/content/charting/types";

interface ChatBoxProps {
  value: string;
  onChange: (value: string) => void;
  onApply: () => void;
  onDictate?: () => void;
  isListening?: boolean;
}

const ChatBox = forwardRef<HTMLTextAreaElement, ChatBoxProps>(function ChatBox(
  { value, onChange, onApply, onDictate, isListening = false },
  ref,
) {
  const isUndo = value.trim().toLowerCase() === "undo";
  const commands: ParsedChartCommand[] = useMemo(() => parseChartText(value), [value]);
  const canApply = isUndo || commands.length > 0;

  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-4">
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-text-soft)]">
            Dental chat box
          </p>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            Type chart commands here to update the odontogram live. This stays separate from your
            saved case notes.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onApply}
            disabled={!canApply}
            className="rounded-full bg-[var(--color-ink)] px-4 py-2 text-sm font-medium text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isUndo ? "Undo last action" : "Apply to chart"}
          </button>
          {onDictate && (
            <button
              type="button"
              onClick={onDictate}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-text)] hover:border-[var(--color-border-strong)]"
            >
              <Mic className="h-4 w-4" />
              {isListening ? "Stop dictation" : "Start dictation"}
            </button>
          )}
        </div>

        <textarea
          ref={ref}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (
              event.key === "Enter" &&
              !event.shiftKey &&
              !event.nativeEvent.isComposing &&
              canApply
            ) {
              event.preventDefault();
              onApply();
            }
          }}
          rows={6}
          placeholder={"24MO composite filling\n38 missing\nextract 11\nundo"}
          className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] px-3 py-3 text-sm outline-none transition-colors focus:border-[var(--color-tide-deep)] focus:bg-white"
        />

        <div className="flex flex-wrap gap-2 min-h-[28px]">
          {commands.map((cmd, index) => (
            <span
              key={`${cmd.tooth}-${cmd.condition}-${index}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-white px-3 py-1 text-xs text-[var(--color-text)]"
            >
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: CONDITION_COLORS[cmd.condition] }}
              />
              {cmd.tooth}
              {cmd.surfaces.length > 0 ? formatSurfaceCodes(cmd.surfaces, cmd.tooth) : ""}
              <span className="text-[var(--color-text-soft)]">·</span>
              {CONDITION_LABELS[cmd.condition]}
            </span>
          ))}
          {isUndo && (
            <span className="rounded-full border border-[var(--color-sunset)] bg-[var(--color-canvas)] px-3 py-1 text-xs text-[var(--color-sunset-deep)]">
              Undo previous chart action
            </span>
          )}
          {value.trim() && commands.length === 0 && !isUndo && (
            <span className="text-xs text-[var(--color-text-soft)] self-center">
              No chart command detected yet.
            </span>
          )}
        </div>

        <p className="text-xs text-[var(--color-text-soft)]">
          Shortcut: press <kbd className="font-mono">/</kbd> to focus,{" "}
          <kbd className="font-mono">Enter</kbd> to apply, type{" "}
          <kbd className="font-mono">undo</kbd> to revert,{" "}
          <kbd className="font-mono">Shift+Enter</kbd> for a new line.
        </p>
      </div>
    </div>
  );
});

export default ChatBox;
