import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { SITE_URL, isLive } from "@/lib/site";
import { business } from "@/lib/business";
import { PlannerProvider } from "@/components/MatterPlanner/context";
import { MatterPlannerLazy } from "@/components/MatterPlanner/Lazy";
import { MobileBar } from "@/components/sections/MobileBar";
import { BackToTop } from "@/components/ui/BackToTop";
import { AnchorFix } from "@/components/ui/AnchorFix";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-source-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: business.shortName,
  authors: [{ name: business.name }],
  formatDetection: { telephone: false },
  robots: isLive
    ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } }
    : { index: false, follow: false, googleBot: { index: false, follow: false } },
  openGraph: {
    type: "website",
    siteName: business.name,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#F6F3EC",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${sourceSans.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-navy focus:px-4 focus:py-3 focus:text-paper"
        >
          Skip to content
        </a>
        <PlannerProvider>
          {children}
          <MobileBar />
          <BackToTop />
          <AnchorFix />
          <MatterPlannerLazy />
        </PlannerProvider>
        {/* Vercel Analytics only exists on Vercel; elsewhere its script 404s and logs a console error. */}
        {process.env.VERCEL && <Analytics />}
      </body>
    </html>
  );
}
