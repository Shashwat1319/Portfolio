function About() {
  return (
    <section id="about" className="py-20 px-6 md:px-20 bg-gray-50">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Text Content */}
        <div className="flex-1">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">
            About Me
            <hr className="mt-5"/>
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            I’m <span className="font-semibold text-blue-600">Shashwat Srivastava</span>, a MERN Stack Developer from Lucknow, Uttar Pradesh. 
            I build full-stack applications using <span className="font-medium text-blue-500">React.js, Node.js, Express.js, and MongoDB</span>.
          </p>
          <p className="text-gray-700 leading-relaxed">
            I focus on writing <span className="font-medium text-blue-500">maintainable code</span> and building practical, real-world applications. 
            I graduated in July 2025 with a B-Tech in Computer Science Engineering from <span className="font-semibold">Rameshwaram Institute of Technology and Management</span>. 
            I’m passionate about web development and continuously learning new technologies to enhance my skills.
          </p>
        </div>

        {/* Optional Graphic / Placeholder Box */}
        <div className="flex-1">
          <div className="w-full h-64 bg-gradient-to from-blue-500 via-purple-500 to-pink-500 rounded-lg shadow-lg flex items-center justify-center text-white text-2xl font-bold">
          <img src="/myphoto.jpg" alt="" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
