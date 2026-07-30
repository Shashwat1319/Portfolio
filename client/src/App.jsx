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

const SITE_URL = "https://shashwat-srivastava.netlify.app"

const routeMeta = {
  "/": {
    title: "Shashwat Srivastava | MERN Stack Developer Portfolio",
    description: "Full-Stack & Backend Engineer specializing in MERN applications, scalable APIs, and automation. Based in Lucknow, India.",
  },
  "/about": {
    title: "About | Shashwat Srivastava",
    description: "Learn about Shashwat Srivastava — a MERN Stack Developer from Lucknow with expertise in React, Node.js, and scalable backend systems.",
  },
  "/skills": {
    title: "Skills | Shashwat Srivastava",
    description: "Technical skills of Shashwat Srivastava — Frontend (React, JavaScript, Tailwind), Backend (Node.js, Express), Database (MongoDB), and DevOps tools.",
  },
  "/projects": {
    title: "Projects | Shashwat Srivastava",
    description: "Portfolio projects by Shashwat Srivastava — Client Project Tracker, Aura AI, AutoDev, and more full-stack applications.",
  },
  "/contact": {
    title: "Contact | Shashwat Srivastava",
    description: "Get in touch with Shashwat Srivastava for web development opportunities, freelance projects, or collaboration.",
  },
}

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

function RouteMeta({ path }) {
  const meta = routeMeta[path] || routeMeta["/"]
  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={`${SITE_URL}${path}`} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
    </Helmet>
  )
}

function AppContent() {
  const location = useLocation()

  return (
    <>
      <RouteMeta path={location.pathname} />

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
