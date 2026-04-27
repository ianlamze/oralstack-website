---
id: NEW_PAGE_ADD_V1
kind: playbook
triggers:
  - add a new marketing page
  - create a /pricing page
  - create a /customers page
  - create a /security page
---

# New Page — Add

## Required inputs

- Page route (e.g. `/pricing`)
- Page intent in one sentence
- Primary CTA (verb + object)

## Steps

1. Read `research/primitives/copy-voice.md` and confirm the headline and CTAs pass the banned-phrase list.
2. Create `app/<route>/page.tsx`. Compose from existing section primitives where possible.
3. If a new section type is needed, add it to `components/sections/` and create a matching pattern file in `research/patterns/components/`.
4. Add per-page metadata via Next's `generateMetadata` if the page needs different `<title>`/`<description>` than the homepage.
5. Update navigation (currently just `Footer.tsx` — add a `Nav` primitive when more than one page lives in nav).
6. Run `npm run typecheck` and `npm run build` — both must pass cleanly.

## Validation

- Headline contains no banned phrase.
- Primary CTA is verb-led.
- Page renders into the static export (`out/<route>/index.html` exists after `npm run build`).
- Page has a unique title and description.
- Page is reachable via at least one crawlable `<a href>` link from the homepage.

## Output

- Files changed: list
- Copy rules confirmed: yes/no per banned-phrase check
- Build status: pass/fail, plus the resulting `out/<route>/` path
