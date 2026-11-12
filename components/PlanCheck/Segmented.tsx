"use client";

import { useRef, type KeyboardEvent } from "react";
import { answerLabels, answerOrder, type Answer } from "@/lib/plan-check";

type Props = {
  labelledBy: string;
  value: Answer | undefined;
  onChange: (a: Answer | undefined) => void;
};

/**
 * Yes · No · Not sure, as a radiogroup with a roving tabindex.
 * Arrow keys move and select, Home/End jump. Clicking the selected answer again clears it.
 */
export function Segmented({ labelledBy, value, onChange }: Props) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const focusIndex = value ? answerOrder.indexOf(value) : 0;

  const move = (to: number) => {
    const i = (to + answerOrder.length) % answerOrder.length;
    refs.current[i]?.focus();
    onChange(answerOrder[i]);
  };

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      move(i + 1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      move(i - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      move(0);
    } else if (e.key === "End") {
      e.preventDefault();
      move(answerOrder.length - 1);
    }
  };

  return (
    <div
      role="radiogroup"
      aria-labelledby={labelledBy}
      className="grid grid-cols-3 rounded-[2px] border border-navy/70 bg-paper/60 p-[3px]"
    >
      {answerOrder.map((a, i) => {
        const checked = value === a;
        return (
          <button
            key={a}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={checked}
            tabIndex={i === focusIndex ? 0 : -1}
            onClick={() => onChange(checked ? undefined : a)}
            onKeyDown={(e) => onKey(e, i)}
            className={`min-h-[46px] rounded-[1px] px-2 text-[17px] font-semibold transition-colors duration-150 ${
              checked ? "bg-navy text-paper shadow-[0_1px_2px_rgba(21,26,45,0.25)]" : "text-ink/80 hover:bg-navy/[0.06]"
            }`}
          >
            {answerLabels[a]}
          </button>
        );
      })}
    </div>
  );
}
