function ProjectCard({ project }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition">
      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
      <p className="text-gray-700 mb-4">{project.description}</p>
      <div className="flex gap-2 flex-wrap">
        {project.tech.map((tech, index) => (
          <span key={index} className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm">
            {tech}
          </span>
        ))}
      </div>
      <div className="mt-4 flex gap-4">
        <button className="btn">
<a href={project.github} target="_blank" className="text-blue-600 hover:underline">
          GitHub
        </a>
        </button>
        
        <a href={project.live} target="_blank" className="text-green-600 hover:underline">
          Live
        </a>
      </div>
    </div>
  )
}

export default ProjectCard
