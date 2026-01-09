import { CONTACT } from '../constants';
import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaLinkedin } from "react-icons/fa";

const Contact = () => {
  return (
    <div id="contact" className="bg-transparent border-t border-neutral-800 py-28">
      <div className="container mx-auto px-6 sm:px-8 text-center">

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 text-3xl sm:text-4xl font-semibold text-white"
        >
          Let’s Build Something Impactful 🚀
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto text-neutral-400 text-sm sm:text-lg mb-12 leading-relaxed"
        >
          Open to Business Intelligence Engineer, Business Analyst, and Data Analytics roles.  
          If you’re hiring, collaborating, or exploring analytics-driven solutions — let’s connect.
        </motion.p>

        {/* Contact Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid gap-6 sm:grid-cols-3 max-w-4xl mx-auto mb-14"
        >

          {/* Location */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 flex flex-col items-center gap-3 hover:border-purple-500 transition">
            <FaMapMarkerAlt className="text-purple-400 text-xl" />
            <p className="text-neutral-300 text-sm sm:text-base">
              {CONTACT.address}
            </p>
          </div>

          {/* Email */}
          <a
            href={`mailto:${CONTACT.email}`}
            className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 flex flex-col items-center gap-3 hover:border-purple-500 transition"
          >
            <FaEnvelope className="text-purple-400 text-xl" />
            <span className="text-purple-300 hover:underline text-sm sm:text-base">
              {CONTACT.email}
            </span>
            <span className="text-neutral-500 text-xs">Fastest way to reach me</span>
          </a>

          {/* Phone */}
          <a
            href={`tel:${CONTACT.phoneNo.replace(/[^0-9]/g, "")}`}
            className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 flex flex-col items-center gap-3 hover:border-purple-500 transition"
          >
            <FaPhoneAlt className="text-purple-400 text-xl" />
            <span className="text-purple-300 text-sm sm:text-base">
              {CONTACT.phoneNo}
            </span>
            <span className="text-neutral-500 text-xs">Available during business hours</span>
          </a>
        </motion.div>

        {/* Primary CTA Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {/* Email CTA */}
          <a
            href={`mailto:${CONTACT.email}`}
            className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-full font-medium transition shadow-lg"
          >
            Email Me
          </a>

          {/* LinkedIn CTA - Replace with real profile */}
          <a
            href="https://www.linkedin.com/in/padmasreesappa/"
            target="_blank"
            rel="noreferrer"
            className="border border-neutral-400 hover:border-white text-neutral-200 px-8 py-3 rounded-full font-medium transition flex items-center gap-2"
          >
            <FaLinkedin />
            Connect on LinkedIn
          </a>
        </motion.div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 text-xs sm:text-sm text-neutral-500"
        >
          Actively seeking full-time opportunities • Open to relocation & hybrid roles
        </motion.p>

      </div>
    </div>
  );
};

export default Contact;
