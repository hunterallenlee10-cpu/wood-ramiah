"use client";

import type { ReactNode } from "react";
import { AlertCircle, Check } from "lucide-react";

/** A single-choice option rendered as a radio card. */
export function OptionCard({
  name,
  checked,
  onSelect,
  label,
  hint,
  children,
}: {
  name: string;
  checked: boolean;
  onSelect: () => void;
  label: string;
  hint?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={`rounded-[2px] border transition-colors duration-150 ${
        checked ? "border-navy bg-bond shadow-[0_0_0_1px_var(--color-navy)]" : "border-rule bg-bond hover:border-navy/50"
      }`}
    >
      <label className="flex min-h-[56px] cursor-pointer items-center gap-4 px-4 py-3">
        <input type="radio" name={name} checked={checked} onChange={onSelect} className="peer sr-only" />
        <span
          aria-hidden
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-navy ${
            checked ? "border-navy bg-navy" : "border-muted/60"
          }`}
        >
          {checked && <span className="h-2 w-2 rounded-full bg-paper" />}
        </span>
        <span className="min-w-0">
          <span className="block font-semibold text-ink">{label}</span>
          {hint && <span className="block text-[16px] leading-snug text-muted">{hint}</span>}
        </span>
      </label>
      {children}
    </div>
  );
}

/** Chip used for single or multi select. */
export function Chip({
  type,
  name,
  checked,
  onChange,
  children,
}: {
  type: "radio" | "checkbox";
  name: string;
  checked: boolean;
  onChange: () => void;
  children: ReactNode;
}) {
  return (
    <label
      className={`inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-[2px] border px-4 text-[17px] font-semibold transition-colors duration-150 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-navy ${
        checked ? "border-navy bg-navy text-paper" : "border-rule bg-bond text-ink/85 hover:border-navy/50"
      }`}
    >
      <input type={type} name={name} checked={checked} onChange={onChange} className="sr-only" />
      {checked && type === "checkbox" && <Check size={16} strokeWidth={2} aria-hidden />}
      {children}
    </label>
  );
}

export function Fieldset({ legend, children, hint }: { legend: string; children: ReactNode; hint?: string }) {
  return (
    <fieldset className="m-0 min-w-0 border-0 p-0">
      <legend className="mb-3 p-0 font-semibold text-ink">
        {legend}
        {hint && <span className="ml-2 font-normal text-muted">{hint}</span>}
      </legend>
      {children}
    </fieldset>
  );
}

export const inputCls =
  "block w-full min-h-[52px] rounded-[2px] border border-rule bg-bond px-4 py-3 text-[17px] text-ink placeholder:text-muted/70 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/25";

export function TextField({
  id,
  label,
  value,
  onChange,
  type = "text",
  optional,
  error,
  autoComplete,
  inputMode,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  optional?: boolean;
  error?: string;
  autoComplete?: string;
  inputMode?: "tel" | "text";
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-semibold text-ink">
        {label}
        {optional && <span className="ml-2 font-normal text-muted">(optional)</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className={`${inputCls} ${error ? "!border-navy !border-2" : ""}`}
      />
      {error && (
        <p id={`${id}-err`} className="mt-2 flex items-start gap-2 text-[16px] font-semibold text-navy">
          <AlertCircle size={18} strokeWidth={1.5} aria-hidden className="mt-[2px] shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
