import { ConsultButton } from "@/components/ui/ConsultButton";

export function Services() {
  return (
    <section aria-labelledby="services-heading" className="section border-y border-rule defer-render">
      <div className="wrap">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[40rem]">
            <p className="clause">The practice</p>
            <h2 id="services-heading" className="display mt-5 text-[clamp(38px,4.6vw,62px)] text-navy">
              The work we do, <span className="font-medium italic">close to home.</span>
            </h2>
          </div>
          <p className="max-w-[26rem] text-muted md:pb-2">
            Real estate settlements, estate planning and probate. Professional, competent, and caring legal services.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:mt-16 lg:gap-5 xl:grid-cols-4">
          {/* Large tile: residential settlements, 2x2 */}
          <article
            id="real-estate-residential"
            className="sheet flex scroll-mt-28 flex-col px-6 pb-7 pt-10 md:col-span-2 md:px-9 md:pb-9 md:pt-12 xl:row-span-2"
          >
            <p className="smallcaps text-muted">Real estate · Residential</p>
            <h3 className="mt-3 font-display text-[40px] font-semibold leading-[1.02] text-navy md:text-[52px]">
              Residential settlements
            </h3>
            <p className="measure mt-4 text-ink/85">
              Buying, selling or refinancing in Southern Maryland, with an attorney who reviews your title and conducts
              your settlement.
            </p>
            <ul className="mt-7 grid grid-cols-1 border-t border-rule sm:grid-cols-2 sm:gap-x-8">
              {["Purchases", "Refinances", "For sale by owner contracts", "Contract review", "Title abstract review", "Deed preparation"].map(
                (x) => (
                  <li key={x} className="border-b border-rule py-2.5 text-ink/90">
                    {x}
                  </li>
                ),
              )}
            </ul>
            <blockquote className="mt-auto border-l-2 border-navy pl-5 pt-1 lg:mt-10">
              <p className="font-display text-[28px] font-medium italic leading-[1.2] text-navy md:text-[32px]">
                &ldquo;Get into your home with an attorney who can help you with all facets of the transaction.&rdquo;
              </p>
            </blockquote>
            <ConsultButton
              variant="text"
              className="mt-6"
              prefill={{ matter: "real-estate", realEstateKind: "buying", source: "services" }}
            >
              Start a request about a residential settlement
            </ConsultButton>
          </article>

          <article id="real-estate-commercial" className="sheet flex scroll-mt-28 flex-col px-6 pb-6 pt-10 md:px-7">
            <p className="smallcaps text-muted">Real estate · Commercial</p>
            <h3 className="mt-3 font-display text-[30px] font-semibold leading-[1.08] text-navy">
              Commercial transactions
            </h3>
            <p className="mt-3 flex-1 text-ink/85">
              Contract drafting, title review and settlement for commercial buyers and sellers.
            </p>
            <ConsultButton
              variant="text"
              className="mt-4"
              prefill={{ matter: "real-estate", realEstateKind: "commercial", source: "services" }}
            >
              Start a request about a commercial transaction
            </ConsultButton>
          </article>

          <article id="estate-planning-documents" className="sheet flex scroll-mt-28 flex-col px-6 pb-6 pt-10 md:px-7">
            <p className="smallcaps text-muted">Estate planning</p>
            <h3 className="mt-3 font-display text-[30px] font-semibold leading-[1.08] text-navy">Wills and trusts</h3>
            <p className="mt-3 flex-1 text-ink/85">
              Wills that name a guardian for a minor child. Revocable living trusts, funded to avoid probate. Trusts for
              minor or special needs beneficiaries.
            </p>
            <ConsultButton variant="text" className="mt-4" prefill={{ matter: "estate-plan", source: "services" }}>
              Start a request about wills and trusts
            </ConsultButton>
          </article>

          <article id="probate" className="sheet flex scroll-mt-28 flex-col px-6 pb-6 pt-10 md:col-span-2 md:px-7">
            <p className="smallcaps text-muted">Probate</p>
            <div className="mt-3 grid gap-3 md:grid-cols-[1fr_1.3fr] md:gap-8">
              <h3 className="font-display text-[30px] font-semibold leading-[1.08] text-navy">
                Probate and estate administration
              </h3>
              <p className="text-ink/85">
                Help for families settling a loved one&apos;s estate in St.&nbsp;Mary&apos;s County. Hadley Ramiah
                handles probate, with Nancy Colyer assisting.
              </p>
            </div>
            <ConsultButton variant="text" className="mt-4" prefill={{ matter: "probate", source: "services" }}>
              Start a request about probate
            </ConsultButton>
          </article>

          <article
            id="powers-of-attorney"
            className="sheet flex scroll-mt-28 flex-col gap-3 px-6 pb-5 pt-10 md:col-span-2 md:px-7 lg:flex-row lg:items-center lg:justify-between lg:gap-8 xl:col-span-4"
          >
            <div className="lg:flex lg:items-baseline lg:gap-6">
              <h3 className="font-display text-[30px] font-semibold leading-[1.08] text-navy">
                Powers of attorney, <span className="font-medium italic">financial and health care</span>
              </h3>
              <p className="mt-2 text-ink/85 lg:mt-0">So it is written down who would decide for you.</p>
            </div>
            <ConsultButton variant="text" className="shrink-0" prefill={{ matter: "poa", source: "services" }}>
              Start a request about powers of attorney
            </ConsultButton>
          </article>
        </div>
      </div>
    </section>
  );
}
