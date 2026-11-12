import { Plus } from "lucide-react";
import { faqs } from "@/lib/faq";

/** Native <details> accordion: works without JavaScript, keyboard and screen reader friendly. */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="section border-t border-rule">
      <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.7fr] lg:gap-16">
        <div>
          <p className="clause">Questions</p>
          <h2 id="faq-heading" className="display mt-5 text-[clamp(38px,4.6vw,62px)] text-navy">
            Common <span className="font-medium italic">questions.</span>
          </h2>
          <p className="mt-5 max-w-[22rem] text-muted">Plain answers. For anything about your own matter, call the office.</p>
        </div>
        <div className="border-t border-rule">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-rule">
              <summary className="flex min-h-[64px] cursor-pointer items-center justify-between gap-6 py-4 text-[19px] font-semibold leading-snug text-ink transition-colors hover:text-navy md:text-[20px]">
                <h3 className="m-0 text-inherit">{f.q}</h3>
                <Plus
                  size={22}
                  strokeWidth={1.5}
                  aria-hidden
                  className="shrink-0 text-navy transition-transform duration-200 group-open:rotate-45"
                />
              </summary>
              <p className="measure pb-6 pr-10 text-ink/85">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
