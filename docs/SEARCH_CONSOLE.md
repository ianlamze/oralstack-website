# Google Search Console setup

Submitting `oralstack.com` to Google Search Console gets the site indexed faster, surfaces ranking + impression data, and is the gateway for richer Google features (rich results, sitelinks, structured data validation).

This is a one-time setup. ~10 minutes if `oralstack.com` is on Cloudflare DNS (it is).

## Step 1 — Create the property

1. Sign in to https://search.google.com/search-console with your Google account.
2. Click **Add Property** → choose **Domain** (recommended — covers `https://`, `http://`, `www.`, and all subdomains in one record).
3. Enter `oralstack.com` (no `https://`, no `www.`).
4. Google shows you a **TXT record** to add for ownership verification.

## Step 2 — Verify ownership via Cloudflare DNS

Two paths. Path A is what you want.

### Path A — DNS verification (recommended, ~3 min)

1. Copy the TXT record value Google provides (looks like `google-site-verification=abcde…`).
2. In Cloudflare dashboard: select `oralstack.com` → **DNS** → **Records** → **Add record**
3. Set:
   - Type: **TXT**
   - Name: `@` (or `oralstack.com`)
   - Content: paste the verification string Google gave you
   - TTL: Auto
4. Save.
5. Back in Search Console: click **Verify**. Should succeed within 1–2 minutes (Cloudflare propagation is fast).

You can leave the TXT record in place — Google occasionally re-verifies.

### Path B — HTML meta tag (fallback, requires redeploy)

If DNS verification fails for any reason, Search Console offers an HTML meta tag option. To use it:

1. Copy the meta tag content value (the part after `content="…"`).
2. Add to `oralstack/.env.local`:
   ```
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-token-here
   ```
3. The site already wires this env var into `<head>` when set (see `app/layout.tsx`). Tell me — I rebuild and redeploy. Once the new build is live, click Verify in Search Console.

Path A is faster and persists at the DNS layer. Use B only if A breaks.

## Step 3 — Submit the sitemap

Once verified:

1. Search Console → left sidebar → **Sitemaps**
2. Enter `sitemap.xml` (just the path — Google prepends the domain)
3. Submit.

Search Console will show **Success · X URLs discovered** within a few hours. The sitemap auto-updates whenever a new article, page, or case study is added — no further action.

## Step 4 — Sanity checks (do these on day 1)

In Search Console, click each:

- **URL Inspection** — paste `https://oralstack.com/` → click **Test live URL** → expect "URL is available to Google" with rich-result eligibility. Repeat for `/articles/plato-to-cloud-migration/`.
- **Coverage** — should show all sitemap URLs as "Submitted" within 24h, indexed within 1–7 days.
- **Enhancements → Article** — should detect Article schema on `/articles/*` pages.
- **Enhancements → Breadcrumbs** — should detect breadcrumb schema on article pages.

## Step 5 — Cadence

Once a week for the first month, then monthly:

- Check **Performance** report — top queries, top pages, click-through rate, average position.
- Check **Coverage** for any errors or warnings.
- Check **Enhancements** for any structured data warnings.
- New articles: paste their URLs into **URL Inspection** → **Request Indexing** to nudge Google. Not required (Google finds them via sitemap eventually) but speeds up first crawl by 1–3 days.

## What success looks like

- **Week 1:** sitemap submitted, all pages discovered, indexing in progress
- **Week 2–4:** primary pages indexed, first impressions for brand queries (`Oralstack`, `oralstack.com`)
- **Month 2–3:** long-tail dental ops queries (`Plato dental software alternative`, `dental no-show rate`) start showing impressions
- **Month 3–6:** real CTR on long-tail; Search Console becomes the primary content-strategy feedback loop

SEO is a long compounding game. Submit, then go write more articles.
