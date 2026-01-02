
import { useState } from "react"
import { Link } from "react-router-dom"

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed w-full bg-white shadow-md z-50">
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center h-16">
        <div className="text-2xl font-bold text-blue-600">Shashwat Srivastava</div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6">
          <li>
            <Link to="/" smooth={true} className="hover:text-blue-600 cursor-pointer">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" smooth={true} className="hover:text-blue-600 cursor-pointer">
              About
            </Link>
          </li>
          <li>
            <Link to="/skills" smooth={true} className="hover:text-blue-600 cursor-pointer">
              Skills
            </Link>
          </li>
          <li>
            <Link to="/projects" smooth={true} className="hover:text-blue-600 cursor-pointer">
              Projects
            </Link>
          </li>
          <li>
            <Link to="/contact" smooth={true} className="hover:text-blue-600 cursor-pointer">
              Contact
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <ul className="md:hidden bg-white shadow-md flex flex-col gap-4 px-6 py-4">
          <li>
            <Link to="hero" smooth={true} onClick={() => setOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="about" smooth={true} onClick={() => setOpen(false)}>
              About
            </Link>
          </li>
          <li>
            <Link to="skills" smooth={true} onClick={() => setOpen(false)}>
              Skills
            </Link>
          </li>
          <li>
            <Link to="projects" smooth={true} onClick={() => setOpen(false)}>
              Projects
            </Link>
          </li>
          <li>
            <Link to="contact" smooth={true} onClick={() => setOpen(false)}>
              Contact
            </Link>
          </li>
        </ul>
      )}
    </nav>
  )
}

export default Navbar
