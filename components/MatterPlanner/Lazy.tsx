"use client";

import dynamic from "next/dynamic";
import { usePlanner } from "./context";

// The modal's code loads on first open, keeping it off the critical path for the first screen.
const MatterPlanner = dynamic(() => import("./MatterPlanner").then((m) => m.MatterPlanner), { ssr: false });

export function MatterPlannerLazy() {
  const { session } = usePlanner();
  return session > 0 ? <MatterPlanner /> : null;
}
