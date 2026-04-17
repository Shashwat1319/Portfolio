import { motion } from "framer-motion"
import ProjectCard from "../Components/ProjectsCard.jsx"
import { projects } from "../data/projects.js"

function Projects() {
  return (
    <section id="projects" className="py-24 px-6 md:px-20 bg-slate-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-gradient">
              Featured Work
            </h2>
            <p className="text-slate-400 text-lg">
              A selection of my most impactful projects, ranging from AI tools to full-stack management systems.
            </p>
          </div>
          <div className="pb-2">
            <span className="text-blue-500 font-mono text-sm uppercase tracking-widest">
              Recent Projects // 02
            </span>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Projects

