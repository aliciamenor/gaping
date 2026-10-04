// Generates small "-thumb" variants of the experience photos, for the
// Home carousel (SkillsScroller), which shows them at ~148px — much
// smaller than the ~480px the same source images are sized for on
// /experiencias/:id and /proyecto. Re-run whenever a new experience photo
// is added to src/assets/experiences/.
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import { statSync, writeFileSync } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dir = path.join(root, 'src/assets/experiences');

const THUMB_WIDTH = 340; // ~2.3x the 148px max display width in SkillsScroller
const QUALITY = 75;

const sources = [
  'ruta-inti-2024.jpg',
  'backpacking-latam-amazonas.webp',
  'camino-santiago.webp',
  'voluntariado-lituania.webp',
  'somostalita.webp',
  'cink-venturing.webp',
  'podcast-menos30.webp',
  'alineacion-equipos.webp',
  'liderazgo-social-ufv.webp',
  'seminarios-liderazgo.webp',
  'backpacking-latam.webp',
];

const fmtKB = (bytes) => `${(bytes / 1024).toFixed(0)}KB`;
let totalBefore = 0;
let totalAfter = 0;

for (const file of sources) {
  const srcPath = path.join(dir, file);
  const base = file.replace(/\.(jpg|jpeg|webp)$/i, '');
  const outPath = path.join(dir, `${base}-thumb.webp`);

  const before = statSync(srcPath).size;
  const buffer = await sharp(srcPath)
    .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toBuffer();
  writeFileSync(outPath, buffer);
  const after = statSync(outPath).size;

  totalBefore += before;
  totalAfter += after;
  console.log(`${file.padEnd(35)} ${fmtKB(before).padStart(7)} -> ${path.basename(outPath).padEnd(38)} ${fmtKB(after).padStart(7)}`);
}

console.log(`\nSource total: ${fmtKB(totalBefore)}  ·  New thumbs total: ${fmtKB(totalAfter)}`);
