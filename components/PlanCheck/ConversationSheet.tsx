"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Printer } from "lucide-react";
import { Monogram } from "@/components/Monogram";
import { readout, type ListItem } from "@/lib/plan-check";

type Props = {
  items: ListItem[];
  onBring: () => void;
  onPrint: () => void;
  idPrefix?: string;
};

/**
 * "Your conversation list": a bond-white document that grows as questions are answered.
 * Motion (2 of 2): each new item fades up 4px over 200ms and a navy hairline draws under it over 300ms.
 */
export function ConversationSheet({ items, onBring, onPrint, idPrefix = "sheet" }: Props) {
  const reduce = useReducedMotion();
  const count = items.length;

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
          <AnimatePresence initial={false}>
            {items.map((item, i) => (
              <motion.li
                key={item.id}
                initial={reduce ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, transition: { duration: 0.12 } }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="relative py-3.5"
              >
                <div className="flex gap-4">
                  <span className="w-7 shrink-0 pt-[2px] font-display text-[22px] font-semibold leading-none text-navy/70" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
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
                <motion.span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-px origin-left bg-navy/45"
                  initial={reduce ? false : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1], delay: reduce ? 0 : 0.05 }}
                />
              </motion.li>
            ))}
          </AnimatePresence>
        </ol>
        <p className="mt-6 border-l-2 border-navy pl-4 font-display text-[26px] font-medium italic leading-[1.2] text-navy">
          {readout(count)}
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
        <button type="button" aria-haspopup="dialog" onClick={onBring} className="btn btn-primary w-full sm:w-auto">
          Bring this list to a consultation
        </button>
        <button type="button" onClick={onPrint} className="textlink justify-center sm:justify-start">
          <Printer size={18} strokeWidth={1.5} aria-hidden />
          Print this list
        </button>
      </div>
    </div>
  );
}
