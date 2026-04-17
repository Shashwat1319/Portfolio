import { motion } from "framer-motion"

const skillCategories = [
  {
    title: "Frontend",
    skills: ["React.js", "JavaScript", "HTML5", "CSS3", "Vite", "Tailwind CSS"]
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "REST APIs", "Mongoose"]
  },
  {
    title: "Database",
    skills: ["MongoDB"]
  },
  {
    title: "Tools & Others",
    skills: ["Git", "GitHub", "Postman", "EmailJS", "Responsive Design"]
  }
]

function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
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
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {skillCategories.map((category, idx) => (
            <div key={idx} className="space-y-6">
              <h3 className="text-blue-500 font-bold uppercase tracking-widest text-sm px-2">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, sIdx) => (
                  <motion.span
                    key={sIdx}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="glass-card px-4 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] cursor-default border-white/5"
                  >
                    {skill}
                  </motion.span>
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

