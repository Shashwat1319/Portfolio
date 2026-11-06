/**
 * Which route renders which section.
 *
 * handleSectionNav uses this to pick between the two things a nav click can
 * do:
 *   - same route  → smooth-scroll to the section (no history entry, no
 *     remount — the section is already on screen)
 *   - other route → do nothing and let the react-router <Link> navigate.
 *     That keeps the URL, <title>, canonical and the nav highlight in sync
 *     with what is on screen, and every route renders its own section at the
 *     top of the page (see the <Route> definitions in App.jsx), so the user
 *     lands exactly where a scroll would have taken them.
 */
export const sectionRoutes = {
  hero: "/",
  about: "/about",
  skills: "/skills",
  projects: "/projects",
  contact: "/contact",
}

// App calls this on every route change. For ~400ms after one, the DOM may
// still hold the PREVIOUS page's sections (AnimatePresence mode="wait"), so
// a section lookup in that window could target nodes that are about to
// unmount — in that window we fall through to the router instead.
let routeChangingUntil = 0

export function markRouteChange() {
  routeChangingUntil = Date.now() + 400
}

export function handleSectionNav(event, sectionId) {
  // let modified clicks through to the browser (new tab / new window)
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  if (event.button !== undefined && event.button !== 0) return

  // mid-route-change → fall through to the router
  if (Date.now() < routeChangingUntil) return

  const targetRoute = sectionRoutes[sectionId]

  // a different route → let the router navigate (URL + meta stay correct);
  // an unknown sectionId → also let the router handle it
  if (targetRoute !== undefined && targetRoute !== window.location.pathname) return

  const el = document.getElementById(sectionId)
  if (!el) return

  event.preventDefault()
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  // native replacement for react-scroll: same smooth scrolling, minus the
  // dependency — and an instant jump when the user prefers reduced motion
  el.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" })
}
