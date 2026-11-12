import { MapPin, Phone } from "lucide-react";
import { business } from "@/lib/business";
import { ConsultButton } from "@/components/ui/ConsultButton";

const tab =
  "flex h-[52px] w-[64px] shrink-0 min-[360px]:w-[76px] flex-col items-center justify-center gap-0.5 rounded-[2px] text-navy active:bg-navy/5";

/** Mobile only: [Call] [Directions] [Request a Consultation], fixed to the bottom. */
export function MobileBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 border-t border-rule bg-paper/95 backdrop-blur-md lg:hidden print:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center gap-1 px-2 py-2">
        <a href={business.phone.href} className={tab}>
          <Phone size={20} strokeWidth={1.5} aria-hidden />
          <span className="text-[13px] font-semibold leading-tight">Call</span>
        </a>
        <a href={business.directionsUrl} target="_blank" rel="noopener" className={tab}>
          <MapPin size={20} strokeWidth={1.5} aria-hidden />
          <span className="text-[13px] font-semibold leading-tight">Directions</span>
        </a>
        <ConsultButton className="!min-h-[52px] min-w-0 flex-1 !px-3 !text-[16px] !leading-tight min-[360px]:whitespace-nowrap">
          Request a Consultation
        </ConsultButton>
      </div>
    </div>
  );
}
