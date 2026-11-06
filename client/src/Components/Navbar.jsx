import { useState, useEffect, useRef, useCallback } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { handleSectionNav, sectionRoutes } from "../utils/sectionNav.js"

// path comes from sectionRoutes so a section and its route can never drift
// apart (one source of truth shared with handleSectionNav)
const navLinks = [
  { name: "Home", to: "hero" },
  { name: "About", to: "about" },
  { name: "Skills", to: "skills" },
  { name: "Projects", to: "projects" },
  { name: "Contact", to: "contact" },
].map((link) => ({ ...link, path: sectionRoutes[link.to] }))

// which section a route renders, used to seed the active nav item
const pathToSection = Object.fromEntries(navLinks.map((link) => [link.path, link.to]))

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeId, setActiveId] = useState(pathToSection["/"])
  const activeRef = useRef(pathToSection["/"])
  const menuRef = useRef(null)
  const toggleRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const { pathname } = useLocation()

  // Reads the live DOM on every run instead of using an IntersectionObserver
  // created on route change: at that moment <Routes> (inside AnimatePresence
  // mode="wait") still holds the EXITING page's sections, so an observer set
  // up then would watch nodes that unmount ~300ms later.
  const updateActive = useCallback(() => {
    // same band as the old rootMargin: -45% 0 -45% → the middle 10% of the viewport
    const bandTop = window.innerHeight * 0.55
    const bandBottom = window.innerHeight * 0.45
    let next = null
    for (const link of navLinks) {
      const el = document.getElementById(link.to)
      if (!el) continue
      const rect = el.getBoundingClientRect()
      if (rect.top <= bandTop && rect.bottom >= bandBottom) {
        next = link.to
        break
      }
    }
    if (next && next !== activeRef.current) {
      activeRef.current = next
      setActiveId(next)
    }
  }, [])

  useEffect(() => {
    let rafId = 0
    const handleScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        rafId = 0
        setScrolled(window.scrollY > 20)
        updateActive()
      })
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [updateActive])

  // seed the highlight from the route, then re-read the DOM once the page
  // transition has settled (the new sections mount ~300ms later)
  useEffect(() => {
    const seed = pathToSection[pathname] ?? null
    activeRef.current = seed
    setActiveId(seed)
    const timer = setTimeout(updateActive, 400)
    return () => clearTimeout(timer)
  }, [pathname, updateActive])

  const closeMenu = useCallback(({ refocus = true } = {}) => {
    setOpen(false)
    if (refocus) toggleRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!open) return undefined

    // move focus into the dialog as soon as it opens
    const focusId = requestAnimationFrame(() => {
      menuRef.current?.querySelector("a")?.focus()
    })

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeMenu()
        return
      }
      if (e.key !== "Tab") return
      // trap Tab inside the aria-modal dialog
      const focusables = menuRef.current?.querySelectorAll("a[href]")
      if (!focusables || focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      } else if (!menuRef.current.contains(document.activeElement)) {
        e.preventDefault()
        first.focus()
      }
    }

    // resizing to ≥md hides the menu/backdrop (md:hidden) but `open` would stay
    // true and body overflow would remain hidden → desktop page unscrollable
    const desktopQuery = window.matchMedia("(min-width: 768px)")
    const handleDesktop = (e) => {
      if (e.matches) closeMenu({ refocus: false })
    }

    document.addEventListener("keydown", handleKeyDown)
    desktopQuery.addEventListener("change", handleDesktop)
    document.body.style.overflow = "hidden"

    return () => {
      cancelAnimationFrame(focusId)
      document.removeEventListener("keydown", handleKeyDown)
      desktopQuery.removeEventListener("change", handleDesktop)
      document.body.style.overflow = ""
    }
  }, [open, closeMenu])

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/80 backdrop-blur-xl border-b border-white/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      {/* z-50 keeps the header row above the z-40 backdrop that follows it */}
      <div className="relative z-50 max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link
          to="/"
          onClick={(e) => handleSectionNav(e, "hero")}
          className="text-2xl font-black tracking-tighter text-white cursor-pointer no-underline"
        >
          <span>
            SHASHWAT<span className="text-blue-500">.</span>
          </span>
        </Link>

        <ul className="hidden md:flex gap-8">
          {navLinks.map((link) => {
            const isActive = activeId === link.to
            return (
              <li key={link.to}>
                <Link
                  to={link.path}
                  onClick={(e) => handleSectionNav(e, link.to)}
                  aria-current={isActive ? "page" : undefined}
                  className={`text-sm font-medium transition-all cursor-pointer relative group ${
                    isActive ? "text-blue-500" : "text-slate-300 hover:text-white"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-blue-500 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              </li>
            )
          })}
        </ul>

        <button
          ref={toggleRef}
          className="md:hidden text-white p-2 relative z-50"
          onClick={() => (open ? closeMenu() : setOpen(true))}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls={open ? "mobile-menu" : undefined}
        >
          <div className="w-6 h-5 flex flex-col justify-between items-center relative">
            <span className={`w-full h-0.5 bg-current transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-full h-0.5 bg-current transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`w-full h-0.5 bg-current transition-all ${open ? "-rotate-45 -translate-y-2.5" : ""}`} />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            animate={prefersReducedMotion ? {} : { opacity: 1 }}
            exit={prefersReducedMotion ? {} : { opacity: 0, transition: { duration: 0.2 } }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden z-40"
            onClick={() => closeMenu()}
            aria-hidden="true"
          />
        )}
        {open && (
          <motion.div
            ref={menuRef}
            key="menu"
            initial={prefersReducedMotion ? {} : { opacity: 0, height: 0 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, height: "auto" }}
            exit={prefersReducedMotion ? {} : { opacity: 0, height: 0, transition: { duration: 0.25 } }}
            id="mobile-menu"
            className="relative md:hidden bg-slate-900/95 backdrop-blur-2xl border-b border-white/5 overflow-hidden z-40"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <ul className="flex flex-col gap-4 px-6 py-8">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.path}
                    onClick={(e) => {
                      closeMenu({ refocus: false })
                      handleSectionNav(e, link.to)
                    }}
                    className="text-lg font-medium text-slate-300 hover:text-white block transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
