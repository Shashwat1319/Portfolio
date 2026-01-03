import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./Components/Navbar.jsx"
import Footer from "./Sections/Footer.jsx"
import Hero from "./Sections/Hero.jsx"
import About from "./Sections/About.jsx"
import Skills from "./Sections/Skills.jsx"
import Projects from "./Sections/Projects.jsx"
import Contact from "./Sections/Contact.jsx"

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Routes>
          {/* Single Page Portfolio */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Contact />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <Hero />
                <About />
              </>
            }
          />
          <Route
            path="/skills"
            element={
              <>
                <Skills />
              </>
            }
          />
           <Route
            path="/projects"
            element={
              <>
                <Projects />
              </>
            }
          />
           <Route
            path="/contact"
            element={
              <>
                <Contact />
              </>
            }
          />
        </Routes>

        <Footer />
      </div>
    </Router>
  )
}

export default App
