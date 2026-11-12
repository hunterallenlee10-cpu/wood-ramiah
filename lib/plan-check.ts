// Plan Check: five questions, and what each answer adds to "Your conversation list".
// Outcome wording comes from the firm's own estate planning page. Do not add legal detail.

export type Answer = "yes" | "no" | "unsure";

export type Outcome = { id: string; text: string; note?: string };

export type Question = {
  id: string;
  text: string;
  /** Which answers add the outcomes to the list. */
  triggers: Answer[];
  outcomes: Outcome[];
};

export const baseItem: Outcome = { id: "base", text: "A will, or a revocable living trust" };

export const questions: Question[] = [
  {
    id: "children",
    text: "Do you have children under 18?",
    triggers: ["yes", "unsure"],
    outcomes: [
      { id: "guardian", text: "A will that names a guardian for your minor child" },
      { id: "minor-trust", text: "A trust for minor beneficiaries" },
    ],
  },
  {
    id: "special-needs",
    text: "Will anything go to someone with a disability, or who receives benefits?",
    triggers: ["yes", "unsure"],
    outcomes: [{ id: "special-needs-trust", text: "A trust for a beneficiary with special needs" }],
  },
  {
    id: "probate",
    text: "Would you like your family to avoid probate?",
    triggers: ["yes", "unsure"],
    outcomes: [
      {
        id: "living-trust",
        text: "A revocable living trust",
        // DRAFT: confirm the firm is comfortable with the "trust funding / deed" wording.
        note: "It must be funded to truly avoid probate. We can prepare the deed for your home.",
      },
    ],
  },
  {
    id: "taxes",
    text: "Are you concerned about estate taxes, or about how much you will leave?",
    triggers: ["yes", "unsure"],
    outcomes: [{ id: "tax", text: "Tax planning inside your will or trust" }],
  },
  {
    id: "decisions",
    text: "If you could not make decisions tomorrow, is it written down who would?",
    triggers: ["no", "unsure"],
    outcomes: [
      { id: "general-poa", text: "A general power of attorney" },
      { id: "health-poa", text: "A health care power of attorney" },
    ],
  },
];

export const answerLabels: Record<Answer, string> = { yes: "Yes", no: "No", unsure: "Not sure" };
export const answerOrder: Answer[] = ["yes", "no", "unsure"];

export type ListItem = Outcome & { toDiscuss: boolean };

export function buildList(answers: Partial<Record<string, Answer>>): ListItem[] {
  const items: ListItem[] = [{ ...baseItem, toDiscuss: false }];
  for (const q of questions) {
    const a = answers[q.id];
    if (a && q.triggers.includes(a)) {
      for (const o of q.outcomes) items.push({ ...o, toDiscuss: a === "unsure" });
    }
  }
  return items;
}

export function readout(count: number): string {
  if (count <= 1) return "A simple will may be all you need. A short consultation will tell you.";
  if (count <= 3) return "More than a simple will. This is a normal, manageable plan.";
  return "This is exactly the kind of conversation Joann and Hadley have with families.";
}

export function listToText(items: ListItem[]): string {
  return items.map((i) => `- ${i.text}${i.toDiscuss ? " (to discuss)" : ""}`).join("\n");
}
