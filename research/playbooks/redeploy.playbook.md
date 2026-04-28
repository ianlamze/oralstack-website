---
id: REDEPLOY_V1
kind: playbook
triggers:
  - redeploy
  - publish changes
  - push to production
  - ship to oralstack.com
---

# Redeploy to production

The site lives at https://oralstack.com (Cloudflare Pages, project name `oralstack`). Redeploys are non-destructive — every deploy is a separate version with a unique `*.oralstack.pages.dev` URL, and the canonical domain points at the latest production deploy.

## Pre-checks

- `npx wrangler whoami` confirms authentication. If not authed, run `npx wrangler login` (interactive — opens browser). Tokens persist for ~30 days.
- Working tree should be in the desired state. The deploy uses whatever is in the repo — no git commit required (we use `--commit-dirty=true`).
- Local build passes (optional but recommended): `npm run build`

## Steps

1. From `oralstack/` directory, run:

   ```bash
   npm run deploy
   ```

   Which is `npm run build:cf && wrangler pages deploy out --project-name=oralstack --commit-dirty=true --branch=main`. Takes ~30–60 seconds and always targets production.

2. Wrangler returns a deployment URL like `https://abc12345.oralstack.pages.dev` — that's the immutable preview for this deploy.

3. The canonical `https://oralstack.com` updates to the new deploy within ~30 seconds (Cloudflare's edge cache invalidates).

## Validation

- `npm run deploy` exits 0
- New `*.pages.dev` URL returns 200
- `https://oralstack.com/` returns 200 and serves the new build (use a hard refresh to bypass browser cache, or curl)
- Spot-check the route(s) that changed
- Optional: verify OG image still serves with correct content-type:
  ```bash
  curl -sI https://oralstack.com/opengraph-image | grep -iE "content-type"
  ```
  Expected: `content-type: image/png` (the `_headers` file enforces this — if you see `application/octet-stream`, the `_headers` file got dropped from the build).

## Rollback

To roll back to a previous deploy:

1. Cloudflare dashboard → Workers & Pages → oralstack → Deployments tab
2. Find the previous good deployment → click "Rollback"

Or via CLI: `npx wrangler pages deployment list --project-name=oralstack` to find the deployment ID, then redeploy via dashboard.

## Output

- Deployment URL (`*.pages.dev`)
- Production URL status
- Routes verified
- Any errors

## Common issues

- **"Project not found"** — first deploy. Run `npx wrangler pages project create oralstack --production-branch=main` first.
- **"Email not verified"** — Cloudflare account email needs verification. One-time gate, not a code issue.
- **Wrangler not authed** — run `npx wrangler login`.
- **`_headers` file missing in deploy** — confirm `public/_headers` exists in the repo. Pages copies anything in `public/` to the deploy automatically.
