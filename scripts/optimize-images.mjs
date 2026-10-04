// One-off (re-runnable) pass that resizes source images down to the
// largest size they're actually displayed at (checked against the JSX that
// imports each one), then recompresses as webp. Keeps originals in src/assets
// — the only thing this touches is the specific files listed below, each
// capped at ~2x its biggest on-page display size so retina screens still
// look sharp. See the PageSpeed report that prompted this: the hero LCP
// image and the experience-carousel thumbnails were the two biggest
// contributors to a 2.2MB "oversized images" penalty.
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

// [relative path, target max width in px, webp quality]
const targets = [
  // Experience carousel thumbnails (~148px display on Home, ~480px on the
  // experience detail page) — biggest win, several were 1400px wide.
  ['src/assets/experiences/backpacking-latam.webp', 960, 78],
  ['src/assets/experiences/camino-santiago.webp', 960, 78],
  ['src/assets/experiences/voluntariado-lituania.webp', 960, 78],
  ['src/assets/experiences/liderazgo-social-ufv.webp', 960, 78],
  ['src/assets/experiences/seminarios-liderazgo.webp', 960, 78],
  ['src/assets/experiences/cink-venturing.webp', 960, 78],
  ['src/assets/experiences/backpacking-latam-amazonas.webp', 960, 78],
  ['src/assets/experiences/somostalita.webp', 960, 78],
  ['src/assets/experiences/alineacion-equipos.webp', 960, 78],
  ['src/assets/experiences/podcast-menos30.webp', 960, 78],
  ['src/assets/experiences/ruta-inti-2024.jpg', 960, 78],

  // Hero (LCP element, ~340px display) and "Quién soy" crossfade (~230px).
  ['src/assets/foto-alicia.webp', 700, 82],
  ['src/assets/foto-alicia-montana.webp', 700, 82],

  // Testimonial / reference avatars (~64px display in the carousel).
  ['src/assets/testimonios/adriana.jpg', 200, 80],
  ['src/assets/testimonios/lenny.jpg', 200, 80],
  ['src/assets/testimonios/tom.jpg', 200, 80],
  ['src/assets/references/lourdes.png', 200, 80],

  // Timeline company logos (~40px display).
  ['src/assets/logos/ipmark.png', 240, 82],
  ['src/assets/logos/omnicom.png', 240, 82],
  ['src/assets/logos/mahou.png', 240, 82],
  ['src/assets/logos/generation.png', 240, 82],

  // Framework letter glyphs (2000x2000 source, ~56px display max).
  ['src/assets/icons/letter-g.png', 240, undefined],
  ['src/assets/icons/letter-i.png', 240, undefined],
  ['src/assets/icons/letter-n.png', 240, undefined],
];

const fmtKB = (bytes) => `${(bytes / 1024).toFixed(0)}KB`;

let totalBefore = 0;
let totalAfter = 0;

const { writeFileSync, statSync } = await import('fs');

for (const [relPath, maxWidth, quality] of targets) {
  const abs = path.join(root, relPath);
  const before = statSync(abs).size;
  const img = sharp(abs).resize({ width: maxWidth, withoutEnlargement: true });

  // Keep the original format/extension so no import statement needs to
  // change — just resize + recompress in place.
  let buffer;
  if (relPath.endsWith('.png')) {
    buffer = await img.png({ compressionLevel: 9, palette: true }).toBuffer();
  } else if (relPath.endsWith('.jpg') || relPath.endsWith('.jpeg')) {
    buffer = await img.jpeg({ quality, mozjpeg: true }).toBuffer();
  } else {
    buffer = await img.webp({ quality }).toBuffer();
  }

  writeFileSync(abs, buffer);
  const after = statSync(abs).size;

  totalBefore += before;
  totalAfter += after;
  console.log(`${relPath.padEnd(55)} ${fmtKB(before).padStart(7)} -> ${fmtKB(after).padStart(7)}`);
}

console.log(`\nTotal: ${fmtKB(totalBefore)} -> ${fmtKB(totalAfter)}  (saved ${fmtKB(totalBefore - totalAfter)})`);
