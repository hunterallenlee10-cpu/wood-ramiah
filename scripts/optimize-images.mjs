// Converts the firm's photos in public/images/raw to .webp in public/images.
// File names are kept (extension changes). Never upscales. The logo is also kept as PNG.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const RAW = "public/images/raw";
const OUT = "public/images";
const MAX = 2000; // long edge cap; next/image builds smaller responsive sizes from this

const files = fs.readdirSync(RAW).filter((f) => /\.(jpe?g|png)$/i.test(f));
const manifest = {};

for (const file of files) {
  const base = file.replace(/\.(jpe?g|png)$/i, "");
  const src = path.join(RAW, file);
  const img = sharp(src);
  const meta = await img.metadata();
  const isLogo = base.startsWith("00-logo");

  const pipeline = sharp(src).resize({
    width: meta.width >= meta.height ? Math.min(meta.width, MAX) : undefined,
    height: meta.height > meta.width ? Math.min(meta.height, MAX) : undefined,
    withoutEnlargement: true,
  });
  const info = await pipeline
    .webp({ quality: isLogo ? 92 : 78, alphaQuality: 100, effort: 6 })
    .toFile(path.join(OUT, `${base}.webp`));
  manifest[base] = { width: info.width, height: info.height };

  if (isLogo) fs.copyFileSync(src, path.join(OUT, `${base}.png`));
  console.log(`${base}.webp  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB`);
}

fs.writeFileSync(path.join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2));
