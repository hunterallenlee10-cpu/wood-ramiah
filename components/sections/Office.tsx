import Image from "next/image";
import { MapPin, Phone } from "lucide-react";
import { business, staff } from "@/lib/business";
import { photos } from "@/lib/images";

export function Office() {
  return (
    <section id="team" aria-labelledby="team-heading" className="section border-t border-rule defer-render">
      <div className="wrap">
        <div className="max-w-[46rem]">
          <p className="clause">The office</p>
          <h2 id="team-heading" className="display mt-5 text-[clamp(38px,4.6vw,62px)] text-navy">
            The red door on <span className="font-medium italic">Three Notch Road.</span>
          </h2>
        </div>

        <div className="relative mt-12 lg:mt-16 lg:pb-20">
          <div className="mounted relative h-[260px] w-full sm:h-[400px] lg:h-[640px]">
            <Image
              src={photos.team.src}
              alt={photos.team.alt}
              fill
              sizes="(min-width: 1240px) 1160px, 100vw"
              quality={75}
              className="object-cover"
              style={{ objectPosition: "center 40%" }}
            />
          </div>

          <div className="sheet relative z-10 mt-[-28px] mx-3 px-6 pb-6 pt-10 sm:mx-6 lg:absolute lg:bottom-0 lg:left-[-24px] lg:mx-0 lg:mt-0 lg:w-[420px] lg:px-8 lg:pb-8">
            <address className="not-italic">
              <span className="block font-display text-[30px] font-semibold leading-[1.1] text-navy">
                {business.address.street}
              </span>
              <span className="mt-1 block text-ink/90">
                {business.address.city}, {business.address.state} {business.address.zip}
              </span>
            </address>
            <p className="mt-3 text-ink/90">{business.hours.display}</p>
            <div className="mt-4 flex flex-col gap-1 border-t border-rule pt-3">
              <a href={business.directionsUrl} target="_blank" rel="noopener" className="textlink">
                <MapPin size={18} strokeWidth={1.5} aria-hidden />
                Get directions to the office
              </a>
              <a href={business.phone.href} className="textlink">
                <Phone size={18} strokeWidth={1.5} aria-hidden />
                Call {business.phone.display}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex items-end justify-between gap-6 lg:mt-20">
          <h3 className="font-display text-[32px] font-semibold leading-tight text-navy md:text-[38px]">
            The people you will meet
          </h3>
          <p className="smallcaps hidden text-muted md:block lg:hidden" aria-hidden>
            Swipe
          </p>
        </div>

        <ul
          className="no-scrollbar -mx-5 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:-mx-10 md:px-10 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-visible lg:px-0"
          aria-label="Staff"
        >
          {staff.map((p) => {
            const photo = photos[p.image];
            return (
              <li key={p.name} className="w-[68%] shrink-0 snap-start xs:w-[56%] sm:w-[40%] md:w-[30%] lg:w-auto">
                <div className="mounted aspect-[3/4] w-full">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1240px) 216px, (min-width: 1024px) 18vw, (min-width: 768px) 30vw, 68vw"
                    quality={70}
                    className="object-cover"
                    style={{ objectPosition: "50% 22%" }}
                  />
                </div>
                <p className="mt-4 font-display text-[28px] font-semibold leading-none text-navy">{p.name}</p>
                <p className="smallcaps mt-2 text-[12px] text-muted">{p.role}</p>
                <p className="mt-2 text-[17px] leading-[1.5] text-ink/85">{p.line}</p>
              </li>
            );
          })}
        </ul>

        {/* DRAFT: confirm "most of us grew up here" with the firm. */}
        <p className="mt-12 border-t border-rule pt-6 font-display text-[30px] font-medium italic leading-tight text-navy md:text-[36px]">
          Seven people. One office. Most of us grew up right here.
        </p>
      </div>
    </section>
  );
}
