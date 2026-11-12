"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Copy, Phone } from "lucide-react";
import { business } from "@/lib/business";
import type { Prefill } from "./context";
import { initialState, isValidPhone, summaryRows, summaryText, type FormState } from "./state";
import { StepAttorney, StepDetails, StepInfo, StepMatter, StepMeet } from "./Steps";

const titles = [
  "What brings you in?",
  "A few details",
  "Who would you like to meet?",
  "How would you like to meet?",
  "Your info",
];

type Props = {
  prefill?: Prefill;
  /** Modal mode passes this so headings can label the dialog. */
  headingId?: string;
  onEditList?: () => void;
  inline?: boolean;
};

// TODO at launch: send submissions to the firm (form service or email), and decide whether to
// embed their existing Qualia instant closing quote widget for real estate requests.
export function PlannerForm({ prefill, headingId, onEditList, inline }: Props) {
  const uid = useId().replace(/:/g, "");
  const [s, set] = useState<FormState>(() => initialState(prefill));
  const [step, setStep] = useState(prefill?.matter ? 1 : 0);
  const [errors, setErrors] = useState<{ name?: string; phone?: string; matter?: string }>({});
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);
  const headRef = useRef<HTMLHeadingElement>(null);
  const shown = useRef({ step, done });
  const hId = headingId ?? `${uid}-h`;
  const Heading = inline ? "h3" : "h2";
  const stepProps = { s, set, uid, labelId: hId };

  // Move focus to the new step heading so keyboard and screen reader users follow along.
  useEffect(() => {
    if (shown.current.step === step && shown.current.done === done) return;
    shown.current = { step, done };
    headRef.current?.focus();
  }, [step, done]);

  const next = () => {
    if (step === 0 && !s.matter) {
      setErrors({ matter: "Please choose what brings you in." });
      return;
    }
    setErrors({});
    setStep((x) => Math.min(4, x + 1));
  };
  const back = () => setStep((x) => Math.max(0, x - 1));

  const submit = () => {
    const e: typeof errors = {};
    if (!s.name.trim()) e.name = "Please add your name so we know who to ask for.";
    if (!isValidPhone(s.phone)) e.phone = "Please add a phone number so we can call you back.";
    setErrors(e);
    if (Object.keys(e).length) {
      document.getElementById(`${uid}-${e.name ? "name" : "phone"}`)?.focus();
      return;
    }
    setDone(true);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summaryText(s));
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };

  if (done)
    return (
      <div className="planner-step">
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[2px] bg-navy text-paper">
            <Check size={26} strokeWidth={2} aria-hidden />
          </span>
          <Heading ref={headRef} tabIndex={-1} id={hId} className="font-display text-[34px] font-semibold leading-[1.05] text-navy outline-none">
            Thank you.
          </Heading>
        </div>
        {/* DRAFT: confirm reply method and timing. */}
        <p className="mt-4 text-[18px] text-ink" role="status">
          The office will call you back during business hours.
        </p>
        {s.matter === "real-estate" && (
          <p className="mt-2 text-muted">Already under contract? Mention it when you call and we can start on title.</p>
        )}
        <dl className="sheet mt-6 px-5 pb-4 pt-8">
          {summaryRows(s).map((r) => (
            <div key={r.label} className="grid gap-1 border-b border-rule py-2.5 last:border-0 sm:grid-cols-[150px_1fr] sm:gap-4">
              <dt className="smallcaps pt-[3px] text-[12px] text-muted">{r.label}</dt>
              <dd className="whitespace-pre-line text-[17px] text-ink">{r.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6 grid gap-3 sm:grid-cols-[1.4fr_1fr]">
          <a href={business.phone.href} className="btn btn-primary !min-h-[60px] !text-[18px]">
            <Phone size={20} strokeWidth={1.5} aria-hidden />
            Call the office now
          </a>
          <button type="button" onClick={copy} className="btn btn-ghost !min-h-[60px]">
            <Copy size={18} strokeWidth={1.5} aria-hidden />
            {copied ? "Copied" : "Copy my summary"}
          </button>
        </div>
        <p className="sr-only" aria-live="polite">
          {copied ? "Summary copied to the clipboard." : ""}
        </p>
      </div>
    );

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (step < 4) next();
        else submit();
      }}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="smallcaps text-[12px] text-muted">
          Step {step + 1} of 5
        </p>
        <p className="smallcaps text-[12px] text-muted">Request a consultation</p>
      </div>
      <div
        className="mt-2 h-[2px] w-full bg-rule"
        role="progressbar"
        aria-label="Progress"
        aria-valuemin={1}
        aria-valuemax={5}
        aria-valuenow={step + 1}
      >
        <div className="h-full bg-navy transition-[width] duration-300 ease-out" style={{ width: `${((step + 1) / 5) * 100}%` }} />
      </div>

      <div key={step} className="planner-step mt-7">
        <Heading ref={headRef} tabIndex={-1} id={hId} className="font-display text-[34px] font-semibold leading-[1.05] text-navy outline-none md:text-[40px]">
          {titles[step]}
        </Heading>
        <div className="mt-6">
          {step === 0 && <StepMatter {...stepProps} />}
          {step === 1 && <StepDetails {...stepProps} onEditList={onEditList} />}
          {step === 2 && <StepAttorney {...stepProps} />}
          {step === 3 && <StepMeet {...stepProps} />}
          {step === 4 && <StepInfo {...stepProps} errors={errors} />}
        </div>
        {errors.matter && step === 0 && (
          <p className="mt-3 font-semibold text-navy" role="alert">
            {errors.matter}
          </p>
        )}

        {step === 4 && (
          <div className="mt-6 border-t border-rule pt-5">
            <p className="text-[16px] leading-[1.6] text-muted">{business.notice}</p>
            <label className="mt-4 flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={s.ack}
                onChange={(e) => set((p) => ({ ...p, ack: e.target.checked }))}
                className="mt-[3px] h-5 w-5 shrink-0 accent-[#192451]"
                required
                aria-describedby={`${uid}-ackhint`}
              />
              <span className="text-[17px] text-ink">
                I understand this does not create an attorney/client relationship and I have not included confidential
                information.
              </span>
            </label>
          </div>
        )}
      </div>

      <div className={`mt-8 flex items-center justify-between gap-3 border-t border-rule bg-bond pt-4 ${inline ? "" : "sticky bottom-0 -mx-5 px-5 pb-5 sm:-mx-8 sm:px-8"}`}>
        {step > 0 ? (
          <button type="button" onClick={back} className="btn btn-ghost !px-5">
            <ArrowLeft size={18} strokeWidth={1.5} aria-hidden />
            Back
          </button>
        ) : (
          <span />
        )}
        {step < 4 ? (
          <button type="submit" className="btn btn-primary">
            Next
            <ArrowRight size={18} strokeWidth={1.5} aria-hidden />
          </button>
        ) : (
          <div className="flex flex-col items-end gap-1">
            <button type="submit" className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-45" disabled={!s.ack}>
              Send my request
            </button>
            <span id={`${uid}-ackhint`} className="text-[16px] text-muted">
              {s.ack ? "Nothing is sent in this preview." : "Tick the box above to send."}
            </span>
          </div>
        )}
      </div>
    </form>
  );
}
