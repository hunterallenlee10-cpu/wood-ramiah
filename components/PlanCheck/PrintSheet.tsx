"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { business } from "@/lib/business";
import { readout, type ListItem } from "@/lib/plan-check";

/** Rendered straight into <body> so the print stylesheet can print only this sheet. */
export function PrintSheet({ items }: { items: ListItem[] }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <div className="print-only" aria-hidden>
      <div style={{ fontFamily: "var(--font-sans)", maxWidth: 640, margin: "0 auto" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#565D70", margin: 0 }}>
          Prepared for your consultation
        </p>
        <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 500, fontSize: 36, color: "#192451", margin: "6px 0 18px" }}>
          Your conversation list
        </p>
        <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {items.map((item, i) => (
            <li key={item.id} style={{ borderBottom: "1px solid #192451", padding: "10px 0", fontSize: 15 }}>
              <strong>
                {String(i + 1).padStart(2, "0")}. {item.text}
              </strong>
              {item.toDiscuss && <span style={{ color: "#565D70" }}> (to discuss)</span>}
              {item.note && <div style={{ color: "#565D70", fontSize: 13, marginTop: 2 }}>{item.note}</div>}
            </li>
          ))}
        </ol>
        <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 20, color: "#192451", marginTop: 18 }}>
          {readout(items.length)}
        </p>
        <p style={{ fontSize: 11, color: "#565D70", marginTop: 18 }}>
          General information, not legal advice. Using this tool does not create an attorney/client relationship.
        </p>
        <div style={{ borderTop: "1px solid #8C91A1", marginTop: 28, paddingTop: 12, fontSize: 13 }}>
          <strong>{business.name}</strong>
          <br />
          {business.phone.display} · {business.address.oneLine}
          <br />
          {business.hours.display}
        </div>
      </div>
    </div>,
    document.body,
  );
}
