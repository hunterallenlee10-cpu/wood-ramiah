"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const reveal = () => document.documentElement.classList.add("render-all");

/**
 * Below-the-fold sections use content-visibility: auto to keep the first screen light.
 * Before any anchor jump, every section is switched back to normal rendering so the browser
 * scrolls against exact positions (otherwise placeholder heights make #faq land off target).
 */
export function AnchorFix() {
  const pathname = usePathname();

  // Same-page and cross-page anchor clicks: reveal before Next or the browser scrolls.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href*='#']") as HTMLAnchorElement | null;
      if (a && a.origin === window.location.origin && a.hash) reveal();
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // Direct visits to /#section, and arrivals from another page: reveal, then land exactly.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    reveal();
    // Land a few times while hydration, fonts and images settle; stop as soon as the visitor takes over.
    let cancelled = false;
    const stop = () => (cancelled = true);
    const land = () => !cancelled && document.getElementById(id)?.scrollIntoView({ behavior: "instant" as ScrollBehavior });
    const opts = { passive: true, once: true } as const;
    ["wheel", "touchstart", "keydown", "pointerdown"].forEach((ev) => window.addEventListener(ev, stop, opts));
    const raf = requestAnimationFrame(land);
    const timers = [150, 400, 900].map((ms) => setTimeout(land, ms));
    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      ["wheel", "touchstart", "keydown", "pointerdown"].forEach((ev) => window.removeEventListener(ev, stop));
    };
  }, [pathname]);

  return null;
}
