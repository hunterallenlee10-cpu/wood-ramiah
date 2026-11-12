import { ImageResponse } from "next/og";
import { ogFonts, SealMark } from "@/lib/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  return new ImageResponse(<SealMark size={180} />, { ...size, fonts: await ogFonts() });
}
