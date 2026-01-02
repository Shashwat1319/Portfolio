// src/sections/Contact.jsx
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline"
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2"
import { useRef } from "react";

function Contact() {
 const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

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
                title:"Message Send",
                text:"Message sent successfully",
                icon:"success"
            })
          form.current.reset();
        },
        (error) => {
           Swal.fire({
                title:"Message Not Sent",
                text:"Message sent successfully",
                icon:"error"
            })
            console.log(error)
          alert("Something went wrong. Try again.");
        }
      );
  };



  return (
    <section id="contact" className="py-20 px-6 md:px-20 bg-gray-50">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-10">
        {/* Info */}
        <div className="flex-1 space-y-6">
          <h2 className="text-4xl font-bold mb-4">Contact Me 
            <hr className="mt-5"/>
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Interested in working together? Reach out via email, phone, or find me in Lucknow.
          </p>
          <div className="space-y-3">
            <p className="flex items-center gap-2 text-gray-800">
              <EnvelopeIcon className="h-5 w-5 text-blue-500" />
              <a href="mailto:shaswatsrivastava1319@gmail.com" className="hover:underline">
                shaswatsrivastava1319@gmail.com
              </a>
            </p>
            <p className="flex items-center gap-2 text-gray-800">
              <PhoneIcon className="h-5 w-5 text-blue-500" />
              +91 9118011632
            </p>
            <p className="flex items-center gap-2 text-gray-800">
              <MapPinIcon className="h-5 w-5 text-blue-500" />
              Lucknow, Uttar Pradesh – 226022
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="flex-1">
          <form className="bg-white shadow-md rounded-lg p-6 flex flex-col gap-4" ref={form} onSubmit={sendEmail}>
            <input
              type="text"
              name="from_name"
              placeholder="Your Name"
              required
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="from_email" 
              required
              placeholder="Your Email"
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Your Message"
              name="message"
              rows={5}
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-32"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
