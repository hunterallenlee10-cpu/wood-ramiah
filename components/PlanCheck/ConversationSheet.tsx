"use client";

import { useEffect, useRef, useState } from "react";
import { Printer } from "lucide-react";
import { Monogram } from "@/components/Monogram";
import { readout, type ListItem } from "@/lib/plan-check";

type Props = {
  items: ListItem[];
  onBring: () => void;
  onPrint: () => void;
  idPrefix?: string;
};

type Rendered = ListItem & { leaving?: boolean };

/**
 * "Your conversation list": a bond-white document that grows as questions are answered.
 * Motion (2 of 2): each new item fades up 4px over 200ms and a navy hairline draws under it over 300ms.
 */

export function ConversationSheet({ items, onBring, onPrint, idPrefix = "sheet" }: Props) {
  const count = items.length;
  // Items present on first render never animate; later additions write on, removals fade out.
  const initialIds = useRef(new Set(items.map((i) => i.id)));
  const [rendered, setRendered] = useState<Rendered[]>(items);

  useEffect(() => {
    const ids = new Set(items.map((i) => i.id));
    setRendered((prev) => {
      const next: Rendered[] = [...items];
      prev.forEach((p, idx) => {
        if (!ids.has(p.id)) next.splice(Math.min(idx, next.length), 0, { ...p, leaving: true });
      });
      return next;
    });
    const t = setTimeout(() => setRendered(items), 130);
    return () => clearTimeout(t);
  }, [items]);

  let n = 0;

  return (
    <div className="sheet px-6 pb-7 pt-10 md:px-9 md:pb-9 md:pt-12">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="smallcaps text-[12px] text-muted">Prepared for your consultation</p>
          <h3 id={`${idPrefix}-title`} className="mt-2 font-display text-[34px] font-medium italic leading-[1.05] text-navy md:text-[40px]">
            Your conversation list
          </h3>
        </div>
        <Monogram size={44} className="shrink-0" />
      </div>

      <div aria-live="polite" aria-relevant="additions removals" aria-labelledby={`${idPrefix}-title`}>
        <ol className="mt-6">
          {rendered.map((item) => {
            const animate = !initialIds.current.has(item.id);
            if (!item.leaving) n += 1;
            return (
              <li
                key={item.id}
                aria-hidden={item.leaving || undefined}
                className={`relative py-3.5 ${item.leaving ? "pc-leave" : animate ? "pc-enter" : ""}`}
              >
                <div className="flex gap-4">
                  <span className="w-7 shrink-0 pt-[2px] font-display text-[22px] font-semibold leading-none text-navy/70" aria-hidden>
                    {item.leaving ? "" : String(n).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold leading-snug text-ink">
                      {item.text}
                      {item.toDiscuss && (
                        <span className="ml-2 inline-block translate-y-[-1px] rounded-[2px] border border-rule bg-paper px-1.5 py-[1px] align-middle text-[13px] font-semibold uppercase tracking-[0.08em] text-muted">
                          to discuss
                        </span>
                      )}
                    </p>
                    {item.note && <p className="mt-1 text-[16px] leading-snug text-muted">{item.note}</p>}
                  </div>
                </div>
                <span aria-hidden className={`absolute inset-x-0 bottom-0 h-px origin-left bg-navy/45 ${animate ? "pc-rule" : ""}`} />
              </li>
            );
          })}
        </ol>
        <p className="mt-6 border-l-2 border-navy pl-4 font-display text-[26px] font-medium italic leading-[1.2] text-navy">
          {readout(count)}
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
        <button type="button" aria-haspopup="dialog" onClick={onBring} className="btn btn-primary w-full sm:w-auto">
          Bring this list to a consultation
        </button>
        <button type="button" onClick={onPrint} className="textlink justify-center whitespace-nowrap sm:justify-start">
          <Printer size={18} strokeWidth={1.5} aria-hidden />
          Print this list
        </button>
      </div>
    </div>
  );
}
