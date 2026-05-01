---
description: Section-by-section preview of a local route at desktop and mobile widths.
argument-hint: <route> (e.g. /compare/plato or just /) [--quick]
---

Preview the route `$ARGUMENTS` at desktop (1280×1100) and mobile (390×844) viewports.

Default mode is **sections** — each top-level block under `<main>` is captured as its own bounded image, named by heading, and listed in an `index.md`. Each image is small (typically <300 KB) so they read back into the conversation cleanly without overwhelming context.

Steps:

1. Verify the dev server is running on http://localhost:3000. If `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000` is not 200, tell the user to run `npm run dev` in another terminal first and stop. Do NOT start the dev server yourself in the background — the user controls it.

2. Parse `$ARGUMENTS` for an optional `--quick` flag, which switches to viewport-only mode (single fold-of-the-page screenshot per width — fastest, but misses below-fold content). Strip the flag from the route path.

3. **Default (sections mode):**
   ```bash
   ROUTE="<route from $ARGUMENTS, default />"
   SLUG=$(echo "$ROUTE" | sed 's|/$||; s|^/||; s|/|-|g'); SLUG=${SLUG:-home}
   node scripts/browse.mjs "http://localhost:3000$ROUTE" --mode sections --width 1280 --height 1100 --out "/tmp/preview-$SLUG-desktop"
   node scripts/browse.mjs "http://localhost:3000$ROUTE" --mode sections --width 390 --height 844 --out "/tmp/preview-$SLUG-mobile"
   ```
   Then Read each `index.md` first, then Read the section PNGs that look interesting based on heading + height.

4. **Quick mode (`--quick`):**
   ```bash
   node scripts/browse.mjs "http://localhost:3000$ROUTE" --mode viewport --width 1280 --height 800 --out /tmp/preview-fold-desktop.png
   node scripts/browse.mjs "http://localhost:3000$ROUTE" --mode viewport --width 390 --height 844 --out /tmp/preview-fold-mobile.png
   ```
   Then Read both PNGs.

5. Report what you see at each viewport. Flag anything that looks off: layout overflow, missing content, contrast issues, broken images, mismatched copy, banned voice words. When in sections mode, name sections by their heading.

If `$ARGUMENTS` is empty, default route to `/`.
