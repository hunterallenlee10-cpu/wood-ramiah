import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Footer } from "@/components/sections/Footer";
import { Differentiator } from "@/components/sections/Differentiator";
import { PlanCheckSection } from "@/components/sections/PlanCheckSection";

export const metadata: Metadata = {
  title: "Real Estate Attorney in California, MD | Wood & Ramiah",
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
      </main>
      <Footer />
    </>
  );
}
