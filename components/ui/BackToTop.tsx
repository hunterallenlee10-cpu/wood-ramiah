"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/** Appears only after scrolling 1.5 screens. */
export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 1.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        document.getElementById("main")?.focus({ preventScroll: true });
      }}
      className={`fixed bottom-[92px] right-4 z-30 flex h-12 w-12 items-center justify-center rounded-[2px] border border-rule bg-bond text-navy shadow-[var(--shadow-lift)] transition-[opacity,transform] duration-200 hover:border-navy lg:bottom-8 lg:right-8 print:hidden ${
        show ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <ArrowUp size={20} strokeWidth={1.5} aria-hidden />
    </button>
  );
}
