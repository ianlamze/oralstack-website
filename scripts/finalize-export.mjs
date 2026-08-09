import { readdir, rm } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const exportRoot = resolve(projectRoot, "out");

// These routes are useful while designing the site, but they contain internal
// catalogs or archived product concepts. Keep their source available locally
// without publishing them in the static production artifact.
for (const relativePath of ["dev", "journey", "compare", "articles", "lead-magnets", "functions"]) {
  await rm(resolve(exportRoot, relativePath), { recursive: true, force: true });
}

// Keep the truth-bounded /tools/ product guide, but do not publish the older
// interactive concept pages beneath it.
const toolsRoot = resolve(exportRoot, "tools");
for (const entry of await readdir(toolsRoot, { withFileTypes: true })) {
  if (entry.isDirectory()) {
    await rm(resolve(toolsRoot, entry.name), { recursive: true, force: true });
  }
}

console.log("export finalized: internal and archived routes excluded");
