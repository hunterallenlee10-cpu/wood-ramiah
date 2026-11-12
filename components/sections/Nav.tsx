"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { business } from "@/lib/business";
import { Wordmark } from "@/components/Wordmark";
import { ConsultButton } from "@/components/ui/ConsultButton";

export const navLinks = [
  { href: "/#real-estate", label: "Real Estate" },
  { href: "/#estate-planning", label: "Estate Planning" },
  { href: "/#probate", label: "Probate" },
  { href: "/#team", label: "Our Team" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      burgerRef.current?.focus();
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 border-b border-rule transition-[background-color,backdrop-filter] duration-200 ${
        scrolled ? "bg-paper/85 backdrop-blur-md supports-[not(backdrop-filter:blur(1px))]:bg-paper" : "bg-paper"
      }`}
    >
      <nav aria-label="Main" className="wrap flex h-[68px] items-center justify-between gap-4">
        <Link href="/" className="-ml-1 flex min-h-[44px] items-center px-1">
          <Wordmark />
        </Link>

        <ul className="hidden items-center xl:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="flex min-h-[44px] items-center whitespace-nowrap px-2 text-[16px] font-semibold text-ink/80 transition-colors hover:text-navy xl:px-2.5"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto hidden items-center gap-3 lg:flex xl:ml-0">
          <a
            href={business.phone.href}
            className="flex min-h-[44px] items-center gap-2 px-1 text-[16px] font-semibold text-navy"
            aria-label={`Call ${business.phone.display}`}
          >
            <Phone size={18} strokeWidth={1.5} aria-hidden />
            <span className="hidden whitespace-nowrap min-[1380px]:inline">{business.phone.display}</span>
          </a>
          <ConsultButton className="!min-h-[44px] whitespace-nowrap !px-5 !text-[16px]" />
        </div>

        <button
          ref={burgerRef}
          type="button"
          className="-mr-2 flex h-11 w-11 items-center justify-center text-navy xl:hidden"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          <Menu size={26} strokeWidth={1.5} aria-hidden />
        </button>
      </nav>

      {open &&
        createPortal(
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex flex-col bg-paper xl:hidden"
        >
          <div className="wrap flex h-[68px] items-center justify-between border-b border-rule">
            <Wordmark />
            <button
              ref={closeRef}
              type="button"
              className="-mr-2 flex h-11 w-11 items-center justify-center text-navy"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <X size={26} strokeWidth={1.5} aria-hidden />
            </button>
          </div>
          <ul className="wrap flex-1 overflow-y-auto py-4">
            {navLinks.map((l, i) => (
              <li key={l.href} className="border-b border-rule">
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[64px] items-center justify-between font-display text-[32px] font-semibold text-navy"
                >
                  {l.label}
                  <span className="smallcaps text-pewter" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="wrap grid gap-3 pb-8 pt-4">
            <a href={business.phone.href} className="btn btn-ghost w-full">
              <Phone size={18} strokeWidth={1.5} aria-hidden />
              Call {business.phone.display}
            </a>
            <div onClick={() => setOpen(false)}>
              <ConsultButton className="w-full" />
            </div>
          </div>
        </div>,
          document.body,
        )}
    </header>
  );
}
