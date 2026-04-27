---
description: Run the full pre-deploy gate (lint, typecheck, build, content check) and report each result.
---

Run the four pre-deploy checks and report each as PASS or FAIL with the relevant output. Run them in order — if one fails, still run the rest so the user sees every issue at once.

```bash
npm run lint
npm run typecheck
npm run build
npm run check:content
```

After all four finish, summarize:
- Each check: PASS or FAIL with a one-line cause if failed.
- If anything fails, list the specific files / errors and propose the smallest fix.
- If everything passes, confirm the static export is in `out/` and remind the user that `npm run deploy` ships to a Cloudflare Pages preview branch (append `--branch=main` for production — see [EXTENDING.md](EXTENDING.md) "Deploy").

Do NOT auto-fix unless the user asks. Just report.
