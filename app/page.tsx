import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Differentiator } from "@/components/sections/Differentiator";
import { PlanCheckSection } from "@/components/sections/PlanCheckSection";
import { Closing } from "@/components/sections/Closing";
import { Services } from "@/components/sections/Services";
import { Attorneys } from "@/components/sections/Attorneys";
import { Office } from "@/components/sections/Office";
import { Seminar } from "@/components/sections/Seminar";
import { Reviews } from "@/components/sections/Reviews";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { JsonLd } from "@/components/JsonLd";
import { homeSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: "Real Estate Attorney in California, MD | Wood & Ramiah" },
  description:
    "Wood & Ramiah handles real estate settlements, wills, trusts and probate in California, MD and St. Mary's County. Call (301) 737-8882 or request a consult.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Differentiator />
        <PlanCheckSection />
        <Closing />
        <Services />
        <Attorneys />
        <Office />
        <Seminar />
        <Reviews />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <JsonLd data={homeSchema()} />
    </>
  );
}
