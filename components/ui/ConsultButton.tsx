"use client";

import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { usePlanner, type Prefill } from "@/components/MatterPlanner/context";

type Props = {
  children?: ReactNode;
  prefill?: Prefill;
  variant?: "primary" | "ghost" | "paper" | "ghost-paper" | "text";
  className?: string;
  arrow?: boolean;
};

/** Anything that opens the Matter Planner is a <button>, never a link. */
export function ConsultButton({
  children = "Request a Consultation",
  prefill,
  variant = "primary",
  className = "",
  arrow = false,
}: Props) {
  const { openPlanner } = usePlanner();
  const cls = variant === "text" ? "textlink" : `btn btn-${variant}`;
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      className={`${cls} ${className}`}
      onClick={() => openPlanner(prefill)}
    >
      {children}
      {(arrow || variant === "text") && <ArrowRight size={18} strokeWidth={1.5} aria-hidden />}
    </button>
  );
}
