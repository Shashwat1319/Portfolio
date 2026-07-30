import { motion } from "framer-motion"
import { useReducedMotion } from "framer-motion"
import { skillCategories } from "../data/skills.jsx"

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
