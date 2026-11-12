import { Phone } from "lucide-react";
import { business } from "@/lib/business";

type Props = {
  variant?: "ghost" | "ghost-paper" | "plain";
  label?: string;
  className?: string;
};

export function PhoneLink({ variant = "ghost", label, className = "" }: Props) {
  const text = label ?? `Call ${business.phone.display}`;
  const cls = variant === "plain" ? "" : `btn btn-${variant}`;
  return (
    <a href={business.phone.href} className={`${cls} ${className}`}>
      <Phone size={18} strokeWidth={1.5} aria-hidden />
      {text}
    </a>
  );
}
