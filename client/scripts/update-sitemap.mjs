/**
 * Stamp dist/sitemap.xml <lastmod> with today's date so the sitemap can
 * never go stale: the build runs on every deploy (Netlify + CI), so lastmod
 * always equals the deploy date.
 *
 * Runs after `vite build` — see the "build" script in package.json.
 * The copy in public/ is only the template; dist/ is what ships.
 */
import { readFileSync, writeFileSync } from "node:fs"

const sitemapUrl = new URL("../dist/sitemap.xml", import.meta.url)
const today = new Date().toISOString().slice(0, 10)

const current = readFileSync(sitemapUrl, "utf8")
const updated = current.replace(/<lastmod>[^<]*<\/lastmod>/g, `<lastmod>${today}</lastmod>`)

if (!updated.includes(`<lastmod>${today}</lastmod>`)) {
  console.error(`sitemap.xml: no <lastmod> tags found — nothing was updated`)
  process.exit(1)
}

writeFileSync(sitemapUrl, updated)
console.log(`sitemap.xml: <lastmod> set to ${today}`)
