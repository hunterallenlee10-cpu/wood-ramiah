// FAQ, answered only from the firm's published facts.
// The FAQPage JSON-LD is generated from this same list, so the markup always matches the page word for word.
import { business } from "./business";

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "Do I need an attorney at my home settlement?",
    a: "Having an attorney at your settlement means someone is there to answer your questions at the table, to review your title, and to help if a contract question comes up. That gives buyers and sellers a real measure of reassurance.",
  },
  {
    q: "Can you help with a for sale by owner contract?",
    a: "Yes. We can draft a for sale by owner contract, review one you already have, and conduct the settlement.",
  },
  {
    q: "Do you handle commercial closings?",
    a: "Yes. We draft and review contracts, review title and conduct settlement for commercial buyers and sellers.",
  },
  {
    q: "Do I need a will or a trust?",
    a: "A will passes your assets through probate. A revocable living trust, once it is funded, can avoid probate. The Plan Check on this page lists the questions worth bringing to a consultation.",
  },
  {
    q: "Can you help after a loved one passes?",
    a: `Yes. We help families with probate and estate administration. Call the office at ${business.phone.display} and we will talk you through the first steps.`,
  },
  {
    q: "Do you hold free seminars?",
    a: `Yes. We hold free ${business.seminar.title} seminars at ${business.seminar.venue}, in the ${business.seminar.room}. Seating is limited, and registration is through the credit union.`,
  },
  {
    q: "Where are you and when are you open?",
    a: `We are at ${business.address.oneLine}. The office is open ${business.hours.display}, and closed Saturday and Sunday.`,
  },
  {
    q: "Is what I send through this website confidential?",
    a: business.notice,
  },
];
