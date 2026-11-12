import { ConsultButton } from "@/components/ui/ConsultButton";
import type { Prefill } from "@/components/MatterPlanner/context";

const sheets: { title: string; body: string; cta: string; prefill: Prefill }[] = [
  {
    title: "An attorney at your settlement",
    body: "An attorney to answer questions at settlement, to review your title, and to be there in the event of a contract question. That gives everyone at the table a real measure of reassurance.",
    cta: "Start a real estate request",
    prefill: { matter: "real-estate", source: "differentiator" },
  },
  {
    title: "A plan that looks past the simple will",
    body: "Guardians for young children, trusts for minor or special needs beneficiaries, powers of attorney, and the tax questions a simple will can leave open.",
    cta: "Start an estate plan request",
    prefill: { matter: "estate-plan", source: "differentiator" },
  },
  {
    title: "Probate, close to home",
    body: "When a loved one passes, we help families settle the estate here in St. Mary’s County, one step at a time.",
    cta: "Start a probate request",
    prefill: { matter: "probate", source: "differentiator" },
  },
];

export function Differentiator() {
  return (
    <section aria-labelledby="why-heading" className="on-navy section relative bg-navy text-paper">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end lg:gap-20">
          <div>
            <p className="clause">Why one office</p>
            <h2 id="why-heading" className="display mt-5 text-[clamp(36px,4.4vw,60px)] text-paper">
              The house and the plan, <span className="font-medium italic">in the same hands.</span>
            </h2>
          </div>
          {/* DRAFT: confirm the firm is comfortable with the "trust funding / deed" wording. */}
          <p className="measure text-[18px] leading-[1.65] text-paper/85 md:text-[19px]">
            A home is often the largest thing a family owns, and it is usually the centre of the estate plan too. We
            settle the purchase, prepare the deed, and help make sure your trust actually owns what it is meant to own.
            <span className="mt-3 block font-semibold text-paper">One office. No hand-offs.</span>
          </p>
        </div>

        <ol className="mt-14 grid gap-5 md:grid-cols-2 md:gap-6 lg:mt-20 lg:grid-cols-3">
          {sheets.map((s, i) => (
            <li
              key={s.title}
              className={`sheet flex flex-col px-6 pb-6 pt-10 text-ink md:px-7 md:pb-7 md:pt-12 ${
                i === 1 ? "lg:translate-y-8" : i === 2 ? "md:col-span-2 lg:col-span-1 lg:translate-y-16" : ""
              }`}
            >
              <span className="font-display text-[28px] font-semibold leading-none text-pewter" aria-hidden>
                {["I", "II", "III"][i]}.
              </span>
              <h3 className="mt-4 font-display text-[30px] font-semibold leading-[1.1] text-navy">{s.title}</h3>
              <p className="mt-3 flex-1 text-muted">{s.body}</p>
              <ConsultButton variant="text" prefill={s.prefill} className="mt-5">
                {s.cta}
              </ConsultButton>
            </li>
          ))}
        </ol>
        <div className="hidden lg:block lg:h-16" aria-hidden />
      </div>
    </section>
  );
}
