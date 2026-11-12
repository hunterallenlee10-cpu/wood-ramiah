import Image from "next/image";
import { business } from "@/lib/business";
import { photos } from "@/lib/images";
import { ConsultButton } from "@/components/ui/ConsultButton";

const steps = [
  {
    title: "The contract.",
    body: "We can draft a for sale by owner contract, or review the one you have.",
  },
  {
    title: "The title.",
    body: "We review your title abstract. Title insurance is written through Old Republic Title by our licensed title producer.",
  },
  {
    // DRAFT: confirm settlements are held at the California office.
    title: "Settlement day.",
    body: "Your settlement is conducted with an attorney there to answer questions at the table.",
  },
  {
    // DRAFT: confirm wording for the post-settlement step.
    title: "After the table.",
    body: "Your deed is recorded and you have your keys.",
  },
];

const residential = [
  "Drafting a for sale by owner contract",
  "Reviewing your real estate contract",
  "Reviewing your title abstract",
  "Conducting your settlement",
];

export function Closing() {
  return (
    <section id="real-estate" aria-labelledby="closing-heading" className="section border-t border-rule">
      <div className="wrap">
        <div className="max-w-[48rem]">
          <p className="clause">Article I · Real estate</p>
          <h2 id="closing-heading" className="display mt-5 text-[clamp(38px,4.8vw,66px)] text-navy">
            Get into your home with an attorney <span className="font-medium italic">at the table.</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-[2fr_1fr] lg:gap-16">
          <div>
            <p className="smallcaps text-muted">Your closing, start to keys</p>
            <ol className="relative mt-6">
              {steps.map((s, i) => (
                <li key={s.title} className="relative grid grid-cols-[64px_1fr] gap-5 pb-10 last:pb-0 md:grid-cols-[96px_1fr] md:gap-8">
                  {i < steps.length - 1 && (
                    <span aria-hidden className="absolute bottom-0 left-[31px] top-[64px] w-px bg-rule md:left-[47px] md:top-[84px]" />
                  )}
                  <span
                    aria-hidden
                    className="text-center font-display text-[56px] font-semibold leading-[0.95] text-navy md:text-[80px]"
                  >
                    {i + 1}
                  </span>
                  <div className="border-t border-rule pt-4 md:pt-6">
                    <h3 className="font-display text-[30px] font-semibold leading-tight text-navy md:text-[34px]">
                      <span className="sr-only">Step {i + 1}: </span>
                      {s.title}
                    </h3>
                    <p className="measure mt-2 text-ink/85">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-12 border-t border-rule pt-5">
              <ConsultButton variant="text" prefill={{ matter: "real-estate", role: "agent", source: "agents" }}>
                Agents and lenders: order a settlement in one step.
              </ConsultButton>
            </div>
          </div>

          <div className="grid content-start gap-6">
            <div className="sheet px-6 pb-7 pt-10 md:px-8">
              <h3 className="font-display text-[30px] font-semibold leading-tight text-navy">
                Buying, selling or refinancing?
              </h3>
              <ul className="mt-4 divide-y divide-rule">
                {residential.map((r) => (
                  <li key={r} className="py-2.5 text-ink/90">
                    {r}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-muted">
                <span className="font-semibold text-ink">Commercial property:</span> contract drafting, title review and
                settlement for commercial buyers and sellers.
              </p>
              <ConsultButton
                className="mt-6 w-full"
                prefill={{ matter: "real-estate", source: "closing" }}
              >
                Start a real estate request
              </ConsultButton>
            </div>

            <div className="sheet px-6 pb-7 pt-10 md:px-8">
              <h3 className="font-display text-[30px] font-semibold leading-tight text-navy">Before you wire a dollar</h3>
              {/* DRAFT: confirm the office's wire policy wording. */}
              <p className="mt-3 text-ink/90">
                Wire fraud targets closings. Before you send any funds, call us at{" "}
                <a href={business.phone.href} className="whitespace-nowrap font-semibold text-navy underline decoration-1 underline-offset-4">
                  {business.phone.display}
                </a>{" "}
                using the number on this page to confirm the instructions in person.
              </p>
              <figure className="mt-6 border-t border-rule pt-5">
                <Image
                  src={photos.seal.src}
                  alt={photos.seal.alt}
                  width={220}
                  height={83}
                  sizes="220px"
                  className="h-auto w-[220px] max-w-full"
                />
                <figcaption className="mt-2 text-[16px] text-muted">Secure Insight Registered Closing Agent</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
