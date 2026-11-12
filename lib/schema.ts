// Structured data. Only true things: no aggregateRating, no review markup, no prices, no awards.
import { attorneys, business } from "./business";
import { faqs } from "./faq";
import { photos } from "./images";
import { SITE_URL } from "./site";

const abs = (path: string) => `${SITE_URL}${path}`;
const FIRM_ID = abs("/#firm");

const areaServed = [
  { "@type": "AdministrativeArea", name: "St. Mary's County, Maryland" },
  { "@type": "AdministrativeArea", name: "Calvert County, Maryland" },
  { "@type": "AdministrativeArea", name: "Charles County, Maryland" },
  { "@type": "State", name: "Maryland" },
];

const services = [
  {
    id: "real-estate-residential",
    name: "Residential real estate settlements",
    description:
      "Drafting a for sale by owner contract, reviewing your real estate contract, reviewing your title abstract, deed preparation, and conducting your settlement for purchases and refinances.",
  },
  {
    id: "real-estate-commercial",
    name: "Commercial real estate transactions",
    description: "Contract drafting, title review and settlement for commercial buyers and sellers.",
  },
  {
    id: "estate-planning-documents",
    name: "Wills and trusts",
    description:
      "Wills, including naming a guardian for a minor child, revocable living trusts, and trusts for minor beneficiaries or beneficiaries with special needs, with tax planning inside a will or trust.",
  },
  {
    id: "powers-of-attorney",
    name: "Powers of attorney",
    description: "General power of attorney and health care power of attorney.",
  },
  {
    id: "probate",
    name: "Probate and estate administration",
    description: "Probate and estate administration for families settling a loved one's estate.",
  },
];

export function homeSchema() {
  const firm = {
    "@type": "LegalService",
    "@id": FIRM_ID,
    name: business.name,
    alternateName: business.formerName,
    description:
      "A law office serving Southern Maryland. Real estate settlements, estate planning and probate from 23087 Three Notch Road, California, MD.",
    url: abs("/"),
    telephone: business.phone.e164,
    faxNumber: "+13018622001",
    logo: abs(photos.logo.src),
    image: abs(photos.team.src),
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.zip,
      addressCountry: "US",
    },
    geo: { "@type": "GeoCoordinates", latitude: business.geo.lat, longitude: business.geo.lng },
    hasMap: business.mapsUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: business.hours.opens,
        closes: business.hours.closes,
      },
    ],
    areaServed,
    sameAs: [business.facebook.url],
    knowsAbout: ["Real estate settlements", "Estate planning", "Wills", "Trusts", "Powers of attorney", "Probate"],
    employee: attorneys.map((a) => ({
      "@type": "Person",
      "@id": abs(`/#${a.id}`),
      name: a.name,
      jobTitle: a.title,
      image: abs(photos[a.image].src),
      alumniOf: a.alumniOf.map((name) => ({ "@type": "EducationalOrganization", name })),
      knowsAbout: [...a.knowsAbout],
      worksFor: { "@id": FIRM_ID },
    })),
  };

  const serviceNodes = services.map((s) => ({
    "@type": "Service",
    "@id": abs(`/#${s.id}`),
    name: s.name,
    serviceType: s.name,
    description: s.description,
    url: abs(`/#${s.id}`),
    provider: { "@id": FIRM_ID },
    areaServed,
  }));

  const faq = {
    "@type": "FAQPage",
    "@id": abs("/#faq"),
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const website = {
    "@type": "WebSite",
    "@id": abs("/#website"),
    url: abs("/"),
    name: business.name,
    publisher: { "@id": FIRM_ID },
    inLanguage: "en-US",
  };

  return { "@context": "https://schema.org", "@graph": [firm, website, ...serviceNodes, faq] };
}

export function breadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: abs("/") },
      { "@type": "ListItem", position: 2, name: "Contact", item: abs("/contact") },
    ],
  };
}
