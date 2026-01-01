// src/sections/Projects.jsx
import ProjectCard from "../Components/ProjectsCard.jsx"
import { projects } from "../data/projects.js"

function Projects() {
  return (
    <section id="projects" className="py-20 px-6 md:px-20 bg-white">
      <h2 className="text-4xl font-bold mb-10">Projects</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}

export default Projects
