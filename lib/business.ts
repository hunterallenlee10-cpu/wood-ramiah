// Every business fact on the site lives here, so the firm can edit wording
// without touching components. Use only facts the firm has published.
// Name, address and phone must match the Google Business Profile exactly.

export const business = {
  name: "Wood & Ramiah, LLC",
  shortName: "Wood & Ramiah",
  formerName: "The Law Office of Joann M. Wood, LLC",
  tagline: "A law office serving Southern Maryland.",
  promise: "Professional, competent, and caring legal services.",
  googleCategory: "Real estate attorney",

  phone: {
    display: "(301) 737-8882",
    href: "tel:+13017378882",
    e164: "+13017378882",
  },
  // Fax is text only, never a link. Footer and /contact only.
  fax: "(301) 862-2001",
  // DRAFT: confirm if the office line accepts texts. No sms: links until confirmed.
  // DRAFT: ask the firm for an intake email. No email address is shown anywhere.

  address: {
    street: "23087 Three Notch Road",
    city: "California",
    state: "MD",
    stateFull: "Maryland",
    zip: "20619",
    county: "St. Mary's County",
    oneLine: "23087 Three Notch Road, California, MD 20619",
  },
  geo: { lat: 38.3014649, lng: -76.5162935 },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Wood+%26+Ramiah%2C+LLC%2C+23087+Three+Notch+Road%2C+California%2C+MD+20619",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=23087+Three+Notch+Road%2C+California%2C+MD+20619",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=23087+Three+Notch+Road,+California,+MD+20619&output=embed",
  // DRAFT: use the Google place link for the reviews at launch.
  reviewsUrl:
    "https://www.google.com/search?q=Wood+%26+Ramiah+LLC+23087+Three+Notch+Road+California+MD+reviews",

  hours: {
    display: "Monday to Friday, 9 AM to 5 PM",
    short: "Mon to Fri · 9 to 5",
    closed: "Closed Saturday and Sunday",
    opens: "09:00",
    closes: "17:00",
  },

  // DRAFT: confirm the towns and counties served.
  towns: ["California", "Lexington Park", "Leonardtown", "Hollywood", "Great Mills", "Mechanicsville"],
  counties: ["Calvert County", "Charles County"],
  areaServed: ["St. Mary's County", "Calvert County", "Charles County", "Maryland"],

  rating: {
    // DRAFT: refresh the review count at launch. Checked November 12, 2026.
    stars: "4.6",
    count: 26,
    checked: "November 12, 2026",
  },

  facebook: {
    url: "https://www.facebook.com/TheLawOfficeOfJoannMWoodLlc/",
    label: "Wood & Ramiah on Facebook",
  },
  domain: "woodramiah.com",

  since: 1994,
  experience:
    "Joann Wood, who has been practicing in the Southern Maryland area since 1994, practices primarily in the areas of real estate settlements and estate planning. Hadley Ramiah, who has been practicing in Southern Maryland since 2020, practices primarily in the areas of real estate settlements, estate planning, and probate.",

  notice:
    "If you communicate with us through this website regarding a matter for which our firm does not already represent you, your communication may not be treated as privileged or confidential and shall not be deemed to create an attorney/client relationship. Furthermore, you should not provide confidential information to anyone at our office in an email inquiry.",

  photoCredit: "Photos courtesy of Chris Kalnasy, Kalnasy Photography.",

  seminar: {
    title: "Estate Planning Basics",
    venue: "Cedar Point Federal Credit Union",
    room: "main branch training room",
    // DRAFT: next seminar date. The last one was October 28, 2026.
    next: "To be announced",
  },
} as const;

export type AttorneyId = "joann" | "hadley";

export const attorneys = [
  {
    id: "joann" as AttorneyId,
    name: "Joann M. Wood",
    shortName: "Joann",
    title: "Partner",
    practice: "Real estate settlements and estate planning",
    knowsAbout: ["Real estate settlements", "Estate planning", "Wills", "Trusts"],
    image: "joann" as const,
    prose:
      "Joann has guided Southern Maryland buyers, sellers and families through settlements and estate plans for more than three decades.",
    ledger: [
      { label: "Practicing since", value: "1994, in Southern Maryland" },
      {
        label: "Education",
        value: "Georgetown University Law Center, JD 1994. Salisbury University, BA summa cum laude 1991.",
      },
      {
        label: "Admitted",
        value:
          "Maryland (1994). US District Court for Maryland (1995). Fourth Circuit (1999). Supreme Court of the United States (2005).",
      },
      { label: "Roots", value: "Lifelong St. Mary's County resident. Leonardtown High School." },
      {
        label: "Community",
        value:
          "Three Oaks Center board. Hospice of St. Mary's. Navy League Patuxent River Council board. St. Mary's County and Maryland State Bar Associations since 1994.",
      },
    ],
    alumniOf: ["Georgetown University Law Center", "Salisbury University"],
  },
  {
    id: "hadley" as AttorneyId,
    name: "K. Hadley Ramiah",
    shortName: "Hadley",
    title: "Partner",
    practice: "Real estate settlements, estate planning and probate",
    knowsAbout: ["Real estate settlements", "Estate planning", "Probate", "Estate administration"],
    image: "hadley" as const,
    prose:
      "Hadley grew up in Baton Rouge and has called St. Mary's County home since 2012, where she and Rod are raising their three children.",
    ledger: [
      { label: "Practicing since", value: "2020 in Southern Maryland. With the office since June 2020, partner since January 2026." },
      { label: "Education", value: "LSU Law, Baton Rouge. Auburn University, BA History. War Eagle!" },
      { label: "Admitted", value: "Louisiana (2004). Texas (2008). Maryland (2020)." },
      { label: "Roots", value: "Grew up in Baton Rouge, Louisiana. In St. Mary's County since 2012." },
      {
        label: "Community",
        value: "St. Mary's County Bar Association scholarship committee. Board, Cedar Lane Senior Living Community.",
      },
    ],
    alumniOf: ["LSU Law", "Auburn University"],
  },
] as const;

export const staff = [
  {
    name: "Robyn Hammett",
    // DRAFT: confirm Robyn's role title.
    role: "Closing support (Sample role)",
    line: "Has prepared real estate closing packages for St. Mary's County settlements for years. Grew up in Leonardtown.",
    image: "robyn" as const,
  },
  {
    name: "Kathy Connors",
    role: "Administrative assistant",
    line: "Visitors to the office enjoy Kathy's warm, welcoming voice and smile.",
    image: "kathy" as const,
  },
  {
    name: "Debbie Kalnasy",
    role: "Title producer",
    line: "Maryland licensed title producer, appointed by Old Republic Title.",
    image: "debbie" as const,
  },
  {
    name: "Nancy Colyer",
    role: "Paralegal",
    line: "Paralegal to Joann since 1999. Probate and contract drafting.",
    image: "nancy" as const,
  },
  {
    name: "Janice Knott",
    // DRAFT: confirm Janice's role title.
    role: "Legal support (Sample role)",
    line: "Real estate and estate planning support.",
    image: "janice" as const,
  },
] as const;

export const practiceAreas = [
  "Residential settlements",
  "Commercial transactions",
  "Wills and trusts",
  "Powers of attorney",
  "Probate and estate administration",
] as const;
