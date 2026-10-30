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
export function handleSectionNav(event, sectionId) {
  // let modified clicks through to the browser (new tab / new window)
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  if (event.button !== undefined && event.button !== 0) return

  if (!document.getElementById(sectionId)) return // not on this page → router navigates

  event.preventDefault()
  scroller.scrollTo(sectionId, { smooth: true })
}
