import { ImageResponse } from "next/og";
import { ogFonts, ogPhoto, SealMark } from "@/lib/og";

export const alt = "Wood & Ramiah, LLC. Real estate settlements and estate planning in California, MD.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const [fonts, photo] = await Promise.all([ogFonts(), ogPhoto()]);
  return new ImageResponse(
    (
      <div style={{ width: 1200, height: 630, display: "flex", background: "#F6F3EC" }}>
        <div
          style={{
            width: 740,
            height: 630,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 0 60px 72px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            <SealMark size={76} />
            <div
              style={{
                display: "flex",
                fontFamily: "Source Sans",
                fontWeight: 600,
                fontSize: 19,
                letterSpacing: 3.5,
                color: "#565D70",
                textTransform: "uppercase",
              }}
            >
              Since 1994 · California, Maryland
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{ fontFamily: "Cormorant", fontWeight: 600, fontSize: 70, lineHeight: 1, color: "#192451", display: "flex", alignItems: "baseline" }}
            >
              <span>Wood</span>
              <span style={{ fontStyle: "italic", fontWeight: 500, width: 68, display: "flex", justifyContent: "center" }}>&amp;</span>
              <span>Ramiah, LLC</span>
            </div>
            <div style={{ width: 520, height: 2, background: "#192451", margin: "30px 0 26px" }} />
            <div style={{ fontFamily: "Source Sans", fontSize: 32, lineHeight: 1.3, color: "#151A2D", maxWidth: 600 }}>
              Real estate settlements and estate planning in California, MD
            </div>
          </div>
          <div style={{ fontFamily: "Source Sans", fontWeight: 600, fontSize: 26, color: "#192451", display: "flex" }}>
            (301) 737-8882 · 23087 Three Notch Road
          </div>
        </div>
        <div style={{ width: 460, height: 630, display: "flex", position: "relative" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo} width={460} height={630} alt="" style={{ width: 460, height: 630, objectFit: "cover" }} />
          <div
            style={{
              position: "absolute",
              top: 16,
              left: 16,
              right: 16,
              bottom: 16,
              border: "1px solid rgba(246,243,236,0.85)",
              display: "flex",
            }}
          />
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
