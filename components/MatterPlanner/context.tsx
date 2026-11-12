"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { AttorneyId } from "@/lib/business";
import type { ListItem } from "@/lib/plan-check";

export type Matter = "real-estate" | "estate-plan" | "poa" | "probate" | "other";
export type RealEstateKind = "buying" | "selling" | "refinancing" | "commercial" | "fsbo";
export type Role = "buyer" | "seller" | "owner" | "agent";

export type Prefill = {
  matter?: Matter;
  realEstateKind?: RealEstateKind;
  role?: Role;
  attorney?: AttorneyId;
  planList?: ListItem[];
  source?: string;
};

type Ctx = {
  isOpen: boolean;
  prefill: Prefill;
  openPlanner: (prefill?: Prefill) => void;
  closePlanner: () => void;
  /** Bumps on every open so the form resets to the new prefill. */
  session: number;
};

const PlannerContext = createContext<Ctx | null>(null);

export function PlannerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [prefill, setPrefill] = useState<Prefill>({});
  const [session, setSession] = useState(0);

  const openPlanner = useCallback((p: Prefill = {}) => {
    setPrefill(p);
    setSession((s) => s + 1);
    setOpen(true);
  }, []);
  const closePlanner = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, prefill, openPlanner, closePlanner, session }),
    [isOpen, prefill, openPlanner, closePlanner, session],
  );
  return <PlannerContext.Provider value={value}>{children}</PlannerContext.Provider>;
}

export function usePlanner() {
  const ctx = useContext(PlannerContext);
  if (!ctx) throw new Error("usePlanner must be used inside PlannerProvider");
  return ctx;
}
