import { motion } from "framer-motion"
import { useReducedMotion } from "framer-motion"

const skillCategories = [
  {
    title: "Frontend",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    skills: [
      { name: "React.js", level: 5 },
      { name: "JavaScript", level: 5 },
      { name: "HTML5", level: 5 },
      { name: "CSS3", level: 4 },
      { name: "Tailwind CSS", level: 4 },
      { name: "Vite", level: 3 },
    ],
  },
  {
    title: "Backend",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    ),
    skills: [
      { name: "Node.js", level: 5 },
      { name: "Express.js", level: 4 },
      { name: "REST APIs", level: 5 },
      { name: "Mongoose", level: 4 },
    ],
  },
  {
    title: "Database",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
      </svg>
    ),
    skills: [{ name: "MongoDB", level: 4 }],
  },
  {
    title: "Tools & Others",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    skills: [
      { name: "Git", level: 4 },
      { name: "GitHub", level: 4 },
      { name: "Postman", level: 3 },
      { name: "EmailJS", level: 3 },
      { name: "Responsive Design", level: 4 },
    ],
  },
]

function SkillLevel({ level }) {
  return (
    <div className="flex gap-1" aria-label={`Skill level ${level} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
            i < level ? "bg-blue-500" : "bg-slate-700"
          }`}
        />
      ))}
    </div>
  )
}

function Skills() {
  const prefersReducedMotion = useReducedMotion()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.05 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
  }

  return (
    <section id="skills" className="py-24 px-6 md:px-20 bg-slate-950 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-gradient">
            Technical Arsenal
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            A comprehensive list of the technologies and tools I use to bring ideas to life.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {skillCategories.map((category, idx) => (
            <div key={idx} className="space-y-6">
              <div className="flex items-center gap-3 px-2">
                <span className="text-blue-500">{category.icon}</span>
                <h3 className="text-blue-500 font-bold uppercase tracking-widest text-sm">
                  {category.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, sIdx) => (
                  <motion.div
                    key={sIdx}
                    variants={itemVariants}
                    whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
                    className="glass-card px-4 py-2 rounded-xl border-white/5 cursor-default group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                        {skill.name}
                      </span>
                      <SkillLevel level={skill.level} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
