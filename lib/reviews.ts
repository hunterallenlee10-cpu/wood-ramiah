// DRAFT: firm to approve each testimonial for use under the Maryland Attorneys' Rules of Professional Conduct on advertising.
// Quotes are word for word, trimmed only where marked with an ellipsis.
// No review or aggregateRating markup is ever generated from this file.

export type Review = { quote: string; name: string; context?: string; source: string };

export const featuredReview: Review = {
  quote:
    "Joann drafted that document from scratch, carefully addressing each of our concerns and questions with clear expertise. Hadley expertly balanced the needs of both seasoned buyers and first-time homebuyers... The result was one of the most efficient closings we have ever experienced.",
  name: "Kathleen H.",
  context: "Family farm purchase",
  source: "via the firm's Qualia client portal",
};

export const reviews: Review[] = [
  {
    quote:
      "She made us feel like her top priority, always taking the time to explain complex legal jargon in simple terms.",
    name: "Jason A.",
    source: "Google",
  },
  {
    quote:
      "They made a complex process effortless... at one point we were exchanging emails at 8 pm on a Sunday evening.",
    name: "John L.",
    source: "Google",
  },
  {
    quote:
      "Her team was prompt, responsive, efficient and thorough from the start of title request, to me signing at the table!",
    name: "Kate B.",
    source: "Google",
  },
  {
    quote:
      "In talking with other professionals (real estate agents, lenders, other attorneys, etc.), Joann's exceptional reputation is well-known in the community.",
    name: "Ashton B.",
    source: "Google",
  },
  {
    quote:
      "I have used this office for my real estate clients and for our personal use (will, trust, poa) and have been very pleased with the service we have received.",
    name: "Derek T.",
    source: "Google",
  },
  {
    quote: "This law firm is the friendliest in the area.",
    name: "Dawn B.",
    source: "Google",
  },
];
