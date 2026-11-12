import type { Metadata } from "next";
import { Clock, MapPin, Phone } from "lucide-react";
import { business } from "@/lib/business";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { FinalCta } from "@/components/sections/FinalCta";
import { PlannerForm } from "@/components/MatterPlanner/PlannerForm";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  title: "Contact Wood & Ramiah | Real Estate Attorney, California MD",
  description:
    "Visit Wood & Ramiah at 23087 Three Notch Road, California, MD. Open Monday to Friday, 9 to 5. Call (301) 737-8882 or request a consultation online today.",
  path: "/contact",
});

export default function ContactPage() {
  const { address, phone, hours } = business;
  return (
    <>
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <section aria-label="Contact" className="pb-14 pt-10 md:pb-20 md:pt-16">
          <div className="wrap">
            <h1 className="m-0">
              <span className="smallcaps block text-[12.5px] leading-[1.5] text-muted md:text-[13px]">
                Real estate settlement and estate planning attorneys in California, MD
              </span>
              <span className="display mt-4 block text-[clamp(44px,6vw,80px)] text-navy">
                Contact Wood <span className="font-medium italic">&amp;</span> Ramiah
              </span>
            </h1>
            <p className="measure mt-5 text-[18px] text-ink/85 md:text-[19px]">
              Call, visit, or send a request below. The office is open {hours.display}, on Three Notch Road in California, Maryland.
            </p>

            <ul className="mt-10 grid gap-4 md:grid-cols-3 md:gap-5">
              <li className="sheet flex flex-col px-6 pb-6 pt-10">
                <p className="smallcaps flex items-center gap-2 text-muted">
                  <Phone size={16} strokeWidth={1.5} aria-hidden /> Call
                </p>
                <a href={phone.href} className="mt-3 font-display text-[36px] font-semibold leading-none text-navy hover:underline hover:decoration-1 hover:underline-offset-8">
                  {phone.display}
                </a>
                <p className="mt-3 text-muted">Fax {business.fax}</p>
              </li>
              <li className="sheet flex flex-col px-6 pb-6 pt-10">
                <p className="smallcaps flex items-center gap-2 text-muted">
                  <MapPin size={16} strokeWidth={1.5} aria-hidden /> Directions
                </p>
                <p className="mt-3 font-display text-[30px] font-semibold leading-[1.1] text-navy">{address.street}</p>
                <p className="mt-1 text-ink/85">
                  {address.city}, {address.state} {address.zip}
                </p>
                <a href={business.directionsUrl} target="_blank" rel="noopener" className="textlink mt-2">
                  Get directions to the office
                </a>
              </li>
              <li className="sheet flex flex-col px-6 pb-6 pt-10">
                <p className="smallcaps flex items-center gap-2 text-muted">
                  <Clock size={16} strokeWidth={1.5} aria-hidden /> Visit
                </p>
                <p className="mt-3 font-display text-[30px] font-semibold leading-[1.1] text-navy">Monday to Friday</p>
                <p className="mt-1 text-ink/85">9 AM to 5 PM. {hours.closed}.</p>
              </li>
            </ul>
          </div>
        </section>

        <section aria-labelledby="request-heading" className="border-t border-rule py-[72px] lg:py-[112px]">
          <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            <div>
              <p className="clause">Request a consultation</p>
              <h2 id="request-heading" className="display mt-5 text-[clamp(38px,4.4vw,58px)] text-navy">
                Tell us a little. <span className="font-medium italic">We will call you back.</span>
              </h2>
              <p className="mt-5 max-w-[26rem] text-muted">
                Five short steps. If you have a closing date or a family matter that cannot wait, call{" "}
                <a href={phone.href} className="whitespace-nowrap font-semibold text-navy underline decoration-1 underline-offset-4">
                  {phone.display}
                </a>
                .
              </p>
            </div>
            <div className="sheet px-5 pb-6 pt-10 md:px-9 md:pb-9 md:pt-12">
              <PlannerForm inline />
            </div>
          </div>
        </section>

        <section aria-labelledby="visit-heading" className="border-t border-rule py-[72px] lg:py-[112px]">
          <div className="wrap grid gap-6 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            <div className="sheet self-start px-6 pb-7 pt-10 md:px-8">
              <h2 id="visit-heading" className="font-display text-[34px] font-semibold leading-tight text-navy">
                Visit the office
              </h2>
              <address className="mt-4 not-italic leading-[1.7] text-ink">
                {business.name}
                <br />
                {address.street}
                <br />
                {address.city}, {address.state} {address.zip}
              </address>
              <p className="mt-4 leading-[1.7] text-ink">
                {hours.display}
                <br />
                {hours.closed}
              </p>
              <p className="mt-4 text-ink">
                Phone{" "}
                <a href={phone.href} className="font-semibold text-navy underline decoration-1 underline-offset-4">
                  {phone.display}
                </a>
                <br />
                Fax {business.fax}
              </p>
              <a href={business.directionsUrl} target="_blank" rel="noopener" className="textlink mt-3">
                <MapPin size={18} strokeWidth={1.5} aria-hidden />
                Get directions to the office
              </a>
            </div>
            <div className="mounted aspect-[4/3] w-full lg:aspect-auto lg:min-h-[460px]">
              <iframe
                src={business.mapsEmbedUrl}
                title="Map of Wood & Ramiah, LLC at 23087 Three Notch Road, California, Maryland"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </div>
          <div className="wrap mt-12">
            <p className="measure border-t border-rule pt-6 text-[16px] leading-[1.65] text-muted">{business.notice}</p>
          </div>
        </section>

        <FinalCta />
      </main>
      <Footer />
      <JsonLd data={breadcrumbSchema()} />
    </>
  );
}
