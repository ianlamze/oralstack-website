---
description: Screenshot a local route at desktop and mobile widths using scripts/browse.mjs.
argument-hint: <route> (e.g. /compare/plato or just /)
---

Screenshot the route `$ARGUMENTS` at both desktop (1280×1100) and mobile (390×844) viewports.

Steps:

1. Verify the dev server is running on http://localhost:3000. If `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000` is not 200, tell the user to run `npm run dev` in another terminal first and stop. Do NOT start the dev server yourself in the background — the user controls it.

2. If the server is up, take both screenshots:
   ```bash
   node scripts/browse.mjs "http://localhost:3000$ARGUMENTS" --width 1280 --height 1100 --out /tmp/preview-desktop.png
   node scripts/browse.mjs "http://localhost:3000$ARGUMENTS" --width 390 --height 844 --out /tmp/preview-mobile.png
   ```

3. Read both screenshots back with the Read tool so they appear in the conversation.

4. Report what you see at each viewport. Flag anything that looks off: layout overflow, missing content, contrast issues, broken images, mismatched copy, banned voice words.

If `$ARGUMENTS` is empty, default to `/`.
