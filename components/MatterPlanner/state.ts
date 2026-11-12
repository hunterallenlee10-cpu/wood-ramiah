import { attorneys, business } from "@/lib/business";
import { listToText, type ListItem } from "@/lib/plan-check";
import type { Matter, Prefill, RealEstateKind, Role } from "./context";

export type FormState = {
  matter?: Matter;
  realEstateKind?: RealEstateKind;
  underContract?: "yes" | "not-yet";
  settlementDate: string;
  town: string;
  role?: Role;
  people: string[];
  planList?: ListItem[];
  relationship: string;
  county?: string;
  otherAbout: string;
  attorney?: "joann" | "hadley" | "none";
  meet?: "office" | "phone";
  days: string[];
  times: string[];
  name: string;
  phone: string;
  callback: string;
  note: string;
  ack: boolean;
};

export const matterOptions: { id: Matter; label: string; hint: string }[] = [
  { id: "real-estate", label: "Real estate", hint: "Buying, selling, refinancing, commercial, for sale by owner contract" },
  { id: "estate-plan", label: "Estate plan", hint: "A will or a trust" },
  { id: "poa", label: "Powers of attorney", hint: "Financial and health care" },
  { id: "probate", label: "Probate", hint: "Settling a loved one's estate" },
  { id: "other", label: "Something else", hint: "Tell us a little about it" },
];

export const realEstateKinds: { id: RealEstateKind; label: string }[] = [
  { id: "buying", label: "Buying" },
  { id: "selling", label: "Selling" },
  { id: "refinancing", label: "Refinancing" },
  { id: "commercial", label: "Commercial" },
  { id: "fsbo", label: "For sale by owner contract" },
];

export const roles: { id: Role; label: string }[] = [
  { id: "buyer", label: "Buyer" },
  { id: "seller", label: "Seller" },
  { id: "owner", label: "Owner refinancing" },
  { id: "agent", label: "Agent or lender" },
];

export const peopleOptions = [
  "Spouse or partner",
  "Children under 18",
  "Adult children",
  "A beneficiary with special needs",
  "Real estate in Maryland",
  "Real estate elsewhere",
];

export const counties = ["St. Mary's", "Calvert", "Charles", "Other"];
export const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
export const timesOfDay = ["Morning", "Afternoon"];

export function initialState(p: Prefill = {}): FormState {
  return {
    matter: p.matter,
    realEstateKind: p.realEstateKind,
    role: p.role,
    settlementDate: "",
    town: "",
    people: [],
    planList: p.planList,
    relationship: "",
    otherAbout: "",
    attorney: p.attorney,
    days: [],
    times: [],
    name: "",
    phone: "",
    callback: "",
    note: p.planList ? `My Plan Check list:\n${listToText(p.planList)}` : "",
    ack: false,
  };
}

export function phoneDigits(v: string) {
  return v.replace(/\D/g, "");
}
export function isValidPhone(v: string) {
  const d = phoneDigits(v);
  return d.length === 10 || (d.length === 11 && d.startsWith("1"));
}

const label = <T extends { id: string; label: string }>(list: T[], id?: string) =>
  list.find((x) => x.id === id)?.label;

/** Plain-text summary used on the success sheet and for "Copy my summary". */
export function summaryRows(s: FormState): { label: string; value: string }[] {
  const rows: { label: string; value: string }[] = [];
  const matter = label(matterOptions, s.matter);
  if (matter) rows.push({ label: "Matter", value: [matter, label(realEstateKinds, s.realEstateKind)].filter(Boolean).join(", ") });
  if (s.matter === "real-estate") {
    if (s.underContract) rows.push({ label: "Under contract", value: s.underContract === "yes" ? "Yes" : "Not yet" });
    if (s.settlementDate) rows.push({ label: "Target settlement", value: s.settlementDate });
    if (s.town) rows.push({ label: "Property town", value: s.town });
    if (s.role) rows.push({ label: "I am the", value: label(roles, s.role)! });
  }
  if ((s.matter === "estate-plan" || s.matter === "poa") && s.people.length)
    rows.push({ label: "In the picture", value: s.people.join(", ") });
  if (s.matter === "probate") {
    if (s.relationship) rows.push({ label: "Relationship", value: s.relationship });
    if (s.county) rows.push({ label: "County", value: s.county });
  }
  if (s.matter === "other" && s.otherAbout) rows.push({ label: "About", value: s.otherAbout });
  if (s.attorney)
    rows.push({
      label: "Meet with",
      value: s.attorney === "none" ? "No preference" : attorneys.find((a) => a.id === s.attorney)!.name,
    });
  if (s.meet) rows.push({ label: "How", value: s.meet === "office" ? "At the office in California" : "By phone" });
  if (s.days.length || s.times.length) rows.push({ label: "When", value: [...s.days, ...s.times].join(", ") });
  if (s.name) rows.push({ label: "Name", value: s.name });
  if (s.phone) rows.push({ label: "Phone", value: s.phone });
  if (s.callback) rows.push({ label: "Best time to call", value: s.callback });
  if (s.note) rows.push({ label: "Note", value: s.note });
  return rows;
}

export function summaryText(s: FormState) {
  return [
    `Consultation request for ${business.name}`,
    ...summaryRows(s).map((r) => `${r.label}: ${r.value}`),
    "",
    `${business.phone.display} · ${business.address.oneLine}`,
  ].join("\n");
}
