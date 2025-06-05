import { CONTACT } from '../constants';
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div id="contact" className="bg-transparent border-t border-neutral-800 py-20">
      <div className="container mx-auto px-6 sm:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-12 text-center text-4xl font-semibold text-white"
        >
          Get in Touch
        </motion.h1>

        <motion.address
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="not-italic text-center text-neutral-300 text-lg space-y-4"
        >
          <p>{CONTACT.address}</p>

          <p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="text-purple-400 hover:text-purple-300 transition duration-200"
            >
              {CONTACT.email}
            </a>
          </p>

          <p>
            <a
              href={`tel:+16282083271`}
              className="text-purple-400 hover:text-purple-300 transition duration-200"
            >
              +1 (628) 208-3271
            </a>
          </p>
        </motion.address>
      </div>
    </div>
  );
};

export default Contact;
