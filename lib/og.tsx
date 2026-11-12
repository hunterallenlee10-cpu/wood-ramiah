import { readFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();

export async function ogFonts() {
  const [c600, c500i, s400, s600] = await Promise.all([
    readFile(join(root, "assets/fonts/cormorant-garamond-600-normal.woff")),
    readFile(join(root, "assets/fonts/cormorant-garamond-500-italic.woff")),
    readFile(join(root, "assets/fonts/source-sans-3-400-normal.woff")),
    readFile(join(root, "assets/fonts/source-sans-3-600-normal.woff")),
  ]);
  return [
    { name: "Cormorant", data: c600, weight: 600 as const, style: "normal" as const },
    { name: "Cormorant", data: c500i, weight: 500 as const, style: "italic" as const },
    { name: "Source Sans", data: s400, weight: 400 as const, style: "normal" as const },
    { name: "Source Sans", data: s600, weight: 600 as const, style: "normal" as const },
  ];
}

export async function ogPhoto() {
  const buf = await readFile(join(root, "assets/og/partners-460x630.jpg"));
  return `data:image/jpeg;base64,${buf.toString("base64")}`;
}

/** The W&R square monogram for Satori (it cannot use the SVG <text> version). */
export function SealMark({ size }: { size: number }) {
  const inset = Math.max(2, Math.round(size * 0.075));
  return (
    <div
      style={{
        width: size,
        height: size,
        background: "#192451",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: inset,
          left: inset,
          right: inset,
          bottom: inset,
          border: `${Math.max(1, Math.round(size / 48))}px solid #8C91A1`,
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          fontFamily: "Cormorant",
          fontWeight: 600,
          fontSize: size * 0.44,
          lineHeight: 1,
          color: "#F6F3EC",
          marginTop: size * 0.04,
        }}
      >
        <span>W</span>
        <span style={{ fontStyle: "italic", fontWeight: 500, fontSize: size * 0.24, marginBottom: size * 0.16 }}>&amp;</span>
        <span style={{ color: "#C9CCD5" }}>R</span>
      </div>
    </div>
  );
}
