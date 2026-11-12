import { Monogram } from "./Monogram";

type Props = { size?: "nav" | "footer"; tone?: "navy" | "paper" };

/** Monogram plus "Wood & Ramiah, LLC" set in type (never the PNG in the nav). */
export function Wordmark({ size = "nav", tone = "navy" }: Props) {
  const big = size === "footer";
  return (
    <span className="inline-flex items-center gap-3">
      <Monogram size={big ? 44 : 32} className="shrink-0" />
      <span
        className={`font-display font-semibold leading-none whitespace-nowrap ${big ? "text-[23px] xs:text-[28px]" : "text-[20px] min-[360px]:text-[22px]"} ${tone === "navy" ? "text-navy" : "text-paper"}`}
        style={{ fontVariantCaps: "small-caps", letterSpacing: "0.08em" }}
      >
        Wood <span className="italic font-medium">&amp;</span> Ramiah
        <span
          className={`font-sans normal-case not-italic font-semibold ${big ? "text-[15px]" : "text-[13px]"} ${tone === "navy" ? "text-muted" : "text-pewter"}`}
          style={{ fontVariantCaps: "normal", letterSpacing: "0.06em" }}
        >
          , LLC
        </span>
      </span>
    </span>
  );
}
