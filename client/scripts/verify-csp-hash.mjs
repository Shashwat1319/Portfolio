/**
 * The Content-Security-Policy in ../netlify.toml lets the inline JSON-LD
 * script in index.html through via 'sha256-…'. Editing that block without
 * refreshing the hash silently blocks structured data in production, so CI
 * runs this script against the build output to keep the two in sync.
 *
 * Usage:
 *   node scripts/verify-csp-hash.mjs          # verify (CI)
 *   node scripts/verify-csp-hash.mjs --fix    # rewrite the hash in netlify.toml
 *
 * Requires dist/ to exist — run `npm run build` first.
 */
import { readFileSync, writeFileSync } from "node:fs"
import { createHash } from "node:crypto"

const htmlUrl = new URL("../dist/index.html", import.meta.url)
const tomlUrl = new URL("../../netlify.toml", import.meta.url)

const html = readFileSync(htmlUrl, "utf8")
const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)

if (!match) {
  console.error("✗ JSON-LD script not found in dist/index.html")
  process.exit(1)
}

const hash = "sha256-" + createHash("sha256").update(match[1], "utf8").digest("base64")
const toml = readFileSync(tomlUrl, "utf8")

if (process.argv.includes("--fix")) {
  if (!toml.includes("'sha256-")) {
    console.error("✗ no 'sha256-…' source in netlify.toml's script-src to replace")
    process.exit(1)
  }
  writeFileSync(tomlUrl, toml.replace(/'sha256-[^']+'/, `'${hash}'`))
  console.log(`✓ netlify.toml CSP hash updated: ${hash}`)
} else if (!toml.includes(hash)) {
  console.error(
    `✗ netlify.toml CSP hash does not match dist/index.html.\n` +
      `  netlify.toml needs: ${hash}\n` +
      `  run: node scripts/verify-csp-hash.mjs --fix`
  )
  process.exit(1)
} else {
  console.log(`✓ CSP hash matches JSON-LD: ${hash}`)
}
