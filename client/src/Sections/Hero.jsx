// src/sections/Hero.jsx
import { Link } from "react-scroll"

function Hero() {
  return (
    <section
      id="hero"
      className="relative h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden bg-slate-950 animate-mesh-gradient"
      style={{
        backgroundImage: `radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), 
                          radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), 
                          radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%)`
      }}
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] -z-10 animate-pulse delay-700"></div>

      <div className="z-10 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-blue-300 mb-6 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Available for new projects
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
          Hi, I'm <span className="text-blue-500">Shashwat</span>
        </h1>
        
        <p className="text-lg md:text-2xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          MERN Stack Developer specializing in building 
          <span className="text-white font-medium"> premium, scalable applications</span> with modern technology.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="projects"
            smooth={true}
            className="group relative px-8 py-4 bg-blue-600 text-white rounded-full font-semibold overflow-hidden transition-all hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 font-bold">View Projects</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </Link>
          
          <Link
            to="contact"
            smooth={true}
            className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-full font-semibold backdrop-blur-md hover:bg-white/10 transition-all active:scale-95 cursor-pointer"
          >
            Get in touch
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <Link to="about" smooth={true} className="cursor-pointer opacity-40 hover:opacity-100 transition-opacity">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </Link>
      </div>
    </section>
  )
}

export default Hero
