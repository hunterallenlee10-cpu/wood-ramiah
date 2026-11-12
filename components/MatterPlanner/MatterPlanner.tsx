"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { usePlanner } from "./context";
import { PlannerForm } from "./PlannerForm";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])';

/** The Matter Planner modal: one bond-white sheet on paper. Esc closes, focus is trapped, body scroll is locked. */
export function MatterPlanner() {
  const { isOpen, closePlanner, prefill, session } = usePlanner();
  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    openerRef.current = document.activeElement as HTMLElement | null;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    const scrollbar = window.innerWidth - html.clientWidth;
    html.style.overflow = "hidden";
    document.body.style.paddingRight = scrollbar ? `${scrollbar}px` : "";

    // Focus the step heading once the panel is painted.
    requestAnimationFrame(() => {
      const h = panelRef.current?.querySelector<HTMLElement>("h2");
      (h ?? panelRef.current)?.focus();
    });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closePlanner();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const nodes = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (n) => n.offsetParent !== null || n === document.activeElement,
      );
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && (document.activeElement === first || !panelRef.current.contains(document.activeElement))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      html.style.overflow = prevOverflow;
      document.body.style.paddingRight = "";
      openerRef.current?.focus?.({ preventScroll: true });
    };
  }, [isOpen, closePlanner]);

  if (!isOpen) return null;

  const editList = () => {
    closePlanner();
    requestAnimationFrame(() => document.getElementById("estate-planning")?.scrollIntoView({ behavior: "smooth" }));
  };

  return createPortal(
    <div className="planner-overlay fixed inset-0 z-[70] flex items-end justify-center bg-ink/45 sm:items-center sm:p-6 print:hidden">
      <div className="absolute inset-0" aria-hidden onClick={closePlanner} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="planner-title"
        tabIndex={-1}
        className="planner-panel sheet relative flex max-h-[100dvh] w-full flex-col overflow-hidden !rounded-none !shadow-[0_30px_80px_-30px_rgba(21,26,45,0.55)] outline-none sm:max-h-[min(92dvh,900px)] sm:max-w-[680px] sm:!rounded-[2px]"
      >
        <div className="flex items-center justify-between gap-4 border-b border-rule bg-bond px-5 pb-3 pt-6 sm:px-8">
          <p className="font-display text-[22px] font-semibold text-navy" style={{ fontVariantCaps: "small-caps", letterSpacing: "0.06em" }}>
            Wood <span className="italic font-medium">&amp;</span> Ramiah
          </p>
          <button
            type="button"
            onClick={closePlanner}
            className="-mr-2 flex h-11 w-11 items-center justify-center text-navy hover:bg-navy/5"
            aria-label="Close the consultation request"
          >
            <X size={24} strokeWidth={1.5} aria-hidden />
          </button>
        </div>
        <div className="overflow-y-auto overscroll-contain px-5 pt-6 sm:px-8">
          <PlannerForm key={session} prefill={prefill} headingId="planner-title" onEditList={prefill.planList ? editList : undefined} />
        </div>
      </div>
    </div>,
    document.body,
  );
}
