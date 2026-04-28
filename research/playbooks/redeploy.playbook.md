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

The site lives at https://oralstack.com (Cloudflare Pages, project name `oralstack-website`). The default path is auto-deploy: push to `main` and Cloudflare's Git integration builds and ships within ~60 seconds. The manual `npm run deploy` is a fallback for out-of-band hotfixes or a dirty working tree.

## Default — auto-deploy on push

1. Land your change on `main` (merge a PR, or push directly).
2. Cloudflare picks up the commit, runs the build, and the new version is live at `https://oralstack.com` within ~60s.
3. Watch the deploy: Cloudflare dashboard → Workers & Pages → `oralstack-website` → Deployments. Each commit gets its own immutable `*.oralstack-website.pages.dev` URL.
4. If the build fails, the previous deploy keeps serving and Cloudflare flags the failure on the deployments page.

## Manual fallback (`npm run deploy`)

Use when: hotfix is in a dirty working tree, you can't push to main right now, or you need to ship the same commit again to clear a Cloudflare cache state.

### Pre-checks

- `npx wrangler whoami` confirms authentication. If not authed, run `npx wrangler login` (interactive — opens browser). Tokens persist for ~30 days.
- Working tree should be in the desired state. The deploy uses whatever is in the repo — no git commit required (we use `--commit-dirty=true`).
- Local build passes (optional but recommended): `npm run build`

### Steps

1. From `oralstack/` directory, run:

   ```bash
   npm run deploy
   ```

   Which is `npm run build:cf && wrangler pages deploy out --project-name=oralstack-website --commit-dirty=true --branch=main`. Takes ~30–60 seconds and always targets production.

2. Wrangler returns a deployment URL like `https://abc12345.oralstack-website.pages.dev` — that's the immutable preview for this deploy.

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

1. Cloudflare dashboard → Workers & Pages → oralstack-website → Deployments tab
2. Find the previous good deployment → click "Rollback"

Or via CLI: `npx wrangler pages deployment list --project-name=oralstack-website` to find the deployment ID, then redeploy via dashboard.

## Output

- Deployment URL (`*.pages.dev`)
- Production URL status
- Routes verified
- Any errors

## Common issues

- **"Project not found"** — the project must exist in the account; for first-time setup, create the Git-connected project via Cloudflare dashboard (Workers & Pages → Create → Connect to Git) so auto-deploy is wired in. The CLI fallback is `npx wrangler pages project create oralstack-website --production-branch=main`, but that creates a Direct-Upload project that won't auto-deploy.
- **"Email not verified"** — Cloudflare account email needs verification. One-time gate, not a code issue.
- **Wrangler not authed** — run `npx wrangler login`.
- **`_headers` file missing in deploy** — confirm `public/_headers` exists in the repo. Pages copies anything in `public/` to the deploy automatically.
