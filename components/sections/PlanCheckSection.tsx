import { PlanCheck } from "@/components/PlanCheck/PlanCheck";

export function PlanCheckSection() {
  return (
    <section id="estate-planning" aria-labelledby="plan-check-heading" className="section">
      <div className="wrap">
        <div className="max-w-[46rem]">
          <p className="clause">Article II · Estate planning</p>
          <h2 id="plan-check-heading" className="display mt-5 text-[clamp(40px,5.2vw,72px)] text-navy">
            Is a simple will <span className="font-medium italic">enough?</span>
          </h2>
          <p className="measure mt-5 text-[18px] leading-[1.65] text-ink/85 md:text-[19px]">
            Some clients who believe they just need a simple will may not realize the consequences of not planning for
            their loved ones.{" "}
            <span className="font-semibold text-ink">Five questions. Two minutes. No names, nothing is sent.</span>
          </p>
        </div>

        <PlanCheck />

        <p className="mt-8 text-[16px] text-muted">
          General information, not legal advice. Using this tool does not create an attorney/client relationship.
        </p>
      </div>
    </section>
  );
}
