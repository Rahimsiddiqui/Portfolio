import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="min-h-screen w-full h-full bg-background transition-colors duration-200">
      {/* Hero Section */}
      <section className="flex flex-col justify-center items-start max-w-6xl mx-auto pt-3 px-5.5">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.2, 0.8, 0.2, 1],
          }}
          className="text-primary text-4xl sm:text-5xl font-bold font-space-grotesk"
        >
          Let's Connect
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0.2, 0.8, 0.2, 1],
          }}
          className="text-primary/90 text-xl mt-6 sm:mt-7.5"
        >
          Interested in working together or just want to say hi? Drop me a
          message below.
        </motion.p>
      </section>
    </div>
  );
};

export default Contact;
