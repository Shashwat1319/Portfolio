import { useState, useEffect, useCallback } from "react"
import { Link as ScrollLink } from "react-scroll"
import { motion, AnimatePresence } from "framer-motion"

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const closeMenu = useCallback(() => setOpen(false), [])

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
  }, [open, closeMenu])

  const navLinks = [
    { name: "Home", to: "hero" },
    { name: "About", to: "about" },
    { name: "Skills", to: "skills" },
    { name: "Projects", to: "projects" },
    { name: "Contact", to: "contact" },
  ]

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/80 backdrop-blur-xl border-b border-white/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a
          href="/"
          className="text-2xl font-black tracking-tighter text-white cursor-pointer no-underline"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            SHASHWAT<span className="text-blue-500">.</span>
          </motion.span>
        </a>

        <ul className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <li key={link.to}>
              <ScrollLink
                to={link.to}
                smooth={true}
                spy={true}
                activeClass="text-blue-500"
                className="text-sm font-medium text-slate-300 hover:text-white transition-all cursor-pointer relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full" />
              </ScrollLink>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden text-white p-2 relative z-50"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
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
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden z-40"
              onClick={closeMenu}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="relative md:hidden bg-slate-900/95 backdrop-blur-2xl border-b border-white/5 overflow-hidden z-40"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <ul className="flex flex-col gap-4 px-6 py-8">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <ScrollLink
                      to={link.to}
                      smooth={true}
                      onClick={closeMenu}
                      className="text-lg font-medium text-slate-300 hover:text-white block transition-colors"
                      tabIndex={open ? 0 : -1}
                    >
                      {link.name}
                    </ScrollLink>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
