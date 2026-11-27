// DompetKeluarga — entrypoint: salin app/ dan screenshots/ ke direktori output
// lalu tulis dossier.json dengan buildDossier dari vendor/makefun-frontend.ts.
// Node 22, standard library saja. Deterministik, tanpa network, exit 0 < 10 detik.
import { buildDossier } from "./vendor/makefun-frontend.ts";
import { cpSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

// NOTE: outDir must never be removed. In the grader it is a bind-mount
// (/output), and removing a mount point throws EBUSY and exits 1.
// Only create it (if needed) and write into it.
mkdirSync(outDir, { recursive: true });
cpSync(join(repoRoot, "app"), join(outDir, "app"), { recursive: true });
cpSync(join(repoRoot, "screenshots"), join(outDir, "screenshots"), { recursive: true });
writeFileSync(join(outDir, "dossier.json"), buildDossier(outDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
}));
