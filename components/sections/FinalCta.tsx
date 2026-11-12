import Image from "next/image";
import { photos } from "@/lib/images";
import { ConsultButton } from "@/components/ui/ConsultButton";
import { PhoneLink } from "@/components/ui/PhoneLink";

export function FinalCta() {
  return (
    <section aria-labelledby="cta-heading" className="on-navy relative isolate overflow-hidden bg-navy text-paper">
      <Image
        src={photos.team.src}
        alt=""
        fill
        sizes="100vw"
        quality={60}
        className="-z-10 object-cover"
        style={{ objectPosition: "center 40%" }}
      />
      <div className="absolute inset-0 -z-10 bg-navy/[0.82]" aria-hidden />
      <div className="wrap py-[88px] text-center lg:py-[136px]">
        <p className="clause justify-center">Start here</p>
        <h2 id="cta-heading" className="display mx-auto mt-5 max-w-[16ch] text-[clamp(40px,5.6vw,76px)] text-paper">
          Whatever brings you in, <span className="font-medium italic">start with a conversation.</span>
        </h2>
        <div className="mx-auto mt-10 flex max-w-[34rem] flex-col justify-center gap-3 sm:flex-row">
          <ConsultButton variant="paper" />
          <PhoneLink variant="ghost-paper" />
        </div>
      </div>
    </section>
  );
}
