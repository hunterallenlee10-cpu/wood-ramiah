import { ArrowUpRight } from "lucide-react";
import { business } from "@/lib/business";
import { featuredReview, reviews } from "@/lib/reviews";

// DRAFT: firm to approve each testimonial for use under the Maryland Attorneys' Rules of Professional Conduct on advertising.
export function Reviews() {
  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="section border-t border-rule">
      <div className="wrap">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="clause">Reviews</p>
            <h2 id="reviews-heading" className="display mt-5 text-[clamp(38px,4.6vw,62px)] text-navy">
              In our clients&apos; <span className="font-medium italic">words.</span>
            </h2>
          </div>
          {/* DRAFT: use the Google place link at launch. Refresh the count at launch. */}
          <a
            href={business.reviewsUrl}
            target="_blank"
            rel="noopener"
            className="smallcaps inline-flex min-h-[44px] items-center gap-2 text-navy underline decoration-navy/30 decoration-1 underline-offset-[6px] hover:decoration-navy"
          >
            {business.rating.stars} ★ from {business.rating.count} Google reviews
            <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden />
          </a>
        </div>

        <figure className="mt-12 border-y border-rule py-10 lg:mt-14 lg:py-14">
          <blockquote>
            <p className="font-display text-[28px] font-medium italic leading-[1.28] text-navy md:text-[36px] lg:text-[42px]">
              &ldquo;{featuredReview.quote}&rdquo;
            </p>
          </blockquote>
          <figcaption className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-semibold text-ink">{featuredReview.name}</span>
            <span className="text-muted">
              {featuredReview.context}, {featuredReview.source}
            </span>
          </figcaption>
        </figure>

        <div className="mt-10 gap-5 sm:columns-2 lg:columns-3">
          {reviews.map((r) => (
            <figure key={r.name} className="sheet mb-5 break-inside-avoid px-6 pb-6 pt-10">
              <blockquote>
                <p className="text-[18px] leading-[1.6] text-ink">&ldquo;{r.quote}&rdquo;</p>
              </blockquote>
              <figcaption className="mt-4 border-t border-rule pt-3 text-[16px]">
                <span className="font-semibold text-navy">{r.name}</span>
                <span className="text-muted"> · {r.source}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
