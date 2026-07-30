import { useState, useEffect, useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"
import ImageWithSkeleton from "../Components/ImageWithSkeleton.jsx"
import { projects } from "../data/projects.js"
import { skillCategories } from "../data/skills.jsx"

const START_YEAR = 2024

function useCountUp(end, duration = 2000, startCounting = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!startCounting) return
    let startTime = null
    let raf

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [end, duration, startCounting])

  return count
}

function StatItem({ value, label, suffix = "" }) {
  const [ref, setRef] = useState(null)
  const [inView, setInView] = useState(false)
  const observerRef = useRef(null)

  useEffect(() => {
    if (!ref) return
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observerRef.current?.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observerRef.current.observe(ref)
    return () => observerRef.current?.disconnect()
  }, [ref])

  const count = useCountUp(value, 2000, inView)

  return (
    <div ref={setRef} className="flex flex-col">
      <span className="text-2xl font-bold text-white">
        {count}{suffix}
      </span>
      <span className="text-sm uppercase tracking-widest text-blue-500">{label}</span>
    </div>
  )
}

function About() {
  const prefersReducedMotion = useReducedMotion()

  const totalProjects = projects.length
  const totalSkills = skillCategories.reduce((sum, cat) => sum + cat.skills.length, 0)
  const yearsExp = Math.max(1, new Date().getFullYear() - START_YEAR)

  return (
    <section id="about" className="py-24 px-6 md:px-20 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row items-center gap-16"
        >
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-black mb-8 text-gradient">
              About Me
            </h2>
            <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
              <p>
                I&apos;m <span className="font-semibold text-blue-400">Shashwat Srivastava</span>,
                a Full-Stack &amp; Backend Engineer based in Lucknow. I specialize in architecting
                <span className="text-white"> robust MERN applications</span>, building scalable APIs,
                and automating complex data-driven workflows.
              </p>
              <p>
                Having completed my B-Tech in Computer Science, my work revolves around solving real-world problems with code. From developing
                <span className="text-white"> autonomous automation systems</span> to integrating AI services,
                I thrive on turning complex business requirements into sleek, high-performance digital experiences.
              </p>
              <div className="flex gap-4 pt-4">
                <StatItem value={totalProjects} label="Projects" suffix="+" />
                <div className="w-px h-12 bg-white/10 mx-4" />
                <StatItem value={yearsExp} label="Year Exp" suffix="+" />
                <div className="w-px h-12 bg-white/10 mx-4" />
                <StatItem value={totalSkills} label="Skills" suffix="+" />
              </div>
              <div className="pt-4 flex gap-4">
                <a
                  href="/resume.pdf"
                  download
                  className="group relative inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white text-sm font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                >
                  <span className="relative z-10">Download CV</span>
                  <svg className="relative z-10 w-4 h-4 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex-1 relative group w-full max-w-md">
            <div className="absolute inset-0 bg-blue-600/20 rounded-2xl blur-2xl group-hover:bg-blue-600/30 transition-all duration-500" />
            <div className="relative glass-card rounded-2xl p-2 aspect-square flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
              <ImageWithSkeleton
                src="/myphoto.jpg"
                alt="Shashwat Srivastava"
                className="w-full h-full rounded-xl grayscale hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
