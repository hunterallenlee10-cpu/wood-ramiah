import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { PhoneLink } from "@/components/ui/PhoneLink";
import { Monogram } from "@/components/Monogram";

export const metadata: Metadata = {
  title: { absolute: "Page not found | Wood & Ramiah" },
  description: "This page could not be found. Call Wood & Ramiah at (301) 737-8882 or return to the home page.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <section className="py-[96px] lg:py-[144px]">
          <div className="wrap">
            <div className="sheet mx-auto max-w-[720px] px-6 pb-10 pt-12 text-center md:px-14 md:pb-14 md:pt-16">
              <Monogram size={56} className="mx-auto" />
              <p className="smallcaps mt-6 text-muted">Error 404</p>
              <h1 className="display mt-3 text-[clamp(40px,5.4vw,64px)] text-navy">
                This page is <span className="font-medium italic">not on file.</span>
              </h1>
              <p className="mx-auto mt-5 max-w-[34rem] text-ink/85">
                The link may be old or mistyped. Everything you need is on the home page, or call the office and we
                will point you in the right direction.
              </p>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/" className="btn btn-primary">
                  Go to the home page
                </Link>
                <PhoneLink />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
