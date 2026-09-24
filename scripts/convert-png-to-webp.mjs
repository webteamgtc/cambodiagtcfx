// PNG → WebP conversion script using sharp
// Run: node scripts/convert-png-to-webp.mjs

import sharp from 'sharp';
import { readdirSync, statSync, existsSync } from 'fs';
import { join, extname, dirname, basename } from 'path';

const PUBLIC_DIR = './public';

// Find all PNGs recursively
function findPngs(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      results.push(...findPngs(full));
    } else if (extname(full).toLowerCase() === '.png' && stat.size > 50 * 1024) {
      results.push(full);
    }
  }
  return results;
}

const pngs = findPngs(PUBLIC_DIR);
console.log(`Found ${pngs.length} PNGs > 50KB to convert\n`);

let converted = 0;
let skipped = 0;
let failed = 0;

for (const src of pngs) {
  const dest = src.replace(/\.png$/i, '.webp');
  if (existsSync(dest)) {
    console.log(`  SKIP (exists): ${dest}`);
    skipped++;
    continue;
  }
  try {
    const srcStat = statSync(src);
    await sharp(src)
      .webp({ quality: 82, effort: 4 })
      .toFile(dest);
    const destStat = statSync(dest);
    const savings = (((srcStat.size - destStat.size) / srcStat.size) * 100).toFixed(1);
    console.log(`  OK: ${src.replace('./public/', '')} → .webp  [${(srcStat.size/1024).toFixed(0)}KB → ${(destStat.size/1024).toFixed(0)}KB, -${savings}%]`);
    converted++;
  } catch (err) {
    console.error(`  FAIL: ${src} — ${err.message}`);
    failed++;
  }
}

console.log(`\nDone: ${converted} converted, ${skipped} skipped, ${failed} failed`);
