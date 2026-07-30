import { useState, useRef } from "react"
import { motion } from "framer-motion"
import emailjs from "@emailjs/browser"
import Swal from "sweetalert2"

const MAX_MESSAGE_LENGTH = 1000

function Contact() {
  const form = useRef(null)
  const [isSending, setIsSending] = useState(false)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [charCount, setCharCount] = useState(0)

  const validate = (name, value) => {
    switch (name) {
      case "from_name":
        if (!value.trim()) return "Name is required"
        if (value.trim().length < 2) return "Name must be at least 2 characters"
        return ""
      case "from_email":
        if (!value.trim()) return "Email is required"
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email"
        return ""
      case "message":
        if (!value.trim()) return "Message is required"
        if (value.trim().length < 10) return "Message must be at least 10 characters"
        if (value.length > MAX_MESSAGE_LENGTH) return `Message must be under ${MAX_MESSAGE_LENGTH} characters`
        return ""
      default:
        return ""
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === "message") {
      if (value.length > MAX_MESSAGE_LENGTH) return
      setCharCount(value.length)
    }
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validate(name, value) }))
    }
  }

  const autoResize = (e) => {
    const el = e.target
    el.style.height = "auto"
    el.style.height = el.scrollHeight + "px"
  }

  const sendEmail = (e) => {
    e.preventDefault()
    const formData = new FormData(form.current)
    const fields = ["from_name", "from_email", "message"]
    const newErrors = {}
    let hasError = false

    fields.forEach((field) => {
      const err = validate(field, formData.get(field) || "")
      newErrors[field] = err
      if (err) hasError = true
    })

    setTouched({ from_name: true, from_email: true, message: true })
    setErrors(newErrors)

    if (hasError) return

    setIsSending(true)

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          Swal.fire({
            title: "Message Sent!",
            text: "Thank you for reaching out. I will get back to you soon.",
            icon: "success",
            confirmButtonColor: "#3b82f6",
            background: "#0f172a",
            color: "#fff",
          })
          form.current.reset()
          setTouched({})
          setErrors({})
          setCharCount(0)
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
            color: "#fff",
          })
          setIsSending(false)
        }
      )
  }

  return (
    <section id="contact" className="py-24 px-6 md:px-20 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-gradient">
              Let&apos;s Connect
            </h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
              Have a project in mind or just want to say hi? My inbox is always open.
              I&apos;m currently looking for new opportunities in web development.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 glass-card rounded-xl flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <h4 className="text-white font-bold">Email</h4>
                  <p className="text-slate-400">shaswatsrivastava1319@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 glass-card rounded-xl flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <h4 className="text-white font-bold">Location</h4>
                  <p className="text-slate-400">Lucknow, India</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 md:p-10 rounded-3xl border-white/5 relative bg-slate-900/40">
            <form ref={form} onSubmit={sendEmail} noValidate className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="from_name" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                    Name
                  </label>
                  <input
                    id="from_name"
                    type="text"
                    name="from_name"
                    required
                    placeholder="John Doe"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    aria-invalid={touched.from_name && errors.from_name ? "true" : "false"}
                    aria-describedby={errors.from_name ? "from_name-error" : undefined}
                    className={`w-full bg-slate-900/50 border rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 transition-all ${
                      touched.from_name && errors.from_name
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                        : "border-white/10 focus:border-blue-500 focus:ring-blue-500/20"
                    }`}
                  />
                  {touched.from_name && errors.from_name && (
                    <p id="from_name-error" role="alert" className="text-red-400 text-xs ml-1 mt-1">
                      {errors.from_name}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label htmlFor="from_email" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                    Email
                  </label>
                  <input
                    id="from_email"
                    type="email"
                    name="from_email"
                    required
                    placeholder="john@example.com"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    aria-invalid={touched.from_email && errors.from_email ? "true" : "false"}
                    aria-describedby={errors.from_email ? "from_email-error" : undefined}
                    className={`w-full bg-slate-900/50 border rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 transition-all ${
                      touched.from_email && errors.from_email
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                        : "border-white/10 focus:border-blue-500 focus:ring-blue-500/20"
                    }`}
                  />
                  {touched.from_email && errors.from_email && (
                    <p id="from_email-error" role="alert" className="text-red-400 text-xs ml-1 mt-1">
                      {errors.from_email}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                  Message
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="4"
                    maxLength={MAX_MESSAGE_LENGTH}
                    placeholder="Your message here..."
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e)
                      autoResize(e)
                    }}
                    onInput={autoResize}
                    aria-invalid={touched.message && errors.message ? "true" : "false"}
                    aria-describedby={errors.message ? "message-error" : "message-count"}
                    className={`w-full bg-slate-900/50 border rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 transition-all resize-none overflow-hidden ${
                      touched.message && errors.message
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                        : "border-white/10 focus:border-blue-500 focus:ring-blue-500/20"
                    }`}
                  />
                  <span
                    id="message-count"
                    className={`absolute bottom-3 right-3 text-xs font-mono ${
                      charCount > MAX_MESSAGE_LENGTH * 0.9 ? "text-amber-400" : "text-slate-600"
                    }`}
                  >
                    {charCount}/{MAX_MESSAGE_LENGTH}
                  </span>
                </div>
                {touched.message && errors.message && (
                  <p id="message-error" role="alert" className="text-red-400 text-xs ml-1 mt-1">
                    {errors.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={isSending}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSending ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
