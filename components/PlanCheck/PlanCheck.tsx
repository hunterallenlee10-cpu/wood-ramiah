"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronUp } from "lucide-react";
import { buildList, questions, type Answer } from "@/lib/plan-check";
import { usePlanner } from "@/components/MatterPlanner/context";
import { Segmented } from "./Segmented";
import { ConversationSheet } from "./ConversationSheet";
import { PrintSheet } from "./PrintSheet";

export function PlanCheck() {
  const [answers, setAnswers] = useState<Partial<Record<string, Answer>>>({});
  const items = useMemo(() => buildList(answers), [answers]);
  const { openPlanner } = usePlanner();

  const questionsRef = useRef<HTMLOListElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const [questionsInView, setQuestionsInView] = useState(false);
  const [sheetInView, setSheetInView] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Mobile drawer: shown while the questions are on screen and the full sheet is not.
  useEffect(() => {
    const q = questionsRef.current;
    const s = sheetRef.current;
    if (!q || !s) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.target === q) setQuestionsInView(e.isIntersecting);
          if (e.target === s) setSheetInView(e.isIntersecting);
        }
      },
      { rootMargin: "0px 0px -120px 0px" },
    );
    io.observe(q);
    io.observe(s);
    return () => io.disconnect();
  }, []);

  const showDrawer = questionsInView && !sheetInView;
  useEffect(() => {
    if (!showDrawer) setDrawerOpen(false);
    // Lets the back-to-top button step aside while the drawer is up.
    if (showDrawer) document.documentElement.dataset.pcDrawer = "1";
    else delete document.documentElement.dataset.pcDrawer;
  }, [showDrawer]);

  const bring = () => {
    setDrawerOpen(false);
    openPlanner({ matter: "estate-plan", planList: items, source: "plan-check" });
  };
  const print = () => window.print();
  const answeredCount = Object.values(answers).filter(Boolean).length;

  return (
    <>
      <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
        <ol ref={questionsRef} className="grid content-start gap-4" aria-label="Five questions">
          {questions.map((q, i) => {
            const value = answers[q.id];
            return (
              <li
                key={q.id}
                className={`sheet px-5 pb-5 pt-9 transition-colors duration-200 md:px-7 md:pb-6 md:pt-10 ${
                  value ? "!border-navy/35" : ""
                }`}
              >
                <div className="flex gap-4">
                  <span className="font-display text-[30px] font-semibold leading-[0.9] text-navy" aria-hidden>
                    {i + 1}
                  </span>
                  <p id={`pc-q-${q.id}`} className="pt-0.5 text-[18px] font-semibold leading-snug text-ink md:text-[19px]">
                    <span className="sr-only">Question {i + 1} of 5. </span>
                    {q.text}
                  </p>
                </div>
                <div className="mt-4 md:pl-[38px]">
                  <Segmented
                    labelledBy={`pc-q-${q.id}`}
                    value={value}
                    onChange={(a) => setAnswers((prev) => ({ ...prev, [q.id]: a }))}
                  />
                </div>
              </li>
            );
          })}
        </ol>

        <div ref={sheetRef} className="lg:sticky lg:top-[92px] lg:self-start">
          <ConversationSheet items={items} onBring={bring} onPrint={print} />
        </div>
      </div>

      {/* Mobile: collapsed drawer above the sticky bar, expands on tap. */}
      <div
        className={`fixed inset-x-0 bottom-[68px] z-20 px-2 transition-[transform,opacity] duration-200 lg:hidden print:hidden ${
          showDrawer ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
        style={{ marginBottom: "env(safe-area-inset-bottom)" }}
        aria-hidden={!showDrawer}
      >
        <div className="sheet !pt-3 shadow-[0_-8px_30px_-12px_rgba(21,26,45,0.35)] before:!top-0 before:!opacity-0">
          <button
            type="button"
            tabIndex={showDrawer ? 0 : -1}
            aria-expanded={drawerOpen}
            aria-controls="pc-drawer-list"
            onClick={() => setDrawerOpen((o) => !o)}
            className="flex min-h-[48px] w-full items-center justify-between px-4 text-left"
          >
            <span className="min-w-0 font-semibold text-navy">
              Your list · {items.length} {items.length === 1 ? "item" : "items"}
              <span className="ml-2 hidden font-normal text-muted min-[360px]:inline">({answeredCount} of 5 answered)</span>
            </span>
            <ChevronUp
              size={20}
              strokeWidth={1.5}
              aria-hidden
              className={`shrink-0 text-navy transition-transform duration-200 ${drawerOpen ? "rotate-180" : ""}`}
            />
          </button>
          {drawerOpen && (
            <div id="pc-drawer-list" className="max-h-[50vh] overflow-y-auto border-t border-rule px-4 pb-4 pt-2">
              <ol className="divide-y divide-rule">
                {items.map((it, i) => (
                  <li key={it.id} className="flex gap-3 py-2.5 text-[17px]">
                    <span className="w-6 shrink-0 font-semibold text-navy/70">{i + 1}.</span>
                    <span>
                      {it.text}
                      {it.toDiscuss && <span className="ml-1.5 text-[15px] text-muted">(to discuss)</span>}
                    </span>
                  </li>
                ))}
              </ol>
              <button type="button" aria-haspopup="dialog" onClick={bring} className="btn btn-primary mt-3 w-full">
                Bring this list to a consultation
              </button>
            </div>
          )}
        </div>
      </div>

      <PrintSheet items={items} />
    </>
  );
}
