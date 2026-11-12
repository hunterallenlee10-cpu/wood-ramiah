import Image from "next/image";
import { business } from "@/lib/business";
import { photos } from "@/lib/images";
import { ConsultButton } from "@/components/ui/ConsultButton";
import { PhoneLink } from "@/components/ui/PhoneLink";
import { Monogram } from "@/components/Monogram";

/**
 * The signature line: an ink line drawn left to right (0.9s), then the W&R seal
 * presses in at its right end (0.3s). Plays once, in CSS, so it starts on first paint.
 * With reduced motion both are simply there. Fixed height, so no layout shift.
 */
function SignatureLine() {
  return (
    <div className="sig relative flex h-[44px] w-full max-w-[520px] items-end" aria-hidden>
      <svg
        className="sig-line mb-[9px] h-[14px] w-0 min-w-0 flex-1 overflow-visible"
        viewBox="0 0 480 14"
        preserveAspectRatio="none"
      >
        <path
          d="M1 9.2 C 34 8.1, 58 10.4, 96 9.4 S 170 7.6, 214 8.9 S 300 10.6, 352 8.6 S 432 7.4, 479 8.4"
          fill="none"
          stroke="#192451"
          strokeWidth="1.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span className="sig-seal -ml-px block shrink-0 shadow-[0_2px_6px_-2px_rgba(21,26,45,0.35)]">
        <Monogram size={44} />
      </span>
    </div>
  );
}

const facts = ["Since 1994", `${business.rating.stars} ★ · ${business.rating.count} Google reviews`, business.hours.short];
// DRAFT: refresh the review count at launch.

export function Hero() {
  return (
    <section aria-label="Introduction" className="relative overflow-hidden">
      <div className="wrap grid items-center gap-12 pb-16 pt-7 md:pt-12 lg:grid-cols-[58fr_42fr] lg:gap-14 lg:pb-[112px] lg:pt-[72px]">
        <div className="flex min-w-0 flex-col">
          <h1 className="order-1 m-0">
            <span className="smallcaps block max-w-[38ch] text-[12.5px] lg:max-w-none leading-[1.5] tracking-[0.13em] text-muted md:text-[13px]">
              Real estate settlement &amp; estate planning attorneys in California, MD
            </span>
            <span className="display mt-4 block text-[clamp(44px,3.9vw+0.5rem,66px)] lg:leading-[1.08] text-navy md:mt-6">
              Close with confidence.
              <span className="block font-medium italic">Plan with calm assurance.</span>
            </span>
          </h1>

          <div className="order-4 mt-8 lg:order-2 lg:mt-8">
            <SignatureLine />
            <p className="smallcaps mt-3 text-[12.5px] text-muted">Practicing in Southern Maryland since 1994</p>
          </div>

          <p className="order-2 mt-4 max-w-[34rem] text-[17px] leading-[1.55] text-ink/85 md:mt-7 md:text-[19px] lg:order-3">
            <span className="md:hidden">Settlements, wills, trusts and probate for St.&nbsp;Mary&apos;s County families.</span>
            <span className="hidden md:inline">
              Joann Wood and Hadley Ramiah handle home settlements, wills, trusts and probate for families across
              St. Mary&apos;s County. Professional, competent, and caring, from our office on Three Notch Road.
            </span>
          </p>

          <div className="order-3 mt-6 flex flex-col gap-3 sm:flex-row md:mt-9 lg:order-4">
            <ConsultButton className="w-full sm:w-auto" />
            <PhoneLink className="w-full sm:w-auto" />
          </div>

          <ul className="order-5 mt-8 flex flex-wrap items-center gap-y-2 text-navy md:mt-10" aria-label="At a glance">
            {facts.map((f, i) => (
              <li
                key={f}
                className={`smallcaps text-[12.5px] ${i > 0 ? "ml-4 border-l border-pewter/60 pl-4" : ""}`}
              >
                {f}
              </li>
            ))}
          </ul>
        </div>

        <figure className="relative m-0 mx-auto w-full max-w-[560px] lg:max-w-none">
          <div className="mounted aspect-[4/5] w-full shadow-[0_30px_60px_-36px_rgba(21,26,45,0.45)]">
            <Image
              src={photos.partners.src}
              alt={photos.partners.alt}
              fill
              priority
              fetchPriority="high"
              quality={75}
              sizes="(min-width: 1240px) 520px, (min-width: 1024px) 42vw, (min-width: 600px) 560px, calc(100vw - 40px)"
              className="object-cover"
              style={{ objectPosition: "50% 22%" }}
            />
          </div>
          <figcaption className="sheet absolute -bottom-6 left-4 max-w-[86%] px-5 pb-4 pt-7 sm:left-[-28px] lg:-bottom-8">
            <span className="block font-display text-[28px] font-semibold leading-none text-navy">
              Joann Wood <span className="font-medium italic">&amp;</span> Hadley Ramiah
            </span>
            <span className="smallcaps mt-2 block text-[12px] text-muted">
              Partners<span className="hidden sm:inline"> · </span>
              <span className="block sm:inline">23087 Three Notch Road</span>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
