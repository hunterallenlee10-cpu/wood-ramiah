import Image from "next/image";
import { attorneys } from "@/lib/business";
import { photos } from "@/lib/images";
import { ConsultButton } from "@/components/ui/ConsultButton";

export function Attorneys() {
  return (
    <section id="attorneys" aria-labelledby="attorneys-heading" className="section">
      <div className="wrap">
        <div className="max-w-[44rem]">
          <p className="clause">The attorneys</p>
          <h2 id="attorneys-heading" className="display mt-5 text-[clamp(38px,4.6vw,62px)] text-navy">
            Two partners. <span className="font-medium italic">One standard of care.</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-16 lg:mt-16 lg:grid-cols-2 lg:gap-14">
          {attorneys.map((a) => {
            const photo = photos[a.image];
            return (
              <article key={a.id} aria-labelledby={`atty-${a.id}`} className="flex flex-col">
                <div className="mounted aspect-[4/5] w-full">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1240px) 566px, (min-width: 1024px) 45vw, 100vw"
                    quality={75}
                    className="object-cover"
                    style={{ objectPosition: "50% 25%" }}
                  />
                </div>
                <div className="sheet relative z-10 mx-3 -mt-14 px-6 pb-7 pt-10 md:mx-8 md:px-8">
                  <h3 id={`atty-${a.id}`} className="font-display text-[40px] font-semibold leading-none text-navy md:text-[46px]">
                    {a.name}
                  </h3>
                  <p className="smallcaps mt-3 text-muted">
                    {a.title} · {a.practice}
                  </p>
                  <p className="mt-5 text-ink/90">{a.prose}</p>

                  <dl className="mt-6 border-t border-rule">
                    {a.ledger.map((row) => (
                      <div key={row.label} className="grid gap-1 border-b border-rule py-3 sm:grid-cols-[136px_1fr] sm:gap-5">
                        <dt className="smallcaps pt-[3px] text-[12px] text-muted">{row.label}</dt>
                        <dd className="text-[17px] leading-[1.5] text-ink">{row.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <ConsultButton
                    variant="text"
                    className="mt-5"
                    prefill={{ attorney: a.id, source: `attorney-${a.id}` }}
                  >
                    Request a consultation with {a.shortName}
                  </ConsultButton>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
