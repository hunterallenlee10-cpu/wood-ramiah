import Link from "next/link";
import { Facebook, MapPin } from "lucide-react";
import { business, practiceAreas } from "@/lib/business";
import { isLive } from "@/lib/site";
import { Wordmark } from "@/components/Wordmark";

export function Footer() {
  const { address, phone, hours } = business;
  return (
    <footer className="border-t border-rule bg-paper pb-28 pt-16 lg:pb-12 lg:pt-20">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr_1fr_1fr] lg:gap-10">
          <div>
            <Link href="/" className="inline-flex min-h-[44px] items-center">
              <Wordmark size="footer" />
            </Link>
            <p className="mt-4 text-muted">{business.tagline}</p>
            <a
              href={phone.href}
              className="mt-5 inline-block py-1.5 font-display text-[40px] font-semibold leading-none text-navy hover:underline hover:decoration-1 hover:underline-offset-8"
            >
              {phone.display}
            </a>
            <p className="mt-3 text-muted">Fax {business.fax}</p>
            <a
              href={business.facebook.url}
              aria-label={business.facebook.label}
              className="mt-5 inline-flex h-11 w-11 items-center justify-center rounded-[2px] border border-rule bg-bond text-navy transition-colors hover:border-navy"
              rel="noopener"
              target="_blank"
            >
              <Facebook size={20} strokeWidth={1.5} aria-hidden />
            </a>
          </div>

          <div>
            <h2 className="smallcaps text-muted">Visit</h2>
            <address className="mt-4 not-italic leading-[1.7]">
              {business.name}
              <br />
              {address.street}
              <br />
              {address.city}, {address.state} {address.zip}
            </address>
            <a href={business.directionsUrl} className="textlink mt-2" target="_blank" rel="noopener">
              <MapPin size={18} strokeWidth={1.5} aria-hidden />
              Directions to the office
            </a>
            <h2 className="smallcaps mt-8 text-muted">Hours</h2>
            <p className="mt-4 leading-[1.7]">
              {hours.display}
              <br />
              {hours.closed}
            </p>
          </div>

          <div>
            <h2 className="smallcaps text-muted">Practice areas</h2>
            <ul className="mt-4 space-y-2 leading-[1.5]">
              {practiceAreas.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="smallcaps text-muted">Serving Southern Maryland</h2>
            {/* DRAFT: confirm the towns and counties served. */}
            <p className="mt-4 leading-[1.7]">
              St. Mary&apos;s County: {business.towns.join(", ")}. Also {business.counties.join(" and ")}.
            </p>
            <ul className="mt-6 space-y-1">
              <li>
                <Link href="/contact" className="textlink">
                  Contact the office
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="textlink">
                  Common questions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-rule pt-8 text-[16px] leading-[1.65] text-muted">
          <p className="measure">{business.notice}</p>
          <p className="mt-4">{business.photoCredit}</p>
          <p className="mt-4">© 2026 {business.name}</p>
          {!isLive && <p className="mt-2">Concept preview by Lee Enterprises Unlimited.</p>}
        </div>
      </div>
    </footer>
  );
}
