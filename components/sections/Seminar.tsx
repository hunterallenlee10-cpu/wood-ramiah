import { business } from "@/lib/business";
import { ConsultButton } from "@/components/ui/ConsultButton";

export function Seminar() {
  const { seminar } = business;
  return (
    <section aria-labelledby="seminar-heading" className="pb-[72px] lg:pb-[120px]">
      <div className="wrap">
        <div className="sheet grid gap-8 px-6 pb-8 pt-11 md:px-10 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-14 lg:px-14 lg:pb-12 lg:pt-14">
          <div>
            <p className="smallcaps text-muted">Free seminar · {seminar.title}</p>
            <h2 id="seminar-heading" className="display mt-4 text-[clamp(34px,3.8vw,50px)] text-navy">
              Estate Planning Basics, <span className="font-medium italic">free and in person.</span>
            </h2>
            <p className="measure mt-4 text-ink/85">
              Held at {seminar.venue}, {seminar.room}. Seating is limited and registration is through the credit union.
            </p>
          </div>
          <div className="lg:border-l lg:border-rule lg:pl-12">
            <p className="smallcaps text-muted">Next date</p>
            {/* DRAFT: next seminar date. */}
            <p className="mt-2 font-display text-[34px] font-semibold leading-none text-navy">
              {seminar.next}
              <span className="ml-3 inline-block translate-y-[-6px] rounded-[2px] border border-rule bg-paper px-2 py-0.5 align-middle font-sans text-[13px] font-semibold uppercase tracking-[0.1em] text-muted">
                Sample
              </span>
            </p>
            <ConsultButton
              variant="ghost"
              className="mt-6 w-full sm:w-auto"
              prefill={{ matter: "estate-plan", source: "seminar" }}
            >
              Prefer one-on-one? Request a Consultation
            </ConsultButton>
          </div>
        </div>
      </div>
    </section>
  );
}
