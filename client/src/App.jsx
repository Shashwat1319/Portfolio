import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { HelmetProvider, Helmet } from "react-helmet-async"
import CustomCursor from "./Components/CustomCursor.jsx"
import ScrollProgress from "./Components/ScrollProgress.jsx"
import ScrollToTop from "./Components/ScrollToTop.jsx"
import Navbar from "./Components/Navbar.jsx"
import Footer from "./Sections/Footer.jsx"
import Hero from "./Sections/Hero.jsx"
import About from "./Sections/About.jsx"
import Skills from "./Sections/Skills.jsx"
import Projects from "./Sections/Projects.jsx"
import Contact from "./Sections/Contact.jsx"

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

function HomePage() {
  return (
    <PageTransition>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </PageTransition>
  )
}

function AppContent() {
  const location = useLocation()

  return (
    <>
      <Helmet>
        <title>Shashwat Srivastava | MERN Stack Developer</title>
        <meta name="description" content="Full-Stack & Backend Engineer specializing in MERN applications, scalable APIs, and automation. Based in Lucknow, India." />
        <meta name="keywords" content="MERN Stack, React, Node.js, Full Stack Developer, Portfolio, Web Developer" />
        <meta name="author" content="Shashwat Srivastava" />
        <meta property="og:title" content="Shashwat Srivastava | MERN Stack Developer" />
        <meta property="og:description" content="Full-Stack & Backend Engineer specializing in MERN applications, scalable APIs, and automation." />
        <meta property="og:type" content="website" />
      </Helmet>

      <ScrollProgress />
      <CustomCursor />
      <ScrollToTop />

      <div className="flex flex-col min-h-screen">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/about"
              element={
                <PageTransition>
                  <Hero />
                  <About />
                </PageTransition>
              }
            />
            <Route
              path="/skills"
              element={
                <PageTransition>
                  <Skills />
                </PageTransition>
              }
            />
            <Route
              path="/projects"
              element={
                <PageTransition>
                  <Projects />
                </PageTransition>
              }
            />
            <Route
              path="/contact"
              element={
                <PageTransition>
                  <Contact />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </>
  )
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <AppContent />
      </Router>
    </HelmetProvider>
  )
}

export default App
