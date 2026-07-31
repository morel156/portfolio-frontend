import sharp from "sharp";
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

// Même dégradé que le badge "GM" de la navbar (cyan-400 -> blue-600),
// coins arrondis, initiales blanches en gras.
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#22d3ee"/>
      <stop offset="1" stop-color="#2563eb"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="15" fill="url(#g)"/>
  <text x="32" y="33" text-anchor="middle" dominant-baseline="central"
        font-family="Arial, Helvetica, sans-serif" font-weight="800"
        font-size="27" fill="#ffffff" letter-spacing="-0.5">GM</text>
</svg>
`.trim();

mkdirSync(join(root, "app"), { recursive: true });
mkdirSync(join(root, "public"), { recursive: true });

writeFileSync(join(root, "app", "icon.svg"), svg);

const renders = [
  { size: 16, buf: null },
  { size: 32, buf: null },
  { size: 48, buf: null },
  { size: 180, out: join(root, "app", "apple-icon.png") },
  { size: 192, out: join(root, "public", "icon-192.png") },
  { size: 512, out: join(root, "public", "icon-512.png") },
];

const pngBuffers = {};

for (const r of renders) {
  const buf = await sharp(Buffer.from(svg)).resize(r.size, r.size).png().toBuffer();
  pngBuffers[r.size] = buf;
  if (r.out) writeFileSync(r.out, buf);
}

// app/icon.png (source pour le <link rel="icon"> généré par Next, taille de base 32px)
writeFileSync(join(root, "app", "icon.png"), pngBuffers[32]);

// ── Assemble favicon.ico (format "PNG-in-ICO", supporté partout depuis longtemps) ──
function buildIco(entries) {
  const count = entries.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(count, 4);

  let offset = 6 + count * 16;
  const dirEntries = [];
  const imageDatas = [];

  for (const { size, buf } of entries) {
    const dir = Buffer.alloc(16);
    dir.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 = 256)
    dir.writeUInt8(size >= 256 ? 0 : size, 1); // height
    dir.writeUInt8(0, 2); // color palette
    dir.writeUInt8(0, 3); // reserved
    dir.writeUInt16LE(1, 4); // color planes
    dir.writeUInt16LE(32, 6); // bits per pixel
    dir.writeUInt32LE(buf.length, 8); // size of image data
    dir.writeUInt32LE(offset, 12); // offset of image data
    offset += buf.length;
    dirEntries.push(dir);
    imageDatas.push(buf);
  }

  return Buffer.concat([header, ...dirEntries, ...imageDatas]);
}

const ico = buildIco([
  { size: 16, buf: pngBuffers[16] },
  { size: 32, buf: pngBuffers[32] },
  { size: 48, buf: pngBuffers[48] },
]);
writeFileSync(join(root, "app", "favicon.ico"), ico);

console.log("Icônes générées : app/icon.svg, app/icon.png, app/favicon.ico, app/apple-icon.png, public/icon-192.png, public/icon-512.png");
