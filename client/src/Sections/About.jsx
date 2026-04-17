import { motion } from "framer-motion"

function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-20 bg-slate-950 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row items-center gap-16"
        >
          {/* Text Content */}
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-black mb-8 text-gradient">
              About Me
            </h2>
            <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
              <p>
                I’m <span className="font-semibold text-blue-400">Shashwat Srivastava</span>, 
                a MERN Stack Developer based in Lucknow. I specialize in crafting 
                <span className="text-white"> high-performance web experiences</span> that combine 
                clean code with stunning aesthetics.
              </p>
              <p>
                My journey in tech began with a curiosity for how things work under the hood, 
                leading me to a B-Tech in Computer Science (2025). Today, I focus on building 
                <span className="text-white"> scalable full-stack applications</span> using the 
                latest industry standards.
              </p>
              <div className="flex gap-4 pt-4">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white">Lucknow</span>
                  <span className="text-sm uppercase tracking-widest text-blue-500">Location</span>
                </div>
                <div className="w-px h-12 bg-white/10 mx-4"></div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white">B-Tech</span>
                  <span className="text-sm uppercase tracking-widest text-blue-500">Degree</span>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="flex-1 relative group w-full max-w-md">
            <div className="absolute inset-0 bg-blue-600/20 rounded-2xl blur-2xl group-hover:bg-blue-600/30 transition-all duration-500"></div>
            <div className="relative glass-card rounded-2xl p-2 aspect-square flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
              <img 
                src="/myphoto.jpg" 
                alt="Shashwat Srivastava" 
                className="w-full h-full object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About

