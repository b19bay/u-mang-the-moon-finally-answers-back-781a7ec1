import { writeFileSync, readFileSync, mkdirSync } from "node:fs";

const LINE =
  "You promised you'd change if I gave you a sign. I gave you an eclipse. You posted it.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

if (LINE.length < 1 || LINE.length > 240) {
  console.error(`line is ${LINE.length} characters, must be 1-240`);
  process.exit(1);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  console.error("line must be a single non-blank line");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");

// Read-back check: what landed on disk must be byte-identical to the line
// (ties break on bytes, so the exact byte count is part of the entry).
const back = readFileSync(`${outDir}/entry.txt`, "utf8");
if (back !== LINE || Buffer.byteLength(back, "utf8") !== 85) {
  console.error("read-back mismatch: entry.txt does not match the line");
  process.exit(1);
}
