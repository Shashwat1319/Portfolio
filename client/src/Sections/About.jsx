import { useState, useEffect, useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"
import ImageWithSkeleton from "../Components/ImageWithSkeleton.jsx"
import { projects } from "../data/projects.js"
import { skillCategories } from "../data/skills.jsx"

const START_YEAR = 2024

// Keep these dates in sync with client/public/ShashwatResume.pdf
const experience = [
  {
    title: "Computer Science Instructor",
    company: "Govt. Polytechnic (PPP Mode)",
    date: "Apr 2026 – Present",
    note: "Also a certified trainer under UPSDM Skill India (Govt. of U.P.)",
    points: [
      "Teaching programming, DBMS, and computer fundamentals to diploma students; mentoring on projects and employability skills.",
    ],
  },
  {
    title: "Software Developer Intern",
    company: "Circuit Master AI",
    date: "Jan 2026 – Jun 2026",
    note: "6-month internship program with certificate",
    points: [
      "Developed responsive frontend components and dashboards using React.js in a startup-based product environment.",
      "Integrated backend REST APIs and implemented authentication workflows for secure user access.",
    ],
  },
  {
    title: "MERN Stack Developer",
    company: "Tech Pile Technology Pvt. Ltd.",
    date: "Sep 2024 – Mar 2025",
    points: [
      "Developed 5+ production-ready full-stack modules using React, Node.js, and MongoDB.",
      "Designed and secured REST APIs with JWT authentication and role-based access control.",
      "Optimized MongoDB queries using indexing; fixed 20+ production bugs across live deployments.",
    ],
  },
]

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
    <section id="about" className="relative isolate py-24 px-6 md:px-20 bg-slate-950 overflow-hidden">
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
                <StatItem value={yearsExp} label={yearsExp === 1 ? "Year Exp" : "Years Exp"} suffix="+" />
                <div className="w-px h-12 bg-white/10 mx-4" />
                <StatItem value={totalSkills} label="Skills" suffix="+" />
              </div>
              <div className="pt-4 flex gap-4">
                <a
                  href="/ShashwatResume.pdf"
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
                src="/myphoto.webp"
                alt="Shashwat Srivastava"
                width={1024}
                height={977}
                className="w-full h-full rounded-xl grayscale hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-10 text-gradient">
            Experience
          </h2>
          <ol className="relative border-l border-white/10 ml-1 sm:ml-3 space-y-10">
            {experience.map((job) => (
              <li key={job.title + job.date} className="pl-6 sm:pl-10 relative">
                <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg md:text-xl font-bold text-white">
                    {job.title}{" "}
                    <span className="text-blue-400 font-semibold">— {job.company}</span>
                  </h3>
                  <span className="text-sm text-slate-500 whitespace-nowrap">{job.date}</span>
                </div>
                {job.note && (
                  <p className="text-sm italic text-slate-500 mt-0.5">{job.note}</p>
                )}
                <ul className="mt-2 space-y-1.5 text-slate-400 leading-relaxed">
                  {job.points.map((point) => (
                    <li key={point} className="flex gap-2.5">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  )
}

export default About
