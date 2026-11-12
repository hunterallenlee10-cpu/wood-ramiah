"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { staff } from "@/lib/business";
import { photos } from "@/lib/images";

/**
 * Five staff portraits. On phones and tablets this is a horizontal swipe strip, where off-screen
 * lazy images would not start loading until swiped into view (showing blank cards). So every
 * portrait switches to eager loading as soon as the strip comes within reach of the viewport.
 */
export function StaffStrip() {
  const ref = useRef<HTMLUListElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "800px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <ul
      ref={ref}
      className="no-scrollbar -mx-5 mt-6 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 md:-mx-10 md:scroll-px-10 md:px-10 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-visible lg:px-0"
      aria-label="Staff"
    >
      {staff.map((p) => {
        const photo = photos[p.image];
        return (
          <li key={p.name} className="w-[68%] shrink-0 snap-start xs:w-[56%] sm:w-[40%] md:w-[30%] lg:w-auto">
            <div className="mounted aspect-[3/4] w-full">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                loading={near ? "eager" : "lazy"}
                sizes="(min-width: 1240px) 216px, (min-width: 1024px) 18vw, (min-width: 768px) 30vw, 68vw"
                quality={70}
                className="object-cover"
                style={{ objectPosition: "50% 22%" }}
              />
            </div>
            <p className="mt-4 font-display text-[28px] font-semibold leading-none text-navy">{p.name}</p>
            <p className="smallcaps mt-2 text-[12px] text-muted">{p.role}</p>
            <p className="mt-2 text-[17px] leading-[1.5] text-ink/85">{p.line}</p>
          </li>
        );
      })}
    </ul>
  );
}
