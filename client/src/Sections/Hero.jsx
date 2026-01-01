// src/sections/Hero.jsx
import { Link } from "react-scroll"

function Hero() {
  return (
    <section
      id="hero"
      className="h-screen flex flex-col justify-center items-center text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-6"
    >
      <h1 className="text-5xl md:text-6xl font-bold mb-4">
        Hi, I'm Shashwat Srivastava
      </h1>
      <p className="text-lg md:text-xl mb-8">
        MERN Stack Developer | Building Practical & Real-World Applications
      </p>
      <div className="flex gap-6">
        <Link
          to="projects"
          smooth={true}
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 cursor-pointer transition"
        >
          My Projects
        </Link>
        <Link
          to="contact"
          smooth={true}
          className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 cursor-pointer transition"
        >
          Contact Me
        </Link>
      </div>
    </section>
  )
}

export default Hero
