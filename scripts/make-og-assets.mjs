// Builds the JPEG crops used by the generated Open Graph image and icons (Satori cannot read WebP).
import sharp from "sharp";
await sharp("public/images/01-joann-wood-and-hadley-ramiah-partners-at-office-door-BEST.webp")
  .resize(460, 630, { fit: "cover", position: "top" })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile("assets/og/partners-460x630.jpg");
console.log("ok");
