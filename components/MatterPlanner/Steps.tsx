"use client";

import type { Dispatch, SetStateAction } from "react";
import { attorneys, business } from "@/lib/business";
import { Chip, Fieldset, OptionCard, TextField, inputCls } from "./fields";
import {
  counties,
  matterOptions,
  peopleOptions,
  realEstateKinds,
  roles,
  timesOfDay,
  weekdays,
  type FormState,
} from "./state";

type StepProps = {
  s: FormState;
  set: Dispatch<SetStateAction<FormState>>;
  uid: string;
  /** id of the step heading, used to label radiogroups */
  labelId: string;
};

const toggle = (list: string[], v: string) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

export function StepMatter({ s, set, uid, labelId }: StepProps) {
  return (
    <div className="grid gap-3" role="radiogroup" aria-labelledby={labelId}>
      {matterOptions.map((m) => (
        <OptionCard
          key={m.id}
          name={`${uid}-matter`}
          checked={s.matter === m.id}
          onSelect={() => set((p) => ({ ...p, matter: m.id }))}
          label={m.label}
          hint={m.hint}
        >
          {m.id === "real-estate" && s.matter === "real-estate" && (
            <div className="border-t border-rule px-4 pb-4 pt-3">
              <Fieldset legend="Which kind?" hint="(optional)">
                <div className="flex flex-wrap gap-2">
                  {realEstateKinds.map((k) => (
                    <Chip
                      key={k.id}
                      type="radio"
                      name={`${uid}-kind`}
                      checked={s.realEstateKind === k.id}
                      onChange={() => set((p) => ({ ...p, realEstateKind: k.id }))}
                    >
                      {k.label}
                    </Chip>
                  ))}
                </div>
              </Fieldset>
            </div>
          )}
        </OptionCard>
      ))}
    </div>
  );
}

export function StepDetails({ s, set, uid, onEditList }: StepProps & { onEditList?: () => void }) {
  if (s.matter === "real-estate")
    return (
      <div className="grid gap-6">
        <Fieldset legend="Are you under contract?">
          <div className="flex flex-wrap gap-2">
            {(["yes", "not-yet"] as const).map((v) => (
              <Chip
                key={v}
                type="radio"
                name={`${uid}-contract`}
                checked={s.underContract === v}
                onChange={() => set((p) => ({ ...p, underContract: v }))}
              >
                {v === "yes" ? "Yes" : "Not yet"}
              </Chip>
            ))}
          </div>
        </Fieldset>
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            id={`${uid}-date`}
            label="Target settlement date"
            type="date"
            optional
            value={s.settlementDate}
            onChange={(v) => set((p) => ({ ...p, settlementDate: v }))}
          />
          <TextField
            id={`${uid}-town`}
            label="Property town"
            value={s.town}
            placeholder="For example, Leonardtown"
            onChange={(v) => set((p) => ({ ...p, town: v }))}
          />
        </div>
        <Fieldset legend="I am the">
          <div className="flex flex-wrap gap-2">
            {roles.map((r) => (
              <Chip
                key={r.id}
                type="radio"
                name={`${uid}-role`}
                checked={s.role === r.id}
                onChange={() => set((p) => ({ ...p, role: r.id }))}
              >
                {r.label}
              </Chip>
            ))}
          </div>
        </Fieldset>
      </div>
    );

  if (s.matter === "estate-plan" || s.matter === "poa")
    return (
      <div className="grid gap-6">
        {s.planList && s.planList.length > 0 && (
          <div className="sheet px-5 pb-4 pt-8">
            <div className="flex items-baseline justify-between gap-4">
              <p className="font-display text-[28px] font-medium italic leading-none text-navy">Your Plan Check list</p>
              {onEditList && (
                <button type="button" onClick={onEditList} className="textlink shrink-0 !min-h-[44px]">
                  Edit
                </button>
              )}
            </div>
            <ol className="mt-3 divide-y divide-rule">
              {s.planList.map((it, i) => (
                <li key={it.id} className="flex gap-3 py-2 text-[17px]">
                  <span className="w-6 shrink-0 font-semibold text-navy/70">{i + 1}.</span>
                  <span>
                    {it.text}
                    {it.toDiscuss && <span className="ml-1.5 text-[15px] text-muted">(to discuss)</span>}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        )}
        <Fieldset legend="Who is in the picture?" hint="(choose any)">
          <div className="flex flex-wrap gap-2">
            {peopleOptions.map((o) => (
              <Chip
                key={o}
                type="checkbox"
                name={`${uid}-people`}
                checked={s.people.includes(o)}
                onChange={() => set((p) => ({ ...p, people: toggle(p.people, o) }))}
              >
                {o}
              </Chip>
            ))}
          </div>
        </Fieldset>
      </div>
    );

  if (s.matter === "probate")
    return (
      <div className="grid gap-6">
        <TextField
          id={`${uid}-rel`}
          label="Your relationship to the person who passed"
          value={s.relationship}
          placeholder="For example, daughter"
          onChange={(v) => set((p) => ({ ...p, relationship: v }))}
        />
        <Fieldset legend="County">
          <div className="flex flex-wrap gap-2">
            {counties.map((c) => (
              <Chip
                key={c}
                type="radio"
                name={`${uid}-county`}
                checked={s.county === c}
                onChange={() => set((p) => ({ ...p, county: c }))}
              >
                {c}
              </Chip>
            ))}
          </div>
        </Fieldset>
      </div>
    );

  return (
    <div>
      <label htmlFor={`${uid}-other`} className="mb-2 block font-semibold text-ink">
        What is it about? <span className="font-normal text-muted">(a sentence is plenty)</span>
      </label>
      <textarea
        id={`${uid}-other`}
        rows={4}
        value={s.otherAbout}
        onChange={(e) => set((p) => ({ ...p, otherAbout: e.target.value }))}
        className={inputCls}
      />
      <p className="mt-3 text-[16px] text-muted">Please do not include confidential details.</p>
    </div>
  );
}

export function StepAttorney({ s, set, uid, labelId }: StepProps) {
  const opts = [
    ...attorneys.map((a) => ({ id: a.id, label: a.name, hint: a.practice })),
    { id: "none" as const, label: "No preference", hint: "The office will match you with the right partner" },
  ];
  return (
    <div className="grid gap-3" role="radiogroup" aria-labelledby={labelId}>
      {opts.map((o) => (
        <OptionCard
          key={o.id}
          name={`${uid}-atty`}
          checked={s.attorney === o.id}
          onSelect={() => set((p) => ({ ...p, attorney: o.id }))}
          label={o.label}
          hint={o.hint}
        />
      ))}
    </div>
  );
}

export function StepMeet({ s, set, uid, labelId }: StepProps) {
  return (
    <div className="grid gap-6">
      <div className="grid gap-3" role="radiogroup" aria-labelledby={labelId}>
        <OptionCard
          name={`${uid}-meet`}
          checked={s.meet === "office"}
          onSelect={() => set((p) => ({ ...p, meet: "office" }))}
          label="At the office in California"
          hint={business.address.oneLine}
        />
        <OptionCard
          name={`${uid}-meet`}
          checked={s.meet === "phone"}
          onSelect={() => set((p) => ({ ...p, meet: "phone" }))}
          label="By phone"
          hint="We call you at a time that suits"
        />
      </div>
      <Fieldset legend="Preferred days" hint="(choose any)">
        <div className="flex flex-wrap gap-2">
          {weekdays.map((d) => (
            <Chip
              key={d}
              type="checkbox"
              name={`${uid}-days`}
              checked={s.days.includes(d)}
              onChange={() => set((p) => ({ ...p, days: toggle(p.days, d) }))}
            >
              {d}
            </Chip>
          ))}
        </div>
      </Fieldset>
      <Fieldset legend="Preferred time">
        <div className="flex flex-wrap gap-2">
          {timesOfDay.map((t) => (
            <Chip
              key={t}
              type="checkbox"
              name={`${uid}-times`}
              checked={s.times.includes(t)}
              onChange={() => set((p) => ({ ...p, times: toggle(p.times, t) }))}
            >
              {t}
            </Chip>
          ))}
        </div>
      </Fieldset>
    </div>
  );
}

export function StepInfo({
  s,
  set,
  uid,
  errors,
}: StepProps & { errors: { name?: string; phone?: string } }) {
  return (
    <div className="grid gap-5">
      <TextField
        id={`${uid}-name`}
        label="Your name"
        autoComplete="name"
        value={s.name}
        error={errors.name}
        onChange={(v) => set((p) => ({ ...p, name: v }))}
      />
      <TextField
        id={`${uid}-phone`}
        label="Phone"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        placeholder="(301) 555-0123"
        value={s.phone}
        error={errors.phone}
        onChange={(v) => set((p) => ({ ...p, phone: v }))}
      />
      <TextField
        id={`${uid}-cb`}
        label="Best time to call you back"
        optional
        placeholder="For example, weekdays after 3"
        value={s.callback}
        onChange={(v) => set((p) => ({ ...p, callback: v }))}
      />
      <div>
        <label htmlFor={`${uid}-note`} className="mb-2 block font-semibold text-ink">
          A short note <span className="font-normal text-muted">(optional)</span>
        </label>
        <textarea
          id={`${uid}-note`}
          rows={s.note.includes("\n") ? 6 : 3}
          value={s.note}
          onChange={(e) => set((p) => ({ ...p, note: e.target.value }))}
          className={inputCls}
        />
      </div>
    </div>
  );
}
