import { useState, useEffect, useRef } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { handleSectionNav } from "../utils/sectionNav.js"

const navLinks = [
  { name: "Home", to: "hero", path: "/" },
  { name: "About", to: "about", path: "/about" },
  { name: "Skills", to: "skills", path: "/skills" },
  { name: "Projects", to: "projects", path: "/projects" },
  { name: "Contact", to: "contact", path: "/contact" },
]

// which section a route renders, used to seed the active nav item
const pathToSection = Object.fromEntries(navLinks.map((link) => [link.path, link.to]))

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeId, setActiveId] = useState(pathToSection["/"])
  const visibleRef = useRef(new Set())
  const prefersReducedMotion = useReducedMotion()
  const { pathname } = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // seed the highlight from the route (works on routes with a single section)
  useEffect(() => {
    setActiveId(pathToSection[pathname] ?? null)
  }, [pathname])

  // keep the highlight in sync with the section in view (replaces react-scroll spy)
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.to))
      .filter(Boolean)

    if (sections.length === 0) return undefined

    visibleRef.current.clear()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visibleRef.current.add(entry.target.id)
          else visibleRef.current.delete(entry.target.id)
        })
        const firstVisible = navLinks.find((link) => visibleRef.current.has(link.to))
        if (firstVisible) setActiveId(firstVisible.to)
      },
      { rootMargin: "-45% 0px -45% 0px" }
    )
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [pathname])

  const closeMenu = () => setOpen(false)

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") closeMenu()
    }
    if (open) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [open])

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
                  aria-current={isActive ? "true" : undefined}
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
          className="md:hidden text-white p-2 relative z-50"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
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
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}
        {open && (
          <motion.div
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
                      closeMenu()
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
