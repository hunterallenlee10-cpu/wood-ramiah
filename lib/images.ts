// The firm's own photos (Kalnasy Photography). These are the only photos allowed on the site.
// Sizes match the .webp files produced by scripts/optimize-images.mjs.

export type Photo = { src: string; width: number; height: number; alt: string };

export const photos = {
  partners: {
    src: "/images/01-joann-wood-and-hadley-ramiah-partners-at-office-door-BEST.webp",
    width: 1335,
    height: 2000,
    alt: "Joann Wood and Hadley Ramiah outside the Wood & Ramiah office in California, Maryland",
  },
  team: {
    src: "/images/02-TEAM-all-seven-in-front-of-office-three-notch-road.webp",
    width: 2000,
    height: 1335,
    alt: "The seven members of the Wood & Ramiah team in front of the office on Three Notch Road, with the partners seated front centre",
  },
  joann: {
    src: "/images/03-joann-wood-partner-seated-portrait.webp",
    width: 1334,
    height: 2000,
    alt: "Joann M. Wood, partner, seated outside the Wood & Ramiah office",
  },
  hadley: {
    src: "/images/04-hadley-ramiah-partner-seated-portrait.webp",
    width: 1334,
    height: 2000,
    alt: "K. Hadley Ramiah, partner, seated outside the Wood & Ramiah office",
  },
  robyn: {
    src: "/images/05-robyn-hammett-staff-portrait.webp",
    width: 1334,
    height: 2000,
    alt: "Robyn Hammett seated outside the Wood & Ramiah office",
  },
  kathy: {
    src: "/images/06-kathy-connors-staff-portrait.webp",
    width: 1334,
    height: 2000,
    alt: "Kathy Connors standing outside the Wood & Ramiah office",
  },
  debbie: {
    src: "/images/07-debbie-kalnasy-staff-portrait.webp",
    width: 1334,
    height: 2000,
    alt: "Debbie Kalnasy seated outside the Wood & Ramiah office",
  },
  nancy: {
    src: "/images/08-nancy-colyer-staff-portrait.webp",
    width: 1334,
    height: 2000,
    alt: "Nancy Colyer seated outside the Wood & Ramiah office",
  },
  janice: {
    src: "/images/09-janice-knott-staff-portrait.webp",
    width: 1334,
    height: 2000,
    alt: "Janice Knott standing outside the Wood & Ramiah office",
  },
  seal: {
    src: "/images/10-secure-insight-registered-closing-agent-seal.webp",
    width: 1050,
    height: 394,
    alt: "Secure Insight Registered Closing Agent, Trusted and Verified seal",
  },
  logo: {
    src: "/images/00-logo-logo-WR-monogram-transparent.png",
    width: 358,
    height: 229,
    alt: "Wood & Ramiah, LLC logo",
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
