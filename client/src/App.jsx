import { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from "react-router-dom"
import { AnimatePresence, motion, MotionConfig } from "framer-motion"
import { HelmetProvider, Helmet } from "react-helmet-async"
import CustomCursor from "./Components/CustomCursor.jsx"
import ScrollProgress from "./Components/ScrollProgress.jsx"
import ScrollToTop from "./Components/ScrollToTop.jsx"
import Navbar from "./Components/Navbar.jsx"
import ErrorBoundary from "./Components/ErrorBoundary.jsx"
import { markRouteChange } from "./utils/sectionNav.js"
import Footer from "./Sections/Footer.jsx"
import Hero from "./Sections/Hero.jsx"
import About from "./Sections/About.jsx"
import Skills from "./Sections/Skills.jsx"
import Projects from "./Sections/Projects.jsx"
import Contact from "./Sections/Contact.jsx"

const SITE_URL = "https://shashwat-srivastava.netlify.app"
const OG_IMAGE = `${SITE_URL}/og-image.jpg`

const notFoundMeta = {
  title: "Page Not Found | Shashwat Srivastava",
  description: "The page you are looking for does not exist. Head back to the portfolio homepage.",
}

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
  // React Router matches /about/, /About etc. — normalize before the lookup
  // so those variants don't get the 404 title + noindex
  const key = path === "/" ? "/" : path.replace(/\/+$/, "").toLowerCase()
  const meta = routeMeta[key]
  const isKnownRoute = Boolean(meta)
  const page = meta || notFoundMeta
  const url = `${SITE_URL}${key}`

  return (
    <Helmet>
      <title>{page.title}</title>
      <meta name="description" content={page.description} />
      {!isKnownRoute && <meta name="robots" content="noindex, follow" />}
      <meta property="og:title" content={page.title} />
      <meta property="og:description" content={page.description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={page.title} />
      <meta name="twitter:description" content={page.description} />
      <meta name="twitter:image" content={OG_IMAGE} />
      {/* canonical only on real routes — a noindex 404 must not claim a URL */}
      {isKnownRoute && <link rel="canonical" href={url} />}
    </Helmet>
  )
}

// A render error is cleared as soon as the user navigates (the boundary is
// keyed by location), instead of requiring a manual reload.
function RouterBoundary({ children }) {
  const { pathname } = useLocation()
  return <ErrorBoundary key={pathname}>{children}</ErrorBoundary>
}

function AppContent() {
  const location = useLocation()

  // a new route always starts at the top — otherwise the browser keeps the
  // previous scroll offset and you land halfway down the new page
  useEffect(() => {
    markRouteChange()
    window.scrollTo({ top: 0, left: 0, behavior: "auto" })
  }, [location.pathname])

  return (
    <>
      <RouteMeta path={location.pathname} />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10001] focus:px-5 focus:py-3 focus:bg-blue-600 focus:text-white focus:rounded-full focus:font-bold focus:no-underline"
      >
        Skip to content
      </a>

      <ScrollProgress />
      <CustomCursor />
      <ScrollToTop />

      <div className="flex flex-col min-h-screen">
        <Navbar />
        {/* tabIndex lets the skip link actually move focus here (Safari/FF
            don't focus fragment targets otherwise); the focus ring is
            suppressed in index.css — a ring around the page is noise */}
        <main id="main-content" tabIndex={-1}>
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
                    <h1 className="sr-only">Technical Skills — Shashwat Srivastava</h1>
                    <Skills />
                  </PageTransition>
                }
              />
              <Route
                path="/projects"
                element={
                  <PageTransition>
                    <h1 className="sr-only">Featured Projects — Shashwat Srivastava</h1>
                    <Projects />
                  </PageTransition>
                }
              />
              <Route
                path="/contact"
                element={
                  <PageTransition>
                    <h1 className="sr-only">Contact Shashwat Srivastava</h1>
                    <Contact />
                  </PageTransition>
                }
              />
              <Route
                path="*"
                element={
                  <PageTransition>
                    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
                      <h1 className="text-8xl font-black text-gradient mb-4">404</h1>
                      <p className="text-xl text-slate-400 mb-8 max-w-md">
                        Page not found. The page you&apos;re looking for doesn&apos;t exist.
                      </p>
                      <Link
                        to="/"
                        className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                      >
                        Back to Home
                      </Link>
                    </div>
                  </PageTransition>
                }
              />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </>
  )
}

function App() {
  // "user" makes every framer-motion animation respect prefers-reduced-motion
  // (transforms/layout are skipped, opacity still fades)
  return (
    <MotionConfig reducedMotion="user">
      <HelmetProvider>
        <Router>
          <RouterBoundary>
            <AppContent />
          </RouterBoundary>
        </Router>
      </HelmetProvider>
    </MotionConfig>
  )
}

export default App
