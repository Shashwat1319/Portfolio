// src/sections/Skills.jsx
const skills = ["JavaScript", "React.js", "Node.js", "Express.js", "MongoDB", "HTML5", "CSS3", "Git", "Postman"]

function Skills() {
  return (
    <section id="skills" className="py-20 px-6 md:px-20 bg-gray-50">
      <h2 className="text-4xl font-bold mb-10">Skills</h2>
      <div className="flex flex-wrap gap-4">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  )
}

export default Skills
