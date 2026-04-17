import { useState, useRef } from "react"
import { motion } from "framer-motion"
import emailjs from "@emailjs/browser"
import Swal from "sweetalert2"

function Contact() {
  const form = useRef()
  const [isSending, setIsSending] = useState(false)

  const sendEmail = (e) => {
    e.preventDefault()
    setIsSending(true)

    emailjs
      .sendForm(
        "service_tbp76od",     
        "template_mpjg8bj",   
        form.current,
        "gEEh5Oz1789OzzDwx"           
      )
      .then(
        () => {
          Swal.fire({
            title: "Message Sent!",
            text: "Thank you for reaching out. I will get back to you soon.",
            icon: "success",
            confirmButtonColor: "#3b82f6",
            background: "#0f172a",
            color: "#fff"
          })
          form.current.reset()
          setIsSending(false)
        },
        (error) => {
          console.error(error)
          Swal.fire({
            title: "Submission Failed",
            text: "Something went wrong. Please try again later.",
            icon: "error",
            confirmButtonColor: "#3b82f6",
            background: "#0f172a",
            color: "#fff"
          })
          setIsSending(false)
        }
      )
  }

  return (
    <section id="contact" className="py-24 px-6 md:px-20 bg-slate-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -z-10"></div>
      
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16"
        >
          {/* Contact Info */}
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-gradient">
              Let's Connect
            </h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
              Have a project in mind or just want to say hi? My inbox is always open. 
              I'm currently looking for new opportunities in web development.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 glass-card rounded-xl flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <div>
                  <h4 className="text-white font-bold">Email</h4>
                  <p className="text-slate-400">shaswatsrivastava1319@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 glass-card rounded-xl flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </div>
                <div>
                  <h4 className="text-white font-bold">Location</h4>
                  <p className="text-slate-400">Lucknow, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card p-8 md:p-10 rounded-3xl border-white/5 relative bg-slate-900/40">
            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Name</label>
                  <input 
                    type="text" 
                    name="from_name"
                    required
                    placeholder="John Doe"
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email</label>
                  <input 
                    type="email" 
                    name="from_email"
                    required
                    placeholder="john@example.com"
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Message</label>
                <textarea 
                  name="message"
                  required
                  rows="4" 
                  placeholder="Your message here..."
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all resize-none"
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={isSending}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
