import { motion } from "framer-motion"

function Footer() {
  const currentYear = new Date().getFullYear()
  
  const socialLinks = [
    { name: "GitHub", url: "https://github.com/Shashwat1319" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/shashwatsrivastava131/" },
    { name: "Twitter", url: "#" },
  ]

  return (
    <footer className="py-12 px-6 md:px-20 bg-slate-950 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-2xl font-black tracking-tighter text-white"
        >
          SHASHWAT<span className="text-blue-500">.</span>
        </motion.div>

        <div className="flex gap-8">
          {socialLinks.map((link) => (
            <a 
              key={link.name}
              href={link.url} 
              target="_blank" 
              rel="noreferrer"
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors tracking-widest uppercase"
            >
              {link.name}
            </a>
          ))}
        </div>

        <p className="text-slate-500 text-sm font-medium">
          © {currentYear} Shashwat Srivastava. Crafted with care.
        </p>
      </div>
      
      {/* Decorative glow */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[500px] h-48 bg-blue-600/10 rounded-full blur-[100px] -z-10"></div>
    </footer>
  )
}

export default Footer

