import { scroller } from "react-scroll"

/**
 * react-scroll's <Link> renders an <a> with no href (it strips react-scroll
 * props, so the anchor is neither keyboard-focusable nor crawlable) and it
 * unconditionally calls preventDefault(), which kills ctrl/middle-click and
 * makes it impossible to navigate to another route.
 *
 * Instead we render react-router <Link to={route}> (real href) and only take
 * over the click when the target section already exists on the current page —
 * then we smooth-scroll exactly like react-scroll would. Otherwise the router
 * navigates to the route that renders that section.
 */
let routeChangingUntil = 0

// App calls this on every route change. During the ~300ms AnimatePresence
// transition the DOM still holds the PREVIOUS page's sections, so a section
// lookup in that window would target nodes that are about to unmount — in
// that window we let the router navigate instead of scrolling a dying page.
export function markRouteChange() {
  routeChangingUntil = Date.now() + 400
}

export function handleSectionNav(event, sectionId) {
  // let modified clicks through to the browser (new tab / new window)
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  if (event.button !== undefined && event.button !== 0) return

  // mid-route-change → fall through to the router
  if (Date.now() < routeChangingUntil) return

  const el = document.getElementById(sectionId)
  if (!el) return // not on this page → router navigates

  event.preventDefault()
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (prefersReducedMotion) {
    el.scrollIntoView() // instant jump — react-scroll's rAF animation ignores reduce
  } else {
    scroller.scrollTo(sectionId, { smooth: true })
  }
}
